function StudentList({ data = [] }) {
  return (
    <ul>
      {data.map((data) => (
        <li key={data.id}>
          <h3>{data.name}</h3>
          <p>{data.grade}</p>
          
        </li>
      ))}
    </ul>
  );
}
export default StudentList;
