import addItemStyles from '../styles/addItem.module.css';
import { useContext } from 'react';
import AppContext from '../services/AppContext';

const AddItem = ({item}) =>
{
    const [state, setState] = useContext(AppContext);

    const addItem = () => {
        item.quantity = 1;//when we add an item  to cart we are setting the quantity of that item to 1. Because initially it is set to 0 in Home.js file.
        let tempCart = [...state.cart];
        tempCart.push(item);
        setState({ ...state, cart: tempCart });
    }

    const increaseQnty = () => {
        item.quantity += 1;
         let tempCart = [...state.cart];
      let index=tempCart.findIndex(cartItem => cartItem.id === item.id);
      if(index > -1) {//-1 → item not found in cart array so Only update it if we actually found the product.
        tempCart[index].quantity = item.quantity;
      }
        setState({ ...state, cart: tempCart });
    }

    const decreaseQnty = () => {
        item.quantity -= 1;
         let tempCart = [...state.cart];
     let index=tempCart.findIndex(cartItem => cartItem.id === item.id);
      if(index > -1) {
          if (item.quantity === 0) {

            // remove item from cart
            tempCart.splice(index, 1);

        } else {

            tempCart[index].quantity = item.quantity;

        }
      }
        
        setState({ ...state, cart: tempCart });
    }
    return(
        <div className={addItemStyles.addItemContainer}>
           
            {item.quantity === 0 ? (<button className={addItemStyles.addItemBtn} onClick={addItem}>Add</button>) :(
                <div className={addItemStyles.addItem}>
                    <div className={addItemStyles.minusBtn} onClick={decreaseQnty}>-</div>
                    <div className={addItemStyles.qty}>{item.quantity}</div>
                    <div className={addItemStyles.plusBtn} onClick={increaseQnty}>+</div>
                    </div>
            )}
          
        </div>
    );
}
export default AddItem;