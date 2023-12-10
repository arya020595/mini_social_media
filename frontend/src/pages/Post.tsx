import { Row } from "react-bootstrap";
import { useLoaderData } from "react-router";
import { getPosts } from "../api";
import CardComponent from "../components/CardComponent";

export async function loader() {
  return getPosts();
}

function Post() {
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

export default Post;
