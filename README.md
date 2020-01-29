# express-ts-api

- a feature-complete API using Node.js, Express, and TypeScript that lets clients perform data operations on resources that describe a restaurant menu.
- Using TypeScript with Node.js gives you access to optional static type-checking along with robust tooling for large apps and the latest ECMAScript features.
- define data models, create a data service, and quickly build modular endpoints
- secure the API using Auth0
- The following business rules constrain API access:
  - Anyone can read menu items.
  - Only users with a menu-admin role are authorized to create, update, or delete menu items.
- menu item has following properties:
  - id: (number) Unique identifier for the item record
  - name: (string) Name of the item
  - price: (number) Price of the item in dollars
  - description: (string) Description of the item
  - image: (string) URL pointing to the item's image
- separate the public controllers from the protected controllers using the authorization middleware as a boundary between groups.

## Future Implementation

- store data in an external database
- use webpack dev server

## Learning Resources

- [Use TypeScript to Create a Secure API with Node.js and Express: Getting Started](https://auth0.com/blog/use-typescript-to-create-a-secure-api-with-nodejs-and-express-getting-started/)
