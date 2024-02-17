import { MultiInputContainer, InputContainer } from "./styles";
import { AddButton, DeleteButton, ButtonsSection } from "../../styles";
import { beutifyLabel, labelCases } from "../../../../../utils";

export const MultiInput = ({
  value,
  name,
  onChange,
  index,
  attributes,
  setAttributes,
  schema,
  setSchema,
}: any) => {
  const inputs: any = [];
  value.forEach((text: any, i: any) =>
    inputs.push(
      <InputContainer key={i}>
        <textarea
          name={i}
          value={text}
          onChange={(e) => onChange(name, value, e.target)}
          placeholder={beutifyLabel(labelCases(name).CS)}
        />
        <label className="label">{beutifyLabel(name)}</label>
        <ButtonsSection>
          <DeleteButton
            className="fa-solid fa-trash mini"
            type="button"
            onClick={(e: any) => {
              e.preventDefault();
              const list = [...attributes[index][name]];
              list.splice(i, 1);
              setAttributes({
                ...attributes,
                [index]: {
                  ...attributes[index],
                  [name]: [...list],
                },
              });
              setSchema({
                ...schema,
                [index]: {
                  ...schema[index],
                  [name]: [...list],
                },
              });
            }}
          />
          <AddButton
            className="fa-solid fa-plus mini"
            type="button"
            onClick={(e: any) => {
              e.preventDefault();
              const list = [...attributes[index][name]];
              list.splice(i + 1, 0, "");
              setAttributes({
                ...attributes,
                [index]: {
                  ...attributes[index],
                  [name]: [...list],
                },
              });
            }}
          />
        </ButtonsSection>
      </InputContainer>
    )
  );
  return (
    <MultiInputContainer>
      {inputs}
      <label className="label">{beutifyLabel(name)}</label>
      {inputs.length === 0 && (
        <AddButton
          className="fa-solid fa-plus mini"
          style={{ width: "100%" }}
          type="button"
          onClick={(e: any) => {
            e.preventDefault();
            const list = [...attributes[index][name]];
            list.push("");
            setAttributes({
              ...attributes,
              [index]: {
                ...attributes[index],
                [name]: [...list],
              },
            });
          }}
        />
      )}
    </MultiInputContainer>
  );
};
