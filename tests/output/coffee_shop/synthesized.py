# Primitives are in meaning form, still need to be processed, this is blocking things out.
def coffeeShop():
    introduce(shopping_cart,cart)
    introduce(menu,menu,menu)
    visitShop()

def visitShop():
    baristaPresentsMenu()
    acceptChoice(user_choice)
    checkIfUserChoseCoffee(user_chose_coffee,user_choice)
    checkIfUserChoseBagel(user_chose_bagel,user_choice)
    checkIfUserChoseDisplayCart(user_chose_display_cart,user_choice)
    checkIfUserChoseClearCart(user_chose_clear_cart,user_choice)

def baristaPresentsMenu():
    terminal_display(menu)

def acceptChoice():
    terminal_input(terminal_input)
    yield(terminal_input)

def addCoffeeToCart():
    insert_at_end_of_list(Coffee,cart)

def addBagelToCart():
    insert_at_end_of_list(Bagel,cart)

def displayCart():
    terminal_display(cart)

def clearCart():
    clear_list(cart)

def checkIfUserChoseBagel():
    equals(user_chose_bagel,user_choice,Bagel)
    yield(user_chose_bagel)

def checkIfUserChoseCoffee():
    equals(did_user_chose_coffee,user_choice,Coffee)
    yield(user_chose_coffee)

def checkIfUserChoseDisplayCart():
    equals(did_user_choose_display_cart,user_choice,View)
    yield(did_user_choose_display_cart)

def checkIfUserChoseClearCart():
    equals(did_user_choose_clear_cart,user_choice,Clear)
    yield(did_user_choose_clear_cart)

