---
title: "Lesson 9.2: Methods ও Constructor — Class এ Function ও Initialization"
date: "2026-04-02"
excerpt: "Class এ Methods লেখা, Method এ Fields use করা, Constructor কী, Default vs Parameterized Constructor, Multiple Constructors (Overloading), এবং Complete Student/Product examp"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - oop
  - class
  - object
  - constructor
draft: false
---


> **এই Lesson এ শিখবে:** Class এ Methods লেখা, Method এ Fields use করা, Constructor কী, Default vs Parameterized Constructor, Multiple Constructors (Overloading), এবং Complete Student/Product examples।

---

## Class এ Methods

এতক্ষণ Class এ শুধু **data** (Fields) রেখেছি। কিন্তু **function** ও রাখা যায়!

### Method ছাড়া:

```csharp
// প্রতিটা student এর জন্য same code repeat!
if (rahim.Marks >= 80) grade1 = "A+";
if (karim.Marks >= 80) grade2 = "A+";
// ... বারবার!
```

### Method দিয়ে:

```csharp
string grade1 = rahim.GetGrade();  // এক লাইনে!
string grade2 = karim.GetGrade();  // আবার এক লাইনে!
```

---

## Method লেখার নিয়ম

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;

    // Method: Grade বের করো
    public string GetGrade()
    {
        if (Marks >= 80) return "A+";
        if (Marks >= 70) return "A";
        if (Marks >= 60) return "B";
        if (Marks >= 50) return "C";
        if (Marks >= 40) return "D";
        return "F";
    }

    // Method: Pass কিনা
    public bool IsPassed()
    {
        return Marks >= 40;
    }

    // Method: Info display
    public void DisplayInfo()
    {
        Console.WriteLine($"Name: {Name}");
        Console.WriteLine($"Roll: {Roll}");
        Console.WriteLine($"Marks: {Marks}");
        Console.WriteLine($"Grade: {GetGrade()}");  // নিজের method call!

        if (IsPassed())
            Console.WriteLine("Status: PASSED ✅");
        else
            Console.WriteLine("Status: FAILED ❌");
    }
}
```

**লক্ষ্য করো:** Method এর ভেতরে সরাসরি `Marks`, `Name` use করা যাচ্ছে — কারণ same class এর field!

---

## Method Call করা

```csharp
Student rahim = new Student();
rahim.Name = "Rahim";
rahim.Roll = 101;
rahim.Marks = 85;

Console.WriteLine(rahim.GetGrade());   // A+
Console.WriteLine(rahim.IsPassed());   // True
rahim.DisplayInfo();
```

Output:
```
A+
True
Name: Rahim
Roll: 101
Marks: 85
Grade: A+
Status: PASSED ✅
```

---

## Constructor কী?

এতক্ষণ 4 লাইন দিয়ে object তৈরি করছিলাম:

```csharp
Student rahim = new Student();  // আগে object
rahim.Name = "Rahim";           // পরে value
rahim.Roll = 101;
rahim.Marks = 85;
```

**Constructor দিয়ে 1 লাইনে!**

```csharp
Student rahim = new Student("Rahim", 101, 85);
```

---

## Constructor = Special Method

| Feature | Constructor | Normal Method |
|---------|-------------|---------------|
| নাম | **Class এর নামেই** | যেকোনো নাম |
| Call | Object তৈরির সময় **auto** | নিজে call করতে হয় |
| Return type | **নেই** (void ও না!) | আছে |

---

## Default Constructor

কোনো constructor না লিখলে C# নিজে empty constructor বানায়:

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;

    // C# নিজে এটা বানায়:
    // public Student() { }
}

Student rahim = new Student();  // Empty constructor call
```

---

## Parameterized Constructor

**এটাই সবচেয়ে useful!**

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;

    // Constructor with parameters
    public Student(string name, int roll, int marks)
    {
        Name = name;
        Roll = roll;
        Marks = marks;
    }

    public string GetGrade()
    {
        if (Marks >= 80) return "A+";
        if (Marks >= 70) return "A";
        if (Marks >= 60) return "B";
        if (Marks >= 50) return "C";
        if (Marks >= 40) return "D";
        return "F";
    }

    public void DisplayInfo()
    {
        Console.WriteLine($"{Name} (Roll: {Roll}) — {Marks} marks — Grade: {GetGrade()}");
    }
}
```

**এখন object তৈরি:**

```csharp
Student rahim = new Student("Rahim", 101, 85);
Student karim = new Student("Karim", 102, 90);
Student jabbar = new Student("Jabbar", 103, 78);

