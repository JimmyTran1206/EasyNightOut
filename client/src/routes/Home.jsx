import AddRestaurant from '../components/AddRestaurant';
import Header from '../components/Header';
import RestaurantList from '../components/RestaurantList';

export default function Home() {
  return (
    <div>
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
}
