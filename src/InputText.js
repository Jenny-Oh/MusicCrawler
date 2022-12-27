import React, { useState } from "react";
import styled, { css } from "styled-components";
import fetchRank from "./App";

export const StyleButton = styled.button`
  background-color: skyblue;
  color: black;
  margin-right: 3px;
`;

function InputSample() {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText("");
  };

  return (
    <div>
      <label>
        {" "}
        선택
        <input
          value={text}
          placeholder="Search"
          onChange={onChange}
        ></input>{" "}
      </label>
      <StyleButton onClick={onReset}>초기화 </StyleButton>
    </div>
  );
}

export default InputSample;
