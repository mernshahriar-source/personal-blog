---
title: 'Part 31: Dictionary<K,V> - Key-Value Storage'
date: '2026-01-20'
excerpt: 'Part 31: Dictionary - key-value storage শিখুন'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - collections
  - dictionary
  - tutorial
draft: true
---

# Part 31: Dictionary<K,V> - Key-Value Storage

## আগের Part এ কী শিখলাম?

আমরা **List<T>** শিখলাম - Dynamic Array যেখানে index দিয়ে data access করি।

```csharp
List<string> fruits = new List<string> { "Apple", "Banana", "Mango" };

Console.WriteLine(fruits[0]);  // Apple
Console.WriteLine(fruits[1]);  // Banana
```

**কিন্তু একটা সমস্যা আছে...**

---

## গল্প দিয়ে শুরু করি

### সমস্যা: Product Catalog

ধরো তুমি একটা **Shop এর Billing System** বানাচ্ছো।

তোমার কাছে Products আছে:

```
Product ID    Price
──────────    ─────
P001          500 TK
P002          1200 TK
P003          350 TK
P004          800 TK
P005          2500 TK
```

Customer এসে বললো: **"P003 দিন"**

তোমাকে **P003 এর Price** বের করতে হবে।

---

### প্রথম চিন্তা: দুইটা Array/List

```csharp
List<string> productIds = new List<string> { "P001", "P002", "P003", "P004", "P005" };
List<int> prices = new List<int> { 500, 1200, 350, 800, 2500 };
```

**P003 এর price বের করতে হলে:**

```csharp
string searchId = "P003";
int price = 0;

// প্রথম list এ খুঁজতে হবে
for (int i = 0; i < productIds.Count; i++)
{
    if (productIds[i] == searchId)
    {
        price = prices[i];  // same index থেকে price নাও
        break;
    }
}

Console.WriteLine($"Price: {price} TK");  // 350 TK
```

**সমস্যা কী?**

1. **প্রতিবার Loop চালাতে হচ্ছে!** 1000 টা product থাকলে?
2. **দুইটা আলাদা List manage করতে হচ্ছে** - sync রাখা কঠিন
3. **Code লম্বা এবং complicated**

---

### আরেকটা চিন্তা: List of Objects

```csharp
class Product
{
    public string Id;
    public int Price;
}

List<Product> products = new List<Product>();
```

**P003 খুঁজতে হলে:**

```csharp
Product found = products.Find(p => p.Id == "P003");
```

এটা ভালো, কিন্তু **internally এখনো loop চলছে!**

---

### আসল সমস্যাটা কী?

আমি চাই:

```
"P003" দিলাম → সাথে সাথে 350 পেলাম
"P001" দিলাম → সাথে সাথে 500 পেলাম
```

**কোনো Loop ছাড়া, Instant!**

**এটাই করে Dictionary!** 🎉

---

## Dictionary কী?

**Dictionary** হলো **Key-Value Storage** - যেখানে:

- **Key** দিয়ে **Value** রাখো
- **Key** দিলে **Value** পাও (Instant!)

```
┌─────────────────────────────────────────┐
│            DICTIONARY                   │
├──────────────┬──────────────────────────┤
│     KEY      │         VALUE            │
├──────────────┼──────────────────────────┤
│    "P001"    │          500             │
│    "P002"    │         1200             │
│    "P003"    │          350             │
│    "P004"    │          800             │
└──────────────┴──────────────────────────┘

"P003" দিলে → 350 (Instant! No loop!)
```

---

### Real-life Examples

**১. ফোন বুক (Phone Book):**

```
Name (Key)     →    Phone Number (Value)
─────────────       ────────────────────
"Rahim"        →    "01712345678"
"Karim"        →    "01898765432"
"Jabbar"       →    "01511223344"

"Karim" খুঁজলে → "01898765432" পাবো
```

**২. শব্দের অর্থ (Dictionary Book):**

```
Word (Key)     →    Meaning (Value)
─────────────       ────────────────
"Apple"        →    "আপেল"
"Book"         →    "বই"
"Computer"     →    "কম্পিউটার"

"Book" দিলে → "বই" পাবো
```

