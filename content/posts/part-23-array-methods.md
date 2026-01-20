---
title: 'Part 23: Array Methods'
date: '2026-01-20'
excerpt: 'Part 23: Array Methods - built-in array methods শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - arrays
  - methods
  - tutorial
draft: false
---

# Part 23: Array Methods (Built-in সুবিধা)

ধরো তোমাকে 100 টা নম্বর ছোট থেকে বড় সাজাতে হবে।

কীভাবে করবে? নিজে loop চালিয়ে compare করে করে সাজাবে? 😫

অনেক কাজ!

**কিন্তু জানো কি?** C# এ এসব কাজের জন্য **ready-made methods** আছে!

শুধু method call করো, কাজ হয়ে যাবে। নিজে code লেখার দরকার নেই!

আজকে এই useful methods গুলো শিখবো।

---

## Built-in Methods কী?

C# এ Array class এ অনেক method আগে থেকেই লেখা আছে। এগুলোকে বলে **Built-in Methods**।

তুমি শুধু use করবে:

```csharp
Array.MethodName(arrayName);
```

ব্যাস! কাজ হয়ে যাবে।

এটা অনেকটা মোবাইলের Calculator app এর মতো। তুমি নিজে যোগ-বিয়োগ এর logic লেখো নাই, কিন্তু use করতে পারছো!

---

## Array.Sort() - ছোট থেকে বড় সাজানো

এটা সবচেয়ে বেশি use হওয়া method!

Array এর elements কে **ascending order** এ (ছোট থেকে বড়) সাজিয়ে দেয়।

---

### Numbers Sort করা:

```csharp
int[] numbers = { 64, 25, 12, 89, 33 };

Console.WriteLine("Before Sort:");
foreach (int num in numbers)
{
    Console.Write(num + " ");
}

// Sort করো - just এক line!
Array.Sort(numbers);

Console.WriteLine("\n\nAfter Sort:");
foreach (int num in numbers)
{
    Console.Write(num + " ");
}
```

Output:
```
Before Sort:
64 25 12 89 33 

After Sort:
12 25 33 64 89
```

**আগে:** 64, 25, 12, 89, 33 (এলোমেলো)
**পরে:** 12, 25, 33, 64, 89 (ছোট থেকে বড়)

**শুধু এক line:** `Array.Sort(numbers);` - ব্যাস!

---

### কী হলো Step by Step?

```
Original: 64, 25, 12, 89, 33

Array.Sort() internally যা করে:
   - সব elements compare করে
   - ছোটগুলো আগে আনে
   - বড়গুলো পরে রাখে

Result: 12, 25, 33, 64, 89
```

তুমি নিজে এই sorting code লিখতে গেলে অনেক line লাগতো। কিন্তু C# এ ready আছে!

---

### Strings Sort করা (Alphabetically):

Numbers এ ছোট থেকে বড়, কিন্তু String এ কী হবে?

**Alphabetical order!** A থেকে Z।

```csharp
string[] names = { "Zahir", "Rahim", "Karim", "Abdul", "Babul" };

Console.WriteLine("Before Sort:");
foreach (string name in names)
{
    Console.Write(name + " ");
}

Array.Sort(names);

Console.WriteLine("\n\nAfter Sort (Alphabetically):");
foreach (string name in names)
{
    Console.Write(name + " ");
}
```

Output:
```
Before Sort:
Zahir Rahim Karim Abdul Babul 

After Sort (Alphabetically):
Abdul Babul Karim Rahim Zahir
```

A → B → K → R → Z এভাবে alphabetically সেজে গেছে!

---

### Fruits Alphabetically:

```csharp
string[] fruits = { "Mango", "Apple", "Banana", "Orange", "Grape" };

Console.WriteLine("Original order:");
foreach (string fruit in fruits)
{
    Console.WriteLine($"  • {fruit}");
}

Array.Sort(fruits);

Console.WriteLine("\nAlphabetical order:");
foreach (string fruit in fruits)
{
    Console.WriteLine($"  • {fruit}");
}
```

Output:
```
Original order:
  • Mango
  • Apple
  • Banana
  • Orange
  • Grape

Alphabetical order:
  • Apple
  • Banana
  • Grape
  • Mango
  • Orange
```

