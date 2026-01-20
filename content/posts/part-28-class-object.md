---
title: 'Part 28: Class এবং Object'
date: '2026-01-20'
excerpt: 'Part 28: Class এবং Object - OOP basics শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - OOP
  - classes
  - tutorial
draft: false
---

# Part 28: Class এবং Object - Basics

## গল্প দিয়ে শুরু করি

ধরো তুমি **3 জন Student** এর data রাখতে চাও।

প্রতিটা Student এর আছে:
- Name
- Roll
- Marks

**কীভাবে রাখবে?**

---

### প্রথম চিন্তা: আলাদা আলাদা Variable

```csharp
// Student 1
string name1 = "Rahim";
int roll1 = 101;
int marks1 = 85;

// Student 2
string name2 = "Karim";
int roll2 = 102;
int marks2 = 90;

// Student 3
string name3 = "Jabbar";
int roll3 = 103;
int marks3 = 78;
```

**সমস্যা কী?**

- 3 জনের জন্য **9 টা variable!** 😫
- 100 জন student হলে **300 টা variable?**
- `name1` এর সাথে `roll1` আর `marks1` related - কিন্তু code দেখে বোঝার উপায় নেই
- Variable নাম মনে রাখা কঠিন

---

### দ্বিতীয় চিন্তা: Array

```csharp
string[] names = { "Rahim", "Karim", "Jabbar" };
int[] rolls = { 101, 102, 103 };
int[] marks = { 85, 90, 78 };
```

**একটু ভালো, কিন্তু এখনো সমস্যা আছে:**

```
names[0] = "Rahim"     rolls[0] = 101     marks[0] = 85
names[1] = "Karim"     rolls[1] = 102     marks[1] = 90
names[2] = "Jabbar"    rolls[2] = 103     marks[2] = 78

তুমি জানো index 0 এর তিনটাই Rahim এর।
কিন্তু code দেখে কেউ বুঝবে?
```

**আরো সমস্যা:**

- 3 টা আলাদা Array manage করতে হচ্ছে
- একটা student delete করলে 3 টা array থেকে delete করতে হবে
- নতুন field add করতে হলে (যেমন Age) নতুন array লাগবে
- ভুল হওয়ার chance অনেক!

---

### আসল সমস্যাটা কী?

**Related data গুলো একসাথে নেই!**

Name, Roll, Marks - এগুলো তো **একজন Student এরই data**। 

কিন্তু আমরা রাখছি আলাদা আলাদা জায়গায়।

**যদি এমন হতো:**

```
Student 1 = { Name: "Rahim", Roll: 101, Marks: 85 }
Student 2 = { Name: "Karim", Roll: 102, Marks: 90 }
Student 3 = { Name: "Jabbar", Roll: 103, Marks: 78 }
```

**একজন Student এর সব data একসাথে!** 🎉

**এটাই করা যায় Class আর Object দিয়ে!**

---

## Class কী?

**Class** হলো একটা **Blueprint** বা **নকশা** বা **ছাঁচ**।

এটা বলে দেয়:
- কী কী **data** থাকবে (Fields/Properties)
- কী কী **কাজ** করা যাবে (Methods)

**কিন্তু Class নিজে কোনো real জিনিস না!** এটা শুধু design।

---

### Real-life Example ১: বাড়ির নকশা

**Architect একটা নকশা বানালো:**

```
┌─────────────────────────────────────┐
│         🏠 HOUSE BLUEPRINT          │
├─────────────────────────────────────┤
│                                     │
│    DATA (কী থাকবে):                 │
│    ─────────────────                │
│    • Owner Name                     │
│    • Address                        │
│    • Number of Rooms: 3             │
│    • Number of Bathrooms: 2         │
│    • Has Garden: Yes/No             │
│                                     │
│    FUNCTIONS (কী করা যাবে):         │
│    ─────────────────                │
│    • Open Door                      │
│    • Close Door                     │
│    • Turn On Lights                 │
│                                     │
└─────────────────────────────────────┘
```

**এটা কি আসল বাড়ি?**

**না!** এটা শুধু **নকশা** - কাগজে আঁকা design।

এই নকশা দেখে বোঝা যায় বাড়িতে কী কী থাকবে, কিন্তু এখনো কোনো আসল বাড়ি নেই!

---

### Real-life Example ২: Cake এর ছাঁচ

