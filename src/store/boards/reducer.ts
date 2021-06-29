import { Action } from '../types';
import { ACTION_TYPES } from './types';

interface BoardsState {
  list: Array<any>;
  selected: string;
}

const INITIAL_STATE = {
  list: [],
  selected: ''
};

const boards = (
  state: BoardsState = INITIAL_STATE,
  { type, payload }: Action<any>
) => {
  switch (type) {
    case ACTION_TYPES.SET_BOARDS:
      return { ...state, list: payload };
    case ACTION_TYPES.SET_SELECTED:
      return {...state, selected: payload}
    default:
      return state;
  }
};

export default boards;
