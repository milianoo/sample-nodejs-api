## Documentation 

please visit `http://borderguru-test.herokuapp.com`

# Arcitecture Overview
According to the scenario, two models required, to represents the logical resources in the API
- `items`
- `orders`

Also two controller required to control and process the requests:
- `itemController`
- `orderController`
    
In addition, in order to display "How often items has been ordered", it is required to decide which endpoints should handle this request, and as the request is kind of report, therefore I decided to create a seperate endpoint for this purpose. This endpoint will also require a controller, which will take benefit from existing `order` model:
- `reportController`

The app will be running over `ExpressJS` and will use `MongoDB` for data transactions. 

## a) Why did you pick your particular your design? What assumptions did you make, and what tradeoffs did you consider?

The focus of this prototype is to represent: 
- Take benefit from 'Test Driven Development' in implementation of API endpoints 
- Using MongoDB as an schemaless database and JSON format as basic unit of data storage.
- using ExpressJS as web application framework to handle http requests. 
- using Mocha as a testing framework, to run tests serially and generate flexible and accurate reports. 
- using Sinon for Stubing database objects, and isolate the models and controllers for unit testing. 
- using Grunt as a Task runner for mocha tests and JSlint tasks. 

In addition, I considered below criterias in design and development of API endpoints: 

1. It should be friendly to the developers. 
2. Explorable via a browser address bar via http methods.
3. URLs represent API resources.
4. plural name for API resources. (example: orders, items, etc.)
5. Leveraging http verbs (GET,POST,etc.) to implement CRUD on API resources.
6. Impelement relations on API resources. 
   - Each resource might have relation to other resources 
   - GET api/orders/1/items , will retrieve items in order with id of 1
7. Leveraging http status codes for error handling.
8. Using JSON as request and reposne Content-Type.

## b) What do you like (and dislike) about Node/Javascript compared to other programming languages?

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