**৩. Student Roll → Marks:**

```
Roll (Key)     →    Marks (Value)
─────────────       ────────────────
101            →    85
102            →    72
103            →    90

Roll 102 দিলে → 72 পাবো
```

---

### Dictionary vs List

```
List:
Index দিয়ে access করো
fruits[0], fruits[1], fruits[2]
শুধু 0, 1, 2, 3... এভাবে access

Dictionary:
Key দিয়ে access করো
prices["P001"], prices["P002"]
যেকোনো key দিয়ে access!
```

---

## Dictionary তৈরি করা

### ১. Empty Dictionary

```csharp
using System.Collections.Generic;

// Empty dictionary
Dictionary<string, int> productPrices = new Dictionary<string, int>();
```

**`<string, int>` মানে কী?**

```
Dictionary<string, int>
           ──┬──  ─┬─
             │     │
             │     └── Value এর type (int - price)
             │
             └── Key এর type (string - product ID)
```

**তাহলে:**
- Key হবে **string** (যেমন "P001", "P002")
- Value হবে **int** (যেমন 500, 1200)

---

**বিভিন্ন ধরনের Dictionary:**

```csharp
// Product ID (string) → Price (int)
Dictionary<string, int> productPrices = new Dictionary<string, int>();

// Roll (int) → Name (string)
Dictionary<int, string> studentNames = new Dictionary<int, string>();

// Word (string) → Count (int)
Dictionary<string, int> wordCount = new Dictionary<string, int>();

// Name (string) → Phone (string)
Dictionary<string, string> phoneBook = new Dictionary<string, string>();

// Roll (int) → Student object
Dictionary<int, Student> students = new Dictionary<int, Student>();
```

---

### ২. Initial Values সহ

```csharp
// Values দিয়ে শুরু
Dictionary<string, int> productPrices = new Dictionary<string, int>()
{
    { "P001", 500 },
    { "P002", 1200 },
    { "P003", 350 }
};
```