```
     ছাঁচ (Mold)              আসল Cake
    ┌──────────┐         ┌──────────────┐
    │   ⭐     │   →    │   🎂 Cake 1   │
    │  Shape   │   →    │   🎂 Cake 2   │
    │          │   →    │   🎂 Cake 3   │
    └──────────┘         └──────────────┘
    
    একটা ছাঁচ দিয়ে
    অনেক Cake বানানো যায়!
```

ছাঁচ নিজে Cake না, কিন্তু ছাঁচ ছাড়া Cake এর shape ঠিক হবে না!

---

### Programming এ Class

```csharp
class Student
{
    // Data (Fields)
    public string Name;
    public int Roll;
    public int Marks;
}
```

**এটা হলো Student এর Blueprint!**

বলছে - "একজন Student এর Name, Roll, Marks থাকবে।"

**কিন্তু এখনো কোনো real Student তৈরি হয়নি!**

---

## Object কী?

**Object** হলো Class (Blueprint) থেকে বানানো **আসল জিনিস**।

- Blueprint = নকশা
- Object = নকশা থেকে বানানো real বাড়ি

---

### Real-life Example

```
     Blueprint (Class)              Real Houses (Objects)
           │                              
           │                    ┌─────────────────────────┐
           │                    │                         │
           ▼                    ▼         ▼         ▼     
    ┌──────────────┐      ┌─────────┬─────────┬─────────┐
    │              │      │         │         │         │
    │   🏠 নকশা    │  →   │ 🏠 বাড়ি │ 🏠 বাড়ি │ 🏠 বাড়ি │
    │              │      │    ১    │    ২    │    ৩    │
    │              │      │         │         │         │
    └──────────────┘      └─────────┴─────────┴─────────┘
                          
                          Owner:    Owner:    Owner:
                          Rahim     Karim     Jabbar
                          
                          Color:    Color:    Color:
                          Red       Blue      Green

    এক নকশা থেকে অনেক বাড়ি বানানো যায়!
    প্রতিটা বাড়ি আলাদা - আলাদা মালিক, আলাদা রং।
    কিন্তু structure same (3 rooms, 2 bathrooms)।
```

---

### Programming এ Object

```csharp
// Class (Blueprint)
class Student
{
    public string Name;
    public int Roll;
    public int Marks;
}

// Objects (আসল Students)
Student rahim = new Student();   // প্রথম student
Student karim = new Student();   // দ্বিতীয় student
Student jabbar = new Student();  // তৃতীয় student
```

**`new Student()`** বলে → "Student blueprint অনুযায়ী একজন আসল Student বানাও!"

**প্রতিটা Object:**
- Memory তে আলাদা জায়গা নেয়
- নিজের data রাখে
- অন্য object এর data affect করে না

---

## প্রথম Class বানাই - Step by Step

### Step 1: Class লেখো

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;
}
```

**প্রতিটা part বুঝি:**

```csharp
class Student          // "class" keyword + নাম
{                      // শুরু
    public string Name;    // Field 1: নাম (text)
    public int Roll;       // Field 2: রোল (number)
    public int Marks;      // Field 3: মার্কস (number)
}                      // শেষ
```

**`public` কী?**

`public` মানে - বাইরে থেকে access করা যাবে। 

(এটা নিয়ে OOP blog এ detail এ শিখবো। এখন শুধু `public` লিখে রাখো।)

---

### Step 2: Object বানাও

```csharp
Student rahim = new Student();
```

**প্রতিটা part বুঝি:**

```csharp
Student rahim = new Student();
───┬─── ──┬── ─┬─ ───┬────── 
   │      │    │     │
   │      │    │     └── Constructor call (পরে শিখবো)
   │      │    │
   │      │    └── "new" keyword - নতুন object তৈরি করো
   │      │
   │      └── Variable এর নাম (যেকোনো নাম দিতে পারো)
   │
   └── Variable এর Type (কোন class এর object)
```

**এখন Memory তে কী হলো?**

```
Memory:
┌─────────────────────────┐
│   rahim (Student)       │
├─────────────────────────┤
│   Name: null            │
│   Roll: 0               │
│   Marks: 0              │
└─────────────────────────┘

Default values বসে গেছে!
string এর default = null
int এর default = 0
```

---

### Step 3: Data দাও

**Dot (.) operator দিয়ে object এর ভেতরে যাও:**

```csharp
rahim.Name = "Rahim";
rahim.Roll = 101;
rahim.Marks = 85;
```

**Dot (.) এর কাজ:**

```
rahim.Name
──┬── ─┬──
  │    │
  │    └── কোন field/method
  │
  └── কোন object
