import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

function UpdateRestaurant(props) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setName(response.data.data.name);
      setLocation(response.data.data.location);
      setPriceRange('Price Range');
    };
    fetchData();
  }, [id]);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    navigate(`/`);
  };
  return (
    <div>
      <form action="">
        <div className="form-group mt-3">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            id="name"
            className="form-control"
            type="text"
            autocomplete="off"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            id="location"
            className="form-control"
            type="text"
            autocomplete="off"
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="priceRange">Price Range</label>
          <select
            value={priceRange}
            onChange={(event) => setPriceRange(event.target.value)}
            id="priceRange"
            className="form-select">
            <option disabled>Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>
        </div>
        <div className="form-group mt-3">
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateRestaurant;
