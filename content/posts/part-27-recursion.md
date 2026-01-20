---
title: 'Part 27: Recursion'
date: '2026-01-20'
excerpt: 'Part 27: Recursion - নিজেকে নিজে call করা শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - recursion
  - methods
  - tutorial
draft: false
---

# Part 27: Recursion (নিজেকে নিজে Call করা)

ধরো তুমি দুইটা আয়নার মাঝে দাঁড়িয়ে আছো - একটা সামনে, একটা পেছনে।

কী দেখবে?

**অসীম reflection!** 😲

তোমার image এর মধ্যে তোমার image, তার মধ্যে আবার তোমার image... চলতেই থাকে!

**এটাই Recursion এর concept!**

Programming এ Recursion মানে - **একটা Method নিজেকে নিজে call করে।**

কিন্তু Recursion বুঝতে হলে আগে বুঝতে হবে - **Function call আসলে কীভাবে কাজ করে?**

---

## Function Call = Machine তৈরি করা

প্রতিটা function কে ভাবো একটা **Machine** হিসেবে।

```
Machine এর কাজ:
┌─────────────────────────────────────┐
│                                     │
│   Input → Processing → Output       │
│                                     │
└─────────────────────────────────────┘
```

**যখন তুমি একটা function call করো:**
1. Memory তে একটা **নতুন machine তৈরি** হয়
2. Machine টা **কাজ শুরু** করে
3. কাজ শেষ হলে machine টা **destroy** হয়ে যায়

---

## একটা Function আরেকটাকে Call করলে কী হয়?

```csharp
static void F2()
{
    Console.WriteLine("2");
}

static void F1()
{
    F2();  // F2 কে call করছে
    Console.WriteLine("1");
}

static void Main(string[] args)
{
    F1();  // F1 কে call করছে
}
```

**Step by Step কী হচ্ছে:**

```
Step 1: Main() machine তৈরি হলো
        Main() শুরু করলো
        
Step 2: Main() থেকে F1() call হলো
        → Main() PAUSED (থেমে গেলো, wait করছে)
        → F1() এর জন্য নতুন machine তৈরি হলো
        
Step 3: F1() শুরু করলো
        F1() থেকে F2() call হলো
        → F1() PAUSED
        → F2() এর জন্য নতুন machine তৈরি হলো
        
Step 4: F2() শুরু করলো
        Console.WriteLine("2") → Output: 2
        F2() শেষ → F2() machine DESTROYED
        
Step 5: F1() আবার চালু হলো (resume)
        Console.WriteLine("1") → Output: 1
        F1() শেষ → F1() machine DESTROYED
        
Step 6: Main() আবার চালু হলো
        Main() শেষ → Program শেষ
```

**Output:**
```
2
1
```

---

## Call Stack কী?

যখন function call হয়, সেটা **Stack** এ জমা হয়।

**Stack** = থালা-বাটির স্তূপ
- নতুন থালা **উপরে** রাখো
- নেওয়ার সময়ও **উপর থেকে** নাও
- এটাকে বলে **LIFO** (Last In, First Out)

---

### Call Stack Visualization:

```csharp
static void F2() { ... }
static void F1() { F2(); ... }
static void Main() { F1(); }
```

**Stack এ কী হচ্ছে:**

```
Step 1: Main() call
┌─────────────┐
│   Main()    │  ← Stack এ প্রথম machine
└─────────────┘

Step 2: Main() থেকে F1() call
┌─────────────┐
│    F1()     │  ← নতুন machine উপরে
├─────────────┤
│   Main()    │  ← Paused, wait করছে
└─────────────┘

Step 3: F1() থেকে F2() call
┌─────────────┐
│    F2()     │  ← নতুন machine উপরে
├─────────────┤
│    F1()     │  ← Paused
├─────────────┤
│   Main()    │  ← Paused
└─────────────┘

Step 4: F2() শেষ, return করলো
┌─────────────┐
│    F1()     │  ← F2 সরে গেছে, F1 resume
├─────────────┤
│   Main()    │
└─────────────┘

Step 5: F1() শেষ, return করলো
┌─────────────┐
│   Main()    │  ← F1 সরে গেছে, Main resume
└─────────────┘

Step 6: Main() শেষ
   (Empty Stack - Program শেষ)
```

---

## আরো Deeper Example

```csharp
static void F4() { Console.WriteLine("4"); }
static void F3() { F4(); Console.WriteLine("3"); }
static void F2() { F3(); Console.WriteLine("2"); }
static void F1() { F2(); Console.WriteLine("1"); }

static void Main(string[] args)
{
    F1();
}
```

**Call Chain:**

```
Main() → F1() → F2() → F3() → F4()
```

**Stack:**

```
┌─────────────┐
│    F4()     │
├─────────────┤
│    F3()     │
├─────────────┤
│    F2()     │
├─────────────┤
│    F1()     │
├─────────────┤
│   Main()    │
└─────────────┘
```

**Return হওয়ার সময় (উল্টা order):**

```
F4() prints "4" → destroyed
F3() prints "3" → destroyed
F2() prints "2" → destroyed
F1() prints "1" → destroyed
Main() শেষ
```

**Output:**
```
4
3
2
1
```

**লক্ষ্য করো:** Print হচ্ছে **4, 3, 2, 1** - মানে **উল্টা order এ!**

