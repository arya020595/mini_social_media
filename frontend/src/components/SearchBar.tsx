import { Button, Col, Form, Row } from "react-bootstrap";

const SearchBar = ({ searchTerm, onSearch, handleSearch }: any) => {
  return (
    <Row className="mb-5">
      <Col>
        <Form.Control
          size="lg"
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </Col>
      <Col>
        <Button variant="secondary" size="lg" onClick={handleSearch}>
          Search
        </Button>
      </Col>
    </Row>
  );
};

export default SearchBar;
