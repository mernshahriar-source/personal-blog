---
title: 'Part 30: List<T> - Dynamic Array'
date: '2026-01-20'
excerpt: 'Part 30: List - dynamic array শিখুন C# এ'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - collections
  - list
  - tutorial
draft: true
---

# Part 30: List<T> - Dynamic Array

## আগের Part এ কী শিখলাম?

আমরা জানলাম C# এ **5 টা main Collections** আছে:

| Collection | কাজ |
|------------|-----|
| **List<T>** | Dynamic Array |
| Dictionary<K,V> | Key-Value Store |
| Stack<T> | LIFO |
| Queue<T> | FIFO |
| HashSet<T> | Unique Items |

আজকে শিখবো **List<T>** - সবচেয়ে বেশি ব্যবহৃত Collection!

**কেন সবচেয়ে বেশি ব্যবহৃত?**

কারণ বেশিরভাগ সময় আমাদের দরকার হয়:
- কিছু data রাখা
- নতুন data add করা
- কিছু data remove করা
- খুঁজে বের করা

**এই সব কাজই List দিয়ে সবচেয়ে সহজে হয়!**

---

## গল্প দিয়ে শুরু করি

### সমস্যাটা বুঝি আগে

ধরো তুমি একটা **Student Management System** বানাচ্ছো।

তোমার কাছে Student class আছে:

```csharp
class Student
{
    public string Name;
    public int Roll;
    public int Marks;
}
```

এখন অনেক students এর data রাখতে হবে।

---

### প্রথম চিন্তা: Array

```csharp
Student[] students = new Student[5];  // 5 জনের জায়গা

students[0] = new Student { Name = "Rahim", Roll = 101, Marks = 85 };
students[1] = new Student { Name = "Karim", Roll = 102, Marks = 72 };
students[2] = new Student { Name = "Jabbar", Roll = 103, Marks = 90 };
```

**সমস্যা ১: Size Fixed!**

নতুন session এ আরো students ভর্তি হলো। 6th student add করতে চাও:

```csharp
students[5] = new Student { Name = "New", Roll = 106, Marks = 80 };
// ❌ ERROR! IndexOutOfRangeException!
// Array তে 5 জনের জায়গা, index 5 নেই!
```

**কী করবে?**

```csharp
// ১. নতুন বড় Array বানাও
Student[] newStudents = new Student[10];

// ২. পুরানো সব copy করো
for (int i = 0; i < students.Length; i++)
{
    newStudents[i] = students[i];
}

// ৩. পুরানো Array এর reference update করো
students = newStudents;

// ৪. এখন নতুন student add করো
students[5] = new Student { Name = "New", Roll = 106, Marks = 80 };
```

**প্রতিবার নতুন student আসলে এত কাজ?** 😫

---

**সমস্যা ২: মাঝখান থেকে Remove করা কঠিন!**

ধরো Roll 102 (Karim) চলে গেলো। তাকে remove করতে হবে।

```
Before:
Index:    0        1        2        3       4
       [Rahim] [Karim] [Jabbar] [null] [null]
                  ↑
             এটা remove করতে হবে
```

**কী করবে?**

```csharp
// Karim এর পরের সবাইকে এক ঘর বামে সরাও
for (int i = 1; i < students.Length - 1; i++)
{
    students[i] = students[i + 1];
}

// শেষের ঘর null করো
students[students.Length - 1] = null;
```

```
After:
Index:    0        1        2       3       4
       [Rahim] [Jabbar] [null] [null] [null]
```

**প্রতিবার remove করতে হলে এত কাজ?** 😫

---

**সমস্যা ৩: মাঝখানে Insert করা কঠিন!**

Roll 102 এর জায়গায় নতুন student ঢোকাতে চাও।

```csharp
// পরের সবাইকে এক ঘর ডানে সরাও (শেষ থেকে শুরু করে)
for (int i = students.Length - 1; i > 1; i--)
{
    students[i] = students[i - 1];
}

// এখন index 1 এ নতুন student বসাও
students[1] = new Student { Name = "New", Roll = 102, Marks = 75 };
```

**আবারো এত কাজ!** 😫

---

**সমস্যা ৪: কতজন "আসল" student আছে?**

```csharp
Student[] students = new Student[10];

students[0] = new Student { ... };
students[1] = new Student { ... };
students[2] = new Student { ... };

// students.Length = 10 (total size)
// কিন্তু আসলে students আছে 3 জন!
// কতজন আছে জানতে হলে নিজে count করতে হবে

int count = 0;
for (int i = 0; i < students.Length; i++)
{
    if (students[i] != null) count++;
}
```

**এটাও নিজে করতে হচ্ছে!** 😫

---

**সমস্যা ৫: Search করতে হলে Loop!**

Roll 103 এর student খুঁজতে চাও:

```csharp
Student found = null;

for (int i = 0; i < students.Length; i++)
{
    if (students[i] != null && students[i].Roll == 103)
    {
        found = students[i];
        break;
    }
}
```

**প্রতিবার search করতে loop লিখতে হবে?** 😫

---

### এত সমস্যার সমাধান কী?

**List<T>!** 🎉

List এ এই সব কাজ **এক লাইনে** হয়ে যায়!

| কাজ | Array | List |
|-----|-------|------|
| নতুন item add | নতুন array বানাও, copy করো | `list.Add(item)` |
| মাঝখান থেকে remove | Loop দিয়ে shift করো | `list.Remove(item)` |
| মাঝখানে insert | Loop দিয়ে shift করো | `list.Insert(index, item)` |
| কতগুলো আছে? | নিজে count করো | `list.Count` |
| Search করা | নিজে loop লেখো | `list.Find(...)` |

---

## List কী?

**List** হলো **Dynamic Array** - যেটার size নিজে থেকেই বাড়ে-কমে!

**Dynamic মানে কী?**

- তুমি বলবে না কত জায়গা লাগবে
- Add করলে জায়গা নিজে বাড়বে
- Remove করলে manage হয়ে যাবে

```
Array:
┌───────┬───────┬───────┬───────┬───────┐
│   0   │   1   │   2   │   3   │   4   │
└───────┴───────┴───────┴───────┴───────┘
              Fixed Size = 5
         এর বেশি রাখা যাবে না!


List:
┌───────┬───────┬───────┬───────┬───────┬ ─ ─ ─ ─ ┐
│   0   │   1   │   2   │   3   │   4   │   ...   │
└───────┴───────┴───────┴───────┴───────┴ ─ ─ ─ ─ ┘
              Size বাড়তে থাকে!
         যত খুশি add করো!
```

