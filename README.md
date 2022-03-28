# Falert

Falert is a Funky Alert. It's fun, and that's it's only reason it exists. It uses CSS transforms to give the illusion that it's floating above the page.

## Installing

If you're using a bundler:

```shell
$ npm install @code_monk/falert
```

And then in your application code:

```javascript
import {Falert} from "@code_monk/falert";

new Falert("Info", "Some information for you", "notice");
```

Or simply import using a URL:

```javascript
import {Falert} from 'https://unpkg.com/@code_monk/falert@latest/dist/es2022/falert.js';

new Falert("Cool!", "Using ES6 modules is fun", "warning");
```

## Usage

The API is: `new Falert(<heading>, <message>, <optional type>)` where `<optional type>` is one of "fatal", "warning", or "notice". Notice is the default.

Simply click on the falert to close it.

If multiple falerts are launched, the newer one will try to launch slightly lower so that everything is still visible.

[Check out the demo](https://brain.theater/falert) to see it in action.