import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Card = ({ image, postId }) => {
    const history = useHistory();

    const clickHandler = () => {
        history.push(`/post/${postId}`)
    }

    return (
        <div onClick={clickHandler} className="border pointer" style={{ width: "200px", height: "150px", margin: "10px", borderRadius: "10px" }}>
            <img src={`http://localhost:5000/uploads/${image}`} alt="gambar" className="image" />
        </div>
    )
}

export default connect(null)(Card)
