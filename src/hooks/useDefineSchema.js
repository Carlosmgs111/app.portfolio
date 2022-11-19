import { useState, useEffect } from "react";
import { genRandomId } from "../utils";

export function useDefineSchema({ baseSchema = {}, cb }) {
  const [label, setLabel] = useState("");
  const [schema, setSchema] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [attributes, setAttributes] = useState({});
  const listOfDefineAttributes = [];

  useEffect(() => {
    setAttributes({ [genRandomId()]: baseSchema });
  }, []);

  const parseSchema = (object = true) => {
    const parsedSchema = object ? {} : [];
    for (var attr in schema) {
      if (object) parsedSchema[schema[attr].title] = schema[attr];
      else parsedSchema.push(schema[attr]);
    }
    return parsedSchema;
  };

  const addDefineAttribute = () => {
    setAttributes({
      ...attributes,
      [genRandomId()]: baseSchema,
    });
  };

  const reset = () => {
    setAttributes({ [genRandomId()]: baseSchema });
    setSchema({});
  };

  const onClick = async (e) => {
    const { name } = e.target;
    if (name === "add-button") addDefineAttribute();
    if (name === "save-button")
      cb({ setError, setLoading, parseSchema, reset });
  };

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
