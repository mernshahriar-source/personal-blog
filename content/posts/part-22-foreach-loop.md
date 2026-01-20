---
title: 'Part 22: foreach Loop'
date: '2026-01-20'
excerpt: 'Part 22: foreach Loop - সহজে array traverse করুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - loops
  - arrays
  - tutorial
draft: true
---

# Part 22: foreach Loop

এতক্ষণ আমরা for loop দিয়ে array traverse করেছি। কাজ হয়ে যাচ্ছে ঠিকই, কিন্তু প্রতিবার অনেক কিছু লিখতে হয়।

আজকে শিখবো আরো সহজ একটা উপায় - **foreach loop**!

---

## আগে যেভাবে করতাম

ধরো একটা array আছে এবং সব elements print করতে চাই।

for loop দিয়ে করলে:

```csharp
string[] fruits = { "Apple", "Banana", "Mango", "Orange", "Grape" };

for (int i = 0; i < fruits.Length; i++)
{
    Console.WriteLine(fruits[i]);
}
```

Output:
```
Apple
Banana
Mango
Orange
Grape
```

কাজ হয়ে যাচ্ছে।

**কিন্তু একটু খেয়াল করো, প্রতিবার কী কী লিখতে হচ্ছে:**

```csharp
for (int i = 0; i < fruits.Length; i++)
          ↑              ↑           ↑
          │              │           │
     counter        Length        counter
     বানাও          check          বাড়াও
     
    Console.WriteLine(fruits[i]);
                            ↑
                            │
                       index দিয়ে
                       access করো
```

**এতকিছু লিখতে হচ্ছে শুধু "প্রতিটা element দেখাও" এর জন্য!**

মনে মনে তুমি শুধু বলতে চাইছো: "fruits এর প্রতিটা জিনিস print করো"।

কিন্তু code এ অনেক কিছু লিখতে হচ্ছে।

**আরো সহজ উপায় নেই?** 🤔

**আছে! foreach loop!**

---

## foreach Loop কী?

foreach মানে "**for each**" = "**প্রতিটার জন্য**"।

এই loop বলে: "Array এর **প্রতিটা element** এর জন্য এই কাজটা করো।"

- Index নিয়ে মাথা ঘামাতে হয় না
- Length check করতে হয় না
- Counter বাড়াতে হয় না

**শুধু বলে দাও কী করতে চাও!**

---

## foreach দিয়ে করি

Same কাজ foreach দিয়ে:

```csharp
string[] fruits = { "Apple", "Banana", "Mango", "Orange", "Grape" };

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

Output:
```
Apple
Banana
Mango
Orange
Grape
```

**কত সহজ!** 😍

কোনো `i` নেই, কোনো `Length` নেই, কোনো `fruits[i]` নেই!

---

## পাশাপাশি দেখি

```csharp
// for loop - অনেক কিছু লিখতে হয়
for (int i = 0; i < fruits.Length; i++)
{
    Console.WriteLine(fruits[i]);
}

// foreach loop - সহজ এবং clean!
foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

দুইটার output same, কিন্তু foreach অনেক readable!

---

## foreach এর Syntax বুঝি - Part by Part

```csharp
foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

এই line টা ভেঙে দেখি:

```
foreach (string fruit in fruits)
   ↑       ↑      ↑    ↑    ↑
   │       │      │    │    │
   │       │      │    │    └── কোন array থেকে নেবো?
   │       │      │    │
   │       │      │    └── keyword (মধ্যে/থেকে)
   │       │      │
   │       │      └── প্রতিটা element কে কী নামে ডাকবো?
   │       │
   │       └── element এর type কী?
   │
   └── keyword (প্রতিটার জন্য)
