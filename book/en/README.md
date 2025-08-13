## Multi-Paradigm Programming

Combining Functional, Object-Oriented, and Lisp Paradigms for Software Design and Implementation

<a href="https://leanpub.com/multi-paradigm-programming"><img alt="Multi-Paradigm Programming" src="../../img/book_en.png" width="140px"></a>

> [Buy on Leanpub](https://leanpub.com/multi-paradigm-programming)

### Preview

[From the Author](0.1-From-the-Author.md) <br>
[Endorsements](0.2-Endorsements.md) <br>
[Environment Setup and Example Code](0.3-Environment-Setup-and-Example-Code.md)

1. [How Multiparadigm Is Expanding Modern Languages](1.0.-How-Multiparadigm-Is-Expanding-Modern-Languages.md)
   1. [The Iterator Pattern in OOP and First-Class Functions](1.1-The-Iterator-Pattern-in-OOP-and-First-Class-Functions.md)
      1. GoF’s Iterator Pattern
      2. Creating an Iterator from an `ArrayLike` Object
      3. Creating a Reverse Iterator Function from an `ArrayLike` Object
      4. A Lazy-Evaluating `map` Function
      5. The Crossroads of Multiparadigm: The Iterator Pattern and First-Class Functions
   2. [Generators: Building Iterators with Imperative Programming](1.2-Generators%3A-Building-Iterators-with-Imperative-Programming.md)
      1. Basic Generator Syntax
      2. Rewriting `reverse` with Generators 
   3. [The Iterator Pattern in TypeScript: The Iteration Protocol](1.3-The-Iterator-Pattern-in-TypeScript%3A-The-Iteration-Protocol.md)
      1. Iterators and Iterables
      2. Interaction Between the Language and Iterables
      3. Generator-Created Iterators Are Also Iterables
   4. [Functional Programming with Iterables](1.4-Functional-Programming-with-Iterables.md)
      1. `forEach` Function
      2. `map` Function
      3. `filter` Function
      4. Composing Higher-Order Functions ((()))
      5. A Fun Twist on `filter`
   5. [Why the Iteration Protocol Is Designed as an Interface Rather Than Inheritance](1.5-Why-the-Iteration-Protocol-Is-Designed-as-an-Interface-Rather-Than-Inheritance.md)
      1. Even NodeList in the Web API Is Iterable
      2. Why Use an Interface Instead of Inheritance for This?
      3. Interfaces vs. Class Inheritance
   6. [Summary](1.6-Summary.md)
2. [Functional Programming, Type Systems, and Lisp](2.0-Functional-Programming,-Type-Systems,-and-Lisp.md)
   1. [Type Inference, Function Types, and Generics](2.1-Type-Inference,-Function-Types,-and-Generics.md)
      1. Type Inference
      2. Function Types and Generics
   2. [Functional Type Systems in a Multi-Paradigm Language](2.2-Functional-Type-Systems-in-a-Multi-Paradigm-Language.md)
      1. Revisiting the Iteration Protocol and Types
      2. Functional Higher-Order Functions with a Type System
      3. Function Signatures and Nested Type Inference
   3. [Multiparadigm Languages and Metaprogramming – From LISP](2.3-Multiparadigm-Languages-and-Metaprogramming-–-From-LISP.md)
      1. Pipe Operator
      2. Combining Classes, Higher-Order Functions, Iterators, and the Type System
      3. Learning from LISP (Clojure) – Code is Data, Data is Code
      4. When map Executes in Clojure
      5. Making User-Created Code and Classes into Lists in a Multiparadigm Language
      6. LISP’s Extensibility – Macros and Metaprogramming
      7. Dynamically Extending Functionality at Runtime
      8. The Joy of Extending a Language
   4. [Summary](2.4-Summary.md)
3. [Code:Object:Function = Generator:Iterator:LISP = IP:OOP:FP](3.0-Code%3AObject%3AFunction-=-Generator%3AIterator%3ALISP-=-IP%3AOOP%3AFP.md)
   1. [Code Is Data – A List Containing Logic](3.1-Code-Is-Data-–-A-List-Containing-Logic.md)
      1. [for, i++, if, break] – Thinking of Code as a List
      2. List Processing in Modern Languages – Clojure, Kotlin, Swift, Scala, C#, Java 
      3. Concepts and Paradigms That Can Be Applied Across Languages
   2. [Learning from Haskell](3.2-Learning-from-Haskell.md)
      1. Functions and Function Signatures in Haskell
      2. Elegant Syntax with Language-Level Support for Currying
      3. The main Function and IO
      4. head, map, filter, foldl Function Signatures
      5. Function Composition – The `.` Operator and the `$` Operator
      6. sumOfSquaresOfOddNumbers
      7. Pipeline Style – The `&` Operator
      8. Error Handling via Either
      9. Pattern Matching
   3. [Taking a Closer Look at Lazy Evaluation](3.3-Taking-a-Closer-Look-at-Lazy-Evaluation.md)
      1. The Execution Order of Nested Iterators — Verifying with Generators
      2. Looking in More Detail
      3. Examining It with Direct Iterators
      4. Simplifying Our View
   4. [Generator:Iterator:LISP – Lazy Evaluation and Safe Composition](3.4-Generator%3AIterator%3ALISP-–-Lazy-Evaluation-and-Safe-Composition.md)
      1. The `find` Function Signature
      2. `find` in Haskell and Safe Composition
      3. Rethinking Lazy Evaluation and List Processing via `find`
      4. Safe Composition in TypeScript: ? ?? !
      5. every
      6. some
      7. Insert a “Break” Logic with Lazy Evaluation
      8. Abstracting Shared Logic in `every` and `some` Functionally
      9. Adding with `concat`
   5. [Summary](3.5-Summary.md)
4. Asynchronous Programming
   1. Asynchronous as a Value
      1. Promise
      2. Have You Used `new Promise()` Directly?
      3. Promise.race
      4. Setting a Timeout for IO Operations
      5. Rendering UI Depending on Response Speed
      6. Promise.all
      7. Promise.allSettled
      8. Promise.any
   2. Asynchronous Handling with Laziness
      1. How to Defer a Promise’s Execution?
      2. ChatGPT’s Imperative Implementation of Concurrency – `executeWithLimit`
      3. A Functional Implementation of Concurrency – `executeWithLimit`
      4. A “Step” Toward Effective Async Handling – Laziness
   3. Treating Asynchronous as a Type
      1. AsyncIterator, AsyncIterable, AsyncGenerator Protocols
      2. Higher-Order Functions for AsyncIterable
      3. A Convention for Functions Supporting Both Sync and Async – toAsync
      4. Type System + Asynchronous Functional Functions + Class
   4. Asynchronous Error Handling
      1. Loading images and getting their heights
      2. Improved Asynchronous Logic
      3. Ensuring that errors occur properly is key
      4. Stable Software and Asynchronous Programming
   5. Summary
5. Practical Functional Programming
   1. Working With Real World Data
      1. Working With Numbers in a 2D Array
      2. Handling Basketball Team Data
      3. Handling Commerce Data
      4. Handling Commerce Data 2
      5. Solving Problems With a Consistent Approach
   2. Applying to More Problems
      1. pipe
      2. Composing Asynchronous Functions With pipe
      3. zip
      4. When You Need the Index as a Value
      5. Collatz Conjecture: Counting Until It Becomes 1
      6. take, takeUntilInclusive, takeWhile Instead of break
      7. Logic Created by Combining Functions
   3. Backend Asynchronous Programming
      1. The Payment Process Problem in a Commerce Platform
      2. Creating a Payment History Synchronization Scheduler
      3. Optimizing Time Complexity Using Hashing
      4. Maintaining a Stable Interval for Asynchronous Work
      5. Handling Maximum Request Size Limits Efficiently
      6. Counting Up Front for Efficiency
      7. Improving Efficiency With Parallelism
      8. List-Processing-Based Async/Concurrent Programming
   4. Patternizing List Processing
      1. Transform-Accumulate (map-reduce)
      2. Nested-Transform (nested-map)
      3. Iterator-Effect (Iterator-forEach)
      4. Filter-Terminate (filter-take)
      5. Infinite-Terminate (range-take)
      6. Split-Flatten (chunk-flat)
      7. Transform-Flatten (map-flat)
      8. Combine-Accumulate (zip-reduce)
      9. Hash-Match (reduce-map)
      10. Conceptual Summary of Each Type of List-Processing Function
   5. Summary 
6. Multi-Paradigm Programming
   1. Building an HTML Template Engine
      1. Tagged Templates
      2. Implementing with List Processing
      3. Replacing `push` with `concat`
      4. Preventing XSS (Cross Site Scripting)
      5. Enabling Component-Style Development with Nested Data
      6. Solve Structural Issues with OOP, Solve Logic Issues with FP
      7. Creating HTML Strings from Arrays
      8. Adding Objects Functionally via `+`
      9. Moving Array Handling into the Class for Convenience
      10. Abstracting into a Higher-Order Function
      11. Building a Small Front-End Development Library
      12. The Opportunities Offered by Multi-Paradigm Languages
   2. Handling Concurrency with a Multi-Paradigm Approach
      1. Revisiting `executeWithLimit`
      2. `runTasksWithPool` Implemented Imperatively by ChatGPT
      3. `runTasksWithPool` Implemented via a Multi-Paradigm Approach
      4. Making the Concurrency (Load) Size Dynamically Adjustable
      5. Handling Infinite, Ongoing Tasks
      6. `runAllSettled`
   3. Summary
7. Object-Oriented Front-End Development and Multi-Paradigm Approaches in Practice
   1. Building a "Settings" App
      1. SwitchView
      2. SettingItemView
      3. SettingListView
      4. SettingPage
      5. Adding a Global Toggle Feature
      6. Inter-Component Communication via Custom Events
      7. Why Do Our Events Keep Looping, Causing Side Effects?
      8. A Type-Safe Pattern for Custom Event Communication
      9. A Reusable SwitchView Component
      10. How Paradigms Create Reactive Code
   2. Building a Todo App
      1. CheckView
      2. Abstract Class and Inheritance
      3. Headless UI
      4. TodoItemView
      5. Domain–UI Naming Mismatch Management Through Hierarchical Encapsulation
      6. TodoListView
      7. Generalizing with a Generic Class
      8. TodoPage
      9. Removing Duplication via Inter-Object Communication Based on Interfaces
      10. From a GoF Design Pattern Perspective – The Strategy Pattern
      11. Inter-Object Communication with First-Class Functions – A “Callback Injection” Pattern
      12. A Multiparadigm Code Design
   3. Building a Todo App, Part 2
      1. Simplifying Code with Decorators
      2. TextSubmitView
      3. Adding a Helper Method to ListView
      4. Creating a New Todo
      5. SegmentControlView
      6. Optimizing DOM Updates via a Heuristic Diff
   4. Building a Todo App, Part 3
      1. Making It Flexible with the State Pattern
      2. Benefits of Applying the State Pattern
      3. Dynamically Changing Code and Software Behavior at Runtime
      4. Further Expanding with State Objects
      5. A Multiparadigm Object-Oriented Design
   5. Asynchronous Flows with UI, Promise, and Class
      1. Using Promises for Custom Alerts and Confirms
      2. Promises as Return Values, Mediating Communication
      3. Selecting Friends for a Group Chat

