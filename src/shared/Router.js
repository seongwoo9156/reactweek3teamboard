import { BrowserRouter, Routes, Route } from "react-router-dom";

// import pages
import Detail from "../pages/Detail";
import List from "../pages/List";
import Write from "../pages/Write";
import Modify from "../pages/Modify";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/write" element={<Write />} />
        <Route path="/modify/:id" element={<Modify />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}