---

## List তৈরি করা

List তৈরি করার ৩ টা উপায় আছে।

### উপায় ১: Empty List (সবচেয়ে common)

```csharp
using System.Collections.Generic;  // এটা উপরে লিখতে হবে!

// Empty list - এখনো কিছু নেই
List<int> numbers = new List<int>();
```

**প্রতিটা part বুঝি:**

```csharp
List<int> numbers = new List<int>();
──┬─ ─┬─  ──┬───    ──┬── ─┬─  ──
  │   │     │         │    │    │
  │   │     │         │    │    └── () Constructor call
  │   │     │         │    │
  │   │     │         │    └── Type parameter
  │   │     │         │
  │   │     │         └── new keyword
  │   │     │
  │   │     └── Variable name
  │   │
  │   └── Type parameter (কী রাখবে)
  │
  └── List class
```

**`<int>` কী?**

এটা বলে দেয় এই List এ **শুধু int** রাখা যাবে।

```csharp
List<int> numbers = new List<int>();
numbers.Add(10);      // ✓ OK
numbers.Add(20);      // ✓ OK
numbers.Add("Hello"); // ❌ ERROR! string দেওয়া যাবে না!
```

**এটাকে বলে Type Safety!** ভুল type দিলে compile time এই error দেখাবে।

---

**বিভিন্ন type এর List:**

```csharp
// int এর List
List<int> numbers = new List<int>();

// string এর List
List<string> names = new List<string>();

// double এর List
List<double> prices = new List<double>();

// bool এর List
List<bool> flags = new List<bool>();

// Custom class এর List
List<Student> students = new List<Student>();
List<Product> products = new List<Product>();
```

---

### উপায় ২: Initial Values সহ

শুরুতেই কিছু values দিয়ে দিতে চাইলে:

```csharp
// Long syntax
List<int> numbers = new List<int>() { 10, 20, 30, 40, 50 };

// Short syntax (C# 3.0+)
List<int> numbers = new List<int> { 10, 20, 30, 40, 50 };

// আরো short (C# 9.0+)
List<int> numbers = new() { 10, 20, 30, 40, 50 };
```

**আরো examples:**

```csharp
// Fruits
List<string> fruits = new List<string> 
{ 
    "Apple", 
    "Banana", 
    "Mango",
    "Orange"
};

// Prices
List<double> prices = new List<double> { 99.99, 149.50, 299.00 };

// Mixed case names
List<string> students = new List<string>
{
    "Rahim",
    "Karim",
    "Jabbar"
};
```

---

### উপায় ৩: Array থেকে List

যদি আগে থেকে Array থাকে এবং সেটাকে List এ convert করতে চাও:

```csharp
// আগে থেকে Array আছে
string[] fruitsArray = { "Apple", "Banana", "Mango" };

// উপায় ১: Constructor দিয়ে
List<string> fruitsList = new List<string>(fruitsArray);

// উপায় ২: ToList() method দিয়ে
using System.Linq;  // এটা উপরে লিখতে হবে
List<string> fruitsList2 = fruitsArray.ToList();
```

**কখন দরকার হয়?**

- পুরানো code এ Array ছিল, এখন List এ upgrade করতে চাও
- কোনো method Array return করে, কিন্তু তুমি List এ কাজ করতে চাও

---

## Basic Properties

### Count - কয়টা item আছে?

**Count** বলে দেয় List এ এই মুহূর্তে **কতগুলো item** আছে।

```csharp
List<string> fruits = new List<string>();

Console.WriteLine(fruits.Count);  // 0 (খালি)

fruits.Add("Apple");
Console.WriteLine(fruits.Count);  // 1

fruits.Add("Banana");
Console.WriteLine(fruits.Count);  // 2

fruits.Add("Mango");
Console.WriteLine(fruits.Count);  // 3

fruits.Remove("Banana");
Console.WriteLine(fruits.Count);  // 2

fruits.Clear();
Console.WriteLine(fruits.Count);  // 0 (আবার খালি)
```

**Array তে Length, List এ Count - গুলিয়ে ফেলো না!**

```csharp
// Array
string[] arr = { "A", "B", "C" };
Console.WriteLine(arr.Length);  // 3 ✓

// List
List<string> list = new List<string> { "A", "B", "C" };
Console.WriteLine(list.Count);  // 3 ✓

// ভুল করো না!
// Console.WriteLine(list.Length);  // ❌ ERROR!
// Console.WriteLine(arr.Count);    // ❌ ERROR!
```

---

### Index দিয়ে Access - [ ]

Array এর মতোই **[ ]** দিয়ে access করা যায়।

**Index 0 থেকে শুরু!**

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };

//                                         [0]      [1]       [2]
```

**Read করা (পড়া):**

```csharp
Console.WriteLine(fruits[0]);  // Apple
Console.WriteLine(fruits[1]);  // Banana
Console.WriteLine(fruits[2]);  // Mango
```

**Write করা (লেখা/update):**

```csharp
fruits[1] = "Grapes";  // Banana কে Grapes দিয়ে replace

Console.WriteLine(fruits[1]);  // Grapes
```

**Visual:**

```
Before:
Index:    [0]       [1]        [2]
       ┌───────┬─────────┬───────┐
       │ Apple │ Banana  │ Mango │
       └───────┴─────────┴───────┘

fruits[1] = "Grapes";

After:
Index:    [0]       [1]        [2]
       ┌───────┬─────────┬───────┐
       │ Apple │ Grapes  │ Mango │
       └───────┴─────────┴───────┘
                    ↑
              এখানে change হলো
```

---

**⚠️ সাবধান: Index Out of Range!**

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };

// Valid indices: 0, 1, 2

Console.WriteLine(fruits[3]);   // ❌ ERROR! Index 3 নেই!
Console.WriteLine(fruits[-1]);  // ❌ ERROR! Negative index নেই!
Console.WriteLine(fruits[100]); // ❌ ERROR!
```

**এই error কে বলে:** `ArgumentOutOfRangeException`

**Safe way:**

```csharp
int index = 5;

if (index >= 0 && index < fruits.Count)
{
    Console.WriteLine(fruits[index]);
}
else
{
    Console.WriteLine("Invalid index!");
}
```

---

### Capacity - Internal Size

**এটা একটু advanced topic, কিন্তু জানা থাকলে ভালো।**