কারণ print statement আছে function call এর **পরে**, তাই return করার সময় execute হচ্ছে।

---

## এখন আসি Recursion এ!

**Recursion** মানে একটা function **নিজেকেই call করে**।

```csharp
static void F()
{
    Console.WriteLine("Hello");
    F();  // নিজেকে নিজে call করছে!
}
```

---

### Machine Analogy দিয়ে বুঝি:

যখন `Main()` থেকে `F()` call হয়:

1. `F()` এর জন্য একটা **machine তৈরি** হয়
2. এই `F()` আবার `F()` call করে
3. তাই **আরেকটা নতুন machine** তৈরি হয়
4. এই নতুন `F()` ও `F()` call করে
5. **আরেকটা machine...**
6. **চলতেই থাকে!** 😱

**গুরুত্বপূর্ণ:** Computer এর কাছে মনে হয় না "এই তো same function, আবার কেন করছি?"

তুমি বলেছো নতুন machine বানাও, সে বানাবে। **Forever!**

---

### Stack কী অবস্থা হয়?

```
┌─────────────┐
│    F()      │
├─────────────┤
│    F()      │
├─────────────┤
│    F()      │
├─────────────┤
│    F()      │
├─────────────┤
│    ...      │  ← চলতেই থাকবে!
├─────────────┤
│   Main()    │
└─────────────┘
```

কিন্তু **Memory সীমিত!**

Stack এ জায়গা শেষ হয়ে গেলে:

💥 **STACK OVERFLOW ERROR!**

---

## Base Case - থামার Condition

তাহলে Recursion কীভাবে কাজ করবে?

**উত্তর: Base Case!**

Base Case বলে দেয় - **কখন থামতে হবে**, কখন নতুন machine বানানো বন্ধ করতে হবে।

---

### Proper Recursion Structure:

```csharp
static void F(int n)
{
    // ┌─────────────────────────────────┐
    // │         BASE CASE               │
    // │    (থামার condition)            │
    // └─────────────────────────────────┘
    if (n <= 0)
    {
        return;  // থামো! নতুন machine বানাবে না!
    }
    
    Console.WriteLine(n);
    
    // ┌─────────────────────────────────┐
    // │       RECURSIVE CASE            │
    // │   (নিজেকে call, ছোট input)      │
    // └─────────────────────────────────┘
    F(n - 1);  // ছোট করে call করছি
}
```

---

### প্রথম Example: Countdown

```csharp
static void Countdown(int n)
{
    // Base Case
    if (n <= 0)
    {
        Console.WriteLine("Blast off! 🚀");
        return;
    }
    
    Console.WriteLine(n);
    
    // Recursive Case
    Countdown(n - 1);
}

static void Main(string[] args)
{
    Countdown(5);
}
```

**Output:**
```
5
4
3
2
1
Blast off! 🚀
```

---

### Step by Step Execution:

```
Main() calls Countdown(5)
│
├── n = 5, n > 0 তাই Base Case না
│   print "5"
│   Countdown(4) call করো
│   │
│   ├── n = 4, print "4"
│   │   Countdown(3) call করো
│   │   │
│   │   ├── n = 3, print "3"
│   │   │   Countdown(2) call করো
│   │   │   │
│   │   │   ├── n = 2, print "2"
│   │   │   │   Countdown(1) call করো
│   │   │   │   │
│   │   │   │   ├── n = 1, print "1"
│   │   │   │   │   Countdown(0) call করো
│   │   │   │   │   │
│   │   │   │   │   └── n = 0, BASE CASE!
│   │   │   │   │       print "Blast off! 🚀"
│   │   │   │   │       return (থামো!)
│   │   │   │   │
│   │   │   │   └── return
│   │   │   └── return
│   │   └── return
│   └── return
└── return

Program শেষ!
```

---

### Call Stack Visualization:

```
Countdown(5) call:
┌─────────────────┐
│  Countdown(5)   │
└─────────────────┘

Countdown(4) call:
┌─────────────────┐
│  Countdown(4)   │
├─────────────────┤
│  Countdown(5)   │  ← Paused, wait করছে
└─────────────────┘

Countdown(3) call:
┌─────────────────┐
│  Countdown(3)   │
├─────────────────┤
│  Countdown(4)   │
├─────────────────┤
│  Countdown(5)   │
└─────────────────┘

... এভাবে চলতে থাকে ...

Countdown(0) call - BASE CASE!
┌─────────────────┐
│  Countdown(0)   │  ← print "Blast off!", return
├─────────────────┤
│  Countdown(1)   │
├─────────────────┤
│  Countdown(2)   │
├─────────────────┤
│  Countdown(3)   │
├─────────────────┤
│  Countdown(4)   │
├─────────────────┤
│  Countdown(5)   │
└─────────────────┘

এখন একে একে সবাই return করবে, stack খালি হবে।
```

---

## Print Before vs After Recursive Call

এটা খুব **important concept!**

---

### Case 1: Print BEFORE Recursive Call

```csharp
static void PrintBefore(int n)
{
    if (n <= 0) return;
    
    Console.WriteLine(n);  // ← আগে print
    PrintBefore(n - 1);    // ← পরে call
}

// PrintBefore(5) → Output: 5 4 3 2 1
```

