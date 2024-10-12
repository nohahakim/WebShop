import React from "react";
import { Helmet } from "react-helmet-async"; // Import Helmet

const Meta = ({
  title = "Welcome to MyStore",
  description = "Best products at affordable prices",
  keywords = "electronics, buy electronics, cheap electronics",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};
export default Meta;
