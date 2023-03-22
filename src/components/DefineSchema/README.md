# DefineSchema component

The `DefineSchema` component abstracts the definition and implementation of input type components that may be needed by a superior component, without necessarily defining them one by one within the code, it is only necessary to declare DefineSchema within the component that requires said inputs, and it will be able to access the state handled within DefineSchema, that is, the state of the different declared inputs.

[Screenshot_1][displayed example]

For example, if you need to create a form that requires multiple inputs, let's say input types text, checks, textarea among others, and that these are more than 5, the declaration and handling of the state of these would be somewhat complex to manage, so it would be It is preferable to delegate them to another component that is in charge of it, and we only take care of obtaining the status of said entries for our main component.

```jsx
  import { DefineSchema, getHOCAndTrigger } from "DefineSchema"
```

```jsx
  <DefineSchema
    {...{
      title: `Update ${title}`,
      baseSchema: {
        title,
        emitedBy,
        // ? `{` symbol used for mark a select object controller
        "emitedBy{": institutions.map((i) => i.name),
        emitedAt: new Date(emitedAt).getTime(),
        // ? `~` symbol used for mark a date object controller
        "emitedAt~": new Date(emitedAt).toISOString().slice(0, 10),
        image,
        tags,
        url,
      },
      nonOptionals: ["title", "emitedAt~", "image", "url", "emitedBy{"],
      onClickHandler,
      highOrderCallback,
      buttons: [],
    }}
  ></DefineSchema>
```

## Implementing

`DefineSchema` receives an object as `baseSchema` parameter, and within this object the data to be controlled must be specified, depending on the type of data, it will be assigned a different input, in addition there are special inputs that are called `controlled` to which are assigned a value called `controller` and are characterized by having the same name as the `controlled` attribute plus a special character at the end denoting a specific type of input.

```jsx
  let age = 30
  let name = "Carlos"
  let birthday = "1993-01-11"
  let status = "";

  <DefineSchema
    {...{
      baseSchema:{
        age,
        name,
        birthday,
        status,
        "birthday~": new Date(birthday).toISOString().slice(0, 10),
        "status{": ["active", "busy", "available"]
      }, 
    }}
  >
  </DefineSchema>
```

Note that the last two values that we declare, `birthday` and `status`, would be the `controlled` ones since in the `baseSchema` object there are two more values that each match their names and that have a special character at the end, `birthday~` and `status{`, the former denoting an input of type `date` and the latter an input of type `select`.

Available controllers inputs:

- `{`: Array of options.
- `~`: Date input.
- `<`: Input of type range

***Note**: This will change to opt for a more declarative approach, where `baseSchema` will be an array of objects or directly an object, where the type of input to be implemented is directly selected, in addition to declaring extra options if required.*

## Using 

There are two ways to obtain and manage the status of the inputs, the first is by declaring a callback that receives an object as a parameter that will contain four attributes:

- `data`: Is an array that contains the set of declared entries, so you have to index them according to the order of declaration. 
- `reset`: A function that clears the state of all input sets, its use is **recomended**
- `setError`: A function that changes the internal state of `DefineSchema` to denote an error in data processing, its use is **optional**.
- `setLoading`: A function that changes the internal state of `DefineSchema` to denote that data is being processed, its use is **optional**.
  
***Note**: `data` will be changed in the future to return an object with a unique index, whether provided or generated automatically and dynamically by the `DefineSchema` component.*

```jsx
  const updatedCallback = ({ data, setLoading, setError, reset }) => {
    setLoading(true);
    try {
      // Process `data` here
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    } finally {
      reset();
    }
  };
```

And pass this callback as the `onClickHandler` parameter to the DefineSchema component.

```jsx
  <DefineSchema
    {...{
      baseSchema: {
       ...
      },
      onClickHandler: updatedCallback,
    }}
  />
```

The second option is similar to the first, except that we won't pass the callback we've declared directly to the component, but will first pass it to a utility function that returns the `DefineSchema` module called `getHOCAndTrigger`.

```jsx
  const [updateHOC, hocTrigger] = getHOCAndTrigger(updateCallback);

```

And we pass our callback as a parameter to `getHOCAndTrigger`, this will return functions, the first, called `updateHOC` will be passed to the `DefineSchema` component as a `highOrderCallback` parameter and the second, called `hocTrigger` will be the trigger that will execute the callback that we initially declared, this will allow us to execute said callback from anywhere in our parent component.

```jsx
  <DefineSchema
    {...{
      baseSchema: {
       ...
      },
      highOrderCallback: updateHOC,
    }}
  />

  <button onClick={ hocTrigger }> Trigger </button>
```

The difference between the two methods is that in the first we can only trigger the callback using the button provided by the `DefineSchema` component itself, while the second allows us to obtain the trigger that executes the callback and use it anywhere within the component that is implementing `DefineSchema`.