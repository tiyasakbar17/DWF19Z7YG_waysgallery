import React from 'react'
import CurrencyFormat from 'react-currency-format';

function PopUps({ title, description, price, approve, cancel, closer, show }) {


    const approveHandler = () => {
        approve()
        closer()
    }
    const cancelHandler = () => {
        cancel()
        closer()
    }

    return (
        <div className="popUpPage" >
            <div className="modalBackground" onClick={closer}></div>
            <div className="popUpContainer">
                <div className="popUpCloser pointer" onClick={closer}>
                    <i className="fas fa-times"></i>
                </div>
                <div className="detailsContainer">
                    <span>Title: {title} </span>
                    <p>Description: {description} </p>
                    <p className="text-success"><strong>Price: <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp '} /> </strong></p>
                    {
                        show ?
                            null :
                            <div className="lefter">
                                <div className="orderDetailButtons">
                                    <button onClick={cancelHandler} className="danger button text-white" >
                                        Cancel
                        </button>
                                    <button onClick={approveHandler} className="success button text-white">
                                        Approve
                        </button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default (PopUps);
