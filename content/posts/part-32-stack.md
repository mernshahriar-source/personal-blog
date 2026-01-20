---
title: 'Part 32: Stack<T> - LIFO'
date: '2026-01-20'
excerpt: 'Part 32: Stack - Last In First Out শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - collections
  - stack
  - tutorial
draft: true
---

# Part 32: Stack<T> - Last In First Out (LIFO)

## আগের Parts এ কী শিখলাম?

| Collection | কাজ |
|------------|-----|
| List<T> | Dynamic Array - index দিয়ে access |
| Dictionary<K,V> | Key-Value Storage - key দিয়ে value পাও |

আজকে শিখবো **Stack<T>** - এটা একটু different!

---

## গল্প দিয়ে শুরু করি

### থালার Stack

রেস্টুরেন্টে থালা ধোয়ার পর stack করে রাখা হয়:

```
        ┌─────────┐
        │  থালা D │  ← সবার পরে রাখা হয়েছে
        ├─────────┤
        │  থালা C │
        ├─────────┤
        │  থালা B │
        ├─────────┤
        │  থালা A │  ← সবার আগে রাখা হয়েছে
        └─────────┘
          TABLE
```

**এখন একটা থালা নিতে হবে। কোনটা নেবে?**

সবার **উপরের** টা! মানে **D**।

কারণ নিচের থালা নিতে গেলে উপরের সব পড়ে যাবে!

---

### এটাই LIFO - Last In First Out

```
LIFO = Last In First Out

যেটা সবার পরে (Last) ঢুকেছে,
সেটা সবার আগে (First) বের হবে!
```

**আরেকটা উদাহরণ: বইয়ের স্তূপ**

```
তুমি টেবিলে বই রাখছো:

১. Math বই রাখলে         →  Math
২. Physics রাখলে         →  Physics (উপরে)
৩. Chemistry রাখলে       →  Chemistry (সবার উপরে)

        ┌─────────────┐
        │  Chemistry  │  ← Last In
        ├─────────────┤
        │   Physics   │
        ├─────────────┤
        │    Math     │  ← First In
        └─────────────┘

এখন বই নিতে হলে?

প্রথমে Chemistry নিতে হবে (Last In, First Out)
তারপর Physics
সবশেষে Math
```

---

## Real-life Examples যেখানে Stack ব্যবহার হয়

### ১. Undo Feature (Ctrl+Z)

Text editor এ লিখছো:

```
Action 1: Type "Hello"       →  Text: "Hello"
Action 2: Type " World"      →  Text: "Hello World"  
Action 3: Type "!"           →  Text: "Hello World!"
Action 4: Delete "!"         →  Text: "Hello World"
```

**Stack এ actions জমা হচ্ছে:**

```
        ┌─────────────────┐
        │ Delete "!"      │  ← Last action
        ├─────────────────┤
        │ Type "!"        │
        ├─────────────────┤
        │ Type " World"   │
        ├─────────────────┤
        │ Type "Hello"    │  ← First action
        └─────────────────┘
```

**Ctrl+Z চাপলে কী হবে?**

সবার **Last action** টা আগে Undo হবে!

```
Undo 1: Delete "!" undo  →  "Hello World!" ফিরে এলো
Undo 2: Type "!" undo    →  "Hello World"
Undo 3: Type " World"    →  "Hello"
Undo 4: Type "Hello"     →  ""
```

**Last In, First Out!**

---

### ২. Browser Back Button

তুমি websites visit করছো:

```
Visit 1: Google.com
Visit 2: Facebook.com
Visit 3: YouTube.com
Visit 4: GitHub.com      ← এখন এখানে আছো
```

**Stack এ pages জমা হচ্ছে:**

```
        ┌─────────────────┐
        │   GitHub.com    │  ← Current (Last visited)
        ├─────────────────┤
        │   YouTube.com   │
        ├─────────────────┤
        │  Facebook.com   │
        ├─────────────────┤
        │   Google.com    │  ← First visited
        └─────────────────┘
```

**Back button চাপলে?**

```
Back 1: GitHub থেকে → YouTube
Back 2: YouTube থেকে → Facebook
Back 3: Facebook থেকে → Google
```

**Last visited, First to go back!**

---

### ৩. Function Call Stack

**Programming এ function call করলে Stack এ জমা হয়:**

```csharp
void Main()
{
    Console.WriteLine("Main starts");
    A();
    Console.WriteLine("Main ends");
}

void A()
{
    Console.WriteLine("A starts");
    B();
    Console.WriteLine("A ends");
}

void B()
{
    Console.WriteLine("B starts");
    Console.WriteLine("B ends");
}
```

**Call Stack:**

```
Main() call করে A()
A() call করে B()

        ┌─────────┐
        │   B()   │  ← Currently executing
        ├─────────┤
        │   A()   │  ← Waiting for B to finish
        ├─────────┤
        │  Main() │  ← Waiting for A to finish
        └─────────┘

B() শেষ হলে → Stack থেকে বের হয়ে যাবে
তারপর A() চলবে
তারপর Main() চলবে
```

**Output:**
```
Main starts
A starts
B starts
B ends
A ends
Main ends
```

**এজন্যই Recursion এ Stack Overflow হয়!** অনেক বেশি function call হলে Stack full হয়ে যায়।

---

## Stack<T> তৈরি করা

### Empty Stack

```csharp
using System.Collections.Generic;

// Empty stack of integers
Stack<int> numbers = new Stack<int>();

// Empty stack of strings
Stack<string> names = new Stack<string>();

// Empty stack of custom objects
Stack<Student> students = new Stack<Student>();
```

---

### Initial Values সহ

