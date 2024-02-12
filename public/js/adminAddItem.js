
const inputImage = document.querySelector(".input-image-link");
const form = document.querySelector(".input-form");
async function urlExists(urlToCheck) {
    try {
      const response = await fetch(urlToCheck, {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache' 
      });
      return response.status === 0; 
    } catch (error) {
      console.error(error);
      return false;
    }
  }
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const checkUrl = await urlExists(inputImage.value)
    if (checkUrl === false){
        alert("Please Type a Valid URL")
    }else{
        form.submit()
    }
        
})





