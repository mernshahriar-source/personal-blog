---
title: 'Part 35: Exception Handling'
date: '2026-01-20'
excerpt: 'Part 35: Exception Handling - try-catch-finally শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - exceptions
  - error-handling
  - tutorial
draft: true
---

# Part 35: Exception Handling - Try-Catch-Finally

## আগের Parts এ কী শিখলাম?

Collections series শেষ হয়েছে! এখন শিখবো কীভাবে **program এর errors সুন্দরভাবে handle** করতে হয়।

---

## গল্প দিয়ে শুরু করি

### Program Crash!

ধরো তুমি একটা Calculator program বানিয়েছো:

```csharp
Console.Write("Enter first number: ");
int a = int.Parse(Console.ReadLine());

Console.Write("Enter second number: ");
int b = int.Parse(Console.ReadLine());

int result = a / b;
Console.WriteLine($"Result: {result}");
```

**এই code এ কী সমস্যা হতে পারে?**

---

**সমস্যা ১: User 0 দিলে**

```
Enter first number: 10
Enter second number: 0
```

**কী হবে?**

```
❌ CRASH!
Unhandled Exception: System.DivideByZeroException: Attempted to divide by zero.
   at Program.Main() in Program.cs:line 7
```

**কী হলো?**
- `10 / 0` করা সম্ভব না (গণিতে undefined)
- C# জানে না কী করবে
- তাই program বন্ধ করে দিলো!
- User দেখলো ভয়ংকর error message!

---

**সমস্যা ২: User number না দিয়ে text দিলে**

```
Enter first number: hello
```

**কী হবে?**

```
❌ CRASH!
Unhandled Exception: System.FormatException: Input string was not in a correct format.
   at System.Number.ThrowOverflowOrFormatException()
   at System.Int32.Parse(String s)
   at Program.Main() in Program.cs:line 2
```

**কী হলো?**
- `int.Parse("hello")` করা সম্ভব না
- "hello" তো number না!
- C# জানে না কীভাবে "hello" কে integer এ convert করবে
- তাই program বন্ধ!

---

### এই ধরনের Crash কেন সমস্যা?

```
╔═══════════════════════════════════════════════════════════════════╗
║                    CRASH এর সমস্যা                                ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  ১. User Experience খারাপ                                        ║
║     - User ভয় পেয়ে যায় error message দেখে                        ║
║     - কী হলো বুঝতে পারে না                                        ║
║     - App ব্যবহার করতে চায় না                                    ║
║                                                                   ║
║  ২. Data Loss                                                     ║
║     - যা কাজ করছিল সব হারিয়ে যায়                                 ║
║     - Save না হওয়া data নষ্ট                                      ║
║                                                                   ║
║  ৩. Unprofessional                                                ║
║     - Professional software এভাবে crash করে না                   ║
║     - Users trust হারায়                                          ║
║                                                                   ║
║  ৪. Debugging কঠিন                                                ║
║     - Error message user এর কাছে meaningless                     ║
║     - কোথায় সমস্যা বুঝতে কষ্ট                                     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

### Real Life এ কী হয়?

**ATM Machine এর কথা ভাবো:**

```
Scenario:
─────────
তুমি ATM এ গেলে টাকা তুলতে।
তোমার Balance: 5000 TK
তুমি তুলতে চাও: 10000 TK

ATM কি crash হয়ে যায়? 
❌ না! কখনোই না!

ATM কী করে?
✅ সুন্দর message দেখায়:
   "Insufficient balance. Please enter a lower amount."
✅ তোমাকে আবার চেষ্টা করতে দেয়
✅ কোনো data হারায় না
✅ Machine চালু থাকে

এটাই Error Handling!
```

---

**আরেকটা Example - Google Search:**

```
তুমি Google এ search করলে: "asdfghjkl123456"

Google কি crash হয়ে যায়?
❌ না!

Google কী করে?
✅ বলে: "No results found for asdfghjkl123456"
✅ Suggestions দেয়
✅ তোমাকে আবার search করতে দেয়
```

---

**আরেকটা Example - WhatsApp:**

```
তুমি WhatsApp এ message পাঠাচ্ছো
হঠাৎ Internet চলে গেল!

WhatsApp কি crash হয়ে যায়?
❌ না!

WhatsApp কী করে?
✅ বলে: "Waiting for network..."
✅ Message queue তে রাখে
✅ Internet আসলে automatically পাঠায়
```

**ভালো program কখনো crash হয় না - errors সুন্দরভাবে handle করে!**

---

## Exception কী?

### সংজ্ঞা

**Exception** হলো program চলাকালীন **unexpected situation** যা normal execution বন্ধ করে দেয়।

```
Exception = "ব্যতিক্রম" = "অপ্রত্যাশিত ঘটনা"
```

---

### Exception কখন হয়?

| Situation | Exception |
|-----------|-----------|
| 0 দিয়ে ভাগ করলে | DivideByZeroException |
| null object access করলে | NullReferenceException |
| ভুল format convert করলে | FormatException |
| File না পেলে | FileNotFoundException |
| Array এর বাইরে access করলে | IndexOutOfRangeException |
| Internet না থাকলে | NetworkException |
| Memory শেষ হলে | OutOfMemoryException |

---

### Exception vs Error vs Bug

```
╔═══════════════════════════════════════════════════════════════════╗
║           EXCEPTION vs ERROR vs BUG                               ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  BUG (বাগ):                                                       ║
║  ─────────                                                        ║
║  • Programmer এর ভুল code                                        ║
║  • Logic error                                                    ║
║  • Fix করতে হয় code change করে                                  ║
║  • Example: loop ভুল করে infinite হয়ে গেল                        ║
║                                                                   ║
║  ERROR (এরর):                                                     ║
║  ────────────                                                     ║
║  • Compile time এ ধরা পড়ে                                        ║
║  • Syntax error, type error                                       ║
║  • Program run ই হয় না                                           ║
║  • Example: semicolon miss করলে                                  ║
║                                                                   ║
║  EXCEPTION (এক্সেপশন):                                            ║
║  ────────────────────                                             ║
║  • Runtime এ ঘটে                                                  ║
║  • Unexpected situation                                           ║
║  • Handle করা যায়                                                ║
║  • Example: user ভুল input দিলে                                  ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

### Exception হলে কী হয়?

**Exception এর Journey:**

