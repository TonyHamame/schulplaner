import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Hausaufgaben:</h1>
      <div id='tasksContainer'>
          
			<Task title={"test-aufgabe"} subject="spanish" dateTo={"09.09.2023"} dateCreated={"28.08.2023"} id={"1234"} />
			<Task title={"test-aufgabe"} dateTo={"09.09.2023"} dateCreated={"28.08.2023"} id={"1234"} />

      </div>
    </div>
  );
}

function Task({title, subject, description, dateTo, dateCreated, id}) {
	return(
  <div className='task'>
		<h2 className="taskTitle">{subject}:{title}</h2>
		<p className="dateTo">{dateTo}</p>
		<p className="dateCreated">{dateCreated}</p>
		<p className="taskDescription">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid amet ullam tenetur exercitationem pariatur repellendus accusantium odit at laborum temporibus.</p>
		<input type="button" value="✓" className="doneBtn" />
		<input type="button" value="X" className='deleteBtn'/>
  </div>)
}

export default App;
