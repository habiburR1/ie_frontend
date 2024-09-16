import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import "./styles.css";
import CompostingGuide from "./CompostingGuide.tsx";
import Recyclable from "./Recyclable.tsx";
import Achievements from "./Achievements.tsx";
import NoPage from "./NoPage.tsx";
import IdentifyWaste from "./IdentifyWaste.tsx";
import MapPage from "./MapPage.tsx";
import PlantRecommendation from "./PlantRecommendation.tsx";
import CompostRatioCalculator from "./CompostRatioCalculator.tsx";
import WastePrediction from './WastePrediction.tsx';
import HelloWorld from "./HelloWorld.tsx";
export default function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/CompostingGuide" element={<CompostingGuide />} />
            <Route path="/recyclable" element={<Recyclable />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/IdentifyWaste" element={<IdentifyWaste />} />
            <Route path="/MapPage" element={<MapPage />} />
            <Route path="/PlantRecommendation" element = {<PlantRecommendation />} />
            <Route path="/CompostRatioCalculator" element = {<CompostRatioCalculator />} />
            <Route path="/WastePrediction" element = {<WastePrediction />} />
            <Route path="/HelloWorld" element = {<HelloWorld />} />
            <Route path="*" element={<NoPage />} />{" "}
            {/* Handles undefined routes */}
          </Routes>
        </BrowserRouter>
      </div>
  );
}
