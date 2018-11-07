# JavaScript

## State management

This boilerplate manages application state using [Redux](redux.md), makes it

immutable with [`ImmutableJS`](immutablejs.md) and keeps access performant

via [`reselect`](reselect.md).

For managing asynchronous flows (e.g. logging in) we use [`redux-saga`](redux-saga.md) and [`redux-thunk`](https://github.com/reduxjs/redux-thunk).

For routing, we use [`react-router` in combination with `connected-react-router`](routing.md).

We include a generator for components, containers, sagas, routes and selectors.

Run `npm run generate` to choose from the available generators, and automatically

add new parts of your application!

> Note: If you want to skip the generator selection process,

> `npm run generate <generator>` also works. (e.g. `npm run generate container`)

### Learn more

- [Redux](redux.md)

- [ImmutableJS](immutablejs.md)

- [reselect](reselect.md)

- [redux-saga](redux-saga.md)

- [redux-thunk](https://github.com/reduxjs/redux-thunk)

- [react-intl](i18n.md)

- [routing](routing.md)

- [Asynchronously loaded components](async-components.md)

### ¿Redux Thunk and Redux Sagas together?

No problems to have both. Sagas are just background checkers who react to some actions while thunk let's you have more interesting action creators.

While thunk will act more like synced code, sagas will do it's job in a background.

Both extensions do not change how actions are flying around. Actions still, in the end, are just bare objects like w/o thunk or w/o sagas.

Depending of project, you can use one or the other, or both.

_If you want to eliminate sagas or thunk [Click here](remove.md)_

## Architecture: `components` and `containers`

We adopted a split between stateless, reusable components called (wait for it...)

`components` and stateful parent components called `containers`.

### Learn more

See [this article](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)

by Dan Abramov for a great introduction to this approach.
