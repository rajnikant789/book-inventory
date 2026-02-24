import React, { useEffect, useState } from "react";
import { getBookById } from "../services/api";
import { useParams } from "react-router-dom";

function BookDetails() {
  const [book, setBook] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getBookById(id).then((res) => setBook(res.data));
  }, [id]);

  return (
    <div className="details">
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Email:</strong> {book.email}</p>
      <p><strong>Age:</strong> {book.age}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Published Date:</strong> {book.publishedDate}</p>
      <p><strong>Overview:</strong> {book.overview}</p>
    </div>
  );
}

export default BookDetails;