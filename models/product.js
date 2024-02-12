const { pool } = require("../database/database");

class Product {
    constructor(id, name, price, description, imageLink) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageLink = imageLink;
    }

    async save() {
        let client = await pool.connect();;
        try {
            
            
            const values = [this.name, this.price, this.description, this.imageLink];
            
            await client.query("INSERT INTO product(name, price, description, image_link) VALUES ($1, $2, $3, $4);", values);
        } catch (err) {
            console.error("Error:", err);
            throw err; 
        } finally {
            if (client) {
                client.release(); 
            }
        }
    }
    async update(){
        let client = await pool.connect()
        try{
            const values = [this.name, this.price, this.description, this.imageLink, this.id];
            await client.query("UPDATE product SET name = $1, price = $2, description = $3, image_link = $4 WHERE id = $5;", values);
            

            
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
            const res = await client.query('DELETE FROM product WHERE id = $1;', [id]);
            
        } catch(err){
            console.error("Error:", err);
        }
        finally {
            if (client){
                client.release();

            }
            
        }
    }
   

    static async fetchAll() {
        let client = await pool.connect();
        try {
            
            const res = await client.query("SELECT * FROM product;");
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
    static async fetchById(id){
        let client = await pool.connect();
        try{
            const selectedValue = await client.query("SELECT * FROM product WHERE id = $1;", [id]);
            return selectedValue.rows[0];
        }catch(err){
            console.error("Error:", err);
        }finally{
            if (client){
                client.release();
            }
        }
    }
}











module.exports = { Product };