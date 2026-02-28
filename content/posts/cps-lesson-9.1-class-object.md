---
title: "Lesson 9.1: Class ও Object — Blueprint থেকে আসল জিনিস"
date: "2026-04-01"
excerpt: "OOP কেন দরকার, Class কী (Blueprint), Object কী (আসল জিনিস), Fields, `new` keyword, dot (.) operator, Multiple Objects, এবং প্রতিটা Object �"
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


> **এই Lesson এ শিখবে:** OOP কেন দরকার, Class কী (Blueprint), Object কী (আসল জিনিস), Fields, `new` keyword, dot (.) operator, Multiple Objects, এবং প্রতিটা Object আলাদা।

---

## সমস্যা দেখি

3 জন Student এর data রাখতে চাই (Name, Roll, Marks):

```csharp
// ❌ আলাদা variables — 100 জন হলে 300 টা variable!
string name1 = "Rahim"; int roll1 = 101; int marks1 = 85;
string name2 = "Karim"; int roll2 = 102; int marks2 = 90;
string name3 = "Jabbar"; int roll3 = 103; int marks3 = 78;
```

**সমস্যা:**
- কোন name কোন roll এর সাথে related — track করা কঠিন
- 100 জন হলে 300 টা variable!
- function এ pass করতে হলে সব আলাদা আলাদা দিতে হয়

**Solution: Class ও Object!**

---

## Class কী?

**Class = Blueprint / নকশা / ছাঁচ**

```
     ছাঁচ (Class)            আসল জিনিস (Objects)
    ┌──────────┐         ┌─────────┬─────────┬─────────┐
    │          │   →     │ 🎂 Cake │ 🎂 Cake │ 🎂 Cake │
    │  ⭐ Shape │   →     │    1    │    2    │    3    │
    │          │   →     │         │         │         │
    └──────────┘         └─────────┴─────────┴─────────┘
    
    একটা ছাঁচ দিয়ে অনেক Cake!
```

Class বলে দেয় কী কী data থাকবে আর কী কী কাজ করা যাবে — কিন্তু **Class নিজে কোনো real জিনিস না!**

---

## Programming এ Class

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;
}
```

এটা Student এর **Blueprint** — বলছে "একজন Student এর Name, Roll, Marks থাকবে।"

**কিন্তু এখনো কোনো real Student তৈরি হয়নি!**

### প্রতিটা part:

```csharp
class Student
──┬── ───┬───
  │      └── Class এর নাম (PascalCase)
  └── class keyword

{
    public string Name;
    ──┬─── ──┬─── ─┬──
      │      │     └── Field এর নাম
      │      └── Data type
      └── Access modifier (public = বাইরে থেকে access যায়)
}
```

---

## Object কী?

**Object = Class (Blueprint) থেকে বানানো আসল জিনিস।**

```csharp
Student rahim = new Student();
```

`new Student()` বলে → "Student blueprint অনুযায়ী একজন আসল Student বানাও!"

---

## Object তৈরি ও Value দেওয়া

### Step 1: Class লেখো

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;
}
```

### Step 2: Object তৈরি করো

```csharp
Student rahim = new Student();
```

### Step 3: Values দাও (dot operator দিয়ে)

```csharp
rahim.Name = "Rahim";
rahim.Roll = 101;
rahim.Marks = 85;
```

### Step 4: Values পড়ো

```csharp
Console.WriteLine(rahim.Name);   // Rahim
Console.WriteLine(rahim.Roll);   // 101
Console.WriteLine(rahim.Marks);  // 85
```

---

## Multiple Objects

**একই Class থেকে অনেক Object:**

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;
}

// 3 টা Object — 3 জন Student
Student rahim = new Student();
rahim.Name = "Rahim"; rahim.Roll = 101; rahim.Marks = 85;

Student karim = new Student();
karim.Name = "Karim"; karim.Roll = 102; karim.Marks = 90;

Student jabbar = new Student();
jabbar.Name = "Jabbar"; jabbar.Roll = 103; jabbar.Marks = 78;
```

**প্রতিটা Object আলাদা!**

```csharp
Console.WriteLine(rahim.Name);   // Rahim
Console.WriteLine(karim.Name);   // Karim
Console.WriteLine(jabbar.Name);  // Jabbar
```

`rahim.Name` change করলে `karim.Name` affect হবে না — **আলাদা memory!**

---

## Array of Objects

100 জন Student হলে?

```csharp
Student[] students = new Student[3];

students[0] = new Student();
students[0].Name = "Rahim";
students[0].Roll = 101;
students[0].Marks = 85;

students[1] = new Student();
students[1].Name = "Karim";
students[1].Roll = 102;
students[1].Marks = 90;

// Loop দিয়ে display
for (int i = 0; i < students.Length; i++)
{
    Console.WriteLine($"{students[i].Name}: Roll {students[i].Roll}, Marks {students[i].Marks}");
}
```

---

## আগে vs এখন

| আগে (Variables) | এখন (Class + Object) |
|-----------------|----------------------|
| `string name1, name2...` | `Student rahim = new Student()` |
| data ছড়িয়ে ছিটিয়ে | data **একসাথে** packed |
| 100 জন = 300 variable | 100 জন = 100 object |
| function এ pass কঠিন | function এ **একটা object** pass |

---

## Summary

| Term | মানে | Example |
|------|------|---------|
| **Class** | Blueprint / নকশা | `class Student { }` |
| **Object** | আসল জিনিস | `new Student()` |
| **Field** | Data রাখার variable | `public string Name;` |
| **new** | নতুন object তৈরি | `new Student()` |
| **.** (dot) | Object এর member access | `rahim.Name` |

```
Class = নকশা 📝  →  Object = আসল জিনিস 🏠
একটা নকশা → অনেক বাড়ি
একটা Class → অনেক Object
```

---

**পরের Lesson:** Methods ও Constructor — Class এ function রাখা এবং object তৈরির সময়ই values দেওয়া।

---

*CPS Academy - Learn. Code. Grow.*
