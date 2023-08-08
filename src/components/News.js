import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {

    const [articles, setArticles] = useState([])
    // const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    // Capatlize the first keyword of title
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        // let url = `https://newsdata.io/api/1/news?apikey=${props.apikey}&q=social&country=${props.country}&category=${props.category}`
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        // console.log(data)
        let parsedData = await data.json()
        props.setProgress(70);
        console.log(parsedData);
        setArticles(parsedData.articles);
        // setResults(parsedData.results);
        setTotalResults(parsedData.totalResults);
        setLoading(false)

        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
        /* eslint-disable */
    }, [])

    // const handlePrevClick = async () => {
    //     setPage(page - 1)
    //     updateNews();
    // }

    // const handleNextClick = async () => {
    //     setPage(page + 1)
    //     updateNews();
    // }

    // InfiniteScroll
    const fetchMoreData = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1);
        let url = `https://newsdata.io/api/1/news?apikey=${props.apikey}&q=social&country=${props.country}&category=${props.category}`
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        // setResults(results.concat(parsedData.results))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
    };

    return (
        <>
            <h2 className='text-center'>NewsMonkey -  Top {capitalizeFirstLetter(props.category)} Headlines</h2>
            {loading && <Spiner />}
            <InfiniteScroll
                dataLength={articles.length}
                // dataLength={results.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                // hasMore={results.length !== totalResults}
                loader={<Spiner />} >

                <div className="container">
                    <div className="row p-3">
                        {articles.map((element) => {
                            // {results.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 60) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    country: 'in',
    pageSize: 6,
    // category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News