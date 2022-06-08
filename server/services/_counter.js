const mongoose = require("mongoose");

const _counterSchema = new mongoose.Schema({
  index: {
    type: Number,
    default: 0,
  },
});

_counterSchema.statics.getIndex = async function () {
  try {
    let myDocuments = await this.find({});

    if (myDocuments.length === 0) {
      const myDocumentOne = await this.create({ index: 0 });

      myDocuments.push(myDocumentOne);
    }

    const currentIndex = myDocuments[0].index;

    myDocuments[0].index = currentIndex + 1;

    await myDocuments[0].save();

    return currentIndex;
  } catch (error) {
    throw error;
  }
};

const _counter = mongoose.model("_counter", _counterSchema);

module.exports = _counter;