**আরেকটা syntax (C# 6.0+):**

```csharp
Dictionary<string, int> productPrices = new Dictionary<string, int>()
{
    ["P001"] = 500,
    ["P002"] = 1200,
    ["P003"] = 350
};
```

**দুইটাই same কাজ করে।**

---

## Add করা - নতুন Key-Value যোগ

### উপায় ১: Add() Method

```csharp
Dictionary<string, int> prices = new Dictionary<string, int>();

prices.Add("P001", 500);
prices.Add("P002", 1200);
prices.Add("P003", 350);
```

**Visual:**

```
Empty:
┌──────────────┬──────────────┐
│     KEY      │    VALUE     │
├──────────────┼──────────────┤
│   (empty)    │   (empty)    │
└──────────────┴──────────────┘


After Add("P001", 500):
┌──────────────┬──────────────┐
│     KEY      │    VALUE     │
├──────────────┼──────────────┤
│    "P001"    │     500      │
└──────────────┴──────────────┘


After Add("P002", 1200):
┌──────────────┬──────────────┐
│     KEY      │    VALUE     │
├──────────────┼──────────────┤
│    "P001"    │     500      │
│    "P002"    │    1200      │
└──────────────┴──────────────┘


After Add("P003", 350):
┌──────────────┬──────────────┐
│     KEY      │    VALUE     │
├──────────────┼──────────────┤
│    "P001"    │     500      │
│    "P002"    │    1200      │
│    "P003"    │     350      │
└──────────────┴──────────────┘
```

---

### উপায় ২: Indexer [ ] দিয়ে

```csharp
Dictionary<string, int> prices = new Dictionary<string, int>();

prices["P001"] = 500;
prices["P002"] = 1200;
prices["P003"] = 350;
```

**এটাও same কাজ করে!**

---

### ⚠️ সাবধান: Duplicate Key!

**Dictionary তে একই Key দুইবার থাকতে পারে না!**

```csharp
Dictionary<string, int> prices = new Dictionary<string, int>();

prices.Add("P001", 500);
prices.Add("P001", 600);  // ❌ ERROR! "P001" আগেই আছে!
```

**Error:** `ArgumentException: An item with the same key has already been added.`

---

**Add() vs [ ] - পার্থক্য:**

| Add() | [ ] Indexer |
|-------|-------------|
| Duplicate key তে **Error** দেয় | Duplicate key তে **Update** করে |

```csharp
// Add() - Error দেয়
prices.Add("P001", 500);
prices.Add("P001", 600);  // ❌ ERROR!

// [ ] - Update করে
prices["P001"] = 500;
prices["P001"] = 600;  // ✓ OK! P001 এর value এখন 600
```

---

## Value পড়া (Access)

### উপায় ১: Indexer [ ]

```csharp
Dictionary<string, int> prices = new Dictionary<string, int>()
{
    ["P001"] = 500,
    ["P002"] = 1200,
    ["P003"] = 350
};

// Key দিয়ে Value পাও
Console.WriteLine(prices["P001"]);  // 500
Console.WriteLine(prices["P002"]);  // 1200
Console.WriteLine(prices["P003"]);  // 350
```

**এটাই Dictionary এর power!**

```
prices["P003"]  →  350

কোনো Loop নেই!
কোনো Search নেই!
Instant!
```

---

### ⚠️ সাবধান: Key না থাকলে Error!

```csharp
Console.WriteLine(prices["P999"]);  // ❌ ERROR!
```

**Error:** `KeyNotFoundException: The given key 'P999' was not present in the dictionary.`

---

### উপায় ২: TryGetValue() - Safe Way!

**Key আছে কিনা check করে, তারপর value দেয়:**

```csharp
Dictionary<string, int> prices = new Dictionary<string, int>()
{
    ["P001"] = 500,
    ["P002"] = 1200
};

// TryGetValue use করা
if (prices.TryGetValue("P001", out int price))
{
    Console.WriteLine($"Price: {price} TK");  // Price: 500 TK
}
else
{
    Console.WriteLine("Product not found!");
}

// যে key নেই
if (prices.TryGetValue("P999", out int price2))
{
    Console.WriteLine($"Price: {price2} TK");
}
else
{
    Console.WriteLine("Product not found!");  // এটা print হবে
}
```

---

**TryGetValue() কীভাবে কাজ করে?**

```
TryGetValue("P001", out int price)
            ──┬──       ───┬────
              │            │
              │            └── পেলে এখানে value রাখবে
              │
              └── যে key খুঁজছো

Return: true = পেয়েছে, false = পায়নি
```

---

**আরেকটা Safe Way: ContainsKey() + [ ]**

```csharp
string searchKey = "P003";

if (prices.ContainsKey(searchKey))
{
    Console.WriteLine($"Price: {prices[searchKey]} TK");
}
else
{
    Console.WriteLine("Product not found!");
}
```

---

**কোনটা ভালো?**

| Method | Performance |
|--------|-------------|
| `TryGetValue()` | ✅ Better (একবার search) |
| `ContainsKey() + [ ]` | ❌ Slower (দুইবার search) |

**TryGetValue() recommend করা হয়!**

---

## Update করা - Value পরিবর্তন

**Key এর Value change করতে চাইলে:**

```csharp
Dictionary<string, int> prices = new Dictionary<string, int>()
{
    ["P001"] = 500,
    ["P002"] = 1200
};

Console.WriteLine(prices["P001"]);  // 500

// Update
prices["P001"] = 550;

Console.WriteLine(prices["P001"]);  // 550
```

**Visual:**

```
Before:
┌──────────────┬──────────────┐
│     KEY      │    VALUE     │
├──────────────┼──────────────┤
│    "P001"    │     500      │  ← আগের value
│    "P002"    │    1200      │
└──────────────┴──────────────┘


prices["P001"] = 550;


After:
┌──────────────┬──────────────┐
│     KEY      │    VALUE     │
├──────────────┼──────────────┤
│    "P001"    │     550      │  ← নতুন value
│    "P002"    │    1200      │
└──────────────┴──────────────┘
```

---

## Remove করা

### Remove() - Key দিয়ে Remove

```csharp
Dictionary<string, int> prices = new Dictionary<string, int>()
{
    ["P001"] = 500,
    ["P002"] = 1200,
    ["P003"] = 350
};

Console.WriteLine(prices.Count);  // 3

// P002 remove করো
prices.Remove("P002");

Console.WriteLine(prices.Count);  // 2
```

**Visual:**

```
Before Remove:
┌──────────────┬──────────────┐
│     KEY      │    VALUE     │
├──────────────┼──────────────┤
│    "P001"    │     500      │
│    "P002"    │    1200      │  ← এটা remove হবে
│    "P003"    │     350      │
└──────────────┴──────────────┘


After Remove("P002"):
┌──────────────┬──────────────┐
│     KEY      │    VALUE     │
├──────────────┼──────────────┤
│    "P001"    │     500      │
│    "P003"    │     350      │
└──────────────┴──────────────┘
```

---

**Return Value:**

```csharp
bool removed = prices.Remove("P002");
Console.WriteLine(removed);  // True (ছিল, remove করেছে)

bool removed2 = prices.Remove("P999");
Console.WriteLine(removed2);  // False (ছিলই না)
```

---

### Clear() - সব মুছে দাও

```csharp
prices.Clear();

Console.WriteLine(prices.Count);  // 0
```

---

## Search করা

### ContainsKey() - Key আছে কিনা?

```csharp
Dictionary<string, int> prices = new Dictionary<string, int>()
{
    ["P001"] = 500,
    ["P002"] = 1200
};

Console.WriteLine(prices.ContainsKey("P001"));  // True
Console.WriteLine(prices.ContainsKey("P999"));  // False
```

**Real use:**

```csharp
string productId = "P003";

if (prices.ContainsKey(productId))
{
    Console.WriteLine($"✓ {productId} exists!");
}
else
{
    Console.WriteLine($"✗ {productId} not found!");
}
```

---

### ContainsValue() - Value আছে কিনা?

```csharp
Dictionary<string, int> prices = new Dictionary<string, int>()
{
    ["P001"] = 500,
    ["P002"] = 1200
};

Console.WriteLine(prices.ContainsValue(500));   // True
Console.WriteLine(prices.ContainsValue(9999));  // False
```

**⚠️ Note:** `ContainsValue()` slower কারণ এটা internally loop চালায়। `ContainsKey()` fast।

---

## Properties

### Count - কতগুলো Key-Value pair আছে?

```csharp
Dictionary<string, int> prices = new Dictionary<string, int>()
{
    ["P001"] = 500,
    ["P002"] = 1200,
    ["P003"] = 350
};

Console.WriteLine(prices.Count);  // 3

prices.Add("P004", 800);
Console.WriteLine(prices.Count);  // 4

prices.Remove("P001");
Console.WriteLine(prices.Count);  // 3
```

---

### Keys - সব Keys এর collection

```csharp
Dictionary<string, int> prices = new Dictionary<string, int>()
{
    ["P001"] = 500,
    ["P002"] = 1200,
    ["P003"] = 350
};

// সব keys
foreach (string key in prices.Keys)
{
    Console.WriteLine(key);
}
```

**Output:**
```
P001
P002
P003
```

---

### Values - সব Values এর collection

```csharp
// সব values
foreach (int value in prices.Values)
{
    Console.WriteLine(value);
}
```

**Output:**
```
500
1200
350
```

---

## Loop করা

### উপায় ১: foreach with KeyValuePair

**সবচেয়ে common way!**

```csharp
Dictionary<string, int> prices = new Dictionary<string, int>()
{
    ["P001"] = 500,
    ["P002"] = 1200,
    ["P003"] = 350
};

foreach (KeyValuePair<string, int> item in prices)
{
    Console.WriteLine($"Key: {item.Key}, Value: {item.Value}");
}
```

**Output:**
```
Key: P001, Value: 500
Key: P002, Value: 1200
Key: P003, Value: 350
```

---

**KeyValuePair কী?**

```
KeyValuePair<string, int>

এটা একটা struct যার দুইটা property আছে:
- Key (string)
- Value (int)

প্রতিটা item এ Key আর Value দুইটাই access করা যায়।
```

---

### উপায় ২: var দিয়ে (Shorter)

```csharp
foreach (var item in prices)
{
    Console.WriteLine($"{item.Key} = {item.Value} TK");
}
```

**`var`** automatically বুঝে নেয় type কী।

---

### উপায় ৩: Deconstruction (C# 7.0+)

```csharp
foreach (var (key, value) in prices)
{
    Console.WriteLine($"{key} = {value} TK");
}
```

**আরো clean!**

---

### উপায় ৪: শুধু Keys loop

```csharp
foreach (string key in prices.Keys)
{
    Console.WriteLine($"Product: {key}");
}
```

---

### উপায় ৫: শুধু Values loop

```csharp
foreach (int value in prices.Values)
{
    Console.WriteLine($"Price: {value}");
}
```

---

## Real Example ১: Product Catalog

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Console.WriteLine("🛒 PRODUCT CATALOG\n");
        
        // Product catalog
        Dictionary<string, int> catalog = new Dictionary<string, int>()
        {
            ["P001"] = 500,
            ["P002"] = 1200,
            ["P003"] = 350,
            ["P004"] = 800,
            ["P005"] = 2500
        };
        
        // সব products দেখাও
        Console.WriteLine("Available Products:");
        Console.WriteLine("───────────────────");
        
        foreach (var (id, price) in catalog)
        {
            Console.WriteLine($"{id}: {price} TK");
        }
        
        // Customer কিছু কিনতে চায়
        Console.WriteLine("\n═══════════════════");
        Console.Write("Enter Product ID: ");
        string productId = Console.ReadLine();
        
        // Price বের করো
        if (catalog.TryGetValue(productId, out int productPrice))
        {
            Console.WriteLine($"\n✓ {productId} found!");
            Console.WriteLine($"  Price: {productPrice} TK");
        }
        else
        {
            Console.WriteLine($"\n✗ Product '{productId}' not found!");
        }
    }
}
```

**Output:**
```
🛒 PRODUCT CATALOG

