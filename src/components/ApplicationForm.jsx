
function ApplicationForm({ form, onChange, onSubmit, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="application-modal"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
      >
        <div className="modal-header">
          <div>
            <h2 id="form-title">
              {form.id ? 'Edit application' : 'Add application'}
            </h2>
            <p>Keep your job search organised.</p>
          </div>

          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close form"
          >
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} className="application-form">
          <label>
            Company name
            <input
              name="company"
              value={form.company}
              onChange={onChange}
              placeholder="e.g. Infosys"
              required
            />
          </label>

          <label>
            Job role
            <input
              name="role"
              value={form.role}
              onChange={onChange}
              placeholder="e.g. Software Developer"
              required
            />
          </label>

          <label>
            Application status
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              required
            >
              <option value="Applied">Applied</option>
              <option value="Assessment">Assessment</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </label>

          <label>
            Application date
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
              required
            />
          </label>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {form.id ? 'Save changes' : 'Add application'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ApplicationForm;