```csharp
// Array বা List থেকে Stack
string[] arr = { "A", "B", "C" };
Stack<string> stack = new Stack<string>(arr);
```

**⚠️ Important:** Array এর last item টা Stack এর top এ যায়!

```
Array: ["A", "B", "C"]
         ↓
Stack:
        ┌─────┐
        │  C  │  ← Top (Array এর last)
        ├─────┤
        │  B  │
        ├─────┤
        │  A  │  ← Bottom (Array এর first)
        └─────┘
```

---

## Push() - Stack এ রাখো

**Push()** মানে Stack এর **উপরে** (top এ) item রাখো।

```csharp
Stack<string> plates = new Stack<string>();

plates.Push("Plate A");
plates.Push("Plate B");
plates.Push("Plate C");
plates.Push("Plate D");
```

---

**Step by Step দেখি:**

```
Initial: Empty Stack
         (nothing)


After Push("Plate A"):
         ┌───────────┐
         │  Plate A  │  ← Top
         └───────────┘


After Push("Plate B"):
         ┌───────────┐
         │  Plate B  │  ← Top (নতুন)
         ├───────────┤
         │  Plate A  │
         └───────────┘


After Push("Plate C"):
         ┌───────────┐
         │  Plate C  │  ← Top (নতুন)
         ├───────────┤
         │  Plate B  │
         ├───────────┤
         │  Plate A  │
         └───────────┘


After Push("Plate D"):
         ┌───────────┐
         │  Plate D  │  ← Top (নতুন)
         ├───────────┤
         │  Plate C  │
         ├───────────┤
         │  Plate B  │
         ├───────────┤
         │  Plate A  │  ← Bottom
         └───────────┘

Count = 4
```

---

**Code Example:**

```csharp
Stack<string> plates = new Stack<string>();

Console.WriteLine($"Count: {plates.Count}");  // 0

plates.Push("Plate A");
Console.WriteLine($"Pushed: Plate A, Count: {plates.Count}");  // 1

plates.Push("Plate B");
Console.WriteLine($"Pushed: Plate B, Count: {plates.Count}");  // 2

plates.Push("Plate C");
Console.WriteLine($"Pushed: Plate C, Count: {plates.Count}");  // 3
```

**Output:**
```
Count: 0
Pushed: Plate A, Count: 1
Pushed: Plate B, Count: 2
Pushed: Plate C, Count: 3
```

---

## Pop() - Stack থেকে নাও

**Pop()** মানে Stack এর **উপর থেকে** (top থেকে) item বের করে নাও।

**Important:** Pop() করলে item Stack থেকে **চলে যায়**!

```csharp
Stack<string> plates = new Stack<string>();

plates.Push("Plate A");
plates.Push("Plate B");
plates.Push("Plate C");

// Pop করো
string item = plates.Pop();
Console.WriteLine($"Popped: {item}");  // Plate C
```

---

**Step by Step দেখি:**

```
Before Pop:
         ┌───────────┐
         │  Plate C  │  ← Top (এটা বের হবে)
         ├───────────┤
         │  Plate B  │
         ├───────────┤
         │  Plate A  │
         └───────────┘
         Count = 3


After Pop():  (returns "Plate C")
         ┌───────────┐
         │  Plate B  │  ← Top (এখন এটা)
         ├───────────┤
         │  Plate A  │
         └───────────┘
         Count = 2


After another Pop():  (returns "Plate B")
         ┌───────────┐
         │  Plate A  │  ← Top (এখন এটা)
         └───────────┘
         Count = 1


After another Pop():  (returns "Plate A")
         (empty)
         Count = 0
```

---

**Code Example:**

```csharp
Stack<string> plates = new Stack<string>();

plates.Push("Plate A");
plates.Push("Plate B");
plates.Push("Plate C");

Console.WriteLine($"Stack has {plates.Count} items\n");  // 3

// Pop one by one
string p1 = plates.Pop();
Console.WriteLine($"Popped: {p1}, Remaining: {plates.Count}");

string p2 = plates.Pop();
Console.WriteLine($"Popped: {p2}, Remaining: {plates.Count}");

string p3 = plates.Pop();
Console.WriteLine($"Popped: {p3}, Remaining: {plates.Count}");
```

**Output:**
```
Stack has 3 items

Popped: Plate C, Remaining: 2
Popped: Plate B, Remaining: 1
Popped: Plate A, Remaining: 0
```

**লক্ষ্য করো:** C, B, A - উল্টা order এ বের হলো! (LIFO)

---

### ⚠️ Empty Stack এ Pop() করলে Error!

```csharp
Stack<int> numbers = new Stack<int>();

int item = numbers.Pop();  // ❌ ERROR!
```

**Error:** `InvalidOperationException: Stack empty.`

---

**Safe Way:**

```csharp
Stack<int> numbers = new Stack<int>();

if (numbers.Count > 0)
{
    int item = numbers.Pop();
    Console.WriteLine($"Popped: {item}");
}
else
{
    Console.WriteLine("Stack is empty!");
}
```

---

