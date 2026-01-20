---
title: 'Part 25: Methods - Advanced'
date: '2026-01-20'
excerpt: 'Part 25: Methods Advanced - overloading, optional parameters শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - methods
  - tutorial
draft: false
---

# Part 25: Methods - Advanced

আগের part এ আমরা Method এর basics শিখেছি - কীভাবে বানাতে হয়, parameter দিতে হয়, return করতে হয়।

আজকে শিখবো কিছু **advanced concepts** যেগুলো Method কে আরো powerful করে!

---

## গল্প দিয়ে শুরু করি

ধরো তুমি একটা **Print Shop** চালাও। Customer আসে বিভিন্ন জিনিস print করাতে।

**Customer 1 বলে:** "এই document টা print করো"
**Customer 2 বলে:** "এই document টা 5 copy print করো"
**Customer 3 বলে:** "এই document টা 3 copy, color এ print করো"

এখন তুমি কী করবে? প্রতিটার জন্য আলাদা কাজ?

```
PrintDocument()
PrintDocumentWithCopies()
PrintDocumentWithCopiesAndColor()
```

এটা তো বিরক্তিকর! 😫

**যদি same "Print" বললেই বুঝে যেত কী করতে হবে?**

```
Print(document)
Print(document, 5)
Print(document, 3, "color")
```

**এটাই Method Overloading!** 🎉

---

## Method Overloading কী?

**Overloading** মানে = **একই নামে একাধিক method**, কিন্তু **parameters আলাদা**।

C# বুঝে যায় তুমি কোন version call করতে চাইছো - parameters দেখে!

**Real Life Analogy:**

ধরো তোমার নাম "Rahim"। তোমাকে বিভিন্নভাবে ডাকা যায়:

```
"Rahim" - শুধু নাম ধরে
"Rahim ভাই" - সম্মান সহ
"Rahim ভাই, একটু আসেন" - request সহ
```

তুমি same person, কিন্তু context অনুযায়ী respond করো।

Method Overloading ও same - **same method name**, কিন্তু **parameters অনুযায়ী different behavior**!

---

## প্রথম Overloading Example: Print Method

```csharp
class Program
{
    // Version 1: শুধু message print
    static void Print(string message)
    {
        Console.WriteLine(message);
    }
    
    // Version 2: message + কতবার print করবে
    static void Print(string message, int times)
    {
        for (int i = 0; i < times; i++)
        {
            Console.WriteLine(message);
        }
    }
    
    // Version 3: message + কতবার + prefix সহ
    static void Print(string message, int times, string prefix)
    {
        for (int i = 0; i < times; i++)
        {
            Console.WriteLine($"{prefix} {message}");
        }
    }
    
    static void Main(string[] args)
    {
        Print("Hello World");              // Version 1
        Console.WriteLine();
        
        Print("Welcome", 3);               // Version 2
        Console.WriteLine();
        
        Print("Important!", 2, ">>>");     // Version 3
    }
}
```

Output:
```
Hello World

Welcome
Welcome
Welcome

>>> Important!
>>> Important!
```

**তিনটা different Print() method, কিন্তু C# ঠিকই বুঝেছে কোনটা call করতে হবে!**

---

## কীভাবে C# বোঝে কোন Method Call করতে হবে?

C# **arguments এর সংখ্যা এবং type** দেখে decide করে।

### Step by Step দেখি:

**Call 1:** `Print("Hello World")`

```
Step 1: Arguments কয়টা?
        → 1 টা

Step 2: Arguments এর type কী?
        → string

Step 3: Match করো কোন method এ:
        Print(string message)           ← 1 টা string ✅ MATCH!
        Print(string message, int times) ← 2 টা লাগে ❌
        Print(string message, int times, string prefix) ← 3 টা লাগে ❌

Step 4: Print(string message) call করো!
```

---

**Call 2:** `Print("Welcome", 3)`

```
Step 1: Arguments কয়টা?
        → 2 টা

Step 2: Arguments এর type কী?
        → string, int

Step 3: Match করো কোন method এ:
        Print(string message)           ← 1 টা লাগে ❌
        Print(string message, int times) ← string, int ✅ MATCH!
        Print(string message, int times, string prefix) ← 3 টা লাগে ❌

Step 4: Print(string message, int times) call করো!
```

---

**Call 3:** `Print("Important!", 2, ">>>")`

```
Step 1: Arguments কয়টা?
        → 3 টা

Step 2: Arguments এর type কী?
        → string, int, string

Step 3: Match করো কোন method এ:
        Print(string message)           ← 1 টা লাগে ❌
        Print(string message, int times) ← 2 টা লাগে ❌
        Print(string message, int times, string prefix) ← string, int, string ✅ MATCH!

Step 4: Print(string message, int times, string prefix) call করো!
```

---

## Overloading এর Rules

### Rule 1: Parameter সংখ্যা Different হতে পারে

```csharp
static int Add(int a, int b)           // 2 টা parameter
{
    return a + b;
}

static int Add(int a, int b, int c)    // 3 টা parameter
{
    return a + b + c;
}

static int Add(int a, int b, int c, int d)    // 4 টা parameter
{
    return a + b + c + d;
}
```

**Call করি:**

```csharp
Console.WriteLine(Add(5, 3));           // 8 (2 parameters)
Console.WriteLine(Add(5, 3, 7));        // 15 (3 parameters)
Console.WriteLine(Add(5, 3, 7, 10));    // 25 (4 parameters)
```

✅ **Valid!** Parameter সংখ্যা different।

---

### Rule 2: Parameter Type Different হতে পারে

```csharp
static void Display(int number)
{
    Console.WriteLine($"Integer: {number}");
}

static void Display(double number)
{
    Console.WriteLine($"Double: {number}");
}

static void Display(string text)
{
    Console.WriteLine($"String: {text}");
}

static void Display(bool flag)
{
    Console.WriteLine($"Boolean: {flag}");
}
```

**Call করি:**

```csharp
Display(42);         // Integer: 42
Display(3.14);       // Double: 3.14
Display("Hello");    // String: Hello
Display(true);       // Boolean: True
```

✅ **Valid!** Parameter type different।

---

### কীভাবে C# Type বুঝে?

```csharp
Display(42);      // 42 হলো int → Display(int) call হবে
Display(3.14);    // 3.14 হলো double → Display(double) call হবে
Display("Hello"); // "Hello" হলো string → Display(string) call হবে
Display(true);    // true হলো bool → Display(bool) call হবে
```

**C# argument এর type দেখেই বুঝে যায়!**

---

### Rule 3: Parameter Order Different হতে পারে

```csharp
static void ShowInfo(string name, int age)
{
    Console.WriteLine($"Method 1: Name={name}, Age={age}");
}

static void ShowInfo(int age, string name)
{
    Console.WriteLine($"Method 2: Age={age}, Name={name}");
}
```

**Call করি:**

```csharp
ShowInfo("Rahim", 20);  // Method 1: Name=Rahim, Age=20
ShowInfo(20, "Rahim");  // Method 2: Age=20, Name=Rahim
```

✅ **Valid!** Parameter এর order different।

**কিন্তু সাবধান!** এটা confusing হতে পারে। Better practice হলো different নাম দেওয়া।

---

