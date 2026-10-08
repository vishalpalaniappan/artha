**Meaning**:  
Coffee Shop  

**Narratives**:  
Barista presents the menu to the user then accept the menu choice from the user.  
If the user selected coffee, then add coffee to cart.  
If the user selected a bagel, then add bagel to cart.  
If the user terminates the transaction, then clear the cart and return to the menu.    
If the user proceeds with the payment, then calculate cost then hand user the bill then accept payment from user.  

**Participant**: Cart  
**Participant Meaning**:  
Cart is a list.  
It accepts food item.  

**Participant**: Menu  
**Participant Meaning**:  
Menu is a list.  
It contains food items and actions.
It has 1 food item named coffee.  
It has 1 food item named bagel.  
It has 1 action named terminate.  
It has 1 action named checkout.  

**Participant**: Coffee  
**Participant Meaning**  
Coffee is a class.  
Coffee has two attributes.  
It has an attribute named type that is a string and has a value of "food item".  
It has an attribute named cost which is a float and has a value of 1.00.
It has an attributed named cost_currency which is a string and has a value of "CAD".  
It has narratives "get type of coffee" and "get cost of coffee" and "get currency of coffee cost".  

**Participant**: Bagel  
**Participant Meaning**  
Coffee is a class.  
Bagel has two attributes.  
It has an attribute named type that is a string and has a value of "food item".  
It has an attribute named cost which is a float and has a value of 2.00.  
It has an attributed named cost_currency which is a string and has a value of "CAD".   
It has narratives "get type of coffee" and "get cost of coffee" and "get currency of coffee cost". 

**Meaning**: add {food_item} to {cart}  
**Narrative (inserts item in list)**:  
insert {food_item} at end of {cart}  

**Meaning**: clear the {cart}  
**Narrative (clears list)**:  
remove all entires in {cart}  
