import * as React from "react";
import { RouteChildrenProps } from "react-router";
import { TestModel, Board } from "../../types";
import styles from "./Dashboard.module.css";

// interface DashboardProps extends RouteChildrenProps {
//   hello?: string;
//   token?: string;
// }

interface IDashboardProps extends TestModel {
  // hello: string;
  boards: Array<Board>;
}

export class Dashboard extends React.Component<IDashboardProps> {
  goBack() {
    // this.props.history.goBack();
  }
  render() {
    return (
      <div onClick={this.goBack}>
        <h2> Dashboards</h2>
        <div style={{ display: "flex" }}>
          {this.props.boards.map((item: any) => {
            return <div className={styles.board}>{item.name}</div>;
          })}
        </div>
      </div>
    );
  }
}
