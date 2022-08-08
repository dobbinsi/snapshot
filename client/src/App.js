import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SingleMain from "./components/SingleMain";
import BigNumbers from "./components/BigNumbers";
import Double from "./components/Double";
import SingleTwo from "./components/SingleTwo";
import SingleBar from "./components/SingleBar";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <BigNumbers />
      <SingleMain />
      <Double />
      <SingleBar />
      <SingleTwo />
      <Footer />
    </div>
  );
}

export default App;