**কী হচ্ছে:**
- আগে print করে
- তারপর পরের machine এ যায়
- তাই **সোজা order** এ print হয়

---

### Case 2: Print AFTER Recursive Call

```csharp
static void PrintAfter(int n)
{
    if (n <= 0) return;
    
    PrintAfter(n - 1);     // ← আগে call
    Console.WriteLine(n);  // ← পরে print
}

// PrintAfter(5) → Output: 1 2 3 4 5
```

**কী হচ্ছে:**
- আগে পরের machine এ যায়
- সব machine তৈরি হয়ে যায়
- তারপর **return করার সময়** print হয়
- তাই **উল্টা order** এ print হয়

---

### Visual Comparison:

```
PrintBefore(3):                    PrintAfter(3):

PrintBefore(3)                     PrintAfter(3)
  │ print "3"                        │ call PrintAfter(2)
  │ call PrintBefore(2)              │   │ call PrintAfter(1)
  │   │ print "2"                    │   │   │ call PrintAfter(0)
  │   │ call PrintBefore(1)          │   │   │   │ return (base case)
  │   │   │ print "1"                │   │   │ print "1"
  │   │   │ call PrintBefore(0)      │   │ print "2"
  │   │   │   │ return               │ print "3"
  │   │   │ return                   
  │   │ return                       
  │ return                           

Output: 3 2 1                      Output: 1 2 3
```

---

### এটাকে বলে Backtracking!

**Backtracking** = Return করার সময় কাজ করা।

**Analogy:**
- সিঁড়ি দিয়ে নামছো (recursive calls)
- সিঁড়ি দিয়ে উঠছো (returns) এবং প্রতি step এ কিছু করছো

```
Going DOWN (Recursive Calls):
     Step 1
        ↓
     Step 2
        ↓
     Step 3
        ↓
     BASE (থামো!)

Coming UP (Returns - Backtracking):
     Step 1 ← কাজ করো
        ↑
     Step 2 ← কাজ করো
        ↑
     Step 3 ← কাজ করো
        ↑
     BASE
```

---

## Divide and Conquer

Recursion আসলে **Divide and Conquer** strategy এর implementation!

**Divide and Conquer মানে:**

1. **Divide:** বড় problem কে ছোট ছোট problem এ ভাগ করো
2. **Conquer:** ছোট problems solve করো
3. **Merge:** Solutions গুলো merge করে final answer বানাও

```
┌─────────────────────────────────────────────┐
│              BIG PROBLEM                    │
└─────────────────────────────────────────────┘
                    │
                    │ DIVIDE
                    ▼
┌──────────────┐    ┌──────────────┐
│ Small Prob 1 │    │ Small Prob 2 │
└──────────────┘    └──────────────┘
        │                  │
        │ CONQUER          │ CONQUER
        ▼                  ▼
┌──────────────┐    ┌──────────────┐
│  Solution 1  │    │  Solution 2  │
└──────────────┘    └──────────────┘
        │                  │
        └────────┬─────────┘
                 │ MERGE
                 ▼
        ┌──────────────┐
        │ FINAL ANSWER │
        └──────────────┘
```

---

## Classic Example 1: Factorial (!)

**Factorial** হলো 1 থেকে n পর্যন্ত সব সংখ্যার গুণফল।

```
5! = 5 × 4 × 3 × 2 × 1 = 120
4! = 4 × 3 × 2 × 1 = 24
3! = 3 × 2 × 1 = 6
2! = 2 × 1 = 2
1! = 1
0! = 1 (by definition)
```

---

### Divide and Conquer দিয়ে চিন্তা করি:

```
5! কে ভাঙো:
    5! = 5 × 4!
    
4! কে ভাঙো:
    4! = 4 × 3!
    
3! কে ভাঙো:
    3! = 3 × 2!
    
2! কে ভাঙো:
    2! = 2 × 1!
    
1! = 1 ← BASE CASE! (আর ভাঙা যাচ্ছে না)
```

**তাহলে Formula:**
```
n! = n × (n-1)!
1! = 1  (Base Case)
```

**এটা naturally recursive!**

---

### Factorial Code:

```csharp
static int Factorial(int n)
{
    // Base Case
    if (n <= 1)
    {
        return 1;
    }
    
    // Recursive Case: n! = n × (n-1)!
    int smallerResult = Factorial(n - 1);  // Divide: ছোট problem solve করো
    int result = n * smallerResult;         // Merge: combine করো
    
    return result;
}

static void Main(string[] args)
{
    Console.WriteLine($"5! = {Factorial(5)}");  // 120
    Console.WriteLine($"4! = {Factorial(4)}");  // 24
    Console.WriteLine($"3! = {Factorial(3)}");  // 6
}
```

---

### Step by Step: Factorial(5)

**Going DOWN (Divide করছি):**

```
Factorial(5) call হলো
│
├── n = 5
│   "আমি 5! চাই"
│   "আমার দরকার 4! এর result"
│   Factorial(4) call করো, wait করো...
│   │
│   ├── n = 4
│   │   "আমি 4! চাই"
│   │   "আমার দরকার 3! এর result"
│   │   Factorial(3) call করো, wait করো...
│   │   │
│   │   ├── n = 3
│   │   │   "আমি 3! চাই"
│   │   │   "আমার দরকার 2! এর result"
│   │   │   Factorial(2) call করো, wait করো...
│   │   │   │
│   │   │   ├── n = 2
│   │   │   │   "আমি 2! চাই"
│   │   │   │   "আমার দরকার 1! এর result"
│   │   │   │   Factorial(1) call করো, wait করো...
│   │   │   │   │
│   │   │   │   └── n = 1, BASE CASE!
│   │   │   │       return 1
```

