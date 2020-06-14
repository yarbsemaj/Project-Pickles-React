const settings = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICSTIONS':
      return {
        ...state,
        notifications: action.notifications,
      }
    default:
      return state
  }
}

export default settings