List internally একটা Array রাখে। সেই Array এর size হলো **Capacity**।

**Count vs Capacity:**

| Property | মানে |
|----------|------|
| **Count** | কতগুলো item আছে |
| **Capacity** | কতগুলো item রাখার জায়গা আছে |

```csharp
List<int> numbers = new List<int>();

Console.WriteLine($"Count: {numbers.Count}");       // 0
Console.WriteLine($"Capacity: {numbers.Capacity}"); // 0
```

এখন কিছু add করি:

```csharp
numbers.Add(1);

Console.WriteLine($"Count: {numbers.Count}");       // 1
Console.WriteLine($"Capacity: {numbers.Capacity}"); // 4
```

**কী হলো?**

1 টা item add করতেই Capacity 4 হয়ে গেলো!

List বলছে: "আমি বুঝতে পারছি তুমি items add করবে। তাই আমি আগে থেকেই 4 টার জায়গা করে রাখলাম। বারবার জায়গা বাড়াতে হবে না।"

---

**আরো add করলে কী হয়?**

```csharp
numbers.Add(2);
numbers.Add(3);
numbers.Add(4);

Console.WriteLine($"Count: {numbers.Count}");       // 4
Console.WriteLine($"Capacity: {numbers.Capacity}"); // 4

// 5th item add করি
numbers.Add(5);

Console.WriteLine($"Count: {numbers.Count}");       // 5
Console.WriteLine($"Capacity: {numbers.Capacity}"); // 8
```

**Capacity 4 থেকে 8 হয়ে গেলো!**

যখন জায়গা শেষ হয়ে যায়, List **Capacity double** করে দেয়।

---

**Visual দিয়ে বুঝি:**

```
Empty List:
Count = 0, Capacity = 0
Internal Array: (none)


After Add(1):
Count = 1, Capacity = 4
Internal Array:
┌───┬───┬───┬───┐
│ 1 │   │   │   │
└───┴───┴───┴───┘


After Add(2), Add(3), Add(4):
Count = 4, Capacity = 4
Internal Array:
┌───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │  ← Full!
└───┴───┴───┴───┘


After Add(5):
Count = 5, Capacity = 8
Internal Array:
┌───┬───┬───┬───┬───┬───┬───┬───┐
│ 1 │ 2 │ 3 │ 4 │ 5 │   │   │   │
└───┴───┴───┴───┴───┴───┴───┴───┘
      Capacity doubled!
```

---

**তোমাকে এসব নিয়ে চিন্তা করতে হবে না!**

List নিজেই সব manage করে। তুমি শুধু `Add()`, `Remove()` করো।

তবে জেনে রাখা ভালো কারণ:
- Interview তে জিজ্ঞেস করতে পারে
- Performance বুঝতে সাহায্য করে

---

## Adding Items - নতুন Item যোগ করা

List এ item যোগ করার **4 টা method** আছে।

### ১. Add() - শেষে যোগ করো

**সবচেয়ে বেশি ব্যবহৃত method!**

```csharp
List<string> cart = new List<string>();

cart.Add("Shirt");
cart.Add("Pants");
cart.Add("Shoes");
```

**প্রতিটা Add() এর পর কী হচ্ছে দেখি:**

```
Initial: Empty list
         Count = 0
         []


After cart.Add("Shirt"):
         Count = 1
         ┌─────────┐
         │  Shirt  │
         └─────────┘
         Index: 0


After cart.Add("Pants"):
         Count = 2
         ┌─────────┬─────────┐
         │  Shirt  │  Pants  │
         └─────────┴─────────┘
         Index: 0       1


After cart.Add("Shoes"):
         Count = 3
         ┌─────────┬─────────┬─────────┐
         │  Shirt  │  Pants  │  Shoes  │
         └─────────┴─────────┴─────────┘
         Index: 0       1         2
```

**Add() সবসময় শেষে যোগ করে!**

---

**Objects Add করা:**

```csharp
class Student
{
    public string Name;
    public int Roll;
    
    public Student(string name, int roll)
    {
        Name = name;
        Roll = roll;
    }
}

List<Student> students = new List<Student>();

// উপায় ১: আগে object বানাও, তারপর add
Student s1 = new Student("Rahim", 101);
students.Add(s1);

// উপায় ২: সরাসরি add (বেশি common)
students.Add(new Student("Karim", 102));
students.Add(new Student("Jabbar", 103));
```

---

### ২. AddRange() - একসাথে অনেকগুলো যোগ করো

যখন একটা একটা করে না, **একসাথে অনেকগুলো** add করতে চাও:

```csharp
List<string> cart = new List<string>();
cart.Add("Shirt");

// একসাথে 3 টা add করো
string[] moreItems = { "Pants", "Shoes", "Hat" };
cart.AddRange(moreItems);

// cart = ["Shirt", "Pants", "Shoes", "Hat"]
//           0        1         2       3
```

**Visual:**

```
Before AddRange:
┌─────────┐
│  Shirt  │
└─────────┘
Count = 1


moreItems = ["Pants", "Shoes", "Hat"]


After AddRange(moreItems):
┌─────────┬─────────┬─────────┬─────────┐
│  Shirt  │  Pants  │  Shoes  │   Hat   │
└─────────┴─────────┴─────────┴─────────┘
Count = 4

           ↑─────────────────────────────↑
                  এগুলো add হলো
```

---

**আরেকটা List add করা:**

```csharp
List<int> list1 = new List<int> { 1, 2, 3 };
List<int> list2 = new List<int> { 4, 5, 6 };

list1.AddRange(list2);

// list1 = [1, 2, 3, 4, 5, 6]
// list2 = [4, 5, 6]  ← unchanged!
```

**Note:** AddRange() করলে original list (list2) change হয় না।

---

**কখন AddRange() use করবে?**

- Database থেকে multiple records আনলে
- File থেকে multiple lines পড়লে
- দুইটা list merge করতে হলে
- Array থেকে List এ একসাথে data নিতে হলে

---

### ৩. Insert() - নির্দিষ্ট Position এ ঢোকাও

**Add() শেষে যোগ করে, কিন্তু মাঝখানে ঢোকাতে চাইলে?**

```csharp
List<string> fruits = new List<string> { "Apple", "Mango", "Banana" };

// Index 1 এ "Orange" ঢোকাও
fruits.Insert(1, "Orange");
```

**কী হলো?**

