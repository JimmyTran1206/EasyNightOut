import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

function AddReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('Select rating stars');
  const handleSubmitReview = async (event) => {
    event.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      console.log(response);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-2">
      <form action="">
        <div className="form-group row mt-2 mb-2">
          <div className="col-8">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              type="text"
              className="form-control"
              autocomplete="off"
              required
            />
          </div>
          <div className="col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(event) => setRating(event.target.value)}
              id="rating"
              className="form-select">
              <option disabled>Select rating stars</option>
              <option value="1">1 </option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group mt-2 mb-4">
          <label htmlFor="review">Reviews</label>
          <textarea
            value={reviewText}
            onChange={(event) => setReviewText(event.target.value)}
            id="review"
            className="form-control"
            required></textarea>
        </div>
        <button
          onClick={handleSubmitReview}
          type="submit"
          className="btn btn-primary me-2">
          Submit
        </button>
        <button
          onClick={() => navigate('/')}
          type="submit"
          className="btn btn-primary ms-2">
          Back to Restaurant List
        </button>
      </form>
    </div>
  );
}

export default AddReview;
