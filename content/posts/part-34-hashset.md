---
title: 'Part 34: HashSet<T> - Unique Items'
date: '2026-01-20'
excerpt: 'Part 34: HashSet - unique items only collection'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - collections
  - hashset
  - tutorial
draft: false
---

# Part 34: HashSet<T> - Unique Items Only

## আগের Parts এ কী শিখলাম?

| Collection | কাজ | Order |
|------------|-----|-------|
| List<T> | Dynamic Array | Index order |
| Dictionary<K,V> | Key-Value pairs | Key দিয়ে access |
| Stack<T> | LIFO | Last In First Out |
| Queue<T> | FIFO | First In First Out |

আজকে শিখবো **HashSet<T>** - এটা **শুধু unique items** রাখে!

---

## গল্প দিয়ে শুরু করি

### Website Unique Visitors

ধরো তুমি একটা website এর visitor count করছো।

**আজকের visitors:**

```
9:00 AM  - Rahim visited
9:15 AM  - Karim visited
9:30 AM  - Rahim visited (আবার!)
10:00 AM - Jabbar visited
10:30 AM - Rahim visited (আবার!)
11:00 AM - Karim visited (আবার!)
```

**প্রশ্ন: আজকে কতজন unique visitor এসেছে?**

---

### List দিয়ে করলে সমস্যা

```csharp
List<string> visitors = new List<string>();

visitors.Add("Rahim");   // Count = 1
visitors.Add("Karim");   // Count = 2
visitors.Add("Rahim");   // Count = 3 ← Duplicate!
visitors.Add("Jabbar");  // Count = 4
visitors.Add("Rahim");   // Count = 5 ← Duplicate!
visitors.Add("Karim");   // Count = 6 ← Duplicate!

Console.WriteLine(visitors.Count);  // 6 ❌ ভুল!
```

**List বলছে 6 জন, কিন্তু আসলে unique visitor 3 জন!**

```
List: [Rahim, Karim, Rahim, Jabbar, Rahim, Karim]
                  ↑              ↑       ↑
              Duplicate      Duplicate  Duplicate
```

---

### Manually Check করতে হলে?

```csharp
List<string> visitors = new List<string>();

void AddVisitor(string name)
{
    // আগে check করো আছে কিনা
    if (!visitors.Contains(name))
    {
        visitors.Add(name);
    }
}

AddVisitor("Rahim");   // নতুন, add হলো
AddVisitor("Karim");   // নতুন, add হলো
AddVisitor("Rahim");   // আছে, add হলো না
AddVisitor("Jabbar");  // নতুন, add হলো
AddVisitor("Rahim");   // আছে, add হলো না
AddVisitor("Karim");   // আছে, add হলো না

Console.WriteLine(visitors.Count);  // 3 ✓ সঠিক!
```

**কিন্তু সমস্যা:**
1. প্রতিবার manually check করতে হচ্ছে
2. `Contains()` slow - পুরো List search করে (O(n))
3. Code বেশি লিখতে হচ্ছে

---

### HashSet দিয়ে সহজ Solution!

```csharp
HashSet<string> visitors = new HashSet<string>();

visitors.Add("Rahim");   // ✓ Added
visitors.Add("Karim");   // ✓ Added
visitors.Add("Rahim");   // ✗ Already exists, ignored!
visitors.Add("Jabbar");  // ✓ Added
visitors.Add("Rahim");   // ✗ Already exists, ignored!
visitors.Add("Karim");   // ✗ Already exists, ignored!

Console.WriteLine(visitors.Count);  // 3 ✓ সঠিক!
```

**HashSet automatically duplicate handle করে!**

---

### Visual: List vs HashSet

```
╔═══════════════════════════════════════════════════════════════════════╗
║                      LIST vs HASHSET                                  ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  Input: Rahim, Karim, Rahim, Jabbar, Rahim, Karim                    ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  LIST<string>:                                                        ║
║  ┌────────┬────────┬────────┬────────┬────────┬────────┐             ║
║  │ Rahim  │ Karim  │ Rahim  │ Jabbar │ Rahim  │ Karim  │             ║
║  └────────┴────────┴────────┴────────┴────────┴────────┘             ║
║  Count = 6 (Duplicates allowed!)                                      ║
║                                                                       ║
║  ─────────────────────────────────────────────────────────────────    ║
║                                                                       ║
║  HASHSET<string>:                                                     ║
║  ┌────────┬────────┬────────┐                                        ║
║  │ Rahim  │ Karim  │ Jabbar │                                        ║
║  └────────┴────────┴────────┘                                        ║
║  Count = 3 (Only unique items!)                                       ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

## HashSet এর বৈশিষ্ট্য

```
┌─────────────────────────────────────────────────────────────┐
│                    HASHSET<T>                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ✓ শুধু Unique items রাখে                                   │
│  ✓ Duplicate automatically ignore করে                      │
│  ✓ Contains() অনেক fast - O(1)                             │
│  ✓ Add/Remove অনেক fast - O(1)                             │
│  ✗ Order maintain করে না                                    │
│  ✗ Index দিয়ে access করা যায় না                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Real-life Examples যেখানে HashSet ব্যবহার হয়

### ১. Unique Visitors Tracking

```
Website এ আজকে কতজন unique user এসেছে?
Same user বারবার visit করলেও count 1
```

---

### ২. Tags / Categories

```
Blog post এ tags:
- "programming"
- "csharp"
- "programming"  ← Duplicate! রাখা উচিত না

HashSet<string> tags - automatically unique রাখবে
```

