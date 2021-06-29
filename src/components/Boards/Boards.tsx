import * as React from "react";
import styles from "./../Boards/Boards.module.css";
import { NavLink } from "react-router-dom";
import { ROUTE_URLS } from "../App/routes";

export const Boards: React.FunctionComponent<any> = (props: any) => {
  const item = props.items;
  const selectBoardId = (e: any) => {
    return props.setBoardId(e.target.parentNode.parentNode.id);
  };

  return (
    <li className={styles.elemLi} onClick={selectBoardId} id={item.id}>
      {item.name}
      <NavLink to={ROUTE_URLS.BOARD}>
        <img
          src={item.prefs.backgroundImage}
          className={styles.image}
          alt="board"
        />
      </NavLink>
    </li>
  );
};