**Coming UP (Merge করছি - Backtracking):**

```
│   │   │   │   │
│   │   │   │   └── 1 return হলো
│   │   │   │
│   │   │   └── 2! = 2 × 1 = 2 return করো
│   │   │
│   │   └── 3! = 3 × 2 = 6 return করো
│   │
│   └── 4! = 4 × 6 = 24 return করো
│
└── 5! = 5 × 24 = 120 return করো

Answer: 120
```

---

### আরো Visual:

```
GOING DOWN (Recursive Calls):
────────────────────────────────
Factorial(5)
    │ "5! = 5 × 4!, আমার 4! দরকার"
    ▼
Factorial(4)
    │ "4! = 4 × 3!, আমার 3! দরকার"
    ▼
Factorial(3)
    │ "3! = 3 × 2!, আমার 2! দরকার"
    ▼
Factorial(2)
    │ "2! = 2 × 1!, আমার 1! দরকার"
    ▼
Factorial(1)
    │ "1! = 1, BASE CASE!"
    │ return 1
────────────────────────────────

COMING UP (Merge - Backtracking):
────────────────────────────────
    │ 1 পেলাম
    ▲
Factorial(2): 2 × 1 = 2
    │ 2 পেলাম
    ▲
Factorial(3): 3 × 2 = 6
    │ 6 পেলাম
    ▲
Factorial(4): 4 × 6 = 24
    │ 24 পেলাম
    ▲
Factorial(5): 5 × 24 = 120
    │
    ▼
ANSWER: 120
────────────────────────────────
```

---

### Loop vs Recursion: Factorial

**Loop দিয়ে:**

```csharp
static int FactorialLoop(int n)
{
    int result = 1;
    
    for (int i = 1; i <= n; i++)
    {
        result = result * i;
    }
    
    return result;
}
```

**Recursion দিয়ে:**

```csharp
static int FactorialRecursion(int n)
{
    if (n <= 1) return 1;
    return n * FactorialRecursion(n - 1);
}
```

**দুইটাই same result দেয়!** কিন্তু চিন্তার ধরন আলাদা।

---

## Classic Example 2: Fibonacci Series

**Fibonacci Series:**
```
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...
```

**Pattern:**
- প্রথম দুইটা: 0, 1
- এরপর প্রতিটা = **আগের দুইটার যোগফল**

```
fib(0) = 0                        (Base Case)
fib(1) = 1                        (Base Case)
fib(2) = fib(1) + fib(0) = 1 + 0 = 1
fib(3) = fib(2) + fib(1) = 1 + 1 = 2
fib(4) = fib(3) + fib(2) = 2 + 1 = 3
fib(5) = fib(4) + fib(3) = 3 + 2 = 5
...
```

---

### Recursive Formula:

```
fib(n) = fib(n-1) + fib(n-2)    (when n > 1)
fib(0) = 0                      (Base Case)
fib(1) = 1                      (Base Case)
```

**এটা naturally recursive!** এবং **Divide and Conquer!**

- **Divide:** fib(n) কে ভাঙো fib(n-1) এবং fib(n-2) তে
- **Conquer:** দুইটা আলাদাভাবে solve করো
- **Merge:** দুইটার result যোগ করো

---

### Fibonacci Code:

```csharp
static int Fibonacci(int n)
{
    // Base Cases
    if (n == 0) return 0;
    if (n == 1) return 1;
    
    // Recursive Case: fib(n) = fib(n-1) + fib(n-2)
    int left = Fibonacci(n - 1);   // Divide: left part
    int right = Fibonacci(n - 2);  // Divide: right part
    
    return left + right;           // Merge: combine
}

static void Main(string[] args)
{
    Console.WriteLine("Fibonacci Series:");
    
    for (int i = 0; i <= 10; i++)
    {
        Console.Write($"{Fibonacci(i)} ");
    }
}
```

**Output:**
```
Fibonacci Series:
0 1 1 2 3 5 8 13 21 34 55
```

---

### Fibonacci(5) এর Recursive Tree:

Fibonacci তে **দুইটা** recursive call হয়, তাই এটা **tree** এর মতো:

```
                         fib(5)
                        /      \
                   fib(4)      fib(3)
                  /     \      /     \
              fib(3)  fib(2)  fib(2)  fib(1)
              /    \   /   \   /   \     |
          fib(2) fib(1) fib(1) fib(0) fib(1) fib(0)  1
          /   \    |      |      |      |      |
      fib(1) fib(0) 1     1      0      1      0
         |      |
         1      0
```

---

### Overlapping Subproblems!

**লক্ষ্য করো:**
- `fib(3)` **2 বার** calculate হচ্ছে
- `fib(2)` **3 বার** calculate হচ্ছে
- `fib(1)` **5 বার** calculate হচ্ছে
- `fib(0)` **3 বার** calculate হচ্ছে

**Same কাজ বারবার করছে!** এটাকে বলে **Overlapping Subproblems**।