---

## Array.Reverse() - উল্টানো

এই method array কে **উল্টে দেয়** - শেষেরটা প্রথমে, প্রথমটা শেষে।

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };

Console.WriteLine("Before Reverse:");
foreach (int num in numbers)
{
    Console.Write(num + " ");
}

// উল্টাও
Array.Reverse(numbers);

Console.WriteLine("\n\nAfter Reverse:");
foreach (int num in numbers)
{
    Console.Write(num + " ");
}
```

Output:
```
Before Reverse:
1 2 3 4 5 

After Reverse:
5 4 3 2 1
```

---

### কী হলো?

```
Original:  1  2  3  4  5
           ↓  ↓  ↓  ↓  ↓
Reversed:  5  4  3  2  1

Position:  [0] [1] [2] [3] [4]

আগে:       1   2   3   4   5
পরে:       5   4   3   2   1
```

প্রতিটা element তার উল্টা position এ চলে গেছে!

---

### Sort + Reverse = বড় থেকে ছোট (Descending)!

এটা একটা **trick**!

- `Sort()` করলে ছোট থেকে বড় হয়
- তারপর `Reverse()` করলে উল্টে যায়
- মানে বড় থেকে ছোট হয়ে যায়!

```csharp
int[] marks = { 78, 92, 45, 88, 65 };

Console.WriteLine("Original:");
foreach (int mark in marks)
{
    Console.Write(mark + " ");
}

// Step 1: Sort (ছোট থেকে বড়)
Array.Sort(marks);

Console.WriteLine("\n\nAfter Sort (Ascending):");
foreach (int mark in marks)
{
    Console.Write(mark + " ");
}

// Step 2: Reverse (উল্টাও)
Array.Reverse(marks);

Console.WriteLine("\n\nAfter Reverse (Descending):");
foreach (int mark in marks)
{
    Console.Write(mark + " ");
}
```

Output:
```
Original:
78 92 45 88 65 

After Sort (Ascending):
45 65 78 88 92 

After Reverse (Descending):
92 88 78 65 45
```

**Result:** বড় থেকে ছোট! 🎉

---

### এক নজরে:

```
Sort()              →  ছোট থেকে বড় (Ascending)
Reverse()           →  উল্টানো
Sort() + Reverse()  →  বড় থেকে ছোট (Descending)
```

---

## Array.IndexOf() - কোন Index এ আছে খোঁজা

কোনো element array তে **আছে কিনা** এবং **কোন index এ আছে** জানতে এই method use করো।

```csharp
Array.IndexOf(arrayName, searchValue);
```

- পেলে → index number return করে
- না পেলে → **-1** return করে

---

### Example 1: Element খোঁজা

```csharp
string[] fruits = { "Apple", "Banana", "Mango", "Orange", "Grape" };

// "Mango" কোথায় আছে?
int index = Array.IndexOf(fruits, "Mango");
Console.WriteLine($"Mango is at index: {index}");

// "Orange" কোথায় আছে?
index = Array.IndexOf(fruits, "Orange");
Console.WriteLine($"Orange is at index: {index}");

// "Pineapple" কোথায় আছে? (নেই!)
index = Array.IndexOf(fruits, "Pineapple");
Console.WriteLine($"Pineapple is at index: {index}");
```

Output:
```
Mango is at index: 2
Orange is at index: 3
Pineapple is at index: -1
```

**-1 মানে নেই!**

---

### Visual করে দেখি:

```
fruits array:
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│  Apple  │ Banana  │  Mango  │ Orange  │  Grape  │
└─────────┴─────────┴─────────┴─────────┴─────────┘
     0         1         2         3         4

Array.IndexOf(fruits, "Mango") → 2 ✅
Array.IndexOf(fruits, "Pineapple") → -1 (নেই!)
```

---

### Example 2: Element আছে কিনা Check করা

```csharp
string[] students = { "Rahim", "Karim", "Jabbar", "Salam" };

Console.Write("Enter name to search: ");
string searchName = Console.ReadLine();

int position = Array.IndexOf(students, searchName);

