import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import TAMA from "./pages/TAMA";
import axios from "axios";
import { AuthContext } from "./helpers/AuthContext";
import Profile from "./pages/Profile";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import CustomAlert from "./components/reusable/CustomAlert";

function App() {


  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  const [alert, setAlert] = useState({});
  const closeAlert = () => {
    setAlert({});
  };

  useEffect(() => {
    axios
      .get("https://tama.up.railway.app/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    window.location.href = "/Login";
  };


  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              {/*<Link to="/" className="navbar-brand">Home</Link>  */}
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav me-auto">
                  {authState.status && (
                    <>
                      <li className="nav-item">
                        <Link to="/TAMA" className="nav-link">My TAMA</Link>
                      </li>
                    </>
                  )}
                </ul>
                <ul className="navbar-nav">
                  {!authState.status && (
                    <>
                      <li className="nav-item">
                        <Link to="/Register" className="nav-link">Register</Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/Login" className="nav-link">Log In</Link>
                      </li>
                    </>
                  )}
                  {authState.status && (
                    <>
                    <li className="nav-item">
                      <Link to="/Profile" className="nav-link">Profile - {authState.username}</Link>
                    </li>
                    <li className="nav-item">
                      <span className="nav-link" onClick={logout}>Logout</span>
                    </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
          {alert.type && alert.message && (
          <CustomAlert message={alert.message} type={alert.type} onClose={closeAlert} />
        )}
          <Routes>
            <Route path="/"  element={<Home/>} />
            <Route path="/Profile"  element={<Profile setAlert={setAlert} />} />
            <Route path="/TAMA"  element={<TAMA setAlert={setAlert} />} />
            <Route path="/Register"  element={<Register setAlert={setAlert} />} />
            <Route path="/Login"  element={<Login setAlert={setAlert} />}/>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );

}

export default App;
