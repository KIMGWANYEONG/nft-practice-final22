import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Rank from "./pages/Rank";
import Layout from "./components/Layout";
import MintNft from "./pages/MintNft";
import Vote from "./pages/Vote";
import SaleNft from "./pages/SaleNft";
import Minting from "./pages/Minting";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Rank" element={<Rank />} />
          <Route path="/mint-nft" element={<MintNft />} />
          <Route path="/minting" element={<Minting />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/sale-nft" element={<SaleNft />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
