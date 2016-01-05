## Documentation 

API documentation available [here](http://borderguru-test.herokuapp.com)

Live Demo available [here](http://borderguru-test.herokuapp.com/api/orders)

## How to use this repository

1. Clone the repository

`git clone https://github.com/milianoo/sample-nodejs-api.git`

2. Install npm packages 

`npm install`

3. Run mocha test cases and jslint task to validate your JavaScript

`grunt` (or `grunt watch` to run tasks after any changes on files)



# Arcitecture Overview

Design inspired by MVC arcitectural pattern. 

Models to represents the logical resources in the API: 

- `items`
- `orders`

Controllers

- `itemController`
- `orderController`
    
In addition, in order to display "How often items has been ordered", it is required to decide which endpoints should handle this request, and as the request is kind of report, therefore I decided to create a seperate endpoint for this purpose. This endpoint will also require a controller, which will take benefit from existing `order` model:
- `reportController`

## a) Why did you pick your particular your design? What assumptions did you make, and what tradeoffs did you consider?

### Development practice 

- **Test Driven Development** in implementation of API endpoints.

### Libraries and frameworks

- `MongoDB` as an schemaless database and JSON format as basic unit of data storage.
- `ExpressJS` as web application framework to handle http requests. 
- `Mocha` as a testing framework, to run tests serially and generate flexible and accurate reports. 
- `Sinon` for Stubing database objects, and isolate the models and controllers for unit testing. 
- `SuperTest` to test and assert HTTP endpoints. 
- `Grunt` as a Task runner for mocha tests and JSlint tasks. 

### Objectives 

In addition, I considered below criterias in design and development of API endpoints: 

1. It should be friendly to the developers. 
2. Explorable via a browser address bar via http methods.
3. URLs represent API resources
   - plural name for API resources. (example: orders, items, etc.)
4. Proper documentation, and examples for consumers. 
5. Leveraging http verbs (GET,POST,etc.) to implement CRUD on API resources.
6. Impelement relations on API resources. 
   - Each resource might have relation to other resources (example : GET api/orders/1/items, will retrieve items in order with id of 1)
7. Leveraging http status codes for error handling.
8. Using JSON as request and reposne Content-Type, to have same data format in all layers. 

### What is next ? 

- Cover more scenarios and edge cases
- Error handling
- Data Validation

## Why JavaScript/ Node.js ?

- It's a fact that JavaScript’s rising popularity has brought with it a lot of changes, and the face of web development today is dramatically different. 
- It's great for development of web applications and restful APIs. 
- It's fast. 
- light-weight and scalable. 
- It's easy to deploy to different platforms. 
- It has a lot of npm libraries and frameworks. 
- It has great community support.
- And it's the same language for front-end and back-end.

I believe there are not much to dislike about a language or technology, as each is created for a specific purpose and based on the requirements and projects, developers will choose the right technology and framework, to fulfill the requirements. 

Thanks. 
