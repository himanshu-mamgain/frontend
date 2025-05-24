import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Users from "./user/pages/users";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";

import "./App.css";
import Auth from "./user/pages/Auth";

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/:userId/places" element={<UserPlaces />} />
          <Route path="/places/new" element={<NewPlace />} />
          <Route path="/places/:placeId" element={<UpdatePlace />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<Users />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
