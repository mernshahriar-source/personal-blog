---
title: "Lesson 7.4: Queue<T> ও HashSet<T> — FIFO ও Unique Collections"
date: "2026-03-28"
excerpt: "Queue কী ও FIFO concept, Enqueue/Dequeue/Peek, HashSet কী ও unique items, Set Operations (Union, Intersect, Except), Stack vs Queue তুলনা, এবং List vs HashSet তুলন�"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - collections
  - list
  - dictionary
  - stack
  - queue
draft: false
---


> **এই Lesson এ শিখবে:** Queue কী ও FIFO concept, Enqueue/Dequeue/Peek, HashSet কী ও unique items, Set Operations (Union, Intersect, Except), Stack vs Queue তুলনা, এবং List vs HashSet তুলনা।

---

# Part 1: Queue\<T\> — First In First Out

---

## Queue কী?

Bank এর লাইনের মতো:

```
Enqueue →  ┌───┬───┬───┬───┐  → Dequeue
           │ A │ B │ C │ D │
           └───┴───┴───┴───┘
             ↑               ↑
           Front            Back
          (আগে আসা)      (পরে আসা)
```

**কে আগে Service পাবে?** **A** — যে আগে এসেছে!

**FIFO = First In, First Out** — যে আগে ঢোকে, সে আগে বের হয়।

---

## Real Life এ Queue

| Example | FIFO কেন |
|---------|----------|
| Bank এর লাইন | আগে আসলে আগে service |
| Print Queue | আগে দিলে আগে print |
| Customer Support | আগে call করলে আগে receive |
| Task Scheduler | আগে submit করলে আগে execute |

---

## Queue তৈরি ও Methods

```csharp
Queue<string> line = new Queue<string>();

// Enqueue — পেছনে ঢোকাও
line.Enqueue("Rahim");   // [Rahim]
line.Enqueue("Karim");   // [Rahim, Karim]
line.Enqueue("Jabbar");  // [Rahim, Karim, Jabbar]

// Dequeue — সামনে থেকে বের করো
string first = line.Dequeue();  // "Rahim" (বের হলো)
// Queue: [Karim, Jabbar]

// Peek — সামনেরটা দেখো (বের করো না)
string next = line.Peek();  // "Karim" (দেখলাম)
// Queue still: [Karim, Jabbar]

// Count ও Contains
Console.WriteLine(line.Count);             // 2
Console.WriteLine(line.Contains("Jabbar")); // true
```

**⚠️ খালি Queue তে Dequeue()/Peek() → Error!** আগে `Count > 0` check করো।

---

## Example: Print Queue 🖨️

```csharp
Queue<string> printQueue = new Queue<string>();

printQueue.Enqueue("Report.pdf");
printQueue.Enqueue("Invoice.xlsx");
printQueue.Enqueue("Photo.jpg");

Console.WriteLine("🖨️ Print Queue:\n");

int jobNo = 1;
while (printQueue.Count > 0)
{
    string doc = printQueue.Dequeue();
    Console.WriteLine($"  Printing #{jobNo}: {doc}...");
    jobNo++;
}

Console.WriteLine("\n✅ All documents printed!");
```

Output:
```
🖨️ Print Queue:

  Printing #1: Report.pdf...
  Printing #2: Invoice.xlsx...
  Printing #3: Photo.jpg...

✅ All documents printed!
```

---

## Example: Customer Support ☎️

```csharp
Queue<string> customers = new Queue<string>();

customers.Enqueue("Rahim");
customers.Enqueue("Karim");
customers.Enqueue("Jabbar");

while (customers.Count > 0)
{
    string current = customers.Dequeue();
    Console.WriteLine($"📞 Serving: {current}");
    Console.WriteLine($"   Waiting: {customers.Count}");
}
```

---

## Stack vs Queue

| Feature | Stack (LIFO) | Queue (FIFO) |
|---------|-------------|-------------|
| ঢোকানো | `Push` (উপরে) | `Enqueue` (পেছনে) |
| বের করা | `Pop` (উপর থেকে) | `Dequeue` (সামনে থেকে) |
| দেখা | `Peek` (Top) | `Peek` (Front) |
| Real life | থালার stack | Bank এর লাইন |
| Order | শেষেরটা আগে | **আগেরটা আগে** |

---

## Queue Methods — Quick Reference

| Method/Property | কাজ |
|-----------------|-----|
| `Enqueue(item)` | পেছনে ঢোকাও |
| `Dequeue()` | সামনে থেকে বের করো |
| `Peek()` | সামনেরটা দেখো |
| `Count` | কয়টা আছে |
| `Contains(item)` | আছে কিনা |
| `Clear()` | সব মুছো |

---

# Part 2: HashSet\<T\> — Unique Items Only

---

## HashSet কী?