---

### ৩. Lottery Numbers

```
Lottery তে 6 টা unique number লাগবে।
Same number দুইবার আসলে চলবে না!

HashSet<int> - duplicate number আসবে না
```

---

### ৪. Student Attendance

```
আজকে কতজন student এসেছে?
Same student দুইবার attendance দিলেও count 1
```

---

### ৫. Email Recipients

```
Newsletter পাঠাতে হবে।
Same email এ দুইবার পাঠানো উচিত না!

HashSet<string> emails - duplicate email থাকবে না
```

---

### ৬. Common Friends (Set Operations)

```
Rahim এর friends: {Karim, Jabbar, Alam}
Karim এর friends: {Rahim, Jabbar, Salam}

Common friends? → {Jabbar}

HashSet এর IntersectWith() দিয়ে সহজেই বের করা যায়!
```

---

## HashSet<T> তৈরি করা

### Empty HashSet

```csharp
using System.Collections.Generic;

// Empty HashSet of strings
HashSet<string> names = new HashSet<string>();

// Empty HashSet of integers
HashSet<int> numbers = new HashSet<int>();

// Empty HashSet of custom objects
HashSet<Student> students = new HashSet<Student>();
```

---

### `HashSet<string>` এর প্রতিটা part:

```
HashSet<string> visitors = new HashSet<string>();
───┬─── ───┬───  ───┬────   ──┬── ───┬───
   │       │        │         │      │
   │       │        │         │      └── Type parameter
   │       │        │         │
   │       │        │         └── new keyword
   │       │        │
   │       │        └── Variable name
   │       │
   │       └── Type parameter (কী রাখবে)
   │
   └── HashSet class
```

---

### Initial Values সহ

```csharp
// Collection initializer দিয়ে
HashSet<string> fruits = new HashSet<string>()
{
    "Apple",
    "Banana",
    "Mango"
};
```

---

### ⚠️ Initial Values এ Duplicate দিলে কী হয়?

```csharp
HashSet<string> fruits = new HashSet<string>()
{
    "Apple",
    "Banana",
    "Apple",    // Duplicate!
    "Mango",
    "Banana"    // Duplicate!
};

Console.WriteLine(fruits.Count);  // 3 (not 5!)

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

**Output:**
```
3
Apple
Banana
Mango
```

**Duplicate গুলো automatically ignore হয়ে গেছে!**

---

### Array থেকে HashSet (Duplicates Remove!)

```csharp
// Array with duplicates
int[] numbers = { 1, 2, 3, 2, 4, 3, 5, 1, 2 };

// HashSet এ convert - duplicates removed!
HashSet<int> uniqueNumbers = new HashSet<int>(numbers);

Console.WriteLine($"Original array: {numbers.Length} items");      // 9
Console.WriteLine($"HashSet: {uniqueNumbers.Count} unique items"); // 5
```

**এটা duplicate remove করার সবচেয়ে সহজ উপায়!**

---

## Add() - Unique ভাবে Add করো

### Add() Return Value

**Add()** method **true** বা **false** return করে:

- **true** = নতুন item, successfully added
- **false** = already exists, ignored

```csharp
HashSet<string> names = new HashSet<string>();

bool result1 = names.Add("Rahim");
Console.WriteLine($"Add Rahim: {result1}");  // True (নতুন)

bool result2 = names.Add("Karim");
Console.WriteLine($"Add Karim: {result2}");  // True (নতুন)

bool result3 = names.Add("Rahim");
Console.WriteLine($"Add Rahim again: {result3}");  // False (আগেই আছে!)

Console.WriteLine($"Count: {names.Count}");  // 2
```

**Output:**
```
Add Rahim: True
Add Karim: True
Add Rahim again: False
Count: 2
```

---

### Step by Step Visual:

```
Initial: Empty HashSet
         { }


Add("Rahim") → returns True
         { Rahim }
         Count = 1


Add("Karim") → returns True
         { Rahim, Karim }
         Count = 2


Add("Jabbar") → returns True
         { Rahim, Karim, Jabbar }
         Count = 3


Add("Rahim") → returns False (already exists!)
         { Rahim, Karim, Jabbar }
         Count = 3 (unchanged!)


Add("Karim") → returns False (already exists!)
         { Rahim, Karim, Jabbar }
         Count = 3 (unchanged!)
```

---

### Return Value Use করা

```csharp
HashSet<string> registeredUsers = new HashSet<string>();

void RegisterUser(string username)
{
    if (registeredUsers.Add(username))
    {
        Console.WriteLine($"✓ {username} registered successfully!");
    }
    else
    {
        Console.WriteLine($"✗ {username} already exists!");
    }
}

RegisterUser("rahim123");    // ✓ rahim123 registered successfully!
RegisterUser("karim456");    // ✓ karim456 registered successfully!
RegisterUser("rahim123");    // ✗ rahim123 already exists!
```

---

## Remove() এবং Contains()

### Remove() - Item মুছে ফেলো

```csharp
HashSet<string> fruits = new HashSet<string>() { "Apple", "Banana", "Mango" };

Console.WriteLine(fruits.Count);  // 3

bool removed = fruits.Remove("Banana");
Console.WriteLine($"Removed Banana: {removed}");  // True
Console.WriteLine(fruits.Count);  // 2

