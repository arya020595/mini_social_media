import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";

function CardComponent({ data, onLikeUpdate, userId }: any) {
  let isLikedByAuthor = data.likes.some(
    (like: any) => like.authorId === userId
  );

  useEffect(() => {
    setIsActive(isLikedByAuthor);
  }, [data]);

  const [isActive, setIsActive] = useState(isLikedByAuthor);

  const updateLikes = () => {
    setIsActive((prevIsActive: any) => !prevIsActive);

    data._count.likes += isActive ? -1 : 1;

    onLikeUpdate(data.id, isActive);
  };

  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={data.imageUrl} />
        <Card.Body>
          <Card.Title>
            {isActive ? (
              <FontAwesomeIcon
                onClick={updateLikes}
                className="text-danger"
                icon={["fas", "heart"]}
              />
            ) : (
              <FontAwesomeIcon onClick={updateLikes} icon={["far", "heart"]} />
            )}
            <span className="ms-2">{data._count.likes}</span>
          </Card.Title>
          <Card.Title>{data.caption}</Card.Title>
          <Card.Link className="text-decoration-none text-secondary">
            {data.tag}
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CardComponent;
