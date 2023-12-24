export default function Input({ label, id, withError, ...props }) {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} />
      {withError && <p className="hasError">Insert a valid value!</p>}
    </p>
  );
}
