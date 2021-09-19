# React Equal Height
Compares element heights and sets the highest (based on react-hooks)

## Installation
```
npm i react-equal-height
```

**WARNING**
>Version >= `1.0.0` has deep changes which making the configuration from the old version incompatible.

**INFO**
>In version `1.2.0` was added third option to run recalculate `updateOnChange`, please read about it in <b>options for EqualHeightElement</b>'

## Library import
| Library                       | Size      | Description                                                                                               |
|-------------------------------|:----------|:----------------------------------------------------------------------------------------------------------|
| `react-equal-height`          | 7.6kB    | Library with <b>styles</b> that will be loaded on script startup to the `<style>` tag                     |
| `react-equal-height/clean`    | 10,8kB   | Library without <b>styles</b>. It can be useful for SSR or to remove overhead for script with loading styles<br /><br />Styles needs to be added:<ul><li>by itself (copy below styles to your project styles)</li><li><b>OR</b></li><li>by import `clean/main.css` from package</li></ul> |

#### Styles from clean/main.css
````css
.equal-height-JlocK {
    display:block;
    overflow:hidden;
    transition-property:height
}
````

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
| Prop              | Default               | Required  | Description                                                                                           |
|-------------------|:---------------------:|:---------:|:------------------------------------------------------------------------------------------------------|
| `timeout`         | **200**               | **false** | time to recalculate heights                                                                           |
| `animationSpeed`  | **0.25**<br>(second)  | **false** | time of animation for height change (in milliseconds) <br /> (**0**: disable)                         |
| `updateOnChange`  | **undefined**         | **false** | It's a part of <b>useEffect</b> deps so in <b>updateOnChange</b> can be passed anything they allow    |

## Options (EqualHeightElement)
| Prop              | Default   | Required  | Description                                                    |
|------------------ |:---------:|:---------:|:---------------------------------------------------------------|
| ```name```        |           | **true**  | all heights of elements with the same name are comparing       |
| ```tag```         | **div**   | **false** | type of tag that wraps the elements                            |
| ```placeholder``` | **false** | **false** | to keeping height in place where element not exist             |
| ```disable```     | **false** | **false** | disables ```EqualHeightElement``` (children are still passing) |

## Methods (update by 'useEffect deps')
````tsx
import React from 'react';
import { EqualHeight, EqualHeightElement } from 'react-equal-height';

const App = () => {
    const [loadImage, setLoadImage] = useState<boolean>(false);

    return (
        <EqualHeight updateOnChange={loadImage}>
            <EqualHeightElement name="Name">
                <div className={styles.innerElement}>
                    <p>
                        <img src="https://via.placeholder.com/600x600" onLoad={(): void => setLoadImage(true)} alt="" />
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper viverra nam libero justo laoreet sit amet. Amet facilisis magna etiam tempor. Lobortis feugiat vivamus at augue eget.
                    </p>
                </div>
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
````
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