bool removed2 = fruits.Remove("Orange");
Console.WriteLine($"Removed Orange: {removed2}");  // False (ছিল না!)
Console.WriteLine(fruits.Count);  // 2
```

**Remove() ও true/false return করে:**
- **true** = ছিল এবং remove হয়েছে
- **false** = ছিলই না

---

### Contains() - আছে কিনা Check করো

```csharp
HashSet<string> fruits = new HashSet<string>() { "Apple", "Banana", "Mango" };

Console.WriteLine(fruits.Contains("Apple"));   // True
Console.WriteLine(fruits.Contains("Banana"));  // True
Console.WriteLine(fruits.Contains("Orange"));  // False
```

---

### 🚀 Contains() অনেক FAST!

**HashSet এর Contains() অনেক দ্রুত কাজ করে!**

```
List<T>.Contains()    →  O(n)  - পুরো list search করে
HashSet<T>.Contains() →  O(1)  - instantly খুঁজে পায়!
```

**কেন fast?**

HashSet internally **Hash Table** use করে। প্রতিটা item এর একটা "hash code" থাকে যেটা দিয়ে instantly খুঁজে পাওয়া যায়।

---

### Performance Comparison

```csharp
// 1 million items এ খুঁজতে হলে:

List<int>:    
  Contains(999999) → ~500,000 comparisons (average)
  Time: Slow! 😓

HashSet<int>: 
  Contains(999999) → ~1 comparison (hash lookup)
  Time: Instant! 🚀
```

**Practical Example:**

```csharp
// 10 লক্ষ items
List<int> list = new List<int>();
HashSet<int> hashSet = new HashSet<int>();

for (int i = 0; i < 1000000; i++)
{
    list.Add(i);
    hashSet.Add(i);
}

// Search করতে কত সময় লাগে?

// List - Slow!
bool found1 = list.Contains(999999);  // অনেক সময় লাগবে

// HashSet - Fast!
bool found2 = hashSet.Contains(999999);  // instantly!
```

---

## Set Operations (গুরুত্বপূর্ণ!)

HashSet এ **Set Theory** এর operations করা যায়। এগুলো অনেক powerful!

### দুইটা Set নিয়ে কাজ করবো:

```csharp
HashSet<int> setA = new HashSet<int>() { 1, 2, 3, 4, 5 };
HashSet<int> setB = new HashSet<int>() { 4, 5, 6, 7, 8 };
```

```
Set A: { 1, 2, 3, 4, 5 }
Set B: { 4, 5, 6, 7, 8 }

Common: 4, 5
```

---

### ১. UnionWith() - দুই Set এর সব Items

**Union = Set A + Set B (সব unique items)**

```csharp
HashSet<int> setA = new HashSet<int>() { 1, 2, 3, 4, 5 };
HashSet<int> setB = new HashSet<int>() { 4, 5, 6, 7, 8 };

setA.UnionWith(setB);

// setA = { 1, 2, 3, 4, 5, 6, 7, 8 }
```

**Visual:**

```
Before UnionWith:
Set A: { 1, 2, 3, 4, 5 }
Set B: { 4, 5, 6, 7, 8 }

UnionWith(setB):
         ┌───────────────────────────┐
         │      SET A                │
         │   ┌─────────────┐         │
         │   │ 1, 2, 3     │         │
         │   │      ┌──────┴────┐    │
         │   │      │  4, 5     │    │  ← Common
         │   │      └──────┬────┘    │
         │   └─────────────┘   │     │
         │              6, 7, 8│     │
         │              SET B  │     │
         └───────────────────────────┘

After UnionWith:
Set A: { 1, 2, 3, 4, 5, 6, 7, 8 }  ← সব items!
```

**⚠️ Important:** `UnionWith()` original set কে modify করে!

---

### ২. IntersectWith() - Common Items Only

**Intersection = শুধু যেগুলো দুই set এই আছে**

```csharp
HashSet<int> setA = new HashSet<int>() { 1, 2, 3, 4, 5 };
HashSet<int> setB = new HashSet<int>() { 4, 5, 6, 7, 8 };

setA.IntersectWith(setB);

// setA = { 4, 5 }  ← শুধু common items!
```

**Visual:**

```
Before IntersectWith:
Set A: { 1, 2, 3, 4, 5 }
Set B: { 4, 5, 6, 7, 8 }

IntersectWith(setB):
         ┌─────────────┐
         │ 1, 2, 3     │  ← A only (removed)
         │      ┌──────┴────┐
         │      │  4, 5     │  ← COMMON (kept!)
         │      └──────┬────┘
         └─────────────┘   │
                    6, 7, 8│  ← B only (not added)
                           │

After IntersectWith:
Set A: { 4, 5 }  ← শুধু common items!
```

---

### ৩. ExceptWith() - Difference (A - B)

**Except = A তে আছে কিন্তু B তে নেই**

```csharp
HashSet<int> setA = new HashSet<int>() { 1, 2, 3, 4, 5 };
HashSet<int> setB = new HashSet<int>() { 4, 5, 6, 7, 8 };

setA.ExceptWith(setB);

// setA = { 1, 2, 3 }  ← A তে আছে কিন্তু B তে নেই
```

**Visual:**

```
Before ExceptWith:
Set A: { 1, 2, 3, 4, 5 }
Set B: { 4, 5, 6, 7, 8 }

ExceptWith(setB):
         ┌─────────────┐
         │ 1, 2, 3     │  ← A only (KEPT!)
         │      ┌──────┴────┐
         │      │  4, 5     │  ← Common (removed!)
         │      └──────┬────┘
         └─────────────┘   │

