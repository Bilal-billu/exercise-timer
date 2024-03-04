import React from 'react'

export default function SubTimerCard(props) {
  return (
    <div>
        <h1 className='display-4 fw-semibold m-3'>{props.name}</h1>
      <h1 className='display-1 fw-semibold m-3'>{props.value}</h1>
    </div>
  )
}
