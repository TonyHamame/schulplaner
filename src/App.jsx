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
		var monthName = ""
		
		

        for(var month in snap.val()){
			monthName = addMonthName(month)
          	MonthsTemp[MonthsTemp.length] = {...snap.val()[month], id: month, monthName: monthName}
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
					<a className='monthTitle' href={'#' + month.id} key={Math.random()}>{month.monthName}</a>
			  )
			})
		  }
			
		  </div>
	</div>
  )

}

function addMonthName(num) {
	var monthName
	switch(num.toString()) {
		case "1":
			monthName = "Januar"
			break;
		case "2":	
		monthName = "Februar"			
			break;
		case "3":
			monthName = "März"
			break;
		case "4":
			monthName = "April"
			break;
		case "5":
			monthName = "Mai"
			break;
		case "6":
			monthName = "Juni"
			break;
		case "7":
			monthName = "Juli"
			break;
		case "8":
			monthName = "August"
			break;
		case "9":
			monthName = "September"
			break;
		case "10":
			monthName = "Oktober"
			break;
		case "11":
			monthName = "November"
			break;
		case "12":
			monthName = "Dezember"
			break;
		default: 
		break;
	}
	return monthName
  }



export function MonthExpenses() {
	var {month} = useParams()

	const currentMonthRef = useMemo(() => ref(db, "expenses/" + month), [month])

	const [data, setData] = useState([])

	var monthName = addMonthName(month);

	const titleTbRef = useRef()
	const costsTbRef = useRef()
	const isPositiveRef = useRef()

	useEffect(() => {
		onValue(currentMonthRef, snap => {
			var MonthsTemp = []
			for(var month in snap.val()){
				  MonthsTemp[MonthsTemp.length] = {...snap.val()[month], id: month, monthName: monthName}
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
			<h1>Ausgaben - Gehalt für {monthName}</h1>
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
