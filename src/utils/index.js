import { keyframes } from "styled-components";
import { cloneElement } from "react";
import { plural, singular } from "pluralize";

/* passing a object with all properties to convert to css format */
export const formatToCss = (objFormat) => {
  if (typeof objFormat == "object") {
    const s = (objFormat) => {
      var s = "/* start props */";
      objFormat.forEach((value, key) => (s += `\n${key} : ${value};`));
      return s;
    };
    return `
   ${s(new Map(Object.entries(objFormat)))}
`;
  }
};

export const beutifyLabel = (label) => {
  label = label.replace(/\w\S*/g, (w) =>
    w.replace(/^\w/, (c) => c.toUpperCase())
  );
  for (var i in label) {
    if (Number(i) !== label.length - 1) {
      if (
        label[i] !== " " &&
        label[i].toLowerCase() === label[i] &&
        label[Number(i) + 1].toUpperCase() === label[Number(i) + 1]
      ) {
        label =
          label.substring(0, Number(i) + 1) +
          " " +
          label.substring(Number(i) + 1, label.length);
      }
    }
  }
  label = label.replace("{", "");
  label = label.replace("~", "");
  return label;
};

export const capitalize = (label, pluralize = false) => {
  return (
    label[0].toUpperCase() +
    label.slice(1).toLowerCase() +
    (pluralize ? "s" : "")
  );
};

export const normalize = (str) => {
  const from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
    mapping = {};

  for (var i = 0, j = from.length; i < j; i++)
    mapping[from.charAt(i)] = to.charAt(i);

  var ret = [];
  for (var i = 0, j = str.length; i < j; i++) {
    var c = str.charAt(i);
    if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
    else ret.push(c);
  }
  return ret.join("");
};

/**
 * @LP Lower Case Plural (LowerPlural)
 * @LS Lower Case Singular (LowerSingle)
 * @CP Camel Case Plural (CamelPlural)
 * @CS Camel Case Singular (CamelSingle)
 * @UP Upper Case Plural (UpperPlural)
 * @US Upper Case Singular (UpperSingle)
 */
export const labelCases = (label, normal = true) => {
  label = normal ? normalize(label) : label;
  return Object.defineProperties(Object(String(label)), {
    LP: { value: plural(label.toLowerCase()), writable: false },
    LS: { value: singular(label.toLowerCase()), writable: false },
    CP: { value: plural(capitalize(label)), writable: false },
    CS: { value: singular(capitalize(label)), writable: false },
    UP: { value: plural(label).toUpperCase(), writable: false },
    US: { value: singular(label).toUpperCase(), writable: false },

    toString: { value: () => label },
  });
};

export const genRandomId = () => {
  return Number(String(Math.random()).replace("0.", ""));
};

export const getOffset = (element) => {
  var _x = 0;
  var _y = 0;
  var _vw = 0;
  var _vh = 0;

  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    _x += element.offsetLeft - element.scrollLeft;
    _y += element.offsetTop - element.scrollTop;
    _vw = (_x * 100) / innerWidth;
    _vh = (_y * 100) / innerHeight;
    element = element.offsetParent;
  }

  return [_vw, _vh];
};

/**
 * @function
 * @description Get key-value pair from an given object
 * @param {Object} object
 * @param {integer} depth
 * @param {string} get
 * @param {integer} index
 * @returns {string|Array} key || value || [key, value, error]
 */
export const pairKV = (object, depth = 0, get, index = 0) => {
  var key = "";
  var value = "";
  var error = undefined;

  if (typeof depth === "string") {
    if (get) index = get;
    get = depth;
  }

  try {
    [key, value] = Object.entries(object)[index];
    if (value instanceof Object && typeof depth === "number" && depth !== 0) {
      depth -= 1;
      if (!get) [key, value, error] = pairKV(value, depth);
      if (get === PAIRKV.K) key = pairKV(value, depth, get);
      if (get === PAIRKV.V) value = pairKV(value, depth, get);
    }
  } catch (e) {
    error = e;
  }

  return get === PAIRKV.K
    ? key
    : get === PAIRKV.V
    ? value
    : [key, value, error];
};

