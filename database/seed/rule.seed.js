const mongoose = require("mongoose");
const RuleModel = require("../models/Rule");
const database = require("../connection");

const rules = [
  new RuleModel({
    title: "Term 01",
    contentRule:
      "With term Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem enim a sit harum repellendus, ipsam fugit, animi iusto iure quam laborum nostrum molestiae, cupiditate obcaecati eum beatae corrupti dicta adipisci!",
  }),
  new RuleModel({
    title: "Term 02",
    contentRule:
      "With term Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem enim a sit harum repellendus, ipsam fugit, animi iusto iure quam laborum nostrum molestiae, cupiditate obcaecati eum beatae corrupti dicta adipisci!, Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum unde explicabo obcaecati vitae consectetur ipsum enim maiores, illum laboriosam officiis minus dicta dolor, a suscipit nesciunt eveniet, numquam iusto velit.",
  }),
  new RuleModel({
    title: "Term 03",
    contentRule:
      "With term Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem enim a sit harum repellendus, ipsam fugit, animi iusto iure quam laborum nostrum molestiae, cupiditate obcaecati eum beatae corrupti dicta adipisci!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, consequuntur. Possimus numquam dignissimos ab laborum officia. Hic consequuntur alias impedit ratione iure laboriosam eius, aspernatur provident ut deleniti! Enim voluptate voluptatum quidem! Corrupti distinctio modi excepturi sint vero quo ut.",
  }),
];

(async () => {
  await database.connectionDatabase();
})();

rules.map(async (data, index) => {
  // eslint-disable-next-line no-unused-vars
  await data.save((_err, result) => {
    if (index === rules.length) {
      // eslint-disable-next-line no-console
      console.log("SEED DATA DONE!");
      mongoose.disconnect();
    }
  });
});
