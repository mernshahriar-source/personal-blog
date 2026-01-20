---
title: 'Part 24: Methods - Introduction'
date: '2026-01-20'
excerpt: 'Part 24: Methods Introduction - নিজের method বানাতে শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - methods
  - tutorial
draft: false
---

# Part 24: Methods - Introduction

ধরো তুমি প্রতিদিন সকালে **চা বানাও**।

চা বানাতে কী কী করতে হয়?

```
1. পানি গরম করো
2. চা পাতা দাও
3. চিনি দাও
4. দুধ দাও
5. নাড়ো
6. কাপে ঢালো
```

এখন প্রশ্ন হলো - **তুমি কি প্রতিদিন এই ৬টা step মনে করে করে চা বানাও?**

**না!** 😄

তোমার মা বললেই "চা বানাও" - তুমি চলে যাও, চা বানিয়ে আনো। তোমার brain জানে "চা বানাও" মানে কী করতে হবে।

**এটাই Method!**

- একবার শিখিয়ে দাও কী করতে হবে
- তারপর শুধু নাম ধরে ডাকো
- কাজ হয়ে যাবে!

---

## এখন পর্যন্ত আমরা কী করেছি?

এতদিন আমরা সব code `Main()` function এর ভিতরে লিখেছি:

```csharp
static void Main(string[] args)
{
    // সব code এখানে
    // অনেক বড় হয়ে যাচ্ছে!
}
```

---

### Problem দেখি

ধরো তোমাকে 3 জন student কে welcome করতে হবে:

```csharp
static void Main(string[] args)
{
    // Student 1 কে welcome
    Console.WriteLine("═══════════════════════════════");
    Console.WriteLine("       🎉 WELCOME! 🎉          ");
    Console.WriteLine("═══════════════════════════════");
    Console.WriteLine("Hello Rahim!");
    Console.WriteLine("Welcome to CPS Academy.");
    Console.WriteLine("Have a great learning journey!");
    Console.WriteLine();
    
    // Student 2 কে welcome
    Console.WriteLine("═══════════════════════════════");
    Console.WriteLine("       🎉 WELCOME! 🎉          ");
    Console.WriteLine("═══════════════════════════════");
    Console.WriteLine("Hello Karim!");
    Console.WriteLine("Welcome to CPS Academy.");
    Console.WriteLine("Have a great learning journey!");
    Console.WriteLine();
    
    // Student 3 কে welcome
    Console.WriteLine("═══════════════════════════════");
    Console.WriteLine("       🎉 WELCOME! 🎉          ");
    Console.WriteLine("═══════════════════════════════");
    Console.WriteLine("Hello Jabbar!");
    Console.WriteLine("Welcome to CPS Academy.");
    Console.WriteLine("Have a great learning journey!");
    Console.WriteLine();
}
```

**সমস্যা দেখো:**

1. **Same code বারবার লিখতে হচ্ছে** 😫
2. **Code অনেক বড় হয়ে যাচ্ছে**
3. **Design change করতে চাইলে 3 জায়গায় করতে হবে**
4. **100 জন student হলে? 100 বার copy-paste!** 😱

---

## Method দিয়ে Solution

যদি একবার বলে দিতে পারতাম "WelcomeStudent মানে এই কাজ করো", তারপর শুধু `WelcomeStudent()` call করলেই হতো!

**এটাই Method!**

```csharp
// একবার define করো
static void WelcomeStudent(string name)
{
    Console.WriteLine("═══════════════════════════════");
    Console.WriteLine("       🎉 WELCOME! 🎉          ");
    Console.WriteLine("═══════════════════════════════");
    Console.WriteLine($"Hello {name}!");
    Console.WriteLine("Welcome to CPS Academy.");
    Console.WriteLine("Have a great learning journey!");
    Console.WriteLine();
}

// তারপর যতবার ইচ্ছা call করো!
static void Main(string[] args)
{
    WelcomeStudent("Rahim");
    WelcomeStudent("Karim");
    WelcomeStudent("Jabbar");
}
```

**3 line এ 3 জনকে welcome করে ফেললাম!** 🎉

