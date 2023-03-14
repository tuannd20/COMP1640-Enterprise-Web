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
    const Idea = await ideaModel
      .findById(id)
      .populate(["idStaffIdea", "idDepartment", "idPoll", "idCategory"]);
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
    const Idea = await ideaModel.delete({ _id: id });
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

const findByOptions = async (options) => {
  try {
    const Idea = await ideaModel.findOne(options);
    return Idea;
  } catch (err) {
    console.error(
      "🚀 ~ file: idea.repository.js:59 ~ findByOptions ~ err:",
      err,
    );
    return err;
  }
};

const getAllWithQuery = async (page, query) => {
  try {
    const limit = 5;
    const drop = (page - 1) * limit;
    const Idea = await ideaModel
      .find(query)
      .populate("idStaffIdea")
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(drop);
    return Idea;
  } catch (err) {
    console.error("🚀 ~ file: idea.repository.js:47 ~ readIdea ~ err", err);
    return err;
  }
};

const getIdeaProfileWithQuery = async (options, query) => {
  try {
    const Idea = await ideaModel.paginate(query, options);
    return Idea;
  } catch (err) {
    console.error("🚀 ~ file: idea.repository.js:47 ~ readIdea ~ err", err);
    return err;
  }
};

const getAllByQuery = async (query) => {
  try {
    const Idea = await ideaModel.find(query);
    return Idea;
  } catch (err) {
    console.error("🚀 ~ file: idea.repository.js:47 ~ readIdea ~ err", err);
    return err;
  }
};

const getAllNotPaginate = async (filter) => {
  try {
    const Idea = await ideaModel.find(filter);
    return Idea;
  } catch (err) {
    console.error(
      "🚀 ~ file: idea.repository.js:83 ~ getAllNotPaginate ~ err:",
      err,
    );
    return err;
  }
};
module.exports = {
  findByOptions,
  createIdea,
  readIdea,
  updateIdea,
  deleteIdea,
  getAll,
  getAllWithQuery,
  getAllByQuery,
  getIdeaProfileWithQuery,
  getAllNotPaginate,
};
