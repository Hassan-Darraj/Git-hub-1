import StudentList from './components/StudentList';
import StudentCard from './components/StudentCard';



function App() {
  const students = [
  { id: 1, name: "Sarah Ali", grade: 95 },
  { id: 2, name: "Omar Tarek", grade: 82 },
  { id: 3, name: "Lina Haddad", grade: 76 }
];


  return (
    <>
      <StudentList data={students} />
      <StudentCard data={students}/>
    </>
  )
}

export default App