After ExceptWith:
Set A: { 1, 2, 3 }  ← শুধু A exclusive!
```

---

### ৪. SymmetricExceptWith() - Exclusive Items Only

**Symmetric Except = যেগুলো শুধু একটাতেই আছে (common বাদে)**

```csharp
HashSet<int> setA = new HashSet<int>() { 1, 2, 3, 4, 5 };
HashSet<int> setB = new HashSet<int>() { 4, 5, 6, 7, 8 };

setA.SymmetricExceptWith(setB);

// setA = { 1, 2, 3, 6, 7, 8 }  ← Common বাদে বাকি সব!
```

**Visual:**

```
Before SymmetricExceptWith:
Set A: { 1, 2, 3, 4, 5 }
Set B: { 4, 5, 6, 7, 8 }

SymmetricExceptWith(setB):
         ┌─────────────┐
         │ 1, 2, 3     │  ← A only (KEPT!)
         │      ┌──────┴────┐
         │      │  4, 5     │  ← Common (REMOVED!)
         │      └──────┬────┘
         └─────────────┘   │
                    6, 7, 8│  ← B only (ADDED!)
                           │

After SymmetricExceptWith:
Set A: { 1, 2, 3, 6, 7, 8 }  ← Exclusive items only!
```

---

### Set Operations Summary

```
Set A: { 1, 2, 3, 4, 5 }
Set B: { 4, 5, 6, 7, 8 }

╔════════════════════════════════════════════════════════════════╗
║  Operation              │  Result           │  মানে            ║
╠════════════════════════════════════════════════════════════════╣
║  UnionWith(B)           │  {1,2,3,4,5,6,7,8}│  A + B (all)     ║
║  IntersectWith(B)       │  {4, 5}           │  A ∩ B (common)  ║
║  ExceptWith(B)          │  {1, 2, 3}        │  A - B           ║
║  SymmetricExceptWith(B) │  {1,2,3,6,7,8}    │  (A-B) + (B-A)   ║
╚════════════════════════════════════════════════════════════════╝
```

---

### Real Example: Common Friends

```csharp
HashSet<string> rahimFriends = new HashSet<string>() 
{ 
    "Karim", "Jabbar", "Alam", "Salam" 
};

HashSet<string> karimFriends = new HashSet<string>() 
{ 
    "Rahim", "Jabbar", "Rafiq", "Salam" 
};

// Common friends খুঁজি
HashSet<string> commonFriends = new HashSet<string>(rahimFriends);
commonFriends.IntersectWith(karimFriends);

Console.WriteLine("Common friends:");
foreach (string friend in commonFriends)
{
    Console.WriteLine($"  - {friend}");
}
```

**Output:**
```
Common friends:
  - Jabbar
  - Salam
```

---

## Other Useful Methods

### Count - কতগুলো Item আছে?

```csharp
HashSet<int> numbers = new HashSet<int>() { 1, 2, 3, 4, 5 };

Console.WriteLine(numbers.Count);  // 5

numbers.Add(6);
Console.WriteLine(numbers.Count);  // 6

numbers.Add(3);  // Duplicate, ignored
Console.WriteLine(numbers.Count);  // 6 (unchanged)
```

---

### Clear() - সব মুছে দাও

```csharp
HashSet<int> numbers = new HashSet<int>() { 1, 2, 3, 4, 5 };

Console.WriteLine(numbers.Count);  // 5

numbers.Clear();

Console.WriteLine(numbers.Count);  // 0
```

---

### CopyTo() - Array তে Copy করো

```csharp
HashSet<string> names = new HashSet<string>() { "Rahim", "Karim", "Jabbar" };

string[] array = new string[names.Count];
names.CopyTo(array);

foreach (string name in array)
{
    Console.WriteLine(name);
}
```

---

### SetEquals() - দুইটা Set সমান কিনা?

```csharp
HashSet<int> set1 = new HashSet<int>() { 1, 2, 3 };
HashSet<int> set2 = new HashSet<int>() { 3, 2, 1 };  // Same items, different order
HashSet<int> set3 = new HashSet<int>() { 1, 2, 4 };

Console.WriteLine(set1.SetEquals(set2));  // True (same items!)
Console.WriteLine(set1.SetEquals(set3));  // False (different items)
```

**Note:** Order matter করে না, items same হলেই True!

---

### IsSubsetOf() - Subset কিনা?

**A যদি B এর subset হয়, মানে A এর সব item B তে আছে।**

```csharp
HashSet<int> small = new HashSet<int>() { 1, 2 };
HashSet<int> big = new HashSet<int>() { 1, 2, 3, 4, 5 };

Console.WriteLine(small.IsSubsetOf(big));    // True
Console.WriteLine(big.IsSubsetOf(small));    // False
```

**Visual:**

```
small: { 1, 2 }
big:   { 1, 2, 3, 4, 5 }

small ⊆ big? 
  1 আছে big এ? ✓
  2 আছে big এ? ✓
  সব আছে! → True (small is subset of big)
```

---

### IsSupersetOf() - Superset কিনা?

**IsSubsetOf() এর উল্টা।**

```csharp
HashSet<int> small = new HashSet<int>() { 1, 2 };
HashSet<int> big = new HashSet<int>() { 1, 2, 3, 4, 5 };

Console.WriteLine(big.IsSupersetOf(small));    // True
Console.WriteLine(small.IsSupersetOf(big));    // False
```

---

### Overlaps() - কোনো Common Item আছে কিনা?

```csharp
HashSet<int> set1 = new HashSet<int>() { 1, 2, 3 };
HashSet<int> set2 = new HashSet<int>() { 3, 4, 5 };
HashSet<int> set3 = new HashSet<int>() { 6, 7, 8 };

