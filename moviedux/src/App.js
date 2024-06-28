import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MovieGrid from "./components/MoviesGrid";
import Book from "./components/Book";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Header></Header>
        <MovieGrid></MovieGrid>
        <Book></Book>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
