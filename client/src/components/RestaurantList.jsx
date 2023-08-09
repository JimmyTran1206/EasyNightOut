import React, { useContext, useEffect } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

function RestaurantList(props) {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await RestaurantFinder.get('/');
        setRestaurants(response.data.data.restaurants);
      } catch (error) {}
    }
    fetchData();
  }, [setRestaurants]);

  const handleDelete = async (event, id) => {
    event.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (event, id) => {
    event.stopPropagation();
    navigate(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    navigate(`/restaurants/${id}`);
  };

  const renderRating = (restaurant) => {
    if (!restaurant.count) {
      return <span className="text-warning">0 review</span>;
    }
    return (
      <div>
        <StarRating rating={restaurant.average_rating} />
        <span className="text-warning ms-1">({restaurant.average_rating})</span>
      </div>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-dark table-hover table-striped">
        <thead>
          <tr className="table-primary">
            <th scope="col">Restaurants</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.location}</td>
                  <td>{'$'.repeat(restaurant.price_range)}</td>
                  <td>{renderRating(restaurant)}</td>
                  <td>
                    <button
                      onClick={(event) => handleUpdate(event, restaurant.id)}
                      className="btn btn-warning">
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(event) => handleDelete(event, restaurant.id)}
                      className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default RestaurantList;
