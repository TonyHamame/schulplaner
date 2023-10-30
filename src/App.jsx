import { useMemo, useRef, useState } from 'react';
import './App.css';
import { db } from './firebase';
import { onValue, ref, remove, child, push } from 'firebase/database';
import { useEffect } from 'react';
import { useParams } from 'react-router';

const expensesRef = ref(db, "expenses")

function App() {

  const [Months, setMonths] = useState([])
  
  useEffect(() => {
      onValue(expensesRef, snap => {

        var MonthsTemp = []
		

        for(var month in snap.val()){
          	MonthsTemp[MonthsTemp.length] = {...snap.val()[month], id: month}
        }
        setMonths(MonthsTemp);
      })
  }, [])

  return(
	<div className="App">
		<h1>Ausgaben:</h1>
		  <div id='tasksContainer'>
		  {
			Months.map(month => {
			  return(
				<div className='TasksContainer' key={month.id}>
					<a id='monthTitle' href='#11' key={Math.random()}>Gehalt für den Monat: {month.id}</a>
				</div>
			  )
			})
		  }
			
		  </div>
	</div>
  )

}



export function MonthExpenses() {
	var {month} = useParams()

	const currentMonthRef = useMemo(() => ref(db, "expenses/" + month), [month])

	const [data, setData] = useState([])


	const titleTbRef = useRef()
	const costsTbRef = useRef()
	const isPositiveRef = useRef()

	useEffect(() => {
		onValue(currentMonthRef, snap => {
			var MonthsTemp = []
			for(var month in snap.val()){
				  MonthsTemp[MonthsTemp.length] = {...snap.val()[month], id: month}
			}
			setData(MonthsTemp);
		  })
	}, [])


	function removeExpense(id) {
		var el = child(currentMonthRef, id)
		remove(el)
	}

	function addExpense() {
		var costs = isPositiveRef.current.checked === false ? costsTbRef.current.value * -1 : costsTbRef.current.value;
		var d = new  Date()
		var dateString = ('0' + d.getDate()).slice(-2) + '.'
             + ('0' + (d.getMonth()+1)).slice(-2) + '.'
             + d.getFullYear();

		var data = {
			title: titleTbRef.current.value,
			costs: costs,
			date: dateString
		}


	push(currentMonthRef, data).then(e => {
		titleTbRef.current.value = ""
		costsTbRef.current.value = ""
	})
	}


	return(
		<div>
			<h1>Ausgaben Von Gehalt Nr. {month}</h1>
			<div id='monthExpenses'>
				{
					data.map(expense => {
						return (
						<div className="expense" key={expense.id}>
							<p className="expenseDate">{expense.date}</p>
							<h2 className="expenseTitle">{expense.title}</h2>
							<h2 className={(expense.costs > 0) ? "expenseCost positive" : "expenseCost"}>{expense.costs}€</h2>
							<button className='deleteBtn' onClick={() => removeExpense(expense.id)}><i className="fa-solid fa-trash"></i></button>
						</div>)
					})
				}
			</div>

			<div id="addExp">
				<h1 className="addTitle">Ausgabe hinzufügen:</h1>
				<div>
					<input type="text" ref={titleTbRef} id="addTitleTb" placeholder='Titel' />
					<input type="text" ref={costsTbRef} placeholder='Preis' id="addCostsTb" /> <br/>
					<input type='checkbox' id='chk' ref={isPositiveRef}/> <label htmlFor="chk">Geld bekommen? </label> <br/>
					<button id='addBtn' onClick={() => addExpense()}>Hinzufügen</button>
				</div>
			</div>
		</div>
	)
}


export default App;
