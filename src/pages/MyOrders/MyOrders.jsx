// import React, { useContext, useEffect, useState } from 'react'
// import "./MyOrders.css"
// import { StoreContext } from '../../context/StoreContext'
// import axios from 'axios'
// import { assets } from '../../assets/assets'

// const MyOrders = () => {
//     const{url,token} = useContext(StoreContext)
//     const[data, setData] = useState([])
//     const fetchOrders = async() => {
//         const response = await axios.post(url+"/api/orders/userorders", {}, {headers:{token}})
//         setData(response.data.data)
//         // console.log(response.data.data)
//     }
//     useEffect(() => {
//         if(token){
//             fetchOrders()
//         }
//     },[token])

//   return (
//     <div className='my-orders'>
//         <h2>My Orders</h2>
//         <div className="container">
//             {
//                 data.map((order,index) => {
//                     return (
//                         <div key={index} className="my-orders-order">
//                             <img src={assets.parcel_icon} alt="" />
//                             <p>{order.items.map((item,index)=> {
//                                 if(index === order.items.length -1){
//                                     return item.name+ " X " + item.quantity
//                                 }else{
//                                     return item.name + " X " + item.quantity + ", "
//                                 }
//                             })}</p>
//                             <p>${order.amount}.00</p>
//                             <p>Items: {order.items.length}</p>
//                             <p><span>&#x25cf;</span> <b>{order.status}</b></p>
//                             <button onClick={ fetchOrders}>Track Order</button>
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     </div>
//   )
// }

// export default MyOrders
import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {
    const { url, token } = useContext(StoreContext)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchOrders = async() => {
        try {
            setIsLoading(true)
            const response = await axios.post(
                url + "/api/orders/userorders", 
                {}, 
                { headers: { token } }
            )
            setData(response.data.data)
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(token) {
            fetchOrders()
        }
    }, [token])

    if (isLoading) {
        return (
            <div className='my-orders'>
                <h2>My Orders</h2>
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            </div>
        )
    }

    if (!isLoading && data.length === 0) {
        return (
            <div className='my-orders'>
                <h2>My Orders</h2>
                <div className="no-orders">
                    <img src={assets.empty_cart} alt="No orders" />
                    <p>No orders found</p>
                </div>
            </div>
        )
    }

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => {
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if(index === order.items.length -1) {
                                    return item.name + " X " + item.quantity
                                } else {
                                    return item.name + " X " + item.quantity + ", "
                                }
                            })}</p>
                            <p>${order.amount}.00</p>
                            <p>Items: {order.items.length}</p>
                            <p>
                                <span className={`status-dot ${order.status.toLowerCase().replace(' ', '-')}`}>
                                    &#x25cf;
                                </span> 
                                <b>{order.status}</b>
                            </p>
                            <button onClick={fetchOrders}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyOrders