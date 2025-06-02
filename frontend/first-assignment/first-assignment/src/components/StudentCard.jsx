import AlertButton from './AlertButton';


function StudentCard({ data = [] }) {
    
  return (
    <div>
      {data.map((dataItem) => (
        <div key={dataItem.id} className="card-list">
          <h3>{dataItem.name}</h3>
          <p>{dataItem.grade}</p>
          <p>{dataItem.grade >= 85 ? "Excellent Student" : "Needs Improvement"}</p>
          <AlertButton data={dataItem}/>
        </div>
      ))}
    </div>
  );
}
export default StudentCard;
