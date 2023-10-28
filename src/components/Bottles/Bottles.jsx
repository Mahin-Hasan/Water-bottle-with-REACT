import { useEffect } from "react";
import { useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLS, getStoredCart } from "../../utilities/localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('bottles.json')
            .then(res => res.json())
            .then(data => setBottles(data))
    }, [])

    // load cart from local storage
    useEffect(() => {
        // console.log('inside useEffect', bottles.length);
        // const storedCart = getStoredCart();
        // console.log(storedCart);
        if (bottles.length) {//means if truthy it will go inside 
            const storedCart = getStoredCart();
            console.log(storedCart, bottles);

            // for of loop for array and for in loop for object
            const savedCart = [];// will store the matched items in this array
            for (const id of storedCart) {// we get all the id of bottles from this function 
                console.log(id);
                //finding the item that matches with the id.
                const bottle = bottles.find(bottle => bottle.id === id);
                // console.log(bottle);
                if (bottle) {
                    savedCart.push(bottle);
                }
            }
            console.log(savedCart);
            setCart(savedCart);
        }
    }, [bottles])//setting dependency bottles

    const handleAddToCart = bottle => {
        // console.log('tbh',bottle);
        const newCart = [...cart, bottle];//initial cart state ...cart and bottle will add new items to the prev cart
        setCart(newCart);
        addToLS(bottle.id);
    }


    return (
        <div>
            <h2>Bottle Available: {bottles.length}</h2>
            {/* <h4>Cart: {cart.length}</h4> */}
            <Cart cart={cart}></Cart>
            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle
                        key={bottle.id}
                        bottle={bottle}
                        handleAddToCart={() => handleAddToCart(bottle)}
                    ></Bottle>)

                }
            </div>
        </div>
    );
};

export default Bottles;