if (position != -1)
{
    Console.WriteLine($"✅ '{searchName}' found at position {position + 1}");
}
else
{
    Console.WriteLine($"❌ '{searchName}' not found in the list");
}
```

**Run 1:**
```
Enter name to search: Karim
✅ 'Karim' found at position 2
```

**Run 2:**
```
Enter name to search: Rafiq
❌ 'Rafiq' not found in the list
```

---

### Example 3: Numbers এ খোঁজা

```csharp
int[] numbers = { 10, 25, 30, 45, 50, 30, 60 };

int searchNum = 30;
int index = Array.IndexOf(numbers, searchNum);

Console.WriteLine($"First occurrence of {searchNum} is at index: {index}");
```

Output:
```
First occurrence of 30 is at index: 2
```

**লক্ষ্য করো:** 30 দুইবার আছে (index 2 এবং 5)। কিন্তু IndexOf **প্রথমটার** index দেয়।

---

## Array.LastIndexOf() - শেষ Occurrence খোঁজা

একই element একাধিকবার থাকলে **শেষেরটার index** পেতে এই method use করো।

```csharp
int[] numbers = { 10, 25, 30, 45, 50, 30, 60 };

int searchNum = 30;

int firstIndex = Array.IndexOf(numbers, searchNum);
int lastIndex = Array.LastIndexOf(numbers, searchNum);

Console.WriteLine($"First occurrence of {searchNum}: index {firstIndex}");
Console.WriteLine($"Last occurrence of {searchNum}: index {lastIndex}");
```

Output:
```
First occurrence of 30: index 2
Last occurrence of 30: index 5
```

---

### Visual:

```
numbers array:
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│ 10  │ 25  │ 30  │ 45  │ 50  │ 30  │ 60  │
└─────┴─────┴─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4     5     6
               ↑                 ↑
            First              Last
           (index 2)         (index 5)
```

---

## Array.Copy() - Copy করা

এক array থেকে আরেক array তে elements copy করতে এই method use করো।

```csharp
Array.Copy(sourceArray, destinationArray, howMany);
```

- `sourceArray` - কোথা থেকে copy করবে
- `destinationArray` - কোথায় রাখবে
- `howMany` - কয়টা element copy করবে

---

### Example 1: Full Copy

```csharp
int[] source = { 10, 20, 30, 40, 50 };
int[] destination = new int[5];  // Empty array, same size

Console.WriteLine("Source array:");
foreach (int num in source)
{
    Console.Write(num + " ");
}

Console.WriteLine("\n\nDestination array (before copy):");
foreach (int num in destination)
{
    Console.Write(num + " ");  // সব 0 থাকবে
}

// Copy করো - সব 5 টা element
Array.Copy(source, destination, 5);

Console.WriteLine("\n\nDestination array (after copy):");
foreach (int num in destination)
{
    Console.Write(num + " ");
}
```

Output:
```
Source array:
10 20 30 40 50 

Destination array (before copy):
0 0 0 0 0 

Destination array (after copy):
10 20 30 40 50
```

---

### Example 2: Partial Copy (কিছু Element)

```csharp
int[] source = { 10, 20, 30, 40, 50 };
int[] destination = new int[3];  // 3 ঘরের array

// শুধু প্রথম 3 টা copy করো
Array.Copy(source, destination, 3);

Console.WriteLine("Source:");
foreach (int num in source)
{
    Console.Write(num + " ");
}

Console.WriteLine("\n\nDestination (first 3 copied):");
foreach (int num in destination)
{
    Console.Write(num + " ");
}
```

Output:
```
Source:
10 20 30 40 50 

Destination (first 3 copied):
10 20 30
```

---

### Example 3: কেন Copy দরকার?

Sort করলে original array change হয়ে যায়। যদি original রাখতে চাও:

```csharp
int[] original = { 64, 25, 12, 89, 33 };

// Copy বানাও
int[] sorted = new int[original.Length];
Array.Copy(original, sorted, original.Length);

// Copy কে sort করো
Array.Sort(sorted);

Console.WriteLine("Original (unchanged):");
foreach (int num in original)
{
    Console.Write(num + " ");
}