```

---

### Part 1: `foreach`

এটা C# এর keyword। বলছে "প্রতিটার জন্য loop করো"।

---

### Part 2: `string`

এটা বলছে array তে কী **type** এর data আছে।

- fruits array তে string আছে, তাই `string`
- যদি int array হতো, `int` লিখতাম
- যদি double array হতো, `double` লিখতাম

---

### Part 3: `fruit`

এটা একটা **variable name** যেটা তুমি নিজে দিচ্ছো।

প্রতি round এ array এর একটা করে element এই variable এ আসবে।

নাম যা ইচ্ছা দিতে পারো:
- `fruit`
- `item`
- `f`
- `x`

তবে meaningful নাম দেওয়া ভালো।

---

### Part 4: `in`

এটাও keyword। বলছে "কোন array **থেকে** নেবো"।

বাংলায় পড়লে: "fruits **এর মধ্যে** প্রতিটা fruit..."

---

### Part 5: `fruits`

এটা array এর নাম। এই array এর elements নিয়ে কাজ হবে।

---

### Part 6: `{ }`

Loop body। এখানে কী করতে চাও লেখো।

`fruit` variable এ যে element আসবে, তা নিয়ে এখানে কাজ করবে।

---

## বাংলায় পড়ি

```csharp
foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

এটাকে বাংলায় পড়ো:

> "**fruits** array এর প্রতিটা **string** element কে **fruit** নামে ধরে, সেটা print করো"

অথবা আরো সহজে:

> "fruits এর মধ্যে যত fruit আছে, প্রতিটা print করো"

---

## foreach কীভাবে কাজ করে - Step by Step

```csharp
string[] fruits = { "Apple", "Banana", "Mango" };

foreach (string fruit in fruits)
{
    Console.WriteLine(fruit);
}
```

### Brain কীভাবে চিন্তা করে:

**শুরুতে:** Array তে কী কী আছে দেখি: Apple, Banana, Mango

**🔄 Round 1:**
```
Array থেকে প্রথম element নাও → "Apple"
fruit variable এ রাখো → fruit = "Apple"
Loop body চালাও → Console.WriteLine(fruit)
Output: Apple
```

**🔄 Round 2:**
```
Array থেকে পরের element নাও → "Banana"
fruit variable এ রাখো → fruit = "Banana"
Loop body চালাও → Console.WriteLine(fruit)
Output: Banana
```

**🔄 Round 3:**
```
Array থেকে পরের element নাও → "Mango"
fruit variable এ রাখো → fruit = "Mango"
Loop body চালাও → Console.WriteLine(fruit)
Output: Mango
```

**🔄 Round 4:**
```
Array তে আর element নেই!
Loop শেষ!
```

---

### Table আকারে:

| Round | fruit এর মান | কী হলো |
|-------|-------------|--------|
| 1 | "Apple" | Print: Apple |
| 2 | "Banana" | Print: Banana |
| 3 | "Mango" | Print: Mango |
| 4 | - | Array শেষ, Loop শেষ |

---

## Different Types এর Array তে foreach

### Integer Array:

```csharp
int[] numbers = { 10, 20, 30, 40, 50 };

foreach (int num in numbers)
{
    Console.WriteLine(num);
}
```

Output:
```
10
20
30
40
50
```

`int num` লিখেছি কারণ array তে **int** আছে।

---

### Double Array:

```csharp
double[] prices = { 99.99, 149.50, 299.00 };

foreach (double price in prices)
{
    Console.WriteLine($"Price: {price} tk");
}
```

Output:
```
Price: 99.99 tk
Price: 149.5 tk
Price: 299 tk
```

`double price` লিখেছি কারণ array তে **double** আছে।

---

### Boolean Array:

```csharp
bool[] attendance = { true, false, true, true, false };
int studentNum = 1;

foreach (bool present in attendance)
{
    if (present)
    {
        Console.WriteLine($"Student {studentNum}: Present ✅");
    }
    else
    {
        Console.WriteLine($"Student {studentNum}: Absent ❌");
    }
    studentNum++;
}
```

Output:
```
Student 1: Present ✅
Student 2: Absent ❌
Student 3: Present ✅
Student 4: Present ✅
Student 5: Absent ❌
```

---

## for vs foreach - Detail Comparison

