import { ADD_TO_LIST, BY_SNAP, DELETE_ITEM } from "./actionTypes";

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

export function remove(id){

  console.log('Reached to end');
  return {

    type:DELETE_ITEM,
    id
  }
}