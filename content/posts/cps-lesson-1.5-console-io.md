---
title: "Lesson 1.5: Console Input/Output"
date: "2026-03-05"
excerpt: 'Console.WriteLine, Console.Write, Console.ReadLine, string interpolation, escape characters, verbatim strings'
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


> **এই Lesson এ শিখবে:** Console.WriteLine, Console.Write, Console.ReadLine, string interpolation ($""), escape characters (\n, \t), @ verbatim strings।

---

## Screen এ কিছু দেখানো

তোমার program user এর সাথে কথা বলবে কীভাবে? Screen এ কিছু দেখাতে হবে, user থেকে কিছু জানতে হবে — এই দুইটাই এই lesson এ শিখবো।

সবচেয়ে basic কাজ — কিছু একটা print করা।

### Console.WriteLine()

```csharp
Console.WriteLine("Hello, World!");
```

Run করলে দেখবে:
```
Hello, World!
```

ব্যস, এইটুকুই। যা লিখবে quotes এর মধ্যে, সেটাই screen এ আসবে।

কয়েকটা লিখলে কী হয়?

```csharp
Console.WriteLine("Ami prothom line");
Console.WriteLine("Ami dwitiyo line");
Console.WriteLine("Ami tritiyo line");
```

Output:
```
Ami prothom line
Ami dwitiyo line
Ami tritiyo line
```

প্রতিটা নতুন line এ গেছে। `WriteLine` মানেই "লেখো এবং পরের line এ যাও"।

### Console.Write()

এখন ধরো তুমি চাও সব একই line এ থাকুক:

```csharp
Console.Write("Hello");
Console.Write(" ");
Console.Write("World");
```

Output:
```
Hello World
```

দেখো, কোনো নতুন line নেই। সব পাশাপাশি বসে গেছে।

### তাহলে পার্থক্যটা কী?

সোজা কথায়:

- `WriteLine()` = লেখো + Enter চাপো
- `Write()` = শুধু লেখো, Enter চাপো না

কখন কোনটা use করবে? যেমন দরকার। User কে প্রশ্ন করার সময় সাধারণত `Write()` ভালো:

```csharp
Console.Write("Tomar naam ki? ");
```

এখানে `Write()` দিলে cursor "?" এর পরেই থাকবে, user ওখানেই type করতে পারবে। দেখতে সুন্দর লাগে।

`WriteLine()` দিলে cursor পরের line এ চলে যেতো:

```
Tomar naam ki?
_                  ← user এখানে type করবে, দেখতে খারাপ
```

`Write()` দিলে:

```
Tomar naam ki? _   ← user এখানেই type করবে, দেখতে সুন্দর
```

---

## User থেকে Input নেওয়া

এইবার মজার part। Program শুধু কথা বলবে না, শুনবেও।

### Console.ReadLine()

```csharp
Console.Write("Tomar naam ki? ");
string naam = Console.ReadLine();

Console.WriteLine("Hello, " + naam + "!");
```

এটা run করলে:
```
Tomar naam ki? Rahim
Hello, Rahim!
```

কী হলো এখানে?

1. "Tomar naam ki? " দেখালো
2. Program wait করছে — user কিছু type করুক
3. User "Rahim" লিখে Enter চাপলো
4. "Rahim" টা `naam` variable এ ঢুকে গেলো
5. শেষে সেই naam দিয়ে Hello বললো

### একটা জিনিস মাথায় রাখো

`ReadLine()` সবসময় text (string) দেয়। মানে তুমি যদি number input নিতে চাও, একটু extra কাজ করতে হবে:

```csharp
Console.Write("Tomar boyosh koto? ");
string input = Console.ReadLine();
int boyosh = int.Parse(input);

Console.WriteLine("Asche bochor tomar boyosh hobe " + (boyosh + 1));
```

`int.Parse()` টা string কে number এ convert করে দেয়। এটা নিয়ে পরে (Type Casting lesson এ) আরো detail এ বলবো।

**Shortcut:** দুই line কে এক line এও লেখা যায়:

```csharp
int boyosh = int.Parse(Console.ReadLine());
```

