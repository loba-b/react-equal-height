# React Equal Height
Compares element heights and sets the highest (based on react-hooks)

## Installation
```
npm i react-equal-height
```

**WARNING**
>Version >= 1.0.0 has deep changes which making the configuration from the old version incompatible.

## Usage
```tsx
import React, { useContext } from 'react';
import { EqualHeight, EqualHeightElement } from 'react-equal-height';

const App = () => {
    return (
        <EqualHeight>
            <EqualHeightElement name="Name">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem.
                </p>
            </EqualHeightElement>
            <EqualHeightElement name="Name">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem.
                </p>
                <p>
                    tiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci.
                </p>
            </EqualHeightElement>
        </EqualHeight>
    )
}

export default App;
```
* **EqualHeight** - all elements for which height will be calculating must be included in this element
* **EqualHeightElement** - element for which will be calculating height
* **EqualHeightContext** - lib context

## Options (EqualHeight)
| Prop              | Default               | Required  | Description                                                   |
|-------------------|:---------------------:|:---------:|:--------------------------------------------------------------|
| `timeout`         | **200**               | **false** | delay for recalculate height on window resizing               |
| `animationSpeed`  | **0.25**<br>(second)  | **false** | animation speed for height changing <br /> (**0**: disable)   |

## Options (EqualHeightElement)
| Prop              | Default   | Required  | Description                                                    |
|------------------ |:---------:|:---------:|:---------------------------------------------------------------|
| ```name```        |           | **true**  | all heights of elements with the same name are comparing       |
| ```tag```         | **div**   | **false** | type of tag that wraps the elements                            |
| ```placeholder``` | **false** | **false** | to keeping height in place where element not exist             |
| ```disable```     | **false** | **false** | disables ```EqualHeightElement``` (children are still passing) |

## Methods (forceUpdate)
`forceUpdate, setForceUpdate` - force to recalculate heights for components

> Example for recalculate after image loaded

##### by EqualHeightContext (Context)
```tsx
import React, { useContext } from 'react';
import { EqualHeight, EqualHeightContext, EqualHeightElement } from 'react-equal-height';

const LoadImage = () => {
    const { setForceUpdate } = useContext(EqualHeightContext);

    const handleImage = () => (
        setForceUpdate((value: boolean) => !value)
    );

    return (
        <img src="https://via.placeholder.com/250x250" onLoad={handleImage} alt="" />
    );
};

const App = () => {
    return (
        <EqualHeight>
            <EqualHeightElement name="Name">
                <LoadImage />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem.
                </p>
            </EqualHeightElement>
            <EqualHeightElement name="Name">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem.
                </p>
                <p>
                    tiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci.
                </p>
            </EqualHeightElement>
        </EqualHeight>
    )
}

export default App;
```

##### by EqualHeightConsumer (Context.Provider)
```tsx
import React from 'react';
import { EqualHeight, EqualHeightConsumer, EqualHeightElement } from 'react-equal-height';

const App = () => {
    return (
        <EqualHeight>
            <EqualHeightElement name="Name">
                <p>
                    <EqualHeightConsumer>
                        {context => (
                            <img src="https://via.placeholder.com/500x500" onLoad={() => (context.setForceUpdate(value => !value))} alt="" />
                        )}
                    </EqualHeightConsumer>
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem.
                </p>
            </EqualHeightElement>
            <EqualHeightElement name="Name">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem.
                </p>
                <p>
                    tiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci.
                </p>
            </EqualHeightElement>
        </EqualHeight>
    )
}

export default App;
```

# Image examples
Base 

![Base example](doc/base.gif)

Placeholder

![Placeholder example](doc/placeholder.gif)

Disable

![Disable example](doc/disable.gif)

# Scripts (package.json)
| Prop          | Description                                       |
|---------------|:--------------------------------------------------|
| ```build```   | building production version                       |
| ```watch```   | building production version with watching changes |
| ```server```  | local server for manual test                      |

# TODO
* Tests