**আরেকটা Safe Way: TryPop() (C# 8.0+)**

```csharp
Stack<int> numbers = new Stack<int>();

if (numbers.TryPop(out int item))
{
    Console.WriteLine($"Popped: {item}");
}
else
{
    Console.WriteLine("Stack is empty!");
}
```

---

## Peek() - দেখো কিন্তু নিও না

**Peek()** মানে Top এর item টা দেখো, কিন্তু Stack থেকে বের করো না।

```csharp
Stack<string> plates = new Stack<string>();

plates.Push("Plate A");
plates.Push("Plate B");
plates.Push("Plate C");

// Peek করো
string top = plates.Peek();
Console.WriteLine($"Top item: {top}");        // Plate C
Console.WriteLine($"Count: {plates.Count}");  // 3 (unchanged!)
```

---

### Pop() vs Peek() - পার্থক্য

```
                    Pop()                    Peek()
              ┌───────────────┐        ┌───────────────┐
              │               │        │               │
Before:       │   ┌─────┐     │        │   ┌─────┐     │
              │   │  C  │←Top │        │   │  C  │←Top │
              │   ├─────┤     │        │   ├─────┤     │
              │   │  B  │     │        │   │  B  │     │
              │   ├─────┤     │        │   ├─────┤     │
              │   │  A  │     │        │   │  A  │     │
              │   └─────┘     │        │   └─────┘     │
              │   Count=3     │        │   Count=3     │
              │               │        │               │
              └───────┬───────┘        └───────┬───────┘
                      │                        │
                      ▼                        ▼
              ┌───────────────┐        ┌───────────────┐
              │  Returns "C"  │        │  Returns "C"  │
              │               │        │               │
After:        │   ┌─────┐     │        │   ┌─────┐     │
              │   │  B  │←Top │        │   │  C  │←Top │
              │   ├─────┤     │        │   ├─────┤     │
              │   │  A  │     │        │   │  B  │     │
              │   └─────┘     │        │   ├─────┤     │
              │               │        │   │  A  │     │
              │   Count=2     │        │   └─────┘     │
              │   (removed!)  │        │   Count=3     │
              │               │        │   (unchanged) │
              └───────────────┘        └───────────────┘
```

| Method | Item বের করে? | Count কমে? |
|--------|---------------|------------|
| Pop() | হ্যাঁ, নিয়ে নেয় | হ্যাঁ |
| Peek() | না, শুধু দেখায় | না |

---

**কখন Peek() use করবে?**

- Top এ কী আছে জানতে চাও, কিন্তু remove করতে চাও না
- Decision নিতে চাও top item দেখে

```csharp
Stack<string> tasks = new Stack<string>();
tasks.Push("Task 1");
tasks.Push("Task 2");
tasks.Push("Task 3");

// Top task দেখো
string nextTask = tasks.Peek();
Console.WriteLine($"Next task to do: {nextTask}");

// Decision নাও
Console.Write("Complete this task? (y/n): ");
string answer = Console.ReadLine();

if (answer == "y")
{
    tasks.Pop();  // এখন remove করো
    Console.WriteLine("Task completed!");
}
```

---

### ⚠️ Empty Stack এ Peek() করলেও Error!

```csharp
Stack<int> numbers = new Stack<int>();

int top = numbers.Peek();  // ❌ ERROR!
```

**Safe Way: TryPeek()**

```csharp
if (numbers.TryPeek(out int top))
{
    Console.WriteLine($"Top: {top}");
}
else
{
    Console.WriteLine("Stack is empty!");
}
```

---

## Other Useful Methods & Properties

### Count - কতগুলো item আছে?

```csharp
Stack<int> numbers = new Stack<int>();

Console.WriteLine(numbers.Count);  // 0

numbers.Push(10);
numbers.Push(20);
Console.WriteLine(numbers.Count);  // 2

numbers.Pop();
Console.WriteLine(numbers.Count);  // 1
```

---

### Clear() - সব মুছে দাও

```csharp
Stack<int> numbers = new Stack<int>();

numbers.Push(10);
numbers.Push(20);
numbers.Push(30);

Console.WriteLine(numbers.Count);  // 3

numbers.Clear();

Console.WriteLine(numbers.Count);  // 0
```

---

### Contains() - আছে কিনা?

```csharp
Stack<string> fruits = new Stack<string>();

fruits.Push("Apple");
fruits.Push("Banana");
fruits.Push("Mango");

Console.WriteLine(fruits.Contains("Banana"));  // True
Console.WriteLine(fruits.Contains("Orange"));  // False
```

---

### ToArray() - Array তে Convert

```csharp
Stack<int> numbers = new Stack<int>();

numbers.Push(1);
numbers.Push(2);
numbers.Push(3);

int[] arr = numbers.ToArray();

// arr = [3, 2, 1]  ← Top to Bottom order!
foreach (int n in arr)
{
    Console.WriteLine(n);
}
```

**Output:**
```
3
2
1
```

**Note:** ToArray() তে Top item আগে আসে!

---

### Loop করা (foreach)

```csharp
Stack<string> stack = new Stack<string>();

stack.Push("A");
stack.Push("B");
stack.Push("C");

foreach (string item in stack)
{
    Console.WriteLine(item);
}
```

**Output:**
```
C
B
A
```

**Note:** foreach ও Top থেকে Bottom order এ যায়!

---

## Complete Example ১: Undo Feature

**Simple Text Editor এর Undo feature বানাবো।**

### আগে বুঝি - Undo কীভাবে কাজ করে?

যখন তুমি কিছু লেখো, আগের state টা save থাকে। Undo করলে আগের state এ ফিরে যাও।

```
লিখলে "Hello"    →  আগের state "" save হলো
লিখলে " World"   →  আগের state "Hello" save হলো
লিখলে "!"        →  আগের state "Hello World" save হলো

Undo করলে?
→ "Hello World" ফিরে আসবে (সবার last save)
→ আবার Undo করলে "Hello"
→ আবার Undo করলে ""
```

**Last saved state, First to restore = LIFO = Stack!**

---

### Full Code:

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Console.WriteLine("📝 SIMPLE TEXT EDITOR");
        Console.WriteLine("Commands: type <text>, undo, show, exit\n");
        
        string currentText = "";
        Stack<string> history = new Stack<string>();
        
        while (true)
        {
            Console.Write("> ");
            string input = Console.ReadLine();
            
            if (input == "exit")
            {
                Console.WriteLine("Goodbye!");
                break;
            }
            else if (input == "show")
            {
                Console.WriteLine($"Current text: \"{currentText}\"");
            }
            else if (input == "undo")
            {
                if (history.Count > 0)
                {
                    // আগের state এ ফিরে যাও
                    currentText = history.Pop();
                    Console.WriteLine($"Undo! Text: \"{currentText}\"");
                }
                else
                {
                    Console.WriteLine("Nothing to undo!");
                }
            }
            else if (input.StartsWith("type "))
            {
                // আগের text টা history তে রাখো
                history.Push(currentText);
                
                // নতুন text add করো
                string newText = input.Substring(5);
                currentText += newText;
                
                Console.WriteLine($"Text: \"{currentText}\"");
            }
            else
            {
                Console.WriteLine("Unknown command!");
            }
            
            Console.WriteLine($"[History: {history.Count} states saved]\n");
        }
    }
}
```

---

### Code এর প্রতিটা অংশ বুঝি:

**১. Variables:**

```csharp
string currentText = "";
Stack<string> history = new Stack<string>();
```

| Variable | কী রাখে |
|----------|---------|
| `currentText` | এখন যে text দেখাচ্ছে |
| `history` | আগের সব states (Stack এ) |

---

**২. "type" command:**

```csharp
else if (input.StartsWith("type "))
{
    // আগের text টা history তে রাখো
    history.Push(currentText);
    
    // নতুন text add করো
    string newText = input.Substring(5);  // "type " এর পরের অংশ
    currentText += newText;
    
    Console.WriteLine($"Text: \"{currentText}\"");
}
```

**Step by step:**

```
User লিখলো: "type Hello"

