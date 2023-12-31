import React from "react";
import "./Dashboard.css";
import { mainServerInstance } from "../../Axios/axiosInstance";
import Product from "./Product";
import Categories from "./Categories";
import Wishlist from "../Wishlist/Wishlist";
import logo from "../../Assets/logoBlack.png";
import logoWhite from "../../Assets/logoWhite.png";
import searchIcon from "../../Assets/searchIcon.png";
import profileIcon from "../../Assets/profileIcon.png";
import favouritesIcon from "../../Assets/favouritesIcon.png";
import cartIcon from "../../Assets/cartIcon.png";
import verifiedIcon from "../../Assets/verifiedIcon.png";
import freeShippingIcon from "../../Assets/freeShippingIcon.png";
import moneyGuaranteeIcon from "../../Assets/moneyGuaranteeIcon.png";
import supportIcon from "../../Assets/supportIcon.png";
import saleHeadphone from "../../Assets/saleHeadphone.png";
// import shoe from "../../Assets/shoe.png";
// import gaming from "../../Assets/gaming.png";
// import decor from "../../Assets/decor.png";
// import food from "../../Assets/food.png";
// import study from "../../Assets/study.png";
// import makeup from "../../Assets/makeup.png";
import ralphLaurenLogo from "../../Assets/ralphLaurenLogo.png";
import chanelLogo from "../../Assets/chanelLogo.png";
import mightyFurnitureLogo from "../../Assets/mightyFurnitureLogo.png";
import breitlingLogo from "../../Assets/breitlingLogo.png";
import hermesLogo from "../../Assets/hermesLogo.png";
import facebookIcon from "../../Assets/facebookIcon.png";
import instagramIcon from "../../Assets/instagramIcon.png";
import xIcon from "../../Assets/xIcon.png";
import messageIcon from "../../Assets/messageIcon.png";
import footerSearchIcon from "../../Assets/footerSearchIcon.png";
import footerLine from "../../Assets/footerLine.png";
import product1 from "../../Assets/product1.png";
import product2 from "../../Assets/product2.png";
import product3 from "../../Assets/product3.png";
import product4 from "../../Assets/product4.png";
import headphoneProduct from "../../Assets/headphoneProduct.png";
import headphoneSet from "../../Assets/headphoneSet.jpeg";
import { NotificationContext } from "../../NotificationContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { notification, setNotification } =
    React.useContext(NotificationContext);
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [showWishlist, setShowWishlist] = React.useState(false);
  const [categoriesData, setCategoriesData] = React.useState([]);
  const [productsData, setProductsData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const productRef = React.useRef(null);
  const [favouriteProducts, setFavouriteProducts] = React.useState([]);

  const scrollToProducts = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    if (searchTerm) {
      searchProduct();
    } else {
      getAllProducts();
    }
  }, [searchTerm]);

  React.useEffect(() => {
    getAllCategories();
    getAllProducts();
    getFavouriteProducts();
  }, []);

  const categories = categoriesData?.map((category) => (
    <Categories
      key={category._id}
      id={category._id}
      image={category.image}
      name={category.name}
      fetchProductsByCategory={fetchProductsByCategory}
    />
  ));
  // const products = productsData?.map((product) => (
  //   <Product
  //     key={product._id}
  //     id={product._id}
  //     img={product.images[0]}
  //     name={product.name}
  //     timesSold={product.timesSold}
  //     price={product.price}
  //   />
  // ));
  const products = productsData?.map((product) => {
    const isFavourite = favouriteProducts.includes(product._id);

    console.log("Is favourite:", product.images[0]);
    return (
      <Product
        key={product._id}
        id={product._id}
        img={product.images[0]}
        name={product.name}
        timesSold={product.timesSold}
        price={product.price}
        isFavourite={isFavourite}
      />
    );
  });
  const showMessage = (message, type) => {
    setNotification({
      show: true,
      message: message,
      type: type,
    });
  };

  const getFavouriteProducts = async () => {
    try {
      const response = await mainServerInstance.get(
        "/api/wishlist/getWishlist"
      );
      const productIds = response.data.products.map(
        (product) => product.productId
      );
      setFavouriteProducts(productIds);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await mainServerInstance.get(
        "/api/categories/getAllCategories"
      );

      console.log("Categories:", response.data);
      setCategoriesData(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await mainServerInstance.get(
        "/api/products/getAllProducts"
      );

      console.log("Products:", response.data);
      setProductsData(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const toggleShowWishList = () => {
    setShowWishlist((prev) => !prev);
  };

  async function fetchProductsByCategory(categoryId) {
    try {
      const response = await mainServerInstance.get(
        `api/products/getProductsByCategory/${categoryId}`
      );

      if (!response) {
        throw new Error("Failed to fetch products");
      }

      setProductsData(response.data);
    } catch (error) {
      if (
        error.response.status === 404 &&
        error.response.data.message ===
          "No products found for the provided category ID."
      ) {
        showMessage("No products found for the this category.", "error");
        return;
      }
      showMessage(error.message, "error");
    }
  }

  const handleSearchTermChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const searchProduct = async () => {
    try {
      const response = await mainServerInstance.get(
        `http://localhost:4000/api/products/searchProduct`,
        {
          params: {
            name: searchTerm, // Assuming searchTerm is defined elsewhere
          },
        }
      );

      if (response.status !== 200) {
        showMessage("Failed to fetch", "error");
      }

      const data = response.data;
      setProductsData(data);
    } catch (error) {
      showMessage("Error fetching products", "error");
    }
  };

  return (
    <>
      {showWishlist && <Wishlist toggleShowWishList={toggleShowWishList} />}
      <div style={showWishlist ? { filter: "blur(2px)" } : {}} className="home">
        {/* <div className="div"> */}
        <div style={{ backgroundColor: "black" }} className="footer">
          <div style={{ letterSpacing: "1.16px" }} className="menu-header">
            <div className="text-wrapper">About</div>
            <div className="text-wrapper">Categories</div>
            <div className="text-wrapper">Products</div>
            <div className="text-wrapper">Profile</div>
            <div className="text-wrapper">Contact us</div>
          </div>
          <div style={{ letterSpacing: "1.16px" }} className="menu-footer">
            <div className="text-wrapper">Privacy Policy</div>
            <div className="text-wrapper">Terms of Use</div>
            <div className="text-wrapper">Sales and Refunds</div>
            <div className="text-wrapper">Legal</div>
            <div className="text-wrapper">Site Map</div>
          </div>
          <div
            style={{ textDecorationLine: "none" }}
            className="text-wrapper-3"
          >
            © <span>{year}</span> GoGrab
          </div>
          <div className="social">
            <img className="social-icon " alt="messageLogo" src={messageIcon} />
            <img
              className="social-icon"
              alt="instagramLogo"
              src={instagramIcon}
            />
            <img className="social-icon" alt="xLogo" src={xIcon} />
            <img
              className="social-icon fbIcon"
              alt="facebookLogo"
              src={facebookIcon}
            />
          </div>
          <img className="line" alt="Line" src={footerLine} />
          <div className="overlap-group">
            <div className="search">
              <input className="frame" placeholder="Search.." type="text" />
            </div>
            <img
              className="iconamoon-search"
              alt="Iconamoon search"
              src={footerSearchIcon}
            />
          </div>
          <img className="logo" alt="Logo" src={logoWhite} />
        </div>
        <div className="colaborators">
          <img
            className="download-removebg"
            alt="mightyFurnitureLogo"
            src={mightyFurnitureLogo}
          />
          <img className="chanel-removebg" alt="Chanel " src={chanelLogo} />
          <img
            className="ralph-lauren-symbol"
            alt="Ralph lauren symbol"
            src={ralphLaurenLogo}
          />
          <img
            className="breitling-logo"
            alt="Breitling logo"
            src={breitlingLogo}
          />
          <img className="png-transparent" alt="hermesLogo" src={hermesLogo} />
        </div>
        {/* products mobin  */}
        <div className="products-cards">
          {/* <Product img={product1} />
            <Product img={product2} />
            <Product img={product3} />
            <Product img={product4} />
            <Product img={headphoneProduct} />

            <Product img={product1} />
            <Product img={product2} />
            <Product img={product3} />
            <Product img={product4} />
            <Product img={headphoneProduct} />

            <Product img={product1} />
            <Product img={product2} />
            <Product img={product3} />
            <Product img={product4} />
            <Product img={headphoneSet} /> */}
          {products}
        </div>
        {/*  */}
        <div ref={productRef} className="products-heading">
          {/* <div className="sort-by">
            <div className="overlap-group-2">
              <img
                className="flat-color-icons"
                alt="Flat color icons"
                src="flat-color-icons-next.svg"
              />
              <div className="text-wrapper-9">Sort by:</div>
            </div>
          </div> */}

          <div className="text-wrapper-10">Products</div>
        </div>
        {/*  */}
        {/* categories mobin */}
        <div className="categories-frames">
          {/* <Categories image={shoe} name={"Fashion And Apparel"} />
            <Categories image={decor} name={"Electronics and gadgets"} />
            <Categories image={makeup} name={"Home and decor"} />
            <Categories image={study} name={"Beauty and personal care"} />
            <Categories image={food} name={"Health and wellness"} />
            <Categories image={gaming} name={"books and media"} />
            <Categories image={gaming} name={"books and media"} /> */}
          {categories}
        </div>
        <div className="categoris-heading">
          <div className="text-wrapper-27">Categories</div>
        </div>
        <img
          className="sale-headphone"
          alt="Sale headphone"
          src={saleHeadphone}
        />
        <div className="functionalities">
          <div className="frame-7 functionality">
            <img
              className="la-shipping-fast"
              alt="La shipping fast"
              src={freeShippingIcon}
            />
            <div className="text-wrapper-28">Free shipping</div>
            <p className="text-wrapper-29">Free shipping on all orders</p>
          </div>
          <div className="frame-8 functionality">
            <img className="vector" alt="Vector" src={moneyGuaranteeIcon} />
            <div className="text-wrapper-28">Money Guarantee</div>
            <div className="text-wrapper-29">30 days money back</div>
          </div>
          <div className="frame-9 functionality">
            <img
              className="pepicons-pop"
              alt="Pepicons pop"
              src={supportIcon}
            />
            <div className="text-wrapper-28">Support 24/7</div>
            <div className="text-wrapper-29">Technical support 24/7</div>
          </div>
          <div className="frame-10 functionality">
            <div className="text-wrapper-28">Verified</div>
            <p className="text-wrapper-29">Authentic , Verified</p>
            <img
              className="tdesign-secured"
              alt="Tdesign secured"
              src={verifiedIcon}
            />
          </div>
        </div>
        <div className="landing">
          <div className="overlap-5">
            <div className="sale-off">
              <div className="overlap-group-4">
                <div className="text-wrapper-30">Sale 20% Off</div>
                <div className="text-wrapper-31">On Everything</div>
              </div>
            </div>
            <p className="embrace-the-joy-of">
              Embrace the joy of smart shopping with our site-wide 20% off
              extravaganza! Don&#39;t miss out on incredible savings – log in
              and treat yourself to the latest trends at unbeatable prices
            </p>

            <button className="login-button">
              <div style={{ width: "200px" }} className="overlap-6">
                <div
                  className="text-wrapper-32"
                  onClick={() => scrollToProducts(productRef)}
                >
                  SHOP NOW
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="nav-bar-wrapper">
          <div className="nav-bar">
            <Link to="/dashboard" className="logo-2">
              <img alt="Logo" src={logo} />
            </Link>
            <Link to="/cart" className="prime-shopping-cart navIcons">
              <img
                style={{ cursor: "pointer" }}
                title="Cart"
                alt="Prime shopping cart"
                src={cartIcon}
              />
            </Link>
            <div className="search-button">
              <input
                style={{ padding: "20px", fontSize: "18px" }}
                className="overlap-group-5"
                placeholder="Search for 1000+ of available products"
                value={searchTerm}
                onChange={handleSearchTermChange}
                onClick={() => scrollToProducts(productRef)}
              />

              <button
                style={{ border: "none" }}
                className="search-icon-wrapper"
                onClick={searchProduct}
              >
                <img
                  className="search-icon"
                  alt="Search icon"
                  src={searchIcon}
                />
              </button>
            </div>
            <img
              className="favourites-2 navIcons"
              alt="Favourites"
              src={favouritesIcon}
              onClick={toggleShowWishList}
            />
            <Link to="/profile" className="profile navIcons">
              <img alt="Profile" src={profileIcon} />
            </Link>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Dashboard;
