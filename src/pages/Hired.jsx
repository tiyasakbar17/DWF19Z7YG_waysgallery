import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addHired } from '../redux/actions/Hired'

export const Hired = ({ addHired }) => {

    const { id } = useParams()

    const innitialState = {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        price: '',
        orderTo: id
    }
    const [state, setState] = React.useState(innitialState)

    const changeHandler = (e) => {

        setState(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))

    }
    const submitHandler = (e) => {
        e.preventDefault()
        addHired(state)

    }

    return (
        <div style={{ margin: "121px 80px" }}>
            <div className="" style={{ width: "500px", padding: "10px" }}>
                <form action="" onSubmit={submitHandler}>
                    <input type="text" className="input" name="title" onChange={changeHandler} value={state.title} placeholder="Title" />
                    <input type="text" className="input" name="description" onChange={changeHandler} value={state.description} placeholder="Description" />
                    <input type="date" className="input" name="startDate" onChange={changeHandler} value={state.startDate} />
                    <input type="date" className="input" name="endDate" onChange={changeHandler} value={state.endDate} />
                    <input type="text" className="input" name="price" onChange={changeHandler} value={state.price} placeholder="Price" />
                    <button type="submit">SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
    addHired
}

export default connect(mapStateToProps, mapDispatchToProps)(Hired)
