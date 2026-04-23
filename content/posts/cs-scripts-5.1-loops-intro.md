---
title: "Lesson 5.1: Loops Introduction — একই কাজ বারবার করানো"
date: "2026-05-07"
excerpt: "কেন Loop দরকার, Real life analogies, ৩টা essential parts, while vs for vs do-while এবং কোনটা কখন"
categories:
  - C# Course Scripts
tags:
  - csharp
  - loops
  - while
  - for
  - do-while
  - beginner
draft: false
---

# Lesson 5.1: Loops Introduction — একই কাজ বারবার করানো

> **এই Lesson এ শিখবে:** Loop কী ও কেন দরকার, Real life এ loop, Loop ছাড়া vs Loop দিয়ে, Loop এর ৩টা essential জিনিস, C# এর ৩ ধরনের loop (while, for, do-while), কোনটা কখন use করবে, এবং Loop এর power।

---

## আগের Modules এ কী শিখলাম?

- Module 2: Variables, Operators
- Module 3: User input/output
- Module 4: if-else, switch — Decision making

**কিন্তু এখনো একটা বড় সমস্যা আছে...**

---

## সমস্যাটা কী?

ধরো তুমি "Hello" লেখা ৫ বার print করতে চাও:

```csharp
Console.WriteLine("Hello");
Console.WriteLine("Hello");
Console.WriteLine("Hello");
Console.WriteLine("Hello");
Console.WriteLine("Hello");
```

৫ বার — ঠিক আছে। কিন্তু...

**১০০ বার লিখতে হলে?** 🤔
**১০,০০০ বার?** 😱
**১ থেকে ১ লাখ পর্যন্ত print?** 💀

এক এক করে লিখলে **কোডিং এর জীবন শেষ!**

---

## Solution: Loop!

Loop মানে **একই কাজ বারবার করা**। একবার লিখবে, যতবার ইচ্ছা চলবে:

```csharp
int i = 1;
while (i <= 5)
{
    Console.WriteLine("Hello");
    i++;
}
```

মাত্র ৪ লাইনে ৫ বার "Hello" print! 100 বার চাইলে শুধু `i <= 100` করে দাও।

**চাইলে ১ লাখ বার ও চলবে, কোড একই!**

---

## Real Life এ Loop

তুমি প্রতিদিনই loop দেখছো, হয়তো খেয়াল করোনি:

### 🕰️ ঘড়ির কাঁটা

প্রতি সেকেন্ডে ঘড়ির কাঁটা এক ঘর এগোয়। এটা **loop**!

```
প্রতি সেকেন্ডে → কাঁটা এক ঘর এগোও → Repeat
```

### 🎵 গানের chorus

গানের chorus বারবার আসে, তাই না? এটাও loop!

```
Verse 1 → Chorus
Verse 2 → Chorus
Verse 3 → Chorus
```

### 🏭 Factory

Factory তে প্রতিটা product একই process এ তৈরি হয়:

```
Product 1 → Check quality → Pack
Product 2 → Check quality → Pack
Product 3 → Check quality → Pack
```

### 📝 Teacher

৫০ জন student এর খাতা check করছেন:

```
Student 1 এর খাতা → marks দাও
Student 2 এর খাতা → marks দাও
...
Student 50 এর খাতা → marks দাও
```

**সব জায়গায় loop!**

---

## Loop ছাড়া vs Loop দিয়ে

### Example 1: ১ থেকে ৫ পর্যন্ত print

**Loop ছাড়া:**

```csharp
Console.WriteLine(1);
Console.WriteLine(2);
Console.WriteLine(3);
Console.WriteLine(4);
Console.WriteLine(5);
```

**Loop দিয়ে:**

```csharp
int i = 1;
while (i <= 5)
{
    Console.WriteLine(i);
    i++;
}
```

দুটোরই output:
```
1
2
3
4
5
```

**5 বারে পার্থক্য তেমন না। কিন্তু 1000 বার হলে?**

---

### Example 2: ১ থেকে ১০০ পর্যন্ত যোগ

**Loop ছাড়া — একদম impossible!**

```csharp
int sum = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 
        + 11 + 12 + 13 + 14 + 15 + ... ;  // 100 টা number!
```

কে লিখবে এতগুলো? 😵

**Loop দিয়ে — মাত্র ৭ লাইনে:**

```csharp
int sum = 0;
int i = 1;
while (i <= 100)
{
    sum += i;
    i++;
}
Console.WriteLine(sum);  // 5050
```

**Loop এর পাওয়ার এখানেই!**

---

### Example 3: ৫০ জন Student এর Average

50 জনের marks যোগ করে 50 দিয়ে ভাগ করতে হবে:

**Loop ছাড়া:** 50 টা variable, 50 টা input, 50 টা যোগ = পাগল হয়ে যাবে! 😵

**Loop দিয়ে:**

```csharp
int total = 0;
int i = 1;

while (i <= 50)
{
    Console.Write($"Student {i} এর marks: ");
    int marks = int.Parse(Console.ReadLine());
    total += marks;
    i++;
}

double average = (double)total / 50;
Console.WriteLine($"Average: {average}");
```

**একই code 50 জন, 500 জন, 5000 জনের জন্য কাজ করবে!**

---

## Loop এর ৩টা Essential জিনিস

প্রতিটা loop এ এই ৩টা জিনিস থাকতেই হবে:

### 1️⃣ শুরু (Initialization)

