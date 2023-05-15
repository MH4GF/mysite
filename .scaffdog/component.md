---
name: 'component'
root: '.'
output: './packages/*'
ignore: []
questions:
  directory:
    message: 'Please select a directory.'
    choices:
      - components
  name: 'Please enter the name for component.'
---

# `src/{{ inputs.directory }}/{{ inputs.name }}/{{ inputs.name }}.tsx`

```tsx
type Props = {}

export const {{ inputs.name }} = (props: Props): JSX.Element => {
  return <div>{{ inputs.name }}</div>
}

```

# `src/{{ inputs.directory }}/{{ inputs.name }}/{{ inputs.name }}.stories.tsx`

```tsx
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { {{ inputs.name }} } from './{{ inputs.name }}'

const meta: ComponentMeta<typeof {{ inputs.name }}> = {
  component: {{ inputs.name }},
}

export default meta

type Story = ComponentStoryObj<typeof {{ inputs.name }}>

export const Default: Story = {}

```

# `src/{{ inputs.directory }}/{{ inputs.name }}/index.ts`

```tsx
export * from './{{ inputs.name }}'
```
