---
title: 'Part 33: Queue<T> - FIFO'
date: '2026-01-20'
excerpt: 'Part 33: Queue - First In First Out শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - collections
  - queue
  - tutorial
draft: false
---

# Part 33: Queue<T> - First In First Out (FIFO)

## আগের Part এ কী শিখলাম?

**Stack<T>** শিখলাম - LIFO (Last In First Out):

```
Stack: থালার মতো - উপরে রাখো, উপর থেকে নাও

        ┌─────┐
        │  C  │ ← Last In, First Out
        ├─────┤
        │  B  │
        ├─────┤
        │  A  │
        └─────┘
```

আজকে শিখবো **Queue<T>** - এটা Stack এর **উল্টা**!

---

## গল্প দিয়ে শুরু করি

### Bank এর লাইন

ধরো তুমি Bank এ গেছো। অনেক মানুষ লাইনে দাঁড়িয়ে আছে:

```
        COUNTER
           ↓
    ┌─────────────┐
    │   কাউন্টার   │
    └─────────────┘
           ↑
    ┌─────────────┐
    │   Rahim     │  ← সবার আগে এসেছিলো (1st)
    └─────────────┘
           ↑
    ┌─────────────┐
    │   Karim     │  ← 2nd এ এসেছিলো
    └─────────────┘
           ↑
    ┌─────────────┐
    │   Jabbar    │  ← 3rd এ এসেছিলো
    └─────────────┘
           ↑
    ┌─────────────┐
    │   Alam      │  ← সবার পরে এসেছে (Last)
    └─────────────┘
        
        ENTRANCE
```

**কে আগে service পাবে?**

**Rahim!** কারণ সে **আগে** এসেছিলো।

**কে সবার পরে service পাবে?**

**Alam!** কারণ সে **সবার পরে** এসেছে।

---

### এটাই FIFO - First In First Out

```
FIFO = First In First Out

যে সবার আগে (First) ঢুকেছে,
সে সবার আগে (First) বের হবে!
```

---

### Stack vs Queue - পার্থক্য

```
╔═══════════════════════════════════════════════════════════════════╗
║                    STACK vs QUEUE                                 ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║         STACK (LIFO)              QUEUE (FIFO)                   ║
║                                                                   ║
║         ┌─────┐                                                   ║
║         │  C  │ ← Last In         ┌─────┬─────┬─────┬─────┐      ║
║         ├─────┤    First Out      │  A  │  B  │  C  │  D  │      ║
║         │  B  │                   └─────┴─────┴─────┴─────┘      ║
║         ├─────┤                      ↑                    ↑       ║
║         │  A  │                   First In            Last In    ║
║         └─────┘                   First Out                       ║
║                                                                   ║
║    থালার Stack              Bank এর Line                         ║
║    উপরে রাখো, উপর থেকে নাও     পেছনে ঢোকো, সামনে থেকে বের হও     ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
```

| Stack | Queue |
|-------|-------|
| LIFO - Last In First Out | FIFO - First In First Out |
| থালার Stack | Bank এর Line |
| Push (উপরে), Pop (উপর থেকে) | Enqueue (পেছনে), Dequeue (সামনে থেকে) |
| Undo/Redo, Back button | Print Queue, Task Scheduling |

---

## Real-life Examples যেখানে Queue ব্যবহার হয়

### ১. Print Queue (Printer)

Office এ একটাই Printer। অনেকে print দিচ্ছে:

```
Time 9:00 - Rahim দিলো "Report.pdf"
Time 9:01 - Karim দিলো "Invoice.pdf"
Time 9:02 - Jabbar দিলো "Letter.pdf"

Print Queue:
┌──────────────┬──────────────┬──────────────┐
│  Report.pdf  │  Invoice.pdf │  Letter.pdf  │
└──────────────┴──────────────┴──────────────┘
     ↑                                 ↑
  First In                          Last In
  (এটা আগে print হবে)           (এটা পরে print হবে)
```

**Rahim এর document আগে print হবে কারণ সে আগে দিয়েছে!**

---

### ২. Customer Support Call Center

যখন তুমি কোনো company তে call করো এবং শুনো:
> "আপনার call গুরুত্বপূর্ণ। আপনি queue তে ৫ নম্বরে আছেন..."

```
Call Queue:
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  Customer 1  │  Customer 2  │  Customer 3  │     You      │
└──────────────┴──────────────┴──────────────┴──────────────┘
      ↑                                              ↑
   এখন serve হচ্ছে                            তুমি এখানে
   (সবার আগে call করেছিলো)                   (সবার পরে call করেছো)
```

**যে আগে call করেছে, সে আগে agent এর সাথে কথা বলবে!**

---

### ৩. Task Scheduling (Computer)

Computer এ অনেক program একসাথে চলে। CPU একবারে একটাই কাজ করতে পারে:

```
Task Queue:
┌───────────┬───────────┬───────────┬───────────┐
│  Task A   │  Task B   │  Task C   │  Task D   │
└───────────┴───────────┴───────────┴───────────┘
     ↑                                    ↑
  First Run                           Last Run
  (এখন execute হচ্ছে)              (সবশেষে execute হবে)
```

---

### ৪. Movie Theater Ticket Counter

