import './App.css';
import Navbar from './Components/NavBar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './Components/Create/Create';
import Home from './Components/Home/Home';
import Edit from './Components/Edit/Edit';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from './ErrorBoundary';
import View from './Components/View/View';

function App() {
   

  return (
    <>
      <Router>
        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
        <ErrorBoundary>
          <ToastContainer />
        </ErrorBoundary>

        <Routes>
          <Route
            path="/Create"
            element={
              <ErrorBoundary>
                <Create />
              </ErrorBoundary>
            }
          />
          <Route
            path="/Edit/:id"
            element={
              <ErrorBoundary>
                <Edit />
              </ErrorBoundary>
            }
          />
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            }
          />
          <Route
            path="/View/:id"
            element={
              <ErrorBoundary>
                <View />
              </ErrorBoundary>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
