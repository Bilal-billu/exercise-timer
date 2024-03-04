import React from 'react'

function AddCard({ item }) {
    return (
        <div className='d-flex justify-content-center align-items-center align-content-center'>
            <label className={`col-4 col-sm-3 col-md-3 text-danger h3 ${item.req ? "required" : ""}`} htmlFor={item.name}>
                {item.name}:
            </label>
            <input className='m-3 col-8 col-sm-7 col-md-6 col-lg-5 bg-danger p-1 h3' required={item.req} id={item.name} value={item.value}
                type={item.type} min={item.min}
                onChange={(e) => {
                    e.preventDefault();
                    item.onChange(e.target.value)
                }} />
        </div>
    )
}


AddCard.defaultProps = {
    item: {
        name: "name",
        value: "some",
        type: "text",
        onChange: () => { console.log("def") },
        req: false,
        min: ""
    }
}

export default AddCard;