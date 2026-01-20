---
title: 'Part 20: Arrays (Introduction)'
date: '2026-01-20'
excerpt: 'Part 20: Arrays Introduction - একাধিক data একসাথে রাখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - arrays
  - tutorial
draft: true
---

# Part 20: Arrays (Introduction)

ধরো তুমি একজন teacher। তোমার class এ **5 জন student** আছে।

তুমি তাদের exam এর marks রাখতে চাও।

এখন পর্যন্ত আমরা যা শিখেছি সেটা দিয়ে করলে:

```csharp
int marks1 = 85;
int marks2 = 90;
int marks3 = 78;
int marks4 = 92;
int marks5 = 88;
```

ঠিক আছে, 5 জনের জন্য 5 টা variable বানালে। কাজ হয়ে গেছে।

---

**কিন্তু একটু চিন্তা করো...**

যদি তোমার class এ **50 জন student** থাকে? 🤔

তাহলে 50 টা variable বানাবে?

```csharp
int marks1 = 85;
int marks2 = 90;
int marks3 = 78;
int marks4 = 92;
int marks5 = 88;
int marks6 = 75;
int marks7 = 82;
// ... আরো 43 টা variable!
int marks50 = 79;
```

**আর যদি একটা school এর সব student এর marks রাখতে হয়? 500 জন? 1000 জন?** 😱

এভাবে করা তো impossible!

আর ধরো তুমি সবার marks যোগ করে average বের করতে চাও। তাহলে লিখতে হবে:

```csharp
int total = marks1 + marks2 + marks3 + marks4 + marks5 + marks6 + ... + marks500;
```

এটা তো পাগলামি! 🤯

**এই সমস্যার সমাধান হলো Array!**

---

## Array কী?

Array হলো **একই type এর অনেক data একসাথে রাখার জায়গা।**

মানে:
- একটাই নাম দেবে (যেমন `marks`)
- কিন্তু সেই নামের ভিতরে অনেকগুলো value থাকবে
- প্রতিটা value এর একটা নম্বর থাকবে (যেটাকে বলে index)

---

## Real Life এ Array বুঝি

### 🚂 Example 1: Train এর Bogies

ধরো "Subarna Express" train।

Train এর নাম একটাই - "Subarna Express"। কিন্তু এর মধ্যে অনেকগুলো bogie আছে।

```
"Subarna Express" Train:

┌─────────┬─────────┬─────────┬─────────┬─────────┐
│ Bogie 0 │ Bogie 1 │ Bogie 2 │ Bogie 3 │ Bogie 4 │
└─────────┴─────────┴─────────┴─────────┴─────────┘
```

এখন তুমি যদি কাউকে বলো "Subarna Express এর 2 নম্বর bogie তে বসো" - সে ঠিকই বুঝে যাবে কোথায় যেতে হবে।

Array ও এরকম:
- Train এর নাম = Array এর নাম
- Bogie নম্বর = Index
- প্রতিটা Bogie = Array এর একেকটা ঘর

---

### 🏠 Example 2: Apartment Building

ধরো "Green Villa" নামে একটা apartment building।

Building এর নাম একটাই - "Green Villa"। কিন্তু এর মধ্যে অনেকগুলো flat আছে।

```
"Green Villa" Apartment:

┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ Flat 101 │ Flat 102 │ Flat 103 │ Flat 104 │ Flat 105 │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

তুমি বলো "Green Villa এর 103 নম্বর flat এ যাও" - সবাই বুঝে যায়।

---

### 📦 Example 3: School এর Locker

School এ Locker Room আছে। প্রতিটা student এর জন্য একটা locker।

```
Locker Room:

┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ Locker 0 │ Locker 1 │ Locker 2 │ Locker 3 │ Locker 4 │
│  Rahim   │  Karim   │  Jabbar  │  Salam   │  Jalil   │
└──────────┴──────────┴──────────┴──────────┴──────────┘
```

Locker Room একটাই, কিন্তু ভিতরে অনেক locker। প্রতিটা locker এর একটা নম্বর আছে।

---

**Programming এ Array ও exactly এরকম!**

```
marks Array:

