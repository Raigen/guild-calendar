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
