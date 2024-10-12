// import { useGetProductsQuery } from "../slices/productsApiSlice";
// import { Row, Col } from "react-bootstrap";
// import Product from "../components/Product";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import { useParams, Link } from "react-router-dom";
// import Paginate from "../components/Paginate";
// import ProductCarousel from "../components/ProductCarousel";
// import Meta from "../components/Meta";

// const HomeScreen = () => {
//   const { keyword, pageNumber } = useParams(); // Extract keyword and page number from URL
//   const { data, isLoading, error } = useGetProductsQuery({
//     keyword,
//     pageNumber,
//   });
//   return (
//     <>
//       {!keyword ? (
//         <ProductCarousel />
//       ) : (
//         <Link to="/" className="btn btn-light mb-4">
//           Go Back
//         </Link>
//       )}

//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {/* {error?.data?.message || error.error} */}
//           {error?.data?.message || JSON.stringify(error.error)}
//         </Message>
//       ) : (
//         <>
//           <Meta />
//           <h1>Latest Products</h1>
//           <Row>
//             {data.products.map((product) => (
//               <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} />
//               </Col>
//             ))}
//           </Row>
//           <Paginate
//             pages={data.pages}
//             page={data.page}
//             keyword={keyword ? keyword : ""}
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default HomeScreen;
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useParams, Link } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { keyword = "", pageNumber = 1 } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