**শুধু unique items!** Duplicate add করতে গেলে ignore হয়:

```csharp
HashSet<string> visitors = new HashSet<string>();

visitors.Add("Rahim");   // ✅ Added
visitors.Add("Karim");   // ✅ Added
visitors.Add("Rahim");   // ❌ Ignored! (already exists)
visitors.Add("Jabbar");  // ✅ Added

Console.WriteLine(visitors.Count);  // 3 (not 4!)
```

---

## Real Life এ HashSet

| Example | Unique কেন |
|---------|-----------|
| Website visitors | Same person একবার count |
| Tags | Duplicate tag নাই |
| Word list | Unique words only |
| Lottery numbers | Same number একবার |

---

## HashSet তৈরি ও Methods

```csharp
HashSet<int> numbers = new HashSet<int> { 10, 20, 30, 20, 10 };
// numbers: { 10, 20, 30 } — duplicates ignored!

numbers.Add(40);        // ✅ Added
bool added = numbers.Add(10);  // false (already exists)

numbers.Remove(20);     // মুছো
bool has30 = numbers.Contains(30);  // true (super fast!)

Console.WriteLine(numbers.Count);  // 3
```

**`Contains()` extremely fast!** List এ loop লাগে, HashSet এ instant।

---

## Set Operations — গুরুত্বপূর্ণ! 🔥

### UnionWith — দুই set এর সব items:

```csharp
HashSet<string> a = new HashSet<string> { "Apple", "Banana", "Mango" };
HashSet<string> b = new HashSet<string> { "Banana", "Orange", "Grape" };

a.UnionWith(b);
// a: { Apple, Banana, Mango, Orange, Grape }
```

### IntersectWith — common items:

```csharp
HashSet<string> a = new HashSet<string> { "Apple", "Banana", "Mango" };
HashSet<string> b = new HashSet<string> { "Banana", "Mango", "Grape" };

a.IntersectWith(b);
// a: { Banana, Mango }
```

### ExceptWith — a তে আছে কিন্তু b তে নেই:

```csharp
HashSet<string> a = new HashSet<string> { "Apple", "Banana", "Mango" };
HashSet<string> b = new HashSet<string> { "Banana", "Grape" };

a.ExceptWith(b);
// a: { Apple, Mango }
```

---

## Example: Common Friends 👥

```csharp
HashSet<string> rahimFriends = new HashSet<string> { "Karim", "Jabbar", "Salam", "Jalil" };
HashSet<string> karimFriends = new HashSet<string> { "Rahim", "Jabbar", "Rafiq", "Jalil" };

HashSet<string> common = new HashSet<string>(rahimFriends);
common.IntersectWith(karimFriends);

Console.WriteLine("Common friends:");
foreach (string f in common)
    Console.WriteLine($"  👤 {f}");
// Jabbar, Jalil
```

---

## Example: Remove Duplicates from List

```csharp
List<string> words = new List<string> { "I", "love", "love", "love", "Bangladesh", "Bangladesh" };

HashSet<string> unique = new HashSet<string>(words);

Console.WriteLine($"Original: {words.Count} words");    // 6
Console.WriteLine($"Unique: {unique.Count} words");      // 4

foreach (string w in unique)
    Console.Write(w + " ");
// I love Bangladesh
```

---

## List vs HashSet

| Feature | List | HashSet |
|---------|------|---------|
| Duplicates | ✅ Allow | ❌ Unique only |
| Order | ✅ Index order | ❌ No order |
| `Contains()` | Slow (loop) | **Super fast** |
| Index access | ✅ `list[0]` | ❌ Not possible |
| Use case | Ordered data | Unique + fast lookup |

---

## HashSet Methods — Quick Reference

| Method | কাজ |
|--------|-----|
| `Add(item)` | Unique add (returns bool) |
| `Remove(item)` | মুছো |
| `Contains(item)` | আছে কিনা (super fast) |
| `UnionWith(set)` | দুই set merge |
| `IntersectWith(set)` | Common items |
| `ExceptWith(set)` | Difference |
| `Count` | কয়টা unique item |
| `Clear()` | সব মুছো |

---

## Collections Series Summary 🎉

| Collection | কাজ | Key Feature |
|------------|-----|-------------|
| **List\<T\>** | Dynamic Array | Add/Remove freely |
| **Dictionary\<K,V\>** | Key-Value Store | Instant lookup by key |
| **Stack\<T\>** | LIFO | Last In, First Out |
| **Queue\<T\>** | FIFO | First In, First Out |
| **HashSet\<T\>** | Unique Items | No duplicates, fast Contains |

---

**Module 7 Complete!** 🎉 পরের Module: Exception Handling — Error handle করা শেখা!

---

*CPS Academy - Learn. Code. Grow.*