Available Products:
───────────────────
P001: 500 TK
P002: 1200 TK
P003: 350 TK
P004: 800 TK
P005: 2500 TK

═══════════════════
Enter Product ID: P003

✓ P003 found!
  Price: 350 TK
```

---

## Real Example ২: Word Counter

**একটা text এ কোন word কতবার আছে count করো:**

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Console.WriteLine("📝 WORD COUNTER\n");
        
        string text = "I love Bangladesh Bangladesh is beautiful I love coding";
        
        // Words আলাদা করো
        string[] words = text.ToLower().Split(' ');
        
        // Word count dictionary
        Dictionary<string, int> wordCount = new Dictionary<string, int>();
        
        // প্রতিটা word count করো
        foreach (string word in words)
        {
            if (wordCount.ContainsKey(word))
            {
                // আগেই আছে, count বাড়াও
                wordCount[word]++;
            }
            else
            {
                // নতুন word, 1 দিয়ে শুরু
                wordCount[word] = 1;
            }
        }
        
        // Result দেখাও
        Console.WriteLine($"Text: \"{text}\"\n");
        Console.WriteLine("Word Frequency:");
        Console.WriteLine("───────────────");
        
        foreach (var (word, count) in wordCount)
        {
            Console.WriteLine($"{word}: {count} time(s)");
        }
    }
}
```