```
Before Insert:
Index:    [0]       [1]       [2]
       ┌─────────┬─────────┬─────────┐
       │  Apple  │  Mango  │ Banana  │
       └─────────┴─────────┴─────────┘


fruits.Insert(1, "Orange");
              ↑      ↑
           Index   Value


After Insert:
Index:    [0]       [1]       [2]       [3]
       ┌─────────┬─────────┬─────────┬─────────┐
       │  Apple  │ Orange  │  Mango  │ Banana  │
       └─────────┴─────────┴─────────┴─────────┘
                     ↑
               এখানে ঢুকলো!
               
        Mango, Banana → এক ঘর ডানে সরে গেলো
```

---

**শুরুতে (Index 0) Insert করা:**

```csharp
List<int> numbers = new List<int> { 2, 3, 4 };

numbers.Insert(0, 1);  // একদম শুরুতে 1 ঢোকাও

// numbers = [1, 2, 3, 4]
```

**শেষে Insert করা (Add এর মতো):**

```csharp
List<int> numbers = new List<int> { 1, 2, 3 };

numbers.Insert(numbers.Count, 4);  // শেষে insert
// OR
numbers.Insert(3, 4);  // Index 3 = শেষের পরের position

// numbers = [1, 2, 3, 4]
```

---

**⚠️ Invalid Index দিলে Error!**

```csharp
List<int> numbers = new List<int> { 1, 2, 3 };
// Valid indices for Insert: 0, 1, 2, 3

numbers.Insert(5, 100);  // ❌ ERROR! Index 5 অনেক বেশি!
numbers.Insert(-1, 100); // ❌ ERROR! Negative index!
```

---

### ৪. InsertRange() - অনেকগুলো নির্দিষ্ট জায়গায়

```csharp
List<int> numbers = new List<int> { 1, 2, 5, 6 };

int[] middle = { 3, 4 };

numbers.InsertRange(2, middle);  // Index 2 থেকে ঢোকাও

// numbers = [1, 2, 3, 4, 5, 6]
```

**Visual:**

```
Before:
Index:  [0]  [1]  [2]  [3]
       ┌────┬────┬────┬────┐
       │ 1  │ 2  │ 5  │ 6  │
       └────┴────┴────┴────┘


InsertRange(2, {3, 4}):


After:
Index:  [0]  [1]  [2]  [3]  [4]  [5]
       ┌────┬────┬────┬────┬────┬────┐
       │ 1  │ 2  │ 3  │ 4  │ 5  │ 6  │
       └────┴────┴────┴────┴────┴────┘
                  ↑────↑
              এগুলো ঢুকলো
```

---

## Removing Items - Item সরানো

List থেকে item সরানোর **4 টা method** আছে।

### ১. Remove() - Value দিয়ে Remove

**যেটা remove করতে চাও সেটার value দাও:**

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };

fruits.Remove("Banana");

// fruits = ["Apple", "Mango"]
```

**Visual:**

```
Before:
Index:    [0]       [1]       [2]
       ┌─────────┬─────────┬─────────┐
       │  Apple  │ Banana  │  Mango  │
       └─────────┴─────────┴─────────┘


fruits.Remove("Banana");
                  ↑
             এটা remove


After:
Index:    [0]       [1]
       ┌─────────┬─────────┐
       │  Apple  │  Mango  │
       └─────────┴─────────┘
       
       Mango সরে এলো [2] থেকে [1] এ
       Count = 2
```

---

**Important: শুধু প্রথমটা Remove হয়!**

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango", "Banana" };
//                                         [0]       [1]      [2]       [3]

fruits.Remove("Banana");

// fruits = ["Apple", "Mango", "Banana"]
//             [0]      [1]      [2]
```

**"Banana" দুইবার ছিল, কিন্তু শুধু প্রথমটা (index 1) remove হলো!**

দ্বিতীয় "Banana" (আগে index 3, এখন index 2) থেকে গেলো।

---

**Return Value:**

Remove() return করে **true** বা **false**।

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };

bool removed1 = fruits.Remove("Banana");
Console.WriteLine(removed1);  // True (পেয়েছে, remove করেছে)

bool removed2 = fruits.Remove("Orange");
Console.WriteLine(removed2);  // False (পায়নি, কিছু করেনি)
```

**এটা দিয়ে check করতে পারো:**

```csharp
string itemToRemove = "Pineapple";

if (fruits.Remove(itemToRemove))
{
    Console.WriteLine($"✓ {itemToRemove} removed successfully!");
}
else
{
    Console.WriteLine($"✗ {itemToRemove} was not in the list.");
}
```

---

**Item না থাকলে কী হয়?**

```csharp
List<string> fruits = new List<string> { "Apple", "Banana" };

fruits.Remove("Orange");  // Orange নেই

// কিছুই হবে না! Error ও হবে না!
// List unchanged থাকবে
```

---

### ২. RemoveAt() - Index দিয়ে Remove

**কোন position থেকে remove করতে চাও সেই index দাও:**

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };
//                                         [0]       [1]      [2]

fruits.RemoveAt(1);  // Index 1 remove

// fruits = ["Apple", "Mango"]
//             [0]      [1]
```

---

**কখন Remove() vs RemoveAt()?**

| Remove(value) | RemoveAt(index) |
|---------------|-----------------|
| যখন **কী** remove করবে জানো | যখন **কোথা** থেকে remove করবে জানো |
| "Banana" remove করো | 1st item remove করো |
| Item না থাকলে OK | Invalid index এ Error |

```csharp
// Remove by value
fruits.Remove("Banana");  // "Banana" নামের item remove করো

// Remove by index
fruits.RemoveAt(0);  // প্রথম item remove করো (যেটাই থাকুক)
```

---

**⚠️ RemoveAt() এ Invalid Index দিলে Error!**

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };
// Valid indices: 0, 1, 2

fruits.RemoveAt(5);   // ❌ ERROR! ArgumentOutOfRangeException
fruits.RemoveAt(-1);  // ❌ ERROR!
```

**Safe way:**

```csharp
int indexToRemove = 5;

if (indexToRemove >= 0 && indexToRemove < fruits.Count)
{
    fruits.RemoveAt(indexToRemove);
    Console.WriteLine("Removed!");
}
else
{
    Console.WriteLine("Invalid index!");
}
```

---

## 🔥 Lambda Expression কী? (গুরুত্বপূর্ণ!)

পরের কিছু methods এ আমরা এরকম code দেখবো:

```csharp
numbers.RemoveAll(n => n > 5);
numbers.Find(n => n > 30);
```

**এই `n => n > 5` কে বলে Lambda Expression।**

এটা অনেকের কাছে confusing লাগে। তাই আগে এটা ভালো করে বুঝে নিই!

---

### Lambda মানে কী?

**Lambda Expression** হলো **ছোট করে function লেখার উপায়।**

```
n => n > 5
↑    ↑
│    └── কী check করবে (condition/কাজ)
│
└── প্রতিটা item এর নাম
```

---

### সহজ ভাষায় বুঝি

```
n => n > 5

