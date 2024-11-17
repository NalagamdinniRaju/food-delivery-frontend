// import React, { useContext } from 'react'
// import './FoodDisplay.css'
// import { StoreContext } from '../../context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem'

// const FoodDisplay = ({category}) => {
//     const {food_list} = useContext(StoreContext)
//     console.log(food_list)

//   return (
//     <div className='food-display' id='food-display'>
//         <h2>Top dishes near you.</h2>
//         <div className="food-display-list">
//             {
//                 food_list.map((item, index) => {
//                     if(category === "All" || item.category === category){
//                         return (
//                             <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />

//                         )
//                     }
                
//                 })
//             }
//         </div>
//     </div>
//   )
// }

// export default FoodDisplay
import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const {food_list, isLoading} = useContext(StoreContext) // Add isLoading from context
    
    if (isLoading) {
        return (
            <div className='food-display'>
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
            </div>
        )
    }

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you.</h2>
            <div className="food-display-list">
                {
                    food_list.map((item, index) => {
                        if(category === "All" || item.category === category){
                            return (
                                <FoodItem 
                                    key={index} 
                                    id={item._id} 
                                    name={item.name} 
                                    description={item.description} 
                                    price={item.price} 
                                    image={item.image} 
                                />
                            )
                        }
                        return null; // Add return for items that don't match category
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay