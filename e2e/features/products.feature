Feature: Product Management

  Scenario Outline: Admin successfully adds a new product and verifies business logic
    Given I am logged into the dashboard
    And I navigate to the "Products" page
    When I click the "Add Product" button
    And I fill in the product name "<name>", price "<input_price>", category "<category>", and description "<description>"
    And I click the "Save Product" button
    Then I should see "<name>" in the table with the calculated price "<expected_price>"

    Examples:
      | name          | input_price | category | description           | expected_price |
      | Gaming Mouse  | 100         | hardware | High-precision sensor | $110           |
      | Office Chair  | 50          | furniture| Ergonomic support     | $55            |