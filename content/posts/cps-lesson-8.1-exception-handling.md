---
title: "Lesson 8.1: Exception Handling — try-catch-finally"
date: "2026-03-29"
excerpt: "Exception কী, Bug vs Error vs Exception, Common Exceptions, try-catch syntax, Exception object (Message, StackTrace), Multiple catch blocks, finally block, এবং real-world examples"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - exception-handling
  - error-handling
  - try-catch
draft: false
---


> **এই Lesson এ শিখবে:** Exception কী, Bug vs Error vs Exception, Common Exceptions, try-catch syntax, Exception object (Message, StackTrace), Multiple catch blocks, finally block, এবং real-world examples।

---

## Exception কী?

**Exception** = program চলাকালীন unexpected situation যা normal execution বন্ধ করে দেয়।

```csharp
Console.Write("Enter a number: ");
int num = int.Parse(Console.ReadLine());  // User "hello" দিলে? 💥
```

User "hello" দিলে → **FormatException** → Program crash!

---

## Bug vs Error vs Exception

| Type | কখন | Example |
|------|------|---------|
| **Bug** | Logic ভুল | Loop infinite হয়ে গেল |
| **Error** | Compile time | Semicolon miss |
| **Exception** | **Runtime** | User ভুল input দিলে |

Exception হলো **runtime** এ হয় এবং **handle করা যায়!**

---

## Common Exceptions

| Exception | কখন হয় |
|-----------|---------|
| `DivideByZeroException` | 0 দিয়ে ভাগ |
| `FormatException` | ভুল format convert |
| `NullReferenceException` | null object access |
| `IndexOutOfRangeException` | Array এর বাইরে index |
| `FileNotFoundException` | File নেই |
| `ArgumentException` | Invalid argument |

---

## try-catch — Error Handle করা

### Without try-catch (crashes!):

```csharp
Console.Write("Enter number: ");
int num = int.Parse(Console.ReadLine());  // "hello" দিলে crash!
Console.WriteLine($"You entered: {num}");
```

### With try-catch (safe!):

```csharp
try
{
    Console.Write("Enter number: ");
    int num = int.Parse(Console.ReadLine());
    Console.WriteLine($"You entered: {num}");
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Error: {ex.Message}");
}

Console.WriteLine("Program continues...");  // crash হয় না!
```

**try** = "চেষ্টা করো", **catch** = "ধরো" (error ধরো)

---

## Exception Object

`ex` থেকে error এর info পাওয়া যায়:

```csharp
catch (Exception ex)
{
    Console.WriteLine(ex.Message);     // Error description
    Console.WriteLine(ex.GetType());   // Exception type
    Console.WriteLine(ex.StackTrace);  // কোন line এ হয়েছে
}
```

---

## Multiple Catch Blocks

বিভিন্ন error আলাদাভাবে handle:

```csharp
try
{
    Console.Write("Enter number: ");
    int num = int.Parse(Console.ReadLine());
    int result = 100 / num;
    Console.WriteLine($"100 / {num} = {result}");
}
catch (FormatException)
{
    Console.WriteLine("❌ Please enter a valid number!");
}
catch (DivideByZeroException)
{
    Console.WriteLine("❌ Cannot divide by zero!");
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Unexpected error: {ex.Message}");
}
```

**⚠️ Rule:** Specific catch **আগে**, General catch (`Exception`) **পরে।**

---

## finally Block — সবসময় Execute হয়

```csharp
try
{
    // Risky code
}
catch (Exception ex)
{
    // Handle error
}
finally
{
    // ALWAYS runs! Error হোক বা না হোক
}
```

### কেন finally দরকার?

**Resources cleanup!** File, database connection, network — open করলে close করতে হয়:

```csharp
StreamReader reader = null;

try
{
    reader = new StreamReader("data.txt");
    string content = reader.ReadToEnd();
    Console.WriteLine(content);
}
catch (FileNotFoundException)
{
    Console.WriteLine("❌ File not found!");
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Error: {ex.Message}");
}
finally
{
    if (reader != null)
        reader.Close();  // Error হলেও close হবে! ✅
    Console.WriteLine("📋 Cleanup done.");
}
```

---

## Example: Safe Calculator 🧮

```csharp
while (true)
{
    try
    {
        Console.Write("Enter first number (0 to exit): ");
        int a = int.Parse(Console.ReadLine());
        if (a == 0) break;

        Console.Write("Enter second number: ");
        int b = int.Parse(Console.ReadLine());

        Console.Write("Operator (+, -, *, /): ");
        string op = Console.ReadLine();

        int result = op switch
        {
            "+" => a + b,
            "-" => a - b,
            "*" => a * b,
            "/" => a / b,
            _ => throw new Exception($"Unknown operator: {op}")
        };

        Console.WriteLine($"Result: {a} {op} {b} = {result}\n");
    }
    catch (FormatException)
    {
        Console.WriteLine("❌ Please enter valid numbers!\n");
    }
    catch (DivideByZeroException)
    {
        Console.WriteLine("❌ Cannot divide by zero!\n");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ Error: {ex.Message}\n");
    }
}
```

---

## Example: Safe Student Grade System 📊

```csharp
string[] names = { "Rahim", "Karim", "Jabbar" };
int[] marks = { 85, 110, -5 };

for (int i = 0; i < names.Length; i++)
{
    try
    {
        if (marks[i] < 0 || marks[i] > 100)
            throw new Exception($"Invalid marks: {marks[i]}");

        string grade = marks[i] >= 80 ? "A" : marks[i] >= 60 ? "B" : marks[i] >= 40 ? "C" : "F";
        Console.WriteLine($"✅ {names[i]}: {marks[i]} → {grade}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ {names[i]}: {ex.Message}");
    }
}
```

Output:
```
✅ Rahim: 85 → A
❌ Karim: Invalid marks: 110
❌ Jabbar: Invalid marks: -5
```

---

## Summary

```csharp
try
{
    // Risky code
}
catch (SpecificException ex)
{
    // Handle specific error
}
catch (Exception ex)
{
    // Handle any other error
}
finally
{
    // Always runs - cleanup
}
```

**মনে রাখো:**
- `try` এ error হলে বাকি code **skip** হয়
- Specific catch **আগে**, General catch **পরে**
- `finally` **সবসময়** execute হয়
- `ex.Message` দিয়ে error description পাওয়া যায়

---

**পরের Lesson:** throw ও Custom Exceptions — নিজে exception throw করা এবং নিজের exception class বানানো।

---

*CPS Academy - Learn. Code. Grow.*