100 জন হলেও 100 line, 100 বার copy-paste না!

---

## Method কী?

Method হলো **code এর একটা block** যার একটা **নাম** আছে।

```
Method = Code এর Package
         └── নাম দিয়ে ডাকলে কাজ করে
```

**Real Life Example:**

| কাজ | Method এর মতো |
|-----|---------------|
| "চা বানাও" | তুমি জানো কী করতে হবে |
| "বাজারে যাও" | তুমি জানো কোথায় যেতে হবে |
| "গান গাও" | তুমি জানো কীভাবে গাইতে হবে |

Programming এও same - Method এর নাম বলো, সে জানে কী করতে হবে।

---

## প্রথম Method বানানো

সবচেয়ে simple method দিয়ে শুরু করি:

```csharp
static void SayHello()
{
    Console.WriteLine("Hello, World!");
}
```

---

### Syntax এর প্রতিটা Part বুঝি

```csharp
static void SayHello()
{
    Console.WriteLine("Hello, World!");
}
```

এটা ভেঙে দেখি:

```
static void SayHello()
  ↑     ↑      ↑     ↑
  │     │      │     │
  │     │      │     └── () = Parameter list (এখন খালি)
  │     │      │
  │     │      └── Method এর নাম
  │     │
  │     └── Return type (void = কিছু return করে না)
  │
  └── Access modifier (এখন static লিখবো)
```

---

### Part 1: `static`

এটা এখন আমাদের জন্য দরকার কারণ `Main()` method টাও static।

**এখন শুধু এটুকু জানলেই চলবে:** Main() থেকে call করতে হলে method টাও static হতে হবে।

OOP শেখার সময় এটা নিয়ে আরো জানবো।

---

### Part 2: `void`

এটা বলছে method টা কিছু **return করে না**।

শুধু কাজ করে, কিন্তু কোনো result ফেরত দেয় না।

পরে আমরা result return করা শিখবো।

---

### Part 3: `SayHello`

এটা method এর **নাম**।

নাম দেওয়ার নিয়ম:
- Meaningful নাম দাও (কী করে বোঝা যায়)
- PascalCase use করো (প্রতিটা word এর প্রথম letter capital)
- যেমন: `SayHello`, `CalculateSum`, `PrintReport`

---

### Part 4: `()`

এটা **parameter list**।

Method কে কোনো data পাঠাতে চাইলে এখানে লিখবো।

এখন খালি আছে, মানে কোনো input লাগবে না।

---

### Part 5: `{ }`

এটা **method body**।

Method কী করবে সেটা এখানে লিখবো।

---

## Method Call করা

Method বানালেই তো চলবে না, **call** ও করতে হবে!

```csharp
class Program
{
    // Method define করলাম
    static void SayHello()
    {
        Console.WriteLine("Hello, World!");
    }
    
    // Main method
    static void Main(string[] args)
    {
        // Method call করলাম
        SayHello();
        
        Console.WriteLine("Program finished.");
    }
}
```

Output:
```
Hello, World!
Program finished.
```

---

### Method কোথায় লিখবো?

```csharp
class Program
{
    // ✅ এখানে Method লেখো (Main এর বাইরে, class এর ভিতরে)
    static void SayHello()
    {
        Console.WriteLine("Hello!");
    }
    
    static void Main(string[] args)
    {
        // ❌ Main এর ভিতরে Method লেখা যায় না!
        
        SayHello();  // ✅ Call করা যায়
    }
}
```

**নিয়ম:**
- Method লেখো `class` এর ভিতরে
- কিন্তু `Main()` এর বাইরে
- Main() এর আগে বা পরে যেকোনো জায়গায় লেখা যায়

---

## Method Execution Flow

Method call হলে program কীভাবে চলে সেটা বুঝি:

```csharp
class Program
{
    static void SayHello()
    {
        Console.WriteLine("Hello!");      // Step 2
        Console.WriteLine("How are you?"); // Step 3
    }
    
    static void Main(string[] args)
    {
        Console.WriteLine("Starting...");  // Step 1
        
        SayHello();                        // Jump to SayHello
        
        Console.WriteLine("Ending...");    // Step 4
    }
}
```

