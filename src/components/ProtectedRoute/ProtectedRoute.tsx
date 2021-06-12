import React, { FunctionComponent } from "react";
import { RouteProps, Redirect, Route, RouteComponentProps } from "react-router";

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

export { PrivateRoute };
