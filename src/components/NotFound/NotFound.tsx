import * as React from "react";
import { RouteChildrenProps } from "react-router";

export const NotFound: React.FunctionComponent<RouteChildrenProps> = (
  props: RouteChildrenProps
) => {
  return <h2>Not Found!</h2>;
};
