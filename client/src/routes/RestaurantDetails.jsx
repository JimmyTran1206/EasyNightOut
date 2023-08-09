import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

export default function RestaurantDetails() {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, setSelectedRestaurant]);
  return (
    <div>
      {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">
            {selectedRestaurant.data.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.data.average_rating} />
            <span className="text-warning ms-1">
              (
              {selectedRestaurant.data.average_rating
                ? selectedRestaurant.data.average_rating
                : 0}
              )
            </span>
            <div className="text-warning">
              {selectedRestaurant.data.count > 1
                ? `${selectedRestaurant.data.count} reviews`
                : selectedRestaurant.data.count > 0
                ? `${selectedRestaurant.data.count} review`
                : `0 review`}
            </div>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
            <AddReview />
          </div>
        </>
      )}
    </div>
  );
}
