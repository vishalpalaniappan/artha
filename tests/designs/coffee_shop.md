**Meaning**:  
Coffee Shop  

**Narratives**:  
Barista presents the menu to the user then accept the menu choice from the user.  
If the user selected coffee, then add coffee to cart.  
If the user selected a bagel, then add bagel to cart.  
If the user terminated the transaction, then clear the cart and return to the menu.    
If the user proceeded with the payment, then calculate cost then hand user the bill then accept payment from user.  


---

**Meaning**: accept menu choice from the user
**Narrative**:  
Accept user terminal input and store in menu_choice.

**Meaning**: Barista presents the menu to the user
**Narrative**:  
Get formatted menu then display in terminal.

**Meaning**: the user selected coffee
**Narrative**:  
menu_choice equals coffee

**Meaning**: the user selected bagel
**Narrative**:  
menu_choice equals bagel

**Meaning**: the user terminated the transaction
**Narrative**:  
menu_choice equals terminate

**Meaning**: the user proceeded with the payment
**Narrative**:  
menu_choice equals checkout

**Meaning:** calculate cost  
**Narrative**:  
Set total_cost to 0 and has type float.  
For each item in cart, get cost of {item} and add to total_cost.

----
**Participant**: Cart  
**Participant Meaning**:  
Cart is a list.  
It contains food item.  

**Meaning**: add {food_item} to {cart}  
**Narrative (inserts item in list)**:  
insert {food_item} at end of {cart}  

**Meaning**: clear the {cart}  
**Narrative (clears list)**:  
remove all entires in {cart}  

-----
**Participant**: Menu  
**Participant Meaning**:  
Menu is a list.  
It contains food items and actions.
It has 1 food item named coffee.  
It has 1 food item named bagel.  
It has 1 action named terminate.  
It has 1 action named checkout.  

**Meaning**: get formatted menu
**Narrative (returns list)**:  
# Add narrative to format menu into string

----
**Participant**: Coffee  
**Participant Meaning**  
Coffee is a class.  
Coffee has three attributes.  
It has an attribute named type that is a string and has a value of "food item".  
It has an attribute named cost which is a float and has a value of 1.00.
It has an attributed named cost_currency which is a string and has a value of "CAD".  
It has narratives "get type of coffee" and "get cost of coffee" and "get currency of coffee cost".  

**Meaning**: get cost of coffee  
**Narrative (accesses attribute of class)**:  
get attribute cost of coffee

**Meaning**: get type of coffee  
**Narrative (accesses attribute of class)**:  
get attribute type of coffee

**Meaning**: get currency of coffee cost  
**Narrative (accesses attribute of class)**:  
get attribute cost_currency of coffee

----
**Participant**: Bagel  
**Participant Meaning**  
Coffee is a class.  
Bagel has three attributes.  
It has an attribute named type that is a string and has a value of "food item".  
It has an attribute named cost which is a float and has a value of 2.00.  
It has an attributed named cost_currency which is a string and has a value of "CAD".   
It has narratives "get type of coffee" and "get cost of coffee" and "get currency of coffee cost".  

**Meaning**: get cost of bagel  
**Narrative (accesses attribute of class)**:  
get attribute cost of bagel

**Meaning**: get type of bagel  
**Narrative (accesses attribute of class)**:  
get attribute type of bagel

**Meaning**: get currency of bagel cost  
**Narrative (accesses attribute of class)**:  
get attribute cost_currency of bagel