এজন্য Naive Recursive Fibonacci **slow** (exponential time)।

পরে **Dynamic Programming** দিয়ে optimize করা যায় (সেটা অন্য topic)।

---

## Classic Example 3: Sum of Array

Array এর সব elements এর যোগফল বের করি recursion দিয়ে।

**Divide and Conquer চিন্তা:**

```
Sum([1, 2, 3, 4, 5])
= 1 + Sum([2, 3, 4, 5])        ← প্রথম element + বাকিদের sum
= 1 + 2 + Sum([3, 4, 5])
= 1 + 2 + 3 + Sum([4, 5])
= 1 + 2 + 3 + 4 + Sum([5])
= 1 + 2 + 3 + 4 + 5 + Sum([])
= 1 + 2 + 3 + 4 + 5 + 0        ← BASE CASE (empty array)
= 15
```

---

### Sum Code:

```csharp
static int Sum(int[] arr, int index)
{
    // Base Case: Array শেষ হয়ে গেছে
    if (index >= arr.Length)
    {
        return 0;
    }
    
    // Recursive Case: current element + বাকিদের sum
    int current = arr[index];
    int restSum = Sum(arr, index + 1);
    
    return current + restSum;
}

static void Main(string[] args)
{
    int[] numbers = { 1, 2, 3, 4, 5 };
    
    int total = Sum(numbers, 0);  // Index 0 থেকে শুরু
    
    Console.WriteLine($"Sum = {total}");  // 15
}
```

---

### Step by Step: Sum([1,2,3,4,5], 0)

```
GOING DOWN:
──────────────────────────────
Sum(arr, 0)
    │ "Index 0 এ 1 আছে, বাকিদের sum দরকার"
    ▼
Sum(arr, 1)
    │ "Index 1 এ 2 আছে, বাকিদের sum দরকার"
    ▼
Sum(arr, 2)
    │ "Index 2 এ 3 আছে, বাকিদের sum দরকার"
    ▼
Sum(arr, 3)
    │ "Index 3 এ 4 আছে, বাকিদের sum দরকার"
    ▼
Sum(arr, 4)
    │ "Index 4 এ 5 আছে, বাকিদের sum দরকার"
    ▼
Sum(arr, 5)
    │ "Index 5 নেই, BASE CASE!"
    │ return 0
──────────────────────────────

COMING UP (Backtracking):
──────────────────────────────
    │ 0 পেলাম
    ▲
Sum(arr, 4): 5 + 0 = 5
    │ 5 পেলাম
    ▲
Sum(arr, 3): 4 + 5 = 9
    │ 9 পেলাম
    ▲
Sum(arr, 2): 3 + 9 = 12
    │ 12 পেলাম
    ▲
Sum(arr, 1): 2 + 12 = 14
    │ 14 পেলাম
    ▲
Sum(arr, 0): 1 + 14 = 15
    │
    ▼
ANSWER: 15
──────────────────────────────
```

---

## Classic Example 4: Power (x^n)

```
2^4 = 2 × 2 × 2 × 2 = 16
```

**Recursive Formula:**
```
x^n = x × x^(n-1)    (when n > 0)
x^0 = 1              (Base Case)
```

---

### Power Code:

```csharp
static int Power(int baseNum, int exponent)
{
    // Base Case
    if (exponent == 0)
    {
        return 1;
    }
    
    // Recursive Case: x^n = x × x^(n-1)
    int smallerPower = Power(baseNum, exponent - 1);
    
    return baseNum * smallerPower;
}

static void Main(string[] args)
{
    Console.WriteLine($"2^4 = {Power(2, 4)}");    // 16
    Console.WriteLine($"3^3 = {Power(3, 3)}");    // 27
    Console.WriteLine($"5^0 = {Power(5, 0)}");    // 1
}
```

---

### Step by Step: Power(2, 4)

```
GOING DOWN:
──────────────────
Power(2, 4)
    │ "2^4 = 2 × 2^3 দরকার"
    ▼
Power(2, 3)
    │ "2^3 = 2 × 2^2 দরকার"
    ▼
Power(2, 2)
    │ "2^2 = 2 × 2^1 দরকার"
    ▼
Power(2, 1)
    │ "2^1 = 2 × 2^0 দরকার"
    ▼
Power(2, 0)
    │ "2^0 = 1, BASE CASE!"
    │ return 1
──────────────────

COMING UP:
──────────────────
    │ 1 পেলাম
    ▲
Power(2, 1): 2 × 1 = 2
    │ 2 পেলাম
    ▲
Power(2, 2): 2 × 2 = 4
    │ 4 পেলাম
    ▲
Power(2, 3): 2 × 4 = 8
    │ 8 পেলাম
    ▲
Power(2, 4): 2 × 8 = 16
    │
    ▼
ANSWER: 16
──────────────────
```

---

## Stack Overflow Error!

যদি **Base Case না থাকে** বা **Base Case এ কখনো না পৌঁছায়**:

```csharp
// ❌ BAD - Base Case নেই!
static void BadRecursion()
{
    Console.WriteLine("Hello");
    BadRecursion();  // চলতেই থাকবে!
}
```

