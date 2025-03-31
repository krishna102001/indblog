import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Signin from "./pages/Signin";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path='/signin'
            element={
              <Layout>
                <Signin />
              </Layout>
            }
          />
          {/* <Route path='/signup' element={} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