### Rule 4: শুধু Return Type Different হলে হবে না! ❌

```csharp
static int GetValue()       // int return করে
{
    return 42;
}

static double GetValue()    // double return করে - ❌ ERROR!
{
    return 42.5;
}
```

**এটা Compile Error দেবে!**

**কেন?**

```csharp
GetValue();  // C# বুঝতে পারছে না কোনটা call করবে!
             // কারণ call করার সময় তো return type বলছো না!
```

---

### Overloading Rules Summary:

| যা Different হলে Valid | যা Different হলে Invalid |
|------------------------|--------------------------|
| ✅ Parameter সংখ্যা | ❌ শুধু Return Type |
| ✅ Parameter Type | |
| ✅ Parameter Order | |

---

## Real Example 1: Calculator (Overloaded)

একটা Calculator বানাই যেটা বিভিন্ন ধরনের calculation করতে পারে:

```csharp
class Program
{
    // ═══════════════════════════════════════════════════
    // Addition - Multiple Overloads
    // ═══════════════════════════════════════════════════
    
    // 2 integers
    static int Add(int a, int b)
    {
        Console.WriteLine($"Adding 2 integers: {a} + {b}");
        return a + b;
    }
    
    // 3 integers
    static int Add(int a, int b, int c)
    {
        Console.WriteLine($"Adding 3 integers: {a} + {b} + {c}");
        return a + b + c;
    }
    
    // 2 doubles
    static double Add(double a, double b)
    {
        Console.WriteLine($"Adding 2 doubles: {a} + {b}");
        return a + b;
    }
    
    // 2 strings (concatenation)
    static string Add(string a, string b)
    {
        Console.WriteLine($"Adding 2 strings: \"{a}\" + \"{b}\"");
        return a + b;
    }
    
    // ═══════════════════════════════════════════════════
    // Multiplication - Multiple Overloads
    // ═══════════════════════════════════════════════════
    
    // 2 integers
    static int Multiply(int a, int b)
    {
        return a * b;
    }
    
    // integer × double
    static double Multiply(int a, double b)
    {
        return a * b;
    }
    
    // double × double
    static double Multiply(double a, double b)
    {
        return a * b;
    }
    
    static void Main(string[] args)
    {
        Console.WriteLine("🧮 OVERLOADED CALCULATOR");
        Console.WriteLine("════════════════════════════════════════\n");
        
        // Addition tests
        Console.WriteLine("📌 Addition Tests:");
        Console.WriteLine($"   Result: {Add(5, 3)}\n");
        Console.WriteLine($"   Result: {Add(5, 3, 7)}\n");
        Console.WriteLine($"   Result: {Add(3.14, 2.86)}\n");
        Console.WriteLine($"   Result: {Add("Hello ", "World")}\n");
        
        // Multiplication tests
        Console.WriteLine("📌 Multiplication Tests:");
        Console.WriteLine($"   5 × 3 = {Multiply(5, 3)}");
        Console.WriteLine($"   5 × 3.5 = {Multiply(5, 3.5)}");
        Console.WriteLine($"   2.5 × 4.0 = {Multiply(2.5, 4.0)}");
    }
}
```

Output:
```
🧮 OVERLOADED CALCULATOR
════════════════════════════════════════

📌 Addition Tests:
Adding 2 integers: 5 + 3
   Result: 8

Adding 3 integers: 5 + 3 + 7
   Result: 15

Adding 2 doubles: 3.14 + 2.86
   Result: 6

Adding 2 strings: "Hello " + "World"
   Result: Hello World

📌 Multiplication Tests:
   5 × 3 = 15
   5 × 3.5 = 17.5
   2.5 × 4.0 = 10
```

---

## Real Example 2: Area Calculator (Overloaded)

বিভিন্ন আকৃতির area calculate করি same method নামে:

```csharp
class Program
{
    // ═══════════════════════════════════════════════════
    // Area Calculations - Overloaded
    // ═══════════════════════════════════════════════════
    
    // বর্গক্ষেত্র (Square) - 1 parameter
    static double CalculateArea(double side)
    {
        Console.WriteLine($"   📐 Square with side = {side}");
        Console.WriteLine($"   Formula: side × side = {side} × {side}");
        return side * side;
    }
    
    // আয়তক্ষেত্র (Rectangle) - 2 parameters (both double)
    static double CalculateArea(double length, double width)
    {
        Console.WriteLine($"   📐 Rectangle with length = {length}, width = {width}");
        Console.WriteLine($"   Formula: length × width = {length} × {width}");
        return length * width;
    }
    
    // বৃত্ত (Circle) - 1 double + 1 string to identify
    static double CalculateArea(double radius, string shape)
    {
        if (shape.ToLower() == "circle")
        {
            Console.WriteLine($"   📐 Circle with radius = {radius}");
            Console.WriteLine($"   Formula: π × r² = 3.1416 × {radius}²");
            return 3.1416 * radius * radius;
        }
        return 0;
    }
    
    // ত্রিভুজ (Triangle) - 2 doubles + string to identify
    static double CalculateArea(double baseLength, double height, string shape)
    {
        if (shape.ToLower() == "triangle")
        {
            Console.WriteLine($"   📐 Triangle with base = {baseLength}, height = {height}");
            Console.WriteLine($"   Formula: ½ × base × height = 0.5 × {baseLength} × {height}");
            return 0.5 * baseLength * height;
        }
        return 0;
    }
    
    static void Main(string[] args)
    {
        Console.WriteLine("📐 AREA CALCULATOR (Overloaded)");
        Console.WriteLine("════════════════════════════════════════════\n");
        
        // Square
        Console.WriteLine("1. SQUARE:");
        double squareArea = CalculateArea(5.0);
        Console.WriteLine($"   ✅ Area = {squareArea} sq units\n");
        
        // Rectangle
        Console.WriteLine("2. RECTANGLE:");
        double rectArea = CalculateArea(10.0, 4.0);
        Console.WriteLine($"   ✅ Area = {rectArea} sq units\n");
        
        // Circle
        Console.WriteLine("3. CIRCLE:");
        double circleArea = CalculateArea(7.0, "circle");
        Console.WriteLine($"   ✅ Area = {circleArea:F2} sq units\n");
        
        // Triangle
        Console.WriteLine("4. TRIANGLE:");
        double triangleArea = CalculateArea(8.0, 5.0, "triangle");
        Console.WriteLine($"   ✅ Area = {triangleArea} sq units\n");
        
        // Summary
        Console.WriteLine("════════════════════════════════════════════");
        Console.WriteLine("📊 SUMMARY:");
        Console.WriteLine($"   Square Area:    {squareArea}");
        Console.WriteLine($"   Rectangle Area: {rectArea}");
        Console.WriteLine($"   Circle Area:    {circleArea:F2}");
        Console.WriteLine($"   Triangle Area:  {triangleArea}");
        Console.WriteLine($"   Total Area:     {squareArea + rectArea + circleArea + triangleArea:F2}");
    }
}
```

