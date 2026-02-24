import React, { useState, useEffect } from "react";
import { addBook, getBookById, updateBook } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function BookForm() {
  const [book, setBook] = useState({
    title: "",
    author: "",
    email: "",
    age: "",
    publisher: "",
    publishedDate: "",
    overview: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getBookById(id).then((res) => setBook(res.data));
    }
  }, [id]);

  const validate = () => {
    let tempErrors = {};

    if (!book.title) tempErrors.title = "Title is required";
    if (!book.author) tempErrors.author = "Author is required";

    if (!book.email.match(/^\S+@\S+\.\S+$/))
      tempErrors.email = "Invalid Email";

    if (!Number.isInteger(Number(book.age)))
      tempErrors.age = "Age must be integer";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (id) {
      await updateBook(id, book);
    } else {
      await addBook(book);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{id ? "Edit Book" : "Add Book"}</h2>

      <input name="title" placeholder="Title" value={book.title} onChange={handleChange} />
      <p className="error">{errors.title}</p>

      <input name="author" placeholder="Author" value={book.author} onChange={handleChange} />
      <p className="error">{errors.author}</p>

      <input name="email" placeholder="Author Email" value={book.email} onChange={handleChange} />
      <p className="error">{errors.email}</p>

      <input name="age" placeholder="Author Age" value={book.age} onChange={handleChange} />
      <p className="error">{errors.age}</p>

      <input name="publisher" placeholder="Publisher" value={book.publisher} onChange={handleChange} />

      <input type="date" name="publishedDate" value={book.publishedDate} onChange={handleChange} />

      <textarea name="overview" placeholder="Overview" value={book.overview} onChange={handleChange} />

      <button type="submit">Save</button>
    </form>
  );
}

export default BookForm;