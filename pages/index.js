import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const NextForm = () => {
  const { register, handleSubmit } = useForm();

  console.log(register("test"));

  const onChangeHandler = (e) => {
    // console.log(e.target.value);
    setUser(e.target.value);
  };

  const fetchUser = async (data) => {
    e.preventDefault();

    const response = await (
      await fetch("/api/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      })
    ).json();
    console.log(response);
  };

  // const getUser = async () => {
  //   const result = await (
  //     await fetch(`/api/info?name=${user}`, {
  //       method: "GET",
  //     })
  //   ).json();
  //   console.log("result", result);
  // };

  return (
    <>
      <form onSubmit={handleSubmit(fetchUser)}>
        <label htmlFor="name">이름:</label>
        <input
          {...register("name")}
          placeholder="이름을 입력하세요."
        />{" "}
        <br />
        <label htmlFor="age">나이:</label>
        <input
          {...register("age")}
          placeholder="나이를 입력하세요."
        />{" "}
        <br />
        <label htmlFor="age">성별:</label>
        <input
          {...register("gender")}
          placeholder="성별을 입력하세요."
        />{" "}
        <br />
        <div>
          <button type="submit">제출</button>
          {/* <button onClick={getUser}>불러오기</button> */}
        </div>
      </form>
      <style jsx>
        {`
          form {
            width: 500px;
            height: 400px;
            margin: 50px auto;
            background: #f2f2f2;
            text-align: center;
            padding: 45px;
            border-radius: 10px;
          }
          input {
            width: 300px;
            height: 30px;
            border: 1px solid #ccc;
            margin: 20px;
            padding: 10px;
          }
          div {
            display: flex;
            justify-content: space-evenly;
          }
          button {
            width: 100px;
            height: 40px;
            margin-top: 40px;
            border: none;
            background: #999;
            color: white;
            border-radius: 4px;
            cursor: pointer;
          }
          button:hover {
            opacity: 0.7;
          }
          button:nth-last-child(1) {
            background: orange;
          }
        `}
      </style>
    </>
  );
};
export default NextForm;
