import { FunctionComponent } from "react";
import { Redirect, RouteChildrenProps } from "react-router";

interface OauthProps extends RouteChildrenProps {
  onSetToken: (token: string) => void;
  onSetBoards: (boards: any) => void;
}

export const Oauth: FunctionComponent<OauthProps> = ({
  location: { hash },
  onSetToken,
  onSetBoards,
}: OauthProps) => {
  const token = hash.split("=")[1];
  onSetToken(token);

  fetch(
    `https://api.trello.com/1/members/me/boards?fields=name,url&key=${process.env.REACT_APP_API_KEY}&token=${token}`
  )
    .then((response) => response.json())
    .then((data) => {
      onSetBoards(data);
    });

  return <Redirect to={"/dashboard"} />;
};