```csharp
// ❌ BAD - Base Case এ পৌঁছাবে না!
static void AlsoBad(int n)
{
    if (n == 0) return;  // Base Case আছে
    
    AlsoBad(n + 1);  // কিন্তু n বাড়ছে! 0 তে কখনো পৌঁছাবে না!
}

AlsoBad(5);  // 5 → 6 → 7 → 8 → ... → Stack Overflow!
```

---

### Stack Overflow Avoid করার Rules:

1. ✅ **সবসময় Base Case রাখো**
2. ✅ **প্রতিটা recursive call এ problem ছোট হচ্ছে কিনা নিশ্চিত করো**
3. ✅ **Base Case এ পৌঁছানো সম্ভব কিনা verify করো**

```csharp
// ✅ GOOD
static void GoodRecursion(int n)
{
    if (n <= 0) return;  // Base Case আছে
    
    Console.WriteLine(n);
    GoodRecursion(n - 1);  // n ছোট হচ্ছে, তাই Base Case এ পৌঁছাবে
}
```

---

## Real Example 1: String Reverse

**Recursive চিন্তা:**

```
Reverse("Hello")
= Reverse("ello") + 'H'
= Reverse("llo") + 'e' + 'H'
= Reverse("lo") + 'l' + 'e' + 'H'
= Reverse("o") + 'l' + 'l' + 'e' + 'H'
= "o" + 'l' + 'l' + 'e' + 'H'
= "olleH"
```

---

### String Reverse Code:

```csharp
static string Reverse(string text)
{
    // Base Case: Empty বা single character
    if (text.Length <= 1)
    {
        return text;
    }
    
    // Recursive Case:
    // Reverse(বাকি string) + প্রথম character
    char firstChar = text[0];
    string rest = text.Substring(1);
    
    return Reverse(rest) + firstChar;
}

static void Main(string[] args)
{
    Console.WriteLine(Reverse("Hello"));       // olleH
    Console.WriteLine(Reverse("Bangladesh"));  // hsedalgnaB
    Console.WriteLine(Reverse("A"));           // A
}
```

---

## Real Example 2: Palindrome Check

**Palindrome** = সামনে থেকে পড়লেও same, পেছন থেকে পড়লেও same।

Examples: "madam", "radar", "level"

**Recursive চিন্তা:**

```
IsPalindrome("madam")
    ↓
প্রথম ('m') == শেষ ('m')? ✅ YES
    ↓
মাঝেরটা check করো: IsPalindrome("ada")
    ↓
প্রথম ('a') == শেষ ('a')? ✅ YES
    ↓
মাঝেরটা check করো: IsPalindrome("d")
    ↓
Single character → BASE CASE → true!
```

---

### Palindrome Code:

```csharp
static bool IsPalindrome(string text)
{
    // Base Case
    if (text.Length <= 1)
    {
        return true;
    }
    
    // প্রথম আর শেষ character same না হলে false
    if (text[0] != text[text.Length - 1])
    {
        return false;
    }
    
    // Recursive Case: মাঝেরটা check করো
    string middle = text.Substring(1, text.Length - 2);
    return IsPalindrome(middle);
}

static void Main(string[] args)
{
    Console.WriteLine(IsPalindrome("madam"));  // True
    Console.WriteLine(IsPalindrome("radar"));  // True
    Console.WriteLine(IsPalindrome("hello"));  // False
}
```

---

## Real Example 3: GCD (Greatest Common Divisor)

**Euclidean Algorithm:**

```
GCD(48, 18)
= GCD(18, 48 % 18)
= GCD(18, 12)
= GCD(12, 18 % 12)
= GCD(12, 6)
= GCD(6, 12 % 6)
= GCD(6, 0)
= 6  ← BASE CASE! (b == 0 হলে a-ই answer)
```

---

### GCD Code:

```csharp
static int GCD(int a, int b)
{
    // Base Case
    if (b == 0)
    {
        return a;
    }
    
    // Recursive Case
    return GCD(b, a % b);
}

static void Main(string[] args)
{
    Console.WriteLine($"GCD(48, 18) = {GCD(48, 18)}");   // 6
    Console.WriteLine($"GCD(100, 25) = {GCD(100, 25)}"); // 25
}
```

---

## Real Example 4: Count Digits

```
CountDigits(12345)
= 1 + CountDigits(1234)
= 1 + 1 + CountDigits(123)
= 1 + 1 + 1 + CountDigits(12)
= 1 + 1 + 1 + 1 + CountDigits(1)
= 1 + 1 + 1 + 1 + 1  (Base Case: single digit)
= 5
```

---

### Count Digits Code:

```csharp
static int CountDigits(int n)
{
    n = Math.Abs(n);  // Negative handle
    
    // Base Case: Single digit
    if (n < 10)
    {
        return 1;
    }
    
    // Recursive Case
    return 1 + CountDigits(n / 10);
}

static void Main(string[] args)
{
    Console.WriteLine(CountDigits(12345));   // 5
    Console.WriteLine(CountDigits(7));       // 1
    Console.WriteLine(CountDigits(-999));    // 3
}
```

---

## Real Example 5: Sum of Digits

```
SumDigits(123)
= 3 + SumDigits(12)
= 3 + 2 + SumDigits(1)
= 3 + 2 + 1  (Base Case)
= 6
```

---

### Sum of Digits Code:

