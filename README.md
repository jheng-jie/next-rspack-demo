# React Multiple Platforms

- [issue 77800](https://github.com/vercel/next.js/discussions/77800) alias minimum reproduction

- need: `node 20.15+`

- use: `yarn 1.22` `workspace`

## Install

```shell
yarn install
```

## Dev

> There are three projects, each of which can be viewed using the following commands.

- Depends on @views-a/home, but it internally depends on @core, which causes an error

```shell
yarn fail
```

- Changing @views-b/home @core dependency to @app/model/core allows it to work properly.

```shell
yarn success
```

- A demonstration shows that within the platform, it can use aliases like @core and @views.

```shell
yarn success2
```

