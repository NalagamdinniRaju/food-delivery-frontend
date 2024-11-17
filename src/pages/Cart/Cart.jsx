import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import "./Cart.css"
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const  {food_list,url,  removeFromCart,cartItems,getTotalCartAmount} = useContext(StoreContext)
  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Tite</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {
          food_list.map((item,index) => {
            if(cartItems[item._id] > 0)
            {
              return (
                <div>
                <div className="cart-items-title cart-items-item">
                    <img src={url+"/images/"+item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>${item.price  * cartItems[item._id]}</p>
                    <p className='cross'><button onClick={() => removeFromCart(item._id)}>X</button></p>
                </div>
                <hr/>
                </div>
              )
            }
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totoal</h2>
            
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount() ===0 ? 0 : 2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() ===0 ? 0 : getTotalCartAmount() + 2}</b>
              </div>
              <hr/>
              <div className="cart-total-details">
              <b>India Rupee Total</b>
                <b>₹{getTotalCartAmount() === 0 
                    ? '0.00' 
                    : ((getTotalCartAmount() + 2) * 80).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}
                </b>
               </div>

            </div>
            <button onClick={() => navigate("/order")}>PROCEED TO CHEKCOUT </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart