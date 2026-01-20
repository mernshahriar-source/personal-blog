---
title: 'Part 29: Generic Collections - Introduction'
date: '2026-01-20'
excerpt: 'Part 29: Generic Collections - C# collections শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - collections
  - generics
  - tutorial
draft: false
---

# Part 29: Generic Collections - Introduction

## আগের Part এ কী শিখলাম?

আমরা **Class** আর **Object** শিখলাম!

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
}

// Objects
Student rahim = new Student("Rahim", 101, 85);
Student karim = new Student("Karim", 102, 90);
```

**এখন একটা সমস্যা...**

ধরো তোমার **100 জন Student** আছে।

100 টা আলাদা variable বানাবে?

```csharp
Student s1 = new Student("Rahim", 101, 85);
Student s2 = new Student("Karim", 102, 90);
Student s3 = new Student("Jabbar", 103, 78);
// ...
Student s100 = new Student("...", 200, 75);

// 😱 100 টা variable!
```

**Array দিলে?**

```csharp
Student[] students = new Student[100];
```

কিন্তু Array এর তো সমস্যা আছে:
- Size fixed! নতুন student আসলে?
- মাঝখান থেকে Remove করা কঠিন!
- Search করতে loop চালাতে হয়!

**এর সমাধান হলো Collections!**

---

## Collections কী?

**Collections** হলো **ready-made powerful data structures** যেগুলো C# আমাদের দিয়ে রেখেছে।

তুমি যা করতে চাও, তার জন্য perfect tool আছে:

| চাই | Tool |
|-----|------|
| Dynamic size array | List |
| Key দিয়ে value খোঁজা | Dictionary |
| Last In First Out | Stack |
| First In First Out | Queue |
| শুধু unique items | HashSet |

**নিজে বানাতে হবে না, শুধু use করো!**

---

## প্রতিটা Collection এর গল্প

এবার দেখি কোন Collection কোন সমস্যা solve করে।

---

## ১. List<T> - Dynamic Array

### গল্প: Shopping Cart

ধরো তুমি **Shopping Cart** বানাচ্ছো।

User products add করে। কেউ 2 টা নেয়, কেউ 20 টা।

**Array দিয়ে করলে:**

```
Array size = 5 দিলাম

User 10 টা product add করতে চায়!
😱 জায়গা নেই!

→ নতুন বড় Array বানাও
→ পুরানো সব copy করো
→ তারপর add করো
→ প্রতিবার এত কাজ!
```

আবার User বললো "৩ নম্বর item টা বাদ দাও"

```
মাঝখান থেকে Remove করতে হলে:
→ বাকি সব items shift করতে হবে
→ নিজে loop লিখে করতে হবে
```

### Solution: List

**List হলো Dynamic Array!**

- Size **automatic বাড়ে/কমে**
- যেকোনো জায়গায় **Add** - এক command এ
- যেকোনো জায়গা থেকে **Remove** - এক command এ
- Index দিয়ে access করা যায়

**কোথায় কাজে লাগে:**
- Shopping Cart
- Todo List
- Student List (`List<Student>`)
- Game এ enemies track করা
- যেকোনো জায়গায় dynamic size array লাগলে

---

## ২. Dictionary<K,V> - Key-Value Storage

### গল্প ১: Product Catalog

ধরো Shop এর Product Catalog বানাচ্ছো:

```
P001  → 500 টাকা
P002  → 1200 টাকা
P003  → 350 টাকা
```

Customer product নিলো। **Product ID দিলেই Price পেতে চাও।**

**Array দিয়ে করলে:**

```
ids = ["P001", "P002", "P003"]
prices = [500, 1200, 350]

"P002" এর price চাই?
→ Loop চালাও ids এ
→ "P002" কোথায় আছে খোঁজো
→ Index পেলে prices থেকে নাও

প্রতিবার search! 1000 টা product থাকলে?
```

### গল্প ২: Word Counter

Paragraph এ কোন word কতবার আছে count করো:

```
"I love Bangladesh. Bangladesh is beautiful."

Bangladesh → 2 বার
I → 1 বার
love → 1 বার
```

**Array দিয়ে এটা manage করা nightmare!**

### Solution: Dictionary

**Dictionary হলো Key-Value Store!**

- **Key দাও → Value পাও** (Instant!)
- "P002" দিলে 1200 পাবে
- "Bangladesh" দিলে 2 পাবে
- **No loop needed - Very fast!**

**কোথায় কাজে লাগে:**
- Product Catalog (ID → Price)
- Word Count (word → count)
- Student Records (Roll → Student object)
- Configuration/Settings
- যেকোনো জায়গায় key দিয়ে কিছু খুঁজতে হলে

---

## ৩. Stack<T> - Last In First Out

### গল্প ১: থালার Stack

রেস্টুরেন্টে থালা রাখা হয় stack করে:

```
        ┌─────┐
        │ 🍽️ D │ ← সবার পরে রাখা
        ├─────┤
        │ 🍽️ C │
        ├─────┤
        │ 🍽️ B │
        ├─────┤
        │ 🍽️ A │ ← সবার আগে রাখা
        └─────┘
```

**কোনটা আগে নেবে?**

উপর থেকে! মানে **D** - যেটা **সবার পরে** রাখা হয়েছে।

**Last In, First Out = LIFO**

### গল্প ২: Undo Feature

Text Editor এ লিখছো:

```
Action 1: Type "Hello"
Action 2: Type " World"
Action 3: Delete "d"
Action 4: Type "!"
```

**Ctrl+Z চাপলে কী হবে?**

সবার **শেষের** action টা আগে undo হবে!

```
Undo Action 4 → "Hello Worl"
Undo Action 3 → "Hello World"
Undo Action 2 → "Hello"
Undo Action 1 → ""
```

### গল্প ৩: Browser Back Button

তুমি websites visit করছো:

```
Visit: Google → Facebook → YouTube → GitHub
```

**Back button চাপলে?**

**GitHub → YouTube → Facebook → Google**

সবার শেষে যেখানে গিয়েছিলে, সেখানে আগে ফিরবে!

### Solution: Stack

**Stack হলো LIFO Container!**

- **Push** - Stack এ রাখো (উপরে)
- **Pop** - Stack থেকে নাও (উপর থেকে)
- Last In, First Out

**কোথায় কাজে লাগে:**
- Undo/Redo feature
- Browser Back/Forward
- Function Call Stack (Recursion!)
- Expression Evaluation

---

## ৪. Queue<T> - First In First Out

### গল্প ১: Bank এর লাইন

Bank এ Token নিয়ে লাইনে দাঁড়াও:

```
Counter
   ↓
┌─────┬─────┬─────┬─────┐
│  A  │  B  │  C  │  D  │
└─────┴─────┴─────┴─────┘
  ↑                   ↑
 আগে                পরে
 এসেছে              এসেছে
```

**কে আগে Service পাবে?**

**A** - যে **আগে** এসেছে!

**First In, First Out = FIFO**

### গল্প ২: Print Queue

Office এ একটাই Printer:

```
9:00 AM - Rahim দিলো Report.pdf
9:01 AM - Karim দিলো Invoice.xlsx
9:02 AM - Jabbar দিলো Photo.jpg
```

**কোনটা আগে print হবে?**

**Report.pdf** - যেটা **আগে** দেওয়া হয়েছে!

### গল্প ৩: Customer Support

Customer support এ call আসছে:

```
Call 1: Rahim (waiting)
Call 2: Karim (waiting)
Call 3: Jabbar (waiting)
```

**কার call আগে receive করবে?**

যে **আগে** call করেছে - **Rahim!**

**এটাই Fair!**

### Solution: Queue

**Queue হলো FIFO Container!**

- **Enqueue** - Queue তে ঢোকাও (পেছনে)
- **Dequeue** - Queue থেকে বের করো (সামনে থেকে)
- First In, First Out

**কোথায় কাজে লাগে:**
- Print Queue
- Task Scheduling
- Customer Service System
- Message Processing
- যেকোনো "আগে এলে আগে পাবে" system

---

## ৫. HashSet<T> - Unique Items Only

### গল্প ১: Website Visitors

তোমার Website এ visitors আসছে:

```
Visit 1: Rahim
Visit 2: Karim
Visit 3: Rahim (আবার!)
Visit 4: Jabbar
Visit 5: Rahim (আবার!)
Visit 6: Karim (আবার!)
```

**কতজন unique visitor?**

**3 জন** (Rahim, Karim, Jabbar)

Rahim 3 বার আসলেও count হবে **1 বার!**

**Array দিয়ে করলে:**

```
প্রতিবার নতুন visitor আসলে:
→ আগে থেকে আছে কিনা check করো (Loop!)
→ না থাকলে add করো
→ থাকলে ignore করো

Slow! প্রতিবার পুরা array search!
```

### গল্প ২: Duplicate Words বাদ দাও

```
Input: "I love love love Bangladesh Bangladesh"

Unique words: I, love, Bangladesh
```

Duplicate automatically বাদ!

### Solution: HashSet

**HashSet হলো Unique Collection!**

- Duplicate add করতে গেলে **ignore** হয়ে যায়
- "আছে কিনা" check করা **extremely fast**
- No loop needed!

**কোথায় কাজে লাগে:**
- Unique visitors count
- Duplicate remove করা
- Tags (unique tags only)
- যেকোনো জায়গায় uniqueness দরকার হলে

---

## Summary: কোনটা কখন?

```
┌────────────────────────────────────────────────────────────┐
│                    COLLECTIONS                             │
├──────────────┬─────────────────────────────────────────────┤
│   List<T>    │  Dynamic Array                             │
│              │  → Size জানা নেই, Add/Remove frequently    │
├──────────────┼─────────────────────────────────────────────┤
│ Dictionary   │  Key-Value Store                           │
│   <K,V>      │  → Key দিয়ে Value খুঁজতে হবে              │
├──────────────┼─────────────────────────────────────────────┤
│  Stack<T>    │  LIFO - Last In First Out                  │
│              │  → Undo, Back button, Recursion            │
├──────────────┼─────────────────────────────────────────────┤
│  Queue<T>    │  FIFO - First In First Out                 │
│              │  → Fair queue, Task scheduling             │
├──────────────┼─────────────────────────────────────────────┤
│ HashSet<T>   │  Unique Items Only                         │
│              │  → No duplicates, Fast membership check    │
└──────────────┴─────────────────────────────────────────────┘
```

---

## Generic কী? (`<T>`)

`<T>` দিয়ে বলো **কোন type** এর data রাখবে:

```
List<int>              → শুধু int
List<string>           → শুধু string
List<Student>          → শুধু Student objects!

Dictionary<string, int>     → string key, int value
Dictionary<int, Student>    → roll দিলে Student পাবো!
```

**Type-safe!** ভুল type দিলে compile error।

---

## Namespace

Collections use করতে হলে:

```csharp
using System.Collections.Generic;
```

---

## Class + Collections = Power! 💪

এখন তুমি এটা করতে পারবে:

```csharp
// Student class
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
}

// List of Students!
List<Student> students = new List<Student>();

students.Add(new Student("Rahim", 101, 85));
students.Add(new Student("Karim", 102, 90));
students.Add(new Student("Jabbar", 103, 78));

// Dictionary - Roll দিলে Student!
Dictionary<int, Student> studentByRoll = new Dictionary<int, Student>();

studentByRoll[101] = new Student("Rahim", 101, 85);
studentByRoll[102] = new Student("Karim", 102, 90);

// Roll 102 এর student কে?
Student s = studentByRoll[102];  // Karim!
```

**এজন্যই আগে Class শিখেছিলাম!**

---

## মূল কথা

**Data structure নিজে বানাতে হবে না!**

C# এ tested, optimized, ready-made solutions আছে।

তোমার কাজ:
1. **Problem বোঝো** - কী করতে চাও?
2. **Right tool choose করো** - কোন Collection?
3. **Use করো!**

---

> **💡 Note:** যারা C++ জানো - এই Collections গুলো C++ এর STL (Standard Template Library) এর মতোই। `vector` = `List`, `map` = `Dictionary`, etc.

---

**Next Part এ:** List<T> - Dynamic Array এর সব methods শিখবো code সহ!

---

*CPS Academy - Learn. Code. Grow.*
