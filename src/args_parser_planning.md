# Args Parser Planning

meaning(test=meaning2(23,"23"),test2=meaning3(),[1,2,3],"asdf")

meaning(
    test = meaning2(
        arg1 = 23,
        arg2 = "23"
    )
    ,
    test2= meaning3(
        arg1 = 5,
        arg2 = [1,2,3],
        arg3 = "asdf"
    )
)

I need to extend the args parser so that it can handel nested meaning as arguments. So I am going to rewrite the args parser and while I do that I am also going to move the functionality that should be in the lexer from the parser.

I think the best way to do this is to have a args stack where every time I see an opening parenthesis, I add the meaning to the stack and then when it closes, I pop the stack and continue at the level below it. 