Console.WriteLine(set1.Overlaps(set2));  // True (3 common)
Console.WriteLine(set1.Overlaps(set3));  // False (nothing common)
```

---

## Complete Example ১: Unique Visitors Counter

**Website এ unique visitors count করা:**

### Full Code:

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Console.WriteLine("🌐 WEBSITE VISITOR TRACKER\n");
        Console.WriteLine("Commands: visit <username>, stats, list, exit\n");
        
        HashSet<string> todayVisitors = new HashSet<string>();
        int totalPageViews = 0;
        
        while (true)
        {
            Console.Write("> ");
            string input = Console.ReadLine();
            
            if (input == "exit")
            {
                Console.WriteLine("Tracker closed!");
                break;
            }
            else if (input.StartsWith("visit "))
            {
                string username = input.Substring(6);
                totalPageViews++;
                
                if (todayVisitors.Add(username))
                {
                    // নতুন visitor
                    Console.WriteLine($"👋 New visitor: {username}");
                    Console.WriteLine($"   Unique visitors so far: {todayVisitors.Count}");
                }
                else
                {
                    // returning visitor
                    Console.WriteLine($"👤 Returning visitor: {username}");
                    Console.WriteLine($"   (Already counted in unique visitors)");
                }
                Console.WriteLine($"   Total page views: {totalPageViews}\n");
            }
            else if (input == "stats")
            {
                Console.WriteLine("\n📊 TODAY'S STATISTICS:");
                Console.WriteLine("─────────────────────────────");
                Console.WriteLine($"  Unique Visitors: {todayVisitors.Count}");
                Console.WriteLine($"  Total Page Views: {totalPageViews}");
                
                if (todayVisitors.Count > 0)
                {
                    double avgViews = (double)totalPageViews / todayVisitors.Count;
                    Console.WriteLine($"  Avg Views/Visitor: {avgViews:F2}");
                }
                Console.WriteLine();
            }
            else if (input == "list")
            {
                if (todayVisitors.Count == 0)
                {
                    Console.WriteLine("No visitors yet!");
                }
                else
                {
                    Console.WriteLine($"\n👥 Unique Visitors ({todayVisitors.Count}):");
                    Console.WriteLine("─────────────────────────────");
                    int i = 1;
                    foreach (string visitor in todayVisitors)
                    {
                        Console.WriteLine($"  {i}. {visitor}");
                        i++;
                    }
                    Console.WriteLine();
                }
            }
            else
            {
                Console.WriteLine("Unknown command!");
            }
        }
    }
}
```

---

### Code এর প্রতিটা অংশ বুঝি:

**১. Variables:**

```csharp
HashSet<string> todayVisitors = new HashSet<string>();  // Unique visitors
int totalPageViews = 0;  // সব visits (duplicate সহ)
```

| Variable | কী রাখে |
|----------|---------|
| `todayVisitors` | Unique usernames (HashSet) |
| `totalPageViews` | Total page views (including revisits) |

---

**২. "visit" command:**

```csharp
totalPageViews++;  // সবসময় বাড়বে

if (todayVisitors.Add(username))
{
    // Add() true return করলে = নতুন visitor
    Console.WriteLine($"New visitor: {username}");
}
else
{
    // Add() false return করলে = returning visitor
    Console.WriteLine($"Returning visitor: {username}");
}
```

**HashSet.Add() এর return value দিয়েই বুঝছি নতুন কিনা!**

---

### Sample Run:

```
🌐 WEBSITE VISITOR TRACKER

Commands: visit <username>, stats, list, exit

> visit rahim
👋 New visitor: rahim
   Unique visitors so far: 1
   Total page views: 1

> visit karim
👋 New visitor: karim
   Unique visitors so far: 2
   Total page views: 2

> visit rahim
👤 Returning visitor: rahim
   (Already counted in unique visitors)
   Total page views: 3

> visit jabbar
👋 New visitor: jabbar
   Unique visitors so far: 3
   Total page views: 4

> visit rahim
👤 Returning visitor: rahim
   (Already counted in unique visitors)
   Total page views: 5

> stats

📊 TODAY'S STATISTICS:
─────────────────────────────
  Unique Visitors: 3
  Total Page Views: 5
  Avg Views/Visitor: 1.67

> list

👥 Unique Visitors (3):
─────────────────────────────
  1. rahim
  2. karim
  3. jabbar

> exit
Tracker closed!
```

---

### Visual Flow:

