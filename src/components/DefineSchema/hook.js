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

  if (highOrderCallback) onClickHandler = highOrderCallback;

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
    const behaviors = {
      add: addDefineAttribute,
      main: () =>
        onClickHandler({
          setError,
          setLoading,
          parsedSchema: parseSchema(false),
          reset,
        }),
    };
    runButtonBehavior(e, behaviors);
  };

  if (highOrderCallback)
    highOrderCallback({
      setError,
      setLoading,
      parsedSchema: parseSchema(false),
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
