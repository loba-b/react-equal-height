# React Equal Height
Comparing elements on react state and hooks by name and set max height.

## Installation
```
npm i react-equal-height
```

## Usage
```tsx jsx
import { EqualHeight, EqualHeightElement } from 'react-equal-height';

<EqualHeight>
    <EqualHeightElement name="Simple">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem.
        </p>
    </EqualHeightElement>
    <EqualHeightElement name="Simple">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem.
        </p>
        <p>
            tiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies purus, sed posuere libero dui id orci.
        </p>
    </EqualHeightElement>
</EqualHeight>
```
**EqualHeight** - parent component (all components to calculate must be included in this component)

**EqualHeightElement** - child component to wrap element for height

## Options
| Prop              | Default   | Description                                               |
| ----------------- |:-------:  | :-------------------------------------------------------- |
| ```placeholder```       | **false**     | when you need equal height but there is no any element    |
| ```disable```           | **false**     | to disable ```EqualHeightElement``` (children is still passing) |
| ```overflow```          | **true**      | adding overflow: hidden on element                        |

## TO-DO
* add examples
* better README.md