Console.WriteLine("\n\nSorted copy:");
foreach (int num in sorted)
{
    Console.Write(num + " ");
}
```

Output:
```
Original (unchanged):
64 25 12 89 33 

Sorted copy:
12 25 33 64 89
```

Original array safe আছে!

---

## Array.Clear() - মুছে ফেলা

Array এর নির্দিষ্ট elements মুছে **default value** করে দেয়।

```csharp
Array.Clear(array, startIndex, count);
```

- `array` - কোন array clear করবে
- `startIndex` - কোন index থেকে শুরু করবে
- `count` - কয়টা element clear করবে

**Default values:**
- int → 0
- string → null
- bool → false

---

### Example 1: মাঝের কিছু Element Clear

```csharp
int[] numbers = { 10, 20, 30, 40, 50 };

Console.WriteLine("Before Clear:");
foreach (int num in numbers)
{
    Console.Write(num + " ");
}

// Index 1 থেকে 3 টা element clear করো
Array.Clear(numbers, 1, 3);

Console.WriteLine("\n\nAfter Clear (index 1 to 3):");
foreach (int num in numbers)
{
    Console.Write(num + " ");
}
```

Output:
```
Before Clear:
10 20 30 40 50 

After Clear (index 1 to 3):
10 0 0 0 50
```

---

### Visual:

```
Before Clear:
┌─────┬─────┬─────┬─────┬─────┐
│ 10  │ 20  │ 30  │ 40  │ 50  │
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4

Array.Clear(numbers, 1, 3)
         ↓     ↓     ↓
      Clear these 3

After Clear:
┌─────┬─────┬─────┬─────┬─────┐
│ 10  │  0  │  0  │  0  │ 50  │
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4
```

---

### Example 2: String Array Clear

```csharp
string[] names = { "Rahim", "Karim", "Jabbar", "Salam" };

Console.WriteLine("Before Clear:");
foreach (string name in names)
{
    Console.Write(name + " ");
}

// সব clear করো
Array.Clear(names, 0, names.Length);

Console.WriteLine("\n\nAfter Clear (all):");
foreach (string name in names)
{
    if (name == null)
    {
        Console.Write("[null] ");
    }
    else
    {
        Console.Write(name + " ");
    }
}
```

Output:
```
Before Clear:
Rahim Karim Jabbar Salam 

After Clear (all):
[null] [null] [null] [null]
```

String clear হলে `null` হয়ে যায়।

---

## Array.Resize() - Size বদলানো

Array এর size বাড়াতে বা কমাতে এই method use করো।

```csharp
Array.Resize(ref array, newSize);
```

**⚠️ Important:** `ref` keyword দিতে হয়!

---

### Example 1: Array বড় করা

```csharp
int[] numbers = { 10, 20, 30 };

Console.WriteLine($"Original size: {numbers.Length}");
Console.Write("Elements: ");
foreach (int num in numbers)
{
    Console.Write(num + " ");
}

// Size বাড়াও 3 → 5
Array.Resize(ref numbers, 5);

Console.WriteLine($"\n\nNew size: {numbers.Length}");
Console.Write("Elements: ");
foreach (int num in numbers)
{
    Console.Write(num + " ");
}
```

Output:
```
Original size: 3
Elements: 10 20 30 

New size: 5
Elements: 10 20 30 0 0
```

নতুন ঘরগুলোতে default value (0) থাকে।

---

### Example 2: Array ছোট করা

```csharp
int[] numbers = { 10, 20, 30, 40, 50 };

Console.WriteLine($"Original size: {numbers.Length}");
Console.Write("Elements: ");
foreach (int num in numbers)
{
    Console.Write(num + " ");
}

// Size কমাও 5 → 3
Array.Resize(ref numbers, 3);

Console.WriteLine($"\n\nNew size: {numbers.Length}");
Console.Write("Elements: ");
foreach (int num in numbers)
{
    Console.Write(num + " ");
}
```

Output:
```
Original size: 5
Elements: 10 20 30 40 50 

New size: 3
Elements: 10 20 30
```

শেষের elements (40, 50) হারিয়ে গেছে!

---

### ⚠️ Resize আসলে কী করে?

**Resize নতুন array বানায়**, পুরানোটা modify করে না।

```
Original array: [10, 20, 30]

