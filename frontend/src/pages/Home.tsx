import { Row } from "react-bootstrap";
import CardComponent from "../components/CardComponent";

import { useLoaderData } from "react-router";
import { getPosts } from "../api";

export async function loader() {
  return getPosts();
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
