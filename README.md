# React Equal Height

Manages a dynamic collection of UI elements, enabling efficient tracking, updating, and synchronization of their maximum
heights. It supports operations like adding, removing, and updating elements within the collection. Additionally, the
application allows grouping elements by rows, making it ideal for complex interfaces where elements' sizes and positions
need to be consistently managed and adjusted in real-time.<br><br>
<b>Long story short:</b> Compares heights of elements and sets the highest.

## Installation

```
npm i react-equal-height
```

**What's new in version 2**
> New `equalRows` option. Checks other elements within the same row and sets the highest height value only for elements within that specific row.<br>

> New `<EqualHeightHolder>` component. A helper for the new `equalRows` option

**Migrate from version 1.x.x into 2.x.x**
> Minimal changes are required, primarily to props:
> * The `tag` prop has been replaced by `as` in `EqualHeightElement`
> * The `updateOnChange` prop now only accepts an array based on `DependencyList`
> * The class name `equal-height-JlocK` has been updated to `equal-height-wrapper`

## Library import

| Library                    | Size    | Description                                                                                                                                                                                                                                                                               |
|----------------------------|:--------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `react-equal-height`       | 16,9 kB | Library with <b>styles</b> that will be loaded startup to the `<style>` tag                                                                                                                                                                                                               |
| `react-equal-height/clean` | 12,9 kB | Library without <b>styles</b>. It can be useful for SSR or to remove overhead for script with loading styles<br /><br />Styles needs to be added:<ul><li>by itself (copy below styles to your project styles)</li><li><b>OR</b></li><li>by import `clean/main.css` from package</li></ul> |

#### Styles

````css
.equal-height-wrapper {
    display: block;
    overflow: hidden;
    transition-property: height
}
````
## Components

* **EqualHeight** - container holding all elements subject to height synchronization
* **EqualHeightHolder** - groups elements into rows to facilitate row-wise height alignment
* **EqualHeightElement** - represents each individual element whose height will be calculated
* **EqualHeightContext** - library context

## Automatic height recalculation triggers

* adding an element
* removing an element
* updating an element
* resizing the window or container
* dynamically moving elements

## Usage

```tsx
import React from 'react';
import { EqualHeight, EqualHeightElement } from 'react-equal-height';

const App = () => {
    return (
        <EqualHeight>
            <EqualHeightElement name="Name">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque
                    sed, lacinia in, mi. Cras vel lorem.
                </p>
            </EqualHeightElement>
            <EqualHeightElement name="Name">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque
                    sed, lacinia in, mi. Cras vel lorem.
                </p>
                <p>
                    tiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus.
                    Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui
                    id orci.
                </p>
            </EqualHeightElement>
        </EqualHeight>
    )
}

export default App;
```

## Props

### EqualHeight

| Prop             |       Default        | Required  |         Type          | Description                                                                                        |
|------------------|:--------------------:|:---------:|:---------------------:|:---------------------------------------------------------------------------------------------------|
| `id`             |                      | **false** |    string / number    | Unique identifier for the group of elements.                                                       |
| `timeout`        |       **200**        | **false** |        number         | time (in milliseconds) to recalculate heights                                                      |
| `animationSpeed` | **0.25**<br>(second) | **false** | number / string`s/ms` | time of animation for height change (in milliseconds) <br /> (**0**: disable)                      |
| `updateOnChange` |        **[]**        | **false** |       unknown[]       | it's a part of <b>useEffect</b> deps so in <b>updateOnChange</b> can be passed anything they allow |
| `equalRows`*     |      **false**       | **false** |   boolean / number    | enables grouping elements by rows and accepts a number as the alignment tolerance in pixels.       |
| `developerMode`  |      **false**       | **false** |   boolean / `DEEP`    | enables additional logging and warnings useful for development and debugging                       |

> The `equalRows` option checks if elements are aligned at the same height relative to the viewport, using the `getBoundingClientRect` method.
> By default, the height for each element is calculated from the `EqualHeightElement`. However, if an element is wrapped in an `EqualHeightHolder`,
> its height will instead be calculated from the `EqualHeightHolder`.
> 
> Keep in mind that if a single row contains a mix of elements with and without `EqualHeightHolder`,
> style differences might result in varying heights for elements in the same row.
> In such cases, I recommend consistent use of `EqualHeightHolder` across the entire group.
>
> Additionally, you can set a margin of error (in px) for `equalRows` to define an acceptable tolerance level.

### EqualHeightHolder

| Prop     | Default | Required  |  Type  | Description |
|----------|:-------:|:---------:|:------:|:------------|
| ```as``` | **div** | **false** | string | type of tag |

