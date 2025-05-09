import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.VITE_CURRENCY;

  const navigate = useNavigate();
  const [user, setUser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});

  const [searchQuery, setSearchQuery] = useState({});    /////yhan pe change kiya hai

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success('Item added to cart');
  };

  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
    toast.success('Item updated in cart');
  };

  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    setCartItems(cartData);
    toast.success('Item removed from cart');
  };

  const fetchProducts = async () => {
    setProducts(dummyProducts);
  };

  //get cart items count 
  const getCartItemsCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      totalCount += cartItems[item];
    }
    return totalCount;
  };

  //get cart total amount
  const getCartTotalAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product.id === items);
      if (cartItems[items]>0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount*100)/100;
  };


  useEffect(() => {
    fetchProducts();
  }, []);




  const value = {
    navigate,
    user, setUser,
    isSeller, setIsSeller,
    showUserLogin, setUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartTotalAmount,
    getCartItemsCount

  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
