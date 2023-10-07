import { useEffect, useState } from "react";
import { RestrauntCard } from "./RestaurantCard";
import { Search } from "./Search";
import { ShimmerUI } from "./ShimmerUI";

export const Body = () => {
  const [restaurant, setRestaurant] = useState([]);

  async function getRestraunts() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.6012849&lng=88.3312686&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(json);
    setRestaurant(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }

  useEffect(() => {
    getRestraunts().catch((e) => {
      console.error(e);
    });
  }, []); //!TODO: Fetch data whenever tags are clicked and search button is clicked //Here data layer and ui layer is not seperated properly
  //!TODO:⭐⭐⭐ use useeffect + Fetch api for each of the Components.

  return (
    <div className="body flex-row flex-wrap content-center m-8 inline-flex min-w-full">
      <Search setUiData={setRestaurant} restaurant={restaurant} />
      {/* <Filter setUiData={setRestaurant}/> */}

      {restaurant?.length == 0 ? (
        <ShimmerUI />
      ) : (
        restaurant?.map((ele) => {
          return (
            <RestrauntCard
              setRestaurant={setRestaurant}
              restaurant={restaurant}
              details={ele}
              key={`${ele.info.id}`}
            />
          );
        })
      )}
    </div>
  );
};