এটা মানে:
"প্রতিটা item কে 'n' নাম দাও,
 তারপর check করো n > 5 কিনা"
```

**ব্যস, এটুকুই!**

---

### Step by Step দেখি

ধরো তোমার List:

```csharp
List<int> numbers = new List<int> { 2, 5, 8, 3, 9 };
```

এখন `n => n > 5` দিয়ে check করলে কী হয়?

```
numbers = [2, 5, 8, 3, 9]

Step 1: n = 2
        2 > 5? → FALSE
        
Step 2: n = 5
        5 > 5? → FALSE
        
Step 3: n = 8
        8 > 5? → TRUE ✓
        
Step 4: n = 3
        3 > 5? → FALSE
        
Step 5: n = 9
        9 > 5? → TRUE ✓
```

**Visual:**

```
List: [2, 5, 8, 3, 9]

n => n > 5 check করলে:

      2 > 5?  ❌ No
      5 > 5?  ❌ No
      8 > 5?  ✅ Yes
      3 > 5?  ❌ No
      9 > 5?  ✅ Yes
      
Result: 8 এবং 9 condition মেটায়
```

---

### Lambda ছাড়া করতে গেলে

তুমি যদি Lambda না জানতে, তাহলে এত code লিখতে হতো:

```csharp
// Lambda ছাড়া (manual way)
List<int> numbers = new List<int> { 2, 5, 8, 3, 9 };

for (int i = 0; i < numbers.Count; i++)
{
    int n = numbers[i];    // প্রতিটা item কে n বলছি
    
    if (n > 5)             // condition check
    {
        Console.WriteLine($"{n} is greater than 5");
    }
}
```

**Lambda দিয়ে এই কাজ অনেক ছোট হয়ে যায়!**

---

### `n` এর জায়গায় যেকোনো নাম চলে

```csharp
// এগুলো সব same কাজ করে:

n => n > 5
x => x > 5
num => num > 5
item => item > 5
anything => anything > 5
```

নাম যাই হোক, এটা শুধু "প্রতিটা item" কে represent করে।

**Convention:**
- Numbers এর জন্য: `n`, `x`, `num`
- Names এর জন্য: `name`
- Students এর জন্য: `s`, `student`
- Generic এর জন্য: `item`, `x`

---

### বিভিন্ন ধরনের Lambda

**Numbers এর সাথে:**

```csharp
n => n > 5        // 5 এর বেশি কিনা
n => n < 10       // 10 এর কম কিনা
n => n == 25      // 25 এর সমান কিনা
n => n != 0       // 0 না কিনা
n => n % 2 == 0   // even কিনা (2 দিয়ে ভাগ করলে remainder 0)
n => n % 5 == 0   // 5 এর গুণিতক কিনা
n => n >= 10 && n <= 20  // 10 থেকে 20 এর মধ্যে কিনা
```

**Strings এর সাথে:**

```csharp
name => name.StartsWith("R")    // "R" দিয়ে শুরু কিনা
name => name.EndsWith("m")      // "m" দিয়ে শেষ কিনা
name => name.Contains("a")      // "a" আছে কিনা
name => name.Length > 5         // 5 character এর বেশি কিনা
name => name == "Rahim"         // "Rahim" কিনা
word => word == ""              // empty string কিনা
item => item == null            // null কিনা
```

**Objects এর সাথে:**

```csharp
s => s.Roll == 102      // Roll 102 কিনা
s => s.Marks > 80       // Marks 80 এর বেশি কিনা
s => s.Marks >= 40      // Pass করেছে কিনা
s => s.Name == "Rahim"  // Name "Rahim" কিনা
s => s.IsPassed()       // IsPassed() method true return করে কিনা
```

---

### মনে রাখো

```
┌─────────────────────────────────────────────────────┐
│              LAMBDA EXPRESSION                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│    n => n > 5                                       │
│    ─┬─   ──┬──                                      │
│     │      │                                        │
│     │      └── Condition (কী check করবে)           │
│     │                                               │
│     └── Parameter (প্রতিটা item এর নাম)            │
│                                                     │
│    পড়ার নিয়ম:                                      │
│    "প্রতিটা n এর জন্য, check করো n > 5 কিনা"       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**এখন থেকে যেখানেই `=>` দেখবে, বুঝবে এটা Lambda!**

---

### ৩. RemoveAll() - Condition দিয়ে Remove

**যেগুলো condition মেটায়, সব একসাথে remove করো!**

এটা **সবচেয়ে powerful** remove method! এখানে Lambda use করবো।

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// সব even numbers remove করো
numbers.RemoveAll(n => n % 2 == 0);

// numbers = [1, 3, 5, 7, 9]
```

---

**কী হচ্ছে এখানে?**

```
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

RemoveAll(n => n % 2 == 0)   // n % 2 == 0 মানে even

Step 1: n = 1,  1 % 2 = 1  → 1 == 0? FALSE → keep
Step 2: n = 2,  2 % 2 = 0  → 0 == 0? TRUE  → REMOVE!
Step 3: n = 3,  3 % 2 = 1  → 1 == 0? FALSE → keep
Step 4: n = 4,  4 % 2 = 0  → 0 == 0? TRUE  → REMOVE!
Step 5: n = 5,  5 % 2 = 1  → 1 == 0? FALSE → keep
... এভাবে চলতে থাকে

