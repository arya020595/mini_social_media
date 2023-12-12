import { Row } from "react-bootstrap";
import CardComponent from "../components/CardComponent";

import { useState } from "react";
import { useLoaderData } from "react-router";
import { getPosts } from "../api";
import PaginationComponent from "../components/PaginationComponent";
import requireAuth from "../utils";

export async function loader({ request }: any) {
  await requireAuth(request);
  const accessToken = localStorage.getItem("accessToken");
  const skip = 0;
  const take = 10;
  return getPosts(accessToken, skip, take);
}

function Home() {
  const dataInit: any = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const [datas, setDatas] = useState<any>(dataInit);

  const totalPages = datas?.totalPages || 0;

  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Fetch data for the selected page
    const accessToken = localStorage.getItem("accessToken");
    const skip = (pageNumber - 1) * 10; // Adjust this based on API pagination logic
    const take = 10;
    const newData = await getPosts(accessToken, skip, take);

    // Update the state with the new data
    setDatas(newData);
  };

  return (
    <>
      <Row xs={1} md={2} lg={4} className="g-3">
        {datas?.data.map((item: any, index: number) => (
          <CardComponent key={index} data={item} />
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

export default Home;