┌─────┬─────┬─────┬─────┬─────┐
│ 85  │ 90  │ 78  │ 92  │ 88  │
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4    ← Index (ঘরের নম্বর)
```

- Array এর নাম: `marks`
- ভিতরে 5 টা ঘর আছে
- প্রতিটা ঘরের একটা নম্বর (index) আছে: 0, 1, 2, 3, 4

---

## Array বানানো শিখি

### Step 1: বলো কী type এর array বানাবে

প্রথমে বলতে হবে array তে কী ধরনের data রাখবে।

```csharp
int[]
```

এখানে:
- `int` = integer (পূর্ণ সংখ্যা) রাখবো
- `[]` = এই square bracket বলছে "এটা array হবে, single value না"

---

### Step 2: array এর একটা নাম দাও

```csharp
int[] marks
```

এখন আমরা বললাম: "আমি একটা integer array বানাবো, যার নাম হবে marks"।

কিন্তু এখনো array টা তৈরি হয়নি! শুধু plan করলাম।

---

### Step 3: array টা তৈরি করো

```csharp
int[] marks = new int[5];
```

এখানে:
- `new` = নতুন তৈরি করো
- `int[5]` = 5 টা ঘর বিশিষ্ট integer array

**এখন array তৈরি হয়ে গেছে!**

এটা এখন দেখতে এরকম:

```
marks Array (নতুন তৈরি):

┌─────┬─────┬─────┬─────┬─────┐
│  0  │  0  │  0  │  0  │  0  │  ← সব ঘরে 0 আছে (default)
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4     ← Index
```

নতুন array বানালে সব ঘরে 0 থাকে (integer এর default value)।

---

## Index কী? (এটা খুব Important! ⚠️)

Index হলো array এর **ঘরের নম্বর।**

**কিন্তু একটা কথা মনে রাখো:**

**C# এ (এবং প্রায় সব programming language এ) index 0 থেকে শুরু হয়!**

1 থেকে না! 0 থেকে!

```
marks Array:

┌─────┬─────┬─────┬─────┬─────┐
│     │     │     │     │     │
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4     ← Index
   ↑                       ↑
 প্রথম ঘর              শেষ ঘর
(index 0)            (index 4)
```

দেখো:
- **প্রথম** ঘর = index **0** (1 না!)
- **দ্বিতীয়** ঘর = index **1**
- **তৃতীয়** ঘর = index **2**
- **চতুর্থ** ঘর = index **3**
- **পঞ্চম** ঘর = index **4** (5 না!)

**5 টা ঘর আছে, কিন্তু শেষ index হলো 4!**

### Formula মনে রাখো:

```
শেষ index = Array size - 1
```

যেমন:
- 5 টা ঘর হলে → শেষ index = 5 - 1 = 4
- 10 টা ঘর হলে → শেষ index = 10 - 1 = 9
- 100 টা ঘর হলে → শেষ index = 100 - 1 = 99

---

## কেন 0 থেকে শুরু?

তুমি হয়তো ভাবছো, "এটা তো confusing! 1 থেকে শুরু করলেই তো পারতো!"

এর পিছনে technical কারণ আছে (memory address calculation), কিন্তু এখন সেটা না জানলেও চলবে।

**শুধু মনে রাখো: Index সবসময় 0 থেকে শুরু!**

এটা শুরুতে একটু অদ্ভুত লাগবে, কিন্তু practice করলে অভ্যাস হয়ে যাবে।

---

## Array তে Value রাখা

Array তে value রাখতে index use করো।

ধরো আমরা 5 জন student এর marks রাখতে চাই:
- Student 1: 85
- Student 2: 90
- Student 3: 78
- Student 4: 92
- Student 5: 88

```csharp
int[] marks = new int[5];  // 5 ঘরের array বানালাম

marks[0] = 85;   // প্রথম ঘরে (index 0) 85 রাখো
marks[1] = 90;   // দ্বিতীয় ঘরে (index 1) 90 রাখো
marks[2] = 78;   // তৃতীয় ঘরে (index 2) 78 রাখো
marks[3] = 92;   // চতুর্থ ঘরে (index 3) 92 রাখো
marks[4] = 88;   // পঞ্চম ঘরে (index 4) 88 রাখো
```

এখন array টা দেখতে এরকম:

```
marks Array:

┌─────┬─────┬─────┬─────┬─────┐
│ 85  │ 90  │ 78  │ 92  │ 88  │
└─────┴─────┴─────┴─────┴─────┘
   0     1     2     3     4     ← Index
