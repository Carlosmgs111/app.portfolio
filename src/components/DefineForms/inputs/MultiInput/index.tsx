import { MultiInputContainer, InputContainer } from "./styles";
import { InputHelper } from "../../../../components/DefineForms/styles";
import { ParagraphInput } from "../ParagraphInput";
import { DateInput } from "../DateInput";
import { SelectionInput } from "../SelectionInput";
import {
  AddButton,
  DeleteButton,
  ButtonsSection,
} from "../../InputForm/styles";
import {
  Mapfy,
  beutifyLabel,
  labelCases,
  listToMap,
  mapToList,
} from "../../../../utils";
import { INPUT_TYPES } from "../../../../components/DefineForms";
import { MemoizedComponent } from "../../../../components/MemoizedComponent";
import { useState, useReducer, useEffect, Children, cloneElement } from "react";

const ACTIONS = Object.freeze({ ADD: "ADD", REMOVE: "REMOVE" });

const ControlledComponent = ({ children, updateInputValue }: any) => {
  const [state, setState]: any = useState();
  const [component, setComponent]: any = useState();

  useEffect(() => {
    Children.toArray(children).map((child: any) => {
      setState(child.props.contentValue);
      setComponent(
        cloneElement(child, {
          ...state,
          onChange: (name: string, target: any, inputType: string) => {
            setState(target.value);
            updateInputValue(child.props.idx, target.value);
            child.props.onChange(name, target, inputType);
          },
        })
      );
    });
  }, []);

  useEffect(() => {
    console.log({ state });
  }, [state]);

  return Children.toArray(component).map((child: any) =>
    cloneElement(child, { ...child.props, contentValue: state })
  );
};

// TODO Check if is necessary use reducer to manage state of current provided state

export const MultiInput = ({
  name,
  onChange,
  updateData,
  inputType,
  nonOptionals,
  controlledValue,
  value,
  keyName,
  required = false,
}: {
  name: string;
  onChange: Function;
  data: any;
  updateData: Function;
  inputType: INPUT_TYPES;
  nonOptionals: Array<string>;
  controlledValue: any;
  value: any;
  keyName: string;
  required?: boolean;
}) => {
  const [inputValue, setInputValue] = useReducer(
    (state: any, { action, index, payload }: any) => {
      if (index >= 0 && !action) return { ...state, [index]: payload };
      if (index >= 0 && action === ACTIONS.ADD) {
        const listData = [...mapToList(state)];
        listData.splice(index + 1, 0, payload);
        return { ...listToMap(listData) };
      }
      if (index >= 0 && action === ACTIONS.REMOVE) {
        const listData = [...mapToList(state)];
        listData.splice(index, 1);
        return { ...listToMap(listData) };
      }
      return state;
    },
    listToMap(controlledValue)
  );

  useEffect(() => {
    updateData(name, [...mapToList(inputValue)]);
  }, [inputValue]);

  const updateInputValue = (index: any, state: any) =>
    setInputValue({ index, payload: state });

  useEffect(() => {});

  const inputs: any = {};
  // console.log({ controlledValue });

  mapToList(inputValue).forEach((contentValue: any, index: any) => {
    inputs[index] = (
      <MemoizedComponent
        {...{
          key: index,
          deps: [contentValue],
        }}
      >
        <InputContainer>
          {inputType === INPUT_TYPES.PARAGRAPH ? (
            <ParagraphInput
              {...{
                idx: index,
                text: contentValue,
                onChange: (name: string, target: any, inputType: string) => {
                  updateInputValue(index, target.value);
                  onChange(name, target, [inputType]);
                },
                placeholder: beutifyLabel(labelCases(name).CS),
                name,
                showLabel: false,
              }}
            />
          ) : null}
          {inputType === INPUT_TYPES.DATE ? (
            <DateInput
              {...{
                idx: index,
                keyName,
                value: contentValue,
                name,
                onChange: (name: string, target: any, inputType: string) => {
                  updateInputValue(index, new Date(target.value).getTime());
                  onChange(name, target, [inputType]);
                },
                nonOptionals,
              }}
            />
          ) : null}
          {inputType === INPUT_TYPES.SELECTION ? (
            <SelectionInput
              {...{
                idx: index,
                keyName,
                value: value[0],
                controlledValue: contentValue,
                name,
                onChange: (name: string, target: any, inputType: string) => {
                  updateInputValue(index, target.value);
                  onChange(name, target, [inputType]);
                },
              }}
            />
          ) : null}
          <ButtonsSection>
            <DeleteButton
              className="fa-solid fa-trash mini"
              type="button"
              onClick={(e: any) => {
                e.preventDefault();
                setInputValue({ index, action: ACTIONS.REMOVE });
              }}
            />
            <AddButton
              className="fa-solid fa-plus mini"
              type="button"
              onClick={(e: any) => {
                e.preventDefault();
                let payload: any = "";
                if (inputType === INPUT_TYPES.DATE)
                  payload = new Date().getTime();
                if (inputType === INPUT_TYPES.SELECTION)
                  payload = value[0];
                setInputValue({
                  index,
                  action: ACTIONS.ADD,
                  payload,
                });
              }}
            />
          </ButtonsSection>
        </InputContainer>
      </MemoizedComponent>
    );
  });
  return (
    <>
      {required && <InputHelper>*</InputHelper>}
      <MultiInputContainer>
        {mapToList(inputs)}
        <label className="label">{beutifyLabel(name)}</label>
        {Mapfy(inputs).size === 0 && (
          <AddButton
            className="fa-solid fa-plus mini"
            style={{ width: "100%" }}
            type="button"
            onClick={(e: any) => {
              e.preventDefault();
              let payload: any = "";
              if (inputType === INPUT_TYPES.DATE)
                payload = new Date().getTime();
              if (inputType === INPUT_TYPES.SELECTION)
                payload = controlledValue[0];
              setInputValue({
                index: 0,
                action: ACTIONS.ADD,
                payload,
              });
            }}
          />
        )}
      </MultiInputContainer>
    </>
  );
};