const changeQuantity = document.querySelectorAll(".change-cart-amount");
const cartQuantity = document.querySelectorAll('input[name="cart-quantity"]');
const formToChangeAmount = document.querySelectorAll("form.button-container");
const changeAmountInput = document.querySelectorAll(".change-cart-amount");
const deleteCartItems = document.querySelectorAll(".cart-delete-button");
const cartItemId = document.querySelectorAll('input[name="cart-id"]');


changeQuantity.forEach((input,index) => {
    
    input.value =  parseInt(cartQuantity[index].value)
});

changeAmountInput.forEach((button, index) => {
    
    button.addEventListener("keydown", (e) => {
        if (e.key === "Enter"){
            e.preventDefault()
            const quantityValue = parseInt(button.value);
             
            
            
            
            fetch(`/api/v1/check-out/change-product/${cartItemId[index].value}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    quantity: quantityValue,
                    
                })
            })
            .then(response => {
                if (!response.ok){
                    throw new Error("Response to changing cart items was not okay")
                }
                window.location.reload()
            })
                
                .catch(err => console.error("Error:", err))
                
            }
        }
    )
        
    
        

})

deleteCartItems.forEach((button, index) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        fetch(`/api/v1/check-out/change-product`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                index: index
            })
            
        })
        .then((response) => {
            if(!response.ok){
                throw new Error("Response of deleting an item was not okay")
            }
            window.location.reload();
            console.log(`Success: ${response}`)
        })
        .catch(err => console.error("Error:", err))
    })
})