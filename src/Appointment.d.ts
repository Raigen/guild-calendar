export interface INewAppointment {
  title: string,
  description: string,
  from: Date,
  to: Date,
  participants: ReadonlyArray<string>
}
export interface IAppointment extends INewAppointment {
  id: string
}

export interface IAppointmentJSON {
  title: string,
  description: string,
  from: string,
  to: string,
  participants: Array<string>
}