```

**এখন Memory:**

```
Memory:
┌─────────────────────────┐
│   rahim (Student)       │
├─────────────────────────┤
│   Name: "Rahim"         │
│   Roll: 101             │
│   Marks: 85             │
└─────────────────────────┘
```

---

### Step 4: Data পড়ো

```csharp
Console.WriteLine(rahim.Name);   // Rahim
Console.WriteLine(rahim.Roll);   // 101
Console.WriteLine(rahim.Marks);  // 85
```

---

### Complete Code

```csharp
using System;

// Class define করা (Blueprint)
class Student
{
    public string Name;
    public int Roll;
    public int Marks;
}

class Program
{
    static void Main()
    {
        // Object তৈরি করা
        Student rahim = new Student();
        
        // Data দেওয়া
        rahim.Name = "Rahim";
        rahim.Roll = 101;
        rahim.Marks = 85;
        
        // Data পড়া
        Console.WriteLine("===== STUDENT INFO =====");
        Console.WriteLine($"Name: {rahim.Name}");
        Console.WriteLine($"Roll: {rahim.Roll}");
        Console.WriteLine($"Marks: {rahim.Marks}");
    }
}
```

**Output:**
```
===== STUDENT INFO =====
Name: Rahim
Roll: 101
Marks: 85
```

---

## Multiple Objects - একই Class থেকে অনেক Object

**এক Class থেকে যত খুশি Object বানানো যায়:**

```csharp
using System;

class Student
{
    public string Name;
    public int Roll;
    public int Marks;
}

class Program
{
    static void Main()
    {
        // তিনটা আলাদা object
        Student rahim = new Student();
        rahim.Name = "Rahim";
        rahim.Roll = 101;
        rahim.Marks = 85;
        
        Student karim = new Student();
        karim.Name = "Karim";
        karim.Roll = 102;
        karim.Marks = 90;
        
        Student jabbar = new Student();
        jabbar.Name = "Jabbar";
        jabbar.Roll = 103;
        jabbar.Marks = 78;
        
        // সবার info
        Console.WriteLine("===== ALL STUDENTS =====\n");
        
        Console.WriteLine($"1. {rahim.Name}");
        Console.WriteLine($"   Roll: {rahim.Roll}");
        Console.WriteLine($"   Marks: {rahim.Marks}\n");
        
        Console.WriteLine($"2. {karim.Name}");
        Console.WriteLine($"   Roll: {karim.Roll}");
        Console.WriteLine($"   Marks: {karim.Marks}\n");
        
        Console.WriteLine($"3. {jabbar.Name}");
        Console.WriteLine($"   Roll: {jabbar.Roll}");
        Console.WriteLine($"   Marks: {jabbar.Marks}");
    }
}
```

**Output:**
```
===== ALL STUDENTS =====

1. Rahim
   Roll: 101
   Marks: 85

2. Karim
   Roll: 102
   Marks: 90

3. Jabbar
   Roll: 103
   Marks: 78
```

---

### Memory তে কী আছে?

```
Memory:
┌─────────────────────────┐
│   rahim (Student)       │
├─────────────────────────┤
│   Name: "Rahim"         │
│   Roll: 101             │
│   Marks: 85             │
└─────────────────────────┘

┌─────────────────────────┐
│   karim (Student)       │
├─────────────────────────┤
│   Name: "Karim"         │
│   Roll: 102             │
│   Marks: 90             │
└─────────────────────────┘

┌─────────────────────────┐
│   jabbar (Student)      │
├─────────────────────────┤
│   Name: "Jabbar"        │
│   Roll: 103             │
│   Marks: 78             │
└─────────────────────────┘

তিনটা সম্পূর্ণ আলাদা object!
একটা change করলে অন্যগুলো affect হবে না!
```

---

### প্রমাণ করি - Objects আলাদা

```csharp
Student rahim = new Student();
rahim.Name = "Rahim";
rahim.Marks = 85;

Student karim = new Student();
karim.Name = "Karim";
karim.Marks = 90;

// rahim এর marks change করি
rahim.Marks = 95;