```

---

## Array থেকে Value বের করা

Value বের করতেও index use করো:

```csharp
Console.WriteLine(marks[0]);  // প্রথম ঘরের value print করো
Console.WriteLine(marks[2]);  // তৃতীয় ঘরের value print করো
Console.WriteLine(marks[4]);  // পঞ্চম ঘরের value print করো
```

Output:
```
85
78
88
```

---

## একটু Practice করি

```csharp
int[] marks = new int[5];

marks[0] = 85;
marks[1] = 90;
marks[2] = 78;
marks[3] = 92;
marks[4] = 88;

// Student 3 এর marks কত?
Console.WriteLine("Student 3 marks: " + marks[2]);
// কেন marks[2]? কারণ Student 3 = তৃতীয় student = index 2!

// Student 1 এর marks কত?
Console.WriteLine("Student 1 marks: " + marks[0]);
// Student 1 = প্রথম student = index 0

// শেষ student এর marks কত?
Console.WriteLine("Last student marks: " + marks[4]);
// 5 জন student, শেষ index = 5 - 1 = 4
```

Output:
```
Student 3 marks: 78
Student 1 marks: 85
Last student marks: 88
```

---

## Array Initialize করার সহজ উপায়

প্রতিবার আলাদা আলাদা করে value দেওয়া ঝামেলা। সহজ উপায় আছে!

### Way 1: আলাদা আলাদা (যেটা এতক্ষণ করলাম)

```csharp
int[] marks = new int[5];
marks[0] = 85;
marks[1] = 90;
marks[2] = 78;
marks[3] = 92;
marks[4] = 88;
```

### Way 2: বানানোর সময়ই value দাও

```csharp
int[] marks = new int[5] { 85, 90, 78, 92, 88 };
```

এক লাইনেই হয়ে গেলো! { } এর মধ্যে comma দিয়ে values লিখো।

### Way 3: Size না বললেও চলে

```csharp
int[] marks = new int[] { 85, 90, 78, 92, 88 };
```

C# নিজেই count করে নেবে কয়টা value আছে। এখানে 5 টা আছে, তাই size হবে 5।

### Way 4: আরো Short! (এটাই সবচেয়ে বেশি use হয়)

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
```

`new int[]` না লিখলেও চলে!

**এই 4 টা সবই exactly same array বানায়!** Way 4 সবচেয়ে সহজ এবং commonly used।

---

## Array এর Length জানা

Array তে কয়টা element আছে জানতে `.Length` use করো:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

Console.WriteLine("Array size: " + marks.Length);
```

Output:
```
Array size: 5
```

এটা পরে loop এ অনেক কাজে লাগবে!

---

## Loop দিয়ে Array Traverse করা

**এইখানেই Array এর আসল power!** 🎉

### আগে যেভাবে করতাম:

5 জন student এর marks print করতে:

```csharp
Console.WriteLine(marks[0]);
Console.WriteLine(marks[1]);
Console.WriteLine(marks[2]);
Console.WriteLine(marks[3]);
Console.WriteLine(marks[4]);
```

5 জনের জন্য 5 লাইন। 100 জন হলে 100 লাইন লিখতে হবে!

### Loop দিয়ে করলে:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

for (int i = 0; i < marks.Length; i++)
{
    Console.WriteLine(marks[i]);
}
```

Output:
```
85
90
78
92
88
```

**মাত্র 4 লাইনে কাজ শেষ!**

আর সবচেয়ে মজার কথা - 500 জন student হলেও এই same 4 লাইন code! শুধু array টা বড় হবে।

---

## Loop টা কীভাবে কাজ করছে? বুঝি Step by Step

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

