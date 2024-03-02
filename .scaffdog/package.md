---
name: 'package'
root: '.'
output: ['./packages', './apps']
ignore: []
questions:
  name: 'Please enter the name for package.'
---

# `{{ inputs.name }}/package.json`

```json
{
  "name": "@project/{{ inputs.name }}",
  "version": "0.0.1",
  "description": "{{ inputs.name }}",
  "main": "src/index.ts",
  "scripts": {
    "lint": "run-s -c lint:*",
    "lint:eslint": "eslint .",
    "lint:tsc": "tsc"
  },
  "devDependencies": {
    "@project/configs": "workspace:*",
    "@project/eslint-config": "workspace:^0.0.1",
    "typescript": "5.1.3"
  },
  "packageManager": "pnpm@8.14.1"
}
```

# `{{ inputs.name }}/src/index.ts`

```ts
console.log('hello @project/{{ inputs.name }}')
```

# `{{ inputs.name }}/tsconfig.json`

```json
{
  "extends": "@project/configs/tsconfig/react-package.json"
}
```

# `{{ inputs.name }}/.eslintrc.cjs`

```
module.exports = {
  root: true,
  extends: ['@project/eslint-config/base'],
}

```
