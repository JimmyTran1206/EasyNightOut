import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import RestaurantUpdate from './routes/RestaurantUpdate';
import RestaurantDetails from './routes/RestaurantDetails';
import { RestaurantsContextProvider } from './context/RestaurantContext';

export default function App() {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/restaurants/:id/update"
            element={<RestaurantUpdate />}
          />
          <Route path="/restaurants/:id" element={<RestaurantDetails />} />
        </Routes>
      </div>
    </RestaurantsContextProvider>
  );
}
