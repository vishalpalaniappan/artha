This folder will contain the engine implementation. The engine will accept the AST produced by the parser and it will use the provided primitives to reason about the meaning specified in the artha script.

# Planning

So the actual implementation of the reasoning is quite simple because it is using my definition of correctness to reason about the world. So for example, I establish that the `if` functional primitive needs to be evaulated against a boolean structural type primitive and using this, I can reason about whether this meaning is incorrect. Similarly, every primitive is establishing its correctness and I can use that to reason.

As I visit the atomic behavior and each subsequent behavior, I build a narrative and then I evaluate the semantic validity of the narratives. The process itself is simple because I branch when the narrative reasons about the world to select new meaning. 

Overall, I think this is actually a simple process because everything that is being reasoned about has been defined by me. So its just a matter of enforcing my own definition of correctness.

While doing this, I will also establish a synthesis package that translates the meaning into an implementation structure that realizes the meaning, then I will send it to the synthesizer.