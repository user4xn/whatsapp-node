const db = require('../../../models');
const { Op } = require("sequelize");
class UserRepository {
    async getAllUserWithPaginate(payload){
        try{
            const { limit, offset, keyword } = payload
            return await db.User.findAll({
                offset,
                limit,
                where:{
                    first_name:{
                        [Op.like]: `%${keyword}%`
                    }
                }
            });
        }catch(err){
            throw new Error(err.original.message);
        }
    }

    async getUserById(id){
        try{
            return await db.User.findOne({
                where:{
                    id
                }
            });
        }catch(err){
            throw new Error(err.original.message);
        }
    }

    async createNewUSer(payload){
        try{
            const { first_name, last_name, email } = payload
            return await db.User.create({
                first_name,
                last_name,
                email,
                created_at: new Date(),
                updated_at: new Date()
            });
        }catch(err){
            throw new Error(err.original.message);
        }
    }
}

module.exports = UserRepository;
