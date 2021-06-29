import React, { useState } from "react";
import styles from "./../ListAddCard/ListAddCard.module.css";

interface CreateListCard {
  addListCard: (
    cardName: string,
    activeListId: string,
    boardId: string
  ) => void;
  listId: string;
  boardId: string;
}

export const ListAddCard: React.FunctionComponent<CreateListCard> = ({
  addListCard,
  listId,
  boardId,
}: any) => {
  const [active, setActive] = useState(true);
  const [inputText, setInputText] = useState("");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    addListCard(inputText, listId, boardId);
    setActive(true);
  };
  const handleChangeInput = (e: any) => {
    setInputText(e.target.value);
  };
  const deActivate = () => {
    setActive(false);
  };
  const activate = () => {
    setActive(true);
    setInputText("");
  };

  return (
    <>
      {active && (
        <>
          <button className={styles.footer_btn} onClick={deActivate}>
            <span className={styles.plus}>
              <i className="fas fa-plus"></i>
            </span>
            Добавить еще одну карточку
          </button>
          <span className={styles.disc}>
            <i className="far fa-window-restore"></i>
          </span>
        </>
      )}

      {!active && (
        <form action="" onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            className={styles.add_card}
            value={inputText}
            onChange={handleChangeInput}
            placeholder="Ввести заголовок для этой карты"
          />
          <div className={styles.btns_wrapp}>
            <button className={styles.btn_add} type="submit">
              Добавить карточку
            </button>
            <button className={styles.btn_close} onClick={activate}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </form>
      )}
    </>
  );
};
