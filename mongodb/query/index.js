// Insert 3 user documents into a collection named users.
db["user"].insertMany([
  {
    _id: ObjectId("652f9a8e1b3c4d1234567890"),
    firstName: "Tanmay",
    lastName: "Vedpathak",
    email: "tanmay.vedpathak@example.com",
    password: "hashed_password_here",
    age: 28,
    gender: "male",
    isActive: true,
    createdAt: ISODate("2025-10-01T09:00:00Z"),
    updatedAt: ISODate("2025-10-07T10:00:00Z"),
    contact: {
      phone: "+91-9876543210",
      address: {
        street: "MG Road",
        city: "Pune",
        state: "Maharashtra",
        country: "India",
        postalCode: "411001",
      },
    },
    interests: ["coding", "music", "travel"],
    roles: ["user"],
    lastLogin: ISODate("2025-10-06T15:30:00Z"),
    purchases: [
      {
        productId: ObjectId("671f1a3b8d1f4a1234567001"),
        price: 1299,
        date: ISODate("2025-09-15T14:45:00Z"),
      },
      {
        productId: ObjectId("671f1a3b8d1f4a1234567002"),
        price: 499,
        date: ISODate("2025-10-01T11:20:00Z"),
      },
    ],
  },

  {
    _id: ObjectId("652f9a8e1b3c4d1234567891"),
    firstName: "Sneha",
    lastName: "Patil",
    email: "sneha.patil@example.com",
    password: "hashed_password_here",
    age: 27,
    gender: "female",
    isActive: true,
    createdAt: ISODate("2025-09-20T13:15:00Z"),
    updatedAt: ISODate("2025-10-06T18:10:00Z"),
    contact: {
      phone: "+91-9988776655",
      address: {
        street: "Juhu Tara Road",
        city: "Mumbai",
        state: "Maharashtra",
        country: "India",
        postalCode: "400049",
      },
    },
    interests: ["art", "photography", "travel"],
    roles: ["user", "moderator"],
    lastLogin: ISODate("2025-10-07T08:00:00Z"),
    purchases: [
      {
        productId: ObjectId("671f1a3b8d1f4a1234567003"),
        price: 2599,
        date: ISODate("2025-09-30T19:10:00Z"),
      },
    ],
  },

  {
    _id: ObjectId("652f9a8e1b3c4d1234567892"),
    firstName: "Rohan",
    lastName: "Desai",
    email: "rohan.desai@example.com",
    password: "hashed_password_here",
    age: 35,
    gender: "male",
    isActive: false,
    createdAt: ISODate("2025-07-10T10:00:00Z"),
    updatedAt: ISODate("2025-09-28T17:40:00Z"),
    contact: {
      phone: "+91-9090909090",
      address: {
        street: "C.G. Road",
        city: "Ahmedabad",
        state: "Gujarat",
        country: "India",
        postalCode: "380009",
      },
    },
    interests: ["finance", "cars", "gaming"],
    roles: ["admin"],
    lastLogin: ISODate("2025-09-25T07:25:00Z"),
    purchases: [
      {
        productId: ObjectId("671f1a3b8d1f4a1234567004"),
        price: 799,
        date: ISODate("2025-09-01T09:30:00Z"),
      },
      {
        productId: ObjectId("671f1a3b8d1f4a1234567005"),
        price: 1599,
        date: ISODate("2025-09-20T16:15:00Z"),
      },
    ],
  },
]);

// Retrieve all users with age > 25.
db.user.find({
  age: { $gt: 25 },
});

//  Find users who live in "Mumbai" and are active.
db.user.find({
  "contact.address.city": "Mumbai",
  isActive: true,
});

// Update one user’s status to "inactive".
db.user.updateOne(
  {
    isActive: true,
  },
  { $set: { isActive: false } },
);

// Delete all users with age < 18.
db.user.deleteMany({
  age: { $lt: 18 },
});

// Find all users whose first name starts with the letter “T” (case-insensitive).
db.user.find({
  firstName: {
    $regex: /^T/,
    $options: "i",
  },
});

// Find users whose city name contains “pur” anywhere in it.
db.user.find({
  "contact.address.city": {
    $regex: /pur/,
  },
});

// Find users who have “music” in their interests array.
db.user.find({
  interests: { $in: ["art"] },
});

// Find users who have both “coding” and “travel” in their interests array.
db.user.find({
  interests: { $all: ["coding", "travel"] },
});

// Find users whose contact.city is “Pune”.
db.user.find({
  "contact.address.city": "Pune",
});

// Find users whose postalCode starts with “411”.
db.user.find({
  "contact.address.postalCode": {
    $regex: /^411/,
  },
});

// Find users whose roles array contains “admin”.
db.user.find({
  roles: { $in: ["admin"] },
});

// Find users whose roles array has exactly two elements.
db.user.find({
  roles: { $size: 2 },
});

// Find users where interests array contains at least one of ["coding", "design"].
db.user.find({
  interests: { $in: ["coding", "design"] },
});

// Find users who have purchased a product with price greater than 500.
db.user.find({
  "purchases.price": {
    $gt: 500,
  },
});

// Find users who purchased an item where price > 500 and category = "electronics".
db.user.find({
  purchases: { $elemMatch: { price: { $gt: 500 }, category: "electronics" } },
});

// Find users who have no interests field in their document.
db.user.find({ interests: { $exists: false } });

// Find users whose purchases array contains an element with price 999 and city = “Pune” (using $elemMatch).
db.user.find({
  purchases: { $elemMatch: { price: 999 } },
  "contact.address.city": "Pune",
});

// Retrieve all users and sort them by age in ascending order.
db.user.find({}, { age: 1 }).sort({ age: 1 });

// Retrieve all users and sort them by city in descending order.
db.user.find({}, { contact: 1 }).sort({ "contact.address.city": -1 });

// Find the top 3 oldest users in the collection.
db.user.find().sort({ age: -1 }).limit(3);

// Find the youngest user in the collection.
//? db.user.findOne({}, {}, { sort: { age: 1 } });
db.user.find().sort({ age: 1 }).limit(1);

// Find users aged > 25 and skip the first 2 results, limit to 3.
db.user
  .find({ age: { $gt: 25 } })
  .sort({ age: 1 })
  .limit();

// Retrieve all users, sorted by lastLogin (latest first), but only show firstName, city, and lastLogin.
db.user
  .find({}, { firstName: 1, "contact.address.city": 1, lastLogin: 1 })
  .sort({ lastLogin: -1 });

// Update a user’s isActive status to false where their city is “Delhi”.

// Increase every user’s age by 1 year.

// Add a new value "sports" to the interests array of a user named “Tanmay”.

// Remove "travel" from the interests array for all users.

// Add a new role "moderator" only if it doesn’t already exist in the roles array.

// Update the price of the first purchase (in the purchases array) to 799 for user "Riya".