Step 1: history.Push(currentText)
        → আগের text "" কে history তে রাখো
        
Step 2: input.Substring(5)
        → "type Hello" থেকে index 5 এর পর = "Hello"
        
Step 3: currentText += newText
        → "" + "Hello" = "Hello"
        → currentText এখন "Hello"
```

---

**৩. "undo" command:**

```csharp
else if (input == "undo")
{
    if (history.Count > 0)
    {
        currentText = history.Pop();
        Console.WriteLine($"Undo! Text: \"{currentText}\"");
    }
    else
    {
        Console.WriteLine("Nothing to undo!");
    }
}
```

**Step by step:**

```
User লিখলো: "undo"

Step 1: history.Count > 0 check করো
        → history তে কিছু আছে কিনা
        
Step 2: history.Pop()
        → Stack থেকে top item নাও (আগের state)
        → সেটা currentText এ বসাও
        
Step 3: আগের text দেখাও
```

---

### Sample Run with Explanation:

```
📝 SIMPLE TEXT EDITOR
Commands: type <text>, undo, show, exit

> type Hello
Text: "Hello"
[History: 1 states saved]
```

**কী হলো:**

```
Before:
currentText = ""
history = (empty)

After "type Hello":
currentText = "Hello"
history:
    ┌─────┐
    │ ""  │  ← আগের state save হলো
    └─────┘
```

---

```
> type  World
Text: "Hello World"
[History: 2 states saved]
```

**কী হলো:**

```
Before:
currentText = "Hello"

After "type  World":
currentText = "Hello World"
history:
    ┌─────────────┐
    │   "Hello"   │  ← আগের state (Top)
    ├─────────────┤
    │     ""      │
    └─────────────┘
```

---

```
> type !
Text: "Hello World!"
[History: 3 states saved]
```

**কী হলো:**

```
currentText = "Hello World!"
history:
    ┌─────────────────┐
    │  "Hello World"  │  ← Top (সবার last saved)
    ├─────────────────┤
    │    "Hello"      │
    ├─────────────────┤
    │      ""         │
    └─────────────────┘
```

---

```
> undo
Undo! Text: "Hello World"
[History: 2 states saved]
```

**কী হলো:**

```
history.Pop() করলো → "Hello World" পেলো

currentText = "Hello World"
history:
    ┌─────────────┐
    │   "Hello"   │  ← এখন এটা Top
    ├─────────────┤
    │     ""      │
    └─────────────┘
```

---

```
> undo
Undo! Text: "Hello"
[History: 1 states saved]

> undo
Undo! Text: ""
[History: 0 states saved]

