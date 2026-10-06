import {useState, useEffect } from "react";
import { createContext } from "react";
import axios from "axios";

const AppContext = createContext();  

function AppProvider(props  ) { 
    const [state, setState] = useState({
        cart: [],
        products: []
    });

    useEffect(() => {
         axios.get("https://localhost:7281/api/Products").then(response => {
           /* let products = response.data;
             for (let product of products) {
                product.quantity = 0;//we are adding new quantity property to each product item to track the quantity of that product when we click add an item to cart Initially it is set to 0.
             }*/
             let products = response.data.map(product => ({
                ...product,
                quantity: 0
            }));
            setState(prevState => ({
                    ...prevState,
                    products
                }));
        });
    }, []);

    return(
        <AppContext.Provider value={[state, setState]}>
            {props.children}
        </AppContext.Provider>
    )
}

export { AppProvider};
export default AppContext;