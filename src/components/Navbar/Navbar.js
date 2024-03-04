import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {
    const navlinks = [{
        name: "Stopwatch",
        path: "/"
    },
    {
        name: "Add Exercise",
        path: "/add"
    },
    {
        name: "Edit Exercise",
        path: "/view"
    }
    ]
    function links() {
        let temp = [];

        navlinks.map((item, index) => {
            temp.push(
                <Link to={item.path} className='btn btn-danger m-1 mx-2' key={index}
                >
                    {item.name}
                </Link>
                )
        })
        return temp
    }

    return (
        <nav className='d-flex flex-column my-3 py-5'>
            {links()}
        </nav>
    )
}