```
Ticket Queue:
┌──────────┬──────────┬──────────┬──────────┬──────────┐
│ Person 1 │ Person 2 │ Person 3 │ Person 4 │ Person 5 │
└──────────┴──────────┴──────────┴──────────┴──────────┘
     ↑                                            ↑
  Counter এ                                   Line এর শেষে
  (Ticket কিনছে)                              (Wait করছে)
```

**যে আগে line এ দাঁড়িয়েছে, সে আগে ticket পাবে!**

---

### ৫. Restaurant Order Queue

```
Kitchen Order Queue:
┌──────────────┬──────────────┬──────────────┐
│  Order #101  │  Order #102  │  Order #103  │
│   (Burger)   │   (Pizza)    │   (Pasta)    │
└──────────────┴──────────────┴──────────────┘
      ↑                               ↑
   এখন রান্না হচ্ছে              সবশেষে রান্না হবে
```

---

## Queue<T> তৈরি করা

### Empty Queue

```csharp
using System.Collections.Generic;

// Empty queue of strings
Queue<string> customers = new Queue<string>();

// Empty queue of integers
Queue<int> numbers = new Queue<int>();

// Empty queue of custom objects
Queue<Order> orders = new Queue<Order>();
```

---

### `Queue<string>` এর প্রতিটা part:

```
Queue<string> customers = new Queue<string>();
──┬── ───┬───  ───┬────   ──┬── ───┬───
  │      │        │         │      │
  │      │        │         │      └── Type parameter
  │      │        │         │
  │      │        │         └── new keyword
  │      │        │
  │      │        └── Variable name
  │      │
  │      └── Type parameter (কী রাখবে)
  │
  └── Queue class
```

---

### Initial Values সহ

```csharp
// Array বা collection থেকে Queue
string[] names = { "Rahim", "Karim", "Jabbar" };
Queue<string> queue = new Queue<string>(names);
```

**এখন Queue তে:**

```
┌─────────┬─────────┬─────────┐
│  Rahim  │  Karim  │ Jabbar  │
└─────────┴─────────┴─────────┘
     ↑                   ↑
   Front              Back
   (First)            (Last)
```

---

## Enqueue() - Queue তে ঢোকাও

**Enqueue()** মানে Queue এর **পেছনে** (back এ) item রাখো।

**মনে রাখো:** "En-queue" = "Enter the queue" = "Queue তে ঢোকো"

```csharp
Queue<string> line = new Queue<string>();

line.Enqueue("Rahim");
line.Enqueue("Karim");
line.Enqueue("Jabbar");
line.Enqueue("Alam");
```

---

### Step by Step দেখি:

```
Initial: Empty Queue
         (nothing)


After Enqueue("Rahim"):
         ┌─────────┐
         │  Rahim  │
         └─────────┘
            ↑
         Front & Back (একজনই আছে)


After Enqueue("Karim"):
         ┌─────────┬─────────┐
         │  Rahim  │  Karim  │
         └─────────┴─────────┘
             ↑          ↑
           Front      Back


After Enqueue("Jabbar"):
         ┌─────────┬─────────┬─────────┐
         │  Rahim  │  Karim  │ Jabbar  │
         └─────────┴─────────┴─────────┘
             ↑                    ↑
           Front                Back


After Enqueue("Alam"):
         ┌─────────┬─────────┬─────────┬─────────┐
         │  Rahim  │  Karim  │ Jabbar  │  Alam   │
         └─────────┴─────────┴─────────┴─────────┘
             ↑                              ↑
           Front                          Back
         (First In)                     (Last In)
         
Count = 4
```

---

### Code Example:

```csharp
Queue<string> line = new Queue<string>();

Console.WriteLine($"Count: {line.Count}");  // 0

line.Enqueue("Rahim");
Console.WriteLine($"Enqueued: Rahim, Count: {line.Count}");  // 1

line.Enqueue("Karim");
Console.WriteLine($"Enqueued: Karim, Count: {line.Count}");  // 2

line.Enqueue("Jabbar");
Console.WriteLine($"Enqueued: Jabbar, Count: {line.Count}");  // 3
```

**Output:**
```
Count: 0
Enqueued: Rahim, Count: 1
Enqueued: Karim, Count: 2
Enqueued: Jabbar, Count: 3
```

---

### Bank Line এর মতো ভাবো:

```
Bank Line:

         COUNTER (Front)
              ↓
         ┌─────────┐
         │  Rahim  │  ← এখন service পাচ্ছে
         └─────────┘
              ↑
         ┌─────────┐
         │  Karim  │  ← Wait করছে
         └─────────┘
              ↑
         ┌─────────┐
         │ Jabbar  │  ← Wait করছে
         └─────────┘
              ↑
         ┌─────────┐
         │  Alam   │  ← সবার পরে এসেছে (Back)
         └─────────┘
              ↑
         ENTRANCE (নতুন মানুষ এখান দিয়ে ঢোকে)
```

**নতুন কেউ আসলে Alam এর পেছনে দাঁড়াবে!**

---

## Dequeue() - সামনে থেকে বের করো

**Dequeue()** মানে Queue এর **সামনে থেকে** (front থেকে) item বের করে নাও।

