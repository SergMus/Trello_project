import { FunctionComponent } from "react";
import { Redirect, RouteChildrenProps } from "react-router";
import { Board } from "../../types";
import { setToLocalStorage } from "../../utils";
import { ROUTE_URLS } from "../App/routes";

interface OauthProps extends RouteChildrenProps {
  onSetToken: (token: string) => void;
  onSetBoards: (boards: any) => void;
  onSetProfile: (userProfile: any) => void;
  token_storage_key: string;
  profile: string;
  userBoards: string;
}

export const Oauth: FunctionComponent<OauthProps> = ({
  location: { hash },
  onSetToken,
  onSetBoards,
  onSetProfile,
  token_storage_key,
  userBoards,
  profile,
}: OauthProps) => {
  const token = hash.split("=")[1];
  onSetToken(token);
  setToLocalStorage(token_storage_key, token);

  fetch(
    `https://api.trello.com/1/members/me/boards?fields=name,url&key=${process.env.REACT_APP_API_KEY}&token=${token}`
  )
    .then((response) => response.json())
    .then((data) => {
      onSetBoards(data);
      setToLocalStorage(userBoards, data);
    });
  fetch(
    `https://api.trello.com/1/members/me/actions/?fields=avatarHash,fullName,initials,username&key=${process.env.REACT_APP_API_KEY}&token=${token}`
  )
    .then((response) => response.json())
    .then((data) => {
      onSetProfile(data);
      setToLocalStorage(profile, data);
    });

  return <Redirect to={ROUTE_URLS.DASHBOARD} />;
};