**Output:**
```
📝 WORD COUNTER

Text: "I love Bangladesh Bangladesh is beautiful I love coding"

Word Frequency:
───────────────
i: 2 time(s)
love: 2 time(s)
bangladesh: 2 time(s)
is: 1 time(s)
beautiful: 1 time(s)
coding: 1 time(s)
```

---

**কী হচ্ছে step by step:**

```
words = ["i", "love", "bangladesh", "bangladesh", "is", "beautiful", "i", "love", "coding"]

Step 1: "i" → নতুন → wordCount["i"] = 1
Step 2: "love" → নতুন → wordCount["love"] = 1
Step 3: "bangladesh" → নতুন → wordCount["bangladesh"] = 1
Step 4: "bangladesh" → আছে → wordCount["bangladesh"]++ → 2
Step 5: "is" → নতুন → wordCount["is"] = 1
Step 6: "beautiful" → নতুন → wordCount["beautiful"] = 1
Step 7: "i" → আছে → wordCount["i"]++ → 2
Step 8: "love" → আছে → wordCount["love"]++ → 2
Step 9: "coding" → নতুন → wordCount["coding"] = 1

Final:
┌──────────────┬──────────────┐
│     WORD     │    COUNT     │
├──────────────┼──────────────┤
│    "i"       │      2       │
│    "love"    │      2       │
│ "bangladesh" │      2       │
│    "is"      │      1       │
│  "beautiful" │      1       │
│   "coding"   │      1       │
└──────────────┴──────────────┘
```

