import React, { Component, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Search = (props) => {
  const { key1, key2, key3 } = useParams();
  console.log(key1);
  console.log(key2);
  useEffect(() => {
    const fetchData = async () => {
      const tmp = await axios
        .post(
          "http://localhost:5000/search/" + key1 + "/" + key2 + "/" + key3,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
        });
      //.catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginInline: 200,
        }}
      >
        <h1> Search Page </h1>
      </div>
      <h3 style={{ marginInline: 50 }}>
        {key1}의 {key2}에서 입력하신 키워드 " {key3} "을 포함한 곡의 순위를 찾는
        중입니다...
      </h3>

      <div style={{ alignItems: "center", marginInline: 220 }}>
        <button
          onClick={() => window.location.replace("/all/" + key2 + "/" + key3)}
        >
          결과 확인하기
        </button>
      </div>
    </div>
  );
};
export default Search;