for (int i = 0; i < marks.Length; i++)
{
    Console.WriteLine(marks[i]);
}
```

এই code টা একটু ভেঙে দেখি:

### Line 1: Array বানালাম
```csharp
int[] marks = { 85, 90, 78, 92, 88 };
```

Array টা এরকম:
```
Index:    0    1    2    3    4
Value:   85   90   78   92   88
```

### Line 2: for loop শুরু
```csharp
for (int i = 0; i < marks.Length; i++)
```

- `int i = 0` → i শুরু হচ্ছে 0 থেকে (কারণ array index 0 থেকে শুরু!)
- `i < marks.Length` → i যতক্ষণ 5 এর কম (marks.Length = 5)
- `i++` → প্রতিবার i এর মান 1 বাড়বে

### Line 3: Print করো
```csharp
Console.WriteLine(marks[i]);
```

i এর মান যা হবে, সেই index এর value print হবে।

---

### প্রতিটা Round দেখি:

**🔄 Round 1:**
```
i = 0
i < 5? → 0 < 5? → হ্যাঁ! ✅ Loop body চলবে

marks[i] = marks[0] = 85
Output: 85

i++ → i = 1
```

**🔄 Round 2:**
```
i = 1
i < 5? → 1 < 5? → হ্যাঁ! ✅ Loop body চলবে

marks[i] = marks[1] = 90
Output: 90

i++ → i = 2
```

**🔄 Round 3:**
```
i = 2
i < 5? → 2 < 5? → হ্যাঁ! ✅ Loop body চলবে

marks[i] = marks[2] = 78
Output: 78

i++ → i = 3
```

**🔄 Round 4:**
```
i = 3
i < 5? → 3 < 5? → হ্যাঁ! ✅ Loop body চলবে

marks[i] = marks[3] = 92
Output: 92

i++ → i = 4
```

**🔄 Round 5:**
```
i = 4
i < 5? → 4 < 5? → হ্যাঁ! ✅ Loop body চলবে

marks[i] = marks[4] = 88
Output: 88

i++ → i = 5
```

**🔄 Round 6:**
```
i = 5
i < 5? → 5 < 5? → না! ❌ Loop শেষ!
```

### Table আকারে:

| Round | i | i < 5? | marks[i] | Output |
|-------|---|--------|----------|--------|
| 1 | 0 | ✅ হ্যাঁ | marks[0] | 85 |
| 2 | 1 | ✅ হ্যাঁ | marks[1] | 90 |
| 3 | 2 | ✅ হ্যাঁ | marks[2] | 78 |
| 4 | 3 | ✅ হ্যাঁ | marks[3] | 92 |
| 5 | 4 | ✅ হ্যাঁ | marks[4] | 88 |
| 6 | 5 | ❌ না | - | Loop শেষ |

---

## Real Example 1: Student Marks দেখানো

এবার একটু সুন্দর করে Student দের marks দেখাই:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

Console.WriteLine("📊 STUDENT MARKS");
Console.WriteLine("─────────────────");

for (int i = 0; i < marks.Length; i++)
{
    int studentNumber = i + 1;  // Student number 1 থেকে শুরু করবো
    Console.WriteLine($"Student {studentNumber}: {marks[i]} marks");
}
```

**কী করলাম এখানে?**

- `i` শুরু হয় 0 থেকে (index এর জন্য)
- কিন্তু Student number আমরা 1 থেকে দেখাতে চাই
- তাই `studentNumber = i + 1` করলাম
- যখন i = 0, studentNumber = 0 + 1 = 1
- যখন i = 1, studentNumber = 1 + 1 = 2
- এভাবে...

Output:
```
📊 STUDENT MARKS
─────────────────
Student 1: 85 marks
Student 2: 90 marks
Student 3: 78 marks
Student 4: 92 marks
Student 5: 88 marks
```

---

## Real Example 2: দুইটা Array একসাথে Use করা

এবার student দের নাম ও আছে:

```csharp
string[] names = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil" };
int[] marks = { 85, 90, 78, 92, 88 };

Console.WriteLine("📊 STUDENT RESULTS");
Console.WriteLine("───────────────────");

for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine($"{names[i]}: {marks[i]} marks");
}
```

**কী করলাম এখানে?**

দুইটা array বানালাম:
- `names` - student দের নাম
- `marks` - তাদের marks

দুইটা array এর same index এ related data আছে:
- names[0] = "Rahim", marks[0] = 85 → Rahim এর marks 85
- names[1] = "Karim", marks[1] = 90 → Karim এর marks 90
- এভাবে...

একই loop এ দুইটা array ই access করছি।

Output:
```
📊 STUDENT RESULTS
───────────────────
Rahim: 85 marks
Karim: 90 marks
Jabbar: 78 marks
Salam: 92 marks
Jalil: 88 marks
```

