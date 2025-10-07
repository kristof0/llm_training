Check the folder `03_python_fastapi_project` which contains a python+fastapi backend for an online market, check `05_design` which contains the frontend to the aforementioned backend.
Implement a shopping cart/basket function which allows the user to put products into the basket for later checkout. 
The new functions should cover the following:
- PLUS icon next to each product
- if the user clicks on the + icon, the product should be put into the basket
- the backend should handle the number of available products and those in the basket
- content of the basket in the left bottom corner
Follow the below steps:
1. Extend the backend with new endpoints to handle the following:
  - add product to basket
  - delete product from basket
  - see what's in the basket
  - watch out to handle correctly the quantity of products while adding or removing from the basket
2. Add a plus icon to every displayed product, by clicking on them one product is added to the basket.
3. Display the content of the basket in the left bottom corner.
