import React, { useState, useContext  } from "react";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";


function Login({ setAlert }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        setAlert({ message: response.data.error, type: "error" });
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        fetchPetInformation(response.data.username);
      }
    });

  };

  const fetchPetInformation = (username) => {
    console.log("INSIDE OF FETCH DATA.");
    axios.get(`http://localhost:3001/pets/byName/${username}`)
      .then((response) => {
        const petData = response.data[0];
        if (petData) {
          console.log("GOING TO ADJUST DATA.");
          adjustPetStats(petData);
        }
        navigate("/TAMA");
      })
      .catch((error) => {
        console.error("Error fetching pet information:", error);
      });
  };

  const adjustPetStats = (petData) => {
    console.log("INSIDE OF ADJUST DATA.");
    const currentTime = new Date();
    const updatedAtTime = new Date(petData.updatedAt);
    const timeDifference = currentTime - updatedAtTime;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    console.log("Hours: " + hoursDifference);

    const updatedHunger = Math.max(petData.hunger - 3 * hoursDifference, 0);
    const updatedFun = Math.max(petData.fun - 5 * hoursDifference, 0);
    const updatedSleepiness = Math.max(petData.sleepiness - 3 * hoursDifference, 0);
    const updatedAffection = Math.max(petData.affection - 4 * hoursDifference, 0);
    console.log("UPDATED STATS: " + updatedHunger);
    console.log("UPDATED STATS: " + updatedFun);
    console.log("UPDATED STATS: " + updatedSleepiness);

    const updatedStats = {
      hunger: updatedHunger,
      sleepiness: updatedSleepiness,
      fun: updatedFun,
      affection: updatedAffection,
    };

    axios.put(`http://localhost:3001/pets/updateLogin/${petData.id}`, updatedStats)
      .then(response => {
        console.log("Pet stats adjusted successfully");
      })
      .catch(error => {
        console.error("Error adjusting pet stats:", error);
      });
  };
  return (
    <div className="container mt-5 p-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Alphanumerical Only"
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter a password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="button" className="btn btn-primary" onClick={login}>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;