---

## Real Example 3: সবার Marks যোগ করা (Sum)

সব student এর marks যোগ করে total বের করি:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

int sum = 0;  // যোগফল রাখার জন্য, শুরুতে 0

for (int i = 0; i < marks.Length; i++)
{
    sum = sum + marks[i];  // প্রতিটা marks যোগ করছি
    Console.WriteLine($"Added {marks[i]}, sum is now {sum}");
}

Console.WriteLine($"\nTotal marks: {sum}");
```

**কী করলাম এখানে?**

- `sum = 0` দিয়ে শুরু করলাম
- Loop এ প্রতিটা marks কে sum এর সাথে যোগ করছি
- Loop শেষে sum এ total আছে

**Step by step দেখি:**

| i | marks[i] | sum (আগে) | sum + marks[i] | sum (পরে) |
|---|----------|-----------|----------------|-----------|
| 0 | 85 | 0 | 0 + 85 | 85 |
| 1 | 90 | 85 | 85 + 90 | 175 |
| 2 | 78 | 175 | 175 + 78 | 253 |
| 3 | 92 | 253 | 253 + 92 | 345 |
| 4 | 88 | 345 | 345 + 88 | 433 |

Output:
```
Added 85, sum is now 85
Added 90, sum is now 175
Added 78, sum is now 253
Added 92, sum is now 345
Added 88, sum is now 433

Total marks: 433
```

---

## Real Example 4: Average বের করা

Total বের করার পর average বের করা easy:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

// Step 1: Total বের করো
int sum = 0;
for (int i = 0; i < marks.Length; i++)
{
    sum = sum + marks[i];
}

// Step 2: Average বের করো
double average = (double)sum / marks.Length;

// Step 3: Results দেখাও
Console.WriteLine($"Total marks: {sum}");
Console.WriteLine($"Number of students: {marks.Length}");
Console.WriteLine($"Average: {average}");
```

**কী করলাম এখানে?**

- Total বের করলাম (আগের example এর মতো)
- Average = Total ÷ কয়জন student
- `(double)sum` করলাম যাতে decimal এ answer আসে

Output:
```
Total marks: 433
Number of students: 5
Average: 86.6
```

---

## Real Example 5: সবচেয়ে বড় (Maximum) খোঁজা

কার marks সবচেয়ে বেশি?

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

// ধরে নিলাম প্রথম student এর marks ই সবচেয়ে বেশি
int max = marks[0];

// বাকিদের সাথে compare করি
for (int i = 1; i < marks.Length; i++)  // i = 1 থেকে শুরু (0 আগেই নিয়েছি)
{
    if (marks[i] > max)
    {
        // এই student এর marks বেশি, তাহলে max update করো
        max = marks[i];
        Console.WriteLine($"New maximum found: {max}");
    }
}

Console.WriteLine($"\nHighest marks: {max}");
```

**কী করলাম এখানে?**

**Step 1:** ধরে নিলাম প্রথম value (marks[0] = 85) সবচেয়ে বড়।

**Step 2:** বাকি সবার সাথে compare করি:
- marks[1] = 90, 90 > 85? হ্যাঁ! max = 90
- marks[2] = 78, 78 > 90? না!
- marks[3] = 92, 92 > 90? হ্যাঁ! max = 92
- marks[4] = 88, 88 > 92? না!

**Step 3:** Loop শেষে max = 92 (সবচেয়ে বড়)

Output:
```
New maximum found: 90
New maximum found: 92

Highest marks: 92
```

---

## Real Example 6: সবচেয়ে ছোট (Minimum) খোঁজা

Maximum এর মতোই, শুধু condition উল্টা:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

int min = marks[0];  // প্রথমটাকে সবচেয়ে ছোট ধরলাম

for (int i = 1; i < marks.Length; i++)
{
    if (marks[i] < min)  // < দিলাম (> এর বদলে)
    {
        min = marks[i];
        Console.WriteLine($"New minimum found: {min}");
    }
}

Console.WriteLine($"\nLowest marks: {min}");
```

Output:
```
New minimum found: 78

Lowest marks: 78
```

---

## Real Example 7: User থেকে Input নেওয়া

User কে জিজ্ঞেস করবো কয়জন student, তারপর তাদের marks নেবো:

