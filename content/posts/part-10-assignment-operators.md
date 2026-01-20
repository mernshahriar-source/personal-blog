---
title: 'Part 10: Assignment Operators'
date: '2026-01-20'
excerpt: 'Part 10: Assignment Operators - shortcut operators শিখুন C# এ'
categories:
  - Learn C# from Beginner to Advanced
tags:
  - C#
  - operators
  - tutorial
draft: true
---

# Part 10: Assignment Operators

ধরো তুমি PUBG খেলছো। প্রতিটা kill এ তোমার score বাড়ে। damage খেলে health কমে। coin পেলে wallet এ জমা হয়।

এই বাড়ানো-কমানোর কাজটা programming এ সবচেয়ে বেশি হয়। আর এই কাজ সহজ করতে কিছু shortcut আছে - এগুলোই হলো Assignment Operators।

### এই part শেষে তুমি পারবে:

- 🎮 Game এর score, health system বানাতে
- 🛒 Shopping cart এ item add/remove করতে
- ❤️ Like/Unlike system বানাতে
- ⏱️ Countdown timer বানাতে
- 💰 Wallet balance update করতে

চলো শুরু করি!

---

## = (Basic Assignment)

এটা তো আগেই দেখেছো। একটা variable এ value রাখা।

```csharp
int score = 0;       // score এ 0 রাখলাম
string name = "Rahim";  // name এ "Rahim" রাখলাম
```

এখন ধরো score বাড়াতে চাও। কীভাবে করবে?

```csharp
int score = 100;

score = score + 10;  // আগের score এর সাথে 10 যোগ করে আবার score এ রাখলাম

Console.WriteLine(score);  // 110
```

কাজ করছে ঠিকই, কিন্তু `score = score + 10` লেখাটা একটু লম্বা না? 

এটার একটা shortcut আছে।

---

## += (যোগ করে রাখো)

`score = score + 10` এর shortcut হলো `score += 10`।

```csharp
int score = 100;

score += 10;  // score = score + 10 এর shortcut

Console.WriteLine(score);  // 110
```

দুইটা exactly same কাজ করে, কিন্তু += লেখা অনেক সহজ।

### Gaming Example

ধরো তুমি একটা game বানাচ্ছো:

```csharp
int score = 0;

Console.WriteLine($"Game started! Score: {score}");

// Enemy kill করলে
score += 100;
Console.WriteLine($"Enemy killed! Score: {score}");  // 100

// Headshot bonus
score += 50;
Console.WriteLine($"Headshot bonus! Score: {score}");  // 150

// Coin collected
score += 25;
Console.WriteLine($"Coin collected! Score: {score}");  // 175

// Level complete bonus
score += 500;
Console.WriteLine($"Level complete! Final Score: {score}");  // 675
```

Output:
```
Game started! Score: 0
Enemy killed! Score: 100
Headshot bonus! Score: 150
Coin collected! Score: 175
Level complete! Final Score: 675
```

### Shopping Cart Example

```csharp
double cartTotal = 0;

Console.WriteLine("🛒 Shopping Cart\n");

// Items add করা হচ্ছে
double shirtPrice = 450;
cartTotal += shirtPrice;
Console.WriteLine($"Shirt added: {shirtPrice} tk");
Console.WriteLine($"Cart total: {cartTotal} tk\n");

double pantsPrice = 650;
cartTotal += pantsPrice;
Console.WriteLine($"Pants added: {pantsPrice} tk");
Console.WriteLine($"Cart total: {cartTotal} tk\n");

double shoesPrice = 1200;
cartTotal += shoesPrice;
Console.WriteLine($"Shoes added: {shoesPrice} tk");
Console.WriteLine($"Cart total: {cartTotal} tk\n");

// Delivery charge
cartTotal += 60;
Console.WriteLine($"Delivery charge: 60 tk");
Console.WriteLine($"Final total: {cartTotal} tk");
```

Output:
```
🛒 Shopping Cart

Shirt added: 450 tk
Cart total: 450 tk

Pants added: 650 tk
Cart total: 1100 tk

Shoes added: 1200 tk
Cart total: 2300 tk

Delivery charge: 60 tk
Final total: 2360 tk
```

