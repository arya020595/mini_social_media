import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col } from "react-bootstrap";

function CardComponent({ data }: any) {
  const isActive = false;

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src="https://placehold.co/150" />
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
            <span className="ms-2">1</span>
          </Card.Title>
          <Card.Title>{data}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Card.Link className="text-decoration-none text-secondary" href="#">
            Card Link
          </Card.Link>
          <Card.Link className="text-decoration-none text-secondary" href="#">
            Another Link
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CardComponent;
