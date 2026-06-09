# frontend-decide-dcat

> [!Warning]
> This is a very early stage application, it is absolutely not production ready yet and it mostly there for quickly testing things for now
> DO NOT under any circumstance look at any code here as production worthy code.

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (with npm)
- [Ember CLI](https://cli.emberjs.com/release/)
- [Google Chrome](https://google.com/chrome/)

## Installation

- `git clone <repository-url>` this repository
- `cd frontend-decide-dcat`
- `npm install`

## Running / Development

- `npm run start`
- Visit your app at [http://localhost:4200](http://localhost:4200).
- Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

- `npm run test`
- `npm run test:ember -- --server`

### Linting

- `npm run lint`
- `npm run lint:fix`

### Building

- `npm exec ember build` (development)
- `npm run build` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

- [ember.js](https://emberjs.com/)
- [ember-cli](https://cli.emberjs.com/release/)
- Development Browser Extensions
  - [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  - [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

## Reference

### Feature flags

Feature flags are used to enable/disable features in the application. They are defined in [config/environment.js](config/environment.js).

```javascript
// in config/environment.js
let ENV = {
  // Other configuration settings...
  features: {
    "new-feature": true, // Enable the 'new-feature' by default
    "beta-feature": false, // Disable the 'beta-feature' by default
    "other-feature": '{{ENABLE_SPARQL_ENDPOINT}}', // Enable/disable based on environment variable
  },
};
```

The configuration can be manually overridden by adding a query parameter to the URL:

- `?feature-new-feature=false` to disable the 'new-feature'
- `?feature-beta-feature=true` to enable the 'beta-feature'

The overriding will be saved in a cookie, so it will persist across page reloads. The cookie can be cleared by adding `?clear-feature-overrides=true` to the URL.

The feature flags can be used in the application by injecting the `features` service and calling the `isEnabled` method.

```javascript
import { inject as service } from "@ember/service";

export default class ExampleComponent extends Component {
  @service features;

  doSomething() {
    if (this.features.isEnabled("new-feature")) {
      // Implement the logic for the new feature
      console.log("New feature is enabled!");
    } else {
      // Implement the logic for the default behavior without the new feature
      console.log("New feature is disabled!");
    }
  }
}
```

Or in template files by using the `is-feature-enabled` helper:

```handlebars
{{#if (is-feature-enabled "new-feature")}}
  <p>New feature is enabled!</p>
{{else}}
  <p>New feature is disabled!</p>
{{/if}}
```

### List of feature flags

| Name            | Description                                           |
|-----------------|-------------------------------------------------------|
| sparql-endpoint | Enable a `/sparql` route offering a yasgui SPARQL GUI |
