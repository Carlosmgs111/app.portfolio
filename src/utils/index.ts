import { cloneElement } from "react";
import { plural, singular } from "pluralize";

/* passing a object with all properties to convert to css format */
export const formatToCss = (objFormat = {}, important = false) => {
  if (typeof objFormat == "object") {
    const s = (objFormat: any) => {
      var s = "/* start props */";
      objFormat.forEach(
        (value: any, key: any) =>
          (s += `\n${key} : ${value} ${important && "!important"};`)
      );
      return s;
    };
    return `
   ${s(new Map(Object.entries(objFormat)))}
`;
  }
};

export const beutifyLabel = (label: any) => {
  if (!label) return "";
  label = label.replace(/\w\S*/g, (w: any) =>
    w.replace(/^\w/, (c: any) => c.toUpperCase())
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
  return label;
};

/**
 * @LP Lower Case Plural (LowerPlural)
 * @LS Lower Case Singular (LowerSingle)
 * @CP Camel Case Plural (CamelPlural)
 * @CS Camel Case Singular (CamelSingle)
 * @UP Upper Case Plural (UpperPlural)
 * @US Upper Case Singular (UpperSingle)
 */
export const labelCases = (label: string, normal: boolean = true) => {
  if (!label) return "";
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

export const normalize = (str: any) => {
  if (!str) return "";
  const from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÇç",
    to = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuucc",
    mapping: any = {};

  for (var i = 0, j: any = from.length; i < j; i++)
    mapping[from.charAt(i)] = to.charAt(i);

  var ret = [];
  for (var i = 0, j = str.length; i < j; i++) {
    var c = str.charAt(i);
    if (mapping.hasOwnProperty(str.charAt(i))) ret.push(mapping[c]);
    else ret.push(c);
  }
  return ret.join("");
};

export const capitalize = (label: any, pluralize: boolean = false) => {
  if (!label) return "";
  return (
    label[0].toUpperCase() +
    label.slice(1).toLowerCase() +
    (pluralize ? "s" : "")
  );
};

export const genRandomId = () => {
  return Number(String(Math.random()).replace("0.", ""));
};

export const getOffset = (element: HTMLElement) => {
  var _x = 0;
  var _y = 0;
  var _vw = 0;
  var _vh = 0;

  while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
    _x += element.offsetLeft - element.scrollLeft;
    _y += element.offsetTop - element.scrollTop;
    _vw = (_x * 100) / innerWidth;
    _vh = (_y * 100) / innerHeight;
    // element = element.offsetParent;
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
export const pairKV = (
  object: object,
  depth: number = 0,
  get?: any,
  index: any = 0
) => {
  var key = "";
  var value: any = "";
  var error = undefined;

  if (typeof depth === "string") {
    if (get) index = get;
    get = depth;
  }

  try {
    [key, value] = Object.entries(object)[index];
    if (value instanceof Object && typeof depth === "number" && depth !== 0) {
      depth -= 1;
      if (!get) [key, value, error] = <any>pairKV(value, depth);
      if (get === PAIRKV.K) key = <any>pairKV(value, depth, get);
      if (get === PAIRKV.V) value = <any>pairKV(value, depth, get);
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

export const Mapfy = (object: any) => new Map(Object.entries(object));

export const UnMapfy = (map: any) => Object.fromEntries(map.entries());

/**
 * It takes an array of React elements and injects the same attributes to all of them
 * @param items - an array of React elements
 * @param [attrs] - The attributes you want to inject into the React elements.
 */
export const injectAttrsToReactElements = (items: any, attrs = {}) =>
  items.map((item: any, index: any) => cloneElement(item, { ...attrs, index }));

export const settingName = (value: any) =>
  "set" + value.slice(0, 1).toUpperCase() + value.slice(1);

export const getActionTypes = (object: any) => {
  const actionTypes: any = {};
  for (var key of object.keys()) {
    actionTypes[settingName(key)] = settingName(key);
  }
  actionTypes["reset"] = "reset";
  return actionTypes;
};

export const setActions = (actions: Array<string>, entity?: object) => {
  actions = [...actions, "reset"];
  const mapfied = entity ? getActionTypes(Mapfy(entity)) : {};
  const types: any = {};
  actions.forEach((action: string) => (types[action] = action));
  return Object.freeze({ ...types, ...mapfied });
};

export const PAIRKV: any = setActions(["K", "V"]);

export const filterAttrs = (
  obj: any,
  toRemove: string,
  oclusive: boolean = true
) => {
  const newObj: any = {};
  for (var attr in obj) {
    if (!oclusive === toRemove.includes(attr)) {
      newObj[attr] = obj[attr];
    }
  }
  return newObj;
};

export const logg = (
  payload: any,
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
export const extractEntities = (data: any, entityLabel: string) => {
  let entities: any = [];

  const filterEntities = (data: any, entityLabel: string) => {
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
  const setObj: any = new Set();
  const newEntities = entities.reduce((acc: any, value: any) => {
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

export const manyfy = (element: any, factor = 6) => {
  const many = [];
  if (!element) {
    throw new Error("Element does't provided");
  }
  for (var i = 0; i < factor; i++) {
    many.push(element);
  }
  return many;
};

export const createEnumFromArray = (array: Array<any>) =>
  Object.freeze(Object.fromEntries(array.map((item: any) => [item, item])));

export const runButtonBehavior = (e: any, behaviors: any) => {
  const { class: className, name, title, id } = e.target;
  const buttonId = name || title || id || className;
  behaviors[buttonId](e);
};

export const getSetFunctions = (
  dispatch: Function,
  actionTypes: Array<string>
) => {
  let setFunctions = {};
  for (let actionType in actionTypes) {
    setFunctions = {
      ...setFunctions,
      ["set" + actionType.replace(actionType[0], actionType[0].toUpperCase())]:
        (data: any) => dispatch({ [data]: data }),
    };
  }
  return setFunctions;
};

export const getGetFunctions = (state: any) => {
  let getFunctions = {};
  for (let s in state) {
    getFunctions = {
      ...getFunctions,
      ["get" + s.replace(s[0], s[0].toUpperCase())]:
        () => {
          const value = state[s];
          return value;
        },
    };
  }
  return getFunctions;
};

export const getSizesDisposition = (i: any) => {
  i -= 1;
  let sizes: any = [];
  const reverte = !false;
  const sqNum = Number(String(Math.sqrt(i)).split(".")[0]) + 1;
  const w = (100 / sqNum) * 2;
  const s = 100 / sqNum;
  const wide = [s, w];
  const square = [s, s];
  let qWides = sqNum * sqNum - i - 1;
  let qSquares = i + 1 - qWides;
  if (i + 1 === 5)
    return [square, wide, wide, wide, wide].map((set, idx) =>
      reverte
        ? idx > 1
          ? set
          : [...set].reverse()
        : idx > 1
        ? [...set].reverse()
        : set
    );
  for (let j = 0; j < sqNum; j++) {
    sizes[j] = [];
    let t = 0;
    for (let k = 0; k < sqNum; k++) {
      if (Math.round(t) === 100) break;
      if (qWides > 0 && Math.round(t) + w <= 100) {
        sizes[j][k] = reverte ? [...wide].reverse() : wide;
        t += w;
        qWides -= 1;
      } else if (qSquares > 0) {
        t += s;
        qSquares -= 1;
        sizes[j][k] = square;
      }
    }
    sizes[j] = sizes[j].sort(() => Math.random() - 0.5);
  }
  sizes = sizes.sort(() => Math.random() - 0.5);
  sizes = sizes.flat();
  return sizes;
};

export const mapToList = (data: any): any =>
  Object.entries({ ...data }).map((data) => data[1]);

export const listToMap = (data: any): any =>
  Object.fromEntries([...data].map((data: any, index: any) => [index, data]));

export const arrayJoin = (
  array: any = [],
  joiner: string = " "
): string | undefined => {
  if (!array[0]) return;
  let stringArray = array.filter(
    (value: any) => typeof value === "string" || typeof value === "number"
  );
  const arrayArray = array.filter((value: any) => Array.isArray(value));

  for (let arr of arrayArray) {
    stringArray = [...stringArray, arrayJoin(arr[0], arr[1])];
  }
  const joinedString = stringArray.join(joiner);
  return joinedString;
};

export const isPrimitiveValue = (value: any): boolean => {
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint" ||
    typeof value === "symbol" ||
    typeof value === "undefined"
    // || typeof value === "object"
  ) {
    return true;
  }
  if (value === null) {
    return true;
  }
  if (value?.$$typeof) return false;
  return false;
};
export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};