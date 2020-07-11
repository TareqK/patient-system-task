import React from 'react'

const Loader = ({text}) => {
    return(
        <>
            <div className="row" style={{display: 'flex', justifyContent: 'center'}}>
                <div className="loader"></div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}>
                <p>{text}</p>
            </div>
        </>
    )
}

export default Loader;