import { InputForm } from "./InputForm";
import { FormStyle, Content, Button, Message } from "./styles";
import { useHook } from "./useHook";
import { OnError } from "../OnError";
import { OnLoading } from "../OnLoading";
import { labelCases, Mapfy } from "../../utils";
import { MemoizedComponent } from "../../components/MemoizedComponent";

export enum INPUT_TYPES {
  TEXT = "TEXT", // input text
  NUMBER = "NUMBER", // input number
  DATE = "DATE", // input date
  RANGE = "RANGE", // input range
  EITHER = "EITHER", // input radio
  SELECTION = "SELECTION", // select
  PARAGRAPH = "PARAGRAPH", // textarea
}

type validValue = String | Number | Boolean | Array<String | Number>;

export type DefineFormsType = {
  // * [key] must be the same that provided by the backend
  [key: string]:
    | validValue // *
    | {
        // * required - used for select the right input component
        inputType: INPUT_TYPES | [INPUT_TYPES];
        // * optional - by default same that key, represent the attribute, property in backend
        name?: string;
        // * optional - by default same that key, used to represent and display in frontend
        label?: string;
        // * optional - by default a empty value, depend of selected inputType, if match with input will be included, if not, just ignored
        value?: validValue;
        // * optional - by default a empty value, depend of selected inputType, if match with input will be included, if not, just ignored
        // * and is used for support when value are multiple values o range controlled values (list)
        initValue?: validValue;
        // * optional - by default is false
        required?: boolean;
      };
};

export function DefineForms({
  baseSchema = {},
  nonOptionals,
  onClickHandler,
  buttons = { main: "save" },
  highOrderCallback,
}: any) {
  if (!nonOptionals)
    nonOptionals = Object.entries(baseSchema).map((kv) => kv[0]);

  const {
    schema,
    updateSchemaDelta,
    onClick,
    listOfDefineAttributes,
    label,
    setLabel,
    loading,
    error,
    reset,
  } = useHook({ baseSchema, onClickHandler, highOrderCallback });

  Mapfy(schema).forEach((_, index) => {
    const _data = schema[index];
    listOfDefineAttributes.push(
      <MemoizedComponent {...{ deps: [_data, Mapfy(schema).size], key: index }}>
        <InputForm
          {...{
            index,
            schema,
            _data,
            updateSchemaDelta,
            nonOptionals,
            onClick,
            fixed: false,
          }}
        />
      </MemoizedComponent>
    );
  });

  return (
    <Content>
      <label hidden={true}>Label:</label>
      <input
        hidden={true}
        type="text"
        name="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <FormStyle name="main" onSubmit={onClick}>
        {listOfDefineAttributes}
      </FormStyle>
      <OnError {...{ error, reset }}></OnError>
      <OnLoading {...{ loading, component: Content }}></OnLoading>
      {Mapfy(buttons).has("main") && (
        <Button name="main" type="button" onClick={onClick}>
          {Mapfy(schema).size < 2
            ? labelCases(buttons.main).CS
            : labelCases(buttons.main).CP}
        </Button>
      )}

      <Message>(*) Campos Obligatorios</Message>
    </Content>
  );
}

export const getHOCAndTrigger = (cb: any) => {
  let onClickHandlerCallback: any = null;
  return [
    (params: any) => (onClickHandlerCallback = () => cb(params)),
    () => onClickHandlerCallback(),
  ];
};
