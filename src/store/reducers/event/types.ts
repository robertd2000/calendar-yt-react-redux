import { IEvent } from '../../../models/IEvent'
import { IUser } from '../../../models/IUser'

export interface EventState {
  guests: IUser[]
  events: IEvent[]
}

export enum EventActionsType {
  SET_GUESTS = 'SET_GUESTS',
  SET_EVENTS = 'SET_EVENTS',
}

export interface SetGuestsAction {
  type: EventActionsType.SET_GUESTS
  payload: IUser[]
}

export interface SetEventsAction {
  type: EventActionsType.SET_EVENTS
  payload: IEvent[]
}

export type EventActions = SetEventsAction | SetGuestsAction
