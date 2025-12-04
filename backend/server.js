require("dotenv").config();
const app = require("./api/index"); // Import Express app

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
