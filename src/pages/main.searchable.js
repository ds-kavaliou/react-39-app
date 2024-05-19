import { useCallback, useEffect, useRef } from "react";
import { Outlet, Form, useSubmit, useLoaderData } from "react-router-dom";

import { Input, Select } from "src/components";

export const searchableLayoutLoader = ({ request }) => {
  return Object.fromEntries(new URL(request.url).searchParams);
};

export function SearchableLayout() {
  const submit = useSubmit();
  const { name = "", status = "", gender = "" } = useLoaderData();

  const nameRef = useRef();
  const statusRef = useRef();
  const genderRef = useRef();

  useEffect(() => {
    nameRef.current.value = name;
    statusRef.current.value = status;
    genderRef.current.value = gender;
  }, [name, status, gender]);

  const handle = useCallback(
    (e) => submit(e.currentTarget, { replace: true }),
    [submit]
  );

  return (
    <>
      <div className="container">
        <Form
          className="grid grid-cols-[6fr,3fr,3fr] gap-4 mb-4"
          action="search"
          onChange={handle}
        >
          <Input
            ref={nameRef}
            type="text"
            name={"name"}
            placeholder="Search..."
            defaultValue={name}
          />
          <Select ref={statusRef} name="status" defaultValue={status}>
            <option value="">All Statuses</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </Select>
          <Select ref={genderRef} name="gender" defaultValue={gender}>
            <option value="">All Genders</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </Select>
        </Form>
      </div>
      <Outlet />
    </>
  );
}
