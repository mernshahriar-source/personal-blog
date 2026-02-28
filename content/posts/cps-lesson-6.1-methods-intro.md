---
title: "Lesson 6.1: Methods — নিজের Function বানানো"
date: "2026-03-21"
excerpt: "Method কী ও কেন দরকার, method syntax (static, void, return type), parameter ও argument, return value, method execution flow, named arguments, এবং real-world examples"
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


> **এই Lesson এ শিখবে:** Method কী ও কেন দরকার, method syntax (static, void, return type), parameter ও argument, return value, method execution flow, named arguments, এবং real-world examples।

---

## Method কেন দরকার?

ধরো 3 জন student কে welcome করতে হবে:

```csharp
// ❌ Same code বারবার!
Console.WriteLine("═══════════════════════════");
Console.WriteLine("🎉 WELCOME!");
Console.WriteLine("Hello Rahim!");
Console.WriteLine();

Console.WriteLine("═══════════════════════════");
Console.WriteLine("🎉 WELCOME!");
Console.WriteLine("Hello Karim!");
Console.WriteLine();

// ... 100 জন হলে 100 বার copy-paste?
```

**Method দিয়ে:**

```csharp
static void WelcomeStudent(string name)
{
    Console.WriteLine("═══════════════════════════");
    Console.WriteLine("🎉 WELCOME!");
    Console.WriteLine($"Hello {name}!");
    Console.WriteLine();
}

static void Main(string[] args)
{
    WelcomeStudent("Rahim");
    WelcomeStudent("Karim");
    WelcomeStudent("Jabbar");
}
```

**একবার লেখো, যতবার ইচ্ছা call করো!**

---

## Method কী?

Method হলো **code এর একটা block** যার একটা **নাম** আছে। নাম ধরে ডাকলে কাজ করে।

| Real Life | Method |
|-----------|--------|
| "চা বানাও" | একবার শিখিয়ে দাও, তারপর শুধু বলো |
| "বাজারে যাও" | সে জানে কী করতে হবে |

---

## Method Syntax

```csharp
static void SayHello()
{
    Console.WriteLine("Hello, World!");
}
```

```
static void SayHello()
  ↑     ↑      ↑     ↑
  │     │      │     └── () = Parameter list
  │     │      └── Method এর নাম (PascalCase)
  │     └── Return type (void = কিছু return করে না)
  └── static (Main থেকে call করতে দরকার)
```

---

## Method Call করা

```csharp
class Program
{
    static void SayHello()
    {
        Console.WriteLine("Hello!");
    }

    static void Main(string[] args)
    {
        SayHello();   // Call!
        SayHello();   // আবার call!
    }
}
```

**Method কোথায় লিখবে?** `class` এর ভিতরে, `Main()` এর **বাইরে**।

---

## Execution Flow

```csharp
static void SayHello()
{
    Console.WriteLine("Hello!");       // Step 2
    Console.WriteLine("How are you?"); // Step 3
}

static void Main(string[] args)
{
    Console.WriteLine("Starting...");  // Step 1
    SayHello();                        // Jump →
    Console.WriteLine("Ending...");    // Step 4
}
```

```
Main() → "Starting..." → SayHello() → "Hello!" → "How are you?" → ফেরত → "Ending..."
```

---

## Parameters (Input দেওয়া)

Method কে data পাঠাতে parameter use করো:

```csharp
static void Greet(string name)
{
    Console.WriteLine($"Hello, {name}!");
}

static void Main(string[] args)
{
    Greet("Rahim");    // Output: Hello, Rahim!
    Greet("Karim");    // Output: Hello, Karim!
}
```

### Multiple Parameters:

```csharp
static void Greet(string name, int age)
{
    Console.WriteLine($"{name} is {age} years old.");
}

Greet("Rahim", 20);  // Rahim is 20 years old.
```

### Parameter vs Argument:

| Term | কী | কোথায় |
|------|-----|--------|
| **Parameter** | Placeholder (জায়গা) | Method definition এ |
| **Argument** | Actual value | Method call এ |

```csharp
static void Greet(string name)  // name = parameter
Greet("Rahim");                 // "Rahim" = argument
```

### ⚠️ Order Matters!

```csharp
static void Info(string name, int age) { ... }

Info("Rahim", 20);  // ✅ Correct order
Info(20, "Rahim");  // ❌ Error!
```

### Named Arguments (Order ছাড়া):

```csharp
Info(age: 22, name: "Karim");  // ✅ Works!
```

---

## Return Value (Output পাওয়া)

### void = কিছু return করে না:

```csharp
static void SayHello()
{
    Console.WriteLine("Hello!");  // শুধু print, return নেই
}
```

