import React from 'react'

export default function (props) {
    let width = props.width ? props.width : "45"
    let height = props.height ? props.height : "45"
    return (
        <div className="loading-wrapper">
            <img src="./assets/loading.svg" alt="loading" width={width} height={height} />
            <p>Loading</p>
        </div>
    )
}
