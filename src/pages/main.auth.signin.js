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
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const checkLocal = localStorage.getItem("users").split(";");
      checkLocal.pop();
      const checkEmail = checkLocal.map((item) => JSON.parse(item)).find((item) => item.email === values.email);
      if (checkEmail) {
        if (checkEmail.password === values.password) {
          localStorage.setItem("authUser", JSON.stringify({name: checkEmail.firstName, auth: true}));
          window.location = '/';}
          else alert("Неправильный пароль!");
      } else {alert("Пользователя с таким e-mail не существует");}
    },
  });
  
    return (
      <div>
        <h2 className="mb-5">Добро пожаловать на сайт!</h2>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
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
                Войти
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>)
}
