Why did you pick your particular your design? 

Assumptions 
 

The basic approach for choosing API endpoints are as below: 

1. It should be friendly to the developers. 
2. Explorable via a browser address bar via http methods.
3. URLs represent API resources.
4. plural name for API resources. (example: orders, items, etc.)
5. Leveraging http verbs (GET,POST,etc.) to implement CRUD on API resources.
6. Impelement relations on API resources. 
    6.1 Each resource might have relation to other resources 
        GET api/orders/1/items , will retrieve items in order 1
7. Leveraging http status codes for error handling.
8. Using JSON as request and reposne Content-Type.


Using node.js, please implement a working solution to perform the following kind of operations on the data:

    1. show all orders from a particular company
    
    2. show all orders to a particular address
    
    3. delete a particular order given an OrderId
   
    4. display how often each item has been ordered, in descending order (ie in the above example, 2x for Macbook and Inline skates, 1x for the rest)

Please optimize your code and do not convolute it with handling exceptions/edge cases – we are more interested in readability for this solution

Finally, could you answer these questions:

    a) Why did you pick your particular your design? What assumptions did you make, and what tradeoffs did you consider?
    
    b) What do you like (and dislike) about Node/Javascript compared to other programming languages?

Please send us an archive with your solution together with build instructions.

If you have any further questions please let us know. Otherwise, we look forward to seeing your solution!