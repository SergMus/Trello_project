import * as React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { AppState } from "../../store";
import { ROUTE_URLS } from "../App/routes";
import { AppRoutes } from "../App/routes";
import { routes } from "../App/routes";
import styles from "./../Header/Header.module.css";

export const Header = (props: any) => {
  const userProfile = useSelector((state: AppState) => {
    return state.auth.userProfile
      ? state.auth.userProfile[0].memberCreator
      : undefined;
  });

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.left_menu}>
          <div className={styles.btn_menu}>
            <NavLink
              to="/"
              activeClassName={styles.active}
              style={{ textDecoration: "none" }}
            >
              <span className={styles.btn_span}>
                <i className="fas fa-th"></i>
              </span>
            </NavLink>
          </div>
          <div className={styles.btn_menu}>
            <NavLink
              to={ROUTE_URLS.LOGIN}
              activeClassName={styles.active}
              style={{ textDecoration: "none" }}
            >
              <span className={styles.btn_span}>
                <i className="fas fa-home"></i>
              </span>
            </NavLink>
          </div>
          <div className={styles.btn_menu}>
            <NavLink
              to={ROUTE_URLS.DASHBOARD}
              activeClassName={styles.active}
              style={{ display: "flex", textDecoration: "none" }}
            >
              <span className={styles.btn_span}>
                <i className="fab fa-trello"></i>
              </span>
              <span className={styles.btn_span_name}>Доски</span>
            </NavLink>
          </div>
        </div>
        <div className={styles.center_menu}>
          <NavLink
            to={ROUTE_URLS.HOME}
            activeClassName={styles.active}
            style={{
              display: "flex",
              textDecoration: "none",
            }}
          >
            <span className={styles.btn_span} style={{ color: "#80B4D3" }}>
              <i className="fab fa-trello"></i>
            </span>
            <span
              className={styles.btn_span_name}
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: "#80B4D3",
              }}
            >
              Trello
            </span>
          </NavLink>
        </div>
        <div className={styles.right_menu}>
          {userProfile ? (
            <button className={styles.logout} onClick={props.logOut}>
              Выйти
            </button>
          ) : null}
          <div className={styles.btn_menu_logo}>
            <NavLink
              to={ROUTE_URLS.PROFILE}
              activeClassName={styles.active}
              style={{ textDecoration: "none" }}
            >
              <span className={styles.user_logo}>
                {userProfile ? userProfile.initials : "-"}
              </span>
            </NavLink>
          </div>
        </div>
      </div>
      {routes.map((route: AppRoutes, i: number) =>
        route.isHidden ? null : (
          <Link key={i} to={route.path}>
            {route.title}
          </Link>
        )
      )}
    </header>
  );
};
