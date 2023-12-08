import { Row } from "react-bootstrap";
import CardComponent from "../components/CardComponent";

function Post() {
  const items = [
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 3",
    "Item 3",
    "Item 3",
    "Item 3",
  ];
  return (
    <div>
      <Row xs={1} md={2} lg={4} className="g-3">
        {items.map((item, index) => (
          <CardComponent key={index} data={item} />
        ))}
      </Row>
    </div>
  );
}

export default Post;
