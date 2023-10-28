const getStoredCart = () => {
    const storedCartString = localStorage.getItem('cart');
    if(storedCartString){//means if something exist
        return JSON.parse(storedCartString);
    }
    return [];
}

const saveCartToLS = cart =>{
    const cartStringified = JSON.stringify(cart);
    localStorage.setItem('cart', cartStringified);
}

const addToLS = id =>{
    const cart = getStoredCart();
    cart.push(id); //push will work as it is plain javascript
    //save to local storage
    saveCartToLS(cart);
}

const removeFromLS = id =>{
    const cart = getStoredCart();
    //removing every id
    const remaining = cart.filter(idx => idx !== id);//getting items other than the stored selected items
    saveCartToLS(remaining);
}

export {addToLS,removeFromLS, getStoredCart}

