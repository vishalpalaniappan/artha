**Meaning**:  
Coffee Shop  

**Participant**
Cart
**Participant Meaning**:
Cart is a list.
It accepts food item.


**Narratives**:  
Barista presents the menu to the user then accept the menu choice from the user.  
If the user selected coffee, then add coffee to cart.  
If the user selected a bagel, then add bagel to cart.  
If the user terminates the transaction, then clear the cart and return to the menu.  
If the user proceeds with the payment, then calculate cost then hand user the bill then accept payment from user.  

**Meaning**:  
add {food_item} to {cart}  
**Narrative (inserts item in list)**:  
insert {food_item} at end of {cart}  

**Meaning**:  
clear the {cart}  
**Narrative (clears list)**:  
remove all entires in {cart}  