import * as React from "react";
import { setToLocalStorage, getFromLocalStorage } from "../../utils";
import {
  NavLink,
  Link,
  Redirect,
  Route,
  Switch,
  RouteComponentProps,
  RouteChildrenProps,
  withRouter,
} from "react-router-dom";
import { Dashboard } from "../Dashboard/Dashboard";
import { Login } from "../Login/Login";
import { routes, AppRoutes, ROUTE_URLS } from "./routes";
import { Oauth } from "../Auth/Oauth";
import { PrivateRoute } from "../ProtectedRoute";
import styles from "./../App/App.module.css";

const INITIAL_STATE = {
  token: "",
  boards: [],
  userProfile: undefined,
};
const TOKEN_STRORAGE_KEY = "TOKEN";
const USER_PROFILE = "USER_PROFILE";
const USER_BOARDS = "BOARDS";

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
  userProfile: any;
}

class App extends React.Component<any, AppState> {
  public state = INITIAL_STATE;

  private setToken = (token: string) => {
    this.setState({ token });
  };

  private setBoards = (boards: Array<Board>) => {
    this.setState({ boards });
  };

  private setProfile = (userProfile: any) => {
    this.setState({ userProfile });
  };
  private updateUserStatus = (userProfile: any) => {
    this.setState({ userProfile });
  };

  private get isLoggedIn() {
    return !!this.state.token;
  }

  componentDidMount() {
    this.getToken();
  }
  private getToken() {
    console.log("hi");

    // if (!this.state.token) {
    //   return this.redirectToLogin();
    // }
    const storageToken = getFromLocalStorage<string>(TOKEN_STRORAGE_KEY);
    if (!storageToken) {
      return this.redirectToLogin();
    }

    const storageBoards = getFromLocalStorage<Array<Board>>(USER_BOARDS);
    if (storageToken && !this.state.token) {
      return this.setState(
        { token: storageToken, boards: storageBoards },
        () => {
          this.redirectToDashboard();
        }
      );
    }
  }

  redirectToLogin() {
    this.props.history.push(ROUTE_URLS.LOGIN);
  }

  redirectToDashboard() {
    this.props.history.push(ROUTE_URLS.DASHBOARD);
  }

  redirectToOauth() {
    this.props.history.push(ROUTE_URLS.OAUTH);
  }
  private logOut = () => {
    this.setState(INITIAL_STATE);
    return this.redirectToLogin();
  };

  private renderHeader() {
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
            <div className={styles.btn_menu_logo}>
              <NavLink
                to={ROUTE_URLS.PROFILE}
                activeClassName={styles.active}
                style={{ textDecoration: "none" }}
              >
                <span className={styles.user_logo}>S</span>
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
        <button onClick={this.logOut}>log out</button>
      </header>
    );
  }

  private renderContent() {
    return (
      <main>
        <Switch>
          {routes.map(this.renderRoute)}
          <Route
            path={ROUTE_URLS.OAUTH}
            render={(props: RouteChildrenProps) => (
              <Oauth
                {...props}
                onSetToken={this.setToken}
                onSetBoards={this.setBoards}
                onSetProfile={this.setProfile}
                token_storage_key={TOKEN_STRORAGE_KEY}
                userBoards={USER_BOARDS}
                profile={USER_PROFILE}
              />
            )}
          />
          <Redirect to={ROUTE_URLS.NOT_FOUND} />
        </Switch>
      </main>
    );
  }
  private renderRoute = (route: any, i: number) => {
    if (route.isProtected) {
      return (
        <PrivateRoute
          {...route}
          key={i}
          isAuthenticated={this.isLoggedIn}
          render={() =>
            route.render({
              boards: [...this.state.boards],
              userProfile: this.state.userProfile,
            })
          }
        />
      );
    } else {
      return (
        <Route
          key={i}
          exact={route.exact}
          path={route.path}
          render={(props) =>
            route.render({
              ...props,
              boards: [...this.state.boards],
              userProfile: this.state.userProfile,
            })
          }
        />
      );
    }
  };

  public render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);
export { AppWithRouter as App };
