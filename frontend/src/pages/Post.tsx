import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Row } from "react-bootstrap";
import { useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import { CreateLike, DeleteLike, getUserPosts } from "../api";
import CardComponent from "../components/CardComponent";
import PaginationComponent from "../components/PaginationComponent";
import requireAuth from "../utils";

export async function loader({ request }: any) {
  await requireAuth(request);
  const skip = 0;
  const take = 10;
  return getUserPosts(skip, take);
}

function Post() {
  const dataInit: any = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const [datas, setDatas] = useState<any>(dataInit);
  const user: any = localStorage.getItem("user");
  const userId = JSON.parse(user).id;
  const totalPages = datas?.totalPages || 0;

  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Fetch data for the selected page
    const skip = (pageNumber - 1) * 10; // Adjust this based on API pagination logic
    const take = 10;
    const newData = await getUserPosts(skip, take);

    // Update the state with the new data
    setDatas(newData);
  };

  const handleLikeUpdate = (postId: number, isLiked: boolean) => {
    isLiked ? DeleteLike(postId, userId) : CreateLike(postId, userId);
  };

  return (
    <>
      <Link to="/post-form">
        <Button
          variant="secondary"
          style={{ width: "75px", height: "75px" }}
          className="btn btn-lg rounded-circle position-fixed bottom-0 end-0 z-3 m-4">
          <FontAwesomeIcon icon={["fas", "plus"]} />
        </Button>
      </Link>

      <Row xs={1} md={2} lg={4} className="g-3">
        {datas?.data.map((item: any, index: number) => (
          <CardComponent
            key={index}
            data={item}
            onLikeUpdate={handleLikeUpdate}
            userId={userId}
          />
        ))}
      </Row>

      <Row className="mt-5">
        <PaginationComponent
          totalPages={totalPages}
          activePage={currentPage}
          onPageChange={handlePageChange}
        />
      </Row>
    </>
  );
}

export default Post;
