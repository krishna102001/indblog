import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Blogs from "./pages/Blogs";
import { useAppContext } from "./context/AppContext";
import NotFoundPage from "./pages/NotFoundPage";
import AddBlog from "./pages/AddBlog";
import ViewBlog from "./pages/ViewBlog";

function App() {
  const { userData } = useAppContext();
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
                <Auth />
              </Layout>
            }
          />
          {userData && (
            <>
              <Route
                path='/blogs'
                element={
                  <Layout>
                    <Blogs />
                  </Layout>
                }
              />
              <Route
                path='/create/blog'
                element={
                  <Layout>
                    <AddBlog />
                  </Layout>
                }
              />
              <Route
                path='/view/blog/:id'
                element={
                  <Layout>
                    <ViewBlog />
                  </Layout>
                }
              />
            </>
          )}
          <Route
            path='/*'
            element={
              <Layout>
                <NotFoundPage />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
