Technologies Used ->
* Node.js
* Express.js
* Mongoose (MongoDB ODM)
* Chai and Chai-HTTP (for testing)

  Architectural Decisions->

* MVC Pattern: The application follows the MVC pattern for a clear separation of concerns.
* RESTful API: The API adheres to RESTful principles for consistency and predictability.
* MongoDB: MongoDB is used for flexible data storage and schema-less design.
* Test-Driven Development (TDD): Tests are written first to ensure code quality and maintainability.

  Run the Application:   npm start
  
  API Endpoints :
 * GET /products: Retrieve a list of all products.
 * POST /products: Create a new product.
 * GET /products/:id: Retrieve a product by its ID.
 * PUT /products/:id: Update an existing product.
 * DELETE /products/:id: Delete a product.
 * GET /products/search?term=searchTerm: Search products by name, description, or variant name (case-insensitive).

   Assumptions:
   * Products have a name, description, price, and optional variants (with name, SKU, additional cost, and stock count).
   * MongoDB is used as the database.
   * Environment variables are used for configuration.
  
     Additional Instructions:
     Testing: Run tests with npm test.
     * Error Handling: The API handles errors gracefully with appropriate status codes and error messages.
     * Input Validation: Implement input validation to prevent malicious data injection.
