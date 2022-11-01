import { Route } from "react-router-dom";
import "./App.css";
import Home from "./components/main/home/Home.jsx";
import Landing from "./components/landing/Landing.jsx";
import BreedDetail from "./components/main/breedDetail/BreedDetail.jsx";
import NewBreed from "./components/main/newBreed/NewBreed.jsx";

function App() {
  return (
    <div className="App">
      <Route path={"/"} exact component={Landing} />
      <Route path={"/home"} exact component={Home} />
      <Route path={"/home/breeds/:breedId"} exact component={BreedDetail} />
      <Route path={"/home/newBreed"} exact component={NewBreed} />
    </div>
  );
}

export default App;
