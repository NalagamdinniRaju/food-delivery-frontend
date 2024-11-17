import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    // const url = 'http://localhost:5000'
    const url = 'https://food-delivery-backend-1-dzov.onrender.com'
    
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])
    const [isLoading, setIsLoading] = useState(true) // Add loading state


    const addToCart = async(itemId) => {
        if (!cartItems[itemId]){
            setCartItems((prev) => ({...prev, [itemId] : 1}))
        }
        else{
            setCartItems((prev) => ({...prev, [itemId] : prev[itemId] +1}))

        }
        if(token){
            await axios.post(`${url}/api/cart/add`, {itemId}, {headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId] : prev[itemId] -1}))
        if(token){
            await axios.post(url + '/api/cart/remove', {itemId}, {headers:{token}})
        }
    }


    const getTotalCartAmount = () => {
        let totalAmout = 0;
        for(const item in cartItems)
        {   
            if(cartItems[item]> 0){
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmout += itemInfo.price * cartItems[item]
            }

        }
        return totalAmout
    }


    const fetchFoodList = async () => {

        // const response = await axios.get(`${url}/api/food/list`)
        // setFoodList(response.data.data)
        try {
            setIsLoading(true) // Set loading to true before fetch
            const response = await axios.get(`${url}/api/food/list`)
            setFoodList(response.data.data)
        } catch (error) {
            console.error('Error fetching food list:', error)
        } finally {
            setIsLoading(false) // Set loading to false after fetch
        }
    }

    const loadCartData = async(token) => {
        const response = await axios.post(`${url}/api/cart/get`,{}, {headers:{token}})
        setCartItems(response.data.cartData)
    }

    // useEffect(() => {
       
    //    async function loadData() {
    //      await fetchFoodList()
    //      if(localStorage.getItem("token")){
    //         setToken(localStorage.getItem("token"))
    //         await loadCartData(localStorage.getItem("token"))
    //        }
    //    }
    //    loadData();
    // }, [])
    useEffect(() => {
        async function loadData() {
            try {
                setIsLoading(true)
                await fetchFoodList()
                if(localStorage.getItem("token")){
                    setToken(localStorage.getItem("token"))
                    await loadCartData(localStorage.getItem("token"))
                }
            } catch (error) {
                console.error('Error loading data:', error)
            } finally {
                setIsLoading(false)
            }
        }
        loadData();
    }, [])

    const contextValue = {
        // Add your context values here
        food_list,
        addToCart,
        removeFromCart,
        cartItems,
        getTotalCartAmount,
        url,
        token,
        setToken,
        isLoading 

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider