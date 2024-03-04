import React, { useEffect, useState } from 'react'
import './Display.css'

export default function DisplayCard({ object, onChangeNode, onDeleteNode, indexItem }) {
    var [exerciseState, setExerciseState] = useState(true)
    var [tempObject, setTempObject] = useState(object)

    useEffect(() => {
        setTempObject(object)
    }, [])
    function displayDays() {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        let optionArray = [];
        days.map((item, index) => {
            optionArray.push(<option value={item} selected={item === object.day} className='inputDisplay'>
                {item}
            </option>)
        })
        return optionArray;

    }

    return (
        <tr>
            <th>
                <input type="text" disabled={exerciseState} value={tempObject.name}
                    className='form-control inputDisplay'
                    onChange={(e) => {
                        let temp = {
                            ...tempObject,
                            name: e.target.value
                        }
                        setTempObject(temp);
                    }}
                />
            </th>
            <th >
                <div className='d-flex flex-row align-items-center justify-content-between'>
                    <input type="number" disabled={exerciseState} value={tempObject.times}
                        className='inputDisplay col-8'
                        onChange={(e) => {
                            let temp = {
                                ...tempObject,
                                times: e.target.value
                            }
                            setTempObject(temp);
                        }}
                    />

                    {exerciseState ?
                        tempObject.type :
                        <select className='bg-dark' onInput={(e) => {
                            let temp = {
                                ...tempObject,
                                type: e.target.value
                            }
                            setTempObject(temp)
                        }}>
                            <option value="reps" selected>Reps</option>
                            <option value="seconds">Seconds</option>
                        </select>
                    }
                </div>
            </th>
            <th>{exerciseState ? tempObject.day :
                <select className='inputDisplay'
                    onInput={(e) => {
                        let temp = {
                            ...tempObject,
                            day: e.target.value
                        }
                        setTempObject(temp)
                    }}>
                    {displayDays()}
                </select>
            }</th>
            <th>
                {exerciseState ?
                    tempObject.helper &&
                    <a href={tempObject.helper} target='_blank' rel='noreferrer noopener'
                        className='btn btn-light'
                    >
                        Guide
                    </a>
                    :
                    <input type='url' value={tempObject.helper}
                        className='inputDisplay'
                        onChange={(e) => setTempObject(prev => {
                            return {
                                ...prev,
                                helper: e.target.value
                            }
                        })}
                    />}
            </th>
            <th>
                <div className='d-flex flex-row justify-content-evenly align-items-center'>
                    <button
                        className='btn btn-success rounded mx-1 col-6'
                        onClick={() => {
                            if (!exerciseState) {
                                onChangeNode(tempObject, indexItem);
                            }
                            setExerciseState(prev => !prev);
                        }}
                    >
                        {!exerciseState ? "Save" : "Edit"}
                    </button>
                    <button className='btn btn-danger rounded mx-1 col-6'
                        onClick={() => {
                            onDeleteNode(tempObject);
                        }}
                    >
                        Delete
                    </button>
                </div>

            </th>
        </tr>
    )
}
