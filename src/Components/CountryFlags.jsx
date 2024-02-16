import React, { useEffect, useState } from 'react'
import './CountryFlags.css';

function CountryFlags() {

  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState();

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries/currency', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setCountries(res.data);
      })

  }, []);

  const displayFlags = (country) => {
    fetch('https://countriesnow.space/api/v0.1/countries/flag/images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'iso2': country.iso2
      })
    })
      .then((response) => response.json())
      .then((res) => {
        setSelected(res?.data)
      })
  }

  return (
    <>
      <div className='Container'>
        <div className='country-container' >
          <p className='heading' >Countries</p>
          <p className='desc'>Select a Country from the list</p>
          <div className='list-container' >
            {
              countries.sort((a, b) => a.name.localeCompare(b.name)).map((cnty, index) => (
                <div className='country-List' key={index} onClick={() => displayFlags(cnty)}>
                  {cnty.name}
                </div>
              ))
            }
          </div>
        </div>
        <div className='image-Container' >

          {selected?.flag ? <div className='flag-Container'>
            <img src={selected?.flag} alt="" height={'200px'} />
            <span className='flag-name' >
              {selected?.name}
            </span>
            <button className='close-btn' onClick={() => setSelected({})}> Close </button>
          </div> :
            <>
              <p className='m-Name' >Countries & Flags</p>
              <p className='desc m-desc' >Flag of the selected country will be displayed here within few seconds</p>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default CountryFlags