### Example 1: সব Elements Print করা

**for loop:**
```csharp
string[] names = { "Rahim", "Karim", "Jabbar" };

for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine(names[i]);
}
```

**foreach loop:**
```csharp
string[] names = { "Rahim", "Karim", "Jabbar" };

foreach (string name in names)
{
    Console.WriteLine(name);
}
```

**Output দুইটাই same!** কিন্তু foreach অনেক clean এবং পড়তে সহজ।

---

### Example 2: Sum বের করা

**for loop:**
```csharp
int[] marks = { 85, 90, 78, 92, 88 };
int sum = 0;

for (int i = 0; i < marks.Length; i++)
{
    sum = sum + marks[i];
}

Console.WriteLine($"Total: {sum}");
```

**foreach loop:**
```csharp
int[] marks = { 85, 90, 78, 92, 88 };
int sum = 0;

foreach (int mark in marks)
{
    sum = sum + mark;
}

Console.WriteLine($"Total: {sum}");
```

Output: `Total: 433`

foreach এ `marks[i]` এর বদলে সরাসরি `mark` লিখলেই হচ্ছে!

---

### Example 3: Maximum খোঁজা

**for loop:**
```csharp
int[] numbers = { 45, 78, 23, 99, 56 };
int max = numbers[0];

for (int i = 1; i < numbers.Length; i++)
{
    if (numbers[i] > max)
    {
        max = numbers[i];
    }
}

Console.WriteLine($"Maximum: {max}");
```

**foreach loop:**
```csharp
int[] numbers = { 45, 78, 23, 99, 56 };
int max = numbers[0];

foreach (int num in numbers)
{
    if (num > max)
    {
        max = num;
    }
}

Console.WriteLine($"Maximum: {max}");
```

Output: `Maximum: 99`

---

### Example 4: Search করা

**for loop:**
```csharp
string[] students = { "Rahim", "Karim", "Jabbar", "Salam" };
string searchFor = "Jabbar";
bool found = false;

for (int i = 0; i < students.Length; i++)
{
    if (students[i] == searchFor)
    {
        found = true;
        Console.WriteLine($"Found at index {i}");
        break;
    }
}

if (!found)
{
    Console.WriteLine("Not found");
}
```

**foreach loop:**
```csharp
string[] students = { "Rahim", "Karim", "Jabbar", "Salam" };
string searchFor = "Jabbar";
bool found = false;

foreach (string student in students)
{
    if (student == searchFor)
    {
        found = true;
        Console.WriteLine($"Found: {student}");
        break;
    }
}

if (!found)
{
    Console.WriteLine("Not found");
}
```

**লক্ষ্য করো:** foreach এ index জানা যাচ্ছে না। শুধু element পাচ্ছি।

---

## কোনটা কখন Use করবো?

| Situation | কোনটা ভালো | কেন |
|-----------|-----------|-----|
| শুধু elements পড়তে/দেখতে চাই | **foreach** ✅ | সহজ, clean, readable |
| Index নম্বর জানা দরকার | **for** ✅ | foreach এ index নেই |
| Element এর value change করতে চাই | **for** ✅ | foreach এ modify করা যায় না |
| উল্টা দিক থেকে যেতে চাই (শেষ থেকে প্রথম) | **for** ✅ | foreach শুধু সামনে যায় |
| নির্দিষ্ট কিছু elements নিতে চাই | **for** ✅ | foreach সব elements নেয় |
| Every 2nd/3rd element নিতে চাই | **for** ✅ | foreach এ skip করা যায় না |

---

### সহজ নিয়ম:

```
                    শুধু পড়তে চাও?
                          │
              ┌───────────┴───────────┐
              │                       │
            হ্যাঁ                      না
              │                       │
              ▼                       ▼
         foreach ✅              for ✅
```

**অর্থাৎ:**
- শুধু পড়তে চাইলে → **foreach** (সহজ!)
- অন্য কিছু করতে চাইলে → **for** (powerful!)

