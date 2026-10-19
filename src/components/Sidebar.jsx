
function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">
        ApplyTrack<span>.</span>
      </h2>

      <p className="nav-heading">WORKSPACE</p>

      <nav>
        <a href="#dashboard" className="nav-link active">
          Dashboard
        </a>

        <a href="#applications" className="nav-link">
          Applications
        </a>

        <a href="#interviews" className="nav-link">
          Interviews
        </a>

        <a href="#settings" className="nav-link">
          Settings
        </a>
      </nav>

      <div className="sidebar-footer">
        <div className="avatar">JD</div>

        <div>
          <strong>Job Seeker</strong>
          <p>My workspace</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
