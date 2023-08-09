import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';

function AddRestaurant() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('Price Range');
  const { addRestaurants } = useContext(RestaurantsContext);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await RestaurantFinder.post('/', {
        name: name,
        location: location,
        price_range: priceRange,
      });
      addRestaurants(response.data.data);
      setName('');
      setLocation('');
      setPriceRange('Price Range');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-4 mt-4">
      <form action="">
        <div className="form-group row">
          <div className="col">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              type="text"
              className="form-control"
              placeholder="location"
            />
          </div>
          <div className="col">
            <select
              className="form-select"
              value={priceRange}
              onChange={(event) => setPriceRange(event.target.value)}>
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col-auto">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddRestaurant;
