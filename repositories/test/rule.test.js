const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const RuleRepository = require("../rule.repository");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

afterEach(async () => {
  await mongoose.connection.close();
});

describe("Good case: Unit test for Rule", () => {
  it("Should create a new rule", async () => {
    const data = {
      title: "Content rule 1",
      contentRule:
        "Một vụ tai nạn giao thông vừa xảy ra ngoài phố. Mọi người tò mò chen lấn vòng trong vòng ngoài để xem.Một anh lính đến chậm không tài nào vào xem được. Tức quá, anh ta liền hét toáng lên: Tôi là bố kẻ bị nạn đây! Mọi người kinh ngạc quay lại nhìn và vội vã giãn ra cho anh ta vào. “Kẻ bị nạn” là một… chú chó vừa bị xe cán chết.",
    };
    const rule = await RuleRepository.createRule(data);
    console.log(rule);
  });
});
describe("Good case: Unit test for Rule", () => {
  it("Should create a new rule", async () => {
    const data = {
      title: "Content rule 2",
      contentRule:
        "Một con gà mái than với gà trống: “Anh ơi, tại sao con người có v... mà em lại không có?”. Gà trống thủng thẳng:– Em có để làm gì ! Anh có tay đâu ?",
    };
    const rule = await RuleRepository.createRule(data);
    console.log(rule);
  });
});
describe("Good case: Unit test for Rule", () => {
  it("Should create a new rule", async () => {
    const data = {
      title: "Content rule 3",
      contentRule:
        "Cuộc sống là dòng chảy không ngừng, nhiều khi bản thân ta cảm thấy mệt mỏi, chán chường. Hi vọng những truyện cười đặc sắc này sẽ giúp bạn xốc lại tinh thần để tiếp tục vững bước trên đường đời.",
    };
    const rule = await RuleRepository.createRule(data);
    console.log(rule);
  });
});
// describe("Good case: Unit test for Rule", () => {
//   it("Should update a rule", async () => {
//     const id = "63e485140cacb098d509c371";
//     const data = {
//       title: "title rule test update",
//       contentRule: "Content rule test update",
//     };
//     const rule = await RuleRepository.updateRule(id, data);
//     console.log(rule);
//   });
// });
// describe("Good case: Unit test for Rule", () => {
//   it("Should delete one rule", async () => {
//     // eslint-disable-next-line no-underscore-dangle
//     const id = "63e3ca5dc0d29c629db7895b";
//     const rule = await RuleRepository.deleteOneRule(id);
//     console.log(rule);
//   });
// });
// describe("Good case: Unit test for Rule", () => {
//   it("Should delete all staff", async () => {
//     // eslint-disable-next-line no-underscore-dangle
//     const rule = await RuleRepository.deleteAllRule();
//     console.log(rule);
//   });
// });
