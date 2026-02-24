import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BookList from './Components/BookList.jsx'
import BookForm from './Components/BookForm.jsx'
import BookDetails from './Components/BookDetails.jsx'
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>📚 Book Inventory Management</h1>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<BookForm />} />
          <Route path="/edit/:id" element={<BookForm />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;