**মনে রাখো:** "De-queue" = "Remove from queue" = "Queue থেকে বের হও"

**Important:** Dequeue() করলে item Queue থেকে **চলে যায়**!

```csharp
Queue<string> line = new Queue<string>();

line.Enqueue("Rahim");
line.Enqueue("Karim");
line.Enqueue("Jabbar");

// Dequeue করো
string first = line.Dequeue();
Console.WriteLine($"Dequeued: {first}");  // Rahim
```

---

### Step by Step দেখি:

```
Before Dequeue:
         ┌─────────┬─────────┬─────────┐
         │  Rahim  │  Karim  │ Jabbar  │
         └─────────┴─────────┴─────────┘
             ↑                    ↑
           Front                Back
         (এটা বের হবে)


After Dequeue():  (returns "Rahim")
         ┌─────────┬─────────┐
         │  Karim  │ Jabbar  │
         └─────────┴─────────┘
             ↑          ↑
           Front      Back
         (এখন এটা Front)

Count: 3 → 2


After another Dequeue():  (returns "Karim")
         ┌─────────┐
         │ Jabbar  │
         └─────────┘
             ↑
         Front & Back

Count: 2 → 1


After another Dequeue():  (returns "Jabbar")
         (empty)

Count: 1 → 0
```

---

### Code Example:

```csharp
Queue<string> line = new Queue<string>();

line.Enqueue("Rahim");
line.Enqueue("Karim");
line.Enqueue("Jabbar");

Console.WriteLine($"Queue has {line.Count} people\n");  // 3

// Dequeue one by one
string p1 = line.Dequeue();
Console.WriteLine($"Served: {p1}, Remaining: {line.Count}");

string p2 = line.Dequeue();
Console.WriteLine($"Served: {p2}, Remaining: {line.Count}");

string p3 = line.Dequeue();
Console.WriteLine($"Served: {p3}, Remaining: {line.Count}");
```

**Output:**
```
Queue has 3 people

Served: Rahim, Remaining: 2
Served: Karim, Remaining: 1
Served: Jabbar, Remaining: 0
```

**লক্ষ্য করো:** Rahim, Karim, Jabbar - **same order** এ বের হলো! (FIFO)

**Stack হলে:** Jabbar, Karim, Rahim - **reverse order** এ বের হতো! (LIFO)

---

### Stack vs Queue - Dequeue Order

```
Same input: Rahim, Karim, Jabbar (এই order এ ঢোকালে)

Stack Pop() order:    Jabbar → Karim → Rahim (Reverse!)
Queue Dequeue() order: Rahim → Karim → Jabbar (Same!)
```

---

### ⚠️ Empty Queue তে Dequeue() করলে Error!

```csharp
Queue<int> numbers = new Queue<int>();

int item = numbers.Dequeue();  // ❌ ERROR!
```

**Error:** `InvalidOperationException: Queue empty.`

---

### Safe Way ১: Count Check

```csharp
Queue<int> numbers = new Queue<int>();

if (numbers.Count > 0)
{
    int item = numbers.Dequeue();
    Console.WriteLine($"Dequeued: {item}");
}
else
{
    Console.WriteLine("Queue is empty!");
}
```

---

### Safe Way ২: TryDequeue() (C# 8.0+)

```csharp
Queue<int> numbers = new Queue<int>();

if (numbers.TryDequeue(out int item))
{
    Console.WriteLine($"Dequeued: {item}");
}
else
{
    Console.WriteLine("Queue is empty!");
}
```

**TryDequeue() কীভাবে কাজ করে:**

```
TryDequeue(out int item)
           ────┬─────
               │
               └── পেলে এখানে value রাখবে

Return: true = পেয়েছে, false = Queue empty ছিল
```

---

## Peek() - দেখো কিন্তু বের করো না

**Peek()** মানে Front এর item টা দেখো, কিন্তু Queue থেকে বের করো না।

```csharp
Queue<string> line = new Queue<string>();

line.Enqueue("Rahim");
line.Enqueue("Karim");
line.Enqueue("Jabbar");

// Peek করো
string first = line.Peek();
Console.WriteLine($"Front: {first}");        // Rahim
Console.WriteLine($"Count: {line.Count}");  // 3 (unchanged!)
```

---

### Dequeue() vs Peek() - পার্থক্য

```
                  Dequeue()                    Peek()
            ┌───────────────────┐        ┌───────────────────┐
            │                   │        │                   │
Before:     │ [A] [B] [C]       │        │ [A] [B] [C]       │
            │  ↑                │        │  ↑                │
            │ Front             │        │ Front             │
            │                   │        │                   │
            └─────────┬─────────┘        └─────────┬─────────┘
                      │                            │
                      ▼                            ▼
            ┌───────────────────┐        ┌───────────────────┐
            │  Returns "A"      │        │  Returns "A"      │
            │                   │        │                   │
After:      │ [B] [C]           │        │ [A] [B] [C]       │
            │  ↑                │        │  ↑                │
            │ Front (changed!)  │        │ Front (unchanged) │
            │                   │        │                   │
            │ Count = 2         │        │ Count = 3         │
            │ (removed!)        │        │ (still there!)    │
            └───────────────────┘        └───────────────────┘
```

