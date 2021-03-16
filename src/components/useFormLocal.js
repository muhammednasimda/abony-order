import { useState } from "react";

export const useFormLocal = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  return [
    values,
    (data) => {
      setValues((prevValues) => {
        return { ...prevValues, ...data };
      });
    },
    (e) => {
      setValues((prevValues) => {
        return {
          ...prevValues,
          [e.target.name]:
            e.target.type === "number"
              ? parseInt(e.target.value)
              : e.target.value,
        };
      });
    },
  ];
};
