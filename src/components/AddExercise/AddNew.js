import React, { useState } from 'react'
import './Exercise.css'
import AddCard from './AddCard'
import '../../Additional.css'
import { useExerciseContext } from '../Context/ExercisesContext'

export default function AddNew() {
    var [fields, setFields] = useState({
        name: "",
        times: 10,
        type: "reps",
        day: "Monday",
        helper: ""
    })

    const { addNewExercise } = useExerciseContext();

    const inputFieldsCard = [
        {
            name: "Exercise Name",
            value: fields.name,
            req: true,
            onChange: (val) => {
                setFields((prev) => {
                    return ({
                        ...prev,
                        name: val
                    })
                })
            }
        },
        {
            name: "Helping Link",
            type: "url",
            value: fields.helper,
            onChange: (val) => {
                setFields((prev) => {
                    return ({
                        ...prev,
                        helper: val
                    })
                })
            }
        },
        {
            name: "Times",
            type: "number",
            req: true,
            min: 1,
            value: fields.times,
            onChange: (val) => {
                setFields((prev) => {
                    return ({
                        ...prev,
                        times: val
                    })
                })
            }
        },]
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    const radioRepsSecs = [
        {
            name: "Reps",
            value: "reps",
        },
        {
            name: "Seconds",
            value: "seconds",
        }
    ]
    function validateURL() {
        var urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;

        if (urlPattern.test(fields.helper)) {
            return false;
        }
        alert('Please enter a valid URL.');
        return true;
    }
    function submitForm(e) {
        console.log(fields)
        e.preventDefault();
        if (fields.name && fields.type && fields.times) {
            if (fields.helper.length > 0) {
                if (validateURL()) {
                    return
                }
            }

            addNewExercise(fields)
            setFields({
                name: "",
                times: 10,
                type: "reps",
                helper: ""
            })
        }
    }
    function selectOptions() {
        let optionArray = [];
        days.map((item, index) => {
            optionArray.push(<option value={item} selected={item === fields.day} key={index}>
                {item}
            </option>)
        })
        return optionArray;

    }

    return (
        <form
            className='d-flex flex-column justify-content-center align-items-center align-content-center border border-danger p-5 row loadAnimation'
            onSubmit={submitForm}
        >
            {inputFieldsCard.map((item, index) => {
                return (<AddCard key={index} item={item} />)
            })}

            <div className='d-flex flex-row justify-content-between justify-content-md-center align-items-center align-content-center row px-sm-5'>
                <label className='col-2 col-sm-3 col-md-4 col-lg-4 text-danger h3 required' htmlFor='reps-secs'>
                    Seconds / Reps:
                </label>
                <div className='d-flex flex-column flex-sm-row flex-sm-row justify-content-center align-items-center align-content-center col-7 col-lg-5 px-md-5 mx-lg-5'
                
                    id="reps-secs"
                >
                    {radioRepsSecs.map((item, index) => {
                        return (<label className='col-4 col-md-7 col-lg- col-xl-5 bg-danger py-md-3 text-white mx-1 rounded rounded-5 h3 radioLabelsInner'
                            htmlFor={`reps-secs` + item.name}
                            key={index}
                        >
                            <input type='radio' id={`reps-secs` + item.name} name="type" value={item.value} checked={item.value === fields.type}
                                onChange={(e) => {
                                    setFields((prev) => {
                                        return {
                                            ...prev,
                                            type: e.target.value
                                        }
                                    })
                                }}
                            />
                            {item.name}
                        </label>
                        )
                    })}
                </div>
            </div>
            <div className='d-flex justify-content-center align-items-center align-content-center'>
            <label className='col-4 col-sm-3 col-md-3 text-danger h3 required'  htmlFor="daySelector">
                Day:
            </label>
            <select id="daySelector" onInput={(e) => {
                setFields((prev) => {
                    return {
                        ...prev,
                        day: e.target.value
                    }
                })
            }}
            className='m-3 col-8 col-sm-7 col-md-6 col-lg-5 bg-danger p-1 h3' required
            value={fields.day}
            >
                {selectOptions()}
            </select>
            </div>
            <input type="submit" className='col-4 col-sm-3 col-md-2 bg-danger p-3 m-5 text-white mx-1 rounded rounded-pill h3' />

        </form>
    )
}
