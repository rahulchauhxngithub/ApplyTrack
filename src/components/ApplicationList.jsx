
import { useState } from 'react';

function ApplicationList({
  applications,
  onEdit,
  onDelete,
  onAdd,
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  const filteredApplications = applications
    .filter((app) => {
      const query = search.trim().toLowerCase();

      return (
        app.company.toLowerCase().includes(query) ||
        app.role.toLowerCase().includes(query)
      );
    })
    .filter((app) => {
      return (
        statusFilter === 'All' ||
        app.status === statusFilter
      );
    })
    .sort((a, b) => {
      const comparison = a.date.localeCompare(b.date);

      return sortOrder === 'newest'
        ? -comparison
        : comparison;
    });

  return (
    <section
      className="applications-section"
      id="applications"
    >
      <div className="section-heading">
        <div>
          <h2>Your applications</h2>
          <p>Manage and track your job search.</p>
        </div>

        <span className="result-count">
          {filteredApplications.length} results
        </span>
      </div>

      <div className="application-toolbar">
        <input
          type="search"
          placeholder="Search company or role..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label="Search applications"
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          aria-label="Filter by status"
        >
          <option value="All">All statuses</option>
          <option value="Applied">Applied</option>
          <option value="Assessment">Assessment</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          aria-label="Sort applications"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {filteredApplications.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">↗</div>

          <h2>
            {applications.length === 0
              ? 'Your next opportunity starts here'
              : 'No matching applications'}
          </h2>

          <p>
            {applications.length === 0
              ? 'Add your first job application to start tracking your progress.'
              : 'Try another search term or change the status filter.'}
          </p>

          {applications.length === 0 && (
            <button
              type="button"
              className="primary-button"
              onClick={onAdd}
            >
              + Add your first application
            </button>
          )}
        </div>
      ) : (
        <div className="application-list">
          {filteredApplications.map((app) => (
            <article
              className="application-row"
              key={app.id}
            >
              <div className="company-avatar">
                {app.company.trim().charAt(0).toUpperCase()}
              </div>

              <div className="application-details">
                <h3>{app.company}</h3>
                <p>{app.role}</p>
                <span>Applied {app.date}</span>
              </div>

              <span
                className={`status-badge status-${app.status.toLowerCase()}`}
              >
                {app.status}
              </span>

              <div className="application-actions">
                <button
                  type="button"
                  className="action-button"
                  onClick={() => onEdit(app)}
                  aria-label={`Edit ${app.company}`}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="action-button delete-button"
                  onClick={() => onDelete(app.id)}
                  aria-label={`Delete ${app.company}`}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default ApplicationList;