Result: [1, 3, 5, 7, 9]
```

---

**Lambda ছাড়া এই কাজ করতে গেলে:**

```csharp
// Manual way (Lambda ছাড়া)
for (int i = numbers.Count - 1; i >= 0; i--)
{
    int n = numbers[i];
    if (n % 2 == 0)  // even কিনা check
    {
        numbers.RemoveAt(i);
    }
}
```

**Lambda দিয়ে এক লাইনে:**

```csharp
numbers.RemoveAll(n => n % 2 == 0);
```

**অনেক cleaner!**

---

**আরো Examples:**

```csharp
// ১. 5 এর বেশি সব numbers remove
List<int> nums = new List<int> { 2, 5, 8, 3, 9, 1, 6 };
nums.RemoveAll(n => n > 5);
// nums = [2, 5, 3, 1]
```

```csharp
// ২. "R" দিয়ে শুরু হওয়া সব names remove
List<string> names = new List<string> { "Rahim", "Karim", "Raj", "Kabir", "Rafiq" };
names.RemoveAll(name => name.StartsWith("R"));
// names = ["Karim", "Kabir"]
```

```csharp
// ৩. Empty strings remove
List<string> words = new List<string> { "Hello", "", "World", "", "!" };
words.RemoveAll(w => w == "");
// words = ["Hello", "World", "!"]
```

```csharp
// ৪. Null values remove
List<string> items = new List<string> { "A", null, "B", null, "C" };
items.RemoveAll(item => item == null);
// items = ["A", "B", "C"]
```

```csharp
// ৫. Fail students remove (Marks < 40)
List<int> marks = new List<int> { 85, 40, 92, 35, 78, 25, 60 };
marks.RemoveAll(m => m < 40);
// marks = [85, 40, 92, 78, 60]
```

---

**Return Value:**

RemoveAll() return করে **কতগুলো remove হলো**।

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

int removedCount = numbers.RemoveAll(n => n % 2 == 0);

Console.WriteLine($"{removedCount} items removed!");  // 5 items removed!
Console.WriteLine($"Remaining: {numbers.Count}");     // Remaining: 5
```

---

### ৪. Clear() - সব মুছে দাও

**পুরো List খালি করে দাও:**

```csharp
List<string> items = new List<string> { "A", "B", "C", "D", "E" };

Console.WriteLine($"Before: {items.Count}");  // Before: 5

items.Clear();

Console.WriteLine($"After: {items.Count}");   // After: 0
```

**Visual:**

```
Before Clear():
┌─────┬─────┬─────┬─────┬─────┐
│  A  │  B  │  C  │  D  │  E  │
└─────┴─────┴─────┴─────┴─────┘
Count = 5


After Clear():
┌─────────────────────────────┐
│          (empty)            │
└─────────────────────────────┘
Count = 0
```

---

**কখন Clear() use করবে?**

- List reuse করতে চাইলে
- Fresh start নিতে চাইলে
- Memory free করতে চাইলে

```csharp
List<string> cart = new List<string>();

// Shopping...
cart.Add("Shirt");
cart.Add("Pants");

// Checkout done, cart empty করো
cart.Clear();

// নতুন shopping start
cart.Add("Shoes");
```

---

## Searching - খুঁজে বের করা

List এ search করার **7 টা method** আছে।

### ১. Contains() - আছে কিনা?

**সবচেয়ে simple search!** শুধু বলে **আছে** (true) নাকি **নেই** (false)।

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };

Console.WriteLine(fruits.Contains("Banana"));  // True
Console.WriteLine(fruits.Contains("Orange"));  // False
Console.WriteLine(fruits.Contains("banana")); // False (case sensitive!)
```

---

**Real-world Example: Shopping Cart**

```csharp
List<string> cart = new List<string> { "Shirt", "Pants", "Shoes" };

Console.Write("Enter item to check: ");
string item = Console.ReadLine();

if (cart.Contains(item))
{
    Console.WriteLine($"✓ {item} is in your cart!");
}
else
{
    Console.WriteLine($"✗ {item} is not in your cart.");
    Console.WriteLine("Would you like to add it? (y/n)");
}
```

---

**Real-world Example: Username Check**

```csharp
List<string> existingUsers = new List<string> { "rahim123", "karim_bd", "jabbar99" };

Console.Write("Choose username: ");
string newUsername = Console.ReadLine();

if (existingUsers.Contains(newUsername))
{
    Console.WriteLine("❌ Username already taken!");
}
else
{
    Console.WriteLine("✓ Username available!");
    existingUsers.Add(newUsername);
}
```

---

### ২. IndexOf() - কোথায় আছে?

**Item এর position (index) বলে দেয়।**

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };
//                                         [0]       [1]      [2]

Console.WriteLine(fruits.IndexOf("Apple"));   // 0
Console.WriteLine(fruits.IndexOf("Banana"));  // 1
Console.WriteLine(fruits.IndexOf("Mango"));   // 2
Console.WriteLine(fruits.IndexOf("Orange"));  // -1 (নেই!)
```

**-1 মানে পাওয়া যায়নি!**

---

**কেন Index দরকার?**

```csharp
List<string> students = new List<string> { "Rahim", "Karim", "Jabbar", "Alam" };

string searchName = "Karim";

int index = students.IndexOf(searchName);

if (index != -1)
{
    Console.WriteLine($"✓ {searchName} found at position {index + 1}");
    // position 2 (human readable, index + 1)
}
else
{
    Console.WriteLine($"✗ {searchName} not found!");
}
```

---

### ৩. LastIndexOf() - শেষ কোথায় আছে?

যদি একই item **একাধিকবার** থাকে:

```csharp
List<string> letters = new List<string> { "A", "B", "A", "C", "A" };
//                                        [0]  [1]  [2]  [3]  [4]

Console.WriteLine(letters.IndexOf("A"));      // 0 (প্রথম A)
Console.WriteLine(letters.LastIndexOf("A"));  // 4 (শেষ A)
```

**Visual:**

```
Index:  [0]  [1]  [2]  [3]  [4]
       ┌────┬────┬────┬────┬────┐
       │ A  │ B  │ A  │ C  │ A  │
       └────┴────┴────┴────┴────┘
         ↑              ↑    ↑
    IndexOf("A")=0      │  LastIndexOf("A")=4
                        │
              IndexOf("A")=0 এটা skip করে
```

---

### ৪. Find() - Condition দিয়ে খোঁজো

**প্রথম item যেটা condition মেটায় সেটা return করে।**

এখানেও Lambda use করবো (আগে শিখেছি!)

```csharp
List<int> numbers = new List<int> { 10, 25, 30, 45, 50 };

// প্রথম number যেটা 30 এর বেশি
int result = numbers.Find(n => n > 30);

Console.WriteLine(result);  // 45
```

**কী হচ্ছে এখানে?**

```
numbers = [10, 25, 30, 45, 50]

Find(n => n > 30)   // 30 এর বেশি প্রথম number খোঁজো

      10 > 30?  ❌ No  → skip
      25 > 30?  ❌ No  → skip
      30 > 30?  ❌ No  → skip
      45 > 30?  ✅ YES → FOUND! Return 45
      
      (50 পর্যন্ত যায়নি, আগেই পেয়ে গেছে)
```