### String এও কাজ করে!

```csharp
string message = "Hello";

message += " ";
message += "World";
message += "!";

Console.WriteLine(message);  // Hello World!
```

---

## -= (বিয়োগ করে রাখো)

`score = score - 10` এর shortcut হলো `score -= 10`।

```csharp
int health = 100;

health -= 20;  // 20 damage খেলাম

Console.WriteLine(health);  // 80
```

### Game Health System

```csharp
int health = 100;

Console.WriteLine($"💚 Health: {health}");

// Bullet damage
health -= 15;
Console.WriteLine($"🔫 Bullet hit! Health: {health}");  // 85

// Grenade damage
health -= 35;
Console.WriteLine($"💣 Grenade! Health: {health}");  // 50

// Fall damage
health -= 10;
Console.WriteLine($"🏃 Fall damage! Health: {health}");  // 40

// Health pack found!
health += 30;  // += দিয়ে বাড়ালাম
Console.WriteLine($"💊 Health pack! Health: {health}");  // 70
```

### Wallet System

```csharp
double wallet = 5000;

Console.WriteLine($"💰 Wallet: {wallet} tk\n");

// bKash এ টাকা পাঠালাম
wallet -= 1500;
Console.WriteLine($"📤 Sent 1500 tk via bKash");
Console.WriteLine($"💰 Wallet: {wallet} tk\n");  // 3500

// Uber এ খরচ
wallet -= 350;
Console.WriteLine($"🚗 Uber fare: 350 tk");
Console.WriteLine($"💰 Wallet: {wallet} tk\n");  // 3150

// Salary পেলাম!
wallet += 25000;
Console.WriteLine($"📥 Salary received: 25000 tk");
Console.WriteLine($"💰 Wallet: {wallet} tk");  // 28150
```

---

## *= (গুণ করে রাখো)

`price = price * 2` এর shortcut হলো `price *= 2`।

```csharp
int coins = 100;

coins *= 2;  // Double coins power-up!

Console.WriteLine(coins);  // 200
```

### Power-up System

```csharp
int score = 50;

Console.WriteLine($"Score: {score}");

// 2x multiplier collected!
score *= 2;
Console.WriteLine($"2x Multiplier! Score: {score}");  // 100

// Another 2x!
score *= 2;
Console.WriteLine($"2x Multiplier! Score: {score}");  // 200

// 3x multiplier!
score *= 3;
Console.WriteLine($"3x Multiplier! Score: {score}");  // 600
```

### Interest Calculation

```csharp
double savings = 10000;
double interestRate = 1.05;  // 5% interest মানে 1.05 গুণ

Console.WriteLine($"Year 0: {savings} tk");

// Year 1
savings *= interestRate;
Console.WriteLine($"Year 1: {savings} tk");  // 10500

// Year 2
savings *= interestRate;
Console.WriteLine($"Year 2: {savings} tk");  // 11025

// Year 3
savings *= interestRate;
Console.WriteLine($"Year 3: {savings:F2} tk");  // 11576.25
```

---

## /= (ভাগ করে রাখো)

`number = number / 2` এর shortcut হলো `number /= 2`।

```csharp
int pizzaSlices = 8;

pizzaSlices /= 2;  // অর্ধেক খেয়ে ফেললাম

Console.WriteLine(pizzaSlices);  // 4
```

### Splitting Example

```csharp
double bill = 1200;
int friends = 4;

Console.WriteLine($"Total bill: {bill} tk");
Console.WriteLine($"Friends: {friends}\n");

bill /= friends;

Console.WriteLine($"Each person pays: {bill} tk");  // 300
```

### Countdown by Half

```csharp
int number = 64;

Console.WriteLine(number);  // 64

number /= 2;
Console.WriteLine(number);  // 32

number /= 2;
Console.WriteLine(number);  // 16

number /= 2;
Console.WriteLine(number);  // 8

number /= 2;
Console.WriteLine(number);  // 4

number /= 2;
Console.WriteLine(number);  // 2

number /= 2;
Console.WriteLine(number);  // 1
```

---

## %= (ভাগশেষ রাখো)

`number = number % 10` এর shortcut হলো `number %= 10`।

