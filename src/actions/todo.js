import { ADD_TO_LIST } from "./actionTypes";

export default function toDo(data) {
  return {
    type: ADD_TO_LIST,
    data,
  };
}
