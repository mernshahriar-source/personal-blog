---
title: "Lesson 6.3: Array Initialize, Length, Loop দিয়ে Traverse"
date: "2026-05-16"
excerpt: "Initialize 4 ways, Length property, Loop দিয়ে array traverse, Sum/Average/Max/Min বের করা"
categories:
  - C# Course Scripts
tags:
  - csharp
  - arrays
  - length
  - loops
draft: false
---

# Lesson 6.3: Array Initialize, Length, Loop দিয়ে Traverse

> **এই Lesson এ শিখবে:** Array initialize এর 4 ways, .Length property, Loop দিয়ে array traverse, Step by step execution, User input array, এবং Out of bounds avoid করা।

---

## Array Initialize — 4 Ways

আগের lesson এ আমরা value আলাদা আলাদা করে দিয়েছিলাম। এখন **সহজ উপায়** শিখবো।

### Way 1: আলাদা আলাদা (যেটা আগে করলাম)

```csharp
int[] marks = new int[5];
marks[0] = 85;
marks[1] = 90;
marks[2] = 78;
marks[3] = 92;
marks[4] = 88;
```

---

### Way 2: বানানোর সময়ই value দাও

```csharp
int[] marks = new int[5] { 85, 90, 78, 92, 88 };
```

এক লাইনেই হয়ে গেলো! `{ }` এর মধ্যে comma দিয়ে values।

---

### Way 3: Size না বললেও চলে

```csharp
int[] marks = new int[] { 85, 90, 78, 92, 88 };
```

C# নিজেই count করে নেবে কয়টা value আছে। এখানে 5 টা।

---

### Way 4: Shortest (এটাই সবচেয়ে বেশি use হয়!) ⭐

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
```

`new int[]` লিখতে হবে না!

**এই 4 টা exactly same array বানায়। Way 4 সবচেয়ে popular।**

---

## Different Types এর Initialize

```csharp
// String array
string[] names = { "Rahim", "Karim", "Jabbar" };

// Double array
double[] prices = { 99.99, 149.50, 199.00 };

// Bool array
bool[] attendance = { true, false, true, true, false };

// Char array
char[] grades = { 'A', 'B', 'C', 'A', 'B' };
```

---

## Array এর Length জানা

`.Length` property দিয়ে:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

Console.WriteLine("Array size: " + marks.Length);  // 5
```

### .Length কেন দরকার?

- Array size দেখতে
- Loop এ condition হিসেবে use
- শেষ index বের করতে: `marks.Length - 1`

```csharp
Console.WriteLine(marks[marks.Length - 1]);  // শেষ element (88)
```

---

## Loop দিয়ে Array Traverse — সবচেয়ে Important!

এইখানেই Array এর আসল power! 🎉

### আগে যেভাবে করতাম:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

Console.WriteLine(marks[0]);
Console.WriteLine(marks[1]);
Console.WriteLine(marks[2]);
Console.WriteLine(marks[3]);
Console.WriteLine(marks[4]);
```

5 জনের জন্য 5 লাইন। **500 জনের জন্য 500 লাইন!** 😱

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

আর সবচেয়ে মজার কথা — **500 জন student হলেও এই same 4 লাইন code**! শুধু array টা বড় হবে।

---

## Loop টা কীভাবে কাজ করে — Step by Step

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

for (int i = 0; i < marks.Length; i++)
{
    Console.WriteLine(marks[i]);
}
```

**marks.Length = 5, তাই condition: `i < 5`**

### Execution:

| i | i &lt; 5? | marks[i] | Output |
|---|--------|----------|--------|
| 0 | true ✅ | marks[0] = 85 | 85 |
| 1 | true ✅ | marks[1] = 90 | 90 |
| 2 | true ✅ | marks[2] = 78 | 78 |
| 3 | true ✅ | marks[3] = 92 | 92 |
| 4 | true ✅ | marks[4] = 88 | 88 |
| 5 | **false** ❌ | — | STOP |

**Perfect!** 0 থেকে 4 পর্যন্ত সব index cover করলো।

---

## কেন `i < marks.Length` not `i <= marks.Length`?

```csharp
// ❌ ভুল!
for (int i = 0; i <= marks.Length; i++)
{
    Console.WriteLine(marks[i]);  // i=5 এ Error!
}
```

