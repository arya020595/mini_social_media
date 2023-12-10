import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col } from "react-bootstrap";

function CardComponent({ data }: any) {
  const isActive = false;

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={data.image} />
        <Card.Body>
          <Card.Title>
            {isActive ? (
              <FontAwesomeIcon
                className="text-danger"
                icon={["fas", "heart"]}
              />
            ) : (
              <FontAwesomeIcon icon={["far", "heart"]} />
            )}
            <span className="ms-2">{data._count.likes}</span>
          </Card.Title>
          <Card.Title>{data.caption}</Card.Title>
          <Card.Link className="text-decoration-none text-secondary" href="#">
            {data.tag}
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CardComponent;
