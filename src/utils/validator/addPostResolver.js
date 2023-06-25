import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";

const addPostSchema = Joi.object({
    group: Joi.string()
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                if (err.code === "string.empty") {
                    err.message = "Select a group";
                }
            });
            return errors;
        }),
    msg: Joi.string()
        .min(3)
        .max(100)
        .required()
        .error((errors) => {
            errors.forEach((err) => {
                if (err.code === "string.empty") {
                    err.message = "Message is required field";
                } else if (err.code === "string.min") {
                    err.message = "Message must be at least 3 characters long";
                } else if (err.code === "string.max") {
                    err.message = "Message must be less than or equal to 100 characters long";
                }
            });
            return errors;
        }),
    image: Joi.string().optional(),
});

export const addPostResolver = joiResolver(addPostSchema);
