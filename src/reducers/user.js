import { act } from "react-dom/test-utils"

const user = (state = [], action) => {
  console.log(action)
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
            user: action.user,
        }
      default:
        return state
    }
  }
  
  export default user