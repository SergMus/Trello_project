import { AppState } from "..";

export const getCards = (AppState: AppState) => AppState.cards.cardItems;