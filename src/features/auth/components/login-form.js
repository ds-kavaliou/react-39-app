import { useFormik } from "formik";
import { Field, Input, Button } from "src/components";
import { signInValidationSchema } from "../config";

const initialValues = {
  email: "",
  password: "",
};

export function SignInForm({ submit, serverError }) {
  const formik = useFormik({
    initialValues,
    validationSchema: signInValidationSchema,
    onSubmit: (values) => {
      submit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-4 py-4">
      <div
        hidden={!serverError}
        className="text-[0.8rem] font-medium text-destructive"
      >
        {serverError}
      </div>
      <Field>
        <Field.Label>Email Address</Field.Label>
        <Field.Control>
          <Input
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </Field.Control>
        <Field.Message>{formik.errors.email}</Field.Message>
      </Field>

      <Field>
        <Field.Label>Password</Field.Label>
        <Field.Control>
          <Input
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </Field.Control>
        <Field.Message>{formik.errors.password}</Field.Message>
      </Field>

      <Button type="submit">Sign In</Button>
    </form>
  );
}
