import { beutifyLabel, labelCases, Mapfy } from "../../../utils";
import {
  List,
  FormStyle,
  ButtonsSection,
  DeleteButton,
  AddButton,
  ExpandButton,
  MultiInputContainer,
  InputContainer,
} from "./styles";
import { useEffect } from "react";
import { useSwitch } from "../../../hooks/useSwitch";

// * '{' mark an array value as controller of value with same name but without te symbol '{'
// * e.g. enums := controlled value, enums{ := controller
// * '~' mark a date input html node as controller of of value with same name but without te symbol '~'
// * e.g. expiration := controlled value, expiration~ := controller

export function DefineAttribute({
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
              <input
                type={
                  name.includes("~")
                    ? "date"
                    : typeof value === "string"
                    ? "text"
                    : "number"
                }
                name={keyName}
                value={value}
                onChange={(e) => onChange(name, value, e.target)}
                disabled={!nonOptionals.includes(name)}
                placeholder={beutifyLabel(name)}
              />
            );
          if (Array.isArray(value) && name.includes("{"))
            return (
              <select
                name={keyName}
                defaultValue={value.find(
                  (v) =>
                    v ===
                    Object.entries(attributes)[0][1][name.replace("{", "")]
                )}
                disabled={!nonOptionals.includes(name)}
                onChange={(e) => onChange(name, value, e.target)}
              >
                {value.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            );
          if (Array.isArray(value) && name.includes("<")) {
            const [min, max, step] = value[0];
            return (
              <>
                <input
                  style={{ padding: 0 }}
                  type="range"
                  id={name}
                  min={min}
                  max={max}
                  name={keyName}
                  defaultValue={
                    Object.entries(attributes)[0][1][name.replace("<", "")]
                  }
                  // value={value}
                  onChange={(e) => onChange(name, value, e.target)}
                  disabled={!nonOptionals.includes(name)}
                  placeholder={beutifyLabel(name)}
                  step={step}
                ></input>
                <label htmlFor={name} className="label">
                  {beutifyLabel(name)} :{" "}
                  {Object.entries(attributes)[0][1][name.replace("<", "")]}
                </label>
              </>
            );
          }
          if (Array.isArray(value)) {
            const inputs = [];
            value.forEach((text, i) =>
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
                      className="fa-solid fa-trash"
                      onClick={(e) => {
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
                      className="fa-solid fa-plus"
                      onClick={(e) => {
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
                    className="fa-solid fa-plus"
                    style={{ width: "100%" }}
                    onClick={(e) => {
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
          }
          if (typeof value === "boolean")
            return (
              <>
                <label>
                  false
                  <input
                    name={keyName}
                    type="radio"
                    disabled={true}
                    value={false}
                    checked={String(value) === "false"}
                    onChange={(e) => onChange(name, value, e.target)}
                  />
                </label>
                <label>
                  true
                  <input
                    name={keyName}
                    type="radio"
                    disabled={true}
                    value={true}
                    checked={String(value) === "true"}
                    onChange={(e) => onChange(name, value, e.target)}
                  />
                </label>
              </>
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
          type="button"
          onClick={() => {
            delete attributes[index];
            setAttributes({ ...attributes });
            delete schema[index];
            setSchema({ ...schema });
          }}
        >
          Delete
        </DeleteButton>
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