```
╔═══════════════════════════════════════════════════════════════════╗
║                    EXCEPTION FLOW                                 ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║    Program চলছে স্বাভাবিকভাবে...                                  ║
║         │                                                         ║
║         ↓                                                         ║
║    Line 1: Console.WriteLine("Hello");  ✓                        ║
║         │                                                         ║
║         ↓                                                         ║
║    Line 2: int x = 10 / 0;  💥 EXCEPTION!                        ║
║         │                                                         ║
║         ↓                                                         ║
║    ┌─────────────────────────────────────────┐                   ║
║    │  C# খুঁজছে: কেউ এই error handle করবে?   │                   ║
║    └─────────────────────────────────────────┘                   ║
║              │                    │                               ║
║              ↓                    ↓                               ║
║        try-catch আছে?      try-catch নেই?                        ║
║              │                    │                               ║
║              ↓                    ↓                               ║
║    ┌─────────────────┐  ┌─────────────────────┐                  ║
║    │  catch block    │  │  💀 CRASH!          │                  ║
║    │  execute হবে    │  │  Program বন্ধ!      │                  ║
║    │  Program চলবে   │  │  Error message     │                  ║
║    └─────────────────┘  └─────────────────────┘                  ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

### Exception "Throw" হয়

যখন exception ঘটে, আমরা বলি exception **"throw"** হয়েছে।

```csharp
int x = 10 / 0;  // এই line এ DivideByZeroException "throw" হয়
```

**মনে করো:**
- Exception হলো একটা ball 🏀
- Error হলে C# সেই ball টা "throw" করে দেয়
- কেউ "catch" করলে = handled ✓
- কেউ catch না করলে = crash! 💥

---

## Common Exceptions বিস্তারিত

### ১. DivideByZeroException

**কখন হয়?** Integer কে 0 দিয়ে ভাগ করলে।

```csharp
int a = 10;
int b = 0;
int result = a / b;  // 💥 DivideByZeroException!
```

**কেন হয়?**

```
গণিতে 10 ÷ 0 = ?

উত্তর নেই! Undefined!

কারণ:
10 ÷ 2 = 5  (কারণ 5 × 2 = 10) ✓
10 ÷ 1 = 10 (কারণ 10 × 1 = 10) ✓
10 ÷ 0 = ?  (কোন সংখ্যা × 0 = 10? নেই!)

C# জানে না কী return করবে, তাই Exception throw করে!
```

**⚠️ Note:** শুধু integer division এ হয়। double/float এ হয় না!

```csharp
double a = 10.0;
double b = 0.0;
double result = a / b;  // Infinity (crash হয় না!)

Console.WriteLine(result);  // Output: ∞
```

---

### ২. NullReferenceException

**কখন হয়?** null object এর property বা method access করলে।

**Example ১: String**

```csharp
string name = null;
int length = name.Length;  // 💥 NullReferenceException!
```

**কী হচ্ছে?**

```
name = null মানে name কোনো string এর দিকে point করছে না।

name.Length বলতে গেলে:
- আগে name এ যেতে হবে
- কিন্তু name তো কোথাও point করছে না!
- কোথায় যাবে? জানে না!
- Exception!

Visual:

name → ❌ (null = কোথাও না)

name.Length বলতে গেলে:
"কোথায়? কিছু তো নেই!" 💥
```

---

**Example ২: List**

```csharp
List<int> numbers = null;
numbers.Add(5);  // 💥 NullReferenceException!
```

**কী হচ্ছে?**

```
numbers = null মানে কোনো List create হয়নি।

numbers:
┌─────────┐
│  null   │ ──→ ❌ (কোথাও না)
└─────────┘

numbers.Add(5) বলতে গেলে:
"কোন List এ Add করবো? List তো নেই!" 💥
```

---

**Example ৩: Object**

```csharp
class Student
{
    public string Name;
}

Student s = null;
Console.WriteLine(s.Name);  // 💥 NullReferenceException!
```

---

**সবচেয়ে Common Exception!**

NullReferenceException হলো সবচেয়ে বেশি হওয়া exception। এমনকি একে "The Billion Dollar Mistake" বলা হয়!

```
╔═══════════════════════════════════════════════════════════════════╗
║  💡 TIP: NullReferenceException এড়াতে                            ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  সবসময় null check করো:                                          ║
║                                                                   ║
║  if (name != null)                                               ║
║  {                                                                ║
║      Console.WriteLine(name.Length);                             ║
║  }                                                                ║
║                                                                   ║
║  অথবা Null-conditional operator (?.) use করো:                   ║
║                                                                   ║
║  Console.WriteLine(name?.Length);  // null হলে কিছু করবে না     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

### ৩. IndexOutOfRangeException

**কখন হয়?** Array বা List এর invalid index access করলে।

```csharp
int[] numbers = { 10, 20, 30 };  // indices: 0, 1, 2

Console.WriteLine(numbers[0]);   // ✓ 10
Console.WriteLine(numbers[1]);   // ✓ 20
Console.WriteLine(numbers[2]);   // ✓ 30
Console.WriteLine(numbers[3]);   // 💥 IndexOutOfRangeException!
Console.WriteLine(numbers[-1]);  // 💥 IndexOutOfRangeException!
```

**কী হচ্ছে?**

```
Array: [10, 20, 30]
Index:   0   1   2

Valid indices: 0, 1, 2 (total 3 items)

numbers[3] বলতে গেলে:
"Index 3 এ কী আছে?"
"কিছু নেই! Array তে 3 items, index 0-2 পর্যন্ত!"
💥 Exception!

Visual:
         ┌────┬────┬────┐
numbers: │ 10 │ 20 │ 30 │  ???
         └────┴────┴────┘
Index:     0    1    2    3 ← নেই!
```

---

**Common Mistake: Loop এ**

```csharp
int[] arr = { 1, 2, 3, 4, 5 };

// ❌ WRONG! arr.Length = 5, কিন্তু index 0-4
for (int i = 0; i <= arr.Length; i++)  // <= হলে i=5 হবে!
{
    Console.WriteLine(arr[i]);  // i=5 এ crash!
}

// ✓ CORRECT!
for (int i = 0; i < arr.Length; i++)  // < হলে i=4 পর্যন্ত
{
    Console.WriteLine(arr[i]);
}
```

---

### ৪. FormatException

**কখন হয়?** String কে number এ convert করতে গেলে যদি format ঠিক না থাকে।

**Example ১: Text to Number**

```csharp
string input = "hello";
int number = int.Parse(input);  // 💥 FormatException!
```

