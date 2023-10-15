const mongoose = require("mongoose");

// create Schema
const userSchema = new mongoose.Schema(
  {
    customID: {
      type: Number,
      unique: true,
    },
    fullName: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, require: true },
  },
  { timestamps: true }
);

userSchema.pre("findByIdAndUpdate", function (next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

userSchema.pre("save", async function (next) {
  if (this.isNew && !this.customID) {
    const maxCustomID = await this.constructor
      .find({})
      .sort({ customID: -1 })
      .limit(1);
    let nextCustomID = 1;

    if (maxCustomID.length > 0) nextCustomID = maxCustomID[0].customID + 1;

    this.customID = nextCustomID;
  }
  next();
});

// create model User
const User = mongoose.model("users", userSchema);

module.exports = User;