Output:
```
📐 AREA CALCULATOR (Overloaded)
════════════════════════════════════════════

1. SQUARE:
   📐 Square with side = 5
   Formula: side × side = 5 × 5
   ✅ Area = 25 sq units

2. RECTANGLE:
   📐 Rectangle with length = 10, width = 4
   Formula: length × width = 10 × 4
   ✅ Area = 40 sq units

3. CIRCLE:
   📐 Circle with radius = 7
   Formula: π × r² = 3.1416 × 7²
   ✅ Area = 153.94 sq units

4. TRIANGLE:
   📐 Triangle with base = 8, height = 5
   Formula: ½ × base × height = 0.5 × 8 × 5
   ✅ Area = 20 sq units

════════════════════════════════════════════
📊 SUMMARY:
   Square Area:    25
   Rectangle Area: 40
   Circle Area:    153.94
   Triangle Area:  20
   Total Area:     238.94
```

---

## Real Example 3: Message Formatter (Overloaded)

বিভিন্ন ধরনের message format করি:

```csharp
class Program
{
    // শুধু message
    static void FormatMessage(string message)
    {
        Console.WriteLine($"📝 {message}");
    }
    
    // message + type (info/warning/error)
    static void FormatMessage(string message, string type)
    {
        string icon = "📝";
        
        switch (type.ToLower())
        {
            case "info":
                icon = "ℹ️";
                break;
            case "warning":
                icon = "⚠️";
                break;
            case "error":
                icon = "❌";
                break;
            case "success":
                icon = "✅";
                break;
        }
        
        Console.WriteLine($"{icon} [{type.ToUpper()}] {message}");
    }
    
    // message + type + timestamp
    static void FormatMessage(string message, string type, bool showTime)
    {
        string icon = "📝";
        
        switch (type.ToLower())
        {
            case "info": icon = "ℹ️"; break;
            case "warning": icon = "⚠️"; break;
            case "error": icon = "❌"; break;
            case "success": icon = "✅"; break;
        }
        
        if (showTime)
        {
            string time = DateTime.Now.ToString("HH:mm:ss");
            Console.WriteLine($"[{time}] {icon} [{type.ToUpper()}] {message}");
        }
        else
        {
            Console.WriteLine($"{icon} [{type.ToUpper()}] {message}");
        }
    }
    
    // message + repeat count
    static void FormatMessage(string message, int repeatCount)
    {
        for (int i = 0; i < repeatCount; i++)
        {
            Console.WriteLine($"   {i + 1}. {message}");
        }
    }
    
    static void Main(string[] args)
    {
        Console.WriteLine("📬 MESSAGE FORMATTER (Overloaded)");
        Console.WriteLine("════════════════════════════════════════════\n");
        
        // Version 1: শুধু message
        Console.WriteLine("Version 1 - Simple message:");
        FormatMessage("This is a simple message");
        Console.WriteLine();
        
        // Version 2: message + type
        Console.WriteLine("Version 2 - Message with type:");
        FormatMessage("System started successfully", "success");
        FormatMessage("Low disk space", "warning");
        FormatMessage("File not found", "error");
        FormatMessage("Processing data...", "info");
        Console.WriteLine();
        
        // Version 3: message + type + timestamp
        Console.WriteLine("Version 3 - Message with type and timestamp:");
        FormatMessage("User logged in", "info", true);
        FormatMessage("Payment completed", "success", true);
        FormatMessage("Connection timeout", "error", true);
        Console.WriteLine();
        
        // Version 4: message + repeat
        Console.WriteLine("Version 4 - Repeated message:");
        FormatMessage("Remember to save your work!", 3);
    }
}
```

Output:
```
📬 MESSAGE FORMATTER (Overloaded)
════════════════════════════════════════════

Version 1 - Simple message:
📝 This is a simple message

Version 2 - Message with type:
✅ [SUCCESS] System started successfully
⚠️ [WARNING] Low disk space
❌ [ERROR] File not found
ℹ️ [INFO] Processing data...

Version 3 - Message with type and timestamp:
[14:32:15] ℹ️ [INFO] User logged in
[14:32:15] ✅ [SUCCESS] Payment completed
[14:32:15] ❌ [ERROR] Connection timeout

Version 4 - Repeated message:
   1. Remember to save your work!
   2. Remember to save your work!
   3. Remember to save your work!
```

---

## Console.WriteLine() - Built-in Overloading Example!

তুমি জানো কি `Console.WriteLine()` নিজেও heavily overloaded?

```csharp
Console.WriteLine();              // কোনো parameter নেই
Console.WriteLine("Hello");       // string
Console.WriteLine(42);            // int
Console.WriteLine(3.14);          // double
Console.WriteLine(true);          // bool
Console.WriteLine('A');           // char
```

**সব কাজ করছে!** কারণ C# এ `WriteLine()` এর অনেকগুলো overloaded version আছে।

এটাই overloading এর power! একই নামে বিভিন্ন ধরনের কাজ।

---

## Optional Parameters

কখনো কখনো কিছু parameter **দিলেও চলে, না দিলেও চলে**।

এদের বলে **Optional Parameters**।

---

### Problem দেখি

ধরো তুমি একটা Greeting method বানাতে চাও:

```csharp
static void Greet(string name, string greeting, string punctuation)
{
    Console.WriteLine($"{greeting}, {name}{punctuation}");
}
```

এখন call করতে হলে সব সময় 3 টা argument দিতে হবে:

```csharp
Greet("Rahim", "Hello", "!");       // Hello, Rahim!
Greet("Karim", "Hello", "!");       // Hello, Karim!
Greet("Jabbar", "Hello", "!");      // Hello, Jabbar!
```

কিন্তু বেশিরভাগ সময় তো "Hello" আর "!" ই use করবো। **প্রতিবার লিখতে হবে?**

---

### Solution 1: Overloading দিয়ে

```csharp
// Full version
static void Greet(string name, string greeting, string punctuation)
{
    Console.WriteLine($"{greeting}, {name}{punctuation}");
}

// Short version - শুধু name
static void Greet(string name)
{
    Greet(name, "Hello", "!");  // Full version কে call করছি
}

// Medium version - name + greeting
static void Greet(string name, string greeting)
{
    Greet(name, greeting, "!");  // Full version কে call করছি
}
```

**এটা কাজ করবে, কিন্তু অনেক code লিখতে হলো!**

---

### Solution 2: Optional Parameters (Better! ✨)

```csharp
static void Greet(string name, string greeting = "Hello", string punctuation = "!")
{
    Console.WriteLine($"{greeting}, {name}{punctuation}");
}
```

**`greeting = "Hello"` মানে:**
- যদি argument দাও → সেটা use হবে
- যদি না দাও → "Hello" use হবে (default value)

**এখন call করি:**

```csharp
static void Main(string[] args)
{
    Greet("Rahim");                          // Hello, Rahim!
    Greet("Karim", "Hi");                    // Hi, Karim!
    Greet("Jabbar", "Good Morning", "!!");   // Good Morning, Jabbar!!
}
```

Output:
```
Hello, Rahim!
Hi, Karim!
Good Morning, Jabbar!!
```

**এক method দিয়েই তিন ধরনের কাজ!** 🎉

---

### Step by Step: Optional Parameter কীভাবে কাজ করে

```csharp
static void Greet(string name, string greeting = "Hello", string punctuation = "!")
{
    Console.WriteLine($"{greeting}, {name}{punctuation}");
}
```

**Call 1:** `Greet("Rahim")`

