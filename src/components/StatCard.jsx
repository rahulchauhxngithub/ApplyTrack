
function StatCard({ title, value, description }) {
  return (
    <article className="stat-card">
      <p>{title}</p>
      <h2>{value}</h2>
      <span>{description}</span>
    </article>
  );
}

export default StatCard;