```csharp
static int SumDigits(int n)
{
    n = Math.Abs(n);
    
    // Base Case: Single digit
    if (n < 10)
    {
        return n;
    }
    
    // Recursive Case: শেষ digit + বাকিদের sum
    int lastDigit = n % 10;
    int rest = n / 10;
    
    return lastDigit + SumDigits(rest);
}

static void Main(string[] args)
{
    Console.WriteLine(SumDigits(123));    // 6
    Console.WriteLine(SumDigits(9999));   // 36
}
```

---

## Bonus: Tower of Hanoi

এটা recursion এর **classic problem!**

**Problem:**
- 3 টা রড আছে: A, B, C
- A তে কিছু disk আছে (ছোট উপরে, বড় নিচে)
- সব disk A থেকে C তে নিতে হবে

**Rules:**
- একবারে একটাই disk সরানো যাবে
- বড় disk ছোট disk এর উপর রাখা যাবে না

---

### Tower of Hanoi Visualization:

```
Start:                          Goal:
   |        |        |             |        |        |
  [=]       |        |             |        |       [=]
 [===]      |        |             |        |      [===]
[=====]     |        |             |        |     [=====]
───┴───  ───┴───  ───┴───       ───┴───  ───┴───  ───┴───
   A        B        C             A        B        C
```

---

### Recursive চিন্তা:

**n টা disk A থেকে C তে নিতে হলে:**

1. উপরের (n-1) টা disk A থেকে B তে সরাও (C কে helper হিসেবে use করো)
2. সবচেয়ে বড় disk টা A থেকে C তে সরাও
3. B তে থাকা (n-1) টা disk B থেকে C তে সরাও (A কে helper হিসেবে use করো)

---

### Tower of Hanoi Code:

```csharp
static void TowerOfHanoi(int n, char source, char destination, char auxiliary)
{
    // Base Case: 1 টা disk
    if (n == 1)
    {
        Console.WriteLine($"Move disk 1 from {source} to {destination}");
        return;
    }
    
    // Step 1: (n-1) disks source → auxiliary
    TowerOfHanoi(n - 1, source, auxiliary, destination);
    
    // Step 2: Largest disk source → destination
    Console.WriteLine($"Move disk {n} from {source} to {destination}");
    
    // Step 3: (n-1) disks auxiliary → destination
    TowerOfHanoi(n - 1, auxiliary, destination, source);
}

static void Main(string[] args)
{
    Console.WriteLine("Tower of Hanoi (3 disks):\n");
    TowerOfHanoi(3, 'A', 'C', 'B');
}
```

**Output:**
```
Tower of Hanoi (3 disks):

Move disk 1 from A to C
Move disk 2 from A to B
Move disk 1 from C to B
Move disk 3 from A to C
Move disk 1 from B to A
Move disk 2 from B to C
Move disk 1 from A to C
```

---

## Recursion vs Iteration (Loop)

| Feature | Recursion | Loop |
|---------|-----------|------|
| **Code** | প্রায়ই shorter | সাধারণত longer |
| **Readability** | Naturally recursive problems এ better | Simple iterations এ better |
| **Memory** | Stack use করে (বেশি memory) | কম memory |
| **Speed** | Function call overhead আছে | সাধারণত faster |
| **Stack Overflow** | সম্ভব | সমস্যা না |
| **Best For** | Tree, Graph, Divide & Conquer | Simple counting, iteration |

---

### কখন Recursion Use করবে?

✅ **Use করো:**
- Problem naturally recursive (Factorial, Fibonacci, Tree traversal)
- Divide and Conquer approach
- Backtracking problems
- Code clarity বেশি important

❌ **Avoid করো:**
- Simple loop দিয়ে হয়ে যায়
- Performance critical
- Very deep recursion হতে পারে

---

## Complete Example: All Recursion Functions

