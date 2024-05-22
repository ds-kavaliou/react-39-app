import { useFormik } from "formik";
import { signUpValidationSchema } from "../config";

import { Input, Field, Button } from "src/components";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export function SignUpForm({ submit, serverError }) {
  const formik = useFormik({
    initialValues,
    validationSchema: signUpValidationSchema,
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
        <Field.Label>Name</Field.Label>
        <Field.Control>
          <Input
            name="name"
            type="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
        </Field.Control>
        <Field.Message>{formik.errors.name}</Field.Message>
      </Field>

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

      <Field>
        <Field.Label>Password Confirmation</Field.Label>
        <Field.Control>
          <Input
            name="confirm"
            type="confirm"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirm}
          />
        </Field.Control>
        <Field.Message>{formik.errors.confirm}</Field.Message>
      </Field>

      <Button type="submit">Sign Up</Button>
    </form>
  );
}