---

## foreach এর Limitations (সীমাবদ্ধতা)

foreach সহজ, কিন্তু কিছু জিনিস করা যায় না:

### Limitation 1: Index জানা যায় না

```csharp
string[] names = { "Rahim", "Karim", "Jabbar" };

// foreach এ index জানার কোনো উপায় নেই!
foreach (string name in names)
{
    // "Rahim" টা কত নম্বরে আছে? জানি না! 😕
    Console.WriteLine(name);
}
```

**যদি "1. Rahim, 2. Karim" এভাবে print করতে চাও:**

```csharp
// ❌ foreach এ সরাসরি index নেই

// ✅ for দিয়ে করতে হবে
for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine($"{i + 1}. {names[i]}");
}
```

Output:
```
1. Rahim
2. Karim
3. Jabbar
```

**অথবা আলাদা counter রাখতে পারো:**

```csharp
// foreach এ আলাদা counter রেখে
int count = 1;
foreach (string name in names)
{
    Console.WriteLine($"{count}. {name}");
    count++;
}
```

---

### Limitation 2: Element Modify করা যায় না

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

// ❌ এটা কাজ করবে না!
foreach (int num in numbers)
{
    num = num * 2;  // Error! Cannot assign to 'num'
}
```

Error message: "Cannot assign to 'num' because it is a 'foreach iteration variable'"

**foreach এ যে variable পাও (num), সেটা read-only।** Change করতে পারবে না।

```csharp
// ✅ for দিয়ে করতে হবে
for (int i = 0; i < numbers.Length; i++)
{
    numbers[i] = numbers[i] * 2;  // এটা কাজ করবে!
}
```

---

### Limitation 3: উল্টা দিকে যাওয়া যায় না

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

// foreach সবসময় প্রথম থেকে শেষে যায়
foreach (int num in numbers)
{
    Console.Write(num + " ");  // 1 2 3 4 5
}
Console.WriteLine();

// উল্টা করতে for লাগবে
for (int i = numbers.Length - 1; i >= 0; i--)
{
    Console.Write(numbers[i] + " ");  // 5 4 3 2 1
}
```

Output:
```
1 2 3 4 5 
5 4 3 2 1
```

---

### Limitation 4: Skip করা যায় না (প্রতি 2nd/3rd element)

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// foreach এ সব elements যাবে, skip করার উপায় নেই
foreach (int num in numbers)
{
    Console.Write(num + " ");  // 1 2 3 4 5 6 7 8 9 10
}
Console.WriteLine();

// প্রতি 2nd element (জোড়) নিতে for লাগবে
for (int i = 1; i < numbers.Length; i += 2)
{
    Console.Write(numbers[i] + " ");  // 2 4 6 8 10
}
```

Output:
```
1 2 3 4 5 6 7 8 9 10 
2 4 6 8 10
```

---

### Limitation 5: মাঝখান থেকে শুরু করা যায় না

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// foreach সবসময় শুরু থেকে যায়

// Index 5 থেকে শুরু করতে for লাগবে
for (int i = 5; i < numbers.Length; i++)
{
    Console.Write(numbers[i] + " ");  // 6 7 8 9 10
}
```

---

## Nested foreach Loop (2D Array তে)

2D Array তেও foreach কাজ করে! দুইটা উপায় আছে:

### Way 1: Simple foreach (Flat করে দেয়)

```csharp
int[,] matrix =
{
    { 1, 2, 3 },
    { 4, 5, 6 },
    { 7, 8, 9 }
};

// foreach সব elements একের পর এক নেয় (row-column হারায়)
foreach (int num in matrix)
{
    Console.Write(num + " ");
}
```

Output:
```
1 2 3 4 5 6 7 8 9
```

**সমস্যা:** Row-Column structure হারিয়ে যাচ্ছে। সব একই line এ।

---

### Way 2: Jagged Array তে Nested foreach

**Jagged Array কী?**

Jagged Array হলো "array of arrays" - মানে একটা array এর ভিতরে আরো array।