**Execution Flow:**

```
Main() শুরু
    │
    ▼
Step 1: "Starting..." print
    │
    ▼
SayHello() call ──────────────┐
                              │
                              ▼
                    Step 2: "Hello!" print
                              │
                              ▼
                    Step 3: "How are you?" print
                              │
                              ▼
                    SayHello() শেষ
                              │
◄─────────────────────────────┘
    │
    ▼
Step 4: "Ending..." print
    │
    ▼
Main() শেষ
```

Output:
```
Starting...
Hello!
How are you?
Ending...
```

---

## একই Method বারবার Call করা

Method এর সুবিধা হলো - **একবার লেখো, যতবার ইচ্ছা call করো!**

```csharp
class Program
{
    static void PrintLine()
    {
        Console.WriteLine("─────────────────────────────");
    }
    
    static void Main(string[] args)
    {
        PrintLine();
        Console.WriteLine("     WELCOME TO CPS ACADEMY");
        PrintLine();
        Console.WriteLine("     Learn. Code. Grow.");
        PrintLine();
    }
}
```

Output:
```
─────────────────────────────
     WELCOME TO CPS ACADEMY
─────────────────────────────
     Learn. Code. Grow.
─────────────────────────────
```

`PrintLine()` method টা 3 বার call করলাম!

---

## Parameters (Input দেওয়া)

এতক্ষণ আমাদের method কোনো input নিচ্ছিল না।

কিন্তু অনেক সময় method কে data পাঠাতে হয়।

**যেমন:**
- "Rahim কে hello বলো" - Rahim হলো input
- "5 আর 3 যোগ করো" - 5 আর 3 হলো input

---

### Parameter সহ Method

```csharp
static void SayHello(string name)
{
    Console.WriteLine($"Hello, {name}!");
}
```

এখানে:
- `string name` হলো **parameter**
- Method কে বলছি "তোমাকে একটা string দেবো, সেটাকে name বলে ডাকবে"

---

### Method Call করা (Argument দিয়ে)

```csharp
class Program
{
    static void SayHello(string name)
    {
        Console.WriteLine($"Hello, {name}!");
    }
    
    static void Main(string[] args)
    {
        SayHello("Rahim");
        SayHello("Karim");
        SayHello("Jabbar");
    }
}
```

Output:
```
Hello, Rahim!
Hello, Karim!
Hello, Jabbar!
```

---

### Parameter vs Argument

অনেকে confuse হয়ে যায়। Clear করি:

```csharp
// এখানে "name" হলো PARAMETER (placeholder)
static void SayHello(string name)
{
    Console.WriteLine($"Hello, {name}!");
}

static void Main(string[] args)
{
    // এখানে "Rahim" হলো ARGUMENT (actual value)
    SayHello("Rahim");
}
```

**সহজ করে মনে রাখো:**

| Term | কী | কোথায় |
|------|-----|--------|
| **Parameter** | Placeholder (জায়গা) | Method definition এ |
| **Argument** | Actual value | Method call এ |

```
Parameter = Method এ: "আমি একটা নাম নেবো"
Argument = Call এ: "এই নাও - Rahim"
```

---

### Step by Step Execution

```csharp
static void SayHello(string name)
{
    Console.WriteLine($"Hello, {name}!");
}

static void Main(string[] args)
{
    SayHello("Rahim");
}
```

**কী হচ্ছে:**

```
Step 1: Main() শুরু

Step 2: SayHello("Rahim") call
        │
        └── "Rahim" argument পাঠাচ্ছি

Step 3: SayHello method এ গেলাম
        │
        └── name = "Rahim" (argument টা parameter এ গেলো)

Step 4: Console.WriteLine($"Hello, {name}!");
        │
        └── name এর জায়গায় "Rahim" বসলো
        └── Output: Hello, Rahim!

Step 5: SayHello শেষ, Main() এ ফিরে আসলাম

Step 6: Main() শেষ
```

---

## Multiple Parameters

