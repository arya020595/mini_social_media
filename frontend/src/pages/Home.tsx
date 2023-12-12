import { Row } from "react-bootstrap";
import CardComponent from "../components/CardComponent";

import { useLoaderData } from "react-router";
import { getPosts } from "../api";
import requireAuth from "../utils";

export async function loader({ request }: any) {
  await requireAuth(request);
  const accessToken = localStorage.getItem("accessToken");
  const skip = 0;
  const take = 10;
  return getPosts(accessToken, skip, take);
}

function Home() {
  const datas: any = useLoaderData();

  return (
    <>
      <Row xs={1} md={2} lg={4} className="g-3">
        {datas?.data.map((item: any, index: number) => (
          <CardComponent key={index} data={item} />
        ))}
      </Row>
    </>
  );
}

export default Home;
