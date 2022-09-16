import client from "../libs/PrismaClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // req.body

    console.log("post 호출됨");

    const {
      body: {
        data: { name, email, password },
      },
    } = req;
    console.log("백엔드 로그: ", name, email, password);

    const result = await client.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    res.status(200).json(result);
  }
  if (req.method === "GET") {
    console.log("get 호출됨");
    const { email } = req.query;

    const result = await client.user.findUnique({
      select: {
        id: false,
        email: true,
        name: true,
        password: true,
      },
      where: {
        email: email,
      },
    });

    res.status(200).json({ result });
  }
  if (req.method === "PATCH") {
    console.log("PATCH 호출됨");
    const {
      body: {
        data: { name, email, password },
      },
    } = req;

    console.log("데이터 파싱됨");
    const result = await client.user.update({
      data: {
        name,
        password,
      },
      where: {
        email,
      },
    });
    console.log("업데이트 성공");
    res.status(200).json(result);
  }
  if (req.method === "DELETE") {
    console.log("DELETE 호출됨");
    console.log(req.body);
    const {
      data: { email },
    } = req.body;

    const result = await client.user.delete({
      where: {
        email: email,
      },
    });
    console.log("삭제 완료");
    res.status(200).json(result);
  }
}

// 받아온 Res 인자로 여러가지 메소드를 사용할 수 있는데, 대표적인 메소드가 status이다.
// Res가 성공적으로 이뤄졌을 때 status가 200이 되므로 위와 같이 사용할 수 있다.
