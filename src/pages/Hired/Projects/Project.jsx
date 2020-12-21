import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

export const Project = ({ Hired }) => {
    const { id } = useParams()
    const hiredId = Number(id)
    const copyData = [...Hired.orders]
    const data = copyData.filter(datum => datum.id === hiredId)

    const [state, setState] = React.useState({
        preview: ''
    })

    console.log(state);

    const changePreview = (index) => {
        const previewToBe = data[0].project.photos.findIndex(photo => photo.id === index)
        setState(prevState => ({
            ...prevState,
            preview: data[0].project.photos[previewToBe].photo
        }))
    }

    React.useEffect(() => {
        setState(prevState => ({
            ...prevState,
            preview: data[0].project.photos[0].photo
        }))
    }, [])

    return (
        <div className="container">
            <div className="editProfileContainer">
                <div className="addPostLeft ">
                    <div className="leftContainer">
                        <div className="projectPreview border">
                            <img src={state.preview} alt="Main Picture" className="image" />
                        </div>
                        <div className="filePreview">
                            {
                                data[0].project.photos.map((photo, i = 0) => {
                                    i = i + 1;
                                    return (
                                        <div className="previewItems pointer" onClick={() => changePreview(photo.id)} key={i}>
                                            <img src={photo.photo} alt="preview" className="image" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="projPrevRight">
                    <span>{data[0].project.description}</span>
                    {/* <div className="flex justify-content-center">
                            <button type="submit" className="text-white button primary editProfileButton" >Send Project</button>
                        </div> */}
                </div>
            </div>
        </div >
    )
}

const mapStateToProps = (state) => ({
    Hired: state.Hired
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
