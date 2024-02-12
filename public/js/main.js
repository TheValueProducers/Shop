const logOutButton = document.querySelector("#log-out")

logOutButton.addEventListener("click", (e) => {
    e.preventDefault();
    fetch("/api/v1/log-out", {
        method: "DELETE"
        
    }).then(response => {
        if (!response.redirected){
            throw new Error("Response was not okay")
        }
        return true
    }).then(response => {
        if (response === true){
            window.location.reload()
        }
    }).catch(err => {
        console.error("Error:", err);
    })
})