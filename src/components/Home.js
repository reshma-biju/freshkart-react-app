import Banner from "./Banner";
import Cards from "./Cards";
import Popular from "./Popular";
import axios from "axios";
import { useEffect , useState } from "react";
import AppContext from "../services/AppContext";
import { useContext } from "react";

const Home = ()=> {

    const [state, setState] = useContext(AppContext);
    const [fruits, setFruits] = useState([]);
     const [vegetables, setVegetables] = useState([]);


    const categorizeProducts = (products) => {
        let tempFruits = [];
        let tempVegetables = [];

        for (let product of products) {
            if (product.type === "fruits" && product.popular === true) {
                tempFruits.push(product);
            }
            if (product.type === "vegetables" && product.popular === true) {
                tempVegetables.push(product);
            }
        }
            setFruits(tempFruits);
            setVegetables(tempVegetables);
        
       
    }

    useEffect(() => {
        if (state.products.length > 0) {

            categorizeProducts(state.products);
        }
    }, [state.products]);

    return(
        <>
       <Banner />
       <Cards />
       <Popular title="Popular Fruits" items={fruits} />
       <Popular title="Popular Vegetables" items={vegetables} />
        </>
    )
}
export default Home;