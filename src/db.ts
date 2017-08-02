import * as Bluebird from 'bluebird'
import * as Redis from 'redis'
import * as uuid from 'uuid'

Bluebird.promisifyAll(Redis.RedisClient.prototype)
Bluebird.promisifyAll(Redis.Multi.prototype)

declare interface RedisClient extends Redis.RedisClient {
  getAsync (...args: any[]): Promise<any>
  hgetallAsync (... args: any[]): Promise<any>
  hmgetAsync (... args: any[]): Promise<any>
  hgetAsync (... args: any[]): Promise<any>
  hmsetAsync (... args: any[]): Promise<any>
}

const redisUrl: string = process.env['REDISCLOUD_URL'] || undefined
const client = Redis.createClient(redisUrl) as RedisClient

export function getAppointments (): Promise<any[]> {
  return client
    .hgetallAsync('events')
    .then(appointments =>
      appointments
        ? Object.keys(appointments).map(key => {
          const app = JSON.parse(appointments[key])
          return {
            id: key,
            title: app.title,
            description: app.description || '',
            from: app.from,
            to: app.to,
            participants: app.participants
          }
        })
        : []
    )
}

export function getAppointment (key: string): Promise<any> {
  return client.hgetAsync('events', key)
    .then(raw => JSON.parse(raw))
    .then(data => ({id: key, ...data}))
}

export function setAppointment (
  title: string,
  description: string = '',
  from: Date,
  to: Date,
  participants: string[],
  id?: string
): Promise<any> {
  const key = id ? id : uuid.v4()
  return client.hmsetAsync('events', {
    [key]: JSON.stringify({title, description, from, to, participants: participants})
  })
  .then(() => getAppointment(key))
}