| Method | Item বের করে? | Count কমে? |
|--------|---------------|------------|
| Dequeue() | হ্যাঁ, নিয়ে নেয় | হ্যাঁ |
| Peek() | না, শুধু দেখায় | না |

---

### কখন Peek() use করবে?

- Front এ কে আছে জানতে চাও, কিন্তু remove করতে চাও না
- Decision নিতে চাও front item দেখে

```csharp
Queue<string> customers = new Queue<string>();
customers.Enqueue("Rahim");
customers.Enqueue("Karim");

// পরের customer কে জানতে চাও
string nextCustomer = customers.Peek();
Console.WriteLine($"Next customer: {nextCustomer}");

// Decision নাও
Console.Write("Ready to serve? (y/n): ");
string answer = Console.ReadLine();

if (answer == "y")
{
    string served = customers.Dequeue();  // এখন remove করো
    Console.WriteLine($"Now serving: {served}");
}
```

---

### ⚠️ Empty Queue তে Peek() করলেও Error!

```csharp
Queue<int> numbers = new Queue<int>();

int front = numbers.Peek();  // ❌ ERROR!
```

**Safe Way: TryPeek()**

```csharp
if (numbers.TryPeek(out int front))
{
    Console.WriteLine($"Front: {front}");
}
else
{
    Console.WriteLine("Queue is empty!");
}
```

---

## Other Useful Methods & Properties

### Count - কতগুলো item আছে?

```csharp
Queue<int> numbers = new Queue<int>();

Console.WriteLine(numbers.Count);  // 0

numbers.Enqueue(10);
numbers.Enqueue(20);
Console.WriteLine(numbers.Count);  // 2

numbers.Dequeue();
Console.WriteLine(numbers.Count);  // 1
```

---

### Clear() - সব মুছে দাও

```csharp
Queue<int> numbers = new Queue<int>();

numbers.Enqueue(10);
numbers.Enqueue(20);
numbers.Enqueue(30);

Console.WriteLine(numbers.Count);  // 3

numbers.Clear();

Console.WriteLine(numbers.Count);  // 0
```

---

### Contains() - আছে কিনা?

```csharp
Queue<string> fruits = new Queue<string>();

fruits.Enqueue("Apple");
fruits.Enqueue("Banana");
fruits.Enqueue("Mango");

Console.WriteLine(fruits.Contains("Banana"));  // True
Console.WriteLine(fruits.Contains("Orange"));  // False
```

---

### ToArray() - Array তে Convert

```csharp
Queue<int> numbers = new Queue<int>();

numbers.Enqueue(1);
numbers.Enqueue(2);
numbers.Enqueue(3);

int[] arr = numbers.ToArray();

// arr = [1, 2, 3]  ← Front to Back order!
foreach (int n in arr)
{
    Console.WriteLine(n);
}
```

**Output:**
```
1
2
3
```

**Note:** ToArray() তে Front item আগে আসে! (Stack এ উল্টা ছিল)

---

### Loop করা (foreach)

```csharp
Queue<string> queue = new Queue<string>();

queue.Enqueue("A");
queue.Enqueue("B");
queue.Enqueue("C");

foreach (string item in queue)
{
    Console.WriteLine(item);
}
```

**Output:**
```
A
B
C
```

**Note:** foreach ও Front থেকে Back order এ যায়!

---

## Complete Example ১: Print Queue

**Printer এ documents queue করা:**

### আগে বুঝি - Print Queue কীভাবে কাজ করে?

```
User 1 print দিলো "Report.pdf"    → Queue এ ঢুকলো
User 2 print দিলো "Invoice.pdf"   → Queue এ ঢুকলো
User 3 print দিলো "Letter.pdf"    → Queue এ ঢুকলো

Printer যে order এ print করবে:
1. Report.pdf (First In)
2. Invoice.pdf
3. Letter.pdf (Last In)
```

---

### Full Code:

```csharp
using System;
using System.Collections.Generic;

class PrintJob
{
    public string FileName;
    public int Pages;
    public string User;
    
    public PrintJob(string fileName, int pages, string user)
    {
        FileName = fileName;
        Pages = pages;
        User = user;
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("🖨️ PRINT QUEUE SIMULATOR\n");
        Console.WriteLine("Commands: add <file> <pages> <user>, print, show, exit\n");
        
        Queue<PrintJob> printQueue = new Queue<PrintJob>();
        
        while (true)
        {
            Console.Write("> ");
            string input = Console.ReadLine();
            string[] parts = input.Split(' ');
            
            if (parts[0] == "exit")
            {
                Console.WriteLine("Printer shutting down!");
                break;
            }
            else if (parts[0] == "add" && parts.Length >= 4)
            {
                // নতুন print job add করো
                string fileName = parts[1];
                int pages = int.Parse(parts[2]);
                string user = parts[3];
                
                PrintJob job = new PrintJob(fileName, pages, user);
                printQueue.Enqueue(job);
                
                Console.WriteLine($"✓ Added to queue: {fileName} ({pages} pages) by {user}");
                Console.WriteLine($"  Position in queue: {printQueue.Count}");
            }
            else if (parts[0] == "print")
            {
                // পরের document print করো
                if (printQueue.Count > 0)
                {
                    PrintJob job = printQueue.Dequeue();
                    
                    Console.WriteLine($"\n📄 PRINTING...");
                    Console.WriteLine($"   File: {job.FileName}");
                    Console.WriteLine($"   Pages: {job.Pages}");
                    Console.WriteLine($"   User: {job.User}");
                    Console.WriteLine($"   ✓ Print complete!");
                    Console.WriteLine($"\n   Remaining in queue: {printQueue.Count}");
                }
                else
                {
                    Console.WriteLine("Queue is empty! Nothing to print.");
                }
            }
            else if (parts[0] == "show")
            {
                // Queue দেখাও
                if (printQueue.Count == 0)
                {
                    Console.WriteLine("Queue is empty!");
                }
                else
                {
                    Console.WriteLine($"\n📋 Print Queue ({printQueue.Count} jobs):");
                    Console.WriteLine("─────────────────────────────────────");
                    
                    int position = 1;
                    foreach (PrintJob job in printQueue)
                    {
                        string status = position == 1 ? "→ NEXT" : "";
                        Console.WriteLine($"  {position}. {job.FileName} ({job.Pages} pages) - {job.User} {status}");
                        position++;
                    }
                    Console.WriteLine();
                }
            }
            else
            {
                Console.WriteLine("Unknown command! Use: add, print, show, exit");
            }
        }
    }
}
```

