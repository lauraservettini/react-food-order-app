export default function Error({ title, message }) {
  return (
    <div className="error hasError">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