**কেন 45? কেন 50 না?**

কারণ Find() **প্রথম match** return করে। 45 হলো first number > 30.

---

**String এ Find:**

```csharp
List<string> names = new List<string> { "Rahim", "Karim", "Rafiq", "Jabbar" };

// প্রথম নাম যেটা "R" দিয়ে শুরু
string result = names.Find(name => name.StartsWith("R"));

Console.WriteLine(result);  // Rahim
```

---

**Object এ Find (খুব useful!):**

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

List<Student> students = new List<Student>
{
    new Student("Rahim", 101, 85),
    new Student("Karim", 102, 72),
    new Student("Jabbar", 103, 90)
};

// Roll 102 এর student খোঁজো
Student found = students.Find(s => s.Roll == 102);

if (found != null)
{
    Console.WriteLine($"Found: {found.Name}");  // Found: Karim
}
```

---

**না পেলে কী return করে?**

```csharp
// int এর জন্য: 0 (default value)
List<int> numbers = new List<int> { 10, 20, 30 };
int result = numbers.Find(n => n > 100);
Console.WriteLine(result);  // 0

// string/object এর জন্য: null
List<string> names = new List<string> { "A", "B", "C" };
string result2 = names.Find(n => n.StartsWith("Z"));
Console.WriteLine(result2 == null);  // True
```

**তাই null check করা জরুরি!**

```csharp
Student found = students.Find(s => s.Roll == 999);

if (found != null)
{
    Console.WriteLine($"Found: {found.Name}");
}
else
{
    Console.WriteLine("Student not found!");
}
```

---

### ৫. FindAll() - Condition মেটে এমন সব খোঁজো

**Find() একটা দেয়, FindAll() সব দেয়!**

```csharp
List<int> numbers = new List<int> { 10, 25, 30, 45, 50, 15, 35 };

// 30 এর বেশি সব numbers
List<int> bigNumbers = numbers.FindAll(n => n > 30);

// bigNumbers = [45, 50, 35]
```

---

**Students Example:**

```csharp
List<Student> students = new List<Student>
{
    new Student("Rahim", 101, 85),
    new Student("Karim", 102, 72),
    new Student("Jabbar", 103, 90),
    new Student("Alam", 104, 55),
    new Student("Rafiq", 105, 38)
};

// Pass করা students (Marks >= 40)
List<Student> passed = students.FindAll(s => s.Marks >= 40);
Console.WriteLine($"Passed: {passed.Count}");  // 4

// Toppers (Marks >= 80)
List<Student> toppers = students.FindAll(s => s.Marks >= 80);
Console.WriteLine($"Toppers: {toppers.Count}");  // 2

// Failed (Marks < 40)
List<Student> failed = students.FindAll(s => s.Marks < 40);
Console.WriteLine($"Failed: {failed.Count}");  // 1
```

---

### ৬. FindIndex() - Condition মেটে এমন প্রথম item এর Index

```csharp
List<int> numbers = new List<int> { 10, 25, 30, 45, 50 };
//                                  [0]  [1]  [2]  [3]  [4]

// প্রথম number এর index যেটা 30 এর বেশি
int index = numbers.FindIndex(n => n > 30);

Console.WriteLine(index);  // 3 (45 এর index)
```

**IndexOf vs FindIndex:**

| IndexOf | FindIndex |
|---------|-----------|
| Exact value দিয়ে খোঁজে | Condition দিয়ে খোঁজে |
| `IndexOf("Apple")` | `FindIndex(n => n > 30)` |

---

### ৭. Exists() - Condition মেটে এমন কিছু আছে কিনা?

```csharp
List<int> numbers = new List<int> { 10, 25, 30, 45, 50 };

// 30 এর বেশি কোনো number আছে?
bool hasLarge = numbers.Exists(n => n > 30);
Console.WriteLine(hasLarge);  // True

// 100 এর বেশি কোনো number আছে?
bool hasHuge = numbers.Exists(n => n > 100);
Console.WriteLine(hasHuge);  // False
```

**Contains vs Exists:**

| Contains | Exists |
|----------|--------|
| Exact value check | Condition check |
| `Contains(30)` | `Exists(n => n > 30)` |
| "30 আছে?" | "30 এর বেশি কিছু আছে?" |

---

## Sorting & Reversing - সাজানো ও উল্টানো

### Sort() - ছোট থেকে বড় (Ascending)

```csharp
List<int> numbers = new List<int> { 50, 20, 40, 10, 30 };

numbers.Sort();

// numbers = [10, 20, 30, 40, 50]
```

**Visual:**

```
Before Sort():
┌────┬────┬────┬────┬────┐
│ 50 │ 20 │ 40 │ 10 │ 30 │
└────┴────┴────┴────┴────┘

After Sort():
┌────┬────┬────┬────┬────┐
│ 10 │ 20 │ 30 │ 40 │ 50 │
└────┴────┴────┴────┴────┘
     ছোট  →  →  →  বড়
```

---

**String Sort (Alphabetical):**

```csharp
List<string> names = new List<string> { "Rahim", "Alam", "Karim", "Jabbar" };

names.Sort();

// names = ["Alam", "Jabbar", "Karim", "Rahim"]
//            A        J         K        R
```

---

### Reverse() - উল্টাও

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

numbers.Reverse();

// numbers = [5, 4, 3, 2, 1]
```

---

### বড় থেকে ছোট (Descending) করতে চাইলে?

**Sort() + Reverse() = Descending!**

```csharp
List<int> numbers = new List<int> { 50, 20, 40, 10, 30 };

numbers.Sort();     // [10, 20, 30, 40, 50]
numbers.Reverse();  // [50, 40, 30, 20, 10]
```

**Visual:**

```
Original:    [50, 20, 40, 10, 30]
                    ↓
Sort():      [10, 20, 30, 40, 50]  (ছোট → বড়)
                    ↓
Reverse():   [50, 40, 30, 20, 10]  (বড় → ছোট)
```

---

## Other Useful Methods

### ToArray() - List থেকে Array

```csharp
List<string> list = new List<string> { "A", "B", "C" };

string[] arr = list.ToArray();

// arr = ["A", "B", "C"]
// arr.Length = 3
```

**কখন দরকার?**

- কোনো method শুধু Array নেয়
- Performance critical code এ (Array slightly faster)

---

