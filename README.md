# AcarDB
Acar.db is an open-source package meant to provide an easy way for beginners and people of all levels to access & store data in a low to medium volume environment. All data is stored persistently via either promise-mysql and comes way various other quality-of-life features.

It is a nice module that you can easily generate and update your data via MySQL.
Persistent Storage - Data doesn't disappear through restarts
Multiple Drivers - You can use either promise-mysql
Works out of the box - No need to set up a database server, all the data is stored locally in the same project

# Installation
```python
npm i acar.db promise-mysql    # MySQL Server Connection
```

# Example
```javascript
const { AcarDB, MySQLDriver } = require("acar.db");
(async () => {
    const mysqlDriver = new MySQLDriver({
        host: "localhost",
        user: "root",
        password: "",
        database: "database",
    });

    await mysqlDriver.connect(); 
    const db = new AcarDB({ driver: mysqlDriver });
    await db.set("array", [
        "acar",
        "sehira",
        "kedy",
        "lamer"
    ]);
    let data = await db.get("array") || []
    data.filter(x => x != "lamer").map(x => x).join(", ")
    // -> ['acar','sehira', 'kedy']
})();
```

# Example
```js
(async () => {
    // self calling async function just to get async
    // Setting an object in the database:
    await db.set("guild", { id: 1 });
    // -> { id: 1 }

    // Getting an object from the database:
    await db.get("guild");
    // -> { id: 1 }

    // Getting an object property from the database:
    await db.get("guild.id");
    // -> 1

    // Setting an object in the database:
    await db.set("guild", { id: 2 });
    // -> { id: 2 }

    // Pushing an element to an array (that doesn't exist yet) in an object:
    await db.push("guild.members", "acar");
    // -> { id: 2, members: ['acar'] }

    // Adding to a number (that doesn't exist yet) in an object:
    await db.add("guild.level", 1);
    // -> { id: 2, members: ['acar'], level: 1 }

    // Repeating previous examples:
    await db.push("guild.members", "sehira");
    // -> { id: 2, members: ['acar', 'sehira'], level: 1 }
    await db.sub("guild.level", 500);
    // -> { id: 2, members: ['acar', 'sehira'], level: 501 }

    // Fetching individual properties
    await db.get("guild.id"); // -> 2
    await db.get("guild.level"); // -> 501
    await db.get("guild.members"); // ['acar', 'sehira']
})();
```

# pull()
```javascript
await db.set("members", [
    "acar",
    "kedy",
    "sehira",
    "chavo"
]);

await db.pull("members", "chavo"); // Removing a single item
// -> ['acar', 'kedy', 'sehira']

await db.pull("members", ["kedy", "sehira"]); // Removing multiple options
// -> ['acar']

await db.pull("members", (i) => i.includes("chavo")); // Using a function
// -> []
```

# Table
```javascript 
// optional Async add await
let nTable = db.table("new_table");
```
