import React, { Component, useState } from "react";
function Result() {
  // const [result, setResult] = useState([]);
  // axios
  //   .get("http://localhost:5000/all", {
  //     withCredentials: true,
  //   })
  //   .then((res) => {
  //     setResult(res.data);
  //     return result.map((redata) => (
  //       <div key={redata.id}> {redata.title} </div>
  //     ));
  //   });
  return (
    <div>
      <h1> 요청하신 곡의 순위는 다음과 같습니다. </h1>
    </div>
  );
}

export default Result;
