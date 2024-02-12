const {pool} = require("../database/database")
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require("uuid");
class User{
    #password;
    
    constructor(data){
        this.id = data.id || uuidv4();
        this.name = data.name;
        this.dateOfBirth = data.dateOfBirth;
        this.username = data.username;
        this.#password = data.password;
        this.hashed_password = data.hashed_password || null;
        this.email = data.email;
    }

  
    

    async save(){
            const client = await pool.connect();
        try{
            this.hashed_password = await bcrypt.hash(this.#password, 10);
            await client.query("INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6);", [this.id, this.name, this.dateOfBirth, this.username, this.hashed_password, this.email]);
        }catch(err){
            
            throw err;
        }finally{
            if (client){
                client.release();
            }
        }
    }

    async verifyPassword(candidatePassword) {
        if (!this.hashed_password) {
            throw new Error('No hashed password available for comparison.');
        }
        return bcrypt.compare(candidatePassword, this.hashed_password);
    }
    
    



    static async findByUsername(username){
        const client = await pool.connect();
        try{
            const userInfo = await client.query("SELECT * FROM users WHERE username = $1;", [username]);
            if (userInfo.rows.length > 0){
                return new User(userInfo.rows[0]);
            }else{
                return null
            }
        }catch(err){
            console.error("Error:", err)
        }finally{
            if (client){
                client.release();
            }
        }
    }
    static async findById(id){
        const client = await pool.connect();
        try{
            const userInfo = await client.query("SELECT * FROM users WHERE id = $1;", [id]);
            if (userInfo.rows.length > 0){
                return new User(userInfo.rows[0]);
            }else{
                return null
            }
        }catch(err){
            console.error("Error:", err)
        }finally{
            if (client){
                client.release();
            }
        }
    }
}







module.exports = {User}