```
╔════════════════════════════════════════════════════════════════════╗
║                    VISITOR TRACKING FLOW                           ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  visit "rahim" (1st time)                                          ║
║  ─────────────────────────                                         ║
║  todayVisitors.Add("rahim") → True (new!)                          ║
║  HashSet: { "rahim" }                                              ║
║  pageViews: 1                                                      ║
║                                                                    ║
║  visit "karim"                                                     ║
║  ─────────────                                                     ║
║  todayVisitors.Add("karim") → True (new!)                          ║
║  HashSet: { "rahim", "karim" }                                     ║
║  pageViews: 2                                                      ║
║                                                                    ║
║  visit "rahim" (2nd time)                                          ║
║  ─────────────────────────                                         ║
║  todayVisitors.Add("rahim") → False (exists!)                      ║
║  HashSet: { "rahim", "karim" }  ← unchanged!                       ║
║  pageViews: 3  ← still increases!                                  ║
║                                                                    ║
║  visit "jabbar"                                                    ║
║  ──────────────                                                    ║
║  todayVisitors.Add("jabbar") → True (new!)                         ║
║  HashSet: { "rahim", "karim", "jabbar" }                           ║
║  pageViews: 4                                                      ║
║                                                                    ║
║  FINAL:                                                            ║
║  Unique Visitors: 3 (HashSet.Count)                                ║
║  Total Page Views: 5 (totalPageViews)                              ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## Complete Example ২: Remove Duplicates from List

**List থেকে duplicate items remove করা:**

### Full Code:

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Console.WriteLine("🔄 DUPLICATE REMOVER\n");
        
        // Original list with duplicates
        List<int> numbers = new List<int>() 
        { 
            5, 2, 8, 2, 9, 1, 5, 8, 3, 2, 7, 5, 1, 9, 4, 8 
        };
        
        Console.WriteLine("Original List:");
        Console.WriteLine($"  Items: [{string.Join(", ", numbers)}]");
        Console.WriteLine($"  Count: {numbers.Count}");
        
        // HashSet এ convert করলে duplicates automatically remove হয়ে যায়!
        HashSet<int> uniqueSet = new HashSet<int>(numbers);
        
        Console.WriteLine("\nAfter HashSet conversion:");
        Console.WriteLine($"  Items: {{{string.Join(", ", uniqueSet)}}}");
        Console.WriteLine($"  Count: {uniqueSet.Count}");
        
        // আবার List এ convert করতে চাইলে
        List<int> uniqueList = new List<int>(uniqueSet);
        
        Console.WriteLine("\nBack to List (unique only):");
        Console.WriteLine($"  Items: [{string.Join(", ", uniqueList)}]");
        Console.WriteLine($"  Count: {uniqueList.Count}");
        
        // কতগুলো duplicate ছিল?
        int duplicateCount = numbers.Count - uniqueSet.Count;
        Console.WriteLine($"\n📊 Duplicates removed: {duplicateCount}");
    }
}
```

---

### Step by Step:

```
Step 1: Original List
        [5, 2, 8, 2, 9, 1, 5, 8, 3, 2, 7, 5, 1, 9, 4, 8]
        Count = 16

Step 2: Convert to HashSet
        new HashSet<int>(numbers)
        
        HashSet internally যা করে:
        5 → Add (new)
        2 → Add (new)
        8 → Add (new)
        2 → Skip (exists!)
        9 → Add (new)
        1 → Add (new)
        5 → Skip (exists!)
        8 → Skip (exists!)
        3 → Add (new)
        2 → Skip (exists!)
        7 → Add (new)
        5 → Skip (exists!)
        1 → Skip (exists!)
        9 → Skip (exists!)
        4 → Add (new)
        8 → Skip (exists!)
        
        Result: {5, 2, 8, 9, 1, 3, 7, 4}
        Count = 8

Step 3: Convert back to List (optional)
        [5, 2, 8, 9, 1, 3, 7, 4]
        Count = 8

Duplicates removed: 16 - 8 = 8
```

---

### Output:

```
🔄 DUPLICATE REMOVER

Original List:
  Items: [5, 2, 8, 2, 9, 1, 5, 8, 3, 2, 7, 5, 1, 9, 4, 8]
  Count: 16

After HashSet conversion:
  Items: {5, 2, 8, 9, 1, 3, 7, 4}
  Count: 8

Back to List (unique only):
  Items: [5, 2, 8, 9, 1, 3, 7, 4]
  Count: 8

📊 Duplicates removed: 8
```

---

### One-liner Version:

```csharp
List<int> original = new List<int>() { 5, 2, 8, 2, 9, 1, 5, 8 };

// One line এ duplicate remove!
List<int> unique = new List<int>(new HashSet<int>(original));
```

**এটাই সবচেয়ে সহজ duplicate remove করার উপায়!**

---

## Complete Example ৩: Common Friends Finder

**দুইজনের common friends খুঁজে বের করা:**

### Full Code:

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Console.WriteLine("👥 COMMON FRIENDS FINDER\n");
        
        // সবার friends list
        Dictionary<string, HashSet<string>> friendsDatabase = 
            new Dictionary<string, HashSet<string>>()
        {
            ["Rahim"] = new HashSet<string>() { "Karim", "Jabbar", "Alam", "Salam", "Rafiq" },
            ["Karim"] = new HashSet<string>() { "Rahim", "Jabbar", "Rafiq", "Habib" },
            ["Jabbar"] = new HashSet<string>() { "Rahim", "Karim", "Alam", "Habib", "Salam" }
        };
        
        // সবার friends দেখাও
        Console.WriteLine("Friends Database:");
        Console.WriteLine("─────────────────────────────────────────────");
        foreach (var person in friendsDatabase)
        {
            Console.WriteLine($"  {person.Key}'s friends: {{{string.Join(", ", person.Value)}}}");
        }
        
        // Common friends খুঁজি
        Console.WriteLine("\n═════════════════════════════════════════════");
        
        FindCommonFriends(friendsDatabase, "Rahim", "Karim");
        FindCommonFriends(friendsDatabase, "Rahim", "Jabbar");
        FindCommonFriends(friendsDatabase, "Karim", "Jabbar");
    }
    
    static void FindCommonFriends(
        Dictionary<string, HashSet<string>> database, 
        string person1, 
        string person2)
    {
        Console.WriteLine($"\n🔍 Common friends of {person1} and {person2}:");
        
        // person1 এর friends copy করি
        HashSet<string> common = new HashSet<string>(database[person1]);
        
        // person2 এর friends এর সাথে intersect করি
        common.IntersectWith(database[person2]);
        
        // নিজেদের নাম remove করি (যদি থাকে)
        common.Remove(person1);
        common.Remove(person2);
        
        if (common.Count > 0)
        {
            Console.WriteLine($"   {{{string.Join(", ", common)}}}");
            Console.WriteLine($"   Total: {common.Count} common friend(s)");
        }
        else
        {
            Console.WriteLine("   No common friends!");
        }
    }
}
```

---

### Code এর প্রতিটা অংশ বুঝি:

**১. Database Structure:**

```csharp
Dictionary<string, HashSet<string>> friendsDatabase
```

| Key (Person) | Value (Friends HashSet) |
|--------------|-------------------------|
| "Rahim" | { "Karim", "Jabbar", "Alam", "Salam", "Rafiq" } |
| "Karim" | { "Rahim", "Jabbar", "Rafiq", "Habib" } |
| "Jabbar" | { "Rahim", "Karim", "Alam", "Habib", "Salam" } |

---

**২. FindCommonFriends Function:**

```csharp
// Step 1: person1 এর friends copy করি
HashSet<string> common = new HashSet<string>(database[person1]);

