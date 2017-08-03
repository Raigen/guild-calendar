import * as Bluebird from 'bluebird'
import * as Redis from 'redis'
import * as uuid from 'uuid'

import { IAppointment, INewAppointment } from './Appointment.d'

Bluebird.promisifyAll(Redis.RedisClient.prototype)
Bluebird.promisifyAll(Redis.Multi.prototype)

declare type StringifiedAppointments = {
  [key: string]: string
}

declare interface RedisClient extends Redis.RedisClient {
  hgetallAsync (table: string): Promise<StringifiedAppointments | null>
  hgetAsync (table: string, key: string): Promise<string>
  hmsetAsync (table: string, data: StringifiedAppointments): Promise<boolean>
}


const redisUrl: string = process.env['REDISCLOUD_URL'] || undefined
const client = Redis.createClient(redisUrl) as RedisClient

export function getAppointments (): Promise<IAppointment[]> {
  return client
    .hgetallAsync('events')
    .then(appointments =>
      appointments
        ? Object.keys(appointments).map(key => {
          const app: INewAppointment = JSON.parse(appointments[key]) as INewAppointment
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

export function getAppointment (key: string): Promise<IAppointment> {
  return client.hgetAsync('events', key)
    .then(raw => JSON.parse(raw) as INewAppointment)
    .then(data => ({id: key, ...data}))
}

export function setAppointment (
  title: string,
  description: string = '',
  from: Date,
  to: Date,
  participants: ReadonlyArray<string>,
  id?: string
): Promise<IAppointment> {
  const key = id ? id : uuid.v4()
  return client.hmsetAsync('events', {
    [key]: JSON.stringify({title, description, from, to, participants: participants})
  })
  .then(() => getAppointment(key))
}
