import * as React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import {
  AppState,
  fetchCards,
  getBoards,
  getCards,
  getSelectedBoard,
  getToken,
  fetchToAddCard,
} from "../../store";
import { fetchLists, getLists } from "../../store/lists";
import { BoardName } from "../BoardName";
import styles from "./../Board/Board.module.css";
import { CardsList } from "./../CardList/CardsList";

interface BoardProps {
  setList: (selectedBoard: any) => void;
  setCards: (selectedBoard: any) => void;
  token: string;
  lists: any;
  boards: any;
  selectedBoard: any;
  cards: any;
  addListCard: (
    cardName: string,
    activeListId: string,
    activeBoard: string
  ) => void;
}

const Board: React.FunctionComponent<BoardProps> = ({
  setList,
  setCards,
  lists,
  boards,
  selectedBoard,
  cards,
  addListCard,
}: BoardProps) => {
  useEffect(() => {
    setList(selectedBoard);
  }, [selectedBoard, setList]);
  useEffect(() => {
    setCards(selectedBoard);
  }, [selectedBoard, setCards]);

  return boards.map((item: any) => {
    if (item.id === selectedBoard) {
      return (
        <div
          className={styles.container}
          style={{
            background: `url('${item.prefs.backgroundImage}') no-repeat center/cover`,
          }}
        >
          <div className={styles.board_header}>
            <div className={styles.link_item}>
              <BoardName name={item.name} />
            </div>
            <div className={[styles.link_item, styles.star].join(" ")}>
              <span className={styles.icon_star}>
                <i className="far fa-star"></i>
              </span>
            </div>
            <span className={styles.line}></span>
            <div className={styles.link_item}>
              <span className={styles.icon}>
                <i className="fas fa-user-check"></i>
              </span>
              <span className={styles.span_text}>Персональная</span>
            </div>
            <span className={styles.line}></span>
            <div className={styles.link_item}>
              <span className={styles.icon}>
                <i className="fas fa-lock"></i>
              </span>
              <span className={styles.span_text}>Приватная</span>
            </div>
            <span className={styles.line}></span>
            <span className={styles.wrapp_round_chevron}>
              <div className={styles.link_round}>S</div>
              <span className={styles.chevron}>
                <i className="fas fa-angle-double-up"></i>
              </span>
            </span>
            <div className={styles.link_item}>
              <span className={styles.span_text}>Пригласить</span>
            </div>
          </div>
          <div className={styles.board_content_container}>
            <div className={styles.board_content}>
              <CardsList
                lists={lists}
                cards={cards}
                addListCard={addListCard}
              />
              <button className={styles.addList}>
                <span className={styles.plus}>
                  <i className="fas fa-plus"></i>
                </span>
                <span className={styles.text}>Добавить еще одну колонку</span>
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  });
};

const mapStateToProps = (state: AppState) => {
  return {
    token: getToken(state),
    lists: getLists(state),
    boards: getBoards(state),
    selectedBoard: getSelectedBoard(state),
    cards: getCards(state),
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setList: (selectedBoard: string) => dispatch(fetchLists(selectedBoard)),
    setCards: (selectedBoard: string) => dispatch(fetchCards(selectedBoard)),
    addListCard: (
      cardName: string,
      activeListId: string,
      activeBoardId: string
    ) => dispatch(fetchToAddCard(cardName, activeListId, activeBoardId)),
  };
};
const ConnectedBoard = connect(mapStateToProps, mapDispatchToProps)(Board);
export { ConnectedBoard as Board };
