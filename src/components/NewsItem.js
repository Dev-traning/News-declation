import React from 'react'

const NewsItem = (props) => {


    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className='my-3'>
            <div className="card">
                {/* <div> */}
                <span className="badge rounded-pill bg-danger d-flex justify-content-end position-absolute end-0"> {source}
                </span>
                {/* </div> */}
                <img src={!imageUrl ? "https://www.hindustantimes.com/ht-img/img/2023/04/17/1600x900/PTI04-17-2023-000057B-0_1681749695352_1681749733449.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem