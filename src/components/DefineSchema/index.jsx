import { InputForm } from "./InputForm/index.jsx";
import { FormStyle, Content, Button, SubmitButton } from "./styles";
import { useHook } from "./useHook";
import { OnError } from "../OnError";
import { OnLoading } from "../OnLoading";
import { labelCases, Mapfy } from "../../utils/index.js";

export function DefineSchema({
  title = "Define Schema",
  baseSchema,
  nonOptionals,
  onClickHandler,
  buttons = { add: "add", main: "save" },
  highOrderCallback,
}) {
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
    reset,
  } = useHook({ baseSchema, onClickHandler, highOrderCallback });
  
  return (
    <Content>
      <h2>{title}</h2>
      <label hidden={true}>Label:</label>
      <input
        hidden={true}
        type="text"
        name="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <FormStyle name="main" onSubmit={onClick}>
        {Mapfy(attributes).forEach((_, index) => {
          listOfDefineAttributes.push(
            <InputForm
              {...{
                key: index,
                index,
                schema,
                setSchema,
                attributes,
                setAttributes,
                nonOptionals,
              }}
            />
          );
        })}
        {listOfDefineAttributes}
        <SubmitButton
          name="main"
          type="submit"
          disabled={Mapfy(schema).size > 1}
        ></SubmitButton>
      </FormStyle>
      {Mapfy(buttons).has("add") && (
        <Button name="add" type="button" onClick={onClick}>
          {labelCases(buttons.add).CS}
        </Button>
      )}
      <OnError {...{ error, reset }}></OnError>
      <OnLoading {...{ loading, component: Content }}></OnLoading>
      {Mapfy(buttons).has("main") && (
        <Button name="main" type="button" onClick={onClick}>
          {labelCases(buttons.main).CS}
        </Button>
      )}
    </Content>
  );
}

export const getHOCAndTrigger = (cb) => {
  let onClickHandlerCallback = null;
  return [
    (params) => (onClickHandlerCallback = () => cb(params)),
    () => onClickHandlerCallback(),
  ];
};