```csharp
class Program
{
    // Factorial
    static long Factorial(int n)
    {
        if (n <= 1) return 1;
        return n * Factorial(n - 1);
    }
    
    // Fibonacci
    static int Fibonacci(int n)
    {
        if (n <= 1) return n;
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
    
    // Power
    static long Power(int baseNum, int exp)
    {
        if (exp == 0) return 1;
        return baseNum * Power(baseNum, exp - 1);
    }
    
    // Sum of Array
    static int SumArray(int[] arr, int index)
    {
        if (index >= arr.Length) return 0;
        return arr[index] + SumArray(arr, index + 1);
    }
    
    // Reverse String
    static string ReverseString(string s)
    {
        if (s.Length <= 1) return s;
        return ReverseString(s.Substring(1)) + s[0];
    }
    
    // Palindrome
    static bool IsPalindrome(string s)
    {
        if (s.Length <= 1) return true;
        if (s[0] != s[s.Length - 1]) return false;
        return IsPalindrome(s.Substring(1, s.Length - 2));
    }
    
    // GCD
    static int GCD(int a, int b)
    {
        if (b == 0) return a;
        return GCD(b, a % b);
    }
    
    // Count Digits
    static int CountDigits(int n)
    {
        if (n < 10) return 1;
        return 1 + CountDigits(n / 10);
    }
    
    // Sum of Digits
    static int SumDigits(int n)
    {
        if (n < 10) return n;
        return (n % 10) + SumDigits(n / 10);
    }
    
    static void PrintLine(char c = '─', int len = 50)
    {
        Console.WriteLine(new string(c, len));
    }
    
    static void Main(string[] args)
    {
        Console.WriteLine("╔══════════════════════════════════════════════════╗");
        Console.WriteLine("║         🔄 RECURSION DEMONSTRATION               ║");
        Console.WriteLine("╚══════════════════════════════════════════════════╝\n");
        
        // Factorial
        Console.WriteLine("📌 FACTORIAL:");
        PrintLine();
        for (int i = 0; i <= 7; i++)
        {
            Console.WriteLine($"   {i}! = {Factorial(i)}");
        }
        Console.WriteLine();
        
        // Fibonacci
        Console.WriteLine("📌 FIBONACCI:");
        PrintLine();
        Console.Write("   ");
        for (int i = 0; i <= 12; i++)
        {
            Console.Write($"{Fibonacci(i)} ");
        }
        Console.WriteLine("\n");
        
        // Power
        Console.WriteLine("📌 POWER:");
        PrintLine();
        Console.WriteLine($"   2^10 = {Power(2, 10)}");
        Console.WriteLine($"   3^5  = {Power(3, 5)}");
        Console.WriteLine();
        
        // Sum Array
        Console.WriteLine("📌 SUM OF ARRAY:");
        PrintLine();
        int[] arr = { 10, 20, 30, 40, 50 };
        Console.Write("   Array: ");
        foreach (int n in arr) Console.Write($"{n} ");
        Console.WriteLine($"\n   Sum: {SumArray(arr, 0)}");
        Console.WriteLine();
        
        // Reverse
        Console.WriteLine("📌 STRING REVERSE:");
        PrintLine();
        Console.WriteLine($"   'Hello' → '{ReverseString("Hello")}'");
        Console.WriteLine($"   'Bangladesh' → '{ReverseString("Bangladesh")}'");
        Console.WriteLine();
        
        // Palindrome
        Console.WriteLine("📌 PALINDROME:");
        PrintLine();
        string[] words = { "madam", "radar", "hello", "level" };
        foreach (string word in words)
        {
            string result = IsPalindrome(word) ? "✅ Yes" : "❌ No";
            Console.WriteLine($"   '{word}' → {result}");
        }
        Console.WriteLine();
        
        // GCD
        Console.WriteLine("📌 GCD:");
        PrintLine();
        Console.WriteLine($"   GCD(48, 18) = {GCD(48, 18)}");
        Console.WriteLine($"   GCD(100, 25) = {GCD(100, 25)}");
        Console.WriteLine();
        
        // Count & Sum Digits
        Console.WriteLine("📌 DIGIT OPERATIONS:");
        PrintLine();
        Console.WriteLine($"   Digits in 12345: {CountDigits(12345)}");
        Console.WriteLine($"   Sum of digits in 12345: {SumDigits(12345)}");
        
        Console.WriteLine();
        PrintLine('═', 50);
    }
}
```

---

## Summary

### Recursion কী?

**একটা function নিজেকে নিজে call করে।**

প্রতিটা call এ **নতুন machine (stack frame)** তৈরি হয়।

---

### দুইটা Essential Part:

| Part | কাজ | না থাকলে? |
|------|-----|-----------|
| **Base Case** | থামার condition | Stack Overflow! |
| **Recursive Case** | নিজেকে call (ছোট problem) | Problem solve হবে না |

---

### Divide and Conquer:

```
Recursion = Divide and Conquer এর Implementation

1. DIVIDE: বড় problem → ছোট problems
2. CONQUER: ছোট problems solve করো (recursively)
3. MERGE: Results combine করো (backtracking এ)
```

---

### Key Concepts:

| Concept | মানে |
|---------|------|
| **Call Stack** | Function calls এর stack (LIFO) |
| **Base Case** | থামার condition |
| **Recursive Case** | নিজেকে call করা |
| **Backtracking** | Return করার সময় কাজ করা |
| **Overlapping Subproblems** | Same calculation বারবার (Fibonacci) |
| **Stack Overflow** | Stack memory শেষ হয়ে গেলে error |

---

### Classic Examples:

| Problem | Base Case | Recursive Case |
|---------|-----------|----------------|
| Factorial | n ≤ 1 → 1 | n × Factorial(n-1) |
| Fibonacci | n ≤ 1 → n | Fib(n-1) + Fib(n-2) |
| Power | exp == 0 → 1 | base × Power(base, exp-1) |
| Sum Array | index ≥ Length → 0 | arr[i] + Sum(arr, i+1) |
| Reverse | Length ≤ 1 → s | Reverse(rest) + first |
| Palindrome | Length ≤ 1 → true | first == last && IsPal(middle) |
| GCD | b == 0 → a | GCD(b, a % b) |

---

### মনে রাখো:

1. **Function call = নতুন Machine তৈরি**
2. **Caller machine paused থাকে** যতক্ষণ callee শেষ না হয়
3. **Base Case অবশ্যই থাকতে হবে** - না থাকলে Stack Overflow!
4. **প্রতিটা call এ problem ছোট হতে হবে**
5. **Print আগে** = সোজা order, **Print পরে** = উল্টা order (Backtracking)

---

**Next Part এ:** Collections Introduction - List, Dictionary, Stack, Queue শিখবো!

---

*CPS Academy - Learn. Code. Grow.*
