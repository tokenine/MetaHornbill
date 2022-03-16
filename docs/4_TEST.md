# 🎲 Debugging using TDD

To run the test suites, we use artifacts in [`/deployments`](../deployments) as dependencies. We have two as following
- [`/deployments/hardhat`](../deployments/lhardhat) for unit testing
- [`/deployments/localhost`](../deployments/localhost) for integration testing with Mainnet fork feature


> :warning: **Warning**
>

> Both two uses hardhat network but different locations to store artifacts


### 🧪  Command

`yarn test [mocha args...]`

These will execute your tests using mocha. you can pass extra arguments to mocha
<br/><br/>

`yarn coverage`

These will produce a coverage report in the `coverage/` folder
<br/><br/>

`yarn gas`

These will produce a gas report for function used in the tests
<br/><br/>

`yarn dev`

These will run a local hardhat network on `localhost:8545` and deploy your contracts on it. Plus it will watch for any changes and redeploy them.
<br/><br/>

`yarn local:dev`

This assumes a local node it running on `localhost:8545`. It will deploy your contracts on it. Plus it will watch for any changes and redeploy them.
<br/><br/>

### 🧪 Tips


It is recommended to run unit and isolation tests in isolation by simply using `.skip()`

```typescript
describe.skip()
```

To utilize the maximum benefit of debugging features, use:

```
yarn hardhat test --logs
```

> :warning: **Warning**
>

> we can add the --logs after your test command. So, this could emit Event during TDD environment