```
Arguments: "Rahim" (1 টা)

Parameters:
   name = "Rahim"           (argument থেকে)
   greeting = "Hello"       (default value)
   punctuation = "!"        (default value)

Output: Hello, Rahim!
```

**Call 2:** `Greet("Karim", "Hi")`

```
Arguments: "Karim", "Hi" (2 টা)

Parameters:
   name = "Karim"           (argument থেকে)
   greeting = "Hi"          (argument থেকে)
   punctuation = "!"        (default value)

Output: Hi, Karim!
```

**Call 3:** `Greet("Jabbar", "Good Morning", "!!")`

```
Arguments: "Jabbar", "Good Morning", "!!" (3 টা)

Parameters:
   name = "Jabbar"          (argument থেকে)
   greeting = "Good Morning" (argument থেকে)
   punctuation = "!!"       (argument থেকে)

Output: Good Morning, Jabbar!!
```

---

### Optional Parameters এর Rules

#### Rule 1: Optional Parameters শেষে থাকতে হবে

```csharp
// ✅ Correct - Required আগে, Optional পরে
static void Test(int a, int b, int c = 10, int d = 20)
{
    // a, b = Required
    // c, d = Optional
}

// ❌ Wrong - Optional মাঝে আছে!
static void Test(int a, int b = 10, int c)  // Compile Error!
{
}

// ❌ Wrong - Optional আগে আছে!
static void Test(int a = 10, int b, int c)  // Compile Error!
{
}
```

**মনে রাখো:** Required → Optional (বাম থেকে ডানে)

---

#### Rule 2: মাঝের Optional Skip করতে Named Arguments লাগে

```csharp
static void CreateUser(string name, int age = 18, string city = "Dhaka", bool isActive = true)
{
    Console.WriteLine($"Name: {name}, Age: {age}, City: {city}, Active: {isActive}");
}

static void Main(string[] args)
{
    // সব argument দিলাম
    CreateUser("Rahim", 25, "Chittagong", false);
    
    // শুধু name (বাকি সব default)
    CreateUser("Karim");
    
    // name + age (city, isActive default)
    CreateUser("Jabbar", 30);
    
    // কিন্তু শুধু city দিতে চাই, age default রাখতে চাই?
    // ❌ এভাবে হবে না:
    // CreateUser("Salam", "Sylhet");  // Error! "Sylhet" int এ যাবে না
    
    // ✅ Named argument use করো:
    CreateUser("Salam", city: "Sylhet");
    
    // শুধু isActive change করতে চাই?
    CreateUser("Jalil", isActive: false);
    
    // age + isActive, কিন্তু city default?
    CreateUser("Rafiq", age: 22, isActive: false);
}
```

Output:
```
Name: Rahim, Age: 25, City: Chittagong, Active: False
Name: Karim, Age: 18, City: Dhaka, Active: True
Name: Jabbar, Age: 30, City: Dhaka, Active: True
Name: Salam, Age: 18, City: Sylhet, Active: True
Name: Jalil, Age: 18, City: Dhaka, Active: False
Name: Rafiq, Age: 22, City: Dhaka, Active: False
```

**Named Arguments দিয়ে যেকোনো order এ, যেকোনো parameter এ value দিতে পারো!**

---

### Real Example: File Logger with Optional Parameters

```csharp
class Program
{
    static void Log(string message, 
                    string level = "INFO", 
                    bool showTime = true, 
                    bool showDate = false)
    {
        string output = "";
        
        // Date যোগ করো
        if (showDate)
        {
            output += $"[{DateTime.Now:yyyy-MM-dd}] ";
        }
        
        // Time যোগ করো
        if (showTime)
        {
            output += $"[{DateTime.Now:HH:mm:ss}] ";
        }
        
        // Level যোগ করো
        output += $"[{level}] ";
        
        // Message যোগ করো
        output += message;
        
        Console.WriteLine(output);
    }
    
    static void Main(string[] args)
    {
        Console.WriteLine("📋 LOG EXAMPLES (Optional Parameters)\n");
        
        // শুধু message - বাকি সব default
        Log("Application started");
        
        // message + level
        Log("User logged in", "SUCCESS");
        
        // message + level + time off
        Log("Config loaded", "DEBUG", showTime: false);
        
        // সব option on
        Log("Critical error occurred!", "ERROR", showTime: true, showDate: true);
        
        // শুধু date, time off
        Log("Daily backup completed", "INFO", showTime: false, showDate: true);
    }
}
```

Output:
```
📋 LOG EXAMPLES (Optional Parameters)

[14:45:32] [INFO] Application started
[14:45:32] [SUCCESS] User logged in
[DEBUG] Config loaded
[2024-01-15] [14:45:32] [ERROR] Critical error occurred!
[2024-01-15] [INFO] Daily backup completed
```

---

## params Keyword

কখনো জানো না কয়টা argument আসবে। 2 টা হতে পারে, 10 টা হতে পারে, 100 টাও হতে পারে!

**যেমন:**
- Sum(2, 3)
- Sum(1, 2, 3, 4, 5)
- Sum(10, 20, 30, 40, 50, 60, 70, 80, 90, 100)

Overloading দিয়ে এতগুলো version বানাবে? 😱

**এর জন্য আছে `params` keyword!**

---

### params কীভাবে কাজ করে

```csharp
static int Sum(params int[] numbers)
{
    Console.WriteLine($"Received {numbers.Length} numbers");
    
    int total = 0;
    foreach (int num in numbers)
    {
        total += num;
    }
    return total;
}

static void Main(string[] args)
{
    Console.WriteLine($"Sum(5, 3) = {Sum(5, 3)}");
    Console.WriteLine();
    
    Console.WriteLine($"Sum(1, 2, 3, 4, 5) = {Sum(1, 2, 3, 4, 5)}");
    Console.WriteLine();
    
    Console.WriteLine($"Sum(10, 20, 30, 40, 50, 60) = {Sum(10, 20, 30, 40, 50, 60)}");
    Console.WriteLine();
    
    Console.WriteLine($"Sum() = {Sum()}");  // 0 টা argument ও চলে!
}
```

Output:
```
Received 2 numbers
Sum(5, 3) = 8

Received 5 numbers
Sum(1, 2, 3, 4, 5) = 15

Received 6 numbers
Sum(10, 20, 30, 40, 50, 60) = 210

Received 0 numbers
Sum() = 0
```

---

### params কী করে?

```csharp
static int Sum(params int[] numbers)
```

**`params int[] numbers` মানে:**

1. যত ইচ্ছা int argument দাও
2. সব একটা array তে চলে যাবে
3. Method এ array হিসেবে কাজ করবে

**Visual:**

```
Sum(10, 20, 30, 40)
        │
        ▼
    params int[] numbers
        │
        ▼
    numbers = { 10, 20, 30, 40 }  (Array হয়ে গেছে!)
        │
        ▼
    foreach দিয়ে কাজ করো
```

---

### params এর Rules

#### Rule 1: params শেষে থাকতে হবে

```csharp
// ✅ Correct - params শেষে
static void Test(string name, params int[] numbers)
{
    Console.WriteLine($"Name: {name}");
    Console.WriteLine($"Numbers: {numbers.Length}");
}

// ❌ Wrong - params শেষে নেই!
static void Test(params int[] numbers, string name)  // Error!
{
}
```