---

## String জোড়া দেওয়া

উপরে দেখলে আমি `+` দিয়ে text জোড়া দিচ্ছি। কিন্তু একটা আরো সহজ উপায় আছে।

### String Interpolation — এটা শিখে ফেলো

```csharp
string naam = "Rahim";
int boyosh = 25;

Console.WriteLine($"Amar naam {naam} ebong boyosh {boyosh}");
```

Output:
```
Amar naam Rahim ebong boyosh 25
```

দেখো কত clean! শুধু string এর আগে একটা `$` দাও, তারপর `{}` এর মধ্যে variable নাম লেখো।

### + দিয়ে করলে কেমন লাগতো?

```csharp
Console.WriteLine("Amar naam " + naam + " ebong boyosh " + boyosh);
```

কাজ করবে, কিন্তু পড়তে গেলে মাথা ঘুরে যায়। তাই `$` ওয়ালা টা use করো।

### মজার জিনিস — {} এর মধ্যে calculation ও করা যায়

```csharp
int a = 10;
int b = 20;

Console.WriteLine($"{a} + {b} = {a + b}");
```

Output:
```
10 + 20 = 30
```

আরেকটা example:

```csharp
string naam = "Karim";
int din = 30;

Console.WriteLine($"Wow {naam}! {din} din to onk kisu!");
Console.WriteLine($"Aro {100 - din} din practice korle master hoye jabe!");
```

Output:
```
Wow Karim! 30 din to onk kisu!
Aro 70 din practice korle master hoye jabe!
```

`{100 - din}` — calculation হয়ে 70 বসে গেলো!

---

## Special Characters

কিছু জিনিস সরাসরি লেখা যায় না। যেমন, text এর মধ্যে নতুন line দিতে চাইলে কী করবে? Enter চাপলে তো code break হয়ে যাবে!

এজন্য escape characters আছে।

### \n — নতুন Line

```csharp
Console.WriteLine("Prothom line\nDwitiyo line\nTritiyo line");
```

Output:
```
Prothom line
Dwitiyo line
Tritiyo line
```

`\n` মানে "এখান থেকে নতুন line"। একটা `WriteLine()` দিয়েই তিন line print!

### \t — Tab Space

```csharp
Console.WriteLine("Naam:\tRahim");
Console.WriteLine("Boyosh:\t25");
Console.WriteLine("Shahor:\tDhaka");
```

Output:
```
Naam:   Rahim
Boyosh: 25
Shahor: Dhaka
```

সুন্দর করে align হয়ে গেলো।

### \\ — Backslash

File path লিখতে গেলে problem হয়। কারণ `\` তো special character। তাই দুইটা দিতে হয়:

```csharp
Console.WriteLine("Path: C:\\Users\\Rahim\\Documents");
```

Output:
```
Path: C:\Users\Rahim\Documents
```

### \" — Quote

Text এর মধ্যে quote দিতে চাইলে:

```csharp
Console.WriteLine("Shey bollo \"Ki khobor?\"");
```

Output:
```
Shey bollo "Ki khobor?"
```

### Quick Reference Table

| Character | কাজ | Example | Output |
|-----------|------|---------|--------|
| `\n` | নতুন line | `"A\nB"` | A (নতুন line) B |
| `\t` | Tab space | `"A\tB"` | A       B |
| `\\` | Backslash | `"C:\\Users"` | C:\Users |
| `\"` | Double quote | `"\"Hi\""` | "Hi" |

---

## @ দিয়ে জীবন সহজ করো

File path এ এত `\\` দেওয়া বিরক্তিকর। একটা shortcut আছে — string এর আগে `@` দাও:

```csharp
// এত কষ্ট করতে হবে না
string path1 = "C:\\Users\\Rahim\\Documents";

// এভাবে লেখো, অনেক সহজ
string path2 = @"C:\Users\Rahim\Documents";
```

দুইটাই same কাজ করে। `@` দিলে `\` কে normal character হিসেবে treat করে।

### Multiple Line ও লেখা যায়

```csharp
string message = @"Ei holo prothom line
Ei holo dwitiyo line
Ei holo tritiyo line";

