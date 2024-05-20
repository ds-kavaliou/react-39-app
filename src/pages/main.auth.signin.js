// material-ui
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
// formik
import { useFormik } from "formik";
// yup
import * as yup from "yup";
// import css from "./RegisterForm.module.css";
export function SignInPage() {
  const validationSchema = yup.object({
    firstName: yup
      .string()
      .min(1, "Имя должно содержать минимум 1 букву")
      .max(30, "Имя должно содержать максимум 30 букв")
      .matches(
        /^[A-Za-zА-Яа-яёЁ]+$/,
        "Имя не должно содержать цифры и специальные символы"
      )
      .required("Ввод имени обязателен"),
    lastName: yup
      .string()
      .min(1, "Фамилия должна содержать минимум 1 букву")
      .max(30, "Фамилия должна содержать максимум 30 букв")
      .matches(
        /^[A-Za-zА-Яа-яёЁ]+$/,
        "Фамилия не должна содержать цифры и специальные символы"
      )
      .required("Ввод фамилии обязателен"),
    email: yup
      .string()
      .email("Введите валидный email")
      .required("Ввод email Обязателен"),
    password: yup
      .string()
      .min(8, "Пароль должен содержать не менее 8 символов")
      .matches(/[A-ZА-Я]/, "Пароль должен содержать минимум одну заглавную букву")
      .matches(/\d/, "Пароль должен содержать минимум одну цифру")
      .required("Ввод пароля Обязателен"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
 
  
  
    return (
      <div
    
       >
        <h2 className="mb-5">Добро пожаловать на сайт!</h2>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="firstName"
                name="firstName"
                label="Имя"
                variant="outlined"
                fullWidth
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="lastName"
                name="lastName"
                label="Фамилия"
                variant="outlined"
                fullWidth
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Почта"
                variant="outlined"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="password"
                name="password"
                label="Пароль"
                variant="outlined"
                type="text"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Зарегистрироваться
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
  )
}
