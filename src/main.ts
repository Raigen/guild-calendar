import * as Koa from 'koa'
import * as kcors from 'kcors'
import * as route from 'koa-route'

import { getAppointment, getAppointments, setAppointment } from './db'

const port = process.env.PORT || 3001
const app = new Koa()

app.use(kcors())

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx, next) => {
  await next()
  ctx.response.type = 'json'
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
  const appointment = await setAppointment('Test2', new Date(), new Date(), [])
  ctx.body = JSON.stringify(appointment)
}))

app.listen(port, () => {
  console.log(`koa ist listening on http://localhost:${port}`)
})