#### Rule 2: একটা Method এ একটাই params

```csharp
// ❌ Wrong - দুইটা params!
static void Test(params int[] nums, params string[] names)  // Error!
{
}
```

---

### Real Example: Print All

```csharp
class Program
{
    // যেকোনো সংখ্যক items print করো
    static void PrintAll(string title, params object[] items)
    {
        Console.WriteLine($"📋 {title}");
        Console.WriteLine(new string('-', 30));
        
        if (items.Length == 0)
        {
            Console.WriteLine("   (No items)");
        }
        else
        {
            for (int i = 0; i < items.Length; i++)
            {
                Console.WriteLine($"   {i + 1}. {items[i]}");
            }
        }
        Console.WriteLine();
    }
    
    static void Main(string[] args)
    {
        PrintAll("Shopping List", "Milk", "Bread", "Eggs", "Butter");
        
        PrintAll("Prime Numbers", 2, 3, 5, 7, 11, 13, 17, 19);
        
        PrintAll("Mixed Items", "Hello", 42, 3.14, true, 'X');
        
        PrintAll("Empty List");  // No items
    }
}
```

Output:
```
📋 Shopping List
------------------------------
   1. Milk
   2. Bread
   3. Eggs
   4. Butter

📋 Prime Numbers
------------------------------
   1. 2
   2. 3
   3. 5
   4. 7
   5. 11
   6. 13
   7. 17
   8. 19

📋 Mixed Items
------------------------------
   1. Hello
   2. 42
   3. 3.14
   4. True
   5. X

📋 Empty List
------------------------------
   (No items)
```

---

## ref Keyword

সাধারণত method এ argument pass করলে **value এর copy** যায়।

Method এ change করলেও **original variable change হয় না**।

---

### Problem দেখি

```csharp
static void DoubleIt(int number)
{
    number = number * 2;
    Console.WriteLine($"Inside method: number = {number}");
}

static void Main(string[] args)
{
    int x = 10;
    
    Console.WriteLine($"Before calling method: x = {x}");
    
    DoubleIt(x);
    
    Console.WriteLine($"After calling method: x = {x}");
}
```

Output:
```
Before calling method: x = 10
Inside method: number = 20
After calling method: x = 10
```

**দেখো!** Method এর ভিতরে 20 হয়েছে, কিন্তু original `x` এখনো 10 আছে!

---

### কেন এমন হলো?

```
Main():
    x = 10
        │
        │ Copy যাচ্ছে (value টা copy হয়ে যায়)
        ▼
DoubleIt():
    number = 10  (নতুন variable, x এর copy)
    number = 20  (number change হলো)
        │
        │ (x এর সাথে কোনো connection নেই!)
        ▼
Main():
    x = 10  (unchanged!)
```

`x` এবং `number` সম্পূর্ণ আলাদা variable। একটা change করলে আরেকটায় কিছু হয় না।

---

### Solution: ref Keyword

`ref` দিলে **copy না গিয়ে reference যায়**। মানে method এ যে variable আছে সেটা **same variable**!

```csharp
static void DoubleIt(ref int number)  // ref যোগ করলাম
{
    number = number * 2;
    Console.WriteLine($"Inside method: number = {number}");
}

static void Main(string[] args)
{
    int x = 10;
    
    Console.WriteLine($"Before calling method: x = {x}");
    
    DoubleIt(ref x);  // Call এও ref দিতে হবে!
    
    Console.WriteLine($"After calling method: x = {x}");
}
```

Output:
```
Before calling method: x = 10
Inside method: number = 20
After calling method: x = 20
```

**এবার original `x` ও change হয়েছে!** 🎉

---

### ref দিলে কী হয়?

```
Main():
    x = 10
        │
        │ Reference যাচ্ছে (same variable point করছে)
        ▼
DoubleIt():
    number → x  (number আর x SAME variable!)
    number = 20 মানে x = 20
        │
        ▼
Main():
    x = 20  (changed!)
```

`number` এবং `x` এখন **same variable**! একটা change করলে আরেকটাও change হয়।

---

### Visual Comparison

**Without ref (Copy):**
```
┌─────────────┐     ┌─────────────┐
│   Main()    │     │ DoubleIt()  │
│             │     │             │
│   x = 10 ───┼──→  │ number = 10 │  (Copy তৈরি হলো)
│             │     │ number = 20 │  (Copy change হলো)
│   x = 10    │     │             │  (Original x same আছে)
└─────────────┘     └─────────────┘
```

**With ref (Reference):**
```
┌─────────────┐     ┌─────────────┐
│   Main()    │     │ DoubleIt()  │
│             │     │             │
│   x = 10 ←──┼──── │ number ─────┤  (Same variable!)
│      ↓      │     │             │
│   x = 20    │     │             │  (একটা change = দুইটাই change)
└─────────────┘     └─────────────┘
```

---

### Classic Example: Swap Two Numbers

দুইটা variable এর মান বদলাবদলি করা - এটা `ref` ছাড়া impossible!

```csharp
static void Swap(ref int a, ref int b)
{
    Console.WriteLine($"   Inside Swap (before): a = {a}, b = {b}");
    
    int temp = a;
    a = b;
    b = temp;
    
    Console.WriteLine($"   Inside Swap (after): a = {a}, b = {b}");
}

static void Main(string[] args)
{
    Console.WriteLine("🔄 SWAP EXAMPLE\n");
    
    int x = 10;
    int y = 20;
    
    Console.WriteLine($"Before Swap: x = {x}, y = {y}");
    Console.WriteLine();
    
    Console.WriteLine("Calling Swap...");
    Swap(ref x, ref y);
    Console.WriteLine();
    
    Console.WriteLine($"After Swap: x = {x}, y = {y}");
}
```

Output:
```
🔄 SWAP EXAMPLE

Before Swap: x = 10, y = 20

Calling Swap...
   Inside Swap (before): a = 10, b = 20
   Inside Swap (after): a = 20, b = 10

After Swap: x = 20, y = 10
```

---

### Step by Step: Swap কীভাবে কাজ করে

```
Initial:
    x = 10
    y = 20

Swap(ref x, ref y) call:
    a → x  (a এবং x same)
    b → y  (b এবং y same)

Inside Swap:
    temp = a     →  temp = 10
    a = b        →  a = 20, মানে x = 20
    b = temp     →  b = 10, মানে y = 10

After Swap:
    x = 20 ✅
    y = 10 ✅
```

---

### ref ছাড়া Swap কেন কাজ করে না?

```csharp
// ❌ এটা কাজ করবে না!
static void BadSwap(int a, int b)
{
    int temp = a;
    a = b;
    b = temp;
    // a, b change হলো, কিন্তু সেগুলো copy!
    // Original x, y change হবে না!
}

static void Main(string[] args)
{
    int x = 10, y = 20;
    BadSwap(x, y);
    Console.WriteLine($"x = {x}, y = {y}");  // Still 10, 20!
}
```

Output: `x = 10, y = 20` (swap হয়নি!)

---

## out Keyword

`out` keyword দিয়ে method থেকে **multiple values return** করা যায়।

---

### Problem: Method একটাই জিনিস Return করতে পারে

