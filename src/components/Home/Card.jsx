import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Card = ({ image, postId }) => {
    const history = useHistory();

    const clickHandler = () => {
        history.push(`/post/${postId}`)
    }

    return (
        <img onClick={clickHandler} src={`http://localhost:5000/uploads/${image}`} alt="gambar" className="image" />
    )
}

export default connect(null)(Card)
