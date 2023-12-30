import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./containers/Home/Home";
import Categories from "./containers/Categories/Categories";

function App() {
  return (
    <>
      <Header />
      <div className="container w-50">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/categories" element={<Categories/>}/>
          <Route path="*" element={<h1 className="text-center">Not Found!</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
