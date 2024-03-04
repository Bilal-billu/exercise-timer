import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify-icon/react';
import SubTimerCard from './SubTimerCard';
import './StopWatch.css'
import '../../Additional.css'
import mp3File from './folder/beeper.mp3'

export default function StopWatch() {
    var [btnPauseOrPlay, setBtnPauseOrPlay] = useState({
        icon: "octicon:play-24",
        state: false
    })
    /*
        var [workout, setWorkout] = useState({
            isBreak: false,
            prevWorkoutTime: 30,
            prevBreakTime: 15, //ending break on this time
            countSets: 0
        });
        */

    var [totalTime, setTotalTime] = useState(0);
    var [workoutSets, setWorkoutSets] = useState(0);
    //var [workoutTime, setWorkoutTime] = useState(0);


    const totalIntervalRef = useRef(null);
    //const workoutIntervalRef = useRef(null);

    //Button to toggle between pause and play
    function toggleStartnPause() {
        if (btnPauseOrPlay.state) {
            setBtnPauseOrPlay({
                icon: "octicon:play-24",
                state: false
            })
            //clearing the interval
            clearInterval(totalIntervalRef.current);
            //clearInterval(workoutIntervalRef.current)
        }
        else {
            setBtnPauseOrPlay({
                icon: "carbon:pause-outline",
                state: true
            })
            //starting the interval
            startTotalTimer();
        }
        console.log(btnPauseOrPlay);
        console.log("toggle");
    }

    //resetting the watch
    function resetWatch() {
        setBtnPauseOrPlay({
            icon: "octicon:play-24",
            state: false
        })
        setTotalTime(0);
        setWorkoutSets(0);
        /*
        setWorkoutTime(0)
        setWorkout({
            isBreak: true,
            prevWorkoutTime: 30,
            prevBreakTime: 15,
            countSets: 0
        })
        clearInterval(workoutIntervalRef.current)
        */
        clearInterval(totalIntervalRef.current);
        console.log(btnPauseOrPlay);
        console.log("reset");
    }

    //Starting the total timer
    function startTotalTimer() {
        totalIntervalRef.current = setInterval(() => {
            setTotalTime(prev => prev + 1);
            
        }, 1000)
    }

    //Starting the workout timer
    /*
    function startWorkoutTimer() {
        workoutIntervalRef.current = setInterval(() => {
            setWorkoutTime(prev => prev + 1);
        }, 1000)
    }
    */

    //handling side effects and clean up
    useEffect(() => {
        return () => {
            clearInterval(totalIntervalRef.current);
            //clearInterval(workoutIntervalRef.current);
        }
    }, [])
    useEffect(()=>{
        if(totalTime%30===0&&totalTime!==0)
        {
            setWorkoutSets(prev=>prev+1);
            let beeper = new Audio(mp3File);
            beeper.play()
        }
    }, [totalTime])
    /*
    useEffect(() => {
        if (btnPauseOrPlay.state) {
            setsCounter();
        }
    }, [totalTime, btnPauseOrPlay.state])
    //assuming breakTime will be called when isBreak is false
    function breakTime() {
        if (workoutTime % 30 === 0 && workout.prevWorkoutTime === workoutTime) {
            setWorkout(prev => {
                return {
                    isBreak: false,
                    prevWorkoutTime: prev.prevWorkoutTime + 30,
                    prevBreakTime: prev.prevBreakTime,
                    countSets: prev.countSets + 1
                }
            })
        }
    }

    //assuming exerciseTime will be called when isBreak is true

    function exerciseTime() {
        if (totalTime % 15 === 0 && totalTime === workout.prevBreakTime) {
            setWorkout((prev) => {
                return {
                    isBreak: true,
                    prevWorkoutTime: prev.prevWorkoutTime,
                    prevBreakTime: prev.prevBreakTime + 45,
                    countSets: prev.countSets
                }
            })
        }
    }

    function setsCounter() {
        //let beeper = new Audio(mp3File);

        if (!workout.isBreak) {
            exerciseTime();
            console.log("1 2 3 4 sk")
            clearInterval(workoutIntervalRef.current);
        }
        else {
            breakTime();
            startWorkoutTimer();
        }
    }
    */

    function ElapsedTime(time) {
        let seconds = Math.floor(time % 60);
        let mins = time / (60);
        mins = Math.floor(mins % 60)
        let hours = Math.floor(time / (60 * 60))
        return (hours + ":" + mins + ":" + seconds)
    }
    //used for card.
    var subTimerArr = [/*{
        name: "Total Workout Time",
        value: ElapsedTime(workoutTime)
    },*/
        {
            name: "Sets",
            //value: workout.countSets
            value: workoutSets
        },
        {
            name: "Total Elapsed Time",
            value: ElapsedTime(totalTime)
        }
    ]

    //Load Animation had to be done based on workout timer
    return (
        <div className={`loadAnimation ${btnPauseOrPlay.state?'bg-danger':'bg-transparent'}`}>
            <h1 className='display-1 fw-semibold headingStopWatch'>
                0:{totalTime%30}
            </h1>
            <div className='d-flex flex-column flex-md-row justify-content-between align-content-center m-5'>
                {subTimerArr.map((item, index) => {
                    return (
                        <SubTimerCard name={item.name} value={item.value} key={index} />
                    )
                })}
            </div>

            <div className='pb-5 d-flex flex-column flex-md-row justify-content-center align-content-center align-items-center'>
                <button className='btn btn-rounded w-25 border-white m-1'
                    onClick={toggleStartnPause}
                >
                    <Icon icon={btnPauseOrPlay.icon} className='display-1' />
                </button>
                <button className='btn btn-rounded w-25 border-white m-1'
                    onClick={resetWatch}
                >
                    <Icon icon="ri:stop-circle-line" className='display-1' />
                </button>
            </div>

        </div>
    )
}
