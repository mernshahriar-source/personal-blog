---
title: "Lesson 6.3: Methods Advanced — Overloading, Optional, ref/out"
date: "2026-03-23"
excerpt: "Method Overloading (same নামে multiple methods), Optional Parameters (default value), params keyword (variable arguments), ref keyword (pass by reference), out keyword (multiple return), এ�"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - methods
  - functions
  - strings
draft: false
---


> **এই Lesson এ শিখবে:** Method Overloading (same নামে multiple methods), Optional Parameters (default value), params keyword (variable arguments), ref keyword (pass by reference), out keyword (multiple return), এবং array pass করা।

---

## Method Overloading কী?

**Overloading** = একই নামে একাধিক method, কিন্তু **parameters আলাদা।**

C# parameters দেখে বুঝে যায় কোন version call করতে চাইছো:

```csharp
// Version 1: শুধু message
static void Print(string message)
{
    Console.WriteLine(message);
}

// Version 2: message + কতবার
static void Print(string message, int times)
{
    for (int i = 0; i < times; i++)
        Console.WriteLine(message);
}

// Version 3: message + কতবার + prefix
static void Print(string message, int times, string prefix)
{
    for (int i = 0; i < times; i++)
        Console.WriteLine($"{prefix} {message}");
}

static void Main(string[] args)
{
    Print("Hello");                    // Version 1
    Print("Welcome", 3);              // Version 2
    Print("Important!", 2, ">>>");    // Version 3
}
```

### Overloading Rules:

```csharp
// ✅ Different parameter count
static int Add(int a, int b) { ... }
static int Add(int a, int b, int c) { ... }

// ✅ Different parameter types
static void Show(int x) { ... }
static void Show(string x) { ... }

// ❌ শুধু return type different হলে হবে না!
static int Add(int a, int b) { ... }
static double Add(int a, int b) { ... }  // Error!
```

---

## Example: Overloaded Calculator

```csharp
static int Add(int a, int b) { return a + b; }
static int Add(int a, int b, int c) { return a + b + c; }
static double Add(double a, double b) { return a + b; }

static void Main(string[] args)
{
    Console.WriteLine(Add(5, 3));           // 8 (int, int)
    Console.WriteLine(Add(5, 3, 2));        // 10 (int, int, int)
    Console.WriteLine(Add(3.5, 2.7));       // 6.2 (double, double)
}
```

---

## Optional Parameters

কিছু parameter **দিলেও চলে, না দিলেও চলে** — default value সেট করো:

```csharp
static void Greet(string name, string greeting = "Hello", string punctuation = "!")
{
    Console.WriteLine($"{greeting}, {name}{punctuation}");
}

static void Main(string[] args)
{
    Greet("Rahim");                          // Hello, Rahim!
    Greet("Karim", "Hi");                    // Hi, Karim!
    Greet("Jabbar", "Good Morning", "!!");   // Good Morning, Jabbar!!
}
```

### Rules:
- Required parameters **আগে**, optional **পরে**
- Optional parameter এর default value **constant** হতে হবে

```csharp
// ✅ Correct
static void Test(string name, int age = 18)

// ❌ Wrong — optional আগে!
static void Test(int age = 18, string name)  // Error!
```

---

## params Keyword — যত ইচ্ছা Arguments

```csharp
static int Sum(params int[] numbers)
{
    int total = 0;
    foreach (int num in numbers)
        total += num;
    return total;
}

static void Main(string[] args)
{
    Console.WriteLine(Sum(5, 3));               // 8
    Console.WriteLine(Sum(1, 2, 3, 4, 5));      // 15
    Console.WriteLine(Sum(10, 20, 30));          // 60
    Console.WriteLine(Sum());                    // 0
}
```

`params int[] numbers` মানে — যত ইচ্ছা int দাও, সব array হয়ে যাবে!

### Rules:
- `params` **শেষে** থাকতে হবে
- একটা method এ **একটাই** `params`

```csharp
// ✅ Correct — params শেষে
static void Test(string name, params int[] scores)

// ❌ Wrong — params শেষে নেই
static void Test(params int[] scores, string name)
```

---

## ref Keyword — Pass by Reference

সাধারণত argument এর **copy** যায়। `ref` দিলে **same variable** যায়:

### Without ref (copy):

