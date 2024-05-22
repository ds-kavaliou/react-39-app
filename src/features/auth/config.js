import * as yup from "yup";

export const signUpValidationSchema = yup.object({
  name: yup
    .string()
    .min(1, "Name must contain at least 1 letter")
    .max(30, "Name must contain at most 30 letters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters long")
    .required("Password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const signInValidationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