"কোথা থেকে শুরু করবো?"

```csharp
int i = 1;  // 1 থেকে শুরু
int count = 0;  // 0 থেকে শুরু
int number = 10;  // 10 থেকে শুরু (countdown এর জন্য)
```

### 2️⃣ শর্ত (Condition)

"কতক্ষণ চলবে?"

```csharp
i <= 100  // 100 পর্যন্ত চলবে
count < 10  // 10 এর কম যতক্ষণ
number > 0  // 0 এর বেশি যতক্ষণ
```

### 3️⃣ পরিবর্তন (Update)

"প্রতিবার কী বদলাবে?"

```csharp
i++;       // 1 বাড়াও
count += 2;  // 2 বাড়াও
number--;  // 1 কমাও
```

### এই ৩টার একটাও না থাকলে কী হবে?

- **শুরু না থাকলে:** variable undefined — Error!
- **শর্ত না থাকলে:** কতক্ষণ চলবে জানা যাবে না — Error!
- **পরিবর্তন না থাকলে:** loop কখনো শেষ হবে না — **Infinite Loop!** 😱

---

## Loop কীভাবে কাজ করে — Flowchart

```
       শুরু (Initialize)
              ↓
       শর্ত check  ◄──────┐
              ↓            │
         true? false?      │
         /       \          │
        ↓         ↓         │
      কাজ      শেষ!        │
        ↓                   │
     পরিবর্তন               │
        ↓                   │
        └───────────────────┘
```

---

## C# এ কয় ধরনের Loop?

C# এ **৩ ধরনের loop** আছে। প্রত্যেকটার আলাদা use case:

### 1. while Loop

**শর্ত true থাকলে চলতে থাকবে।**

```csharp
while (condition)
{
    // কাজ
}
```

**কখন use করবে:** কতবার চলবে **জানি না**, শর্ত দেখে চলবে।

**Example:** Password retry — সঠিক password না পাওয়া পর্যন্ত চেয়ে যাও।

### 2. for Loop

**নির্দিষ্ট সংখ্যকবার চলবে।**

```csharp
for (initialization; condition; update)
{
    // কাজ
}
```

**কখন use করবে:** কতবার চলবে **জানি** (10 বার, 100 বার, 1000 বার...)।

**Example:** ১ থেকে ১০০ পর্যন্ত print, Multiplication table।

### 3. do-while Loop

**অন্তত একবার চলবেই, তারপর শর্ত check।**

```csharp
do
{
    // কাজ
} while (condition);
```

**কখন use করবে:** কমপক্ষে **১ বার** চলতেই হবে।

**Example:** Menu system — আগে menu দেখাও, তারপর "আবার দেখতে চাও?" জিজ্ঞেস করো।

---

## কোনটা কখন Use করবো?

| Situation | Loop |
|-----------|------|
| ১ থেকে ১০০ পর্যন্ত print | **for** (কতবার জানি) |
| User ঠিক password না দেওয়া পর্যন্ত চেষ্টা | **while** (কতবার জানি না) |
| Menu দেখাও, তারপর "আবার?" জিজ্ঞেস | **do-while** (অন্তত একবার) |
| Array এর সব element print | **for** (কতবার জানি) |
| Game — যতক্ষণ player alive | **while** (কতবার জানি না) |
| Input validation — valid না পাওয়া পর্যন্ত | **do-while** (অন্তত একবার) |

### সহজ Rule:

```
🎯 কতবার চলবে জানি?  → for
❓ জানি না, শর্ত দেখে চলবে? → while
1️⃣ অন্তত একবার চলবেই? → do-while
```

---

## Loop এর Power!

Loop দিয়ে তুমি বানাতে পারবে:

- 🔢 **1 থেকে 10000 পর্যন্ত যোগ** (1 সেকেন্ডে!)
- 📋 **50 জন student এর result system** (একবার code, সবার জন্য)
- 🎮 **Game loop** — যতক্ষণ player alive
- 🔐 **Password retry system** — 3 বার chance
- ⭐ **Star patterns** — Triangle, Rectangle, Diamond
- 📊 **Multiplication tables** — যেকোনো number এর
- 🔍 **Array search** — 1000 numbers এ target খুঁজে বের করা
- 📈 **Statistics** — Average, Max, Min

**Loop ছাড়া programming এ এক পাও এগোনো যায় না!**

---

## এই Module এ কী শিখবে?

| Lesson | Topic |
|--------|-------|
| 5.1 | Introduction (এটা!) |
| 5.2 | while Loop — শর্ত true থাকলে |
| 5.3 | break ও continue — Loop control |
| 5.4 | for Loop — কতবার জানলে |
| 5.5 | do-while Loop — অন্তত ১ বার |
| 5.6 | Nested Loops ও Patterns |
| 5.7 | Practice & Assignments |

---

## Quick Recap

- **Loop = একই কাজ বারবার**
- **৩টা essential জিনিস:** শুরু + শর্ত + পরিবর্তন
- **৩ ধরনের loop:** while, for, do-while
- **একটাও part ভুলে গেলে loop ভেঙে যায়**
- **পরিবর্তন না দিলে = Infinite loop!**

**চলো শুরু করি — while loop থেকে!**

---

**পরের Lesson:** while Loop — বউ এর গল্প দিয়ে শিখবো কীভাবে brain loop চিন্তা করে!

---

*CPS Academy - Learn. Code. Grow.*
