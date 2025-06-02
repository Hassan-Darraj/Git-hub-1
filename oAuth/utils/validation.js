import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .required()
    .messages({
      "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
      "string.min": "Password must be at least 8 characters long.",
      "any.required": "Password is required.",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .invalid(Joi.ref("currentPassword"))
    .required()
    .messages({
      "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
      "any.invalid": "New password cannot be the same as current password.",
      "string.min": "Password must be at least 8 characters long.",
      "any.required": "Password is required.",
    }),
});
