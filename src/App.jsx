
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import ApplicationList from './components/ApplicationList';
import ApplicationForm from './components/ApplicationForm';
import './index.css';

function App() {
  // Load saved applications
  const [applications, setApplications] = useState(() => {
    try {
      const saved = localStorage.getItem(
        'applytrack-applications'
      );

      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  function initialForm() {
    return {
      company: '',
      role: '',
      status: 'Applied',
      date: new Date().toISOString().slice(0, 10),
    };
  }

  const [form, setForm] = useState(initialForm);

  // Persist applications
  useEffect(() => {
    try {
      localStorage.setItem(
        'applytrack-applications',
        JSON.stringify(applications)
      );
    } catch (error) {
      console.error('Unable to save applications:', error);
    }
  }, [applications]);

  // Handle input changes
  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function openForm() {
    setEditingId(null);
    setForm(initialForm());
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(initialForm());
  }

  // Add or update application
  function handleSubmit(event) {
    event.preventDefault();

    const applicationData = {
      ...form,
      company: form.company.trim(),
      role: form.role.trim(),
    };

    if (!applicationData.company || !applicationData.role) {
      return;
    }

    if (editingId !== null) {
      setApplications((previous) =>
        previous.map((app) =>
          app.id === editingId
            ? { ...app, ...applicationData }
            : app
        )
      );
    } else {
      const newApplication = {
        id: crypto.randomUUID(),
        ...applicationData,
      };

      setApplications((previous) => [
        ...previous,
        newApplication,
      ]);
    }

    closeForm();
  }

  // Edit application
  function handleEdit(app) {
    setEditingId(app.id);

    setForm({
      company: app.company,
      role: app.role,
      status: app.status,
      date: app.date,
    });

    setShowForm(true);
  }

  // Delete application
  function handleDelete(id) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this application?'
    );

    if (!confirmed) return;

    setApplications((previous) =>
      previous.filter((app) => app.id !== id)
    );
  }

  // Dashboard statistics
  const interviewCount = applications.filter(
    (app) => app.status === 'Interview'
  ).length;

  const offerCount = applications.filter(
    (app) => app.status === 'Offer'
  ).length;

  const pendingCount = applications.filter(
    (app) =>
      app.status === 'Applied' ||
      app.status === 'Assessment'
  ).length;

  const responseCount = applications.filter(
    (app) =>
      app.status === 'Interview' ||
      app.status === 'Offer' ||
      app.status === 'Rejected'
  ).length;

  const responseRate =
    applications.length === 0
      ? 0
      : Math.round(
          (responseCount / applications.length) * 100
        );

  // Count applications in each status
  const statusBreakdown = [
    { status: 'Applied', color: 'applied' },
    { status: 'Assessment', color: 'assessment' },
    { status: 'Interview', color: 'interview' },
    { status: 'Offer', color: 'offer' },
    { status: 'Rejected', color: 'rejected' },
  ].map((item) => ({
    ...item,
    count: applications.filter(
      (app) => app.status === item.status
    ).length,
  }));

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <span>My Workspace / Dashboard</span>

          <button
            type="button"
            className="profile-button"
            aria-label="User profile"
          >
            JD
          </button>
        </header>

        {/* Welcome section */}
        <section className="welcome">
          <div>
            <p className="eyebrow">YOUR CAREER JOURNEY</p>
            <h1>Dashboard</h1>
            <p>
              Keep track of your job search, all in one place.
            </p>
          </div>

          <button
            type="button"
            className="primary-button"
            onClick={openForm}
          >
            + Add application
          </button>
        </section>

        {/* Dashboard statistics */}
        <section className="stats">
          <StatCard
            title="Total applications"
            value={applications.length}
            description="All-time applications"
          />

          <StatCard
            title="Interviews"
            value={interviewCount}
            description="Opportunities to shine"
          />

          <StatCard
            title="Offers received"
            value={offerCount}
            description="Your next chapter"
          />

          <StatCard
            title="Pending applications"
            value={pendingCount}
            description="Applied or assessment stage"
          />

          <StatCard
            title="Response rate"
            value={`${responseRate}%`}
            description="Interview, offer, or rejection"
          />
        </section>

        {/* Application status overview */}
        <section className="status-overview">
          <div className="section-heading">
            <div>
              <h2>Application overview</h2>
              <p>Track your progress across every stage.</p>
            </div>
          </div>

          <div className="status-breakdown">
            {statusBreakdown.map((item) => {
              const percentage =
                applications.length === 0
                  ? 0
                  : Math.round(
                      (item.count / applications.length) * 100
                    );

              return (
                <div className="status-item" key={item.status}>
                  <div className="status-item-heading">
                    <span>{item.status}</span>
                    <span>
                      {item.count} · {percentage}%
                    </span>
                  </div>

                  <div className="status-progress">
                    <div
                      className={`status-progress-fill ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Application list */}
        <ApplicationList
          applications={applications}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={openForm}
        />

        {/* Add / edit application modal */}
        {showForm && (
          <ApplicationForm
            form={form}
            editingId={editingId}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            closeForm={closeForm}
          />
        )}
      </main>
    </div>
  );
}

export default App;
