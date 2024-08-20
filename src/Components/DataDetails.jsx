import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

const DataDetails = () => {
  // R O U T E R   P A R A M S
  const { id } = useParams();

  // S T A T E S
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // F E T C H I N G    D A T A
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchDetails();
  }, [id]);

  // L O A D I N G
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // J S X
  return (
    <div className="details-container">
      {isLoading && !details ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          <h1>Release Details</h1>
          <h2>{details?.title}</h2>
          <p>Description: {details?.body}</p>
          <Link to={"/"}>
            <button className="btn">back</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default DataDetails;