```csharp
int number = 47;

number %= 10;  // 10 দিয়ে ভাগ করে বাকিটা রাখো

Console.WriteLine(number);  // 7
```

### Last Digit বের করা

```csharp
int pin = 1234;

pin %= 10;  // শেষ digit টা রাখো

Console.WriteLine($"Last digit: {pin}");  // 4
```

### Clock System (12-hour format)

```csharp
int hour = 0;

Console.WriteLine($"Hour: {hour}");

hour += 5;
Console.WriteLine($"Hour: {hour}");  // 5

hour += 8;  // 5 + 8 = 13, but clock is 12 hour
hour %= 12;
Console.WriteLine($"Hour: {hour}");  // 1 (1 PM)

hour += 6;  // 1 + 6 = 7
Console.WriteLine($"Hour: {hour}");  // 7

hour += 7;  // 7 + 7 = 14
hour %= 12;
Console.WriteLine($"Hour: {hour}");  // 2 (2 PM)
```

---

## ++ (Increment - এক বাড়াও)

এটা সবচেয়ে বেশি use হয়। value কে 1 বাড়াতে।

`count = count + 1` বা `count += 1` এর বদলে শুধু `count++`।

```csharp
int likes = 100;

likes++;  // একটা like বাড়লো

Console.WriteLine(likes);  // 101
```

তিনটাই same কাজ করে:
```csharp
count = count + 1;
count += 1;
count++;  // সবচেয়ে short!
```

### Like System

```csharp
int likes = 0;

Console.WriteLine($"❤️ Likes: {likes}");

// কেউ like দিলো
likes++;
Console.WriteLine($"❤️ Likes: {likes}");  // 1

// আরেকজন
likes++;
Console.WriteLine($"❤️ Likes: {likes}");  // 2

// আরো তিনজন
likes++;
likes++;
likes++;
Console.WriteLine($"❤️ Likes: {likes}");  // 5
```

### Follower Count

```csharp
int followers = 1000;

Console.WriteLine($"👥 Followers: {followers}");

// নতুন follower এলো
followers++;
Console.WriteLine($"👥 Followers: {followers}");  // 1001

followers++;
Console.WriteLine($"👥 Followers: {followers}");  // 1002

followers++;
Console.WriteLine($"👥 Followers: {followers}");  // 1003
```

### Level Up System

```csharp
int level = 1;
int xp = 0;
int xpNeeded = 100;

Console.WriteLine($"Level: {level}, XP: {xp}/{xpNeeded}");

// XP পেলাম
xp += 50;
Console.WriteLine($"Got 50 XP! XP: {xp}/{xpNeeded}");

xp += 60;
Console.WriteLine($"Got 60 XP! XP: {xp}/{xpNeeded}");

// Level up check
if (xp >= xpNeeded)
{
    level++;
    xp = xp - xpNeeded;  // বাকি XP
    xpNeeded = xpNeeded + 50;  // পরের level এ আরো বেশি XP লাগবে
    
    Console.WriteLine($"🎉 LEVEL UP! Level: {level}, XP: {xp}/{xpNeeded}");
}
```

---

## -- (Decrement - এক কমাও)

++ এর উল্টা। value কে 1 কমাতে।

```csharp
int lives = 3;

lives--;  // একটা life গেলো

Console.WriteLine(lives);  // 2
```

### Game Lives System

```csharp
int lives = 3;

Console.WriteLine($"💖💖💖 Lives: {lives}");

// মারা গেলাম
lives--;
Console.WriteLine($"💖💖🖤 Lives: {lives}");  // 2

// আবার মারা গেলাম
lives--;
Console.WriteLine($"💖🖤🖤 Lives: {lives}");  // 1

// Last life!
Console.WriteLine("⚠️ WARNING: Last life remaining!");

// আবার মারা গেলাম
lives--;
Console.WriteLine($"🖤🖤🖤 Lives: {lives}");  // 0

if (lives == 0)
{
    Console.WriteLine("💀 GAME OVER!");
}
```

### Countdown Timer

```csharp
int seconds = 10;

Console.WriteLine("🚀 Rocket Launch Countdown!\n");

while (seconds > 0)
{
    Console.WriteLine(seconds);
    seconds--;
}

Console.WriteLine("\n🔥 LIFTOFF! 🚀");
```

