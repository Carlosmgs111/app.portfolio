import { useState } from "react";
import { DefineAttribute } from "./DefineAttribute/index.jsx";
import { FormStyle, Content, Button } from "./styles";
import { useDefineSchema } from "../../hooks/useDefineSchema";
import { OnError } from "../OnError";

export function DefineSchema({ availableLabels }) {
  const {
    attributes,
    onClick,
    listOfDefineAttributes,
    setAttributes,
    schema,
    setSchema,
    label,
    setLabel,
    loading,
    error,
    data,
    reset,
  } = useDefineSchema();

  return (
    <Content>
      <h2>Define Schema</h2>
      <label hidden={true}>Label:</label>
      <input
      hidden={true}
        type="text"
        name="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <FormStyle>
        {new Map(Object.entries(attributes)).forEach((value, key) => {
          listOfDefineAttributes.push(
            <DefineAttribute
              {...{
                key,
                index: key,
                schema,
                setSchema,
                attributes,
                setAttributes,
                nonOptionals: ["title", "emitedAt~", "image", "url", "emitedBy{"],
              }}
            />
          );
        })}
        {listOfDefineAttributes}
      </FormStyle>

      <Button name="add-button" type="button" onClick={onClick}>
        Add
      </Button>
      {availableLabels?.map((label, index) => (
        <p key={index}>{label}</p>
      ))}
      {error && <OnError {...{ error, reset }}></OnError>}
      <Button name="save-button" type="button" onClick={onClick}>
        Save
      </Button>
    </Content>
  );
}