**কী হচ্ছে?**

```
int.Parse("hello") বলতে গেলে:
"hello" কে integer এ convert করো

h = ? (কোন digit?)
e = ? (কোন digit?)
l = ? (কোন digit?)
l = ? (কোন digit?)
o = ? (কোন digit?)

কোনোটাই digit না! Convert করা যাচ্ছে না!
💥 FormatException!
```

---

**Example ২: Decimal to Integer**

```csharp
string input = "12.5";
int number = int.Parse(input);  // 💥 FormatException!
```

**কী হচ্ছে?**

```
"12.5" কে int এ convert করতে গেলে:
- int এ দশমিক থাকতে পারে না
- "12.5" এ দশমিক আছে
- Convert করা যাচ্ছে না!
💥 FormatException!

Solution:
double number = double.Parse("12.5");  // ✓ Works!
```

---

**Example ৩: Empty String**

```csharp
string input = "";
int number = int.Parse(input);  // 💥 FormatException!
```

---

**Example ৪: Whitespace**

```csharp
string input = "   ";
int number = int.Parse(input);  // 💥 FormatException!
```

---

**Safe Alternative: TryParse()**

```csharp
string input = "hello";

// ❌ Unsafe way
int number = int.Parse(input);  // Crash!

// ✓ Safe way
if (int.TryParse(input, out int number))
{
    Console.WriteLine($"Number: {number}");
}
else
{
    Console.WriteLine("Invalid number!");
}
```

**TryParse() কীভাবে কাজ করে:**

```
int.TryParse(input, out int result)
             │           │
             │           └── সফল হলে result এ value বসবে
             │
             └── যেটা convert করতে চাও

Returns:
- true = সফল হয়েছে, result এ value আছে
- false = ব্যর্থ হয়েছে, কিন্তু crash হয়নি!
```

---

### ৫. FileNotFoundException

**কখন হয়?** যে file পড়তে চাইছো সেটা না থাকলে।

```csharp
using System.IO;

string content = File.ReadAllText("myfile.txt");  // 💥 FileNotFoundException!
```

**কী হচ্ছে?**

```
File.ReadAllText("myfile.txt") বলতে গেলে:
1. "myfile.txt" খুঁজছে
2. Current directory তে নেই
3. কোথাও পাচ্ছে না
4. 💥 FileNotFoundException!

Error message:
"Could not find file 'C:\Users\...\myfile.txt'"
```

---

**Related Exceptions:**

| Exception | কখন |
|-----------|------|
| FileNotFoundException | File নেই |
| DirectoryNotFoundException | Folder নেই |
| UnauthorizedAccessException | Permission নেই |
| IOException | General I/O error |

---

### ৬. ArgumentException / ArgumentNullException

**কখন হয়?** Function এ invalid argument দিলে।

```csharp
// ArgumentNullException
string text = null;
string upper = text.ToUpper();  // 💥 NullReferenceException!

// ArgumentException
Thread.Sleep(-1000);  // 💥 ArgumentException! (negative time!)
```

---

### ৭. InvalidOperationException

**কখন হয়?** Object এমন state এ আছে যেখানে operation করা যায় না।

**Example ১: Empty Collection**

```csharp
List<int> numbers = new List<int>();  // Empty!

int first = numbers.First();  // 💥 InvalidOperationException!
// "Sequence contains no elements"
```

**Example ২: Empty Stack**

```csharp
Stack<int> stack = new Stack<int>();  // Empty!

int top = stack.Pop();  // 💥 InvalidOperationException!
// "Stack empty"
```

**Example ৩: Empty Queue**

```csharp
Queue<int> queue = new Queue<int>();  // Empty!

int front = queue.Dequeue();  // 💥 InvalidOperationException!
// "Queue empty"
```

---

### Exception Hierarchy (বিস্তারিত)

```
                         Exception
                             │
            ┌────────────────┴────────────────┐
            │                                 │
     SystemException                  ApplicationException
            │                         (Custom exceptions)
            │
    ┌───────┼───────┬───────────────┬────────────────┐
    │       │       │               │                │
    │       │       │               │                │
Argument  Null    Format      InvalidOperation    IO
Exception Reference Exception    Exception      Exception
    │    Exception                                   │
    │                                                │
ArgumentNull                              ┌──────────┴──────────┐
Exception                                 │                     │
                                   FileNotFound          Directory
                                   Exception            NotFoundException


┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│  Index          Divide         Overflow        OutOfMemory       │
│  OutOfRange     ByZero         Exception       Exception         │
│  Exception      Exception                                        │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Try-Catch - Error Handle করা

### Basic Syntax

```csharp
try
{
    // এখানে সেই code লিখো যেখানে error হতে পারে
    // "Risky" code
}
catch (Exception ex)
{
    // error হলে এখানে আসবে
    // error টা handle করো
}
```

---

### Syntax এর প্রতিটা Part বুঝি

```csharp
try
{
    int result = 10 / 0;
}
catch (Exception ex)
{
    Console.WriteLine(ex.Message);
}
```

```
try                    ← Keyword: "চেষ্টা করো"
{
    int result = 10/0; ← Risky code (error হতে পারে)
}
catch                  ← Keyword: "ধরো" (exception ধরো)
(
    Exception          ← Exception এর type
    ex                 ← Variable name (exception object রাখবে)
)
{
    Console.WriteLine  ← Error handle করার code
    (ex.Message);      ← ex থেকে error message নাও
}
```

---

### প্রথম Example: Without vs With Try-Catch

**❌ WITHOUT Try-Catch (Crashes!):**

```csharp
Console.WriteLine("Program started");

Console.Write("Enter a number: ");
string input = Console.ReadLine();
int number = int.Parse(input);  // User "hello" দিলে crash!

Console.WriteLine($"You entered: {number}");
Console.WriteLine("Program ended");
```

**Run করলে (user "hello" দিলে):**

```
Program started
Enter a number: hello
❌ Unhandled Exception: System.FormatException: Input string was not in a correct format.
```

**"Program ended" কখনোই print হলো না!**

---

**✅ WITH Try-Catch (Safe!):**

```csharp
Console.WriteLine("Program started");

try
{
    Console.Write("Enter a number: ");
    string input = Console.ReadLine();
    int number = int.Parse(input);
    Console.WriteLine($"You entered: {number}");
}
catch (Exception ex)
{
    Console.WriteLine($"Oops! Error: {ex.Message}");
}

