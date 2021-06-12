import * as React from "react";
import styles from "./../Login/Login.module.css";

export class Login extends React.Component {
  render() {
    const {
      REACT_APP_API_KEY,
      REACT_APP_APP_NAME,
      REACT_APP_REDIRECT_URL,
      REACT_APP_SCOPE,
    } = process.env;

    const requestUrl = `https://trello.com/1/authorize?return_url=${REACT_APP_REDIRECT_URL}&expiration=1day&name=${REACT_APP_APP_NAME}&scope=${REACT_APP_SCOPE}&response_type=token&key=${REACT_APP_API_KEY}`;

    return (
      <div className={styles.login}>
        <div className={styles.logo_container}>
          <span className={styles.btn_span}>
            <i className="fab fa-trello"></i>
          </span>
          <span className={styles.btn_span_name}>Trello</span>
        </div>
        <a href={requestUrl} className={styles.login_send}>
          Login with trello account
        </a>
        <ul>
          <li>You are not Logged in!</li>
          <li>Please, login</li>
        </ul>
      </div>
    );
  }
}