// Step 2: person2 এর friends এর সাথে intersect
common.IntersectWith(database[person2]);

// Step 3: নিজেদের remove (optional)
common.Remove(person1);
common.Remove(person2);
```

---

**৩. Visual Example (Rahim ও Karim):**

```
Rahim's friends: { Karim, Jabbar, Alam, Salam, Rafiq }
Karim's friends: { Rahim, Jabbar, Rafiq, Habib }

Step 1: Copy Rahim's friends
        common = { Karim, Jabbar, Alam, Salam, Rafiq }

Step 2: IntersectWith(Karim's friends)
        
        Karim আছে Karim's friends এ? না (নিজে নিজের friend না)
        Jabbar আছে Karim's friends এ? ✓ হ্যাঁ
        Alam আছে Karim's friends এ? না
        Salam আছে Karim's friends এ? না
        Rafiq আছে Karim's friends এ? ✓ হ্যাঁ
        
        common = { Jabbar, Rafiq }

Step 3: Remove Rahim, Karim (না থাকলে কিছু হয় না)
        common = { Jabbar, Rafiq }

Result: 2 common friends!
```

---

### Output:

```
👥 COMMON FRIENDS FINDER

Friends Database:
─────────────────────────────────────────────
  Rahim's friends: {Karim, Jabbar, Alam, Salam, Rafiq}
  Karim's friends: {Rahim, Jabbar, Rafiq, Habib}
  Jabbar's friends: {Rahim, Karim, Alam, Habib, Salam}

═════════════════════════════════════════════

🔍 Common friends of Rahim and Karim:
   {Jabbar, Rafiq}
   Total: 2 common friend(s)

🔍 Common friends of Rahim and Jabbar:
   {Karim, Alam, Salam}
   Total: 3 common friend(s)

🔍 Common friends of Karim and Jabbar:
   {Rahim, Habib}
   Total: 2 common friend(s)
```

---

## Complete Example ৪: Tag System

**Blog posts এ unique tags manage করা:**

### Full Code:

```csharp
using System;
using System.Collections.Generic;

class BlogPost
{
    public string Title;
    public HashSet<string> Tags;
    
    public BlogPost(string title)
    {
        Title = title;
        Tags = new HashSet<string>();
    }
    
    public void AddTag(string tag)
    {
        // Lowercase এ convert করি consistency এর জন্য
        string normalizedTag = tag.ToLower().Trim();
        
        if (Tags.Add(normalizedTag))
        {
            Console.WriteLine($"  ✓ Tag '{normalizedTag}' added");
        }
        else
        {
            Console.WriteLine($"  ✗ Tag '{normalizedTag}' already exists!");
        }
    }
    
    public void ShowTags()
    {
        if (Tags.Count == 0)
        {
            Console.WriteLine("  No tags");
        }
        else
        {
            Console.WriteLine($"  Tags: [{string.Join(", ", Tags)}]");
        }
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("🏷️ BLOG TAG SYSTEM\n");
        
        // নতুন post
        BlogPost post = new BlogPost("C# Collections Tutorial");
        
        Console.WriteLine($"Post: \"{post.Title}\"\n");
        
        // Tags add করি
        Console.WriteLine("Adding tags:");
        post.AddTag("Programming");
        post.AddTag("CSharp");
        post.AddTag("Tutorial");
        post.AddTag("programming");   // Duplicate! (case insensitive)
        post.AddTag("Collections");
        post.AddTag("csharp");        // Duplicate!
        post.AddTag("  tutorial  ");  // Duplicate! (with spaces)
        post.AddTag("HashSet");
        
        Console.WriteLine();
        post.ShowTags();
        
        // সব posts এর unique tags
        Console.WriteLine("\n═══════════════════════════════════════════════");
        Console.WriteLine("Finding all unique tags across posts:\n");
        
        BlogPost post1 = new BlogPost("Intro to C#");
        post1.Tags = new HashSet<string>() { "csharp", "beginner", "tutorial" };
        
        BlogPost post2 = new BlogPost("Advanced C#");
        post2.Tags = new HashSet<string>() { "csharp", "advanced", "tips" };
        
        BlogPost post3 = new BlogPost("Python Basics");
        post3.Tags = new HashSet<string>() { "python", "beginner", "tutorial" };
        
        // সব posts
        List<BlogPost> allPosts = new List<BlogPost>() { post1, post2, post3 };
        
        // সব unique tags খুঁজি
        HashSet<string> allTags = new HashSet<string>();
        
        foreach (BlogPost p in allPosts)
        {
            Console.WriteLine($"  \"{p.Title}\": [{string.Join(", ", p.Tags)}]");
            allTags.UnionWith(p.Tags);  // সব tags add করো
        }
        
        Console.WriteLine($"\n📊 All unique tags ({allTags.Count}):");
        Console.WriteLine($"   [{string.Join(", ", allTags)}]");
    }
}
```

---

### Output:

```
🏷️ BLOG TAG SYSTEM

Post: "C# Collections Tutorial"

Adding tags:
  ✓ Tag 'programming' added
  ✓ Tag 'csharp' added
  ✓ Tag 'tutorial' added
  ✗ Tag 'programming' already exists!
  ✓ Tag 'collections' added
  ✗ Tag 'csharp' already exists!
  ✗ Tag 'tutorial' already exists!
  ✓ Tag 'hashset' added

  Tags: [programming, csharp, tutorial, collections, hashset]

═══════════════════════════════════════════════
Finding all unique tags across posts:

  "Intro to C#": [csharp, beginner, tutorial]
  "Advanced C#": [csharp, advanced, tips]
  "Python Basics": [python, beginner, tutorial]

📊 All unique tags (6):
   [csharp, beginner, tutorial, advanced, tips, python]
```

---

## List vs HashSet - Complete Comparison

```
╔════════════════════════════════════════════════════════════════════════╗
║                       LIST vs HASHSET                                  ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  Feature          │  List<T>              │  HashSet<T>                ║
║  ─────────────────┼───────────────────────┼────────────────────────────║
║  Duplicates       │  ✓ Allowed            │  ✗ Not allowed             ║
║  Order            │  ✓ Maintains order    │  ✗ No order guarantee      ║
║  Index access     │  ✓ list[0], list[1]   │  ✗ Not available           ║
║  Contains()       │  O(n) - Slow          │  O(1) - Fast!              ║
║  Add()            │  O(1)                 │  O(1)                      ║
║  Remove()         │  O(n)                 │  O(1)                      ║
║  Set operations   │  ✗ Not available      │  ✓ Union, Intersect, etc.  ║
║                                                                        ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  USE LIST WHEN:                                                        ║
║  • Order matters                                                       ║
║  • Need duplicates                                                     ║
║  • Need index access (list[i])                                         ║
║  • Need to sort items                                                  ║
║                                                                        ║
║  USE HASHSET WHEN:                                                     ║
║  • Only unique items needed                                            ║
║  • Fast Contains() check                                               ║
║  • Set operations (union, intersect)                                   ║
║  • Order doesn't matter                                                ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝
```

---

## Summary - Methods এক নজরে

### Creating:

| Code | কাজ |
|------|-----|
| `new HashSet<T>()` | Empty HashSet |
| `new HashSet<T>(collection)` | Collection থেকে (duplicates removed!) |

### Main Operations:

| Method | কাজ | Returns |
|--------|-----|---------|
| `Add(item)` | Unique ভাবে add | bool (true=added, false=existed) |
| `Remove(item)` | Remove করো | bool (true=removed, false=didn't exist) |
| `Contains(item)` | আছে কিনা | bool |
| `Clear()` | সব মুছো | void |

### Set Operations:

| Method | কাজ |
|--------|-----|
| `UnionWith(other)` | A + B (all items) |
| `IntersectWith(other)` | A ∩ B (common only) |
| `ExceptWith(other)` | A - B (A exclusive) |
| `SymmetricExceptWith(other)` | (A-B) + (B-A) |

### Checking:

| Method | কাজ |
|--------|-----|
| `SetEquals(other)` | Same items কিনা |
| `IsSubsetOf(other)` | Subset কিনা |
| `IsSupersetOf(other)` | Superset কিনা |
| `Overlaps(other)` | Common item আছে কিনা |

---

## মনে রাখো

```
┌─────────────────────────────────────────────────────────────┐
│                      HASHSET<T>                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│         শুধু UNIQUE ITEMS!                                  │
│                                                             │
│    Add("Apple")  → ✓ Added                                  │
│    Add("Banana") → ✓ Added                                  │
│    Add("Apple")  → ✗ Ignored! (duplicate)                   │
│                                                             │
│    HashSet: { "Apple", "Banana" }                           │
│                                                             │
│    ────────────────────────────────────────────────         │
│                                                             │
│    🚀 Contains() → O(1) - Super Fast!                       │
│    🔄 Set Operations → Union, Intersect, Except             │
│    ✗ No Order, No Index access                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Collections Series সম্পূর্ণ!

**এই series এ যা শিখলাম:**

| Part | Collection | কাজ |
|------|------------|-----|
| Part 29 | Introduction | Collections কী |
| Part 30 | List<T> | Dynamic Array |
| Part 31 | Dictionary<K,V> | Key-Value Storage |
| Part 32 | Stack<T> | LIFO - Last In First Out |
| Part 33 | Queue<T> | FIFO - First In First Out |
| Part 34 | HashSet<T> | Unique Items Only |

**এখন তুমি সব major collections জানো!** 🎉

---

*CPS Academy - Learn. Code. Grow.*
