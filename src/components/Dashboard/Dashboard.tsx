import * as React from "react";
import { RouteChildrenProps } from "react-router";

// interface DashboardProps extends RouteChildrenProps {
//   hello?: string;
//   token?: string;
// }

export class Dashboard extends React.Component<any> {
  goBack() {
    // this.props.history.goBack();
  }
  render() {
    console.log(this.props);
    return (
      <div onClick={this.goBack}>
        <h2> Dashboards</h2>
        <div className="boards-wrapper" style={{ display: "flex" }}>
          {this.props.boards.map((item: any) => {
            return (
              <div
                className="board"
                style={{
                  width: "200px",
                  height: "200px",
                  border: "1px solid black",
                  marginRight: "20px",
                }}
              >
                {item.name}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
