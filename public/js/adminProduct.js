
const clearButtons = document.querySelectorAll(".delete-button");
// const submitButton = document.querySelector(".input-submit");
// const form = document.querySelector("form");
const editButton = document.querySelectorAll(".edit-button");
const regex = /\d+/g;
// const tableData = document.querySelectorAll(".edited-data");
// const tableInput = document.querySelectorAll(".item-editor");




clearButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    fetchClear(index);
  });
});

function fetchClear(index){
  fetch("/api/v1/admin-clear", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      index: index 
    })
  })
  .then(response => {
    if(!response.ok){
      throw new Error("Response was not ok")
    }
    console.log(response)
    
    window.location.reload();
  })
  .catch(err => console.log("Error: " + err));
}






    
    







