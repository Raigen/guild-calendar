import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as bunyan from 'bunyan'
import * as kcors from 'kcors'
import * as route from 'koa-route'
import * as serve from 'koa-static'

import { deleteAppointment, getAppointment, getAppointments, setAppointment } from './db'

import { INewAppointment } from './Appointment.d'

declare module 'koa' {
  interface Context {
    logger: bunyan
  }
}

const port = process.env.PORT || 3001
const app = new Koa()
const mainLogger = bunyan.createLogger({
  name: 'calendar'
})

app.use(kcors())
app.use(bodyParser())

app.use(async (ctx, next) => {
  ctx.logger = mainLogger
  await next()
})
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.logger.info({
    method: ctx.method,
    url: ctx.url,
    duration: ms
  }, `${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx, next) => {
  await next()
  if (ctx.request.get('accept') === 'application/json') {
    ctx.response.type = 'json'
  }
  ctx.set('Access-Control-Allow-Origin', '*')
})

app.use(route.get('/api/appointments', async (ctx) => {
  const appointments = await getAppointments()
  ctx.body = JSON.stringify(appointments)
}))
app.use(route.get('/api/appointments/:key', async (ctx, key: string) => {
  const appointment = await getAppointment(key)
  ctx.body = JSON.stringify(appointment)
}))
app.use(route.del('/api/appointments/:key', async (ctx, key: string) => {
  const affectedRows = await deleteAppointment(key)
  ctx.body = JSON.stringify({affectedRows})
}))

app.use(route.post('/api/appointments', async (ctx) => {
  const {title, description, from, to, participants}: INewAppointment = ctx.request.body
  const appointment = await setAppointment(title, description, from, to, participants)
  ctx.body = JSON.stringify(appointment)
}))

app.use(route.post('/api/appointments/:key/participant', async (ctx, key: string) => {
  const { participant }: {participant: string} = ctx.request.body
  const appointment = await getAppointment(key)
  const newParticipants: ReadonlyArray<string> = appointment.participants.concat(participant)
  const { title, description, from, to, id} = appointment
  const newAppointment = await setAppointment(title, description, from, to, newParticipants, id)
  ctx.body = JSON.stringify(newAppointment)
}))

app.use(route.del('/api/appointments/:key/participant/:part', async (ctx, key: string, participant: string) => {
  const appointment = await getAppointment(key)
  const newParticipants: ReadonlyArray<string> = appointment.participants.filter(entry => entry !== participant)
  const { title, description, from, to, id} = appointment
  const newAppointment = await setAppointment(title, description, from, to, newParticipants, id)
  ctx.body = JSON.stringify(newAppointment)
}))

app.use(serve('./client/build/', {
  index: 'index.html'
}))

app.on('error', (error: Error) => {
  mainLogger.error(error)
})

app.listen(port, () => {
  mainLogger.info(`koa ist listening on http://localhost:${port}`)
})