Array.Resize(ref numbers, 5);

Behind the scenes:
1. নতুন array বানাও: [_, _, _, _, _] (5 ঘর)
2. পুরানো elements copy করো: [10, 20, 30, _, _]
3. বাকিগুলো 0 দাও: [10, 20, 30, 0, 0]
4. numbers variable কে নতুন array point করাও
```

তাই Resize অনেকবার করলে performance এ সমস্যা হতে পারে। এজন্য **List** better (পরের part এ শিখবো)।

---

## Array.Exists() - আছে কিনা Check (Condition দিয়ে)

কোনো **condition** অনুযায়ী element আছে কিনা check করতে এই method use করো।

```csharp
Array.Exists(array, condition);
```

Return করে **true** বা **false**।

---

### Example 1: Fail Marks আছে কিনা

```csharp
int[] marks = { 85, 92, 45, 78, 33 };

// কোনো fail marks (40 এর নিচে) আছে কিনা?
bool hasFailed = Array.Exists(marks, mark => mark < 40);

if (hasFailed)
{
    Console.WriteLine("❌ Some students have failed!");
}
else
{
    Console.WriteLine("✅ All students passed!");
}
```

Output:
```
❌ Some students have failed!
```

33 আছে যেটা 40 এর নিচে, তাই true।

---

### Lambda Expression কী?

`mark => mark < 40` এটাকে বলে **Lambda Expression**।

এটা একটা shortcut উপায়ে condition লেখার:

```csharp
mark => mark < 40

মানে: "mark নামের প্রতিটা element এর জন্য check করো mark < 40 কিনা"
```

এটা নিয়ে পরে আরো শিখবো। আপাতত এভাবেই use করো।

---

### Example 2: বড় সংখ্যা আছে কিনা

```csharp
int[] numbers = { 12, 45, 78, 23, 56 };

// 100 এর বেশি কোনো number আছে?
bool hasLargeNumber = Array.Exists(numbers, n => n > 100);

Console.WriteLine($"Has number > 100: {hasLargeNumber}");  // False

// 50 এর বেশি কোনো number আছে?
bool hasMediumNumber = Array.Exists(numbers, n => n > 50);

Console.WriteLine($"Has number > 50: {hasMediumNumber}");  // True (78, 56)
```

Output:
```
Has number > 100: False
Has number > 50: True
```

---

### Example 3: নাম আছে কিনা

```csharp
string[] students = { "Rahim", "Karim", "Jabbar" };

// "K" দিয়ে শুরু হয় এমন নাম আছে?
bool hasKName = Array.Exists(students, name => name.StartsWith("K"));

Console.WriteLine($"Has name starting with 'K': {hasKName}");  // True (Karim)
```

Output:
```
Has name starting with 'K': True
```

---

## Array.Find() - প্রথম Match খোঁজা

Condition অনুযায়ী **প্রথম** element টা খুঁজে বের করে।

```csharp
Array.Find(array, condition);
```

- পেলে → সেই element return করে
- না পেলে → default value return করে (int এ 0, string এ null)

---

### Example 1: প্রথম Fail Marks

```csharp
int[] marks = { 85, 92, 35, 78, 28, 95 };

// প্রথম fail marks (40 এর নিচে) কোনটা?
int firstFail = Array.Find(marks, mark => mark < 40);

Console.WriteLine($"First failing mark: {firstFail}");
```

Output:
```
First failing mark: 35
```

35 এবং 28 দুইটাই fail, কিন্তু Find() প্রথমটা (35) দিলো।

---

### Example 2: প্রথম বড় সংখ্যা

```csharp
int[] numbers = { 12, 45, 78, 23, 91, 56 };

// প্রথম 50+ সংখ্যা কোনটা?
int firstLarge = Array.Find(numbers, n => n > 50);

Console.WriteLine($"First number > 50: {firstLarge}");
```

Output:
```
First number > 50: 78
```

---

### Example 3: নাম খোঁজা

```csharp
string[] names = { "Rahim", "Karim", "Kabir", "Jabbar" };

// "Ka" দিয়ে শুরু হয় এমন প্রথম নাম
string found = Array.Find(names, name => name.StartsWith("Ka"));

