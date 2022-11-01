import React, { useState } from 'react'

import Reactpip from 'react-picture-in-picture'

const PictureToPicture = () =>{
  const[active, setActive] = useState(false)

    return (
      <>
        <Reactpip isActive= {active} >
            <video width={100} height={100}>
                <source  src="https://cdn.arnellebalane.com/videos/original-video.mp4"/>
            </video>
        </Reactpip>
        <button onClick = {() => setActive(!active)}>Toggle Picture in Picture</button>
      </>
    )
}
export default PictureToPicture