```csharp
static int Divide(int a, int b)
{
    return a / b;  // শুধু ভাগফল return করতে পারছি
    
    // Remainder কীভাবে return করবো? 🤔
}
```

তুমি হয়তো ভাবছো - "দুইটা method বানাবো!"

```csharp
static int GetQuotient(int a, int b) { return a / b; }
static int GetRemainder(int a, int b) { return a % b; }
```

**কিন্তু এটা inefficient!** দুইবার calculation হচ্ছে।

---

### Solution: out Parameter

```csharp
static int Divide(int a, int b, out int remainder)
{
    remainder = a % b;  // out parameter এ remainder দিচ্ছি
    return a / b;       // return এ quotient দিচ্ছি
}

static void Main(string[] args)
{
    int rem;  // এখানে remainder আসবে
    int quotient = Divide(17, 5, out rem);
    
    Console.WriteLine($"17 ÷ 5 = {quotient} remainder {rem}");
}
```

Output:
```
17 ÷ 5 = 3 remainder 2
```

**এখন একই method call এ দুইটা value পাচ্ছি!** 🎉

---

### out কীভাবে কাজ করে?

```csharp
int rem;
int quotient = Divide(17, 5, out rem);
```

**Step by Step:**

```
Step 1: Divide(17, 5, out rem) call করলাম
        a = 17, b = 5
        remainder → rem (reference)

Step 2: Method এর ভিতরে:
        remainder = a % b = 17 % 5 = 2
        মানে rem = 2 (out দিয়ে পাঠালাম)
        
        return a / b = 17 / 5 = 3
        মানে quotient = 3 (return দিয়ে পাঠালাম)

Step 3: Main() এ ফিরে:
        quotient = 3
        rem = 2
```

---

### out এর Rules

#### Rule 1: Method এ out parameter কে অবশ্যই value দিতে হবে

```csharp
// ❌ Wrong - out কে value দেওয়া হয়নি!
static void Test(out int x)
{
    // x = কিছু দেওয়া হয়নি!
}  // Compile Error!

// ✅ Correct
static void Test(out int x)
{
    x = 100;  // অবশ্যই value দিতে হবে!
}
```

#### Rule 2: Call করার সময় variable initialize না করলেও চলে

```csharp
static void GetValue(out int x)
{
    x = 42;
}

static void Main(string[] args)
{
    int num;  // Initialize করিনি - OK for out!
    GetValue(out num);
    Console.WriteLine(num);  // 42
}
```

---

### ref vs out - পার্থক্য

| Feature | ref | out |
|---------|-----|-----|
| Call এর আগে Initialize করতে হবে? | ✅ হ্যাঁ | ❌ না |
| Method এ value দিতে হবে? | ❌ Optional | ✅ Must |
| Use Case | Existing value modify | Multiple return values |

**Example:**

```csharp
static void RefExample(ref int x)
{
    x = x * 2;  // Existing value modify করছি
}

static void OutExample(out int x)
{
    x = 100;  // নতুন value দিচ্ছি (must!)
}

static void Main(string[] args)
{
    // ref - Initialize করতে হবে
    int a = 10;
    RefExample(ref a);
    Console.WriteLine($"ref result: {a}");  // 20
    
    // out - Initialize না করলেও চলে
    int b;  // No initialization!
    OutExample(out b);
    Console.WriteLine($"out result: {b}");  // 100
}
```

Output:
```
ref result: 20
out result: 100
```

---

### Real Example: TryParse Pattern

C# এর built-in `int.TryParse()` method ও out use করে:

```csharp
static void Main(string[] args)
{
    Console.WriteLine("🔢 NUMBER PARSER\n");
    
    // Valid input
    string input1 = "42";
    int number1;
    bool success1 = int.TryParse(input1, out number1);
    
    Console.WriteLine($"Input: \"{input1}\"");
    Console.WriteLine($"Parse successful: {success1}");
    Console.WriteLine($"Parsed number: {number1}");
    Console.WriteLine();
    
    // Invalid input
    string input2 = "hello";
    int number2;
    bool success2 = int.TryParse(input2, out number2);
    
    Console.WriteLine($"Input: \"{input2}\"");
    Console.WriteLine($"Parse successful: {success2}");
    Console.WriteLine($"Parsed number: {number2}");  // 0 (default)
}
```

Output:
```
🔢 NUMBER PARSER

Input: "42"
Parse successful: True
Parsed number: 42

Input: "hello"
Parse successful: False
Parsed number: 0
```

**TryParse দুইটা জিনিস দেয়:**
- **return value (bool):** Parse successful হয়েছে কিনা
- **out parameter (int):** Parse করা number (যদি successful হয়)

---

### নিজে TryDivide বানাই

```csharp
static bool TryDivide(int a, int b, out int quotient, out int remainder)
{
    // Division by zero check
    if (b == 0)
    {
        quotient = 0;
        remainder = 0;
        return false;  // Failed!
    }
    
    quotient = a / b;
    remainder = a % b;
    return true;  // Success!
}

static void Main(string[] args)
{
    Console.WriteLine("➗ SAFE DIVISION\n");
    
    // Test 1: Normal division
    int q1, r1;
    bool success1 = TryDivide(17, 5, out q1, out r1);
    
    Console.WriteLine("17 ÷ 5:");
    if (success1)
    {
        Console.WriteLine($"   Quotient: {q1}");
        Console.WriteLine($"   Remainder: {r1}");
    }
    else
    {
        Console.WriteLine("   Error: Division failed!");
    }
    Console.WriteLine();
    
    // Test 2: Division by zero
    int q2, r2;
    bool success2 = TryDivide(10, 0, out q2, out r2);
    
    Console.WriteLine("10 ÷ 0:");
    if (success2)
    {
        Console.WriteLine($"   Quotient: {q2}");
        Console.WriteLine($"   Remainder: {r2}");
    }
    else
    {
        Console.WriteLine("   ❌ Error: Cannot divide by zero!");
    }
}
```

Output:
```
➗ SAFE DIVISION

17 ÷ 5:
   Quotient: 3
   Remainder: 2

10 ÷ 0:
   ❌ Error: Cannot divide by zero!
```

---

## Array Pass করা Method এ

Array method এ pass করলে **automatically reference** যায়!

`ref` keyword দেওয়ার দরকার নেই।

---

### Example: Array Modification

```csharp
static void DoubleAllElements(int[] numbers)
{
    Console.WriteLine("Inside method - doubling all elements...");
    
    for (int i = 0; i < numbers.Length; i++)
    {
        numbers[i] = numbers[i] * 2;
    }
}

static void Main(string[] args)
{
    int[] arr = { 1, 2, 3, 4, 5 };
    
    Console.Write("Before: ");
    foreach (int n in arr)
    {
        Console.Write(n + " ");
    }
    Console.WriteLine("\n");
    
    DoubleAllElements(arr);  // ref লেখার দরকার নেই!
    
    Console.Write("\nAfter: ");
    foreach (int n in arr)
    {
        Console.Write(n + " ");
    }
    Console.WriteLine();
}
```

Output:
```
Before: 1 2 3 4 5 

Inside method - doubling all elements...

After: 2 4 6 8 10
```

**Array automatically reference হিসেবে pass হয়!**

---

### কেন Array Reference হিসেবে যায়?