Method এ একাধিক parameter ও দেওয়া যায়:

```csharp
static void Greet(string name, int age)
{
    Console.WriteLine($"Hello {name}!");
    Console.WriteLine($"You are {age} years old.");
}

static void Main(string[] args)
{
    Greet("Rahim", 20);
    Console.WriteLine();
    Greet("Karim", 22);
}
```

Output:
```
Hello Rahim!
You are 20 years old.

Hello Karim!
You are 22 years old.
```

---

### Order Matters! ⚠️

Parameter এর order ঠিক রাখতে হবে:

```csharp
static void Greet(string name, int age)
{
    Console.WriteLine($"{name} is {age} years old.");
}

static void Main(string[] args)
{
    // ✅ Correct order: name তারপর age
    Greet("Rahim", 20);
    
    // ❌ Wrong order! age তারপর name
    Greet(20, "Rahim");  // Error!
}
```

**Definition এ যে order এ লিখেছো, call এও সেই order এ দিতে হবে।**

---

### Named Arguments (Order না মিলিয়ে)

তবে named arguments দিলে order মিলাতে হয় না:

```csharp
static void Greet(string name, int age)
{
    Console.WriteLine($"{name} is {age} years old.");
}

static void Main(string[] args)
{
    // Normal way - order মেনে
    Greet("Rahim", 20);
    
    // Named arguments - order যা ইচ্ছা
    Greet(age: 22, name: "Karim");
}
```

Output:
```
Rahim is 20 years old.
Karim is 22 years old.
```

`age: 22` এভাবে লিখলে C# বুঝে যায় কোনটা কার জন্য।

---

## Return Value (Output পাওয়া)

এতক্ষণ আমাদের method শুধু কাজ করেছে, কিন্তু কিছু **return** করেনি।

অনেক সময় method এর result ফেরত পেতে চাই।

**যেমন:**
- "5 আর 3 যোগ করো" → result 8 ফেরত দাও
- "10 এর বর্গমূল কত?" → result ফেরত দাও

---

### void vs Return Type

```csharp
// void = কিছু return করে না
static void SayHello()
{
    Console.WriteLine("Hello!");
    // শুধু print করলো, কিছু ফেরত দিলো না
}

// int = integer return করে
static int Add(int a, int b)
{
    return a + b;  // যোগফল ফেরত দিচ্ছে
}
```

---

### Return Type কী?

Method কী ধরনের data return করবে সেটা বলে দিতে হয়:

```csharp
static int Add(int a, int b)      // int return করবে
static double Divide(int a, int b) // double return করবে
static string GetName()            // string return করবে
static bool IsEven(int num)        // bool return করবে
```

---

### return Keyword

`return` keyword দিয়ে value ফেরত পাঠাই:

```csharp
static int Add(int a, int b)
{
    int sum = a + b;
    return sum;  // sum এর value ফেরত পাঠাচ্ছি
}
```

অথবা সরাসরি:

```csharp
static int Add(int a, int b)
{
    return a + b;  // directly return
}
```

---

### Return Value Use করা

Method যা return করে সেটা নিয়ে কাজ করতে পারো:

```csharp
static int Add(int a, int b)
{
    return a + b;
}

static void Main(string[] args)
{
    // Way 1: Variable এ রাখো
    int result = Add(5, 3);
    Console.WriteLine($"Sum is: {result}");
    
    // Way 2: সরাসরি print করো
    Console.WriteLine($"Sum is: {Add(10, 20)}");
    
    // Way 3: আরেক calculation এ use করো
    int total = Add(5, 3) + Add(10, 7);
    Console.WriteLine($"Total: {total}");
}
```

Output:
```
Sum is: 8
Sum is: 30
Total: 25
```

---

### Step by Step: Return কীভাবে কাজ করে

```csharp
static int Add(int a, int b)
{
    return a + b;
}

static void Main(string[] args)
{
    int result = Add(5, 3);
    Console.WriteLine(result);
}
```

**Execution:**

