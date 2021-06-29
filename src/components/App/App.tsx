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
import { Header } from "../Header/Header";
import { connect } from "react-redux";
import { resetState } from "../../store";

class App extends React.Component<any> {
  redirectToLogin() {
    this.props.history.push(ROUTE_URLS.LOGIN);
  }

  redirectToDashboard() {
    this.props.history.push(ROUTE_URLS.DASHBOARD);
  }

  private logOut = () => {
    this.redirectToLogin();
  };

  private renderContent() {
    return (
      <main>
        <Switch>
          {routes.map(this.renderRoute)}
          <Route
            path={ROUTE_URLS.OAUTH}
            render={(props: RouteChildrenProps) => <Oauth {...props} />}
          />
          <Redirect to={ROUTE_URLS.NOT_FOUND} />
        </Switch>
      </main>
    );
  }
  private renderRoute = (route: any, i: number) => {
    if (route.isProtected) {
      return <PrivateRoute {...route} key={i} render={() => route.render()} />;
    } else {
      return (
        <Route
          key={i}
          exact={route.exact}
          path={route.path}
          render={(props) =>
            route.render({
              ...props,
            })
          }
        />
      );
    }
  };

  public render() {
    return (
      <div>
        <Header logOut={this.logOut} />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToDispatch = (dispatch: any) => {
  return {
    logOut: () => dispatch(resetState()),
  };
};

const AppWithRouter = withRouter(App);
const ConnectedApp = connect(undefined, mapStateToDispatch)(AppWithRouter);
export { ConnectedApp as App };
