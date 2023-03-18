const IdeaRepository = require("../repositories/idea.repository");

const createIdea = async (data) => {
  try {
    const result = await IdeaRepository.createIdea(data);
    return result;
  } catch (err) {
    console.error("🚀 ~ file: idea.service.js:8 ~ createIdea ~ err", err);
    return err;
  }
};

const getIdea = async (id) => {
  try {
    const result = await IdeaRepository.readIdea(id);
    return result;
  } catch (err) {
    console.error("🚀 ~ file: idea.service.js:18 ~ getIdea ~ err", err);
    return err;
  }
};

const updateIdea = async (id, data) => {
  try {
    const result = await IdeaRepository.updateIdea(id, data);
    return result;
  } catch (err) {
    console.error("🚀 ~ file: idea.service.js:28 ~ updateIdea ~ err", err);
    return err;
  }
};

const deleteIdea = async (id) => {
  try {
    const result = await IdeaRepository.deleteIdea(id);
    return result;
  } catch (err) {
    console.log("🚀 ~ file: idea.service.js:38 ~ deleteIdea ~ err", err);
    return err;
  }
};

const getALl = async (options) => {
  try {
    const result = await IdeaRepository.getAll(options);
    return result;
  } catch (err) {
    console.error("🚀 ~ file: idea.service.js:47 ~ getIdea ~ err", err);
    return err;
  }
};

const findByOptions = async (options) => {
  try {
    const Idea = await IdeaRepository.findByOptions(options);
    return Idea;
  } catch (err) {
    console.error("🚀 ~ file: idea.service.js:58 ~ findByOptions ~ err:", err);
    return err;
  }
};

const getAllWithQuery = async (query, options) => {
  try {
    const Idea = await IdeaRepository.getAllWithQuery(query, options);
    return Idea;
  } catch (err) {
    console.error("🚀 ~ file: idea.repository.js:47 ~ readIdea ~ err", err);
    return err;
  }
};
const getAllByQuery = async (query) => {
  try {
    const Idea = await IdeaRepository.getAllByQuery(query);
    return Idea;
  } catch (err) {
    return err;
  }
};
const getIdeaProfileWithQuery = async (options, query) => {
  try {
    const Idea = await IdeaRepository.getIdeaProfileWithQuery(options, query);
    return Idea;
  } catch (err) {
    return err;
  }
};

const getAllNotPaginate = async (query) => {
  try {
    const result = await IdeaRepository.getAllNotPaginate(query);
    return result;
  } catch (err) {
    console.error(
      "🚀 ~ file: idea.service.js:78 ~ getAllNotPaginate ~ err:",
      err,
    );
    return err;
  }
};
module.exports = {
  createIdea,
  getIdea,
  updateIdea,
  deleteIdea,
  getALl,
  findByOptions,
  getAllWithQuery,
  getAllByQuery,
  getIdeaProfileWithQuery,
  getAllNotPaginate,
};