Output:
```
🚀 Rocket Launch Countdown!

10
9
8
7
6
5
4
3
2
1

🔥 LIFTOFF! 🚀
```

### Ticket Booking System

```csharp
int availableSeats = 5;

Console.WriteLine($"🎬 Movie: Avengers");
Console.WriteLine($"🪑 Available seats: {availableSeats}\n");

// কেউ ticket কিনলো
availableSeats--;
Console.WriteLine($"Ticket booked! Seats left: {availableSeats}");  // 4

availableSeats--;
Console.WriteLine($"Ticket booked! Seats left: {availableSeats}");  // 3

availableSeats--;
Console.WriteLine($"Ticket booked! Seats left: {availableSeats}");  // 2

availableSeats--;
Console.WriteLine($"Ticket booked! Seats left: {availableSeats}");  // 1

availableSeats--;
Console.WriteLine($"Ticket booked! Seats left: {availableSeats}");  // 0

if (availableSeats == 0)
{
    Console.WriteLine("\n🚫 HOUSEFULL! No more seats available.");
}
```

---

## ++x vs x++ এর পার্থক্য

এটা একটু tricky, কিন্তু বুঝলে সহজ।

### x++ (Post-increment)

আগে value টা use করো, তারপর বাড়াও।

```csharp
int x = 5;
Console.WriteLine(x++);  // 5 print হবে
Console.WriteLine(x);    // 6 (এখন বেড়েছে)
```

প্রথম line এ কী হলো:
1. প্রথমে x এর value (5) print হলো
2. তারপর x বেড়ে 6 হলো

### ++x (Pre-increment)

আগে বাড়াও, তারপর use করো।

```csharp
int x = 5;
Console.WriteLine(++x);  // 6 print হবে
Console.WriteLine(x);    // 6
```

প্রথম line এ কী হলো:
1. প্রথমে x বেড়ে 6 হলো
2. তারপর 6 print হলো

### Side by Side Comparison

```csharp
int a = 10;
int b = 10;

int result1 = a++;  // result1 = 10, তারপর a = 11
int result2 = ++b;  // আগে b = 11, তারপর result2 = 11

Console.WriteLine($"a = {a}, result1 = {result1}");  // a = 11, result1 = 10
Console.WriteLine($"b = {b}, result2 = {result2}");  // b = 11, result2 = 11
```

### মনে রাখার সহজ উপায়

```
x++ = "use করো, তারপর বাড়াও" (++ পরে আছে)
++x = "বাড়াও, তারপর use করো" (++ আগে আছে)
```

### Practical Example

```csharp
int page = 1;

// বই পড়ছি
Console.WriteLine($"Reading page {page++}...");  // Page 1 (পড়ার পর বাড়লো)
Console.WriteLine($"Reading page {page++}...");  // Page 2
Console.WriteLine($"Reading page {page++}...");  // Page 3

Console.WriteLine($"Currently on page {page}");  // Page 4
```

### আমার Suggestion 💡

সত্যি বলতে, এই ++x vs x++ নিয়ে বেশি মাথা ঘামানোর দরকার নেই। 

সবচেয়ে safe way হলো আলাদা line এ লেখা:

```csharp
int count = 5;
count++;  // এখন count = 6
Console.WriteLine(count);  // 6, confusion নেই!
```

Complex expression এর মধ্যে ++ use না করাই ভালো। Code readable থাকে।

---

## Complete Example: Mini Game

সব কিছু মিলিয়ে একটা mini game বানাই:

