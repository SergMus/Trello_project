import * as React from "react";
import { Redirect, RouteChildrenProps } from "react-router";
import { Dashboard } from "../Dashboard/Dashboard";
import { Login } from "../Login/Login";
import { NotFound } from "../NotFound/NotFound";

export interface AppRoutes {
  path: string;
  render: (props: any) => any;
  title?: string;
  exact?: boolean;
  isHidden?: boolean;
}

export const routes: Array<AppRoutes> = [
  {
    path: "/login",
    render: (props: any) => <Login {...props} />,
    title: "Home",
  },
  {
    path: "/dashboard",
    render: (props: any) => <Dashboard {...props} />,
    title: "Dashboard",
  },
  {
    path: "/",
    exact: true,
    isHidden: true,
    render: (props: any) => <Redirect to="/login" />,
  },
  {
    path: "/404",
    isHidden: true,
    render: (props: RouteChildrenProps) => <NotFound {...props} />,
  },
];