```
Step 1: Main() শুরু

Step 2: Add(5, 3) call করলাম
        │
        └── a = 5, b = 3

Step 3: Add method এ:
        │
        └── a + b = 5 + 3 = 8
        └── return 8 (8 ফেরত পাঠাচ্ছি)

Step 4: Main() এ ফিরে আসলাম
        │
        └── Add(5, 3) এর জায়গায় 8 বসলো
        └── int result = 8

Step 5: Console.WriteLine(result)
        │
        └── Output: 8

Step 6: Main() শেষ
```

---

### return এর পর code চলে না

`return` হলেই method থেকে বের হয়ে যায়:

```csharp
static int GetNumber()
{
    return 10;
    
    Console.WriteLine("This will NEVER print!");  // ⚠️ Unreachable code
}
```

`return 10;` এর পর কোনো code execute হবে না। Method শেষ!

---

## Real Example 1: Calculator

```csharp
class Program
{
    // যোগ
    static int Add(int a, int b)
    {
        return a + b;
    }
    
    // বিয়োগ
    static int Subtract(int a, int b)
    {
        return a - b;
    }
    
    // গুণ
    static int Multiply(int a, int b)
    {
        return a * b;
    }
    
    // ভাগ
    static double Divide(int a, int b)
    {
        if (b == 0)
        {
            Console.WriteLine("Error: Cannot divide by zero!");
            return 0;
        }
        return (double)a / b;
    }
    
    static void Main(string[] args)
    {
        Console.WriteLine("🧮 SIMPLE CALCULATOR");
        Console.WriteLine("════════════════════════════\n");
        
        int num1 = 20;
        int num2 = 5;
        
        Console.WriteLine($"Numbers: {num1} and {num2}\n");
        
        Console.WriteLine($"Addition:       {num1} + {num2} = {Add(num1, num2)}");
        Console.WriteLine($"Subtraction:    {num1} - {num2} = {Subtract(num1, num2)}");
        Console.WriteLine($"Multiplication: {num1} × {num2} = {Multiply(num1, num2)}");
        Console.WriteLine($"Division:       {num1} ÷ {num2} = {Divide(num1, num2)}");
    }
}
```

Output:
```
🧮 SIMPLE CALCULATOR
════════════════════════════

Numbers: 20 and 5

Addition:       20 + 5 = 25
Subtraction:    20 - 5 = 15
Multiplication: 20 × 5 = 100
Division:       20 ÷ 5 = 4
```

---

## Real Example 2: Greeting Generator

```csharp
class Program
{
    static void PrintLine()
    {
        Console.WriteLine("═══════════════════════════════════════");
    }
    
    static string GetGreeting(string timeOfDay)
    {
        if (timeOfDay == "morning")
        {
            return "Good Morning! ☀️";
        }
        else if (timeOfDay == "afternoon")
        {
            return "Good Afternoon! 🌤️";
        }
        else if (timeOfDay == "evening")
        {
            return "Good Evening! 🌙";
        }
        else
        {
            return "Hello! 👋";
        }
    }
    
    static void WelcomeUser(string name, string timeOfDay)
    {
        PrintLine();
        string greeting = GetGreeting(timeOfDay);
        Console.WriteLine($"       {greeting}");
        Console.WriteLine($"       Welcome, {name}!");
        PrintLine();
    }
    
    static void Main(string[] args)
    {
        WelcomeUser("Rahim", "morning");
        Console.WriteLine();
        WelcomeUser("Karim", "evening");
    }
}
```

Output:
```
═══════════════════════════════════════
       Good Morning! ☀️
       Welcome, Rahim!
═══════════════════════════════════════

═══════════════════════════════════════
       Good Evening! 🌙
       Welcome, Karim!
═══════════════════════════════════════
```

---

## Real Example 3: Area Calculator

