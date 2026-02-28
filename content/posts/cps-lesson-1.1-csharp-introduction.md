---
title: "Lesson 1.1: C# কী এবং কেন শিখবে?"
date: "2026-03-01"
excerpt: "C# কী, কে বানিয়েছে, কী কী বানানো যায়, অন্য language এর সাথে তুলনা, job market ও career prospects"
categories:
  - CPS Academy C# Course
tags:
  - csharp
  - dotnet
  - introduction
  - basics
  - getting-started
draft: false
---


> **এই Lesson এ শিখবে:** C# কী, কে বানিয়েছে, কী কী বানানো যায়, অন্য language এর সাথে তুলনা, job market ও career prospects।

---

## C# কী?

C# (উচ্চারণ: "সি শার্প") হলো Microsoft এর বানানো একটা programming language। ২০০০ সালে Anders Hejlsberg এই language টা design করেন। উনি আবার TypeScript এরও creator।

সোজা কথায় বললে — C# হলো Java আর C++ এর ভালো জিনিসগুলো নিয়ে বানানো একটা modern language, যেটা লিখতে অনেক comfortable।

তোমার প্রথম C# code দেখো:

```csharp
Console.WriteLine("Hello, CPS Academy!");
```

ব্যস, এইটুকুই। কোনো class-method এর ঝামেলা নেই। .NET 6 থেকে এভাবে simple করে লেখা যায়।

---

## C# দিয়ে কী কী বানানো যায়?

এইখানে C# এর আসল মজা। তুমি প্রায় সব ধরনের software বানাতে পারবে:

### ১. Web Development

ASP.NET Core দিয়ে web application আর REST API বানানো যায়। Stack Overflow, GoDaddy — এরা সবাই C# ব্যবহার করে।

```csharp
// একটা simple API endpoint
[HttpGet("hello")]
public string SayHello() => "Hello from C#!";
```

### ২. Desktop Apps

Windows application বানাতে চাইলে C# best option। WPF, WinForms, অথবা নতুন MAUI দিয়ে cross-platform desktop app ও বানানো যায়।

### ৩. Game Development

Unity engine এ C# ব্যবহার হয়। Pokémon Go, Among Us, Cuphead — এগুলো সব Unity তে বানানো।

```csharp
// Unity তে player move করানো
void Update()
{
    float move = Input.GetAxis("Horizontal");
    transform.Translate(move * speed * Time.deltaTime, 0, 0);
}
```

### ৪. Mobile Apps

.NET MAUI দিয়ে single codebase থেকে Android আর iOS দুইটার জন্যই app বানানো যায়।

### ৫. Cloud & Enterprise

বড় বড় company তে enterprise software আর cloud services এ C# অনেক popular। Azure এর সাথে integration ও smooth।

---

## C# vs Other Languages

### C# vs Java

দুইটা অনেক similar। তবে কিছু difference আছে:

```csharp
// C# - Property এক লাইনে হয়ে যায়
public string Name { get; set; }
```

```java
// Java - getter/setter আলাদা করে লিখতে হয়
private String name;
public String getName() { return name; }
public void setName(String name) { this.name = name; }
```

| Feature | C# | Java |
|---------|-----|------|
| Properties | Built-in | Manual getter/setter |
| LINQ | আছে | Stream API (verbose) |
| async/await | Clean syntax | CompletableFuture |
| Null safety | Nullable types | Optional class |

Java থেকে আসলে C# শিখতে ২-৩ সপ্তাহ লাগবে। Syntax প্রায় same।

### C# vs C++

| Feature | C# | C++ |
|---------|-----|-----|
| Memory | Automatic (GC) | Manual (new/delete) |
| Pointers | Limited | Full control |
| Learning curve | Moderate | Steep |
| Performance | Very good | Best |

```csharp
// C# - memory নিয়ে tension নেই
var list = new List<int> { 1, 2, 3 };
// GC automatically clean করবে
```

```cpp
// C++ - নিজে manage করতে হয়
int* arr = new int[3] {1, 2, 3};
// ... use it
delete[] arr;  // ভুলে গেলে memory leak!
```

C++ জানলে C# অনেক easy লাগবে। Memory management নিয়ে মাথা ঘামাতে হবে না।

### C# vs Python

| Feature | C# | Python |
|---------|-----|--------|
| Typing | Static | Dynamic |
| Speed | Fast | Slower |
| Syntax | Curly braces | Indentation |
| Use case | Enterprise, Games | ML, Scripts |

```csharp
// C# - type বলে দিতে হয়
int number = 10;
number = "hello";  // Error! Compile time এই ধরা পড়বে
```

```python
# Python - type বলতে হয় না
number = 10
number = "hello"  # No error, runtime এ problem হতে পারে
```

Python এর flexibility ভালো, কিন্তু C# এর type safety বড় project এ অনেক কাজে লাগে।

---

## Job Market ও Career

**Global:** Stack Overflow Survey অনুযায়ী C# consistently top 10 এ আছে। Microsoft ecosystem এ কাজ করতে চাইলে C# must।

**Bangladesh:** Brain Station 23, Kaz Software, Therap সহ অনেক company তে C# demand আছে। Banking sector এ core banking solutions এ .NET ব্যবহার হয়।

| Level | Monthly Salary (BDT) |
|-------|---------------------|
| Junior (0-1 yr) | ৩০-৫০ হাজার |
| Mid (2-4 yr) | ৬০-১.২ লাখ |
| Senior (5+ yr) | ১.৫-৩ লাখ+ |

Upwork, Toptal এ .NET developers এর remote job এর demand ও আছে।

---

## কেন C# শিখবে?

**Pros:**
- Versatile — Web, Desktop, Mobile, Games সব হয়
- Job Market — Demand আছে, salary ভালো
- Modern Features — async/await, LINQ, pattern matching
- Great Tooling — Visual Studio অনেক powerful
- Strong Community — Microsoft backed, long term support

**Cons:**
- Windows Bias — কিছু features Windows এ better কাজ করে
- Verbose — Python এর মতো short না
- Learning Curve — Complete beginner দের জন্য medium difficulty

**কাদের জন্য C#?**
- Enterprise software এ কাজ করতে চাইলে
- Unity দিয়ে game বানাতে চাইলে
- Windows apps বানাতে চাইলে
- Stable career চাইলে
- Java/C++ থেকে আসলে (transition easy)

---

**পরের Lesson:** .NET Ecosystem বোঝা — .NET কী, CLR, SDK vs Runtime

---

*CPS Academy - Learn. Code. Grow.*
