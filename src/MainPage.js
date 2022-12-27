import React, { StrictMode, useState } from "react";
import { RadioButton } from "./RadioButtton";
import styled, { css } from "styled-components";
import InputSample, { StyleButton } from "./InputText";
import {
  BrowserRouter,
  NavLink,
  Routes,
  Link,
  Router,
  Route,
  useNavigate,
} from "react-router-dom";
import Search from "./search";
import axios from "axios";

const MainPage = () => {
  const [rank, setRank] = useState("");
  const [chart, setChart] = useState("일간차트");
  const [search, setSearch] = useState("곡제목");

  const handleChangeChart = (event) => {
    setChart(event.target.value);
    console.log(chart);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
    alert("검색 조건이 변경됩니다!");
  };

  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText("");
    window.location.replace("/");
  };

  const onSearch = (e) => {
    e.preventDefault();
    console.log("clicked!");

    // window.location.replace("./search/" + chart + "/" + search);
    window.location.replace("./search/" + chart + "/" + search + "/" + text);
    // const SearchPage = () => {
    //   return (
    //     <>
    //       <h1> 차트 불러오는 중.. </h1>

    //       <button onCLick={() => window.location.replace("/all")}>
    //         {" "}
    //         순위확인하기
    //       </button>
    //     </>
    //   );
    // };
  };

  return (
    <>
      <form action="search" style={{ textAlign: "center" }} onSubmit={onSearch}>
        <h1> 음원 차트 몇 순위일까 ? </h1>
        <label>
          <div style={{ margin: 15 }}>차트 종류를 선택하세요</div>

          <RadioButton
            changed={handleChangeChart}
            id="1"
            isSelected={chart === "일간차트"}
            label="일간 차트"
            value="일간차트"
            checked
          />
          <RadioButton
            changed={handleChangeChart}
            id="2"
            isSelected={chart === "주간차트"}
            label="주간 차트"
            value="주간차트"
          />

          <RadioButton
            changed={handleChangeChart}
            id="3"
            isSelected={chart === "실시간차트"}
            label="실시간 차트"
            value="실시간차트"
          />
          <br />
          <br />
        </label>
        <label>
          <div style={{ margin: 5 }}>
            검색 종류를 선택하세요
            <select
              value={search}
              onChange={handleChangeSearch}
              style={{ margin: 5 }}
            >
              <option value="곡제목">곡 제목</option>
              <option value="가수이름">가수 이름</option>
            </select>
          </div>
        </label>
        <label>
          <input value={text} onChange={onChange} style={{ marginRight: 10 }} />

          <button type="submit">검색</button>

          <h3>
            {chart} 에서 {search} {text} 을/를 검색{" "}
          </h3>
        </label>
      </form>
    </>
  );
};

export default MainPage;
