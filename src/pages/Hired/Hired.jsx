import React from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { addHired } from '../../redux/actions/Hired'

export const Hired = ({ addHired }) => {

    const history = useHistory()

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
        addHired(state).then(() => {
            history.goBack()
        })
    }

    const pushBack = () => {
        history.goBack()
    }

    return (
        <div className="container hiredContainer">
            <div className="formHiredContainer">
                <form onSubmit={submitHandler}>
                    <input type="text" className="input inputHired" name="title" onChange={changeHandler} value={state.title} placeholder="Title" required />
                    <textarea type="text" className="input textArea inputHired" name="description" onChange={changeHandler} value={state.description} placeholder="Description" required />
                    <div className="flex justify-content-between inputHired" >
                        <div className="leftDate">
                            <label htmlFor="startDate">Start Date</label>
                            <input type="date" className="input inputHired" id="startDate" name="startDate" onChange={changeHandler} value={state.startDate} placeholder="Start Date" required />
                        </div>
                        <div className="rightDate">
                            <label htmlFor="endDate">End Date</label>
                            <input type="date" className="input inputHired" name="endDate" onChange={changeHandler} value={state.endDate} required />
                        </div>
                    </div>

                    <input type="text" className="input price inputHired" name="price" onChange={changeHandler} value={state.price} placeholder="Price" required />
                    <div className="hiredButtons">
                        <button onClick={pushBack} type="reset" className="button text-black" >Cancel</button>
                        <button type="submit" className=" button text-white" >Bidding</button>
                    </div>
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
