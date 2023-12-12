// https://www.npmjs.com/package/joi

import Joi from "joi";

export const validar = (producto) => {
  const productoSchema = Joi.object({
    // nombre: Joi.string().alphanum().required(),
    nombre: Joi.string()
      .regex(/^[a-zA-Z0-9\s]+$/)
      .required(),
    precio: Joi.number().min(0).max(10000000).required(),
    stock: Joi.number().integer().min(0).max(99999).required(),
  });

  const { error } = productoSchema.validate(producto);
  if (error) {
    return { result: false, error };
  }

  return { result: true };
};
