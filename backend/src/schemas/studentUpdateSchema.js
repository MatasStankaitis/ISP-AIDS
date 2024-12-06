import Joi from "joi";

export const studentUpdateSchema = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  phone_number: Joi.string().alphanum().min(4).max(15).required(),
  email: Joi.string().email().required(),
  home_address: Joi.string().required(),
  gender: Joi.number().min(0).required(),
  year: Joi.number().min(0).max(5).required(),
  state_funded: Joi.boolean().required(),
  fk_Facultyid: Joi.number().min(0).required(),
  fk_Groupid: Joi.number().min(0).required(),
});
