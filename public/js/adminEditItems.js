var productId = document.querySelector('input[name="productId"]').value;


document.querySelector('.input-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        name: document.querySelector('input[name="name"]').value,
        price: document.querySelector('input[name="price"]').value,
        description: document.querySelector('input[name="description"]').value,
        imageLink: document.querySelector('input[name="imageLink"]').value,
    };

    

    
    fetch(`/api/v1/admin-edit-items/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        alert("Changes are successfully made")
        console.log(data);
    })
    .catch((error) => {
        
        console.error('Error:', error);
    });
});






