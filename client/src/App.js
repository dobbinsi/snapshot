import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BigNumbers from "./components/BigNumbers";
import LeaderboardSpaces from "./components/LeaderboardSpaces";
import LeaderboardUsers from "./components/LeaderboardUsers";
import TrendsProp from "./components/TrendsProp";
import TrendsVote from "./components/TrendsVote";
import Breakdown from "./components/Breakdown";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <BigNumbers />
      <LeaderboardSpaces />
      <LeaderboardUsers />
      <TrendsProp />
      <TrendsVote />
      <Breakdown />
      <Footer />
    </div>
  );
}

export default App;
