const {pool} = require("../database/database");
const {Product} = require("./product")

class Cart{
    static async save(id, quantity) {
        let client = await pool.connect();;
        try {
            
            await client.query("INSERT INTO cart VALUES ($1, $2);", [id, quantity]);
        } catch (err) {
            console.error("Error:", err);
            throw err; 
        } finally {
            if (client) {
                client.release(); 
            }
        }
    }
    static async fetchAll() {
        const client = await pool.connect();
        try {
            
            const res = await client.query("SELECT * FROM cart;");
            return res.rows;
        } catch (err) {
            console.error("Error:", err);
            throw err; 
        } finally {
            if (client) {
                client.release();
            }
        }
    }
    static async update(id, quantity){
        const client = await pool.connect()
        try{
            
            await client.query("UPDATE cart SET quantity = $1 WHERE id = $2;", [quantity, id]);
             
        }catch(err){
            console.error("Error:", err);
        }finally{
            if (client){
                client.release();
            }
        }
    }
    static async delete(id) {
        const client = await pool.connect();
        try {
            const res = await client.query('DELETE FROM cart WHERE id = $1;', [id]);
            
        } catch(err){
            console.error("Error:", err);
        }
        finally {
            if (client){
                client.release();

            }
            
        }
    }
    static async getTotal(){
        
        try {
            let total = 0;
            const cartData = await Cart.fetchAll();
            const productData = await Product.fetchAll();
            for (let i = 0; i < cartData.length; i++){
                for (let j = 0; j < productData.length; j++){
                    if (cartData[i].id === productData[j].id){
                        total += parseFloat(productData[j].price) * parseFloat(cartData[i].quantity)
                    }
                }
            }
            return total.toFixed(2);
           
            
        }catch(err){
            console.error("Error:", err);
        }
        
    }
    static async getProductDetails(){
        try {
            let productDetails = [];
            const cartData = await Cart.fetchAll();
            const productData = await Product.fetchAll();
            for (let i = 0; i < cartData.length; i++){
                for (let j = 0; j < productData.length; j++){
                    if (cartData[i].id === productData[j].id){
                        productDetails.push({...productData[j], quantity: cartData[i].quantity})
                    }
                }
            }
            return productDetails;
           
            
        }catch(err){
            console.error("Error:", err);
        }
    }
}




module.exports = {Cart}