// karim এর marks কী?
Console.WriteLine($"Rahim: {rahim.Marks}");  // 95
Console.WriteLine($"Karim: {karim.Marks}");  // 90 (unchanged!)
```

**rahim change করলেও karim এর কিছু হয়নি!** কারণ এরা আলাদা object।

---

## Methods - Class এ Function রাখা

এতক্ষণ Class এ শুধু **data** (Fields) রেখেছি।

কিন্তু Class এ **function** ও রাখা যায়! এগুলোকে বলে **Methods**।

---

### কেন Method দরকার?

ধরো প্রতিটা Student এর Grade বের করতে চাই:

**Method ছাড়া:**

```csharp
// Rahim এর grade
string grade1;
if (rahim.Marks >= 80) grade1 = "A+";
else if (rahim.Marks >= 70) grade1 = "A";
// ... আরো conditions

// Karim এর grade
string grade2;
if (karim.Marks >= 80) grade2 = "A+";
else if (karim.Marks >= 70) grade2 = "A";
// ... আবার same code!

// প্রতিটা student এর জন্য same code repeat!
```

**Method দিয়ে:**

```csharp
string grade1 = rahim.GetGrade();  // এক লাইনে!
string grade2 = karim.GetGrade();  // আবার এক লাইনে!
```

**Code একবার লিখবো, বারবার use করবো!**

---

### Method লেখার নিয়ম

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;
    
    // Method
    public string GetGrade()
    {
        if (Marks >= 80) return "A+";
        if (Marks >= 70) return "A";
        if (Marks >= 60) return "B";
        if (Marks >= 50) return "C";
        if (Marks >= 40) return "D";
        return "F";
    }
}
```

**Method এর parts:**

```csharp
public string GetGrade()
──┬── ──┬─── ───┬────── 
  │     │       │
  │     │       └── Method এর নাম + () 
  │     │
  │     └── Return type (কী return করবে)
  │
  └── Access modifier
```

---

### Method এ Fields Use করা

**লক্ষ্য করো:** `GetGrade()` method এর ভেতরে সরাসরি `Marks` use করা যাচ্ছে!

```csharp
public string GetGrade()
{
    if (Marks >= 80) return "A+";  // this.Marks - same class এর field
    // ...
}
```

কারণ `Marks` আর `GetGrade()` দুইটাই **same class এর ভেতরে** আছে।

---

### আরো Methods

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;
    
    // Method 1: Grade বের করো
    public string GetGrade()
    {
        if (Marks >= 80) return "A+";
        if (Marks >= 70) return "A";
        if (Marks >= 60) return "B";
        if (Marks >= 50) return "C";
        if (Marks >= 40) return "D";
        return "F";
    }
    
    // Method 2: Pass করেছে কিনা
    public bool IsPassed()
    {
        return Marks >= 40;
    }
    
    // Method 3: Info display করো
    public void DisplayInfo()
    {
        Console.WriteLine($"Name: {Name}");
        Console.WriteLine($"Roll: {Roll}");
        Console.WriteLine($"Marks: {Marks}");
        Console.WriteLine($"Grade: {GetGrade()}");  // নিজের method call!
        
        if (IsPassed())
            Console.WriteLine("Status: PASSED ✓");
        else
            Console.WriteLine("Status: FAILED ✗");
    }
}
```

---

### Method Call করা

```csharp
Student rahim = new Student();
rahim.Name = "Rahim";
rahim.Roll = 101;
rahim.Marks = 85;

// Method calls
Console.WriteLine($"Grade: {rahim.GetGrade()}");   // Grade: A+
Console.WriteLine($"Passed: {rahim.IsPassed()}");  // Passed: True

rahim.DisplayInfo();  // সব info print হবে
```

**Output:**
```
Grade: A+
Passed: True
Name: Rahim
Roll: 101
Marks: 85
Grade: A+
Status: PASSED ✓
```

---

### Complete Example with Methods

```csharp
using System;

class Student
{
    public string Name;
    public int Roll;
    public int Marks;
    
    public string GetGrade()
    {
        if (Marks >= 80) return "A+";
        if (Marks >= 70) return "A";
        if (Marks >= 60) return "B";
        if (Marks >= 50) return "C";
        if (Marks >= 40) return "D";
        return "F";
    }
    
    public bool IsPassed()
    {
        return Marks >= 40;
    }
    
