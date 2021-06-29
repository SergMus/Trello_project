import * as React from "react";
import styles from "./../CardList/CardsList.module.css";
import { Cards } from "./../Cards/Cards";
import { NavLink } from "react-router-dom";
import { ListAddCard } from "../ListAddCard";

interface CardsListProps {
  lists: any;
  cards: any;
  addListCard: (
    cardName: string,
    activeListId: string,
    activeBoard: string
  ) => void;
}

export const CardsList: React.FunctionComponent<any> = (
  props: CardsListProps
) => {
  console.log(props);

  return (
    props.lists &&
    props.lists.map((item: any) => {
      return (
        <div className={styles.list_wrapper}>
          <div className={styles.list_content}>
            <div className={styles.list_header}>
              {item.name}
              <span className={styles.dots}>
                <i className="fas fa-ellipsis-h"></i>
              </span>
            </div>
            <div className={styles.list_cards}>
              {props.cards &&
                props.cards
                  .filter((elem: any) => {
                    return (
                      elem.idList === item.id && elem.idBoard === item.idBoard
                    );
                  })
                  .map((item: any) => {
                    return <Cards cards={item} />;
                  })}
            </div>
            <div className={styles.list_footer}>
              <ListAddCard
                addListCard={props.addListCard}
                listId={item.id}
                boardId={item.idBoard}
              />
            </div>
          </div>
        </div>
      );
    })
  );
};
