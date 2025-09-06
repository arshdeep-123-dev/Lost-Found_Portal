const mongoose = require("mongoose");
const Item = require("./models/Item");

mongoose.connect("mongodb+srv://arshdeep62097:M8EiblkB6bJm3yEX@cluster0.whgrskn.mongodb.net/LOST-FOUND PORTAL?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log("✅ Connected to MongoDB");

  // Add test item
  const testItem = new Item({
    title: "Test Item",
    desc: "Just a test",
    location: "Classroom",
    type: "found"
  });
  await testItem.save();
  console.log("✅ Test item saved:", testItem);

  // Fetch all items
  const allItems = await Item.find();
  console.log("📦 All items in DB:", allItems);

  mongoose.disconnect();
})
.catch(err => console.error("❌ Error:", err));