```csharp
Console.Write("How many students? ");
int count = int.Parse(Console.ReadLine());

// count টা ঘর বিশিষ্ট array বানালাম
int[] marks = new int[count];

// প্রতিটা student এর marks নাও
Console.WriteLine("\nEnter marks for each student:");

for (int i = 0; i < count; i++)
{
    Console.Write($"Student {i + 1}: ");
    marks[i] = int.Parse(Console.ReadLine());
}

// সব marks দেখাও
Console.WriteLine("\n📋 All marks entered:");

for (int i = 0; i < marks.Length; i++)
{
    Console.WriteLine($"Student {i + 1}: {marks[i]} marks");
}
```

**কী করলাম এখানে?**

**Step 1:** User কে জিজ্ঞেস করলাম কয়জন student।

**Step 2:** সেই অনুযায়ী array বানালাম: `new int[count]`

**Step 3:** প্রথম loop এ input নিলাম। `marks[i] = int.Parse(Console.ReadLine())` দিয়ে user এর input সরাসরি array তে রাখছি।

**Step 4:** দ্বিতীয় loop এ সব marks print করলাম।

Example Run:
```
How many students? 3

Enter marks for each student:
Student 1: 85
Student 2: 90
Student 3: 78

📋 All marks entered:
Student 1: 85 marks
Student 2: 90 marks
Student 3: 78 marks
```

---

## Different Types এর Array

শুধু int না, অন্য type এর data ও array তে রাখা যায়:

### String Array (নাম, শব্দ, etc.):

```csharp
string[] names = { "Rahim", "Karim", "Jabbar", "Salam" };

Console.WriteLine("Student Names:");
for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine($"{i + 1}. {names[i]}");
}
```

Output:
```
Student Names:
1. Rahim
2. Karim
3. Jabbar
4. Salam
```

### Double Array (দশমিক সংখ্যা):

```csharp
double[] prices = { 99.99, 149.50, 299.00, 75.25 };

Console.WriteLine("Product Prices:");
for (int i = 0; i < prices.Length; i++)
{
    Console.WriteLine($"Product {i + 1}: {prices[i]} tk");
}
```

Output:
```
Product Prices:
Product 1: 99.99 tk
Product 2: 149.5 tk
Product 3: 299 tk
Product 4: 75.25 tk
```

### Bool Array (হ্যাঁ/না, Present/Absent):

```csharp
bool[] attendance = { true, true, false, true, false };
string[] names = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil" };

Console.WriteLine("Today's Attendance:");
for (int i = 0; i < attendance.Length; i++)
{
    if (attendance[i] == true)
    {
        Console.WriteLine($"{names[i]}: ✅ Present");
    }
    else
    {
        Console.WriteLine($"{names[i]}: ❌ Absent");
    }
}
```

Output:
```
Today's Attendance:
Rahim: ✅ Present
Karim: ✅ Present
Jabbar: ❌ Absent
Salam: ✅ Present
Jalil: ❌ Absent
```

---

## Common Mistakes ⚠️

### Mistake 1: Index 1 থেকে শুরু করা

অনেকে ভুলে যায় যে index 0 থেকে শুরু:

```csharp
int[] marks = { 85, 90, 78 };

// ❌ Wrong!
Console.WriteLine(marks[1]);  // এটা 90 দেবে, 85 না!
Console.WriteLine(marks[2]);  // এটা 78 দেবে
Console.WriteLine(marks[3]);  // Error! index 3 নেই!

// ✅ Correct
Console.WriteLine(marks[0]);  // 85 (প্রথম element)
Console.WriteLine(marks[1]);  // 90 (দ্বিতীয় element)
Console.WriteLine(marks[2]);  // 78 (তৃতীয় element)
```

### Mistake 2: Array size এর বাইরে যাওয়া

```csharp
int[] marks = { 85, 90, 78 };  // Size 3, index 0, 1, 2

// ❌ Wrong! index 3 নেই!
Console.WriteLine(marks[3]);  // IndexOutOfRangeException!

// ❌ Wrong! index 5 তো আরো নেই!
Console.WriteLine(marks[5]);  // IndexOutOfRangeException!
```

এই error কে বলে **IndexOutOfRangeException**।

মানে তুমি এমন index এ যেতে চাইছো যেটা exist করে না!

