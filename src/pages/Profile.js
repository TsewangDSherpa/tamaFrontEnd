import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { useParams } from "react-router-dom";
import axios from "axios";

function Profile({ setAlert }) {
    const { authState } = useContext(AuthContext);
    const username = authState.username;
    const [user, setUser] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        axios.get(`https://tama.up.railway.app/auth/info/${username}`).then((response) => {
            setUser(response.data);
        });
    }, []);

    const handleUpdateEmail = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://tama.up.railway.app/auth/updateemail/${username}`, {
                email: newEmail
            });
            const response = await axios.get(`https://tama.up.railway.app/auth/info/${username}`);
            setUser(response.data);
            setAlert({ message: "Email updated successfully", type: "success" }); 
        } catch (error) {
            console.error("Error updating email:", error);
            setAlert({ message: "Failed to update email", type: "error" }); 
        }
        };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://tama.up.railway.app/auth/updatepassword/${username}`, {
                password: newPassword
            });
            const response = await axios.get(`https://tama.up.railway.app/auth/info/${username}`);
            setUser(response.data);
            setAlert({ message: "Password updated successfully", type: "success" }); 
        } catch (error) {
            console.error("Error updating password:", error);
            setAlert({ message: "Failed to update password", type: "error" });
        }
    };
    
    return (
        <div className="container mt-5 p-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="profilePageContainer border p-4">
                {user && (
                  <div className="userInfoContainer">
                    <h1 className="usernameHeading">Hello {user.username}</h1>
                    <div className="mt-3">
                      <p><strong>User ID:</strong> {user.id}</p>
                      <p><strong>E-mail:</strong> {user.email}</p>
                    </div>
                    <hr />
                    <form>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">New Email:</label>
                        <input type="email" className="form-control" id="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password:</label>
                        <input type="password" className="form-control" id="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary me-2" onClick={handleUpdateEmail}>Update Email</button>
                      <button type="submit" className="btn btn-primary" onClick={handleUpdatePassword}>Update Password</button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
      
}

export default Profile;