> undo
Nothing to undo!
[History: 0 states saved]
```

**Last undo তে history empty, তাই "Nothing to undo!"**

---

### Full Visual Flow:

```
╔═══════════════════════════════════════════════════════════════════╗
║                    UNDO FEATURE FLOW                              ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  "type Hello"                                                     ║
║  ─────────────                                                    ║
║  currentText: "" → "Hello"                                        ║
║  history: Push("")                                                ║
║           ┌────┐                                                  ║
║           │ "" │                                                  ║
║           └────┘                                                  ║
║                                                                   ║
║  "type  World"                                                    ║
║  ──────────────                                                   ║
║  currentText: "Hello" → "Hello World"                             ║
║  history: Push("Hello")                                           ║
║           ┌─────────┐                                             ║
║           │ "Hello" │                                             ║
║           ├─────────┤                                             ║
║           │   ""    │                                             ║
║           └─────────┘                                             ║
║                                                                   ║
║  "type !"                                                         ║
║  ─────────                                                        ║
║  currentText: "Hello World" → "Hello World!"                      ║
║  history: Push("Hello World")                                     ║
║           ┌───────────────┐                                       ║
║           │ "Hello World" │                                       ║
║           ├───────────────┤                                       ║
║           │    "Hello"    │                                       ║
║           ├───────────────┤                                       ║
║           │      ""       │                                       ║
║           └───────────────┘                                       ║
║                                                                   ║
║  "undo"                                                           ║
║  ───────                                                          ║
║  Pop() → "Hello World"                                            ║
║  currentText: "Hello World!" → "Hello World"                      ║
║  history:                                                         ║
║           ┌─────────┐                                             ║
║           │ "Hello" │                                             ║
║           ├─────────┤                                             ║
║           │   ""    │                                             ║
║           └─────────┘                                             ║
║                                                                   ║
║  "undo"                                                           ║
║  ───────                                                          ║
║  Pop() → "Hello"                                                  ║
║  currentText: "Hello World" → "Hello"                             ║
║  history:                                                         ║
║           ┌────┐                                                  ║
║           │ "" │                                                  ║
║           └────┘                                                  ║
║                                                                   ║
║  "undo"                                                           ║
║  ───────                                                          ║
║  Pop() → ""                                                       ║
║  currentText: "Hello" → ""                                        ║
║  history: (empty)                                                 ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## Complete Example ২: Browser Back Button

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Console.WriteLine("🌐 SIMPLE BROWSER");
        Console.WriteLine("Commands: go <url>, back, current, history, exit\n");
        
        Stack<string> backStack = new Stack<string>();
        string currentPage = "Home";
        
        Console.WriteLine($"You are at: {currentPage}\n");
        
        while (true)
        {
            Console.Write("> ");
            string input = Console.ReadLine();
            
            if (input == "exit")
            {
                Console.WriteLine("Browser closed!");
                break;
            }
            else if (input == "current")
            {
                Console.WriteLine($"Current page: {currentPage}");
            }
            else if (input == "history")
            {
                Console.WriteLine($"Back history: {backStack.Count} pages");
                if (backStack.Count > 0)
                {
                    Console.WriteLine("Pages in back stack:");
                    foreach (string page in backStack)
                    {
                        Console.WriteLine($"  - {page}");
                    }
                }
            }
            else if (input == "back")
            {
                if (backStack.Count > 0)
                {
                    string previousPage = backStack.Pop();
                    Console.WriteLine($"⬅️ Going back to: {previousPage}");
                    currentPage = previousPage;
                }
                else
                {
                    Console.WriteLine("Cannot go back! No history.");
                }
            }
            else if (input.StartsWith("go "))
            {
                string newPage = input.Substring(3);
                
                // Current page কে history তে রাখো
                backStack.Push(currentPage);
                
                // নতুন page এ যাও
                currentPage = newPage;
                Console.WriteLine($"➡️ Navigating to: {currentPage}");
            }
            else
            {
                Console.WriteLine("Unknown command!");
            }
            
            Console.WriteLine();
        }
    }
}
```

---

### Code এর প্রতিটা অংশ বুঝি:

**১. Variables:**

```csharp
Stack<string> backStack = new Stack<string>();
string currentPage = "Home";
```

| Variable | কী রাখে |
|----------|---------|
| `currentPage` | এখন যে page এ আছো |
| `backStack` | আগের pages (Back button এর জন্য) |

---

**২. "go" command:**

```csharp
else if (input.StartsWith("go "))
{
    string newPage = input.Substring(3);  // "go " এর পরের অংশ
    
    backStack.Push(currentPage);  // এখনকার page টা stack এ রাখো
    
    currentPage = newPage;  // নতুন page এ যাও
}
```

**Step by step:**

```
User লিখলো: "go Google.com"

Step 1: input.Substring(3)
        → "go Google.com" থেকে "Google.com" বের করলো
        
Step 2: backStack.Push(currentPage)
        → আগের page "Home" কে stack এ রাখলো
        
Step 3: currentPage = newPage
        → currentPage এখন "Google.com"
```

---

**৩. "back" command:**

```csharp
else if (input == "back")
{
    if (backStack.Count > 0)
    {
        string previousPage = backStack.Pop();
        currentPage = previousPage;
    }
    else
    {
        Console.WriteLine("Cannot go back! No history.");
    }
}
```

**Step by step:**

```
User লিখলো: "back"

Step 1: backStack.Count > 0 check করো
        → Stack এ কিছু আছে কিনা
        
Step 2: backStack.Pop()
        → Stack থেকে top page নাও
        
Step 3: currentPage = previousPage
        → সেই page এ চলে যাও
```

---

### Sample Run with Detailed Explanation:

```
🌐 SIMPLE BROWSER
You are at: Home

> go Google.com
➡️ Navigating to: Google.com
```

**কী হলো:**

```
Before:
currentPage = "Home"
backStack = (empty)

After "go Google.com":
currentPage = "Google.com"
backStack:
    ┌────────┐
    │  Home  │  ← আগের page
    └────────┘
```

---

```
> go Facebook.com
➡️ Navigating to: Facebook.com
```

**কী হলো:**

```
Before:
currentPage = "Google.com"

After "go Facebook.com":
currentPage = "Facebook.com"
backStack:
    ┌──────────────┐
    │  Google.com  │  ← Top
    ├──────────────┤
    │     Home     │
    └──────────────┘
```

---

```
> go YouTube.com
➡️ Navigating to: YouTube.com
```

**কী হলো:**

```
currentPage = "YouTube.com"
backStack:
    ┌────────────────┐
    │  Facebook.com  │  ← Top (Last visited)
    ├────────────────┤
    │   Google.com   │
    ├────────────────┤
    │      Home      │
    └────────────────┘
```

---

```
> back
⬅️ Going back to: Facebook.com
```

**কী হলো:**

```
backStack.Pop() করলো → "Facebook.com" পেলো

