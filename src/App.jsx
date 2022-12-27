import React, { StrictMode, useState } from "react";
import { RadioButton } from "./RadioButtton";
import styled, { css } from "styled-components";
import InputSample, { StyleButton } from "./InputText";
import Test from "./test";
import Result from "./result";

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
import MainPage from "./MainPage";

axios.defaults.withCredentials = true;

export default function App() {
  const [rank, setRank] = useState("");
  const [chart, setChart] = useState("일간차트");
  const [search, setSearch] = useState("곡 제목");

  // axios
  //   .get("http://localhost:5000/all", {
  //     withCredentials: true,
  //   })
  //   .then((res) => {
  //     var charts = JSON.stringify(res.data);
  //     return jdata.map()
  //   });

  // axios
  // .get("http://localhost:5000/result", {
  //   withCredentials: true,
  // })
  // .then((res) => {
  //   Result(res.data);
  // });

  const url = {
    실시간차트: "https://www.melon.com/chart/index.htm",
    주간차트: "https://www.melon.com/chart/week/index.htm",
    일간차트: "https://www.melon.com/chart/day/index.htm",
  };

  const handleChangeChart = (event) => {
    setChart(event.target.value);
    console.log(chart);
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };

  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onReset = () => {
    setText("");
  };

  const onSearch = (e) => {
    e.preventDefault();
    console.log("clicked!");
    console.log(chart);
    console.log(search);
    window.location.replace("./search");
    // const SearchPage = () => {
    //   return (
    //     <>
    //       <h1> 차트 불러오는 중.. </h1>
    //       <Link to="/all">
    //         <button> 순위확인하기</button>
    //       </Link>src/App.jsx
    //     </>
    //   );
    // };
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route path="search/:key1/:key2/:key3" element={<Search />} />
        <Route path="all/:key1/:key2" element={<Test />} />
        <Route path="result" element={<Result />} />
      </Routes>
    </BrowserRouter>
  );
}
