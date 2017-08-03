import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as kcors from 'kcors'
import * as route from 'koa-route'
import * as serve from 'koa-static'

import { IAppointment, INewAppointment } from './Appointment.d'
import { getAppointment, getAppointments, setAppointment } from './db'

const port = process.env.PORT || 3001
const app = new Koa()

app.use(kcors())
app.use(bodyParser())

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
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

app.use(route.post('/api/appointments', async (ctx) => {
  const {title, description, from, to, participants}: INewAppointment = ctx.request.body
  const appointment = await setAppointment(title, description, from, to, participants)
  ctx.body = JSON.stringify(appointment)
}))

app.use(route.post('/api/appointments/:key/participant', async (ctx, key: string) => {
  const { participant }: {participant: string} = ctx.request.body
  const appointment: IAppointment = await getAppointment(key)
  const newParticipants = appointment.participants.concat(participant)
  const { title, description, from, to, id} = appointment
  const newAappointment: IAppointment = await setAppointment(title, description, from, to, newParticipants, id)
  ctx.body = JSON.stringify(newAappointment)
}))

app.use(serve('./client/build/', {
  index: 'index.html'
}))

app.listen(port, () => {
  console.log(`koa ist listening on http://localhost:${port}`)
})
