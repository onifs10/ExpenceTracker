import Joi from "joi";

function validateUser(user: string){
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().required().lowercase().email(),
      password: Joi.string().required().min(8).max(10)
    })
    return schema.validate(user)
  };
  
  export default validateUser