---

## Real Example ৩: Student Records

**Roll দিয়ে Student object রাখা:**

```csharp
using System;
using System.Collections.Generic;

class Student
{
    public string Name;
    public int Roll;
    public int Marks;
    
    public Student(string name, int roll, int marks)
    {
        Name = name;
        Roll = roll;
        Marks = marks;
    }
    
    public string GetGrade()
    {
        if (Marks >= 80) return "A+";
        if (Marks >= 70) return "A";
        if (Marks >= 60) return "B";
        if (Marks >= 50) return "C";
        if (Marks >= 40) return "D";
        return "F";
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("📚 STUDENT RECORDS\n");
        
        // Roll → Student dictionary
        Dictionary<int, Student> students = new Dictionary<int, Student>();
        
        // Students add করো
        students[101] = new Student("Rahim", 101, 85);
        students[102] = new Student("Karim", 102, 72);
        students[103] = new Student("Jabbar", 103, 91);
        students[104] = new Student("Alam", 104, 55);
        
        // সব students দেখাও
        Console.WriteLine("All Students:");
        Console.WriteLine("─────────────────────────────────────────");
        
        foreach (var (roll, student) in students)
        {
            Console.WriteLine($"Roll {roll}: {student.Name} - Marks: {student.Marks} ({student.GetGrade()})");
        }
        
        // Roll দিয়ে search
        Console.WriteLine("\n═════════════════════════════════════════");
        Console.Write("Enter Roll to search: ");
        int searchRoll = int.Parse(Console.ReadLine());
        
        if (students.TryGetValue(searchRoll, out Student found))
        {
            Console.WriteLine($"\n✓ Student Found!");
            Console.WriteLine($"  Name: {found.Name}");
            Console.WriteLine($"  Roll: {found.Roll}");
            Console.WriteLine($"  Marks: {found.Marks}");
            Console.WriteLine($"  Grade: {found.GetGrade()}");
        }
        else
        {
            Console.WriteLine($"\n✗ Roll {searchRoll} not found!");
        }
    }
}
```

**Output:**
```
📚 STUDENT RECORDS

All Students:
─────────────────────────────────────────
Roll 101: Rahim - Marks: 85 (A+)
Roll 102: Karim - Marks: 72 (A)
Roll 103: Jabbar - Marks: 91 (A+)
Roll 104: Alam - Marks: 55 (C)

═════════════════════════════════════════
Enter Roll to search: 103

✓ Student Found!
  Name: Jabbar
  Roll: 103
  Marks: 91
  Grade: A+
```

---

## Real Example ৪: Shopping Cart

**Product → Quantity রাখা:**

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        Console.WriteLine("🛒 SHOPPING CART\n");
        
        // Product prices
        Dictionary<string, int> prices = new Dictionary<string, int>()
        {
            ["Shirt"] = 500,
            ["Pants"] = 800,
            ["Shoes"] = 1200,
            ["Hat"] = 300
        };
        
        // Cart: Product → Quantity
        Dictionary<string, int> cart = new Dictionary<string, int>();
        
        // কিছু items add করো
        cart["Shirt"] = 2;   // 2 টা Shirt
        cart["Pants"] = 1;   // 1 টা Pants
        cart["Shoes"] = 1;   // 1 টা Shoes
        cart["Shirt"] = 3;   // Shirt এখন 3 টা (update)
        
        // Cart দেখাও
        Console.WriteLine("Your Cart:");
        Console.WriteLine("───────────────────────────────────");
        
        int total = 0;
        
        foreach (var (product, quantity) in cart)
        {
            int price = prices[product];
            int subtotal = price * quantity;
            total += subtotal;
            
            Console.WriteLine($"{product} x {quantity} = {subtotal} TK");
        }
        
        Console.WriteLine("───────────────────────────────────");
        Console.WriteLine($"TOTAL: {total} TK");
    }
}
```

**Output:**
```
🛒 SHOPPING CART

