import { beutifyLabel, Mapfy } from "../../../utils";
import {
  List,
  FormStyle,
  LeftSide,
  RightSide,
  DeleteButton,
  ExpandButton,
  AddButton,
  MultiInputContainer,
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
      const nonOp = nonOptionals[non].replace("{", "").replace("~", "");
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
      Mapfy(attributes[index]).get(value + "~")
    );
  };

  const onChange = (currentName, currentValue, target) => {
    let { name, value } = target;
    let controllerName = null;
    let controllerValue = null;
    if (
      Array.isArray(currentValue) &&
      !currentName.includes("~") &&
      !currentName.includes("{")
    ) {
      const list = [...attributes[index][currentName]];
      list[name] = value;
      value = [...list];
    }

    if (typeof currentValue === "string" && currentName.includes("~")) {
      controllerName = currentName;
      currentName = currentName.replace("~", "");
      controllerValue = value;
      value = Number(new Date(value).getTime());
    }
    if (Array.isArray(currentValue) && currentName.includes("{")) {
      currentName = currentName.replace("{", "");
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
        <LeftSide>
          {nonOptionals.includes(name) ? (
            <label style={{ width: "fit-content" }}>
              {beutifyLabel(name)} :
            </label>
          ) : (
            <label>
              <input
                style={{ marginRight: "1rem", visibility: "hidden" }}
                className={name}
                onClick={(e) => {
                  Array(document.getElementsByName(keyName)[0]).forEach(
                    (input) => {
                      if (!e.target.checked) {
                        delete schema[index][
                          input.name.replace(`${index}-`, "")
                        ];
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
              {beutifyLabel(name)} :
            </label>
          )}
        </LeftSide>
        <RightSide>
          {(() => {
            if (typeof value === "string" || typeof value === "number")
              return (
                <input
                  style={{ minWidth: "24rem" }}
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
                />
              );
            if (Array.isArray(value) && name.includes("{"))
              return (
                <>
                  <select
                    style={{ width: "90%", borderRadius: ".5rem" }}
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
                  {/* <input type="text" value="" disabled /> */}
                </>
              );
            if (Array.isArray(value)) {
              const inputs = [];
              value.forEach((text, i) =>
                inputs.push(
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <textarea
                      style={{ width: "90%", borderRadius: "0.4rem" }}
                      name={i}
                      value={text}
                      onChange={(e) => onChange(name, value, e.target)}
                    />
                    <DeleteButton
                      style={{ padding: "0 0.8rem", height: "fit-content" }}
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
                    >
                      -
                    </DeleteButton>
                  </div>
                )
              );
              return (
                <MultiInputContainer>
                  {inputs}
                  <AddButton
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
                  >
                    +
                  </AddButton>
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
        </RightSide>
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
