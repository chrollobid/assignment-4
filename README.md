Answer to the question :
1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Answer: getElementById - with this we can get the specified id
getElementsByClassName - we can get all elements with same class with getElementsByClassName
querySelector - it returns the first element within the document that matches the specified CSS selector
querySelectorAll - it returns  a static NodeList representing a list of the document's elements that match the specified group of selectors


2. How do you create and insert a new element into the DOM?
Answer: if one wants to create and insert a new element into DOM using JS then he needs to create the element in memory and then use method like appendChild() to add it to an existing element in the document. 


3. What is Event Bubbling? And how does it work?
Answer:  Event bubbling is a DOM event propagation mechanism where an event triggered on a child element triggers handlers on that element first, then propagates upwards through its parent and ancestor elements to the root of the DOM. It acts like a ripple in a pond, moving from the target element up to the document.


4. What is Event Delegation in JavaScript? Why is it useful?
Answer: Event Delegation is a JS method where a single event listener is attached to a common parent element to manage events for all of its children. This is possible because of event bubbling, the process where an event triggered on a child element propagates upward through its ancestors in the DOM tree.



5. What is the difference between preventDefault() and stopPropagation() methods?
Answer: preventDefault() - it stops browser's default action for an event.
stopPropagation() - it stops the event from propagating up or down in the DOM tree