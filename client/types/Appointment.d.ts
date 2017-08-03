declare interface INewAppointment {
  title: string,
  description: string,
  from: Date,
  to: Date,
  participants: ReadonlyArray<string>
}
declare interface IAppointment extends INewAppointment {
  id: string
}

declare interface IAppointmentJSON {
  id: string,
  title: string,
  description: string,
  from: string,
  to: string,
  participants: Array<string>
}
