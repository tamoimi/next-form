import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const NextForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
  });

  // const onSubmit = (data) => {
  //   console.log(JSON.stringify(data));
  // };

  // React Hook Form 에서 e.preventDefault() 자동으로 처리해주기 때문에
  // React HooK Form 을 사용할 경우 입력할 필요 없음

  // const onChangeHandler = (e) => {
  //   // console.log(e.target.value);
  //   setUser(e.target.value);
  // };

  //*(data)는 아래와 mapping
  //React Hook Form 의 {…register} 로 body: 에 JSON으로 감싼뒤 data를 입력
  const fetchUser = async (data) => {
    // e.preventDefault();
    console.log(data);
    const response = await (
      await fetch("/api/info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      })
    ).json();
    console.log(response);
  };

  const getUser = async () => {
    console.log("getUser 호출됨");
    const email = getValues("email");
    const result = await (
      await fetch(`/api/info?email=${email}`, {
        method: "GET",
      })
    ).json();
    console.log("result", result);
  };

  const update = async () => {
    const name = getValues("name");
    const password = getValues("password");
    const email = getValues("email");

    const response = await (
      await fetch("/api/info", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { name: name, email: email, password: password },
        }),
      })
    ).json();
    console.log(response);
  };

  const deleteHandler = async () => {
    const email = getValues("email");

    const response = await (
      await fetch("/api/info", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { email: email },
        }),
      })
    ).json();
    console.log(response);
  };

  return (
    <>
      <form onSubmit={handleSubmit(fetchUser)}>
        <label>Name</label>
        <input
          {...register("name", {
            required: "this is required",
            minLength: {
              value: 4,
              message: "Min length is 4",
            },
          })}
          placeholder="이름을 입력하세요."
        />
        {errors.name && <p>{errors.name.message}</p>}
        <br />
        <label>Email</label>
        <input
          {...register("email", {
            required: "this is required",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email address",
            },
          })}
          placeholder="이메일을 입력하세요."
        />
        {errors.email && <p>{errors.email.message}</p>}
        <br />
        <label>Password</label>
        <input
          {...register("password", {
            required: "this is required",
          })}
          placeholder="비밀번호를 입력하세요."
        />
        {errors.password && <p>{errors.password.message}</p>}
        <br />
        <div>
          <button type="submit">제출</button>
          <button type="button" onClick={getUser}>
            불러오기
          </button>
          <button type="button" onClick={update}>
            수정하기
          </button>
          <button type="button" onClick={deleteHandler}>
            삭제하기
          </button>
        </div>
      </form>
      <style jsx>
        {`
          form {
            width: 500px;
            height: 500px;
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
            margin: 10px 20px;
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
          p {
            color: red;
            margin: 0;
            font-size: 13px;
          }
        `}
      </style>
    </>
  );
};
export default NextForm;
