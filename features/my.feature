Feature: SWAG LABS

  Scenario Outline: As a user, I should login, select the item and make order

    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a title saying <title>
    When I sort from dropdown price from low to high
    And I select random items and add to cart
    Then I assert that shopping cart badge have text equal the quantity of added items
    When I open shopping cart page
    And I click on checkout button
    Then I should see a customer info page
    When I fill customer information
    And I click on Continue button
    Then I should see a Overview page
    When I get added items names and prices from Overview pages
    Then I assert that the information should be the same as in products page
    When I click on Finish button
    Then I should see the message about completing the order

    Examples:
      | username      | password             | title    |
      | standard_user | secret_sauce         | PRODUCTS |