    public void DisplayInfo()
    {
        Console.WriteLine($"┌─────────────────────────┐");
        Console.WriteLine($"│ {Name,-23} │");
        Console.WriteLine($"├─────────────────────────┤");
        Console.WriteLine($"│ Roll: {Roll,-17} │");
        Console.WriteLine($"│ Marks: {Marks,-16} │");
        Console.WriteLine($"│ Grade: {GetGrade(),-16} │");
        
        string status = IsPassed() ? "PASSED ✓" : "FAILED ✗";
        Console.WriteLine($"│ Status: {status,-14} │");
        Console.WriteLine($"└─────────────────────────┘");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("📚 STUDENT RESULTS\n");
        
        Student rahim = new Student();
        rahim.Name = "Rahim";
        rahim.Roll = 101;
        rahim.Marks = 85;
        
        Student karim = new Student();
        karim.Name = "Karim";
        karim.Roll = 102;
        karim.Marks = 35;
        
        rahim.DisplayInfo();
        Console.WriteLine();
        karim.DisplayInfo();
    }
}
```

**Output:**
```
📚 STUDENT RESULTS

┌─────────────────────────┐
│ Rahim                   │
├─────────────────────────┤
│ Roll: 101               │
│ Marks: 85               │
│ Grade: A+               │
│ Status: PASSED ✓        │
└─────────────────────────┘

┌─────────────────────────┐
│ Karim                   │
├─────────────────────────┤
│ Roll: 102               │
│ Marks: 35               │
│ Grade: F                │
│ Status: FAILED ✗        │
└─────────────────────────┘
```

---

## Constructor - Object তৈরির সময়ই Values দাও

এতক্ষণ আমরা এভাবে করছিলাম:

```csharp
Student rahim = new Student();  // আগে object তৈরি
rahim.Name = "Rahim";           // পরে এক এক করে value
rahim.Roll = 101;
rahim.Marks = 85;

// 4 লাইন code!
```

**Constructor দিয়ে এক লাইনেই হয়ে যাবে!**

---

### Constructor কী?

**Constructor** হলো special method যেটা:

1. **Object তৈরি হওয়ার সময়** automatically call হয়
2. **Class এর নামেই** হয় (আলাদা নাম নয়)
3. **Return type নেই** (void ও না!)

---

### Default Constructor

যদি তুমি কোনো constructor না লেখো, C# নিজে একটা empty constructor বানিয়ে নেয়:

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;
    
    // C# নিজে এটা বানায় (তুমি না লিখলেও)
    // public Student()
    // {
    // }
}

Student rahim = new Student();  // Empty constructor call হচ্ছে
```

---

### নিজে Constructor লেখা

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;
    
    // Constructor
    public Student()
    {
        Console.WriteLine("📌 New student created!");
    }
}
```

```csharp
Student rahim = new Student();
// Output: 📌 New student created!

Student karim = new Student();
// Output: 📌 New student created!
```

**প্রতিবার `new Student()` করলে constructor call হচ্ছে!**

---

### Parameterized Constructor - Values নিয়ে Object তৈরি

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
        Name = name;    // parameter এর value → field এ রাখো
        Roll = roll;
        Marks = marks;
    }
}
```

**এখন object তৈরি অনেক সহজ:**

```csharp
// আগে (4 lines)
Student rahim = new Student();
rahim.Name = "Rahim";
rahim.Roll = 101;
rahim.Marks = 85;

// এখন (1 line!)
Student rahim = new Student("Rahim", 101, 85);
```

**কী হচ্ছে:**

```csharp
Student rahim = new Student("Rahim", 101, 85);
                            ───┬─── ─┬─ ─┬─
                               │     │   │
                               │     │   └── marks parameter এ যাচ্ছে
                               │     └── roll parameter এ যাচ্ছে
                               └── name parameter এ যাচ্ছে
```

---

### Multiple Constructors

একটা class এ একাধিক constructor থাকতে পারে:

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;
    
    // Constructor 1: No parameters
    public Student()
    {
        Name = "Unknown";
        Roll = 0;
        Marks = 0;
    }
    
    // Constructor 2: শুধু name আর roll
    public Student(string name, int roll)
    {
        Name = name;
        Roll = roll;
        Marks = 0;  // default marks
    }
    
    // Constructor 3: সব parameters
    public Student(string name, int roll, int marks)
    {
        Name = name;
        Roll = roll;
        Marks = marks;
    }
}
```

```csharp
Student s1 = new Student();                    // Constructor 1
Student s2 = new Student("Rahim", 101);        // Constructor 2
Student s3 = new Student("Karim", 102, 90);    // Constructor 3
```

**C# বুঝে যায় কোন constructor call করতে হবে - parameters দেখে!**

---

### Complete Example with Constructor

```csharp
using System;