Console.WriteLine(message);
```

Output:
```
Ei holo prothom line
Ei holo dwitiyo line
Ei holo tritiyo line
```

`@` string এ Enter দিলে সেটাও string এর part হয়ে যায়।

### @ আর $ একসাথে চাইলে?

হ্যাঁ, পারবে:

```csharp
string userName = "Rahim";
string path = $@"C:\Users\{userName}\Documents";

Console.WriteLine(path);
```

Output:
```
C:\Users\Rahim\Documents
```

`$` দিয়ে variable বসানো + `@` দিয়ে backslash escape ছাড়া — দুইটা সুবিধা একসাথে!

---

## একটা Full Example দেখি

সব মিলিয়ে একটা ছোট program:

```csharp
Console.WriteLine("=== CPS Academy ===");
Console.WriteLine();

Console.Write("Tomar naam ki? ");
string naam = Console.ReadLine();

Console.Write("Tumi koto din dhore coding korcho? ");
int din = int.Parse(Console.ReadLine());

Console.WriteLine();
Console.WriteLine($"Wow {naam}! {din} din to onk kisu!");
Console.WriteLine($"Aro {100 - din} din practice korle master hoye jabe!");
```

Output:
```
=== CPS Academy ===

Tomar naam ki? Karim
Tumi koto din dhore coding korcho? 30

Wow Karim! 30 din to onk kisu!
Aro 70 din practice korle master hoye jabe!
```

---

## যেসব ভুল প্রায়ই হয়

### ভুল 1: Input নিয়ে কোথাও রাখলে না

```csharp
// ❌ এটা কিছুই করবে না — input নিলো কিন্তু কোথাও রাখলো না
Console.ReadLine();

// ✅ Variable এ রাখো
string input = Console.ReadLine();
```

### ভুল 2: $ দিতে ভুলে গেলে

```csharp
string naam = "Rahim";

// ❌ Output হবে: Hello {naam}
Console.WriteLine("Hello {naam}");

// ✅ Output হবে: Hello Rahim
Console.WriteLine($"Hello {naam}");
```

`$` না দিলে `{}` কে সাধারণ text হিসেবে print করবে।

### ভুল 3: Number এ সরাসরি ReadLine()

```csharp
// ❌ Error খাবে — ReadLine() string দেয়, int variable এ string ঢোকে না
int boyosh = Console.ReadLine();

// ✅ Parse করতে হবে
int boyosh = int.Parse(Console.ReadLine());
```

### ভুল 4: Console.Writeline (ছোট হাতের l)

```csharp
// ❌ Error! L বড় হাতের হতে হবে
Console.Writeline("Hello");

// ✅ সঠিক
Console.WriteLine("Hello");
```

C# case-sensitive। `WriteLine` এ W আর L দুইটাই বড় হাতের।

---

## নিজে Try করো

### Task 1
একটা program লেখো যেটা নাম নিয়ে বলবে "Swagatam, [naam]!"

### Task 2
দুইটা number নিয়ে তাদের যোগফল দেখাও।

### Task 3
নাম, বয়স, শহর নিয়ে সুন্দর করে একটা bio print করো। `\t` ব্যবহার করে align করো।

---

## মনে রাখার জিনিস

| কাজ | Code |
|-----|------|
| Print + নতুন line | `Console.WriteLine("text")` |
| শুধু Print | `Console.Write("text")` |
| Input নাও | `Console.ReadLine()` |
| Variable বসাও | `$"Hello {naam}"` |
| নতুন line | `\n` |
| Tab | `\t` |
| Backslash | `\\` |
| Quote | `\"` |
| File path সহজে | `@"C:\path"` |
| $ আর @ একসাথে | `$@"C:\{name}"` |

এই lesson টা অনেক গুরুত্বপূর্ণ। এগুলো না জানলে কোনো program ই বানাতে পারবে না। তাই ভালো করে practice করো!

---

**পরের Lesson:** C# Program Structure — using, namespace, class, Main method, top-level statements

---

*CPS Academy - Learn. Code. Grow.*