### ForEach() - প্রতিটার উপর কাজ করো

```csharp
List<string> names = new List<string> { "Rahim", "Karim", "Jabbar" };

names.ForEach(name => Console.WriteLine($"Hello, {name}!"));
```

**Output:**
```
Hello, Rahim!
Hello, Karim!
Hello, Jabbar!
```

---

**Numbers print করা:**

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };

// প্রতিটার double print করো
numbers.ForEach(n => Console.WriteLine(n * 2));
```

**Output:**
```
2
4
6
8
10
```

---

### GetRange() - অংশ নাও

```csharp
List<int> numbers = new List<int> { 10, 20, 30, 40, 50, 60, 70 };
//                                  [0]  [1]  [2]  [3]  [4]  [5]  [6]

// Index 2 থেকে 3 টা item নাও
List<int> part = numbers.GetRange(2, 3);

// part = [30, 40, 50]
```

**Visual:**

```
Original:
Index:  [0]   [1]   [2]   [3]   [4]   [5]   [6]
       ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
       │ 10  │ 20  │ 30  │ 40  │ 50  │ 60  │ 70  │
       └─────┴─────┴─────┴─────┴─────┴─────┴─────┘
                    ↑─────────────────↑
                  Start=2         Count=3


GetRange(2, 3):
       ┌─────┬─────┬─────┐
       │ 30  │ 40  │ 50  │
       └─────┴─────┴─────┘
```

---

## Loop করার উপায়

### for loop

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };

for (int i = 0; i < fruits.Count; i++)
{
    Console.WriteLine($"Index {i}: {fruits[i]}");
}
```

**Output:**
```
Index 0: Apple
Index 1: Banana
Index 2: Mango
```

**কখন for loop?**
- যখন **index জানা দরকার**
- যখন **loop এর মধ্যে modify** করতে হবে

---

### foreach loop

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

**Output:**
```
Apple
Banana
Mango
```

**কখন foreach?**
- শুধু **পড়তে** চাইলে
- Code **cleaner** চাইলে
- Index **দরকার না** হলে

---

## List<T> with Custom Class

### Student Class

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
    
    public bool IsPassed()
    {
        return Marks >= 40;
    }
}
```

### List<Student> তৈরি ও ব্যবহার

```csharp
List<Student> students = new List<Student>();

// Add students
students.Add(new Student("Rahim", 101, 85));
students.Add(new Student("Karim", 102, 72));
students.Add(new Student("Jabbar", 103, 91));
students.Add(new Student("Alam", 104, 55));
students.Add(new Student("Rafiq", 105, 38));

// সব students দেখা
Console.WriteLine("All Students:");
foreach (Student s in students)
{
    Console.WriteLine($"{s.Name} - Roll: {s.Roll} - Marks: {s.Marks} - Grade: {s.GetGrade()}");
}

// Roll দিয়ে search
Student found = students.Find(s => s.Roll == 103);
if (found != null)
{
    Console.WriteLine($"\nRoll 103: {found.Name}");
}

// Pass করা students
List<Student> passed = students.FindAll(s => s.IsPassed());
Console.WriteLine($"\nPassed: {passed.Count} students");

// Fail students remove
int removed = students.RemoveAll(s => !s.IsPassed());
Console.WriteLine($"Removed {removed} failed student(s)");
```

---

## Complete Example

```csharp
using System;
using System.Collections.Generic;

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
}

class Program
{
    static void Main()
    {
        List<Student> students = new List<Student>
        {
            new Student("Rahim", 101, 85),
            new Student("Karim", 102, 72),
            new Student("Jabbar", 103, 91),
            new Student("Alam", 104, 55),
            new Student("Rafiq", 105, 38)
        };
        
        // Display all
        Console.WriteLine("📚 ALL STUDENTS:\n");
        foreach (Student s in students)
        {
            string status = s.Marks >= 40 ? "✓" : "✗";
            Console.WriteLine($"{status} {s.Name} (Roll: {s.Roll}) - {s.Marks} - {s.GetGrade()}");
        }
        
        // Statistics
        Console.WriteLine($"\nTotal: {students.Count}");
        Console.WriteLine($"Passed: {students.FindAll(s => s.Marks >= 40).Count}");
        Console.WriteLine($"Failed: {students.FindAll(s => s.Marks < 40).Count}");
        Console.WriteLine($"Toppers: {students.FindAll(s => s.Marks >= 80).Count}");
    }
}
```

**Output:**
```
📚 ALL STUDENTS:

✓ Rahim (Roll: 101) - 85 - A+
✓ Karim (Roll: 102) - 72 - A
✓ Jabbar (Roll: 103) - 91 - A+
✓ Alam (Roll: 104) - 55 - C
✗ Rafiq (Roll: 105) - 38 - F

Total: 5
Passed: 4
Failed: 1
Toppers: 2
```

---

## Summary Table

### Creating:
| Code | কাজ |
|------|-----|
| `new List<T>()` | Empty list |
| `new List<T> { a, b }` | Values সহ |
| `new List<T>(array)` | Array থেকে |

### Properties:
| Property | কাজ |
|----------|-----|
| `Count` | কয়টা item |
| `[index]` | Index দিয়ে access |

### Adding:
| Method | কাজ |
|--------|-----|
| `Add(item)` | শেষে যোগ |
| `AddRange(items)` | অনেকগুলো যোগ |
| `Insert(i, item)` | নির্দিষ্ট জায়গায় |

### Removing:
| Method | কাজ |
|--------|-----|
| `Remove(item)` | Value দিয়ে |
| `RemoveAt(i)` | Index দিয়ে |
| `RemoveAll(cond)` | Condition দিয়ে |
| `Clear()` | সব মুছো |

### Searching:
| Method | কাজ |
|--------|-----|
| `Contains(item)` | আছে কিনা |
| `IndexOf(item)` | কোথায় আছে |
| `Find(cond)` | প্রথম match |
| `FindAll(cond)` | সব matches |
| `Exists(cond)` | কোনো match আছে কিনা |

### Sorting:
| Method | কাজ |
|--------|-----|
| `Sort()` | ছোট → বড় |
| `Reverse()` | উল্টাও |

---

## মনে রাখো

**Array vs List:**
- Array = Fixed size, slightly faster
- List = Dynamic size, more features

**বেশিরভাগ সময় List use করো!**

---

**Next Part এ:** Dictionary<K,V> - Key দিয়ে Value খোঁজা!

---

*CPS Academy - Learn. Code. Grow.*