### Mistake 3: Loop এ <= দিয়ে চালানো

```csharp
int[] marks = { 85, 90, 78 };  // Length = 3

// ❌ Wrong!
for (int i = 0; i <= marks.Length; i++)  // i <= 3 মানে i = 3 ও চলবে!
{
    Console.WriteLine(marks[i]);  // i = 3 হলে Error!
}

// ✅ Correct
for (int i = 0; i < marks.Length; i++)  // i < 3 মানে i = 0, 1, 2
{
    Console.WriteLine(marks[i]);
}
```

**মনে রাখো:** Array loop এ সবসময় `<` use করো, `<=` না!

---

## Complete Example: Marks Analyzer

সব কিছু মিলিয়ে একটা complete program:

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║       📊 MARKS ANALYZER               ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

// Data
string[] names = { "Rahim", "Karim", "Jabbar", "Salam", "Jalil", "Rafiq", "Shafiq", "Hanif" };
int[] marks = { 85, 90, 78, 92, 88, 45, 72, 38 };

// সব marks দেখাও
Console.WriteLine("📋 All Results:");
Console.WriteLine("─────────────────────");

for (int i = 0; i < names.Length; i++)
{
    Console.WriteLine($"   {names[i]}: {marks[i]} marks");
}

// Total বের করো
int sum = 0;
for (int i = 0; i < marks.Length; i++)
{
    sum = sum + marks[i];
}

// Average বের করো
double average = (double)sum / marks.Length;

// Max এবং Min বের করো
int max = marks[0];
int min = marks[0];

for (int i = 1; i < marks.Length; i++)
{
    if (marks[i] > max)
    {
        max = marks[i];
    }
    if (marks[i] < min)
    {
        min = marks[i];
    }
}

// Pass এবং Fail count করো (40+ pass)
int passCount = 0;
int failCount = 0;

for (int i = 0; i < marks.Length; i++)
{
    if (marks[i] >= 40)
    {
        passCount++;
    }
    else
    {
        failCount++;
    }
}

// Results দেখাও
Console.WriteLine("\n📈 Analysis:");
Console.WriteLine("─────────────────────");
Console.WriteLine($"   Total Students: {marks.Length}");
Console.WriteLine($"   Total Marks: {sum}");
Console.WriteLine($"   Average: {average:F2}");
Console.WriteLine($"   Highest: {max}");
Console.WriteLine($"   Lowest: {min}");
Console.WriteLine($"   Passed (40+): {passCount}");
Console.WriteLine($"   Failed: {failCount}");
```

Output:
```
╔═══════════════════════════════════════╗
║       📊 MARKS ANALYZER               ║
╚═══════════════════════════════════════╝

📋 All Results:
─────────────────────
   Rahim: 85 marks
   Karim: 90 marks
   Jabbar: 78 marks
   Salam: 92 marks
   Jalil: 88 marks
   Rafiq: 45 marks
   Shafiq: 72 marks
   Hanif: 38 marks

📈 Analysis:
─────────────────────
   Total Students: 8
   Total Marks: 588
   Average: 73.50
   Highest: 92
   Lowest: 38
   Passed (40+): 7
   Failed: 1
```

---

## Summary

আজকে শিখলে:

| Concept | মানে |
|---------|------|
| Array | একই type এর অনেক data একসাথে রাখা |
| Index | ঘরের নম্বর (0 থেকে শুরু!) |
| Length | Array তে কয়টা element আছে |
| Traverse | Loop দিয়ে সব element ঘুরে দেখা |

**Array বানানো:**
```csharp
int[] marks = new int[5];           // 5 ঘরের খালি array
int[] marks = { 85, 90, 78, 92 };   // value সহ (shortcut)
```

**Array access করা:**
```csharp
marks[0] = 85;              // value রাখা
int x = marks[0];           // value বের করা
```

**Loop দিয়ে traverse:**
```csharp
for (int i = 0; i < marks.Length; i++)
{
    Console.WriteLine(marks[i]);
}
```

**মনে রাখো:**
- Index 0 থেকে শুরু! (1 না!)
- শেষ index = Length - 1
- Loop এ `<` use করো, `<=` না
- IndexOutOfRangeException = ভুল index!

---

*CPS Academy - Learn. Code. Grow.*
