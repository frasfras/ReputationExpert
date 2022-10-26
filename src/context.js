import './style.css';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Context() {
    const [search,setSearch]=useState('a');
  const [datas, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:1880/monitors?_limit=8`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <h1>API Feed -Reviews</h1>
      <form  className="search-form">
        <label ><h4>Search 👉🏽</h4></label>  
       <input type='text'
                name='name'
                id='name'
                placeholder='search'
                onChange={(e)=> setSearch(e.target.value)} 
                />
    </form>
        
                <ul></ul>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>
        
        {(search !==0) &&  datas &&
          datas.filter((data)=>
              data.title.toLowerCase().includes(search)
          ).map(({ rowid, title,description }) => (
            <li key={rowid}>
              <h3>{title}</h3>
              {/* <a href='/cocktail/${id}'>details</a> */}
              <Link to={`/cocktail/${description}`} className='btn btn-primary btn-details'>details</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}