```csharp
// Jagged Array বানানো (array of arrays)
int[][] jaggedArray = new int[3][];
jaggedArray[0] = new int[] { 1, 2, 3 };
jaggedArray[1] = new int[] { 4, 5, 6 };
jaggedArray[2] = new int[] { 7, 8, 9 };

// Nested foreach দিয়ে traverse
foreach (int[] row in jaggedArray)
{
    foreach (int num in row)
    {
        Console.Write(num + " ");
    }
    Console.WriteLine();  // প্রতি row এর পর new line
}
```

Output:
```
1 2 3 
4 5 6 
7 8 9 
```

**এবার Row-Column structure ঠিক আছে!**

---

### Nested foreach বুঝি Step by Step

```csharp
int[][] matrix = new int[2][];
matrix[0] = new int[] { 1, 2 };
matrix[1] = new int[] { 3, 4 };

foreach (int[] row in matrix)      // Outer foreach
{
    foreach (int num in row)       // Inner foreach
    {
        Console.Write(num + " ");
    }
    Console.WriteLine();
}
```

**🔄 Outer foreach Round 1:**
```
row = matrix[0] = { 1, 2 }

    🔄 Inner foreach Round 1:
        num = 1
        Print: 1
        
    🔄 Inner foreach Round 2:
        num = 2
        Print: 2
        
    Inner foreach শেষ
    
Console.WriteLine() → New Line
```

**Output so far:** `1 2` ↵

**🔄 Outer foreach Round 2:**
```
row = matrix[1] = { 3, 4 }

    🔄 Inner foreach Round 1:
        num = 3
        Print: 3
        
    🔄 Inner foreach Round 2:
        num = 4
        Print: 4
        
    Inner foreach শেষ
    
Console.WriteLine() → New Line
```

**Final Output:**
```
1 2 
3 4
```

---

### Table আকারে:

| Outer (row) | Inner (num) | Output |
|-------------|-------------|--------|
| {1, 2} | 1 | 1 |
| {1, 2} | 2 | 2 |
| - | - | New Line |
| {3, 4} | 3 | 3 |
| {3, 4} | 4 | 4 |
| - | - | New Line |

---

## Real Example 1: Student Results দেখানো

```csharp
Console.WriteLine("📊 STUDENT RESULTS");
Console.WriteLine("═══════════════════════════════════════\n");

string[] students = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil" };
int[] marks = { 85, 92, 78, 88, 70 };

// foreach দিয়ে names print
Console.WriteLine("📋 Students in class:");
foreach (string student in students)
{
    Console.WriteLine($"   • {student}");
}

// Sum বের করি foreach দিয়ে
int total = 0;
foreach (int mark in marks)
{
    total = total + mark;
}
double average = (double)total / marks.Length;

Console.WriteLine($"\n📈 Total Marks: {total}");
Console.WriteLine($"📊 Class Average: {average:F1}");

// Pass/Fail count করি foreach দিয়ে
int passCount = 0;
int failCount = 0;

foreach (int mark in marks)
{
    if (mark >= 40)
    {
        passCount++;
    }
    else
    {
        failCount++;
    }
}

Console.WriteLine($"\n✅ Passed: {passCount}");
Console.WriteLine($"❌ Failed: {failCount}");
```

Output:
```
📊 STUDENT RESULTS
═══════════════════════════════════════

📋 Students in class:
   • Rahim
   • Karim
   • Jabbar
   • Salam
   • Jalil

📈 Total Marks: 413
📊 Class Average: 82.6

✅ Passed: 5
❌ Failed: 0
```

---

## Real Example 2: Shopping Cart