### Return type দিলে = value ফেরত দেয়:

```csharp
static int Add(int a, int b)
{
    return a + b;
}

static void Main(string[] args)
{
    int result = Add(5, 3);               // result = 8
    Console.WriteLine(Add(10, 20));        // 30
    int total = Add(5, 3) + Add(10, 7);   // 25
}
```

### বিভিন্ন Return Type:

```csharp
static int Add(int a, int b)          // int return
static double Divide(int a, int b)    // double return
static string GetName()               // string return
static bool IsEven(int num)           // bool return
```

### ⚠️ return এর পর code চলে না!

```csharp
static int GetNumber()
{
    return 10;
    Console.WriteLine("Never prints!");  // Unreachable!
}
```

---

## Example: Calculator 🧮

```csharp
static int Add(int a, int b)      { return a + b; }
static int Subtract(int a, int b) { return a - b; }
static int Multiply(int a, int b) { return a * b; }

static double Divide(int a, int b)
{
    if (b == 0) { Console.WriteLine("Error: ÷ by 0!"); return 0; }
    return (double)a / b;
}

static void Main(string[] args)
{
    int x = 20, y = 5;
    Console.WriteLine($"{x} + {y} = {Add(x, y)}");
    Console.WriteLine($"{x} - {y} = {Subtract(x, y)}");
    Console.WriteLine($"{x} × {y} = {Multiply(x, y)}");
    Console.WriteLine($"{x} ÷ {y} = {Divide(x, y)}");
}
```

---

## Example: Grade Calculator 📊

```csharp
static string GetGrade(int marks)
{
    if (marks >= 90) return "A+";
    else if (marks >= 80) return "A";
    else if (marks >= 70) return "B";
    else if (marks >= 60) return "C";
    else if (marks >= 40) return "D";
    else return "F";
}

static void Main(string[] args)
{
    string[] names = { "Rahim", "Karim", "Jabbar" };
    int[] marks = { 92, 78, 35 };

    for (int i = 0; i < names.Length; i++)
    {
        string grade = GetGrade(marks[i]);
        Console.WriteLine($"{names[i]}: {marks[i]} → {grade}");
    }
}
```

Output:
```
Rahim: 92 → A+
Karim: 78 → B
Jabbar: 35 → F
```

---

## Example: Area Calculator 📐

```csharp
static double SquareArea(double side) { return side * side; }
static double RectangleArea(double l, double w) { return l * w; }
static double CircleArea(double r) { return 3.1416 * r * r; }
static double TriangleArea(double b, double h) { return 0.5 * b * h; }

static void Main(string[] args)
{
    Console.WriteLine($"Square (5):         {SquareArea(5)}");
    Console.WriteLine($"Rectangle (10×4):   {RectangleArea(10, 4)}");
    Console.WriteLine($"Circle (r=7):       {CircleArea(7):F2}");
    Console.WriteLine($"Triangle (8×5):     {TriangleArea(8, 5)}");
}
```

---

## Method এর সুবিধা

| সুবিধা | ব্যাখ্যা |
|---------|----------|
| **Reusability** | একবার লেখো, বারবার use করো |
| **Readability** | `CalculateArea()` পড়লেই বোঝা যায় |
| **Easy Debugging** | Bug হলে শুধু সেই method fix করো |
| **Maintainability** | Design change একবারই করো |

---

## Common Mistakes

### Mistake 1: () ভুলে যাওয়া

```csharp
SayHello;    // ❌ () নেই!
SayHello();  // ✓
```

### Mistake 2: void method এর return ধরা

```csharp
static void SayHello() { Console.WriteLine("Hi"); }

string x = SayHello();  // ❌ void কিছু return করে না!
```

### Mistake 3: Return type mismatch

```csharp
static int Add(int a, int b)
{
    return "hello";  // ❌ int চেয়েছে, string দিচ্ছে!
}
```

---

## Summary

| Concept | মানে |
|---------|------|
| Method | Code এর named block |
| void | কিছু return করে না |
| Parameter | Method এর input (placeholder) |
| Argument | Call এ actual value |
| return | Value ফেরত পাঠানো |

**Method Syntax:**
```csharp
static returnType MethodName(parameters)
{
    // body
    return value;  // void হলে দরকার নেই
}
```

**মনে রাখো:**
- `static` দিতে হবে (Main থেকে call করতে)
- `void` = return নেই
- Parameter order মেনে argument দাও
- `return` হলে method শেষ

---

**পরের Lesson:** String Methods — ToLower, Trim, Contains, Split এবং আরো built-in সুবিধা।

---

*CPS Academy - Learn. Code. Grow.*
