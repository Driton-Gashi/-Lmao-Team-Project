import { useState, useEffect } from "react";
import "../css/shop.css";
import Item from "../components/shop/Item";
import Slider from "../components/shop/SliderFilter";
const Shop = ({ getUser }) => {
  const getStars = (review) => {
    let reviewStars = [];

    for (let i = 0; i < review; i++) {
      reviewStars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    for (let i = reviewStars.length; i < 5; i++) {
      reviewStars.push(<i key={i} className="fa-regular fa-star"></i>);
    }
    return reviewStars;
  };
  const [items, setItems] = useState([]); // yogurt, protein
  const [popup, setPopup] = useState({
    isOpen: false,
  });
  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/items");
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  // below function still in progress
  const itemsSort = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:5000/items?orderBy=${e.target.value}`
      );
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  const itemsSortByCategory = async (category) => {
    try {
      const response = await fetch(
        `http://localhost:5000/items?category=${category}`
      );
      const jsonData = await response.json();
      setItems(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  return (
    <div className="shop">
      {!popup.isOpen ? (
        ""
      ) : (
        <div className="itemPopup">
          <i
            onClick={() => {
              setPopup({ isOpen: false });
            }}
            className="fa-solid fa-xmark popupClose"
          ></i>
          <div className="InnerItemPopup">
            <div className="itemPopup_left">
              <img src={popup.image} alt="" />
            </div>
            <div className="itemPopup_right">
              <h1>{popup.title}</h1>
              <h5>
                <span>category: </span>
                {popup.category}
              </h5>
              <div className="review">{getStars(popup.review)}</div>
              <h4>{popup.price}€</h4>
              <p>{popup.description}.</p>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
      <div className="main_banner_shop">
        {getUser() == null ? (
          <div className="main_banner_shop_content">
            <h1>Become a member to get the best deals!</h1>
            <button>Join now</button>
          </div>
        ) : (
          <div className="main_banner_shop_content">
            <h1>Here are the best deals for you {getUser().user_name}!</h1>
            <button>Check it out</button>
          </div>
        )}
      </div>
      <Slider sortBy={itemsSortByCategory} />
      <div className="filter_bar_right">
        <select onChange={itemsSort} id="filter">
          <option value="">Sort by</option>
          <option value="item_price">Price</option>
          <option value="item_review">Reviews</option>
          <option value="item_likes">Likes</option>
        </select>
      </div>
      {/* <div className="filter_bar">
        <div className="filter_bar_left">
          <button className="filter_button">Accessories</button>
          <button className="filter_button">Pants</button>
          <button className="filter_button">Shirts</button>
          <button className="filter_button">Supplements</button>
          <button className="filter_button">GYM tools</button>
        </div>
        
      </div> */}
      <div className="shop_item_wrapper">
        <h1>
          <span>GYM Accessories</span> for you!
        </h1>
        <div className="shop_items">
          {items.map((element) => (
            // %PUBLIC_URL% shortcut for public
            <Item
              setPopup={setPopup}
              key={element.item_id}
              name={element.item_name}
              description={element.item_description}
              price={element.item_price}
              review={element.item_review}
              image={element.item_image}
              category={element.item_category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
