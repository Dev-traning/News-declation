import React from 'react'
import loading from './loading.gif'

const Spiner = () => {

    return (
        <div className='text-center' style={{ margin: '-2% 6%' }}>
            <img className='my-3' src={loading} alt="loading" style={{ width: '10%' }} />
        </div>
    )

}

export default Spiner