```csharp
Console.WriteLine("╔═══════════════════════════════════════╗");
Console.WriteLine("║         🎮 MINI ADVENTURE GAME        ║");
Console.WriteLine("╚═══════════════════════════════════════╝\n");

// Initial stats
int health = 100;
int score = 0;
int coins = 0;
int level = 1;
int lives = 3;

Console.WriteLine($"❤️ Health: {health}  |  ⭐ Score: {score}  |  🪙 Coins: {coins}  |  💖 Lives: {lives}");
Console.WriteLine("\n--- Adventure Begins! ---\n");

// Event 1: Found coins
coins += 50;
Console.WriteLine($"🪙 Found 50 coins! Coins: {coins}");

// Event 2: Enemy attack
health -= 25;
Console.WriteLine($"👾 Enemy attacked! Health: {health}");

// Event 3: Killed enemy
score += 100;
Console.WriteLine($"⚔️ Enemy killed! Score: {score}");

// Event 4: Found health pack
health += 15;
Console.WriteLine($"💊 Health pack! Health: {health}");

// Event 5: Bonus coins (2x)
coins *= 2;
Console.WriteLine($"✨ Double coins power-up! Coins: {coins}");

// Event 6: Fell into trap
health -= 40;
lives--;
Console.WriteLine($"🕳️ Fell into trap! Health: {health}, Lives: {lives}");

// Event 7: Level complete!
level++;
score += 500;
Console.WriteLine($"🎉 Level complete! Level: {level}, Score: {score}");

// Final stats
Console.WriteLine("\n╔═══════════════════════════════════════╗");
Console.WriteLine("║            📊 FINAL STATS              ║");
Console.WriteLine("╠═══════════════════════════════════════╣");
Console.WriteLine($"║  ❤️ Health: {health,-25} ║");
Console.WriteLine($"║  ⭐ Score: {score,-26} ║");
Console.WriteLine($"║  🪙 Coins: {coins,-26} ║");
Console.WriteLine($"║  🎯 Level: {level,-26} ║");
Console.WriteLine($"║  💖 Lives: {lives,-26} ║");
Console.WriteLine("╚═══════════════════════════════════════╝");
```

---

## Quick Reference Table

| Operator | নাম | Shortcut for | Example |
|----------|-----|--------------|---------|
| = | Assignment | - | x = 10 |
| += | Add and assign | x = x + n | x += 5 |
| -= | Subtract and assign | x = x - n | x -= 5 |
| *= | Multiply and assign | x = x * n | x *= 2 |
| /= | Divide and assign | x = x / n | x /= 2 |
| %= | Modulus and assign | x = x % n | x %= 3 |
| ++ | Increment | x = x + 1 | x++ |
| -- | Decrement | x = x - 1 | x-- |

---

## Common Mistakes

### Mistake 1: = আর == গুলিয়ে ফেলা

```csharp
int x = 5;

// ❌ এটা compare না, value বসানো!
if (x = 10)  // Error!

// ✓ Compare করতে == দাও
if (x == 10)
```

### Mistake 2: String এ -= করা

```csharp
string name = "Hello World";

// ❌ কাজ করবে না!
name -= "World";

// String এ -= নেই, += আছে
```

### Mistake 3: ++/-- এর confusion

```csharp
int x = 5;

// 🤔 এটা কী print করবে?
Console.WriteLine(x++ + ++x);

// এভাবে লিখো না! আলাদা আলাদা করো:
int a = 5;
a++;
Console.WriteLine(a);  // Clear!
```

---

## Summary

আজকে শিখলে:

| Shortcut | মানে | Example |
|----------|------|---------|
| x += 5 | x = x + 5 | score += 100 |
| x -= 5 | x = x - 5 | health -= 20 |
| x *= 2 | x = x * 2 | coins *= 2 |
| x /= 2 | x = x / 2 | bill /= 4 |
| x %= 10 | x = x % 10 | hour %= 12 |
| x++ | x = x + 1 | likes++ |
| x-- | x = x - 1 | lives-- |

**কোথায় কাজে লাগে:**
- 🎮 Game: score, health, lives
- 🛒 Shopping: cart total, quantity
- 💰 Finance: balance, interest
- ❤️ Social: likes, followers
- ⏱️ Time: countdown, timer

**মনে রাখো:**
- += মানে "যোগ করে রাখো"
- -= মানে "বিয়োগ করে রাখো"
- ++ মানে "এক বাড়াও"
- -- মানে "এক কমাও"
- Confused হলে আলাদা line এ লেখো!

**Next Part এ:** Comparison operators শিখবো - ==, !=, >, <, >=, <= দিয়ে কীভাবে দুইটা জিনিস তুলনা করা যায়।

---

*CPS Academy - Learn. Code. Grow.*
