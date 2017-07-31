declare interface INewAppointment {
  title: string,
  from: Date,
  to: Date,
  participants: string[]
}
declare interface IAppointment extends INewAppointment {
  id: string
}
