import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from 'axios'



axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;

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

//fetch seller status
const fetchSeller=async()=>{
  try {
    const {data}=await axios.get('/api/seller/is-auth');
    if(data.success){
      setIsSeller(true)
    }else{
      setIsSeller(false)
    }
  } catch (error) {
    
  }
}

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
      const itemInfo = products.find((product) => product._id === items);
      if (cartItems[items]>0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount*100)/100;
  };


  useEffect(() => {
    fetchProducts();
    fetchSeller()
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
    getCartItemsCount,
    axios

  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
