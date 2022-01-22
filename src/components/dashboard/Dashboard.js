import React from "react";
import Feed from "./feed/Feed";
import Profile from "./Profile/Profile";
import "./Dashboard.scss";
import UserProfile from "./Profile/UserProfile";
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="section__feed">
        <Feed />
      </div>
      <div className="section__profile">
        <UserProfile />
      </div>
    </div>
  );
}

export default Dashboard;
