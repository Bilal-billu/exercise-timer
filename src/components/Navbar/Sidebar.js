import React, { useState } from 'react'
import { Icon } from '@iconify-icon/react';
import Navbar from './Navbar';
import './Side.css'
import DisplayMini from '../DisplayExercise/DisplayMini';
import { useExerciseContext } from '../Context/ExercisesContext';


export default function Sidebar() {
  var { resetStates } = useExerciseContext()
  var [btnBurger, setBtnBurger] = useState(false);
  const xIcon = "tabler:x";
  const burgerIcon = "iconamoon:menu-burger-horizontal-bold";
  return (
    <div className='col-12 col-sm-5 col-lg-4 col-xl-3 bg-dark sideDivForNav'>
      <button onClick={() => { setBtnBurger(!btnBurger) }}
        className='btnNavBurger btn-dark bg-transparent border border-1 border-light h2 p-1 rounded-1 d-flex justify-content-center align-items-center'
      ><Icon icon={btnBurger ? xIcon : burgerIcon} /></button>

      <div className={`position-absolute bg-dark col-12 innerSideDiv ${btnBurger ? 'show' : 'hide'}`} >
        <h1 className='mt-3'>
          <Icon icon="game-icons:weight-lifting-up" className='display-1 ps-2' />
          <h1 className='display-1 fw-bolder nameFont'>Boss</h1>
        </h1>
        <hr className='my-5' />
        <Navbar />
        <hr className='my-2' />
        <button className='col-11 border border-1 btn btn-success my-4 mx-2'
          onClick={resetStates}
        >Reset All</button>
        <DisplayMini />
      </div>

    </div >
  )
}
