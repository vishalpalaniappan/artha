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
    terminal_input = terminal_input()
    return terminal_input

def addCoffeeToCart():
    insert_at_end_of_list(Coffee,cart)

def addBagelToCart():
    insert_at_end_of_list(Bagel,cart)

def displayCart():
    terminal_display(cart)

def clearCart():
    clear_list(cart)

def checkIfUserChoseBagel():
    user_chose_bagel = equals(user_choice,Bagel)
    return user_chose_bagel

def checkIfUserChoseCoffee():
    did_user_chose_coffee = equals(user_choice,Coffee)
    return user_chose_coffee

def checkIfUserChoseDisplayCart():
    did_user_choose_display_cart = equals(user_choice,View)
    return did_user_choose_display_cart

def checkIfUserChoseClearCart():
    did_user_choose_clear_cart = equals(user_choice,Clear)
    return did_user_choose_clear_cart