Console.WriteLine($"First name starting with 'Ka': {found}");
```

Output:
```
First name starting with 'Ka': Karim
```

Karim এবং Kabir দুইটাই "Ka" দিয়ে শুরু, কিন্তু প্রথমটা (Karim) পেলাম।

---

## Array.FindAll() - সব Match খোঁজা

Condition অনুযায়ী **সব** elements খুঁজে বের করে।

Return করে একটা **নতুন array** যেখানে match করা elements আছে।

---

### Example 1: সব Fail Marks

```csharp
int[] marks = { 85, 35, 92, 28, 78, 15, 95 };

// সব fail marks (40 এর নিচে)
int[] failedMarks = Array.FindAll(marks, mark => mark < 40);

Console.WriteLine("All failing marks:");
foreach (int mark in failedMarks)
{
    Console.Write(mark + " ");
}

Console.WriteLine($"\n\nTotal failed: {failedMarks.Length}");
```

Output:
```
All failing marks:
35 28 15 

Total failed: 3
```

---

### Example 2: সব জোড় সংখ্যা

```csharp
int[] numbers = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// সব even numbers (জোড়)
int[] evenNumbers = Array.FindAll(numbers, n => n % 2 == 0);

Console.WriteLine("Even numbers:");
foreach (int num in evenNumbers)
{
    Console.Write(num + " ");
}
```

Output:
```
Even numbers:
2 4 6 8 10
```

---

### Example 3: নির্দিষ্ট অক্ষর দিয়ে শুরু হওয়া নাম

```csharp
string[] students = { "Rahim", "Karim", "Rafiq", "Jabbar", "Rony", "Salam" };

// "R" দিয়ে শুরু সব নাম
string[] rNames = Array.FindAll(students, name => name.StartsWith("R"));

Console.WriteLine("Names starting with 'R':");
foreach (string name in rNames)
{
    Console.WriteLine($"  • {name}");
}
```

Output:
```
Names starting with 'R':
  • Rahim
  • Rafiq
  • Rony
```

---

## Array.FindIndex() - প্রথম Match এর Index

Find() element দেয়, FindIndex() সেই element এর **index** দেয়।

```csharp
int[] marks = { 85, 92, 35, 78, 28 };

// প্রথম fail marks এর index
int failIndex = Array.FindIndex(marks, mark => mark < 40);

Console.WriteLine($"First fail at index: {failIndex}");  // 2
Console.WriteLine($"That mark is: {marks[failIndex]}");   // 35
```

Output:
```
First fail at index: 2
That mark is: 35
```

---

## Array.FindLastIndex() - শেষ Match এর Index

শেষ match এর index পেতে:

```csharp
int[] marks = { 85, 35, 92, 28, 78, 15 };

int firstFailIndex = Array.FindIndex(marks, m => m < 40);
int lastFailIndex = Array.FindLastIndex(marks, m => m < 40);

Console.WriteLine($"First fail at index: {firstFailIndex}");  // 1 (35)
Console.WriteLine($"Last fail at index: {lastFailIndex}");    // 5 (15)
```

Output:
```
First fail at index: 1
Last fail at index: 5
```

---

## Real Example 1: Top 3 Students

```csharp
Console.WriteLine("🏆 TOP 3 STUDENTS");
Console.WriteLine("═══════════════════════════════════════\n");

string[] students = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil" };
int[] marks = { 78, 92, 65, 88, 95 };

// Copy বানাই (original নষ্ট না করতে)
string[] sortedStudents = new string[students.Length];
int[] sortedMarks = new int[marks.Length];

Array.Copy(students, sortedStudents, students.Length);
Array.Copy(marks, sortedMarks, marks.Length);

// Marks এর সাথে Students sync রেখে sort করতে হবে
// Simple bubble sort use করি
for (int i = 0; i < sortedMarks.Length - 1; i++)
{
    for (int j = 0; j < sortedMarks.Length - 1 - i; j++)
    {
        if (sortedMarks[j] < sortedMarks[j + 1])
        {
            // Marks swap
            int tempMark = sortedMarks[j];
            sortedMarks[j] = sortedMarks[j + 1];
            sortedMarks[j + 1] = tempMark;
            
            // Students ও swap
            string tempStudent = sortedStudents[j];
            sortedStudents[j] = sortedStudents[j + 1];
            sortedStudents[j + 1] = tempStudent;
        }
    }
}

