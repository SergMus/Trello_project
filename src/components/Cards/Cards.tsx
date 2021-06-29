import * as React from "react";
import styles from "./../Cards/Cards.module.css";

interface CardsProps {
  cards: any;
}

export const Cards: React.FunctionComponent<CardsProps> = (
  props: CardsProps
) => {
  return (
    <div className={styles.card}>
      <div className={styles.card_content}>{props.cards.name}</div>
      <div className={styles.badges}>
        <i className="fas fa-align-left"></i>
      </div>
    </div>
  );
};
