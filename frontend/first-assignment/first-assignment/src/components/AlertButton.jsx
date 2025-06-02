function AlertButton({ data }) {
    const message = `Student: ${data.name} Grade: ${data.grade}`
  return (
    <button
      className="alertButton"
      onClick={() => alert(message)}
      key={data.id}
    >
        Details
    </button>
  );
}
export default AlertButton;