```csharp
static void DoubleIt(int number)
{
    number = number * 2;  // Copy change হচ্ছে
}

int x = 10;
DoubleIt(x);
Console.WriteLine(x);  // 10 (unchanged!)
```

### With ref (reference):

```csharp
static void DoubleIt(ref int number)
{
    number = number * 2;  // Original change হচ্ছে!
}

int x = 10;
DoubleIt(ref x);          // Call এও ref!
Console.WriteLine(x);     // 20 (changed!)
```

### Classic Example: Swap

```csharp
static void Swap(ref int a, ref int b)
{
    int temp = a;
    a = b;
    b = temp;
}

int x = 10, y = 20;
Swap(ref x, ref y);
Console.WriteLine($"x={x}, y={y}");  // x=20, y=10
```

---

## out Keyword — Multiple Values Return

Method সাধারণত **একটাই** value return করে। কিন্তু **out** দিয়ে একাধিক value ফেরত পাঠানো যায়:

```csharp
static void Divide(int a, int b, out int quotient, out int remainder)
{
    quotient = a / b;
    remainder = a % b;
}

static void Main(string[] args)
{
    int q, r;
    Divide(17, 5, out q, out r);
    Console.WriteLine($"17 ÷ 5 = {q} remainder {r}");  // 3 remainder 2
}
```

### ref vs out:

| Feature | ref | out |
|---------|-----|-----|
| Call এর আগে initialize | **হ্যাঁ, দরকার** | না, দরকার নেই |
| Method এ value দেওয়া | Optional | **অবশ্যই দিতে হবে** |
| Use case | Modify existing | Return multiple |

---

## Array Pass করা Method এ

Array automatically **reference** হিসেবে যায় (ref দিতে হয় না):

```csharp
static void DoubleAll(int[] numbers)
{
    for (int i = 0; i < numbers.Length; i++)
        numbers[i] *= 2;
}

int[] marks = { 10, 20, 30 };
DoubleAll(marks);

foreach (int m in marks)
    Console.Write(m + " ");
// Output: 20 40 60  (original changed!)
```

---

## Complete Example: Student Grade System

```csharp
static double CalculateAverage(params int[] marks)
{
    int sum = 0;
    foreach (int m in marks)
        sum += m;
    return (double)sum / marks.Length;
}

static string GetGrade(double avg)
{
    if (avg >= 90) return "A+";
    else if (avg >= 80) return "A";
    else if (avg >= 70) return "B";
    else if (avg >= 60) return "C";
    else if (avg >= 40) return "D";
    else return "F";
}

static void PrintResult(string name, params int[] marks)
{
    double avg = CalculateAverage(marks);
    string grade = GetGrade(avg);
    Console.WriteLine($"{name}: Average = {avg:F1}, Grade = {grade}");
}

static void Main(string[] args)
{
    PrintResult("Rahim", 85, 90, 78);
    PrintResult("Karim", 92, 88, 95, 90);
    PrintResult("Jabbar", 35, 42, 28);
}
```

Output:
```
Rahim: Average = 84.3, Grade = A
Karim: Average = 91.3, Grade = A+
Jabbar: Average = 35.0, Grade = F
```

---

## Summary

| Concept | মানে |
|---------|------|
| **Overloading** | Same নামে, different parameters |
| **Optional** | Default value সহ parameter |
| **params** | যত ইচ্ছা arguments (array হয়ে যায়) |
| **ref** | Same variable pass করা (original change হয়) |
| **out** | Multiple values return করা |

### Quick Reference:

```csharp
// Overloading
static int Add(int a, int b) { ... }
static int Add(int a, int b, int c) { ... }

// Optional
static void Greet(string name, string msg = "Hello") { ... }

// params
static int Sum(params int[] numbers) { ... }

// ref
static void Double(ref int x) { x *= 2; }

// out
static void Divide(int a, int b, out int remainder) { ... }
```

### Rules মনে রাখো:

| Feature | Rule |
|---------|------|
| Overloading | শুধু return type different হলে হবে না |
| Optional | Required আগে, Optional পরে |
| params | একটাই, শেষে থাকতে হবে |
| ref | Call এর আগে initialize করতে হবে |
| out | Method এ অবশ্যই value দিতে হবে |

---

**পরের Lesson:** Recursion — Method যখন নিজেকে নিজে call করে!

---

*CPS Academy - Learn. Code. Grow.*
