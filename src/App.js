import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import FinalComponent from "./component/FinalComponent";
import Login from "./component/Authentification/Login";
import authApi from "./api/auth";
import UserContext from "./context/UserContext";
import Admin from "./component/admincomponent/Admin";
import AddLevel from "./component/admincomponent/level/AddLevel";
import LevelUpdate from "./component/admincomponent/updateLavel";
import AddClasse from "./component/admincomponent/classe/AddClasse";
import AddEleve from "./component/admincomponent/eleve/AddEleve";
import Profile from "./component/admincomponent/profile/Profile";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = authApi.getUser();
    setUser(user);
    console.log(user);
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          {user && <FinalComponent />}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            {user && (
              <>
                <Route exact path="/admin" element={<Admin />} />
                <Route exact path="/classe" element={<AddLevel />} />
                <Route
                  exact
                  path="/updateLevels/:id"
                  element={<LevelUpdate />}
                />
                <Route exact path="/addclasse/:id" element={<AddClasse />} />
                <Route
                  exact
                  path="/ajouterStudent/:id"
                  element={<AddEleve />}
                />
                <Route exact path="/Profile" element={<Profile />} />
              </>
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

function NotFound() {
  return <h1>404 - Page not found</h1>;
}

export default App;