```csharp
Console.WriteLine("🛒 SHOPPING CART");
Console.WriteLine("═══════════════════════════════════════\n");

string[] items = { "Shirt", "Pants", "Shoes", "Watch", "Belt" };
double[] prices = { 850.00, 1200.00, 2500.00, 3500.00, 450.00 };

// Items দেখাই foreach দিয়ে
Console.WriteLine("Items in your cart:");
Console.WriteLine("─────────────────────────");

foreach (string item in items)
{
    Console.WriteLine($"   📦 {item}");
}

// Total calculate করি foreach দিয়ে
double total = 0;
foreach (double price in prices)
{
    total = total + price;
}

Console.WriteLine("─────────────────────────");
Console.WriteLine($"💰 Subtotal: {total} tk");

// Discount
if (total > 5000)
{
    double discount = total * 0.10;  // 10% discount
    Console.WriteLine($"🎁 Discount (10%): -{discount} tk");
    Console.WriteLine($"💳 Total: {total - discount} tk");
}
else
{
    Console.WriteLine($"💳 Total: {total} tk");
}
```

Output:
```
🛒 SHOPPING CART
═══════════════════════════════════════

Items in your cart:
─────────────────────────
   📦 Shirt
   📦 Pants
   📦 Shoes
   📦 Watch
   📦 Belt
─────────────────────────
💰 Subtotal: 8500 tk
🎁 Discount (10%): -850 tk
💳 Total: 7650 tk
```

---

## Real Example 3: Word Analyzer

```csharp
Console.WriteLine("📝 WORD ANALYZER");
Console.WriteLine("═══════════════════════════════════════\n");

string[] words = { "apple", "banana", "apple", "cherry", "banana", "apple", "date" };

// সব words দেখাই
Console.Write("Words: ");
foreach (string word in words)
{
    Console.Write(word + " ");
}
Console.WriteLine("\n");

// Specific word কতবার আছে count করি
string searchWord = "apple";
int count = 0;

foreach (string word in words)
{
    if (word == searchWord)
    {
        count++;
    }
}
Console.WriteLine($"🔍 '{searchWord}' appears {count} times");

// সবচেয়ে লম্বা word খুঁজি
string longestWord = words[0];

foreach (string word in words)
{
    if (word.Length > longestWord.Length)
    {
        longestWord = word;
    }
}
Console.WriteLine($"📏 Longest word: '{longestWord}' ({longestWord.Length} letters)");

// সবচেয়ে ছোট word খুঁজি
string shortestWord = words[0];

foreach (string word in words)
{
    if (word.Length < shortestWord.Length)
    {
        shortestWord = word;
    }
}
Console.WriteLine($"📐 Shortest word: '{shortestWord}' ({shortestWord.Length} letters)");
```

Output:
```
📝 WORD ANALYZER
═══════════════════════════════════════

Words: apple banana apple cherry banana apple date 

🔍 'apple' appears 3 times
📏 Longest word: 'banana' (6 letters)
📐 Shortest word: 'date' (4 letters)
```

---

## Real Example 4: Nested foreach - Class Schedule

```csharp
Console.WriteLine("📅 WEEKLY CLASS SCHEDULE");
Console.WriteLine("═══════════════════════════════════════\n");

// Jagged array - প্রতিদিনের classes আলাদা
string[][] schedule = new string[5][];

schedule[0] = new string[] { "Math", "English", "Physics" };           // Saturday
schedule[1] = new string[] { "Chemistry", "Biology" };                 // Sunday
schedule[2] = new string[] { "Math", "Computer", "English", "Art" };   // Monday
schedule[3] = new string[] { "Physics", "Chemistry" };                 // Tuesday
schedule[4] = new string[] { "Biology", "Math", "English" };           // Wednesday

string[] days = { "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday" };

int dayIndex = 0;

foreach (string[] dayClasses in schedule)
{
    Console.WriteLine($"📆 {days[dayIndex]}:");
    
    int classNum = 1;
    foreach (string className in dayClasses)
    {
        Console.WriteLine($"   {classNum}. {className}");
        classNum++;
    }
    
    Console.WriteLine();
    dayIndex++;
}

// Total classes count করি
int totalClasses = 0;
foreach (string[] dayClasses in schedule)
{
    foreach (string className in dayClasses)
    {
        totalClasses++;
    }
}

Console.WriteLine($"📊 Total classes per week: {totalClasses}");
```