currentPage = "Facebook.com"
backStack:
    ┌──────────────┐
    │  Google.com  │  ← Top এখন
    ├──────────────┤
    │     Home     │
    └──────────────┘
```

---

```
> back
⬅️ Going back to: Google.com

> back
⬅️ Going back to: Home

> back
Cannot go back! No history.
```

---

### Full Visual Flow:

```
╔═══════════════════════════════════════════════════════════════════════╗
║                    BROWSER BACK BUTTON FLOW                           ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  Start                                                                ║
║  ─────                                                                ║
║  currentPage: "Home"                                                  ║
║  backStack: (empty)                                                   ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  "go Google.com"                                                      ║
║  ────────────────                                                     ║
║  Push("Home") → backStack                                             ║
║  currentPage: "Home" → "Google.com"                                   ║
║                                                                       ║
║  backStack:           Browser:                                        ║
║      ┌────────┐       ┌─────────────────┐                            ║
║      │  Home  │       │   Google.com    │ ← You are here             ║
║      └────────┘       └─────────────────┘                            ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  "go Facebook.com"                                                    ║
║  ──────────────────                                                   ║
║  Push("Google.com") → backStack                                       ║
║  currentPage: "Google.com" → "Facebook.com"                           ║
║                                                                       ║
║  backStack:           Browser:                                        ║
║      ┌────────────┐   ┌─────────────────┐                            ║
║      │ Google.com │   │  Facebook.com   │ ← You are here             ║
║      ├────────────┤   └─────────────────┘                            ║
║      │    Home    │                                                   ║
║      └────────────┘                                                   ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  "go YouTube.com"                                                     ║
║  ─────────────────                                                    ║
║  Push("Facebook.com") → backStack                                     ║
║  currentPage: "Facebook.com" → "YouTube.com"                          ║
║                                                                       ║
║  backStack:           Browser:                                        ║
║      ┌──────────────┐ ┌─────────────────┐                            ║
║      │ Facebook.com │ │   YouTube.com   │ ← You are here             ║
║      ├──────────────┤ └─────────────────┘                            ║
║      │  Google.com  │                                                 ║
║      ├──────────────┤                                                 ║
║      │     Home     │                                                 ║
║      └──────────────┘                                                 ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  "back" (1st time)                                                    ║
║  ─────────────────                                                    ║
║  Pop() → "Facebook.com"                                               ║
║  currentPage: "YouTube.com" → "Facebook.com"                          ║
║                                                                       ║
║  backStack:           Browser:                                        ║
║      ┌────────────┐   ┌─────────────────┐                            ║
║      │ Google.com │   │  Facebook.com   │ ← Back here!               ║
║      ├────────────┤   └─────────────────┘                            ║
║      │    Home    │                                                   ║
║      └────────────┘                                                   ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  "back" (2nd time)                                                    ║
║  ─────────────────                                                    ║
║  Pop() → "Google.com"                                                 ║
║  currentPage: "Facebook.com" → "Google.com"                           ║
║                                                                       ║
║  backStack:           Browser:                                        ║
║      ┌────────┐       ┌─────────────────┐                            ║
║      │  Home  │       │   Google.com    │ ← Back here!               ║
║      └────────┘       └─────────────────┘                            ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  "back" (3rd time)                                                    ║
║  ─────────────────                                                    ║
║  Pop() → "Home"                                                       ║
║  currentPage: "Google.com" → "Home"                                   ║
║                                                                       ║
║  backStack: (empty)   Browser:                                        ║
║                       ┌─────────────────┐                            ║
║                       │      Home       │ ← Back to start!           ║
║                       └─────────────────┘                            ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  "back" (4th time)                                                    ║
║  ─────────────────                                                    ║
║  backStack.Count == 0 → "Cannot go back!"                             ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

**Sample Run:**
```
🌐 SIMPLE BROWSER
Commands: go <url>, back, current, history, exit

You are at: Home

> go Google.com
➡️ Navigating to: Google.com

> go Facebook.com
➡️ Navigating to: Facebook.com

> go YouTube.com
➡️ Navigating to: YouTube.com

> history
Back history: 3 pages
Pages in back stack:
  - Facebook.com
  - Google.com
  - Home

> current
Current page: YouTube.com

> back
⬅️ Going back to: Facebook.com

> back
⬅️ Going back to: Google.com

> back
⬅️ Going back to: Home

> back
Cannot go back! No history.

> exit
Browser closed!
```

---

## Complete Example ৩: Reverse a String

**Stack এর LIFO property ব্যবহার করে string reverse করা।**

### আগে বুঝি - কেন Stack দিয়ে Reverse হয়?

Stack এ LIFO - Last In First Out।

যদি "ABC" Push করি:
- প্রথমে A Push → Stack এ A
- তারপর B Push → Stack এ B (উপরে)
- তারপর C Push → Stack এ C (সবার উপরে)

এখন Pop করলে:
- প্রথমে C আসবে (Last In)
- তারপর B
- তারপর A

**Result: CBA (Reversed!)**

---

### Full Code:

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Console.WriteLine("🔄 STRING REVERSER\n");
        
        Console.Write("Enter a string: ");
        string input = Console.ReadLine();
        
        // Stack এ প্রতিটা character Push করো
        Stack<char> charStack = new Stack<char>();
        
        foreach (char c in input)
        {
            charStack.Push(c);
        }
        
        Console.WriteLine($"\nOriginal: {input}");
        
        // Stack থেকে Pop করলে reverse order এ আসবে
        string reversed = "";
        
        while (charStack.Count > 0)
        {
            reversed += charStack.Pop();
        }
        
        Console.WriteLine($"Reversed: {reversed}");
    }
}
```

---

### Code এর প্রতিটা অংশ বুঝি:

**১. Stack তৈরি:**

```csharp
Stack<char> charStack = new Stack<char>();
```

এখানে `char` এর Stack - কারণ string এর প্রতিটা character আলাদা করে রাখবো।

---

**২. Push Loop:**

```csharp
foreach (char c in input)
{
    charStack.Push(c);
}
```

String "Hello" এর জন্য:

```
foreach দিয়ে প্রতিটা character নিচ্ছি:

