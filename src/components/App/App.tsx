import * as React from "react";
import { setToLocalStorage, getFromLocalStorage } from "../../utils";
import {
  Link,
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
  RouteChildrenProps,
} from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { Login } from "../Login/Login";
import { routes, AppRoutes } from "./routes";
import { Oauth } from "../Auth/Oauth";

const TOKEN_STRORAGE_KEY = "TOKEN";

interface Board {
  id: string;
  name: string;
  url: string;
  pinned?: boolean;
  desc?: string;
}

interface AppState {
  token: string;
  boards: Array<Board>;
}

export class App extends React.Component<any, AppState> {
  public state = {
    token: "",
    boards: [],
  };

  private setToken(token: string) {
    this.setState({ token });
  }

  private setBoards(boards: Array<Board>) {
    this.setState({ boards });
  }

  private isLoggedIn() {
    return !!this.state.token;
  }

  private renderHeader() {
    console.log(this.state);

    return (
      <header>
        {routes.map((route: AppRoutes, i: number) =>
          route.isHidden ? null : (
            <Link key={i} to={route.path}>
              {route.title}
            </Link>
          )
        )}
      </header>
    );
  }

  private renderContent() {
    return (
      <main>
        <Switch>
          {routes.map((route: any, i: number) => (
            <Route
              key={i}
              exact={route.exact}
              path={route.path}
              render={(props) =>
                route.render({
                  ...props,
                  ...{ boards: [...this.state.boards] },
                })
              }
            />
          ))}
          <Route
            path="/oauth"
            render={(props: RouteChildrenProps) => (
              <Oauth
                {...props}
                onSetToken={this.setToken.bind(this)}
                onSetBoards={this.setBoards.bind(this)}
              />
            )}
          />
          <Redirect to="/404" />
        </Switch>
      </main>
    );
  }

  public render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}
