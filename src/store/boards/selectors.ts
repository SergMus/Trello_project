import { AppState } from '..';

export const getBoards = (appState: AppState): Array<any> =>
  appState.boards.list;
export const getSelectedBoard = (appState: AppState): Array<any> =>
  appState.boards.selected;