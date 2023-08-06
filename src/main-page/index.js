import { useEffect, useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './main-page.css';
import Header from './header';
import FeaturedHouse from "./featured-house";
import SearchResults from "../search-results";
import HouseFilter from "./house-filter";
import HouseFromQuery from "../house/HouseFromQuery";

function App() {
  const [allHouses, setAllHouses] = useState([]);

  useEffect(() => {
    const fecthHouses = async () => {
      const rsp = await fetch("/houses.json");
      const houses = await rsp.json();
      setAllHouses(houses);
    };
    fecthHouses();
  }, []);

  const featuredHouse = useMemo(() => {
    if (allHouses.length) {
      const randomIndex = Math.floor(Math.random() * allHouses.length);
      return allHouses[randomIndex];
    }
  }, [allHouses]);
  
  return (
    <Router>
      <div className="container">
        <Header subtitle="Providing houses all over the world"/>
        <HouseFilter allHouses={allHouses}/>
        <Routes>
          <Route exact path="/" element={<FeaturedHouse house={featuredHouse} />} />
          {/* <Route path="/">
            <FeaturedHouse house={featuredHouse}></FeaturedHouse>
          </Route> */}
          <Route path="/searchresults/:country" element={<SearchResults allHouses={allHouses}/>} />
          <Route path="/house/:id" element={<HouseFromQuery allHouses={allHouses}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
