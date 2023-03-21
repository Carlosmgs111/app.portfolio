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

There are two ways to obtain and manage the status of the inputs, the first is by declaring a callback that receives an object as a parameter that will contain four attributes:

- `setError`: A function that changes the internal state of `DefineSchema` to denote an error in data processing, its use is **optional**.
- `setLoading`: A function that changes the internal state of `DefineSchema` to denote that data is being processed, its use is **optional**.
- `data`: Is an array that contains the set of declared entries, so you have to index them according to the order of declaration. 
- `reset`: A function that clears the state of all input sets, its use is **recomended**
  
***Note**: `data` will be changed in the future to return an object with a unique index, whether provided or generated automatically and dynamically by the `DefineSchema` component.*

```jsx
  const updatedHOC = ({ setError, setLoading, data, reset }) => {
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
      title: ...,
      baseSchema: {
       ...
      },
      onClickHandler: updateHOC,
    }}
  />
```

The second option is similar to the first, except that we will not pass the callback that we have declared directly to the component, but first we will pass it to a utility function that returns `DefineSchema` and calls `getHOCAndTrigger`.

```jsx


```

And we pass our callback as a parameter to `getHOCAndTrigger`, this will return functions, the first will be passed to the `DefineSchema` component as a `highOrderCallback` parameter and the second will be the trigger that will execute the callback that we initially declared, this will allow us to execute said callback from anywhere in our parent component.