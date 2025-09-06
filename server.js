// Main express server
const reportRoutes = require("./routes/reportRoutes");
app.use("/api/reports", reportRoutes);

import itemRoutes from "./routes/itemRoutes.js";

// Routes
app.use("/api/reports", reportRoutes);
app.use("/api/items", itemRoutes);
