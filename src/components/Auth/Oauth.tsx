import { FunctionComponent, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, RouteChildrenProps } from "react-router";
import { getToken } from "../../store/auth";
import { setToLocalStorage } from "../../utils";
import { ROUTE_URLS } from "../App/routes";
import { setToken, fetchProfile } from "./../../store/auth";

interface OauthProps extends RouteChildrenProps {
  onSetToken?: (token: string) => void;
  onSetProfile?: (token: string) => void;
}

const Oauth: FunctionComponent<OauthProps> = ({
  location: { hash },
  onSetToken,
  onSetProfile,
}: OauthProps) => {
  const token = hash.split("=")[1];

  useEffect(() => onSetToken && onSetToken(token));
  useEffect(() => onSetProfile && onSetProfile(token));

  return <Redirect to={ROUTE_URLS.DASHBOARD} />;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSetToken: (token: string) => dispatch(setToken(token)),
    onSetProfile: (token: string) => dispatch(fetchProfile(token)),
  };
};

const connectedOauth = connect(undefined, mapDispatchToProps)(Oauth);

export { connectedOauth as Oauth };
