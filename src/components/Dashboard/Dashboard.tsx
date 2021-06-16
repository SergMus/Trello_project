import * as React from "react";
import { connect } from "react-redux";
import { RouteChildrenProps } from "react-router";
import { increaseCount } from "../../store/action";
import { AppState } from "../../store/reducer";
import { TestModel, Board } from "../../types";
import styles from "./Dashboard.module.css";

interface IDashboardProps extends TestModel {
  countChanged?: number;
  boards: Array<Board>;
  onIncrease: () => void;
}

class Dashboard extends React.Component<IDashboardProps> {
  goBack() {
    // this.props.history.goBack();
  }
  increase = () => {
    this.props.onIncrease();
  };
  render() {
    return (
      <div onClick={this.goBack}>
        <h2> Dashboards</h2>
        <p>{this.props.countChanged}</p>
        <button onClick={this.increase}>ADD</button>
        <div style={{ display: "flex" }}>
          {this.props.boards.map((item: any) => {
            return <div className={styles.board}>{item.name}</div>;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    countChanged: state.count,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    onIncrease: () => dispatch(increaseCount()),
  };
};

const connectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
export { connectedDashboard as Dashboard };
