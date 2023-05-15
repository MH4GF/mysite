---
name: 'package'
root: '.'
output: './packages'
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
  "packageManager": "pnpm@7.15.0",
  "devDependencies": {
    "@project/tsconfig": "workspace:*",
    "@project/prettier": "workspace:*",
    "typescript": "5.0.4"
  },
  "scripts": {
    "lint": "run-s -c lint:*",
    "lint:tsc": "tsc",
    "format": "run-s -c format:*",
    "format:prettier": "prettier --write ."
  }
}
```

# `{{ inputs.name }}/src/index.ts`

```ts
console.log('hello @project/{{ inputs.name }}')
```

# `{{ inputs.name }}/tsconfig.json`

```json
{
  "extends": "@project/tsconfig/tsconfig.json"
}
```