```csharp
class Program
{
    // বর্গক্ষেত্রের ক্ষেত্রফল
    static double SquareArea(double side)
    {
        return side * side;
    }
    
    // আয়তক্ষেত্রের ক্ষেত্রফল
    static double RectangleArea(double length, double width)
    {
        return length * width;
    }
    
    // বৃত্তের ক্ষেত্রফল
    static double CircleArea(double radius)
    {
        return 3.1416 * radius * radius;
    }
    
    // ত্রিভুজের ক্ষেত্রফল
    static double TriangleArea(double baseLength, double height)
    {
        return 0.5 * baseLength * height;
    }
    
    static void Main(string[] args)
    {
        Console.WriteLine("📐 AREA CALCULATOR");
        Console.WriteLine("══════════════════════════════════════\n");
        
        // Square
        double side = 5;
        Console.WriteLine($"Square (side = {side}):");
        Console.WriteLine($"   Area = {SquareArea(side)} sq units\n");
        
        // Rectangle
        double length = 10, width = 4;
        Console.WriteLine($"Rectangle (length = {length}, width = {width}):");
        Console.WriteLine($"   Area = {RectangleArea(length, width)} sq units\n");
        
        // Circle
        double radius = 7;
        Console.WriteLine($"Circle (radius = {radius}):");
        Console.WriteLine($"   Area = {CircleArea(radius):F2} sq units\n");
        
        // Triangle
        double baseLen = 8, height = 5;
        Console.WriteLine($"Triangle (base = {baseLen}, height = {height}):");
        Console.WriteLine($"   Area = {TriangleArea(baseLen, height)} sq units");
    }
}
```

Output:
```
📐 AREA CALCULATOR
══════════════════════════════════════

Square (side = 5):
   Area = 25 sq units

Rectangle (length = 10, width = 4):
   Area = 40 sq units

Circle (radius = 7):
   Area = 153.94 sq units

Triangle (base = 8, height = 5):
   Area = 20 sq units
```

---

## Real Example 4: Grade Calculator

```csharp
class Program
{
    // Grade বের করো
    static string GetGrade(int marks)
    {
        if (marks >= 90)
        {
            return "A+";
        }
        else if (marks >= 80)
        {
            return "A";
        }
        else if (marks >= 70)
        {
            return "B";
        }
        else if (marks >= 60)
        {
            return "C";
        }
        else if (marks >= 40)
        {
            return "D";
        }
        else
        {
            return "F";
        }
    }
    
    // Pass কিনা check করো
    static bool IsPassed(int marks)
    {
        return marks >= 40;
    }
    
    // Result দেখাও
    static void ShowResult(string name, int marks)
    {
        Console.WriteLine($"Student: {name}");
        Console.WriteLine($"Marks: {marks}");
        Console.WriteLine($"Grade: {GetGrade(marks)}");
        
        if (IsPassed(marks))
        {
            Console.WriteLine("Status: ✅ PASSED");
        }
        else
        {
            Console.WriteLine("Status: ❌ FAILED");
        }
        Console.WriteLine();
    }
    
    static void Main(string[] args)
    {
        Console.WriteLine("📝 STUDENT RESULTS");
        Console.WriteLine("══════════════════════════════════════\n");
        
        ShowResult("Rahim", 85);
        ShowResult("Karim", 92);
        ShowResult("Jabbar", 35);
        ShowResult("Salam", 67);
    }
}
```

Output:
```
📝 STUDENT RESULTS
══════════════════════════════════════

Student: Rahim
Marks: 85
Grade: A
Status: ✅ PASSED

Student: Karim
Marks: 92
Grade: A+
Status: ✅ PASSED

Student: Jabbar
Marks: 35
Grade: F
Status: ❌ FAILED

Student: Salam
Marks: 67
Grade: C
Status: ✅ PASSED
```

---

## Complete Example: Mini Banking System

