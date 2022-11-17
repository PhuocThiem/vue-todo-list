# vue-todo-app

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install or yarn
```

### Compile and Hot-Reload for Development

```sh
npm run dev or yarn dev
```

### Compile and Minify for Production

```sh
npm run build or yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit or yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## structure explanation
#### App.vue
    Wrap all of the web
### views folder
    Contain all of web page
### api folder
    Declare async function to call api (using axios library)
### assets folder
    Contain main css file and logo or image
### components folder
    Contain web component, what we can reuse
### constant folder
    Define app constant. Exp: endpoint, enum
### router folder
    Define route of web
### service folder
    Declare middleware library to handle api
### stores folder
    Store global state of web app (using pinia framework)
### component `__tests__` folder
    Write unit test

