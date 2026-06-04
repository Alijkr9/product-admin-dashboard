Feature: Products

  Background: 
    Given I am logged in as admin

  Scenario: Adding new Product to the list with details and it is successfully added
    Given I am on the Products page
    When I click on Add Product button
    And I fill in the product name "<name>", price "<input_price>", category "<category>", and description "<description>"
    And I click the "Save Product" button
    Then I should see "<name>" in the table with the calculated price "<expected_price>"

    Examples:
      | name          | input_price | category | description           | expected_price |
      | Gaming Mouse  | 100         | hardware | High-precision sensor | $110           |
      | Office Chair  | 50          | furniture| Ergonomic support     | $55            |