C# এ data types দুই ধরনের:

**Value Types (Copy যায়):**
- int, double, float
- bool, char
- struct

**Reference Types (Reference যায়):**
- Array
- string (special case)
- class objects

Array হলো **Reference Type**, তাই automatically reference যায়।

---

### Array Return করা

```csharp
static int[] CreateFilledArray(int size, int fillValue)
{
    int[] arr = new int[size];
    
    for (int i = 0; i < size; i++)
    {
        arr[i] = fillValue;
    }
    
    return arr;
}

static int[] GetEvenNumbers(int count)
{
    int[] evens = new int[count];
    
    for (int i = 0; i < count; i++)
    {
        evens[i] = (i + 1) * 2;  // 2, 4, 6, 8, ...
    }
    
    return evens;
}

static void Main(string[] args)
{
    // Filled array
    int[] filled = CreateFilledArray(5, 10);
    Console.Write("Filled array: ");
    foreach (int n in filled)
    {
        Console.Write(n + " ");
    }
    Console.WriteLine();
    
    // Even numbers
    int[] evens = GetEvenNumbers(8);
    Console.Write("Even numbers: ");
    foreach (int n in evens)
    {
        Console.Write(n + " ");
    }
    Console.WriteLine();
}
```

Output:
```
Filled array: 10 10 10 10 10 
Even numbers: 2 4 6 8 10 12 14 16
```

---

## Complete Example: Student Grade System

সব concepts একসাথে use করে একটা complete system বানাই:

```csharp
class Program
{
    // ═══════════════════════════════════════════════════════════════
    // UTILITY METHODS
    // ═══════════════════════════════════════════════════════════════
    
    // Print line (Optional parameter)
    static void PrintLine(char c = '─', int length = 50)
    {
        Console.WriteLine(new string(c, length));
    }
    
    // Print header (Overloaded)
    static void PrintHeader(string title)
    {
        PrintLine('═');
        Console.WriteLine($"   {title}");
        PrintLine('═');
    }
    
    static void PrintHeader(string title, string subtitle)
    {
        PrintLine('═');
        Console.WriteLine($"   {title}");
        Console.WriteLine($"   {subtitle}");
        PrintLine('═');
    }
    
    // ═══════════════════════════════════════════════════════════════
    // GRADE CALCULATION METHODS (Overloaded)
    // ═══════════════════════════════════════════════════════════════
    
    // Get grade from single marks
    static string GetGrade(int marks)
    {
        if (marks >= 90) return "A+";
        if (marks >= 80) return "A";
        if (marks >= 70) return "B";
        if (marks >= 60) return "C";
        if (marks >= 50) return "D";
        if (marks >= 40) return "E";
        return "F";
    }
    
    // Get grade from percentage (Overloaded)
    static string GetGrade(double percentage)
    {
        return GetGrade((int)Math.Round(percentage));
    }
    
    // Get grade from total and max marks (Overloaded)
    static string GetGrade(int obtained, int maximum)
    {
        double percentage = (double)obtained / maximum * 100;
        return GetGrade(percentage);
    }
    
    // ═══════════════════════════════════════════════════════════════
    // STATISTICS METHODS (out parameters)
    // ═══════════════════════════════════════════════════════════════
    
    // Get min and max from array
    static void GetMinMax(int[] numbers, out int min, out int max)
    {
        min = numbers[0];
        max = numbers[0];
        
        foreach (int n in numbers)
        {
            if (n < min) min = n;
            if (n > max) max = n;
        }
    }
    
    // Get full statistics
    static void GetStatistics(int[] marks, 
                              out int sum, 
                              out double average, 
                              out int min, 
                              out int max,
                              out int passCount,
                              out int failCount)
    {
        sum = 0;
        passCount = 0;
        failCount = 0;
        
        foreach (int m in marks)
        {
            sum += m;
            if (m >= 40) passCount++;
            else failCount++;
        }
        
        average = (double)sum / marks.Length;
        GetMinMax(marks, out min, out max);
    }
    
    // ═══════════════════════════════════════════════════════════════
    // ARRAY MODIFICATION METHODS (ref behavior)
    // ═══════════════════════════════════════════════════════════════
    
    // Sort arrays together (keeps names with marks)
    static void SortByMarks(string[] names, int[] marks, bool descending = true)
    {
        // Bubble sort
        for (int i = 0; i < marks.Length - 1; i++)
        {
            for (int j = 0; j < marks.Length - 1 - i; j++)
            {
                bool shouldSwap = descending 
                    ? marks[j] < marks[j + 1] 
                    : marks[j] > marks[j + 1];
                
                if (shouldSwap)
                {
                    // Swap marks
                    int tempMark = marks[j];
                    marks[j] = marks[j + 1];
                    marks[j + 1] = tempMark;
                    
                    // Swap names
                    string tempName = names[j];
                    names[j] = names[j + 1];
                    names[j + 1] = tempName;
                }
            }
        }
    }
    
    // Add bonus to all marks (modifies array)
    static void AddBonus(int[] marks, int bonus)
    {
        for (int i = 0; i < marks.Length; i++)
        {
            marks[i] += bonus;
            if (marks[i] > 100) marks[i] = 100;  // Cap at 100
        }
    }
    
    // ═══════════════════════════════════════════════════════════════
    // DISPLAY METHODS (params)
    // ═══════════════════════════════════════════════════════════════
    
    // Print multiple items
    static void PrintItems(string label, params object[] items)
    {
        Console.Write($"{label}: ");
        foreach (var item in items)
        {
            Console.Write($"{item} ");
        }
        Console.WriteLine();
    }
    
    // ═══════════════════════════════════════════════════════════════
    // MAIN PROGRAM
    // ═══════════════════════════════════════════════════════════════
    
    static void Main(string[] args)
    {
        // Header
        PrintHeader("📚 STUDENT GRADE MANAGEMENT SYSTEM", "CPS Academy - Final Results");
        Console.WriteLine();
        
        // Data
        string[] students = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil", "Rafiq" };
        int[] marks = { 78, 92, 35, 85, 95, 62 };
        
        // Show original data
        Console.WriteLine("📋 ORIGINAL DATA:");
        PrintLine();
        for (int i = 0; i < students.Length; i++)
        {
            string grade = GetGrade(marks[i]);
            string status = marks[i] >= 40 ? "✅" : "❌";
            Console.WriteLine($"   {students[i],-10} {marks[i],3} marks   Grade: {grade}  {status}");
        }
        Console.WriteLine();
        
        // Statistics using out
        int sum, min, max, passCount, failCount;
        double average;
        GetStatistics(marks, out sum, out average, out min, out max, out passCount, out failCount);
        
        Console.WriteLine("📊 CLASS STATISTICS:");
        PrintLine();
        Console.WriteLine($"   Total Students:  {students.Length}");
        Console.WriteLine($"   Sum of Marks:    {sum}");
        Console.WriteLine($"   Average:         {average:F2}");
        Console.WriteLine($"   Highest:         {max}");
        Console.WriteLine($"   Lowest:          {min}");
        Console.WriteLine($"   Passed:          {passCount}");
        Console.WriteLine($"   Failed:          {failCount}");
        Console.WriteLine($"   Pass Rate:       {passCount * 100.0 / students.Length:F1}%");
        Console.WriteLine();
        
        // Grade overloading demo
        Console.WriteLine("🎯 GRADE CALCULATION METHODS (Overloading Demo):");
        PrintLine();
        Console.WriteLine($"   GetGrade(85)        = {GetGrade(85)}     (from marks)");
        Console.WriteLine($"   GetGrade(85.7)      = {GetGrade(85.7)}     (from percentage)");
        Console.WriteLine($"   GetGrade(170, 200)  = {GetGrade(170, 200)}     (from total/max)");
        Console.WriteLine();
        
        // Copy arrays for ranking (so original stays intact)
        string[] rankedNames = new string[students.Length];
        int[] rankedMarks = new int[marks.Length];
        Array.Copy(students, rankedNames, students.Length);
        Array.Copy(marks, rankedMarks, marks.Length);
        
        // Sort by marks (descending)
        SortByMarks(rankedNames, rankedMarks, descending: true);
        
        Console.WriteLine("🏆 TOP 3 RANKINGS:");
        PrintLine();
        string[] medals = { "🥇", "🥈", "🥉" };
        for (int i = 0; i < 3 && i < rankedNames.Length; i++)
        {
            Console.WriteLine($"   {medals[i]} {rankedNames[i],-10} {rankedMarks[i]} marks");
        }
        Console.WriteLine();
        
        // Bonus marks demo
        Console.WriteLine("🎁 BONUS MARKS DEMO:");
        PrintLine();
        int[] bonusMarks = { 78, 92, 35, 85, 95, 62 };
        PrintItems("   Before bonus", bonusMarks[0], bonusMarks[1], bonusMarks[2], bonusMarks[3], bonusMarks[4], bonusMarks[5]);
        
        AddBonus(bonusMarks, 5);  // Add 5 marks bonus
        PrintItems("   After +5 bonus", bonusMarks[0], bonusMarks[1], bonusMarks[2], bonusMarks[3], bonusMarks[4], bonusMarks[5]);
        Console.WriteLine();
        
        // Footer
        PrintLine('═');
        Console.WriteLine("   Report Generated Successfully!");
        PrintLine('═');
    }
}
```

