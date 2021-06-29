import * as React from "react";
import { Redirect, RouteChildrenProps } from "react-router";
import { Board } from "../Board/Board";
import { Dashboard } from "../Dashboard/Dashboard";
import { Login } from "../Login/Login";
import { NotFound } from "../NotFound/NotFound";
import { Profile } from "../Profile";

export enum ROUTE_URLS {
  HOME = "/",
  LOGIN = "/login",
  DASHBOARD = "/dashboard",
  NOT_FOUND = "/404",
  USER_PROFILE = "/profile",
  OAUTH = "/oauth",
  PROFILE = "/profile",
  BOARD = "/board"
}

export interface AppRoutes {
  path: string;
  render: (props: any) => any;
  title?: string;
  exact?: boolean;
  isHidden?: boolean;
  isProtected?: boolean;
}

export const routes: Array<AppRoutes> = [
  {
    path: ROUTE_URLS.LOGIN,
    render: (props: any) => <Login {...props} />,
    title: "Login",
  },
  {
    path: ROUTE_URLS.DASHBOARD,
    render: (props: any) => <Dashboard {...props} />,
    title: "Dashboard",
    isProtected: true,
  },
  {
    path: ROUTE_URLS.PROFILE,
    render: (props: any) => <Profile {...props} />,
    title: "Profile",
    isProtected: true,
  },
  {
    path: ROUTE_URLS.HOME,
    exact: true,
    isHidden: true,
    render: (props: any) => <Redirect to={ROUTE_URLS.DASHBOARD} />,
  },
  {
    path: ROUTE_URLS.NOT_FOUND,
    isHidden: true,
    render: (props: RouteChildrenProps) => <NotFound {...props} />,
  },
  {
    path: ROUTE_URLS.BOARD,
    render: (props: any) => <Board {...props} />,
    title: "board",
    isProtected: true,
  },
];
