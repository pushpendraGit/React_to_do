import { ADD_TO_LIST, BY_SNAP, DELETE_ITEM } from "../actions/actionTypes";

const initialToDoState = {
  items: [],
};

export default function toDo(state = initialToDoState, action) {
  switch (action.type) {
    case ADD_TO_LIST:
      return {
        items: [action.data, ...state.items],
      };

    case BY_SNAP:
      return {
        items: [],
      };

      case DELETE_ITEM:

        const filterdArray = state.items.filter(item => item.id !== action.id);

        console.log('Your Filtered array is', filterdArray);

        return {
      
          items:filterdArray

        }

    default:
      return state;
  }
}
