# SCRUM-101 Checkout Test Plan

## Objective
Validate the end-to-end checkout workflow for the SauceDemo e-commerce application, covering cart review, checkout information validation, order overview, and order completion.

## Application Under Test
- URL: https://www.saucedemo.com
- Username: standard_user
- Password: secret_sauce

## Scope
- Happy path checkout flow
- Required field validation and error handling
- Navigation flow between cart, checkout, and overview pages
- Completion confirmation and return workflow

## Test Scenarios

### TC1: Successful Checkout from Cart to Order Confirmation
**Purpose:** Verify the full happy path for a logged-in customer.

**Preconditions:**
- User is logged in as `standard_user`
- `Sauce Labs Backpack` is added to the cart

**Steps:**
1. Open the inventory page.
2. Add `Sauce Labs Backpack` to the cart.
3. Open the cart page.
4. Verify the item name, description, quantity, and price are displayed.
5. Click `Checkout`.
6. Fill in valid First Name, Last Name, and Zip/Postal Code values.
7. Click `Continue`.
8. Verify the overview page shows item summary, payment info, shipping info, and totals.
9. Click `Finish`.
10. Verify the confirmation page shows `Thank you for your order!` and `Back Home`.

**Expected Results:**
- Cart shows the selected product details and correct total.
- Checkout form redirects to the overview page after valid information is entered.
- Confirmation page is displayed after clicking `Finish`.
- Cart is cleared after order completion.

### TC2: Required Field Validation on Checkout Form
**Purpose:** Confirm validation messages are shown for empty mandatory fields.

**Steps:**
1. Sign in using valid credentials.
2. Add one item to the cart.
3. Go to the cart page.
4. Click `Checkout`.
5. Leave the first name, last name, and zip code fields empty.
6. Click `Continue`.

**Expected Results:**
- Error message `Error: First Name is required` appears.
- User remains on the checkout information page.
- The user cannot proceed until all fields are populated.

### TC3: Cancel Checkout and Return to Cart
**Purpose:** Verify users can cancel checkout at any stage.

**Steps:**
1. Add an item to the cart.
2. Go to checkout information.
3. Click `Cancel`.
4. Verify return to the cart page.
5. Click `Continue Shopping`.

**Expected Results:**
- Cancel returns the user to the cart page.
- Continue Shopping returns the user to the products page.

### TC4: Verify Order Summary Totals
**Purpose:** Validate subtotal, tax, and total amounts on the overview page.

**Steps:**
1. Complete checkout information with valid data.
2. Navigate to the overview page.
3. Review the summary header and totals.

**Expected Results:**
- Item total, tax, and total values are visible.
- The total matches the item price plus tax.

## Test Data
- Username: `standard_user`
- Password: `secret_sauce`
- Valid sample values:
  - First Name: `Test`
  - Last Name: `User`
  - Postal Code: `12345`

## Coverage Summary
This plan covers the acceptance criteria for cart review, mandatory field validation, order overview, order completion, and error handling for the checkout workflow.
