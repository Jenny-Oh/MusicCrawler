import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Test = (props) => {
  const [result, setResult] = useState([]);
  const { key1, key2 } = useParams();
  console.log(key1);
  console.log(key2);
  useEffect(() => {
    const fetchData = async () => {
      const tmp = await axios
        .post(
          "http://localhost:5000/all/" + key1 + "/" + key2,
          {},
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data);
          setResult(res.data.resultArr);
          //console.log(res.data.resultArr[0]);
        });
    };
    fetchData();
  }, []);
  // 무한 루프 돌아가는 코드 수정
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/all", {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       //console.log("here");
  //       setResult(res.data.resultArr);
  //       //console.log(res.data.resultArr[0]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  const renderResults = result.map((rs) => {
    return (
      <div
        className="rs"
        key={rs.id}
        style={{
          marginInline: 80,
        }}
      >
        <div
          style={{
            marginInline: 80,
          }}
        >
          곡 : {rs.title} 가수 : {rs.singer}
        </div>
        <div className="rs-id" style={{ marginInline: 150 }}>
          {rs.id} 등 입니다!!
        </div>
      </div>
    );
  });

  var searchResult = "찾으신 결과는 다음과 같습니다.";
  if (result.length == 0) {
    searchResult = "찾으시는 결과는 없습니다";
  }
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginInline: 80,
        }}
      >
        <h1> {searchResult} </h1>
      </div>
      {renderResults}
      <br />
      <div style={{ alignItems: "center", marginInline: 230 }}>
        <button onClick={() => window.location.replace("/")}>
          다시 검색하기
        </button>
      </div>
    </div>
  );
};
export default Test;
