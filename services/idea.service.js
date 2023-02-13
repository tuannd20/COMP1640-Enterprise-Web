const ideaRepository = require("../repositories/idea.repository");

const createIdea = async (data) => {
  try {
    const result = await ideaRepository.createIdea(data);
    return result;
  } catch (err) {
    console.error("🚀 ~ file: idea.service.js:8 ~ createIdea ~ err", err);
    return err;
  }
};

const getIdea = async (id) => {
  try {
    const result = await ideaRepository.readIdea(id);
    return result;
  } catch (err) {
    console.error("🚀 ~ file: idea.service.js:18 ~ getIdea ~ err", err);
    return err;
  }
};

const updateIdea = async (id, data) => {
  try {
    const result = await ideaRepository.updateIdea(id, data);
    return result;
  } catch (err) {
    console.error("🚀 ~ file: idea.service.js:28 ~ updateIdea ~ err", err);
    return err;
  }
};

const deleteIdea = async (id) => {
  try {
    const result = await ideaRepository.deleteIdea(id);
    return result;
  } catch (err) {
    console.log("🚀 ~ file: idea.service.js:38 ~ deleteIdea ~ err", err);
    return err;
  }
};

module.exports = {
  createIdea,
  getIdea,
  updateIdea,
  deleteIdea,
};
