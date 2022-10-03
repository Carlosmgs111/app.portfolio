import { useState, useEffect } from "react";
import { genRandomId } from "../utils";
import { URL, URL_API } from "../services/index";
import { getContext, CONTEXTS } from "../contexts";
import axios from "axios";

export function useDefineSchema({setData, baseSchema=()=>{}}) {
  const [{ useStateValue }, ACTIONS] = getContext(CONTEXTS.Global);
  const [{ token }, dispatch] = useStateValue();
  const [label, setLabel] = useState("");
  const [schema, setSchema] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [data, setData] = useState(null);

  useEffect(() => {
    setAttributes({[genRandomId()]:baseSchema})
  }, []);

  const parseSchema = (object = true) => {
    const parsedSchema = object ? {} : [];
    for (var attr in schema) {
      if (object) parsedSchema[schema[attr].title] = schema[attr];
      else parsedSchema.push(schema[attr]);
    }
    console.log({ parsedSchema });
    return parsedSchema;
  };

  const [attributes, setAttributes] = useState({});

  const listOfDefineAttributes = [];

  const addDefineAttribute = () => {
    setAttributes({
      ...attributes,
      [genRandomId()]: baseSchema,
    });
  };

  const onClick = async (e) => {
    const { name } = e.target;
    if (name === "add-button") {addDefineAttribute()};
    if (name === "save-button") {
      setData(
        (
          await axios.post(
            `${URL_API}/certifications/certifications`,
            { certifications: parseSchema(false) },
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
        ).data
      );
    }
  };
  console.log({ schema });
  console.log(parseSchema(false));
  return {
    attributes,
    setAttributes,
    onClick,
    listOfDefineAttributes,
    schema,
    setSchema,
    label,
    setLabel,
    loading,
    error,
  };
}