```csharp
class Program
{
    static void PrintHeader()
    {
        Console.WriteLine("╔═══════════════════════════════════════╗");
        Console.WriteLine("║        🏦 MINI BANKING SYSTEM         ║");
        Console.WriteLine("╚═══════════════════════════════════════╝");
    }
    
    static void PrintLine()
    {
        Console.WriteLine("───────────────────────────────────────");
    }
    
    static double Deposit(double balance, double amount)
    {
        if (amount <= 0)
        {
            Console.WriteLine("❌ Invalid amount!");
            return balance;
        }
        
        double newBalance = balance + amount;
        Console.WriteLine($"✅ Deposited: {amount} tk");
        return newBalance;
    }
    
    static double Withdraw(double balance, double amount)
    {
        if (amount <= 0)
        {
            Console.WriteLine("❌ Invalid amount!");
            return balance;
        }
        
        if (amount > balance)
        {
            Console.WriteLine("❌ Insufficient balance!");
            return balance;
        }
        
        double newBalance = balance - amount;
        Console.WriteLine($"✅ Withdrawn: {amount} tk");
        return newBalance;
    }
    
    static void CheckBalance(double balance)
    {
        Console.WriteLine($"💰 Current Balance: {balance} tk");
    }
    
    static void ShowTransactionHistory(string[] transactions, int count)
    {
        Console.WriteLine("\n📋 Transaction History:");
        PrintLine();
        
        if (count == 0)
        {
            Console.WriteLine("   No transactions yet.");
        }
        else
        {
            for (int i = 0; i < count; i++)
            {
                Console.WriteLine($"   {i + 1}. {transactions[i]}");
            }
        }
    }
    
    static void Main(string[] args)
    {
        PrintHeader();
        Console.WriteLine();
        
        double balance = 1000;  // Starting balance
        string[] transactions = new string[10];
        int transactionCount = 0;
        
        // Initial balance
        Console.WriteLine("Account opened with 1000 tk\n");
        
        // Deposit
        PrintLine();
        Console.WriteLine("📥 DEPOSIT");
        balance = Deposit(balance, 500);
        transactions[transactionCount] = "Deposit: +500 tk";
        transactionCount++;
        CheckBalance(balance);
        
        // Withdraw
        Console.WriteLine();
        PrintLine();
        Console.WriteLine("📤 WITHDRAW");
        balance = Withdraw(balance, 200);
        transactions[transactionCount] = "Withdraw: -200 tk";
        transactionCount++;
        CheckBalance(balance);
        
        // Another deposit
        Console.WriteLine();
        PrintLine();
        Console.WriteLine("📥 DEPOSIT");
        balance = Deposit(balance, 1000);
        transactions[transactionCount] = "Deposit: +1000 tk";
        transactionCount++;
        CheckBalance(balance);
        
        // Try to withdraw more than balance
        Console.WriteLine();
        PrintLine();
        Console.WriteLine("📤 WITHDRAW (Attempt)");
        balance = Withdraw(balance, 5000);
        CheckBalance(balance);
        
        // Show history
        ShowTransactionHistory(transactions, transactionCount);
        
        // Final balance
        Console.WriteLine();
        PrintLine();
        Console.WriteLine("📊 FINAL SUMMARY");
        CheckBalance(balance);
    }
}
```

Output:
```
╔═══════════════════════════════════════╗
║        🏦 MINI BANKING SYSTEM         ║
╚═══════════════════════════════════════╝

Account opened with 1000 tk

───────────────────────────────────────
📥 DEPOSIT
✅ Deposited: 500 tk
💰 Current Balance: 1500 tk

───────────────────────────────────────
📤 WITHDRAW
✅ Withdrawn: 200 tk
💰 Current Balance: 1300 tk

───────────────────────────────────────
📥 DEPOSIT
✅ Deposited: 1000 tk
💰 Current Balance: 2300 tk

───────────────────────────────────────
📤 WITHDRAW (Attempt)
❌ Insufficient balance!
💰 Current Balance: 2300 tk

📋 Transaction History:
───────────────────────────────────────
   1. Deposit: +500 tk
   2. Withdraw: -200 tk
   3. Deposit: +1000 tk

───────────────────────────────────────
📊 FINAL SUMMARY
💰 Current Balance: 2300 tk
```

---

## Common Mistakes ⚠️

### Mistake 1: Return Type Mismatch

```csharp
// ❌ Wrong - int বলে double return করছে
static int Divide(int a, int b)
{
    return (double)a / b;  // Error! double return করতে পারবে না
}

// ✅ Correct
static double Divide(int a, int b)
{
    return (double)a / b;
}
```

---

