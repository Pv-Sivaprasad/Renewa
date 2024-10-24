import React from 'react';

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <a href="#" className="logo">
            <img src="#" alt="Logo" />
          </a>
        </div>
        <ul className="sidebar-menu">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Analytics</a>
          </li>
          <li>
            <a href="#">Clients</a>
          </li>
          <li>
            <a href="#">Tasks</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Feedback</a>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="header">
          <div className="title">
            <h1>Dashboard</h1>
            <span>Home</span>
          </div>
          <div className="search">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="actions">
            <button className="btn">
              <i className="fas fa-calendar-alt"></i>
              <span>Apr 17, 2023</span>
            </button>
            <button className="btn">
              <i className="fas fa-bell"></i>
            </button>
          </div>
        </div>
        <div className="overview">
          <h2>Overview</h2>
          <div className="row">
            <div className="card">
              <h3>Users</h3>
              <div className="metric">
                <h2>14k</h2>
                <span className="positive">+25%</span>
              </div>
              <div className="chart">
                {/* Add chart logic here */}
              </div>
              <p>Last 30 days</p>
            </div>
            <div className="card">
              <h3>Conversions </h3>
              <div className="metric">
                <h2>2k</h2>
                <span className="negative">-10%</span>
              </div>
              <div className="chart">
                {/* Add chart logic here */}
              </div>
              <p>Last 30 days</p>
            </div>
          </div>
          <div className="row">
            <div className="card">
              <h3>Event Count</h3>
              <div className="metric">
                <h2>3k</h2>
                <span className="positive">+50%</span>
              </div>
              <div className="chart">
                {/* Add chart logic here */}
              </div>
              <p>Last 30 days</p>
            </div>
            <div className="card">
              <h3>Sessions</h3>
              <div className="metric">
                <h2>4k</h2>
                <span className="negative">-20%</span>
              </div>
              <div className="chart">
                {/* Add chart logic here */}
              </div>
              <p>Last 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;