export const Mapfy = (object) => new Map(Object.entries(object));


/**
 * It takes an array of React elements and injects the same attributes to all of them
 * @param items - an array of React elements
 * @param [attrs] - The attributes you want to inject into the React elements.
 */
export const injectAttrsToReactElements = (items, attrs = {}) =>
  items.map((item, index) => cloneElement(item, { ...attrs }));

export const settingName = (value) =>
  "set" + value.slice(0, 1).toUpperCase() + value.slice(1);

export const getActionTypes = (object) => {
  const actionTypes = {};
  for (var key of object.keys()) {
    actionTypes[settingName(key)] = settingName(key);
  }
  actionTypes["reset"] = "reset";
  return actionTypes;
};

export const setActions = (actions, entity) => {
  actions = [...actions, "reset"];
  const mapfied = entity ? getActionTypes(Mapfy(entity)) : {};
  const types = {};
  actions.forEach((action) => (types[action] = action));
  return Object.freeze({ ...types, ...mapfied });
};

export const PAIRKV = setActions(["K", "V"]);

export const filterAttrs = (obj, toRemove, oclusive = true) => {
  const newObj = {};
  for (var attr in obj) {
    if (!oclusive === toRemove.includes(attr)) {
      newObj[attr] = obj[attr];
    }
  }
  return newObj;
};

export const logg = (
  payload,
  { color = "black", size = "12px", weight = "normal" },
  path = undefined
) => {
  console.log(
    `${path ? `${path}: ` : ""}%c${
      payload instanceof Object ? JSON.stringify(payload, null, 4) : payload
    }`,
    `
    color: ${color}; 
    font-size: ${size};
    font-weight: ${weight};
    `
  );
};

// ? scale for extract every data response getting from query ended at 'NotDirected'
// ? and be implemented as a *<adapter>
export const extractEntities = (data, entityLabel) => {
  let entities = [];

  const filterEntities = (data, entityLabel) => {
    for (var attr in data) {
      console.log(attr);
      if (attr !== entityLabel && data[attr] instanceof Array) {
        for (var attr2 in data[attr]) {
          filterEntities(data[attr][attr2], entityLabel);
        }
      }
      if (attr === entityLabel && data[attr] instanceof Array) {
        for (var attr2 in data[attr]) {
          if (!entities.includes(data[attr][attr2]))
            entities.push(data[attr][attr2]);
        }
      }
    }
  };
  filterEntities(data, entityLabel);
  // entities = [...new Set(entities)];
  const setObj = new Set();
  const newEntities = entities.reduce((acc, value) => {
    const key = JSON.stringify(value);
    if (!setObj.has(key)) {
      setObj.add(key, value);
      acc.push(value);
    }
    return acc;
  }, []);
  console.log({ newEntities });
  return newEntities;
};

export const manyfy = (element, factor = 6) => {
  if (element) {
    const many = [];
    for (var i = 0; i < factor; i++) {
      many.push(element);
    }
    return many;
  }
};

// ? keyframes declaration depending of passed props
export const setFrames = (frames, props) => {
  if (frames.length < 2)
    throw new Error("Must provide an array with at least two values");

  const basePercentage = 100 / (frames.length - 1);

  let literalKeyframe = ``;

  frames.map((frame, index) => {
    const rule = frame instanceof Function ? frame(props) : frame;
    const percentage = Number((basePercentage * index).toFixed(2));

    literalKeyframe += `
      ${percentage}% {
        ${rule}
      }
    `;
  });

  return keyframes`
    ${literalKeyframe}
  `;
};

export const createEnumFromArray = (array) =>
  Object.freeze(Object.fromEntries(array.map((item) => [item, item])));

export const runButtonBehavior = (e, behaviors) => {
  const { class: className, name, title, id } = e.target;
  const buttonId = name || title || id || className;
  behaviors[buttonId]();
};
