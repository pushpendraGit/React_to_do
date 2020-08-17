import { ADD_TO_LIST, BY_SNAP } from "./actionTypes";

export default function toDo(data) {
  return {
    type: ADD_TO_LIST,
    data,
  };
}

export function bySnap() {
  return {
    type: BY_SNAP,
  };
}