c = 'H' → Push('H')
c = 'e' → Push('e')
c = 'l' → Push('l')
c = 'l' → Push('l')
c = 'o' → Push('o')
```

---

**৩. Pop Loop:**

```csharp
while (charStack.Count > 0)
{
    reversed += charStack.Pop();
}
```

যতক্ষণ Stack এ কিছু আছে, Pop করে `reversed` string এ যোগ করো।

---

### Step by Step Visual:

**Input: "Hello"**

**Push Phase:**

```
foreach (char c in "Hello"):

c = 'H':
    ┌─────┐
    │  H  │
    └─────┘

c = 'e':
    ┌─────┐
    │  e  │  ← Top
    ├─────┤
    │  H  │
    └─────┘

c = 'l':
    ┌─────┐
    │  l  │  ← Top
    ├─────┤
    │  e  │
    ├─────┤
    │  H  │
    └─────┘

c = 'l':
    ┌─────┐
    │  l  │  ← Top
    ├─────┤
    │  l  │
    ├─────┤
    │  e  │
    ├─────┤
    │  H  │
    └─────┘

c = 'o':
    ┌─────┐
    │  o  │  ← Top (Last In)
    ├─────┤
    │  l  │
    ├─────┤
    │  l  │
    ├─────┤
    │  e  │
    ├─────┤
    │  H  │  ← Bottom (First In)
    └─────┘
```

---

**Pop Phase:**

```
reversed = ""

Pop() → 'o':
    reversed = "o"
    ┌─────┐
    │  l  │  ← Top
    ├─────┤
    │  l  │
    ├─────┤
    │  e  │
    ├─────┤
    │  H  │
    └─────┘

Pop() → 'l':
    reversed = "ol"
    ┌─────┐
    │  l  │  ← Top
    ├─────┤
    │  e  │
    ├─────┤
    │  H  │
    └─────┘

Pop() → 'l':
    reversed = "oll"
    ┌─────┐
    │  e  │  ← Top
    ├─────┤
    │  H  │
    └─────┘

Pop() → 'e':
    reversed = "olle"
    ┌─────┐
    │  H  │  ← Top
    └─────┘

Pop() → 'H':
    reversed = "olleH"
    (empty)

Final: "olleH" ✓
```

---

**Output:**
```
🔄 STRING REVERSER

Enter a string: Hello World

Original: Hello World
Reversed: dlroW olleH
```

---

## Complete Example ৪: Check Balanced Parentheses

**Stack এর classic use case - bracket matching।**

এটা Interview তে অনেক জিজ্ঞেস করা হয়!

### আগে বুঝি - Balanced মানে কী?

```
Balanced (সঠিক):
"()"       → ১ টা open, ১ টা close ✓
"(())"     → ২ টা open, ২ টা close, সঠিক order ✓
"(()())"   → ৩ টা open, ৩ টা close, সঠিক order ✓

