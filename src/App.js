import './App.css';
import { Route, Routes } from 'react-router-dom';
import DisplayExercises from './components/DisplayExercise/DisplayExercises';
import { useState, useEffect } from 'react';
import { ExerciseProvider } from './components/Context/ExercisesContext';
import AddNew from './components/AddExercise/AddNew';
import StopWatch from "./components/stopwatch/StopWatch"
import Sidebar from './components/Navbar/Sidebar';

function App() {
  var [exerciseListArray, setExerciseListArray] = useState([])
  function addNewExercise(obj) {
    console.log("obj here")
    let temp = {
      ...obj,
      id: Date.now(),
      stateDone: false
    }
    setExerciseListArray(prev => {
      return [temp, ...prev]
    })
  }
  function deleteExercise(id) {
    setExerciseListArray(exerciseListArray.filter((item) => {
      return item.id !== id
    }))
  }
  function updateExercise(exercise, index) {
    let tempArray = [...exerciseListArray];
    tempArray[index] = exercise;
    setExerciseListArray(tempArray)
  }

  function resetStates() {
    setExerciseListArray(prev => prev.map(item => { return { ...item, stateDone: false } }))
  }
  function updateState(id) {
    let temp = exerciseListArray.map((item)=>{
      return item.id===id?{...item, stateDone: !item.stateDone}: item
    })
    setExerciseListArray(temp);
  }

  useEffect(() => {
    const exercises = JSON.parse(localStorage.getItem("exercisesTodo"))
    if (exercises && exercises.length > 0) {
      setExerciseListArray(exercises);
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("exercisesTodo", JSON.stringify(exerciseListArray));
  })
  return (
    <div className="App bg-dark min-vh-100">

      <ExerciseProvider value={{ exerciseListArray, addNewExercise, deleteExercise, updateExercise, updateState, resetStates }}>
      <Sidebar />
        <Routes>
          <Route path = "/" element={<StopWatch />} />
          <Route path='/add' element={<AddNew />} />
          <Route path='/view' element = {<DisplayExercises />} />
        </Routes>

      </ExerciseProvider>
      {console.log(exerciseListArray)}
    </div>
  );
}

export default App;


//Add context for mini
//Add burger
//Add links inside burger
//Ask Zain about the solution of stopwatch