---

### Code এর প্রতিটা অংশ বুঝি:

**১. PrintJob Class:**

```csharp
class PrintJob
{
    public string FileName;  // File এর নাম
    public int Pages;        // কত pages
    public string User;      // কে দিয়েছে
}
```

এক একটা print job এর information রাখছে।

---

**২. Queue তৈরি:**

```csharp
Queue<PrintJob> printQueue = new Queue<PrintJob>();
```

PrintJob objects এর Queue।

---

**৩. "add" command:**

```csharp
PrintJob job = new PrintJob(fileName, pages, user);
printQueue.Enqueue(job);
```

নতুন job বানিয়ে Queue তে ঢোকাও।

---

**৪. "print" command:**

```csharp
if (printQueue.Count > 0)
{
    PrintJob job = printQueue.Dequeue();
    // job print করো
}
```

Queue থেকে front এর job নাও এবং print করো।

---

### Sample Run:

```
🖨️ PRINT QUEUE SIMULATOR

Commands: add <file> <pages> <user>, print, show, exit

> add Report.pdf 5 Rahim
✓ Added to queue: Report.pdf (5 pages) by Rahim
  Position in queue: 1

> add Invoice.pdf 2 Karim
✓ Added to queue: Invoice.pdf (2 pages) by Karim
  Position in queue: 2

> add Letter.pdf 1 Jabbar
✓ Added to queue: Letter.pdf (1 pages) by Jabbar
  Position in queue: 3

> show

📋 Print Queue (3 jobs):
─────────────────────────────────────
  1. Report.pdf (5 pages) - Rahim → NEXT
  2. Invoice.pdf (2 pages) - Karim 
  3. Letter.pdf (1 pages) - Jabbar

> print

📄 PRINTING...
   File: Report.pdf
   Pages: 5
   User: Rahim
   ✓ Print complete!

   Remaining in queue: 2

> show

📋 Print Queue (2 jobs):
─────────────────────────────────────
  1. Invoice.pdf (2 pages) - Karim → NEXT
  2. Letter.pdf (1 pages) - Jabbar

> print

📄 PRINTING...
   File: Invoice.pdf
   Pages: 2
   User: Karim
   ✓ Print complete!

   Remaining in queue: 1

> exit
Printer shutting down!
```

---

### Visual Flow:

```
╔════════════════════════════════════════════════════════════════════╗
║                    PRINT QUEUE FLOW                                ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                    ║
║  add "Report.pdf"                                                  ║
║  ─────────────────                                                 ║
║  Queue: [Report.pdf]                                               ║
║            ↑                                                       ║
║          Front                                                     ║
║                                                                    ║
║  add "Invoice.pdf"                                                 ║
║  ──────────────────                                                ║
║  Queue: [Report.pdf] → [Invoice.pdf]                               ║
║            ↑                 ↑                                     ║
║          Front             Back                                    ║
║                                                                    ║
║  add "Letter.pdf"                                                  ║
║  ─────────────────                                                 ║
║  Queue: [Report.pdf] → [Invoice.pdf] → [Letter.pdf]                ║
║            ↑                                ↑                      ║
║          Front                            Back                     ║
║                                                                    ║
║  ────────────────────────────────────────────────────────────────  ║
║                                                                    ║
║  print (1st time)                                                  ║
║  ─────────────────                                                 ║
║  Dequeue() → Report.pdf (PRINTING...)                              ║
║  Queue: [Invoice.pdf] → [Letter.pdf]                               ║
║            ↑                 ↑                                     ║
║          Front             Back                                    ║
║                                                                    ║
║  print (2nd time)                                                  ║
║  ─────────────────                                                 ║
║  Dequeue() → Invoice.pdf (PRINTING...)                             ║
║  Queue: [Letter.pdf]                                               ║
║            ↑                                                       ║
║       Front & Back                                                 ║
║                                                                    ║
║  print (3rd time)                                                  ║
║  ─────────────────                                                 ║
║  Dequeue() → Letter.pdf (PRINTING...)                              ║
║  Queue: (empty)                                                    ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## Complete Example ২: Customer Support System

**Customer call queue manage করা:**

### আগে বুঝি - Support System কীভাবে কাজ করে?

```
Customer call করলে:
1. Queue তে ঢোকে
2. তার position জানানো হয়
3. Agent available হলে Front এর customer কে serve করে

