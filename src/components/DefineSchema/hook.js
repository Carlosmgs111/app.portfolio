import { useState, useEffect } from "react";
import { genRandomId } from "../../utils";
import { runButtonBehavior } from "../../utils";

export function hook({ baseSchema = {}, onClickHandler, highOrderCallback }) {
  const [label, setLabel] = useState("");
  const [schema, setSchema] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [attributes, setAttributes] = useState({});
  const listOfDefineAttributes = [];

  console.log({ schema, attributes });

  useEffect(() => {
    setAttributes({ [genRandomId()]: baseSchema });
    return () => reset();
  }, []);

  const parseSchema = (object = true) => {
    const parsedSchema = object ? {} : [];
    for (var attr in schema) {
      if (object) parsedSchema[schema[attr].title] = schema[attr];
      else parsedSchema.push(schema[attr]);
    }
    return parsedSchema;
  };

  const reset = () => {
    setAttributes({ [genRandomId()]: baseSchema });
    setSchema({});
  };

  if (highOrderCallback)
    onClickHandler = highOrderCallback({
      setError,
      setLoading,
      data: parseSchema(false),
      reset,
    });

  const addDefineAttribute = () => {
    setAttributes({
      ...attributes,
      [genRandomId()]: baseSchema,
    });
  };

  const onClick = async (e) => {
    e.preventDefault();
    const behaviors = {
      add: addDefineAttribute,
      main: () =>
        onClickHandler({
          setError,
          setLoading,
          data: parseSchema(false),
          reset,
        }),
    };
    runButtonBehavior(e, behaviors);
  };

  if (highOrderCallback)
    highOrderCallback({
      setError,
      setLoading,
      data: parseSchema(false),
      reset,
    });

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
