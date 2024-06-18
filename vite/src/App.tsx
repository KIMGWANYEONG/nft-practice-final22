import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Rank from "./pages/Rank";
import Layout from "./components/Layout";
import MintNft from "./pages/MintNft";
import MyNft from "./pages/MyNft";
import SaleNft from "./pages/SaleNft";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Rank" element={<Rank />} />
          <Route path="/mint-nft" element={<MintNft />} />
          <Route path="/my-nft" element={<MyNft />} />
          <Route path="/sale-nft" element={<SaleNft />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
