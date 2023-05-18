const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://excell:excell@cluster0.kkn3b.mongodb.net/tarun?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
