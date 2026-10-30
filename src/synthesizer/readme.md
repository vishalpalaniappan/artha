# Planning

For the synthesizer, I will take this approach:

- Accept the meaning that has been fully reasoned about
- Import definition of realization of computable and legacy primitives (established as part of the definition)
- Create definitions for each behavior
- Within each behavior, invoke computable primitive using the imported library to invoke the implementation
- For structural primitives, using its meaning, synthesize the relevant structure
- For participants, using its meaning, synthesize the relevant data structure

Overall, this process is logical because the meaning is already in a structured form and it is simply being realized as an implementation. The steps I outlined above illustrate how this happens, its the same principle applied repeatedly, what is the meaning and how is that meaning realized as an implementation. For computable and legacy primitives, the realization is provided and invoked. For functional primitives, it is synthesized as needed to connect the other primitives together. For behaviors they are grouped as methods and for participants the relevant data structure is synthesized.

Then I will need to setup the implementation invoke the atomic behavior and then the implementation of the design itself will invoke the subsequent behaviors.