Output:
```
══════════════════════════════════════════════════
   📚 STUDENT GRADE MANAGEMENT SYSTEM
   CPS Academy - Final Results
══════════════════════════════════════════════════

📋 ORIGINAL DATA:
──────────────────────────────────────────────────
   Rahim       78 marks   Grade: B  ✅
   Karim       92 marks   Grade: A+  ✅
   Jabbar      35 marks   Grade: F  ❌
   Salam       85 marks   Grade: A  ✅
   Jalil       95 marks   Grade: A+  ✅
   Rafiq       62 marks   Grade: C  ✅

📊 CLASS STATISTICS:
──────────────────────────────────────────────────
   Total Students:  6
   Sum of Marks:    447
   Average:         74.50
   Highest:         95
   Lowest:          35
   Passed:          5
   Failed:          1
   Pass Rate:       83.3%

🎯 GRADE CALCULATION METHODS (Overloading Demo):
──────────────────────────────────────────────────
   GetGrade(85)        = A     (from marks)
   GetGrade(85.7)      = A     (from percentage)
   GetGrade(170, 200)  = A     (from total/max)

🏆 TOP 3 RANKINGS:
──────────────────────────────────────────────────
   🥇 Jalil      95 marks
   🥈 Karim      92 marks
   🥉 Salam      85 marks

🎁 BONUS MARKS DEMO:
──────────────────────────────────────────────────
   Before bonus: 78 92 35 85 95 62 
   After +5 bonus: 83 97 40 90 100 67 

══════════════════════════════════════════════════
   Report Generated Successfully!
══════════════════════════════════════════════════
```

---

## Common Mistakes ⚠️

### Mistake 1: Overloading এ শুধু Return Type Different

```csharp
// ❌ Wrong - শুধু return type different
static int GetValue() { return 10; }
static double GetValue() { return 10.5; }  // Error!

// ✅ Correct - Parameter ও different করো
static int GetValue() { return 10; }
static double GetValue(bool asDouble) { return 10.5; }
```

---

### Mistake 2: Optional Parameter আগে, Required পরে

```csharp
// ❌ Wrong
static void Test(int a = 10, int b)  // Error!
{
}

// ✅ Correct
static void Test(int b, int a = 10)
{
}
```

---

### Mistake 3: params শেষে নেই

```csharp
// ❌ Wrong
static void Test(params int[] nums, string name)  // Error!
{
}

// ✅ Correct
static void Test(string name, params int[] nums)
{
}
```

---

### Mistake 4: ref Variable Initialize না করা

```csharp
// ❌ Wrong
int num;
RefMethod(ref num);  // Error! num initialized না

// ✅ Correct
int num = 0;
RefMethod(ref num);
```

---

### Mistake 5: out Parameter এ Value না দেওয়া

```csharp
// ❌ Wrong
static void Test(out int x)
{
    // x = কিছু নেই!
}  // Error!

// ✅ Correct
static void Test(out int x)
{
    x = 100;
}
```

---

### Mistake 6: Call এ ref/out ভুলে যাওয়া

```csharp
static void Modify(ref int x) { x = 100; }
static void GetValue(out int x) { x = 50; }

// ❌ Wrong
int a = 10, b;
Modify(a);      // Error! ref দাওনি
GetValue(b);    // Error! out দাওনি

// ✅ Correct
Modify(ref a);
GetValue(out b);
```

---

## Summary

আজকে শিখলাম:

| Concept | মানে | Example |
|---------|------|---------|
| **Method Overloading** | Same নামে multiple methods, different parameters | `Add(int, int)` এবং `Add(int, int, int)` |
| **Optional Parameters** | Default value সহ parameters | `void Greet(string name, string msg = "Hello")` |
| **params** | যত ইচ্ছা arguments | `int Sum(params int[] numbers)` |
| **ref** | Variable এর reference পাঠানো | `void Swap(ref int a, ref int b)` |
| **out** | Multiple values return | `void Divide(int a, int b, out int rem)` |

---

### Quick Reference:

```csharp
// Overloading - Different parameters
static int Add(int a, int b) { return a + b; }
static int Add(int a, int b, int c) { return a + b + c; }

// Optional Parameters - Default values
static void Greet(string name, string msg = "Hello") { ... }

// params - Variable number of arguments
static int Sum(params int[] numbers) { ... }

// ref - Pass by reference
static void Double(ref int x) { x *= 2; }
int num = 10;
Double(ref num);  // num = 20

// out - Return multiple values
static void Divide(int a, int b, out int remainder)
{
    remainder = a % b;
}
int rem;
Divide(17, 5, out rem);  // rem = 2
```

---

### Rules মনে রাখো:

| Feature | Rule |
|---------|------|
| Overloading | শুধু return type different হলে হবে না |
| Optional | Required আগে, Optional পরে |
| params | একটাই, শেষে থাকতে হবে |
| ref | Call এর আগে initialize করতে হবে |
| out | Method এ অবশ্যই value দিতে হবে |
| Array | Automatically reference যায় |

---

**Next Part এ:** String Methods শিখবো!

---

*CPS Academy - Learn. Code. Grow.*
