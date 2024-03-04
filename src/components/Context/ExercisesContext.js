import {createContext, useContext} from 'react';

export const ExerciseContext = createContext({
    exerciseListArray:[{
    id:0,
    name: "",
    times: 0,
    type: "",
    day: "Monday",
    helper: null,
    stateDone: false
}],
addNewExercise: (item)=>{}, //adding new exercise
deleteExercise: (id)=>{}, //deleting one from the list
updateExercise: (node, index)=>{}, //updating an exercise
updateState: (id)=>{},  //marking the exercise as done or undone / turning the stateDone as on or off
resetStates: ()=>{} //resetting the exercises to false
})

export const useExerciseContext = ()=>{
    return useContext(ExerciseContext);
}

export const ExerciseProvider = ExerciseContext.Provider;