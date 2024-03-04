import React, { useEffect, useState, useRef } from 'react'
import DisplayMiniCard from './DisplayMiniCard'
import { useExerciseContext } from '../Context/ExercisesContext'
import './Display.css'

export default function DisplayMini() {
  var { exerciseListArray, updateState } = useExerciseContext();
  var [doneList, setDoneList] = useState([]);
  var [notDoneList, setNotDoneList] = useState([]);
  const longRef = useRef(null);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var currentDay = new Date();
  currentDay = currentDay.getDay();
  const today = daysOfWeek[currentDay];

  useEffect(() => {
    isDone();
  }, [])
  useEffect(() => {
    isDone();
  }, [exerciseListArray])

  function isDone() {
    let todaysList = exerciseListArray.filter((item) => {
      return today.includes(item.day) ? item : null
    })
    setDoneList(todaysList.filter((item) => {
      return item.stateDone === true ? item : null
    }))
    setNotDoneList(todaysList.filter((item) => {
      return item.stateDone === false ? item : null
    }))
  }


  function setRef(id) {
    longRef.current = setInterval(() => {
      updateState(id) // Specific function that sets the item
    }, 700)
  }

  function clearRef() {
    clearInterval(longRef.current)
  }

  return (
    <div className='my-3'>
      {exerciseListArray.filter(item => {
        return today.includes(item.day)
      }) ? (<>
        {notDoneList && notDoneList.length > 0 &&
          notDoneList.map(item => {
            return <DisplayMiniCard item={item} key={item.id}
              mouseDown={(id) => setRef(id)} mouseUp={clearRef}
            />
          })}
        {doneList && doneList.length > 0 &&
          doneList.map((item) => {
            return <DisplayMiniCard item={item} key={item.id}
              mouseDown={(id) => setRef(id)} mouseUp={clearRef}
            />
          })}
      </>)

        : <p className='fw-bolder'>Add Some Exercises for Today</p>}
    </div>
  )
}
