import { ADD_TO_LIST, BY_SNAP } from "../actions/actionTypes";

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

    default:
      return state;
  }
}
