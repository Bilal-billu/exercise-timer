import React from 'react'
import DisplayCard from './DisplayCard'
import './Display.css'
import '../../Additional.css'
import { useExerciseContext } from '../Context/ExercisesContext'

export default function DisplayExercises() {

    var {exerciseListArray, deleteExercise, updateExercise} = useExerciseContext();

    
    function updateList(node, index){
        updateExercise(node, index)
    }

    return (
        <div className='loadAnimation'>
            {exerciseListArray&&exerciseListArray.length>0?
            <table className='overflow-auto table'>
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Day</th>
                        <th scope="col">Reference</th>
                        <th scope="col">Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {exerciseListArray.map((item, index) => {
                       return( <DisplayCard object={item} key={index} onChangeNode={updateList} indexItem={index}
                        onDeleteNode={(obj)=>{
                            deleteExercise(obj.id);
                        }} />)
                    })}
                </tbody>
            </table>
            :
            <h1 className='display-1 fw-bolder'>No Data Available</h1>
            }
        </div>
    )
}