// Top 3 দেখাই
Console.WriteLine("Rank   Student      Marks");
Console.WriteLine("─────────────────────────────");

string[] medals = { "🥇", "🥈", "🥉" };

for (int i = 0; i < 3; i++)
{
    Console.WriteLine($" {medals[i]}    {sortedStudents[i],-12} {sortedMarks[i]}");
}

// Statistics
Console.WriteLine("\n📊 Class Statistics:");

int total = 0;
foreach (int mark in marks)
{
    total += mark;
}
double average = (double)total / marks.Length;

int[] sortedForStats = new int[marks.Length];
Array.Copy(marks, sortedForStats, marks.Length);
Array.Sort(sortedForStats);

Console.WriteLine($"   Highest: {sortedForStats[sortedForStats.Length - 1]}");
Console.WriteLine($"   Lowest: {sortedForStats[0]}");
Console.WriteLine($"   Average: {average:F1}");
```

Output:
```
🏆 TOP 3 STUDENTS
═══════════════════════════════════════

Rank   Student      Marks
─────────────────────────────
 🥇    Jalil        95
 🥈    Karim        92
 🥉    Salam        88

📊 Class Statistics:
   Highest: 95
   Lowest: 65
   Average: 83.6
```

---

## Real Example 2: Search System

```csharp
Console.WriteLine("🔍 PRODUCT SEARCH SYSTEM");
Console.WriteLine("═══════════════════════════════════════\n");

string[] products = { "Laptop", "Mouse", "Keyboard", "Monitor", "Headphone", "Webcam" };
double[] prices = { 75000, 500, 1500, 25000, 2000, 3500 };

// সব products দেখাই
Console.WriteLine("Available Products:");
for (int i = 0; i < products.Length; i++)
{
    Console.WriteLine($"   {i + 1}. {products[i]} - {prices[i]} tk");
}

// Search করি
Console.Write("\nEnter product name to search: ");
string searchTerm = Console.ReadLine();

int index = Array.IndexOf(products, searchTerm);

if (index != -1)
{
    Console.WriteLine($"\n✅ Found!");
    Console.WriteLine($"   Product: {products[index]}");
    Console.WriteLine($"   Price: {prices[index]} tk");
    Console.WriteLine($"   Position: {index + 1}");
}
else
{
    Console.WriteLine($"\n❌ '{searchTerm}' not found!");
    
    // Similar products suggest করি
    string[] similar = Array.FindAll(products, p => p.ToLower().Contains(searchTerm.ToLower()));
    
    if (similar.Length > 0)
    {
        Console.WriteLine("\nDid you mean:");
        foreach (string p in similar)
        {
            Console.WriteLine($"   • {p}");
        }
    }
}
```

---

## Real Example 3: Marks Analysis

```csharp
Console.WriteLine("📊 MARKS ANALYSIS SYSTEM");
Console.WriteLine("═══════════════════════════════════════\n");

int[] marks = { 85, 35, 92, 28, 78, 45, 95, 38, 88, 72 };

// সব marks দেখাই
Console.Write("All marks: ");
foreach (int mark in marks)
{
    Console.Write(mark + " ");
}
Console.WriteLine("\n");

// Fail আছে কিনা check
bool hasFails = Array.Exists(marks, m => m < 40);
Console.WriteLine($"Has failing marks: {(hasFails ? "Yes ❌" : "No ✅")}");

// কয়জন fail
int[] failedMarks = Array.FindAll(marks, m => m < 40);
Console.WriteLine($"Number of fails: {failedMarks.Length}");

// Fail marks দেখাই
if (failedMarks.Length > 0)
{
    Console.Write("Failed marks: ");
    foreach (int m in failedMarks)
    {
        Console.Write(m + " ");
    }
    Console.WriteLine();
}

// A+ পেয়েছে কয়জন (90+)
int[] aPlus = Array.FindAll(marks, m => m >= 90);
Console.WriteLine($"\nA+ achievers (90+): {aPlus.Length}");

