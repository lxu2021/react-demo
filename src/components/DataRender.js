import React, { useState, useEffect } from 'react';

function DataRender() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [delay, setDelay] = useState(3);
  const [lastLoadTime, setLastLoadTime] = useState(null);

  const URL = "https://reqres.in/api/users?delay="
  useEffect(() => {
    //fetch data
    const fetchImage = async () => {
      try {
        const response = await fetch(`${URL}${delay}`);
        const data = await response.json();
        setData(data.data);
        setIsLoading(false);
        setLastLoadTime(new Date().toLocaleTimeString());
      } catch (error) {
        console.log('Error fetching the data', error);
        setIsLoading(false);
      }
    };
    fetchImage();
  }, []);

// set delay time to 5
  const setDelayTime = ()=>{
    setIsLoading(true);
      setDelay(5);
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
  }

//get filter keyword
  const handleFilterChange = (event) => {
    setKeyword(event.target.value);
  };


//filter function by user name and email
  const filteredData = data.filter((user) => {
    return user.last_name.toLowerCase().includes(keyword.toLowerCase()) ||
    user.first_name.toLowerCase().includes(keyword.toLowerCase()) ||
    user.email.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <div>
      <h1>Users List</h1>
      {isLoading && <p>Loading data...</p>}
      {!isLoading && data && (
        <div>
          <input type="text" value={keyword} onChange={handleFilterChange} placeholder="Filter by first name, last name or email" />
          <br />
          <br />
          <button onClick={setDelayTime}>Delay Response by 5 seconds</button>
          <p>Last loaded at: {lastLoadTime ? lastLoadTime.toString() : 'never'}</p>
          {filteredData.length > 0 ? (
            filteredData.map((user) => (
              <div key={user.id}>
                <img src={user.avatar} alt={`image of ${user.first_name} ${user.last_name}`}/>
                <p>First Name: {user.first_name}</p>
                <p>Last Name: {user.last_name}</p>
                <p>Email: {user.email}</p>
              </div>
            ))
          ) : (
            <p>No users found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DataRender;