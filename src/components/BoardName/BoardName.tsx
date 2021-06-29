import React, { useEffect, useState } from "react";
import styles from "./../BoardName/BoardName.module.css";

interface BoardNameProps {
  name: string;
}

export const BoardName: React.FunctionComponent<BoardNameProps> = (props) => {
  const [inputText, setInputText] = useState(props.name);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setInputText(props.name);
  }, [setInputText, props.name]);

  const handleText = (e: any) => {
    setInputText(e.target.value);
  };
  const activate = () => {
    setIsActive(true);
  };
  const deActivate = () => {
    setIsActive(false);
  };

  return (
    <>
      {!isActive && (
        <div className={styles.board_name} onDoubleClick={activate}>
          {inputText}
        </div>
      )}
      {isActive && (
        <input
          type="text"
          autoFocus
          onChange={handleText}
          onBlur={deActivate}
          className={styles.input}
          value={inputText}
        />
      )}
    </>
  );
};
