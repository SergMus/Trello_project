import React, { FunctionComponent } from "react";
import { connect } from "react-redux";
import { RouteProps, Redirect, Route, RouteComponentProps } from "react-router";
import { isAuthenticated } from "../../store";

interface PrivateProps extends RouteProps {
  isAuthenticated: boolean;
}

const PrivateRoute: FunctionComponent<PrivateProps> = ({
  render,
  isAuthenticated,
  ...rest
}: PrivateProps) => {
  return (
    <Route
      {...rest}
      render={(routeComponentProps: RouteComponentProps) =>
        isAuthenticated ? (
          render!(routeComponentProps)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeComponentProps.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

const ConnectedPrivate = connect(mapStateToProps)(PrivateRoute);
export { ConnectedPrivate as PrivateRoute };