FIFO - যে আগে call করেছে, সে আগে service পাবে!
```

---

### Full Code:

```csharp
using System;
using System.Collections.Generic;

class Customer
{
    public int TicketNumber;
    public string Name;
    public string Issue;
    public DateTime JoinTime;
    
    public Customer(int ticket, string name, string issue)
    {
        TicketNumber = ticket;
        Name = name;
        Issue = issue;
        JoinTime = DateTime.Now;
    }
}

class Program
{
    static int nextTicket = 1001;
    
    static void Main()
    {
        Console.WriteLine("📞 CUSTOMER SUPPORT SYSTEM\n");
        Console.WriteLine("Commands: call <name> <issue>, serve, queue, exit\n");
        
        Queue<Customer> supportQueue = new Queue<Customer>();
        
        while (true)
        {
            Console.Write("> ");
            string input = Console.ReadLine();
            
            if (input == "exit")
            {
                Console.WriteLine("Support system closed!");
                break;
            }
            else if (input.StartsWith("call "))
            {
                // নতুন customer
                string[] parts = input.Substring(5).Split(' ', 2);
                
                if (parts.Length >= 2)
                {
                    string name = parts[0];
                    string issue = parts[1];
                    
                    Customer customer = new Customer(nextTicket++, name, issue);
                    supportQueue.Enqueue(customer);
                    
                    Console.WriteLine($"\n✓ Welcome, {name}!");
                    Console.WriteLine($"  Your ticket number: #{customer.TicketNumber}");
                    Console.WriteLine($"  Issue: {issue}");
                    Console.WriteLine($"  Position in queue: {supportQueue.Count}");
                    
                    if (supportQueue.Count == 1)
                    {
                        Console.WriteLine($"  You're next! An agent will be with you shortly.");
                    }
                    else
                    {
                        Console.WriteLine($"  Estimated wait: {(supportQueue.Count - 1) * 5} minutes");
                    }
                    Console.WriteLine();
                }
            }
            else if (input == "serve")
            {
                // পরের customer serve করো
                if (supportQueue.Count > 0)
                {
                    Customer customer = supportQueue.Dequeue();
                    
                    Console.WriteLine($"\n═══════════════════════════════════════");
                    Console.WriteLine($"  NOW SERVING: #{customer.TicketNumber}");
                    Console.WriteLine($"═══════════════════════════════════════");
                    Console.WriteLine($"  Name: {customer.Name}");
                    Console.WriteLine($"  Issue: {customer.Issue}");
                    Console.WriteLine($"  Wait time: {(DateTime.Now - customer.JoinTime).Seconds} seconds");
                    Console.WriteLine($"\n  Remaining customers: {supportQueue.Count}");
                    
                    if (supportQueue.Count > 0)
                    {
                        Customer next = supportQueue.Peek();
                        Console.WriteLine($"  Next up: #{next.TicketNumber} - {next.Name}");
                    }
                    Console.WriteLine();
                }
                else
                {
                    Console.WriteLine("No customers waiting!");
                }
            }
            else if (input == "queue")
            {
                // Queue দেখাও
                if (supportQueue.Count == 0)
                {
                    Console.WriteLine("\n✓ No customers waiting!\n");
                }
                else
                {
                    Console.WriteLine($"\n📋 Support Queue ({supportQueue.Count} customers):");
                    Console.WriteLine("───────────────────────────────────────────");
                    
                    int position = 1;
                    foreach (Customer c in supportQueue)
                    {
                        string status = position == 1 ? "⭐ NEXT" : "";
                        Console.WriteLine($"  {position}. #{c.TicketNumber} - {c.Name} ({c.Issue}) {status}");
                        position++;
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

**১. Customer Class:**

```csharp
class Customer
{
    public int TicketNumber;  // Ticket number
    public string Name;       // Customer এর নাম
    public string Issue;      // সমস্যা কী
    public DateTime JoinTime; // কখন join করেছে
}
```

---

**২. Ticket Number Generation:**

```csharp
static int nextTicket = 1001;

// নতুন customer আসলে
Customer customer = new Customer(nextTicket++, name, issue);
// nextTicket++ মানে: use করো, তারপর 1 বাড়াও
// 1st customer: 1001
// 2nd customer: 1002
// 3rd customer: 1003 ...
```

---

**৩. "call" command:**

```csharp
Customer customer = new Customer(nextTicket++, name, issue);
supportQueue.Enqueue(customer);
```

নতুন customer বানিয়ে Queue তে ঢোকাও।

---

**৪. "serve" command:**

```csharp
Customer customer = supportQueue.Dequeue();  // Front থেকে নাও
// customer কে serve করো

Customer next = supportQueue.Peek();  // পরের জন কে? (remove না করে)
```

---

### Sample Run:

```
📞 CUSTOMER SUPPORT SYSTEM

Commands: call <name> <issue>, serve, queue, exit

> call Rahim Internet-not-working

✓ Welcome, Rahim!
  Your ticket number: #1001
  Issue: Internet-not-working
  Position in queue: 1
  You're next! An agent will be with you shortly.

> call Karim Billing-problem

✓ Welcome, Karim!
  Your ticket number: #1002
  Issue: Billing-problem
  Position in queue: 2
  Estimated wait: 5 minutes

> call Jabbar Password-reset

✓ Welcome, Jabbar!
  Your ticket number: #1003
  Issue: Password-reset
  Position in queue: 3
  Estimated wait: 10 minutes

> queue

📋 Support Queue (3 customers):
───────────────────────────────────────────
  1. #1001 - Rahim (Internet-not-working) ⭐ NEXT
  2. #1002 - Karim (Billing-problem) 
  3. #1003 - Jabbar (Password-reset) 

> serve

═══════════════════════════════════════
  NOW SERVING: #1001
═══════════════════════════════════════
  Name: Rahim
  Issue: Internet-not-working
  Wait time: 45 seconds

  Remaining customers: 2
  Next up: #1002 - Karim

> serve

═══════════════════════════════════════
  NOW SERVING: #1002
═══════════════════════════════════════
  Name: Karim
  Issue: Billing-problem
  Wait time: 52 seconds

  Remaining customers: 1
  Next up: #1003 - Jabbar

> exit
Support system closed!
```

---

## Complete Example ৩: Task Scheduler

**Tasks execute করা FIFO order এ:**

### Full Code:

```csharp
using System;
using System.Collections.Generic;

class Task
{
    public int Id;
    public string Name;
    public int Duration;  // seconds
    
    public Task(int id, string name, int duration)
    {
        Id = id;
        Name = name;
        Duration = duration;
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("⚙️ TASK SCHEDULER\n");
        
        Queue<Task> taskQueue = new Queue<Task>();
        
        // কিছু tasks add করো
        taskQueue.Enqueue(new Task(1, "Download File", 3));
        taskQueue.Enqueue(new Task(2, "Process Data", 2));
        taskQueue.Enqueue(new Task(3, "Generate Report", 4));
        taskQueue.Enqueue(new Task(4, "Send Email", 1));
        taskQueue.Enqueue(new Task(5, "Backup Database", 5));
        
        Console.WriteLine($"Total tasks in queue: {taskQueue.Count}\n");
        
        // সব tasks দেখাও
        Console.WriteLine("📋 Task Queue:");
        Console.WriteLine("─────────────────────────────────────");
        foreach (Task t in taskQueue)
        {
            Console.WriteLine($"  Task #{t.Id}: {t.Name} ({t.Duration}s)");
        }
        Console.WriteLine();
        
        // Tasks execute করো
        Console.WriteLine("▶️ Starting execution...\n");
        
        int totalTime = 0;
        
        while (taskQueue.Count > 0)
        {
            Task current = taskQueue.Dequeue();
            
            Console.WriteLine($"🔄 Executing Task #{current.Id}: {current.Name}");
            Console.WriteLine($"   Duration: {current.Duration} seconds");
            
            // Simulate execution (just wait)
            System.Threading.Thread.Sleep(current.Duration * 100);  // 100ms per "second"
            
            totalTime += current.Duration;
            
            Console.WriteLine($"   ✓ Complete!");
            Console.WriteLine($"   Remaining tasks: {taskQueue.Count}\n");
        }
        
        Console.WriteLine("═══════════════════════════════════════");
        Console.WriteLine($"✓ All tasks completed!");
        Console.WriteLine($"  Total execution time: {totalTime} seconds");
        Console.WriteLine("═══════════════════════════════════════");
    }
}
```

---

### Code এর প্রতিটা অংশ বুঝি:

**১. Task Class:**

```csharp
class Task
{
    public int Id;        // Task number
    public string Name;   // Task এর নাম
    public int Duration;  // কত সময় লাগবে
}
```

---

**২. Tasks Add করা:**

```csharp
taskQueue.Enqueue(new Task(1, "Download File", 3));
taskQueue.Enqueue(new Task(2, "Process Data", 2));
// ...
```

প্রতিটা task Queue তে ঢুকছে।

---

**৩. Execute Loop:**

```csharp
while (taskQueue.Count > 0)
{
    Task current = taskQueue.Dequeue();  // Front এর task নাও
    
    // Task execute করো
    // ...
}
```

যতক্ষণ Queue তে task আছে, FIFO order এ execute করো।

---

### Output:

```
⚙️ TASK SCHEDULER

Total tasks in queue: 5

📋 Task Queue:
─────────────────────────────────────
  Task #1: Download File (3s)
  Task #2: Process Data (2s)
  Task #3: Generate Report (4s)
  Task #4: Send Email (1s)
  Task #5: Backup Database (5s)

▶️ Starting execution...

🔄 Executing Task #1: Download File
   Duration: 3 seconds
   ✓ Complete!
   Remaining tasks: 4

🔄 Executing Task #2: Process Data
   Duration: 2 seconds
   ✓ Complete!
   Remaining tasks: 3

🔄 Executing Task #3: Generate Report
   Duration: 4 seconds
   ✓ Complete!
   Remaining tasks: 2

🔄 Executing Task #4: Send Email
   Duration: 1 seconds
   ✓ Complete!
   Remaining tasks: 1

🔄 Executing Task #5: Backup Database
   Duration: 5 seconds
   ✓ Complete!
   Remaining tasks: 0

═══════════════════════════════════════
✓ All tasks completed!
  Total execution time: 15 seconds
═══════════════════════════════════════
```

---

### Visual Flow:

```
Initial Queue:
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│ Task 1  │ Task 2  │ Task 3  │ Task 4  │ Task 5  │
└─────────┴─────────┴─────────┴─────────┴─────────┘
    ↑                                       ↑
  Front                                   Back
  (First Execute)                    (Last Execute)


Dequeue() → Task 1 (Execute: Download File)
┌─────────┬─────────┬─────────┬─────────┐
│ Task 2  │ Task 3  │ Task 4  │ Task 5  │
└─────────┴─────────┴─────────┴─────────┘


Dequeue() → Task 2 (Execute: Process Data)
┌─────────┬─────────┬─────────┐
│ Task 3  │ Task 4  │ Task 5  │
└─────────┴─────────┴─────────┘


Dequeue() → Task 3 (Execute: Generate Report)
┌─────────┬─────────┐
│ Task 4  │ Task 5  │
└─────────┴─────────┘


Dequeue() → Task 4 (Execute: Send Email)
┌─────────┐
│ Task 5  │
└─────────┘


Dequeue() → Task 5 (Execute: Backup Database)
(empty)

✓ All Done!
```

---

## Stack vs Queue - Complete Comparison

```
╔═══════════════════════════════════════════════════════════════════════╗
║                    STACK vs QUEUE                                     ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  STACK                              QUEUE                             ║
║  ─────                              ─────                             ║
║  LIFO - Last In First Out           FIFO - First In First Out        ║
║                                                                       ║
║       ┌─────┐                       ┌─────┬─────┬─────┐              ║
║       │  C  │ ← Push/Pop            │  A  │  B  │  C  │              ║
║       ├─────┤                       └─────┴─────┴─────┘              ║
║       │  B  │                          ↑           ↑                  ║
║       ├─────┤                      Dequeue      Enqueue               ║
║       │  A  │                      (Front)      (Back)                ║
║       └─────┘                                                         ║
║                                                                       ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  OPERATIONS:                        OPERATIONS:                       ║
║  • Push(item)  - উপরে রাখো          • Enqueue(item) - পেছনে রাখো      ║
║  • Pop()       - উপর থেকে নাও       • Dequeue()     - সামনে থেকে নাও  ║
║  • Peek()      - উপরেরটা দেখো       • Peek()        - সামনেরটা দেখো   ║
║                                                                       ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  USE CASES:                         USE CASES:                        ║
║  • Undo/Redo                        • Print Queue                     ║
║  • Browser Back/Forward             • Customer Support                ║
║  • Function Call Stack              • Task Scheduling                 ║
║  • Expression Evaluation            • BFS (Graph traversal)           ║
║  • Balanced Parentheses             • Message Queue                   ║
║  • Reverse a String                 • Buffering                       ║
║                                                                       ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  REAL LIFE:                         REAL LIFE:                        ║
║  • থালার Stack                      • Bank এর Line                    ║
║  • বইয়ের স্তূপ                      • Ticket Counter                 ║
║  • Ctrl+Z (Undo)                    • Restaurant Order                ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

---

## Summary - Methods এক নজরে

### Creating:

| Code | কাজ |
|------|-----|
| `new Queue<T>()` | Empty queue |
| `new Queue<T>(collection)` | Collection থেকে |

### Main Operations:

| Method | কাজ | Returns |
|--------|-----|---------|
| `Enqueue(item)` | Back এ রাখো | void |
| `Dequeue()` | Front থেকে নাও (remove) | item |
| `Peek()` | Front দেখো (no remove) | item |
| `TryDequeue(out item)` | Safe Dequeue | bool |
| `TryPeek(out item)` | Safe Peek | bool |

### Other:

| Method/Property | কাজ |
|-----------------|-----|
| `Count` | কতগুলো আছে |
| `Clear()` | সব মুছো |
| `Contains(item)` | আছে কিনা |
| `ToArray()` | Array তে convert |

---

## মনে রাখো

```
┌─────────────────────────────────────────────────────────────┐
│                       QUEUE                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│           FIFO = First In First Out                         │
│                                                             │
│    Enqueue()                              Dequeue()         │
│        ↓                                      ↓             │
│    ┌───────┬───────┬───────┬───────┬───────┐              │
│    │       │       │       │       │       │              │
│    │   A   │   B   │   C   │   D   │   E   │              │
│    │       │       │       │       │       │              │
│    └───────┴───────┴───────┴───────┴───────┘              │
│        ↑                                                    │
│      Front                                                  │
│    (First Out)                                              │
│                                                             │
│    Bank এর Line - যে আগে আসে, সে আগে Service পায়!         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

**Next Part এ:** HashSet<T> - Unique Items Only শিখবো!

---

*CPS Academy - Learn. Code. Grow.*
