# Echo Server

This project uses Actionhero with a Redis backend to create a simple & fast echo server. Whatever information is posted to the `/api/log` (`POST` or `PUT`) endpoint will be persisted. This information can be displayed via the `/api/logs` (`GET`) endpoint. This is useful when testing APIs or clients interacting with remote servers.

```bash
## On Localhost
curl -X POST -H "Content-Type: application/json" -d '{"payload":"hello localhost"}' http://localhost:8080/api/log

## On Production
curl -X POST -H "Content-Type: application/json" -d '{"payload":"hello production"}' https://echo.evantahler.com/api/log
```

The amount of data stored is configurable via the `CACHE_SIZE` environment variable, which defaults to 1000 records.

_visit www.actionherojs.com for more information_

## To install:

(assuming you have [node](http://nodejs.org/), [TypeScript](https://www.typescriptlang.org/), and NPM installed)

`npm install`

## To Run:

`npm start`

## To Test:

`npm test`
