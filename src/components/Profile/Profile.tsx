import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../store";
import styles from "./../Profile/Profile.module.css";

export const Profile: React.FunctionComponent<any> = (props: any): any => {
  const userProfile = useSelector(
    (state: AppState) => state.auth.userProfile[4].memberCreator
  );
  const [inputText, setInputText] = useState(userProfile.username);

  useEffect(()=>{
console.log('hi');


  }, [userProfile]);

  const handleChangeInput = (e: any) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // fetch().then().then(() => {
    //   this.props.onProfileSuccessUpdate()
    // })
  };

  console.log(userProfile);

  return (
    <div className={styles.profileContainer}>
      <div className={styles.tabe_panel_header}>
        <div className={styles.tabe_panel_header_wrapper}>
          <div className={styles.tabe_panel_header_content}>
            <div className={styles.logo_wrapp}>{userProfile.initials}</div>
            <div className={styles.nickname_wrapp}>
              <span className={styles.nickname_wrapp_span1}>
                {userProfile.fullName}
              </span>
              <span className={styles.nickname_wrapp_span2}>
                {"@" + userProfile.username}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.tabe_panel_nav}></div>
      <div className={styles.tabe_panel_main}>
        <div className={styles.tabe_panel_main_container}>
          <img
            src="https://a.trellocdn.com/prgb/dist/images/member-home/taco-privacy.eff3d701a9c3a71105ea.svg"
            alt="picture1"
            className={styles.image_content}
          />
          <h3
            style={{
              color: "#172B4D",
              marginBottom: 0,
            }}
          >
            О нас
          </h3>
          <hr className={styles.hr} />
          <form onSubmit={handleSubmit} className={styles.form_container}>
            <label className={styles.label}>
              Имя пользователя:
              <input
                type="text"
                value={inputText}
                onChange={handleChangeInput}
                className={styles.inp}
              />
            </label>
            <label className={styles.label}>
              О себе:
              <textarea
                // value={this.state.value}
                // onChange={this.handleChangeTextarea}
                className={styles.inp}
              />
            </label>
            <input
              type="submit"
              value="Отправить"
              className={styles.submitBtn}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
