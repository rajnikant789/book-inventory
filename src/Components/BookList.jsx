import React, { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../services/api";
import { Link } from "react-router-dom";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const response = await getBooks();
    setBooks(response.data);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    fetchBooks();
  };

  return (
    <div className="table-container">
      <Link to="/add">
        <button>Add Book</button>
      </Link>

      <div className="scrollable-table">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>
                  <Link to={`/book/${book.id}`}>{book.title}</Link>
                </td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.publishedDate}</td>
                <td>
                  <Link to={`/edit/${book.id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;