Your Cart:
───────────────────────────────────
Shirt x 3 = 1500 TK
Pants x 1 = 800 TK
Shoes x 1 = 1200 TK
───────────────────────────────────
TOTAL: 3500 TK
```

---

## Dictionary vs List - কোনটা কখন?

```
┌────────────────────────────────────────────────────────────────┐
│                  LIST vs DICTIONARY                            │
├──────────────────────────────┬─────────────────────────────────┤
│           LIST<T>            │       DICTIONARY<K,V>           │
├──────────────────────────────┼─────────────────────────────────┤
│  Index দিয়ে access          │  Key দিয়ে access               │
│  list[0], list[1]            │  dict["key1"], dict["key2"]     │
├──────────────────────────────┼─────────────────────────────────┤
│  Order maintain করে         │  Order guarantee নেই            │
├──────────────────────────────┼─────────────────────────────────┤
│  Duplicate values OK         │  Duplicate keys NOT allowed     │
├──────────────────────────────┼─────────────────────────────────┤
│  Search: O(n) - slow         │  Search by key: O(1) - fast     │
├──────────────────────────────┼─────────────────────────────────┤
│  যখন use করবে:              │  যখন use করবে:                  │
│  • Simple collection         │  • Key দিয়ে value খুঁজতে হলে   │
│  • Order important           │  • Fast lookup দরকার            │
│  • Index দিয়ে কাজ           │  • Mapping/Association          │
└──────────────────────────────┴─────────────────────────────────┘
```

---

**Examples:**

| Scenario | Use |
|----------|-----|
| Shopping cart items (just list) | List |
| Product ID → Price | Dictionary |
| Student names | List |
| Roll → Student | Dictionary |
| Tasks to do | List |
| Word → Count | Dictionary |
| Numbers to sort | List |
| Username → Password | Dictionary |

---

## Summary - Methods এক নজরে

### Creating:

| Code | কাজ |
|------|-----|
| `new Dictionary<K,V>()` | Empty dictionary |
| `new Dictionary<K,V>() { {k1,v1}, {k2,v2} }` | Values সহ |

### Adding/Updating:

| Method | কাজ |
|--------|-----|
| `Add(key, value)` | Add (duplicate key তে error) |
| `dict[key] = value` | Add or Update |

### Accessing:

| Method | কাজ |
|--------|-----|
| `dict[key]` | Value পাও (key না থাকলে error) |
| `TryGetValue(key, out value)` | Safe way (true/false return) |

### Removing:

| Method | কাজ |
|--------|-----|
| `Remove(key)` | Key-Value remove |
| `Clear()` | সব মুছো |

### Searching:

| Method | কাজ |
|--------|-----|
| `ContainsKey(key)` | Key আছে কিনা |
| `ContainsValue(value)` | Value আছে কিনা |

### Properties:

| Property | কাজ |
|----------|-----|
| `Count` | কতগুলো pair আছে |
| `Keys` | সব keys |
| `Values` | সব values |

### Looping:

```csharp
// Full pair
foreach (var (key, value) in dict) { }

// Keys only
foreach (var key in dict.Keys) { }

// Values only
foreach (var value in dict.Values) { }
```

---

## মনে রাখো

```
┌─────────────────────────────────────────────────────┐
│              DICTIONARY                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│    Key দাও → Value পাও (Instant!)                  │
│                                                     │
│    dict["P001"] → 500                              │
│    dict[102] → Student object                      │
│    dict["Rahim"] → "01712345678"                   │
│                                                     │
│    ✓ Unique Keys only                              │
│    ✓ Fast lookup                                   │
│    ✓ Key-Value mapping                             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

**Next Part এ:** Stack, Queue, HashSet শিখবো!

---

*CPS Academy - Learn. Code. Grow.*
