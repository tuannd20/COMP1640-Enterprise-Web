const ideaModel = require("../database/models/Idea");

const createIdea = async (data) => {
  try {
    const Idea = await ideaModel.create(data);
    return Idea;
  } catch (err) {
    console.error("🚀 ~ file: idea.repository.js:8 ~ createIdea ~ err", err);
    return err;
  }
};

const readIdea = async (id) => {
  try {
    const Idea = await ideaModel.findById(id);
    return Idea;
  } catch (err) {
    console.error("🚀 ~ file: idea.repository.js:18 ~ readIdea ~ err", err);
    return err;
  }
};

const updateIdea = async (id, data) => {
  try {
    const Idea = await ideaModel.findByIdAndUpdate(id, data);
    return Idea;
  } catch (err) {
    console.error("🚀 ~ file: idea.repository.js:28 ~ updateIdea ~ err", err);
    return err;
  }
};

const deleteIdea = async (id) => {
  try {
    const Idea = await ideaModel.findByIdAndDelete(id);
    return Idea;
  } catch (err) {
    console.error("🚀 ~ file: idea.repository.js:38 ~ deleteIdea ~ err", err);
    return err;
  }
};

const getAll = async (options) => {
  try {
    const Idea = await ideaModel.paginate({}, options);
    return Idea;
  } catch (err) {
    console.error("🚀 ~ file: idea.repository.js:47 ~ readIdea ~ err", err);
    return err;
  }
};
module.exports = {
  createIdea,
  readIdea,
  updateIdea,
  deleteIdea,
  getAll,
};
