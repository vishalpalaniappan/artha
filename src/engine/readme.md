This folder will contain the engine implementation. The engine will accept the AST produced by the parser and it will use the provided primitives to reason about the meaning specified in the artha script.

# Planning

So the actual implementation of the reasoning is quite simple because it is using my definition of correctness to reason about the world. So for example, I establish that the `if` functional primitive needs to be evaluated against a boolean structural type primitive and using this, I can reason about whether this meaning is incorrect. Similarly, every primitive is establishing its correctness and I can use that to reason.

As I visit the atomic behavior and each subsequent behavior, I build a narrative and then I evaluate the semantic validity of the narratives. The process itself is simple because I branch when the narrative reasons about the world to select new meaning. 

Overall, I think this is actually a simple process because everything that is being reasoned about has been defined by me. So its just a matter of enforcing my own definition of correctness.

While doing this, I will also establish a synthesis package that translates the meaning into an implementation structure that realizes the meaning, then I will send it to the synthesizer.

# Narrative Steps

First, before classifying the primitive node types and establishing their correctness, I am just going to walk the narrative paths and generate the unique narratives.

I start at atomic behavior, then I visit each node in the body of that behavior. I check if the node is a composite behavior (behavior is defined as an AST node), if it is, I visit that behavior node and visit each node in its body. 

Every time I see an if node, I create a duplicate of the current path I am walking and add it to the top of the stack. I continue until I visit a node that is already in the path I am walking (a loop). At that point, I terminate continue with a path in the stack below it.

The purpose of this is to establish every unique narrative in the world and then the invariants will identify the semantically invalid narratives.

For example, with the coffee_shop:

# Level 1
coffee_shop
    introduce
    introduce
    visit_shop

barista_presents_menu
    terminal_display
acceptChoice
    terminal_input
checkIfUserChoseCoffee
    equals
    yield
-> IF user chose coffee

#   Level 2
    coffee_shop
        introduce
        introduce
    visit_shop

    barista_presents_menu
        terminal_display
    acceptChoice
        terminal_input
    checkIfUserChoseCoffee
        equals
        yield
    -> IF user chose coffee
        add_coffee_to_cart
            insert_at_end_of_list
    visit_shop

    Narrative Done - Pop Level 2

# Continue Level 1
coffee_shop
    introduce
    introduce
    visit_shop

barista_presents_menu
    terminal_display
acceptChoice
    terminal_input
checkIfUserChoseCoffee
    equals
    yield
-> IF user chose coffee
checkIfUserChoseBagel
    equals
    yield
-> IF user chose Bagel

# Level 2
    coffee_shop
        introduce
        introduce
    visit_shop

    barista_presents_menu
        terminal_display
    acceptChoice
        terminal_input
    checkIfUserChoseCoffee
        equals
        yield
    -> IF user chose coffee
    checkIfUserChoseBagel
        equals
        yield
    -> IF user chose Bagel
        add_bagel_to_cart
            insert_at_end_of_list
        visit_shop

    Narrative Done - Pop Level 2

# Continue Level 1
...