class Student
{
    public string Name;
    public int Roll;
    public int Marks;
    
    // Constructor
    public Student(string name, int roll, int marks)
    {
        Name = name;
        Roll = roll;
        Marks = marks;
        Console.WriteLine($"✓ Student '{name}' created!");
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
        Console.WriteLine($"\n{Name} (Roll: {Roll})");
        Console.WriteLine($"Marks: {Marks} | Grade: {GetGrade()}");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("📚 STUDENT MANAGEMENT\n");
        
        // Constructor দিয়ে - এক লাইনে!
        Student rahim = new Student("Rahim", 101, 85);
        Student karim = new Student("Karim", 102, 92);
        Student jabbar = new Student("Jabbar", 103, 78);
        
        Console.WriteLine("\n───────── RESULTS ─────────");
        
        rahim.DisplayInfo();
        karim.DisplayInfo();
        jabbar.DisplayInfo();
    }
}
```

**Output:**
```
📚 STUDENT MANAGEMENT

✓ Student 'Rahim' created!
✓ Student 'Karim' created!
✓ Student 'Jabbar' created!

───────── RESULTS ─────────

Rahim (Roll: 101)
Marks: 85 | Grade: A+

Karim (Roll: 102)
Marks: 92 | Grade: A+

Jabbar (Roll: 103)
Marks: 78 | Grade: A
```

---

## Another Example: Product Class

```csharp
using System;

class Product
{
    public string Id;
    public string Name;
    public double Price;
    public int Stock;
    
    // Constructor
    public Product(string id, string name, double price, int stock)
    {
        Id = id;
        Name = name;
        Price = price;
        Stock = stock;
    }
    
    // Discount price বের করো
    public double GetDiscountedPrice(int discountPercent)
    {
        double discountAmount = Price * discountPercent / 100;
        return Price - discountAmount;
    }
    
    // Stock available আছে কিনা
    public bool IsAvailable()
    {
        return Stock > 0;
    }
    
    // Info দেখাও
    public void DisplayInfo()
    {
        Console.WriteLine($"[{Id}] {Name}");
        Console.WriteLine($"    Price: {Price} TK");
        Console.WriteLine($"    Stock: {Stock}");
        Console.WriteLine($"    Status: {(IsAvailable() ? "In Stock ✓" : "Out of Stock ✗")}");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("🛍️ PRODUCT CATALOG\n");
        
        Product shirt = new Product("P001", "Premium Shirt", 1200, 50);
        Product pants = new Product("P002", "Denim Pants", 1800, 30);
        Product shoes = new Product("P003", "Sports Shoes", 3500, 0);
        
        shirt.DisplayInfo();
        Console.WriteLine();
        pants.DisplayInfo();
        Console.WriteLine();
        shoes.DisplayInfo();
        
        Console.WriteLine("\n═══════ DISCOUNT OFFERS ═══════\n");
        
        int discount = 20;
        Console.WriteLine($"🏷️ {discount}% OFF on all products!\n");
        
        Console.WriteLine($"{shirt.Name}: {shirt.Price} TK → {shirt.GetDiscountedPrice(discount)} TK");
        Console.WriteLine($"{pants.Name}: {pants.Price} TK → {pants.GetDiscountedPrice(discount)} TK");
        Console.WriteLine($"{shoes.Name}: {shoes.Price} TK → {shoes.GetDiscountedPrice(discount)} TK");
    }
}
```

**Output:**
```
🛍️ PRODUCT CATALOG

[P001] Premium Shirt
    Price: 1200 TK
    Stock: 50
    Status: In Stock ✓

[P002] Denim Pants
    Price: 1800 TK
    Stock: 30
    Status: In Stock ✓

[P003] Sports Shoes
    Price: 3500 TK
    Stock: 0
    Status: Out of Stock ✗

═══════ DISCOUNT OFFERS ═══════

🏷️ 20% OFF on all products!

