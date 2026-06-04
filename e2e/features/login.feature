Feature: Login

  Scenario: User logins successfully
    Given I am on the login page
    When I enter valid credentials
    And I click the submit button
    Then I should be redirected to the dashboard

  Scenario: User cannot login with invalid credentials
    Given I am on the login page
    When I enter username "<username>" and password "<password>"
    And I click the submit button
    Then I should see an error message

    Examples:
      | username          | password          | reason                     |
      | wrong_username    | wrong_password    | completely wrong           |
      | admin             | wrong_password    | correct user wrong password|
      | wrong_username    | password          | wrong user correct password|
      |                   |                   | empty credentials          |