### Mistake 2: void Method এ return value নেওয়ার চেষ্টা

```csharp
static void SayHello()
{
    Console.WriteLine("Hello!");
}

static void Main(string[] args)
{
    // ❌ Wrong - void method কিছু return করে না
    string result = SayHello();  // Error!
    
    // ✅ Correct - শুধু call করো
    SayHello();
}
```

---

### Mistake 3: return ভুলে যাওয়া

```csharp
// ❌ Wrong - return নেই!
static int Add(int a, int b)
{
    int sum = a + b;
    // return কোথায়? 😱
}

// ✅ Correct
static int Add(int a, int b)
{
    int sum = a + b;
    return sum;
}
```

---

### Mistake 4: Parameter মিসিং

```csharp
static void Greet(string name, int age)
{
    Console.WriteLine($"{name} is {age}");
}

static void Main(string[] args)
{
    // ❌ Wrong - 2 টা parameter লাগে, 1 টা দিয়েছি
    Greet("Rahim");  // Error!
    
    // ✅ Correct
    Greet("Rahim", 20);
}
```

---

### Mistake 5: () ভুলে যাওয়া

```csharp
static void SayHello()
{
    Console.WriteLine("Hello!");
}

static void Main(string[] args)
{
    // ❌ Wrong - () নেই!
    SayHello;  // Error!
    
    // ✅ Correct
    SayHello();
}
```

Method call করতে **()** অবশ্যই লাগবে, এমনকি parameter না থাকলেও!

---

## Method এর উপকারিতা

### 1. Code Reusability (পুনরায় ব্যবহার)

```csharp
// একবার লেখো
static void PrintWelcome()
{
    Console.WriteLine("Welcome to CPS Academy!");
}

// যতবার ইচ্ছা use করো
PrintWelcome();
PrintWelcome();
PrintWelcome();
```

---

### 2. Code Organization (সংগঠন)

```csharp
// Without methods - সব একসাথে গোলমেলে
// With methods - আলাদা আলাদা সুন্দর করে সাজানো

static void GetInput() { ... }
static void ProcessData() { ... }
static void ShowOutput() { ... }

static void Main(string[] args)
{
    GetInput();
    ProcessData();
    ShowOutput();
}
```

Main() দেখলেই বোঝা যাচ্ছে program কী করে!

---

### 3. Easy to Debug (সমস্যা খুঁজে বের করা সহজ)

```csharp
// সমস্যা হলে শুধু সেই method এ খুঁজো
static int Calculate(int a, int b)
{
    // Bug এখানে হলে শুধু এখানে fix করো
    return a + b;
}
```

---

### 4. Easy to Maintain (রক্ষণাবেক্ষণ সহজ)

```csharp
// Design change করতে চাইলে শুধু একবার change করো
static void PrintHeader()
{
    // এখানে change করলে সব জায়গায় apply হবে
    Console.WriteLine("★★★ NEW DESIGN ★★★");
}
```

---

## Summary

আজকে শিখলাম:

| Concept | মানে |
|---------|------|
| Method | Code এর named block - একবার লেখো, বারবার use করো |
| void | কিছু return করে না |
| Parameter | Method এর input (placeholder) |
| Argument | Method call এ actual value |
| return | Method থেকে value ফেরত পাঠানো |
| Return type | কী ধরনের value return করবে (int, string, etc.) |

---

### Method Syntax:

```csharp
static returnType MethodName(parameters)
{
    // Method body
    return value;  // যদি void না হয়
}
```

---

### Method Call:

```csharp
// void method
MethodName();
MethodName(argument1, argument2);

// return সহ method
int result = MethodName(arg1, arg2);
```

---

### মনে রাখো:

- **static** দিতে হবে (Main থেকে call করতে)
- **void** মানে কিছু return করে না
- **Parameter** এর order মেনে **Argument** দাও
- **return** হলে method শেষ
- Method call এ **()** অবশ্যই লাগবে

---

**Next Part এ:** Methods Advanced - Overloading, Optional Parameters, ref/out keywords শিখবো!

---

*CPS Academy - Learn. Code. Grow.*