### EqualHeightElement

| Prop              |  Default  | Required  |  Type   | Description                                                    |
|-------------------|:---------:|:---------:|:-------:|:---------------------------------------------------------------|
| ```name```        |           | **true**  | string  | all heights of elements with the same name are comparing       |
| ```as```          |  **div**  | **false** | string  | type of tag that wraps the elements                            |
| ```placeholder``` | **false** | **false** | boolean | to keeping height in place where element not exist             |
| ```disable```     | **false** | **false** | boolean | disables ```EqualHeightElement``` (children are still passing) |

### Custom event (experimental)

| Event Name    | Payload                                                                                                                                          | Description                                                                                                                                           |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------|
| `EqualHeight` | <pre>{<br>  "id": string;<br>  "elements": Array<{<br>    "name": string;<br>    "height": number;<br>    "position": number;<br>  }><br>}</pre> | Dispatches when height recalculation occurs. `id` helps distinguish between groups of elements, and `elements` contains the maximum heights to align. |

## More usage example

### Basic example with EqualHeightHolder component

````tsx
import React from 'react';
import { EqualHeight, EqualHeightHolder, EqualHeightElement } from 'react-equal-height';

const App = () => {
    return (
        <EqualHeight>
            <EqualHeightHolder>
                <EqualHeightElement name="Base_1">
                    <h3>Base_1_1</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </EqualHeightElement>
            </EqualHeightHolder>
            <EqualHeightHolder>
                <EqualHeightElement name="Base_1">
                    <h3>Base_1_2</h3>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                </EqualHeightElement>
            </EqualHeightHolder>
        </EqualHeight>
    )
}

export default App;
````

### Update by 'dependencies change'

````tsx
import React from 'react';
import { EqualHeight, EqualHeightElement } from 'react-equal-height';

const App = () => {
    const [updateOnChange, setUpdateOnChange] = useState(false);

    return (
        <EqualHeight updateOnChange={ [updateOnChange] }>
            <EqualHeightElement name="Base_1">
                <h3>Base_1_1</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </EqualHeightElement>
            <EqualHeightElement name="Base_1">
                <h3>Base_1_2</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </EqualHeightElement>
        </EqualHeight>
    )
}

export default App;
````

### Update by 'dependencies change'

````tsx
import React from 'react';
import { EqualHeight, EqualHeightElement } from 'react-equal-height';

const App = () => {
    const [updateOnChange, setUpdateOnChange] = useState(false);

    return (
        <EqualHeight updateOnChange={ [updateOnChange] }>
            <EqualHeightElement name="Base_1">
                <h3>Base_1_1</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </EqualHeightElement>
            <EqualHeightElement name="Base_1">
                <h3>Base_1_2</h3>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </EqualHeightElement>
        </EqualHeight>
    )
}

export default App;
````

### Update by 'forceUpdate' method

```tsx
import React, { useContext } from 'react';
import { EqualHeight, EqualHeightContext, EqualHeightElement, useEqualHeightContext } from 'react-equal-height';

const ComponentWithContext = () => {
    const context = useEqualHeightContext();

    return (
        <button onClick={ context?.forceUpdate }>
            Force update
        </button>
    );
};

const App = () => {
    return (
        <EqualHeight>
            <ComponentWithContext/>
            <EqualHeightElement name="Name">
                <LoadImage/>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque
                    sed, lacinia in, mi. Cras vel lorem.
                </p>
            </EqualHeightElement>
            <EqualHeightElement name="Name">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque
                    sed, lacinia in, mi. Cras vel lorem.
                </p>
                <p>
                    tiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus.
                    Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui
                    id orci.
                </p>
            </EqualHeightElement>
        </EqualHeight>
    )
}

export default App;
```

## Image examples

### Basic
> All elements in the same group are equal

![Basic example](doc/base.gif)

### Basic
`equalRows: true`
> All elements in the same group and same row are equal

![Basic2 example](doc/base--rows.gif)

### Placeholder
`equalRows: true`
> All elements in the same group and same row are equal, also element marked as `placeholder`

![Placeholder example](doc/placeholder--rows.gif)

### Disable
`equalRows: true`
> All elements in the same group and same row are equal, except element marked as `disable`

![Disable example](doc/disable--rows.gif)

### Holder
`equalRows: true` and `EqualHeightHolder` component used
> All elements in the same group and row are equal. Thanks to the EqualHeightHolder, we were able to treat `Base_2_1`, `Base_1_1`, and `Base_1_2` as elements in the same row.

![Holder example](doc/holder--rows.gif)