Console.WriteLine("Program ended");
```

**Run করলে (user "hello" দিলে):**

```
Program started
Enter a number: hello
Oops! Error: Input string was not in a correct format.
Program ended
```

**Program crash হলো না! "Program ended" print হলো!** ✅

---

### Try-Catch কীভাবে কাজ করে? Step by Step

**Scenario 1: কোনো Error নেই**

```csharp
Console.WriteLine("Step 1");

try
{
    Console.WriteLine("Step 2 - Inside try");
    int x = 10 + 5;  // No error
    Console.WriteLine("Step 3 - After calculation");
}
catch (Exception ex)
{
    Console.WriteLine("Step X - Inside catch");  // Skip!
}

Console.WriteLine("Step 4 - After try-catch");
```

**Output:**

```
Step 1
Step 2 - Inside try
Step 3 - After calculation
Step 4 - After try-catch
```

**catch block এ যায়নি কারণ কোনো error হয়নি!**

---

**Visual Flow (No Error):**

```
Console.WriteLine("Step 1");        ✓ Execute
            │
            ↓
    ┌─── try { ─────────────────────┐
    │                               │
    │  Console.WriteLine("Step 2"); │ ✓ Execute
    │           │                   │
    │           ↓                   │
    │  int x = 10 + 5;             │ ✓ Execute (no error)
    │           │                   │
    │           ↓                   │
    │  Console.WriteLine("Step 3"); │ ✓ Execute
    │                               │
    └───────────────────────────────┘
            │
            │ (catch skip হয়ে গেল)
            ↓
    ┌─── catch { ───────────────────┐
    │                               │
    │  Console.WriteLine("Step X"); │ ⏭️ SKIP!
    │                               │
    └───────────────────────────────┘
            │
            ↓
Console.WriteLine("Step 4");        ✓ Execute
```

---

**Scenario 2: Error আছে**

```csharp
Console.WriteLine("Step 1");

try
{
    Console.WriteLine("Step 2 - Inside try");
    int x = 10 / 0;  // 💥 Error here!
    Console.WriteLine("Step 3 - After calculation");  // Skip!
}
catch (Exception ex)
{
    Console.WriteLine("Step X - Inside catch");
}

Console.WriteLine("Step 4 - After try-catch");
```

**Output:**

```
Step 1
Step 2 - Inside try
Step X - Inside catch
Step 4 - After try-catch
```

**"Step 3" print হয়নি! কারণ error এর পরের code skip হয়ে যায়!**

---

**Visual Flow (With Error):**

```
Console.WriteLine("Step 1");        ✓ Execute
            │
            ↓
    ┌─── try { ─────────────────────┐
    │                               │
    │  Console.WriteLine("Step 2"); │ ✓ Execute
    │           │                   │
    │           ↓                   │
    │  int x = 10 / 0;             │ 💥 ERROR!
    │           │                   │
    │           │ (বাকি skip)       │
    │           ↓                   │
    │  Console.WriteLine("Step 3"); │ ⏭️ SKIP!
    │                               │
    └───────────────────────────────┘
            │
            │ (catch এ jump)
            ↓
    ┌─── catch { ───────────────────┐
    │                               │
    │  Console.WriteLine("Step X"); │ ✓ Execute
    │                               │
    └───────────────────────────────┘
            │
            ↓
Console.WriteLine("Step 4");        ✓ Execute
```

---

### গুরুত্বপূর্ণ Point:

```
╔═══════════════════════════════════════════════════════════════════╗
║  💡 KEY POINTS                                                    ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  ১. try block এ error হলে:                                       ║
║     - Error এর পরের সব code SKIP হয়ে যায়                        ║
║     - সরাসরি catch block এ jump করে                              ║
║                                                                   ║
║  ২. catch execute হওয়ার পর:                                      ║
║     - Program normally চলতে থাকে                                  ║
║     - try-catch এর পরের code execute হয়                         ║
║                                                                   ║
║  ৩. try block এ error না হলে:                                    ║
║     - catch block সম্পূর্ণ SKIP হয়ে যায়                         ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## Exception Object থেকে Information নেওয়া

### catch এ Exception Object পাই

```csharp
catch (Exception ex)  // ex হলো exception object
{
    // ex থেকে অনেক information পাওয়া যায়
}
```

---

### Exception এর Properties

```csharp
try
{
    int[] arr = { 1, 2, 3 };
    Console.WriteLine(arr[10]);
}
catch (Exception ex)
{
    Console.WriteLine("═══════════════════════════════════════");
    Console.WriteLine($"Type: {ex.GetType().Name}");
    Console.WriteLine($"Message: {ex.Message}");
    Console.WriteLine($"Source: {ex.Source}");
    Console.WriteLine("───────────────────────────────────────");
    Console.WriteLine($"StackTrace:\n{ex.StackTrace}");
    Console.WriteLine("═══════════════════════════════════════");
}
```

**Output:**

```
═══════════════════════════════════════
Type: IndexOutOfRangeException
Message: Index was outside the bounds of the array.
Source: MyProgram
───────────────────────────────────────
StackTrace:
   at Program.Main() in C:\Projects\Program.cs:line 5
═══════════════════════════════════════
```

---

### প্রতিটা Property বিস্তারিত:

**১. Message:**

```csharp
ex.Message  // Error এর description
```

| Exception | Message |
|-----------|---------|
| DivideByZeroException | "Attempted to divide by zero." |
| NullReferenceException | "Object reference not set to an instance of an object." |
| FormatException | "Input string was not in a correct format." |
| FileNotFoundException | "Could not find file 'filename'." |
| IndexOutOfRangeException | "Index was outside the bounds of the array." |

---

**২. GetType().Name:**

```csharp
ex.GetType().Name  // Exception এর type/class name
```

```csharp
try { int x = 10 / 0; }
catch (Exception ex)
{
    Console.WriteLine(ex.GetType().Name);  // "DivideByZeroException"
}
```

---

**৩. StackTrace:**

```csharp
ex.StackTrace  // কোথায় error হয়েছে (file, line number)
```

**StackTrace পড়ার উপায়:**

```
at Program.Calculate() in C:\Projects\Program.cs:line 15
at Program.Main() in C:\Projects\Program.cs:line 8

পড়তে হয় নিচ থেকে উপরে:
1. Main() line 8 এ Calculate() call করেছে
2. Calculate() line 15 এ error হয়েছে
```

---

**৪. InnerException:**

কখনো একটা exception আরেকটা exception এর কারণে হয়।

```csharp
try
{
    try
    {
        int x = 10 / 0;
    }
    catch (Exception inner)
    {
        throw new Exception("Calculation failed", inner);
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Message: {ex.Message}");
    Console.WriteLine($"Inner: {ex.InnerException?.Message}");
}
```

**Output:**

```
Message: Calculation failed
Inner: Attempted to divide by zero.
```

---

## Multiple Catch Blocks - বিভিন্ন Error আলাদাভাবে Handle

### কেন দরকার?

একই code এ বিভিন্ন ধরনের error হতে পারে:

```csharp
Console.Write("Enter array index: ");
int index = int.Parse(Console.ReadLine());  // FormatException হতে পারে

int[] arr = { 10, 20, 30 };
Console.WriteLine(arr[index]);               // IndexOutOfRangeException হতে পারে
```

**দুই ধরনের error - দুই রকম message দিতে চাই!**

---

### Single Catch এ সমস্যা:

```csharp
try
{
    Console.Write("Enter array index: ");
    int index = int.Parse(Console.ReadLine());
    
    int[] arr = { 10, 20, 30 };
    Console.WriteLine(arr[index]);
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
```

**সমস্যা:** সব error এ same message! User বুঝবে না কী ভুল করেছে!

---

### Multiple Catch Solution:

```csharp
try
{
    Console.Write("Enter array index: ");
    int index = int.Parse(Console.ReadLine());
    
    int[] arr = { 10, 20, 30 };
    Console.WriteLine($"Value: {arr[index]}");
}
catch (FormatException ex)
{
    Console.WriteLine("❌ Please enter a valid number!");
    Console.WriteLine("   You entered text instead of a number.");
}
catch (IndexOutOfRangeException ex)
{
    Console.WriteLine("❌ Invalid index!");
    Console.WriteLine("   Please enter 0, 1, or 2.");
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Unexpected error: {ex.Message}");
}
```

---

### বিভিন্ন Input এ কী হয়:

**Test 1: Valid Input**

```
Enter array index: 1
Value: 20
```

✅ কোনো catch এ যায়নি!

---

**Test 2: Text Input (FormatException)**

```
Enter array index: hello
❌ Please enter a valid number!
   You entered text instead of a number.
```

✅ FormatException catch এ গেছে!

---

**Test 3: Invalid Index (IndexOutOfRangeException)**

```
Enter array index: 10
❌ Invalid index!
   Please enter 0, 1, or 2.
```

✅ IndexOutOfRangeException catch এ গেছে!

---

### Multiple Catch Flow:

```
Exception ঘটলো!
       │
       ↓
┌──────────────────────────────────────┐
│ catch (FormatException)              │
│                                      │
│  এই type match করে? ─── YES ──→ ✓   │
│      │                               │
│      NO                              │
│      ↓                               │
└──────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│ catch (IndexOutOfRangeException)     │
│                                      │
│  এই type match করে? ─── YES ──→ ✓   │
│      │                               │
│      NO                              │
│      ↓                               │
└──────────────────────────────────────┘
       │
       ↓
┌──────────────────────────────────────┐
│ catch (Exception)                    │
│                                      │
│  বাকি সব এখানে catch হবে ──→ ✓      │
│                                      │
└──────────────────────────────────────┘
```

---

### ⚠️ Catch Order অনেক গুরুত্বপূর্ণ!

**Rule: Specific exceptions আগে, General exception পরে!**

```csharp
// ✅ CORRECT ORDER
try { }
catch (FormatException ex) { }       // Specific
catch (ArgumentException ex) { }     // Specific (parent of FormatException)
catch (Exception ex) { }             // Most general (last!)
```

```csharp
// ❌ WRONG ORDER - Compile Error!
try { }
catch (Exception ex) { }             // General আগে - WRONG!
catch (FormatException ex) { }       // Unreachable code!
```

**Error Message:**

```
CS0160: A previous catch clause already catches all exceptions
```

---

**কেন ভুল?**

```
Exception হলো সব exceptions এর parent।

Exception
    ├── SystemException
    │       ├── FormatException
    │       ├── NullReferenceException
    │       └── ...
    └── ...

catch (Exception) সব কিছু ধরে ফেলে!
তাই পরের catch এ কখনো যাবে না!
```

---

### Practical Example: Calculator with Multiple Catches

```csharp
while (true)
{
    try
    {
        Console.Write("\nEnter first number: ");
        int a = int.Parse(Console.ReadLine());
        
        Console.Write("Enter second number: ");
        int b = int.Parse(Console.ReadLine());
        
        Console.Write("Enter operator (+, -, *, /): ");
        string op = Console.ReadLine();
        
        int result = 0;
        
        switch (op)
        {
            case "+": result = a + b; break;
            case "-": result = a - b; break;
            case "*": result = a * b; break;
            case "/": result = a / b; break;
            default:
                throw new ArgumentException($"Unknown operator: {op}");
        }
        
        Console.WriteLine($"✅ Result: {a} {op} {b} = {result}");
    }
    catch (FormatException)
    {
        Console.WriteLine("❌ Invalid number format!");
        Console.WriteLine("   Please enter integers only.");
    }
    catch (DivideByZeroException)
    {
        Console.WriteLine("❌ Cannot divide by zero!");
        Console.WriteLine("   Please enter a non-zero divisor.");
    }
    catch (ArgumentException ex)
    {
        Console.WriteLine($"❌ {ex.Message}");
        Console.WriteLine("   Valid operators: +, -, *, /");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ Unexpected error: {ex.Message}");
    }
}
```

---

## Finally Block - সবসময় Execute হয়

### Finally কী?

**Finally block সবসময় execute হয়** - exception হোক বা না হোক!

```csharp
try
{
    // Risky code
}
catch (Exception ex)
{
    // Handle error
}
finally
{
    // ALWAYS executes! ✅
    // Cleanup code here
}
```

---

### কখন Finally দরকার?

**Resources cleanup করতে!**

যেমন:
- File open করলে close করতে হয়
- Database connection open করলে close করতে হয়
- Network connection open করলে close করতে হয়

**এগুলো close না করলে:**
- Memory leak হয়
- অন্য programs সেই resource use করতে পারে না
- System slow হয়ে যায়

---

### Example: File Reading

**❌ Without Finally (সমস্যা!):**

```csharp
StreamReader reader = new StreamReader("data.txt");

try
{
    string content = reader.ReadToEnd();
    Console.WriteLine(content);
    
    // এখানে error হলে?
    int x = 10 / 0;  // 💥 Exception!
    
    reader.Close();  // 😱 এই line execute হবে না!
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
    // reader এখনো open আছে! 😱
}
```

**সমস্যা:** Error হলে `reader.Close()` execute হয় না! File open থেকে যায়!

---

**✅ With Finally (Safe!):**

```csharp
StreamReader reader = null;

try
{
    reader = new StreamReader("data.txt");
    string content = reader.ReadToEnd();
    Console.WriteLine(content);
    
    int x = 10 / 0;  // 💥 Exception!
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
finally
{
    // এটা ALWAYS execute হবে!
    if (reader != null)
    {
        reader.Close();
        Console.WriteLine("File closed. ✓");
    }
}
```

**Output:**

```
(file content)
Error: Attempted to divide by zero.
File closed. ✓
```

**Error হলেও file close হয়েছে!** ✅

---

### Finally Flow - সব Scenarios

**Scenario 1: No Exception**

```csharp
try
{
    Console.WriteLine("Try");        // ✓
}
catch (Exception ex)
{
    Console.WriteLine("Catch");      // ⏭️ Skip
}
finally
{
    Console.WriteLine("Finally");    // ✓ Always!
}
Console.WriteLine("After");          // ✓
```

**Output:**
```
Try
Finally
After
```

---

**Scenario 2: Exception Caught**

```csharp
try
{
    Console.WriteLine("Try");        // ✓
    int x = 10 / 0;                  // 💥
    Console.WriteLine("After error"); // ⏭️ Skip
}
catch (Exception ex)
{
    Console.WriteLine("Catch");      // ✓
}
finally
{
    Console.WriteLine("Finally");    // ✓ Always!
}
Console.WriteLine("After");          // ✓
```

**Output:**
```
Try
Catch
Finally
After
```

---

**Scenario 3: Exception NOT Caught (Crash but Finally runs!)**

```csharp
try
{
    Console.WriteLine("Try");        // ✓
    int x = 10 / 0;                  // 💥
}
finally
{
    Console.WriteLine("Finally");    // ✓ Still runs!
}
Console.WriteLine("After");          // ❌ Never reaches
```

**Output:**
```
Try
Finally
Unhandled Exception: System.DivideByZeroException...
```

**Crash হলেও Finally execute হয়!** এজন্যই cleanup code finally তে রাখা safe!

---

### Complete Finally Flow Diagram:

```
╔═══════════════════════════════════════════════════════════════════╗
║                    TRY-CATCH-FINALLY COMPLETE FLOW                ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║                         START                                     ║
║                           │                                       ║
║                           ↓                                       ║
║                    ┌─────────────┐                               ║
║                    │  try block  │                               ║
║                    └──────┬──────┘                               ║
║                           │                                       ║
║              ┌────────────┴────────────┐                         ║
║              │                         │                          ║
║         No Error                  Error! 💥                       ║
║              │                         │                          ║
║              │              ┌──────────┴──────────┐              ║
║              │              │                     │               ║
║              │        catch আছে?           catch নেই?            ║
║              │              │                     │               ║
║              │              ↓                     │               ║
║              │       ┌─────────────┐             │               ║
║              │       │ catch block │             │               ║
║              │       └──────┬──────┘             │               ║
║              │              │                     │               ║
║              └──────────────┼─────────────────────┘              ║
║                             │                                     ║
║                             ↓                                     ║
║                    ┌─────────────────┐                           ║
║                    │  finally block  │ ← ALWAYS RUNS!            ║
║                    └────────┬────────┘                           ║
║                             │                                     ║
║              ┌──────────────┴──────────────┐                     ║
║              │                             │                      ║
║        catch ছিল?                    catch ছিল না?               ║
║              │                             │                      ║
║              ↓                             ↓                      ║
║         Continue                      CRASH! 💀                   ║
║         normally                      Program ends               ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

---

## Complete Example ১: Safe Calculator (বিস্তারিত)

```csharp
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("╔═══════════════════════════════════════╗");
        Console.WriteLine("║        🔢 SAFE CALCULATOR            ║");
        Console.WriteLine("╚═══════════════════════════════════════╝");
        Console.WriteLine("\nType 'exit' to quit.\n");
        
        while (true)
        {
            try
            {
                // ─────────────── First Number ───────────────
                Console.Write("Enter first number: ");
                string input1 = Console.ReadLine();
                
                // Exit check
                if (input1.ToLower() == "exit")
                {
                    Console.WriteLine("\nGoodbye! 👋");
                    break;
                }
                
                // Parse করছি - FormatException হতে পারে
                int num1 = int.Parse(input1);
                
                // ─────────────── Operator ───────────────
                Console.Write("Enter operator (+, -, *, /): ");
                string op = Console.ReadLine();
                
                // Validate operator
                if (op != "+" && op != "-" && op != "*" && op != "/")
                {
                    Console.WriteLine("❌ Invalid operator! Use +, -, *, or /\n");
                    continue;  // আবার শুরু থেকে
                }
                
                // ─────────────── Second Number ───────────────
                Console.Write("Enter second number: ");
                string input2 = Console.ReadLine();
                
                // Parse করছি - FormatException হতে পারে
                int num2 = int.Parse(input2);
                
                // ─────────────── Calculate ───────────────
                int result = 0;
                
                switch (op)
                {
                    case "+":
                        result = num1 + num2;
                        break;
                    case "-":
                        result = num1 - num2;
                        break;
                    case "*":
                        result = num1 * num2;
                        break;
                    case "/":
                        // DivideByZeroException হতে পারে
                        result = num1 / num2;
                        break;
                }
                
                // ─────────────── Show Result ───────────────
                Console.WriteLine();
                Console.WriteLine("┌─────────────────────────────────┐");
                Console.WriteLine($"│  {num1} {op} {num2} = {result}");
                Console.WriteLine("└─────────────────────────────────┘");
                Console.WriteLine();
            }
            catch (FormatException)
            {
                Console.WriteLine();
                Console.WriteLine("╔═════════════════════════════════════╗");
                Console.WriteLine("║  ❌ ERROR: Invalid number format!   ║");
                Console.WriteLine("║     Please enter integers only.    ║");
                Console.WriteLine("║     Examples: 5, 10, -3, 100       ║");
                Console.WriteLine("╚═════════════════════════════════════╝");
                Console.WriteLine();
            }
            catch (DivideByZeroException)
            {
                Console.WriteLine();
                Console.WriteLine("╔═════════════════════════════════════╗");
                Console.WriteLine("║  ❌ ERROR: Division by zero!        ║");
                Console.WriteLine("║     Cannot divide by zero.         ║");
                Console.WriteLine("║     Please enter a non-zero number.║");
                Console.WriteLine("╚═════════════════════════════════════╝");
                Console.WriteLine();
            }
            catch (OverflowException)
            {
                Console.WriteLine();
                Console.WriteLine("╔═════════════════════════════════════╗");
                Console.WriteLine("║  ❌ ERROR: Number too large!        ║");
                Console.WriteLine("║     Result exceeded integer limit. ║");
                Console.WriteLine("╚═════════════════════════════════════╝");
                Console.WriteLine();
            }
            catch (Exception ex)
            {
                Console.WriteLine();
                Console.WriteLine("╔═════════════════════════════════════╗");
                Console.WriteLine("║  ❌ ERROR: Unexpected error!        ║");
                Console.WriteLine($"║  {ex.Message,-35} ║");
                Console.WriteLine("╚═════════════════════════════════════╝");
                Console.WriteLine();
            }
        }
    }
}
```

---

### Sample Run:

```
╔═══════════════════════════════════════╗
║        🔢 SAFE CALCULATOR            ║
╚═══════════════════════════════════════╝

Type 'exit' to quit.

Enter first number: 10
Enter operator (+, -, *, /): +
Enter second number: 5

┌─────────────────────────────────┐
│  10 + 5 = 15
└─────────────────────────────────┘

Enter first number: 20
Enter operator (+, -, *, /): /
Enter second number: 4

┌─────────────────────────────────┐
│  20 / 4 = 5
└─────────────────────────────────┘

Enter first number: hello

╔═════════════════════════════════════╗
║  ❌ ERROR: Invalid number format!   ║
║     Please enter integers only.    ║
║     Examples: 5, 10, -3, 100       ║
╚═════════════════════════════════════╝

Enter first number: 10
Enter operator (+, -, *, /): /
Enter second number: 0

╔═════════════════════════════════════╗
║  ❌ ERROR: Division by zero!        ║
║     Cannot divide by zero.         ║
║     Please enter a non-zero number.║
╚═════════════════════════════════════╝

Enter first number: exit

Goodbye! 👋
```

---

## Complete Example ২: Student Grade System (বিস্তারিত)

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static Dictionary<int, (string Name, double Marks)> students = 
        new Dictionary<int, (string, double)>();
    
    static void Main()
    {
        Console.WriteLine("╔═══════════════════════════════════════╗");
        Console.WriteLine("║     📚 STUDENT GRADE SYSTEM          ║");
        Console.WriteLine("╚═══════════════════════════════════════╝\n");
        
        // কিছু sample data
        students[101] = ("Rahim", 85.5);
        students[102] = ("Karim", 72.0);
        students[103] = ("Jabbar", 90.5);
        
        while (true)
        {
            Console.WriteLine("Commands: add, view, grade, list, exit");
            Console.Write("\n> ");
            string command = Console.ReadLine()?.ToLower();
            
            try
            {
                switch (command)
                {
                    case "add":
                        AddStudent();
                        break;
                    case "view":
                        ViewStudent();
                        break;
                    case "grade":
                        ShowGrade();
                        break;
                    case "list":
                        ListAll();
                        break;
                    case "exit":
                        Console.WriteLine("\nGoodbye! 👋");
                        return;
                    default:
                        Console.WriteLine("❌ Unknown command!\n");
                        break;
                }
            }
            catch (FormatException)
            {
                Console.WriteLine("❌ Invalid format! Please enter correct values.\n");
            }
            catch (KeyNotFoundException)
            {
                Console.WriteLine("❌ Student not found!\n");
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"❌ {ex.Message}\n");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Error: {ex.Message}\n");
            }
        }
    }
    
    static void AddStudent()
    {
        Console.Write("Enter student ID: ");
        int id = int.Parse(Console.ReadLine());
        
        // Check if already exists
        if (students.ContainsKey(id))
        {
            throw new ArgumentException($"Student ID {id} already exists!");
        }
        
        Console.Write("Enter name: ");
        string name = Console.ReadLine();
        
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Name cannot be empty!");
        }
        
        Console.Write("Enter marks (0-100): ");
        double marks = double.Parse(Console.ReadLine());
        
        // Validate marks
        if (marks < 0 || marks > 100)
        {
            throw new ArgumentException("Marks must be between 0 and 100!");
        }
        
        students[id] = (name, marks);
        Console.WriteLine($"✅ Student {name} added successfully!\n");
    }
    
    static void ViewStudent()
    {
        Console.Write("Enter student ID: ");
        int id = int.Parse(Console.ReadLine());
        
        // KeyNotFoundException হতে পারে
        var student = students[id];
        
        Console.WriteLine();
        Console.WriteLine("┌─────────────────────────────────┐");
        Console.WriteLine($"│  ID: {id}");
        Console.WriteLine($"│  Name: {student.Name}");
        Console.WriteLine($"│  Marks: {student.Marks}");
        Console.WriteLine($"│  Grade: {GetGrade(student.Marks)}");
        Console.WriteLine("└─────────────────────────────────┘");
        Console.WriteLine();
    }
    
    static void ShowGrade()
    {
        Console.Write("Enter marks: ");
        double marks = double.Parse(Console.ReadLine());
        
        if (marks < 0 || marks > 100)
        {
            throw new ArgumentException("Marks must be between 0 and 100!");
        }
        
        Console.WriteLine($"Grade: {GetGrade(marks)}\n");
    }
    
    static string GetGrade(double marks)
    {
        if (marks >= 80) return "A+";
        if (marks >= 70) return "A";
        if (marks >= 60) return "B";
        if (marks >= 50) return "C";
        if (marks >= 40) return "D";
        return "F";
    }
    
    static void ListAll()
    {
        if (students.Count == 0)
        {
            Console.WriteLine("No students found!\n");
            return;
        }
        
        Console.WriteLine();
        Console.WriteLine("┌─────┬──────────────┬────────┬───────┐");
        Console.WriteLine("│ ID  │ Name         │ Marks  │ Grade │");
        Console.WriteLine("├─────┼──────────────┼────────┼───────┤");
        
        foreach (var kvp in students)
        {
            Console.WriteLine($"│ {kvp.Key,-3} │ {kvp.Value.Name,-12} │ {kvp.Value.Marks,-6} │ {GetGrade(kvp.Value.Marks),-5} │");
        }
        
        Console.WriteLine("└─────┴──────────────┴────────┴───────┘");
        Console.WriteLine();
    }
}
```

---

### Sample Run:

```
╔═══════════════════════════════════════╗
║     📚 STUDENT GRADE SYSTEM          ║
╚═══════════════════════════════════════╝

Commands: add, view, grade, list, exit

> list

┌─────┬──────────────┬────────┬───────┐
│ ID  │ Name         │ Marks  │ Grade │
├─────┼──────────────┼────────┼───────┤
│ 101 │ Rahim        │ 85.5   │ A+    │
│ 102 │ Karim        │ 72     │ A     │
│ 103 │ Jabbar       │ 90.5   │ A+    │
└─────┴──────────────┴────────┴───────┘

> view
Enter student ID: 101

┌─────────────────────────────────┐
│  ID: 101
│  Name: Rahim
│  Marks: 85.5
│  Grade: A+
└─────────────────────────────────┘

> view
Enter student ID: 999
❌ Student not found!

> add
Enter student ID: 104
Enter name: Salam
Enter marks (0-100): 65.5
✅ Student Salam added successfully!

> add
Enter student ID: 104
❌ Student ID 104 already exists!

> add
Enter student ID: 105
Enter name: 
❌ Name cannot be empty!

> grade
Enter marks: 150
❌ Marks must be between 0 and 100!

> exit

Goodbye! 👋
```

---

## Complete Example ৩: File Operations with Finally

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        Console.WriteLine("╔═══════════════════════════════════════╗");
        Console.WriteLine("║        📄 FILE READER                 ║");
        Console.WriteLine("╚═══════════════════════════════════════╝\n");
        
        StreamReader reader = null;
        
        try
        {
            Console.Write("Enter filename: ");
            string filename = Console.ReadLine();
            
            Console.WriteLine($"\n📂 Opening file: {filename}");
            
            // FileNotFoundException হতে পারে
            reader = new StreamReader(filename);
            
            Console.WriteLine("📖 Reading content...\n");
            
            string content = reader.ReadToEnd();
            
            Console.WriteLine("╔═══════════════════════════════════════╗");
            Console.WriteLine("║           FILE CONTENT                ║");
            Console.WriteLine("╠═══════════════════════════════════════╣");
            
            // প্রতিটা line print করো
            string[] lines = content.Split('\n');
            foreach (string line in lines)
            {
                Console.WriteLine($"║ {line,-37} ║");
            }
            
            Console.WriteLine("╚═══════════════════════════════════════╝");
            
            Console.WriteLine($"\n📊 Statistics:");
            Console.WriteLine($"   Characters: {content.Length}");
            Console.WriteLine($"   Lines: {lines.Length}");
            Console.WriteLine($"   Words: {content.Split(new char[] {' ', '\n', '\r'}, StringSplitOptions.RemoveEmptyEntries).Length}");
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine("╔═════════════════════════════════════════╗");
            Console.WriteLine("║  ❌ ERROR: File not found!              ║");
            Console.WriteLine("║     Please check the filename.         ║");
            Console.WriteLine("╚═════════════════════════════════════════╝");
        }
        catch (UnauthorizedAccessException)
        {
            Console.WriteLine("╔═════════════════════════════════════════╗");
            Console.WriteLine("║  ❌ ERROR: Access denied!               ║");
            Console.WriteLine("║     You don't have permission to       ║");
            Console.WriteLine("║     read this file.                    ║");
            Console.WriteLine("╚═════════════════════════════════════════╝");
        }
        catch (IOException ex)
        {
            Console.WriteLine("╔═════════════════════════════════════════╗");
            Console.WriteLine("║  ❌ ERROR: Cannot read file!            ║");
            Console.WriteLine($"║  {ex.Message,-39} ║");
            Console.WriteLine("╚═════════════════════════════════════════╝");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"❌ Unexpected error: {ex.Message}");
        }
        finally
        {
            // ─────────────── CLEANUP ───────────────
            // এটা ALWAYS execute হবে!
            
            Console.WriteLine("\n🧹 Cleanup:");
            
            if (reader != null)
            {
                reader.Close();
                reader.Dispose();
                Console.WriteLine("   ✓ File handle closed");
                Console.WriteLine("   ✓ Resources released");
            }
            else
            {
                Console.WriteLine("   ✓ No resources to clean up");
            }
        }
        
        Console.WriteLine("\n✅ Program completed normally.");
    }
}
```

---

## Summary

```
╔═══════════════════════════════════════════════════════════════════════╗
║                    EXCEPTION HANDLING SUMMARY                         ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  SYNTAX:                                                              ║
║  ───────                                                              ║
║  try                                                                  ║
║  {                                                                    ║
║      // Risky code                                                    ║
║  }                                                                    ║
║  catch (SpecificException ex)                                        ║
║  {                                                                    ║
║      // Handle specific error                                         ║
║  }                                                                    ║
║  catch (Exception ex)                                                ║
║  {                                                                    ║
║      // Handle any other error                                        ║
║  }                                                                    ║
║  finally                                                              ║
║  {                                                                    ║
║      // Always runs - cleanup                                         ║
║  }                                                                    ║
║                                                                       ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  KEY RULES:                                                           ║
║  ──────────                                                           ║
║  1. try block এ error হলে বাকি code skip হয়                          ║
║  2. Specific catch আগে, General catch পরে                            ║
║  3. finally ALWAYS execute হয়                                        ║
║  4. ex.Message দিয়ে error description পাওয়া যায়                     ║
║                                                                       ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  COMMON EXCEPTIONS:                                                   ║
║  ──────────────────                                                   ║
║  • DivideByZeroException  → 0 দিয়ে ভাগ                               ║
║  • NullReferenceException → null object access                       ║
║  • FormatException        → ভুল format convert                       ║
║  • IndexOutOfRangeException → invalid array index                    ║
║  • FileNotFoundException  → file নেই                                 ║
║  • ArgumentException      → invalid argument                         ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

**Next Part এ:** throw keyword, Custom Exceptions শিখবো!

---

*CPS Academy - Learn. Code. Grow.*
