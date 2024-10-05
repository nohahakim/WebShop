// components/ProductCarousel.js

import React from "react";
import { Carousel, Image } from "react-bootstrap"; // Import Carousel and Image from React Bootstrap
import { Link } from "react-router-dom"; // Import Link for navigation
import { useGetTopProductsQuery } from "../slices/productsApiSlice"; // Import the useGetTopProductsQuery hook from the productsApiSlice
import Loader from "./Loader"; // Import a Loader component for loading state
import Message from "./Message"; // Import a Message component for error handling

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  return (
    <>
      {isLoading ? ( // If loading, display a Loader component}
        <Loader />
      ) : error ? ( // If there's an error, display a Message component
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel pause="hover" className="bg-dark">
          {products.map(
            (
              product // Map through the products and display them in a Carousel
            ) => (
              <Carousel.Item key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <Image src={product.image} alt={product.name} fluid />
                  <Carousel.Caption className="carousel-caption">
                    <h2>
                      {product.name} (${product.price})
                    </h2>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            )
          )}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;
