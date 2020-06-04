import { SET_SW_NOTIFICATION_COUNT, SET_FB_NOTIFICATION_COUNT, SET_WS_NOTIFICATION_COUNT, SET_SNS_NOTIFICATION_COUNT, SET_SW_NOTIFICATION } from '../actions/serviceTypeAction'

const initialState = {
  SW: null,
  FB: null,
  WS: null,
  SNS: null,
  SwNotifications: [],
  FbNotifications: [],
  WsNotifications: [],
  SnsNotifications: []
};

export default function serviceTypeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SW_NOTIFICATION_COUNT:
      return {
        ...state,
        SW: action.payload
      }
    case SET_FB_NOTIFICATION_COUNT:
      return {
        ...state,
        FB: action.payload
      }
    case SET_WS_NOTIFICATION_COUNT:
      return {
        ...state,
        WS: action.payload
      }
    case SET_SNS_NOTIFICATION_COUNT:
      return {
        ...state,
        SNS: action.payload
      }
    case SET_SW_NOTIFICATION:
      console.log(action.payload)
      let newArr = [...state.SwNotifications]
      newArr.unshift(action.payload)
      return {
        ...state,
        SwNotifications: newArr
      }
    default:
      break;
  }
  return state;
}