Premium Shirt: 1200 TK → 960 TK
Denim Pants: 1800 TK → 1440 TK
Sports Shoes: 3500 TK → 2800 TK
```

---

## Class vs Object - Summary

```
┌──────────────────────────────────────────────────────────────┐
│                    CLASS vs OBJECT                           │
├─────────────────────────────┬────────────────────────────────┤
│           CLASS             │            OBJECT              │
├─────────────────────────────┼────────────────────────────────┤
│  Blueprint / নকশা          │  Real thing / আসল জিনিস        │
│  Template / ছাঁচ            │  Instance / দৃষ্টান্ত           │
├─────────────────────────────┼────────────────────────────────┤
│  একবার define করো          │  যত খুশি তত বানাও              │
│  Memory নেয় না              │  প্রতিটা Memory নেয়            │
├─────────────────────────────┼────────────────────────────────┤
│  Data structure define করে  │  Actual data store করে        │
├─────────────────────────────┼────────────────────────────────┤
│  class Student { }          │  new Student()                 │
│  class Product { }          │  new Product()                 │
└─────────────────────────────┴────────────────────────────────┘
```

---

## আগে vs এখন

**আগে (Class ছাড়া):**

```csharp
// Student 1
string name1 = "Rahim";
int roll1 = 101;
int marks1 = 85;

// Student 2
string name2 = "Karim";
int roll2 = 102;
int marks2 = 90;

// Grade বের করতে হলে?
// প্রতিটার জন্য আলাদা আলাদা code!

// কোনটা কার?
// Variables এর নাম থেকে বোঝা কঠিন!
```

**এখন (Class দিয়ে):**

```csharp
Student rahim = new Student("Rahim", 101, 85);
Student karim = new Student("Karim", 102, 90);

// Grade?
rahim.GetGrade();  // Easy!
karim.GetGrade();  // Same method!

// Clear কার কী!
// rahim এর সব data rahim এ, karim এর সব karim এ!
```

---

## কেন শিখলাম?

### ১. Collections এ কাজে লাগবে

পরের part এ শিখবো:

```csharp
// Student objects এর List!
List<Student> students = new List<Student>();
students.Add(new Student("Rahim", 101, 85));
students.Add(new Student("Karim", 102, 90));
students.Add(new Student("Jabbar", 103, 78));

// Loop করো
foreach (Student s in students)
{
    s.DisplayInfo();
}
```

**এজন্যই আগে Class শেখা দরকার ছিল!**

---

### ২. OOP (Object Oriented Programming) এর ভিত্তি

এটা শুধু শুরু! OOP তে আরো অনেক powerful concepts আছে:

| Concept | বাংলা | কী শিখবে |
|---------|-------|---------|
| **Inheritance** | উত্তরাধিকার | এক class থেকে আরেক class বানানো |
| **Polymorphism** | বহুরূপতা | একই method আলাদা আলাদা ভাবে কাজ করা |
| **Encapsulation** | আবরণ | Data লুকিয়ে রাখা |
| **Abstraction** | বিমূর্ততা | Complexity hide করা |

**এগুলো আমরা আলাদা OOP Blog এ detail এ শিখবো!**

---

### ৩. Industry তে এভাবেই কাজ হয়

Real-world এ সব বড় বড় software OOP দিয়ে বানানো হয়:

- Games (Player class, Enemy class, Weapon class)
- E-commerce (Product, Cart, Order, Customer)
- Banking (Account, Transaction, Customer)
- Social Media (User, Post, Comment)

---

### ৪. Interview তে প্রশ্ন আসে

Programming interview তে OOP concepts খুবই common:

- "Class আর Object এর পার্থক্য কী?"
- "Constructor কী? কেন দরকার?"
- "Inheritance কীভাবে কাজ করে?"

**এগুলো জানা থাকলে interview তে confident থাকবে!**

---

## Summary Table

| Term | মানে | Example |
|------|------|---------|
| **Class** | Blueprint / নকশা | `class Student { }` |
| **Object** | আসল জিনিস | `new Student()` |
| **Field** | Data রাখার variable | `public string Name;` |
| **Method** | Class এর function | `public void Display() { }` |
| **Constructor** | Object তৈরির special method | `public Student() { }` |
| **new** | নতুন object তৈরি | `new Student()` |
| **.** (dot) | Object এর member access | `rahim.Name` |

---

## মনে রাখো

```
Class = নকশা 📝
        ↓
Object = আসল জিনিস 🏠

একটা নকশা → অনেক বাড়ি
একটা Class → অনেক Object
```

---

**Next Part এ:** Generic Collections - List, Dictionary, Stack, Queue এর Introduction!

---

*CPS Academy - Learn. Code. Grow.*