// Sort করে statistics দেখাই
int[] sorted = new int[marks.Length];
Array.Copy(marks, sorted, marks.Length);
Array.Sort(sorted);

Console.WriteLine($"\nHighest mark: {sorted[sorted.Length - 1]}");
Console.WriteLine($"Lowest mark: {sorted[0]}");

// Median
int mid = sorted.Length / 2;
double median;
if (sorted.Length % 2 == 0)
{
    median = (sorted[mid - 1] + sorted[mid]) / 2.0;
}
else
{
    median = sorted[mid];
}
Console.WriteLine($"Median: {median}");
```

Output:
```
📊 MARKS ANALYSIS SYSTEM
═══════════════════════════════════════

All marks: 85 35 92 28 78 45 95 38 88 72 

Has failing marks: Yes ❌
Number of fails: 3
Failed marks: 35 28 38 

A+ achievers (90+): 2

Highest mark: 95
Lowest mark: 28
Median: 75
```

---

## Array এর Limitation ⚠️

Array অনেক useful, কিন্তু একটা বড় সমস্যা আছে:

**Array এর size fixed!**

```csharp
// 5 জনের array
string[] students = new string[5];

students[0] = "Rahim";
students[1] = "Karim";
students[2] = "Jabbar";
students[3] = "Salam";
students[4] = "Jalil";

// এখন নতুন student এলো! কোথায় রাখবো?
students[5] = "Rafiq";  // ❌ Error! Index out of range!
```

**হ্যাঁ, Resize আছে। কিন্তু:**

```csharp
Array.Resize(ref students, 6);  // কাজ করবে
```

**সমস্যা হলো:**
- Resize আসলে **নতুন array বানায়**
- পুরানো data copy করে
- বারবার করলে **slow** হয়ে যায়

**Solution কী?**

**List!** - যেটা truly dynamic। যখন ইচ্ছা add/remove করা যায়।

**Next Part এ List শিখবো!** 🎉

---

## Summary - All Methods এক নজরে

| Method | কাজ | Example |
|--------|-----|---------|
| `Array.Sort(arr)` | ছোট থেকে বড় সাজানো | `Array.Sort(numbers);` |
| `Array.Reverse(arr)` | উল্টানো | `Array.Reverse(numbers);` |
| `Array.IndexOf(arr, item)` | প্রথম occurrence এর index | `Array.IndexOf(names, "Rahim");` |
| `Array.LastIndexOf(arr, item)` | শেষ occurrence এর index | `Array.LastIndexOf(nums, 30);` |
| `Array.Copy(src, dest, count)` | Copy করা | `Array.Copy(a, b, 5);` |
| `Array.Clear(arr, start, count)` | মুছে ফেলা (default করা) | `Array.Clear(nums, 0, 3);` |
| `Array.Resize(ref arr, newSize)` | Size বদলানো | `Array.Resize(ref nums, 10);` |
| `Array.Exists(arr, condition)` | Condition match আছে কিনা | `Array.Exists(marks, m => m < 40);` |
| `Array.Find(arr, condition)` | প্রথম match element | `Array.Find(marks, m => m < 40);` |
| `Array.FindAll(arr, condition)` | সব match elements | `Array.FindAll(marks, m => m < 40);` |
| `Array.FindIndex(arr, condition)` | প্রথম match এর index | `Array.FindIndex(marks, m => m < 40);` |
| `Array.FindLastIndex(arr, condition)` | শেষ match এর index | `Array.FindLastIndex(marks, m => m < 40);` |

---

### Tips:

- **Sort + Reverse** = বড় থেকে ছোট (Descending)
- **IndexOf returns -1** = element নেই
- **Copy** করো যদি original রাখতে চাও
- **Lambda Expression:** `x => condition` format এ লেখো

---

**মনে রাখো:**
- Built-in methods অনেক কাজ সহজ করে দেয়
- নিজে code না লিখে method call করো
- Array এর size fixed - truly dynamic এর জন্য List দরকার

---

**Next Part এ:** List শিখবো - Dynamic Array যেখানে size নিয়ে tension নেই!

---

*CPS Academy - Learn. Code. Grow.*