Not Balanced (ভুল):
"(()"      → ২ টা open, ১ টা close ✗
"())"      → ১ টা open, ২ টা close ✗
")("       → close আগে, open পরে ✗
```

---

### Stack দিয়ে কীভাবে check করবো?

**Logic:**
1. `(` পেলে → Stack এ Push করো
2. `)` পেলে → Stack থেকে Pop করো
   - Stack empty থাকলে? ❌ মানে extra `)` আছে
3. শেষে Stack empty হলে → ✓ Balanced
4. শেষে Stack এ কিছু থাকলে → ❌ extra `(` আছে

---

### Full Code:

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Console.WriteLine("🔍 BALANCED PARENTHESES CHECKER\n");
        
        string[] testCases = {
            "()",
            "(())",
            "((()))",
            "(()())",
            "(()",
            "())",
            ")(", 
            "((())"
        };
        
        foreach (string test in testCases)
        {
            bool isBalanced = CheckBalanced(test);
            string result = isBalanced ? "✓ Balanced" : "✗ Not Balanced";
            Console.WriteLine($"\"{test}\" → {result}");
        }
    }
    
    static bool CheckBalanced(string str)
    {
        Stack<char> stack = new Stack<char>();
        
        foreach (char c in str)
        {
            if (c == '(')
            {
                // Opening bracket → Push
                stack.Push(c);
            }
            else if (c == ')')
            {
                // Closing bracket → Pop
                if (stack.Count == 0)
                {
                    // কোনো opening bracket নেই!
                    return false;
                }
                stack.Pop();
            }
        }
        
        // Stack empty হলেই balanced
        return stack.Count == 0;
    }
}
```

---

### Code এর প্রতিটা অংশ বুঝি:

**CheckBalanced function:**

```csharp
static bool CheckBalanced(string str)
{
    Stack<char> stack = new Stack<char>();
    
    foreach (char c in str)
    {
        if (c == '(')
        {
            stack.Push(c);      // Open bracket → Push
        }
        else if (c == ')')
        {
            if (stack.Count == 0)
            {
                return false;   // Extra close bracket!
            }
            stack.Pop();        // Match found → Pop
        }
    }
    
    return stack.Count == 0;    // Empty = Balanced
}
```

---

**Output:**
```
🔍 BALANCED PARENTHESES CHECKER

"()" → ✓ Balanced
"(())" → ✓ Balanced
"((()))" → ✓ Balanced
"(()())" → ✓ Balanced
"(()" → ✗ Not Balanced
"())" → ✗ Not Balanced
")(" → ✗ Not Balanced
"((())" → ✗ Not Balanced
```

---

### Example ১: "(())" - Balanced ✓

```
String: "(())"

Character 1: '('
    Action: Push('(')
    Stack:
        ┌─────┐
        │  (  │
        └─────┘

Character 2: '('
    Action: Push('(')
    Stack:
        ┌─────┐
        │  (  │  ← Top
        ├─────┤
        │  (  │
        └─────┘

Character 3: ')'
    Action: Stack not empty, Pop()
    Stack:
        ┌─────┐
        │  (  │
        └─────┘

Character 4: ')'
    Action: Stack not empty, Pop()
    Stack: (empty)

End: Stack empty → ✓ Balanced!
```

---

### Example ২: "(()" - Not Balanced ✗

```
String: "(()"

Character 1: '('
    Action: Push('(')
    Stack:
        ┌─────┐
        │  (  │
        └─────┘

Character 2: '('
    Action: Push('(')
    Stack:
        ┌─────┐
        │  (  │  ← Top
        ├─────┤
        │  (  │
        └─────┘

Character 3: ')'
    Action: Stack not empty, Pop()
    Stack:
        ┌─────┐
        │  (  │
        └─────┘

End: Stack NOT empty → ✗ Not Balanced!
     (একটা extra '(' আছে)
```

---

### Example ৩: "())" - Not Balanced ✗

```
String: "())"

Character 1: '('
    Action: Push('(')
    Stack:
        ┌─────┐
        │  (  │
        └─────┘

Character 2: ')'
    Action: Stack not empty, Pop()
    Stack: (empty)

Character 3: ')'
    Action: Stack empty! → return false immediately
    
Result: ✗ Not Balanced!
        (extra ')' আছে)
```

---

### Example ৪: ")(" - Not Balanced ✗

```
String: ")("

Character 1: ')'
    Action: Stack empty! → return false immediately

Result: ✗ Not Balanced!
        (close আগে এসেছে, open পরে)
```

---

### Visual Summary:

```
╔══════════════════════════════════════════════════════════════════╗
║              BALANCED PARENTHESES ALGORITHM                      ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║   Input: "(()())"                                                ║
║                                                                  ║
║   Step 1: '(' → Push     Stack: [(]                             ║
║   Step 2: '(' → Push     Stack: [(, (]                          ║
║   Step 3: ')' → Pop      Stack: [(]                             ║
║   Step 4: '(' → Push     Stack: [(, (]                          ║
║   Step 5: ')' → Pop      Stack: [(]                             ║
║   Step 6: ')' → Pop      Stack: []                              ║
║                                                                  ║
║   End: Stack empty → ✓ BALANCED                                 ║
║                                                                  ║
╠══════════════════════════════════════════════════════════════════╣
║                                                                  ║
║   RULES:                                                         ║
║   • '(' পেলে → Push                                              ║
║   • ')' পেলে → Pop (empty হলে return false)                     ║
║   • শেষে empty → Balanced ✓                                      ║
║   • শেষে not empty → Not Balanced ✗                             ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## Stack vs List - কখন কোনটা?

```
┌────────────────────────────────────────────────────────────────┐
│                    STACK vs LIST                               │
├─────────────────────────────┬──────────────────────────────────┤
│          STACK              │             LIST                 │
├─────────────────────────────┼──────────────────────────────────┤
│  LIFO - Last In First Out   │  Any order access                │
│  শুধু Top থেকে access       │  যেকোনো index থেকে access        │
│  Push, Pop, Peek            │  Add, Insert, Remove, []         │
├─────────────────────────────┼──────────────────────────────────┤
│  কখন use করবে:             │  কখন use করবে:                   │
│  • Undo/Redo                │  • General collection            │
│  • Back/Forward             │  • Random access দরকার          │
│  • Recursion simulation     │  • Sorting, Searching            │
│  • Expression evaluation    │  • Index দিয়ে কাজ               │
│  • Reverse করতে            │                                  │
└─────────────────────────────┴──────────────────────────────────┘
```

---

## Summary - Methods এক নজরে

### Creating:

| Code | কাজ |
|------|-----|
| `new Stack<T>()` | Empty stack |
| `new Stack<T>(collection)` | Collection থেকে |

### Main Operations:

| Method | কাজ | Returns |
|--------|-----|---------|
| `Push(item)` | Top এ রাখো | void |
| `Pop()` | Top থেকে নাও (remove) | item |
| `Peek()` | Top দেখো (no remove) | item |
| `TryPop(out item)` | Safe Pop | bool |
| `TryPeek(out item)` | Safe Peek | bool |

### Other:

| Method/Property | কাজ |
|-----------------|-----|
| `Count` | কতগুলো আছে |
| `Clear()` | সব মুছো |
| `Contains(item)` | আছে কিনা |
| `ToArray()` | Array তে convert |

---

## মনে রাখো

```
┌─────────────────────────────────────────────────────┐
│                    STACK                            │
├─────────────────────────────────────────────────────┤
│                                                     │
│         LIFO = Last In First Out                    │
│                                                     │
│         ┌─────┐                                     │
│         │ Top │ ← Push() / Pop() / Peek()          │
│         ├─────┤                                     │
│         │     │                                     │
│         ├─────┤                                     │
│         │     │                                     │
│         └─────┘                                     │
│                                                     │
│    থালার মতো - উপরে রাখো, উপর থেকে নাও!           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

**Next Part এ:** Queue<T> - First In First Out (FIFO) শিখবো!

---

*CPS Academy - Learn. Code. Grow.*
