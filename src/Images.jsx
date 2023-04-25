import React, { useState } from 'react'
import "./images.css"
const Images = () => {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [ books , setBook] = useState([]);
    const [ flag , setFlag] = useState(true);
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const fetchImages = await fetch(`https://api.unsplash.com/search/photos?page=1&per_page=12&query=${query}&client_id=QqZcIjf8skKkq6pzHe0cPFwgO0fevH1b06npuka3VNA`)
            const result = await fetchImages.json();
            setImages(result.results)
            setFlag(true)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="main">
                <div className="header">
                    <h1>React Photo Search</h1>
                    <button onClick={ (e) => setFlag(!flag) }>{ flag ? "Bookmarks" : "Previous"}</button>
                </div>
                <div className="search">
                    <input type="text" placeholder="Search Free High Resolution Images" onChange={(e) => setQuery(e.target.value)} value={query} />
                    <button onClick={handleSearch}>Search</button>
                </div>
                <div className="images">
                    {
                        flag && images.map(ele => (
                            <div className="image_card">
                                <img src={ele.urls.small} alt="not found" />
                                <button onClick={(e) => setBook([...books , { small : ele.urls.small }])}>Bookmark</button>
                            </div>
                        ))
                    }
                    {
                        !flag && books.map(ele => (
                            <div className="image_card">
                                <img src={ele.small} alt="not found" />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Images