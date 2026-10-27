
Note:
While I implement the functionality shared below, I will save the yielded values in aliases and then use the alias as an argument. This will be a bit more verbose but it establishes the same functionality. This can be modified later.

# Syntax Planning 

I will also add assign syntax so that I can store values in participants. In the past, I was using the first argument in the meaning args as the participant to store the value in, but I think it is time to start extending the syntax.

So if a meaning yields a value, then it will be stored in the participant:
participant = meaning(meaningfulArg2, meaningfulArg2)

For example
sum = add(1,2)

add(1,2) will yield a result. I can even switch to the + syntax eventually. While that looks like programming, I think it is still important to remember that there is an unambiguous narrative with meaning that is being established and then it will be synthesized into a program.

Also, sum can be a participant that was already created with a role and then it its value is the result of add. I haven't yet decided the nuances of how I want to approach that but I will refine that as I implement.

In this way, writing the program itself is constructing meaning and then the engine reasons about it and then synthesizes it. The automatic synthesis is done with awareness of meaning that has been fully reasoned about, that is why it will be fully correct (with respect to the known meaning and CLP will enable the unknown meaning to be learnt through root cause analysis on failures that have been automatically diagnosed).

# Args Parser Planning

meaning(test=meaning2(23,"23"),test2=meaning3(),[1,2,3],"asdf")

meaning(
    test = meaning2(
        meaningfulArg1 = 23,
        meaningfulArg2 = "23"
    )
    ,
    test2= meaning3(
        meaningfulArg1 = 5,
        meaningfulArg2 = [1,2,3],
        meaningfulArg3 = "asdf"
    )
)

I need to extend the args parser so that it can handel nested meaning as arguments. So I am going to rewrite the args parser and while I do that I am also going to move the functionality that should be in the lexer from the parser.

I think the best way to do this is to have a args stack where every time I see an opening parenthesis, I add the meaning to the stack and then when it closes, I pop the stack and continue at the level below it. 


