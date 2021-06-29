import * as React from "react";
import { connect } from "react-redux";
import { RouteChildrenProps, RouterProps } from "react-router";
import { AppState, getProfile } from "../../store";
import { TestModel } from "../../types";
import styles from "./Dashboard.module.css";
import { fetchBoards, getBoards, setSelectedId } from "../../store/boards";
import { Boards } from "../Boards/Boards";

interface IDashboardProps extends TestModel {
  boards: Array<any>;
  profile: any;
  onFetchBoards: () => void;
  onSelected: (id: string) => any;
}

class Dashboard extends React.Component<IDashboardProps> {
  componentDidMount() {
    this.props.onFetchBoards!();
  }

  private setBoardId = (id: string) => {
    this.props.onSelected(id);
  };

  render() {
    return (
      <div className={styles.container_root}>
        <div className={styles.container_sticky}>
          <div className={styles.left_menu}>
            <div className={styles.navbar}>
              <h1>Меню</h1>
              <ul className={styles.tab_section}>
                <li className={styles.item}>
                  <span className={styles.span_icon}>
                    <i className="fas fa-door-open"></i>
                  </span>
                  Начало работы
                </li>
                <li className={styles.item}>
                  <span className={styles.span_icon}>
                    <i className="far fa-heart"></i>
                  </span>
                  Важные события
                </li>
                <li className={styles.item}>
                  <span className={styles.span_icon}>
                    <i className="fas fa-table"></i>
                  </span>
                  Таблицы
                </li>
                <li className={styles.item}>
                  <span className={styles.span_icon}>
                    <i className="fas fa-user-friends"></i>
                  </span>
                  Участники
                </li>
                <li className={styles.item}>
                  <span className={styles.span_icon}>
                    <i className="fas fa-cog"></i>
                  </span>
                  Настройки
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.right_menu}>
            <div className={styles.content}>
              <div className={styles.content_title}>
                ВАШИ РАБОЧИЕ ПРОСТРАНСТВА
              </div>
              <div className={styles.all_boards}>
                <div className={styles.all_boards_header}>
                  <div className={styles.header_icon}>
                    {this.props.profile
                      ? this.props.profile[0].memberCreator.initials
                      : ""}
                  </div>
                  <div className={styles.header_title}>Активные доски</div>
                </div>
                <div className={styles.all_boards_content}>
                  {this.props.boards.map((item: any) => {
                    return <Boards items={item} setBoardId={this.setBoardId} />;
                  })}
                  <div className={styles.create}>создать доску</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    boards: getBoards(state),
    profile: getProfile(state),
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    onFetchBoards: () => dispatch(fetchBoards()),
    onSelected: (id: string) => dispatch(setSelectedId(id)),
  };
};

const connectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
export { connectedDashboard as Dashboard };
