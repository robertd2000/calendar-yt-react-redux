import { EventActions, EventActionsType, EventState } from './types'

const initialState: EventState = {
  guests: [],
  events: [],
}

export default function EventReducer(
  state = initialState,
  action: EventActions
): EventState {
  switch (action.type) {
    case EventActionsType.SET_EVENTS:
      return {
        ...state,
        events: action.payload,
      }
    case EventActionsType.SET_GUESTS:
      return {
        ...state,
        guests: action.payload,
      }
    default:
      return state
  }
}