marks.Length = 5, কিন্তু valid index: 0, 1, 2, 3, 4 (শেষ 4)।

**i=5 হলে marks[5] → IndexOutOfRangeException!** 💥

### ✅ সঠিক:

```csharp
for (int i = 0; i < marks.Length; i++)  // < (কম, সমান না)
{
    Console.WriteLine(marks[i]);
}
```

---

## Index সহ Print করা

```csharp
int[] marks = { 85, 90, 78, 92, 88 };

for (int i = 0; i < marks.Length; i++)
{
    Console.WriteLine($"Student {i + 1}: {marks[i]} marks");
}
```

Output:
```
Student 1: 85 marks
Student 2: 90 marks
Student 3: 78 marks
Student 4: 92 marks
Student 5: 88 marks
```

**`i + 1`** কারণ index 0 থেকে, কিন্তু user দেখবে Student 1 থেকে।

---

## Sum, Average বের করা

### Sum:

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
int total = 0;

for (int i = 0; i < marks.Length; i++)
{
    total += marks[i];
}

Console.WriteLine($"Total: {total}");  // 433
```

### Average:

```csharp
double average = (double)total / marks.Length;
Console.WriteLine($"Average: {average:F2}");  // 86.60
```

**`(double)` cast না করলে integer division হবে!**

---

## Max বের করা

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
int max = marks[0];  // প্রথম element কে max ধরলাম

for (int i = 1; i < marks.Length; i++)
{
    if (marks[i] > max)
    {
        max = marks[i];
    }
}

Console.WriteLine($"Highest marks: {max}");  // 92
```

**Logic:** প্রথম element কে max ধরো, তারপর সবার সাথে compare করো।

---

## Min বের করা

```csharp
int[] marks = { 85, 90, 78, 92, 88 };
int min = marks[0];

for (int i = 1; i < marks.Length; i++)
{
    if (marks[i] < min)
    {
        min = marks[i];
    }
}

Console.WriteLine($"Lowest marks: {min}");  // 78
```

---

## User Input Array

User থেকে data নিয়ে array বানাও:

```csharp
Console.Write("কয় জন student? ");
int n = int.Parse(Console.ReadLine());

int[] marks = new int[n];  // dynamic size!

for (int i = 0; i < n; i++)
{
    Console.Write($"Student {i + 1} এর marks: ");
    marks[i] = int.Parse(Console.ReadLine());
}

Console.WriteLine("\nMarks:");
for (int i = 0; i < marks.Length; i++)
{
    Console.WriteLine($"Student {i + 1}: {marks[i]}");
}
```

**Array size runtime এ ঠিক হচ্ছে — user যত চায় ততটুকু!**

---

## Common Mistakes

### ❌ Mistake 1: i &lt;= Length

```csharp
for (int i = 0; i <= marks.Length; i++)  // ❌ Exception!
for (int i = 0; i < marks.Length; i++)   // ✅
```

### ❌ Mistake 2: i = 1 থেকে শুরু

```csharp
for (int i = 1; i < marks.Length; i++)  // ❌ প্রথম element skip!
for (int i = 0; i < marks.Length; i++)  // ✅
```

### ❌ Mistake 3: Integer division

```csharp
int total = 500;
int count = 3;

double avg = total / count;          // ❌ 166 (integer division!)
double avg = (double)total / count;  // ✅ 166.666...
```

---

## Summary

**Initialize:**
```csharp
int[] marks = { 85, 90, 78, 92, 88 };  // most popular
```

**Length:**
```csharp
marks.Length  // array এ কতটা element
```

**Traverse:**
```csharp
for (int i = 0; i < marks.Length; i++)
{
    Console.WriteLine(marks[i]);
}
```

**মনে রাখো:**
- **`i < Length`**, `<=` **না**!
- Index `0` থেকে শুরু, `Length - 1` পর্যন্ত
- User input দিয়ে dynamic size array বানানো যায়
- Sum, Average, Max, Min — সব loop দিয়ে

---

**পরের Lesson:** Array এর Real Examples — Student system, দুইটা array একসাথে!

---

*CPS Academy - Learn. Code. Grow.*
