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
}

export function getAppointment (key: string): Promise<any> {
  return client.hgetAsync('events', key).then(raw => JSON.parse(raw))
}

export function setAppointment (
  title: string,
  from: Date,
  to: Date,
  participants: string[]
): Promise<any> {
  const key = uuid.v4()
  return client.hmsetAsync('events', {
    [key]: JSON.stringify({title, from, to, participants: participants})
  })
}