Output:
```
📅 WEEKLY CLASS SCHEDULE
═══════════════════════════════════════

📆 Saturday:
   1. Math
   2. English
   3. Physics

📆 Sunday:
   1. Chemistry
   2. Biology

📆 Monday:
   1. Math
   2. Computer
   3. English
   4. Art

📆 Tuesday:
   1. Physics
   2. Chemistry

📆 Wednesday:
   1. Biology
   2. Math
   3. English

📊 Total classes per week: 14
```

---

## Complete Example: Attendance System

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║      📋 ATTENDANCE SYSTEM             ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

string[] students = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil" };
bool[] attendance = { true, true, false, true, false };

// Attendance দেখাই
Console.WriteLine("Today's Attendance:");
Console.WriteLine("─────────────────────────────");

int index = 0;
foreach (string student in students)
{
    if (attendance[index])
    {
        Console.WriteLine($"   {student,-10} : ✅ Present");
    }
    else
    {
        Console.WriteLine($"   {student,-10} : ❌ Absent");
    }
    index++;
}

Console.WriteLine("─────────────────────────────");

// Present count foreach দিয়ে
int presentCount = 0;
foreach (bool present in attendance)
{
    if (present)
    {
        presentCount++;
    }
}

int absentCount = students.Length - presentCount;
double attendanceRate = (double)presentCount / students.Length * 100;

Console.WriteLine($"\n📊 Summary:");
Console.WriteLine($"   Total Students: {students.Length}");
Console.WriteLine($"   Present: {presentCount}");
Console.WriteLine($"   Absent: {absentCount}");
Console.WriteLine($"   Attendance Rate: {attendanceRate:F1}%");

// Absent দের নাম দেখাই
Console.WriteLine($"\n⚠️ Absent students:");
index = 0;
foreach (string student in students)
{
    if (!attendance[index])
    {
        Console.WriteLine($"   • {student}");
    }
    index++;
}
```

Output:
```
╔═══════════════════════════════════════╗
║      📋 ATTENDANCE SYSTEM             ║
╚═══════════════════════════════════════╝

Today's Attendance:
─────────────────────────────
   Rahim      : ✅ Present
   Karim      : ✅ Present
   Jabbar     : ❌ Absent
   Salam      : ✅ Present
   Jalil      : ❌ Absent
─────────────────────────────

📊 Summary:
   Total Students: 5
   Present: 3
   Absent: 2
   Attendance Rate: 60.0%

⚠️ Absent students:
   • Jabbar
   • Jalil
```

---

## Summary

আজকে শিখলে:

| Concept | মানে |
|---------|------|
| foreach | প্রতিটা element এর জন্য কাজ করো |
| syntax | `foreach (type item in array)` |
| Index নেই | foreach এ index জানা যায় না |
| Read-only | Element modify করা যায় না |
| Nested foreach | Jagged array তে ব্যবহার করা যায় |

---

### foreach Syntax:

```csharp
foreach (dataType variableName in arrayName)
{
    // variableName দিয়ে কাজ করো
}
```

---

### foreach vs for:

| foreach ভালো যখন | for ভালো যখন |
|-----------------|-------------|
| শুধু পড়তে চাই | Index দরকার |
| Code clean রাখতে চাই | Element modify করতে চাই |
| সব elements লাগবে | উল্টা যেতে চাই |
| | নির্দিষ্ট কিছু elements লাগবে |

---

### মনে রাখো:

- foreach সহজ এবং readable
- কিন্তু limited - index নেই, modify করা যায় না
- Nested foreach এ Jagged Array (`[][]`) ভালো কাজ করে
- শুধু পড়তে চাইলে foreach, বাকি সব for!

---

**Next Part এ:** Array এর Built-in Methods শিখবো (Sort, Reverse, IndexOf, etc.)

---

*CPS Academy - Learn. Code. Grow.*
