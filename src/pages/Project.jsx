import React, { Component } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

export const Project = ({ Hired }) => {
    const { id } = useParams()
    const hiredId = Number(id)
    const copyData = [...Hired.orders]
    const data = copyData.filter(datum => datum.id === hiredId)


    return (
        <div style={{ margin: "121px 80px" }}>
            <div className="border">
                <h1>{data[0].title}</h1>
                <h3>{data[0].project.description}</h3>
                {data[0].project.photos.map(photo => {
                    return (
                        <div className="" style={{ width: "200px", height: "auto" }}>
                            <img src={`http://localhost:5000/uploads/${photo.photo}`} alt="" className="image" />
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({
    Hired: state.Hired
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
