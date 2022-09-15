export default function handler(req, res) {
  if (req.method === "POST") {
    const {
      body: { name, age, gender },
    } = req;
    console.log("백엔드 로그: ", name, age, gender);
    res.status(200).json({ data: `${name}, ${age}, ${gender}` });
  }

  // if (req.method === "GET") {
  //   const { name } = req.query;
  //   res.status(200).json({ data: name });
  // }
}

// 받아온 Res 인자로 여러가지 메소드를 사용할 수 있는데, 대표적인 메소드가 status이다.
// Res가 성공적으로 이뤄졌을 때 status가 200이 되므로 위와 같이 사용할 수 있다.
