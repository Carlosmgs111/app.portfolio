import { beutifyLabel, Mapfy } from "../../../utils";
import {
  CommonInput,
  SelectionInput,
  RangeInput,
  MultiInput,
  EitherInput,
} from "./inputs";
import { List, FormStyle, DeleteButton, ExpandButton } from "./styles";
import { useEffect } from "react";
import { useSwitch } from "../../../hooks/useSwitch";

export function InputForm({
  index,
  schema,
  setSchema,
  attributes,
  setAttributes,
  fixed = false,
  nonOptionals = [],
}) {
  const [isExpanded, switchIsExpanded] = useSwitch(true, false);

  const settingAttributes = () => {
    const _attributes = {};
    for (var non in nonOptionals) {
      const nonOp = nonOptionals[non]
        .replace("{", "")
        .replace("~", "")
        .replace("<", "");
      _attributes[nonOp] = attributes[index][nonOp];
    }
    return _attributes;
  };

  useEffect(() => {
    setSchema({
      ...schema,
      [index]: { ...settingAttributes() },
    });
  }, []);

  const isControlledValue = (value) => {
    return (
      Mapfy(attributes[index]).get(value + "{") ||
      Mapfy(attributes[index]).get(value + "~") ||
      Mapfy(attributes[index]).get(value + "<")
    );
  };

  const onChange = (currentName, currentValue, target) => {
    let { name, value } = target;
    let controllerName = null;
    let controllerValue = null;
    if (
      Array.isArray(currentValue) &&
      !currentName.includes("~") &&
      !currentName.includes("{") &&
      !currentName.includes("<")
    ) {
      const list = [...attributes[index][currentName]];
      list[name] = value;
      value = [...list];
    }

    if (typeof currentValue === "string" && currentName.includes("~")) {
      value = Boolean(value) ? value : new Date().toISOString().slice(0, 10);
      controllerName = currentName;
      currentName = currentName.replace("~", "");
      controllerValue = value;
      value = Number(new Date(value).getTime());
    }
    if (Array.isArray(currentValue) && currentName.includes("{")) {
      currentName = currentName.replace("{", "");
    }
    if (Array.isArray(currentValue) && currentName.includes("<")) {
      currentName = currentName.replace("<", "");
      value = Number(value);
    }
    if (typeof currentValue === "number") {
      value = Number(value);
    }
    if (typeof currentValue === "boolean") {
      value = value === "true" ? true : false;
    }

    setAttributes({
      ...attributes,
      [index]: {
        ...attributes[index],
        ...{ [controllerName || currentName]: controllerValue || value },
      },
    });
    setSchema({
      ...schema,
      [index]: {
        ...schema[index],
        [currentName]: value,
      },
    });
  };

  const Form = (attribute, onChange) => {
    const [name, value] = attribute;
    const keyName = `${index}-${name}`;
    const isControlled = isControlledValue(name);
    return isControlled ? null : (
      <FormStyle className={isExpanded}>
        {(() => {
          if (typeof value === "string" || typeof value === "number")
            return (
              <CommonInput
                {...{ keyName, value, name, onChange, nonOptionals }}
              />
            );
          /*  */
          if (Array.isArray(value) && name.includes("{"))
            return (
              <SelectionInput
                {...{
                  keyName,
                  value,
                  name,
                  onChange,
                  nonOptionals,
                  attributes,
                }}
              />
            );
          /*  */
          if (Array.isArray(value) && name.includes("<")) {
            return (
              <RangeInput
                {...{
                  keyName,
                  value,
                  name,
                  onChange,
                  nonOptionals,
                  attributes,
                }}
              />
            );
          }
          /*  */
          if (Array.isArray(value)) {
            return (
              <MultiInput
                {...{
                  value,
                  name,
                  onChange,
                  index,
                  attributes,
                  setAttributes,
                  schema,
                  setSchema,
                }}
              />
            );
          }
          /*  */
          if (typeof value === "boolean")
            return (
              <EitherInput
                {...{
                  keyName,
                  value,
                  name,
                  onChange,
                }}
              />
            );
        })()}
        {/*  */}
        {nonOptionals.includes(name) ? (
          <label className="label">{beutifyLabel(name)}</label>
        ) : (
          <label>
            <input
              style={{ width: "fit-content", visibility: "hidden" }}
              className={name}
              onClick={(e) => {
                Array(document.getElementsByName(keyName)[0]).forEach(
                  (input) => {
                    if (!e.target.checked) {
                      delete schema[index][input.name.replace(`${index}-`, "")];
                      setSchema({ ...schema });
                    } else {
                      setSchema({
                        ...schema,
                        [index]: {
                          ...schema[index],
                          [name]:
                            input.type === "number"
                              ? Number(input.value)
                              : input.type === "radio"
                              ? input.checked
                                ? input.value === "true"
                                  ? true
                                  : false
                                : true
                              : input.value,
                        },
                      });
                    }
                  }
                );
              }}
              type="checkbox"
              id={keyName}
              onChange={() => {
                document.getElementsByName(keyName).forEach((input) => {
                  input.disabled = !input.disabled;
                });
              }}
            />
            {beutifyLabel(name)}
          </label>
        )}
      </FormStyle>
    );
  };

  return (
    <List>
      {Object.entries(attributes[index]).map((attribute, index) => {
        if (index < nonOptionals.length + 1)
          return <li key={index}> {Form(attribute, onChange)}</li>;
        return (
          <li
            key={index}
            hidden={
              isExpanded && index > nonOptionals.length + 1 ? true : false
            }
          >
            {Form(attribute, onChange)}
          </li>
        );
      })}
      {Object.entries(attributes).length > 1 && !fixed ? (
        <DeleteButton
          className="fa-solid fa-trash main"
          type="button"
          onClick={() => {
            delete attributes[index];
            setAttributes({ ...attributes });
            delete schema[index];
            setSchema({ ...schema });
          }}
        />
      ) : null}
      {Object.entries(attributes[index]).length > 2 ? (
        <ExpandButton
          type="button"
          className={`fas fa-chevron-${isExpanded ? "down" : "up"} p-2 item`}
          onClick={switchIsExpanded}
        />
      ) : null}
    </List>
  );
}