rahim.DisplayInfo();   // Rahim (Roll: 101) — 85 marks — Grade: A+
karim.DisplayInfo();   // Karim (Roll: 102) — 90 marks — Grade: A+
jabbar.DisplayInfo();  // Jabbar (Roll: 103) — 78 marks — Grade: A
```

**4 লাইন → 1 লাইন!**

---

## Multiple Constructors (Overloading)

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;

    // Constructor 1: সব info দাও
    public Student(string name, int roll, int marks)
    {
        Name = name;
        Roll = roll;
        Marks = marks;
    }

    // Constructor 2: শুধু name আর roll
    public Student(string name, int roll)
    {
        Name = name;
        Roll = roll;
        Marks = 0;  // default
    }
}

Student s1 = new Student("Rahim", 101, 85);  // Constructor 1
Student s2 = new Student("Karim", 102);       // Constructor 2
```

---

## Complete Example: Student Report 📊

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;

    public Student(string name, int roll, int marks)
    {
        Name = name;
        Roll = roll;
        Marks = marks;
    }

    public string GetGrade()
    {
        if (Marks >= 80) return "A+";
        if (Marks >= 70) return "A";
        if (Marks >= 60) return "B";
        if (Marks >= 50) return "C";
        if (Marks >= 40) return "D";
        return "F";
    }

    public bool IsPassed() { return Marks >= 40; }
}

// Main
Student[] students = {
    new Student("Rahim", 101, 85),
    new Student("Karim", 102, 90),
    new Student("Jabbar", 103, 35),
    new Student("Salam", 104, 72)
};

Console.WriteLine("📋 STUDENT REPORT");
Console.WriteLine("══════════════════════════════════════");

int passed = 0;
foreach (Student s in students)
{
    string status = s.IsPassed() ? "✅" : "❌";
    Console.WriteLine($"  {status} {s.Name} (Roll: {s.Roll}) — {s.Marks} — {s.GetGrade()}");
    if (s.IsPassed()) passed++;
}

Console.WriteLine($"\nPassed: {passed}/{students.Length}");
```

Output:
```
📋 STUDENT REPORT
══════════════════════════════════════
  ✅ Rahim (Roll: 101) — 85 — A+
  ✅ Karim (Roll: 102) — 90 — A+
  ❌ Jabbar (Roll: 103) — 35 — F
  ✅ Salam (Roll: 104) — 72 — A

Passed: 3/4
```

---

## Complete Example: Product Class 🛒

```csharp
class Product
{
    public string Name;
    public double Price;
    public int Stock;

    public Product(string name, double price, int stock)
    {
        Name = name;
        Price = price;
        Stock = stock;
    }

    public bool IsAvailable() { return Stock > 0; }

    public double GetTotal(int qty)
    {
        if (qty > Stock)
        {
            Console.WriteLine($"⚠️ Only {Stock} available!");
            return Stock * Price;
        }
        return qty * Price;
    }
}

Product phone = new Product("iPhone 15", 150000, 10);
Product laptop = new Product("MacBook Pro", 250000, 0);

Console.WriteLine($"{phone.Name}: {(phone.IsAvailable() ? "In Stock" : "Out of Stock")}");
Console.WriteLine($"5 units total: {phone.GetTotal(5)} tk");

Console.WriteLine($"{laptop.Name}: {(laptop.IsAvailable() ? "In Stock" : "Out of Stock")}");
```

---

## Summary

| Term | মানে |
|------|------|
| **Method** | Class এর function |
| **Constructor** | Object তৈরির special method |
| **Default Constructor** | Empty, C# নিজে বানায় |
| **Parameterized Constructor** | Values নিয়ে object তৈরি |

**মনে রাখো:**
- Constructor নাম = **Class এর নাম**
- Constructor এ **return type নেই**
- `new Student("Rahim", 101, 85)` → Constructor call
- Method এ same class এর fields সরাসরি use করা যায়

---

**Module 9 Complete!** 🎉 এটাই OOP এর শুরু — পরবর্তীতে Inheritance, Polymorphism, Interface শিখবে!

---

*CPS Academy - Learn. Code. Grow.*
