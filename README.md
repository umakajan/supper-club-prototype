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
- To access them, you need a JWT issued by Auth0. The fastest way to get that token is to use a client
  - ```
    curl -X POST -H 'Content-Type: application/json' -d '{
      "item": {
        "name": "Salad",
        "price": 4.99,
        "description": "Fresh",
        "image": "https://cdn.auth0.com/blog/whatabyte/salad-sm.png"
      }
    }' http://localhost:7000/items -i
    ```
- create the menu-admin role, associate permissions with it, and assign it to a new user that you create through the Auth0 Dashboard.
- need a mechanism to limit access to your API resources and demonstrate that being authenticated is not the same as being authorized.
- to implement access control is to create a set of write permissions and bundle them in a menu-admin role, which you assign only to select users.
- non-admin users could circumvent the client-side route protections to unlock the admin features of the UI.
  - could extract the access token sent by Auth0 using a browser's developer tools and make requests directly to the server write endpoints using cUrl in the terminal.
  - server needs to implement role-based access control to mitigate
- Now that the authorization guards are in place, any attempt to create a new menu item directly using a non-admin access token results in failure.

## Future Implementation

- store data in an external database
- use webpack dev server

## Learning Resources

- [Use TypeScript to Create a Secure API with Node.js and Express: Getting Started](https://auth0.com/blog/use-typescript-to-create-a-secure-api-with-nodejs-and-express-getting-started/)

```

```
