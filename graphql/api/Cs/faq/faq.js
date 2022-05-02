import Faq from "../../../models/Faq";
import FaqType from "../../../models/FaqType";

export default {
  Query: {
    getFaq: async (_, args) => {
      try {
        const result = await Faq.find().sort({ type: 1, sort: -1 });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getFaqType: async (_, args) => {
      try {
        const result = await FaqType.find().sort({ typeName: 1 });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getFaqDetail: async (_, args) => {
      const { typeName } = args;

      try {
        const result = await Faq.find({
          type: typeName,
        }).sort({ type: 1, sort: -1 });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    createFaqType: async (_, args) => {
      const { typeName } = args;

      try {
        const result = await FaqType.create({ typeName });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    deleteFaqType: async (_, args) => {
      const { id } = args;

      try {
        const result = await FaqType.deleteOne({ _id: id });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    createFaq: async (_, args) => {
      const { question, answer, sort, type } = args;

      try {
        const result = await Faq.create({
          question,
          answer,
          sort,
          type,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteFaq: async (_, args) => {
      const { id } = args;

      try {
        const result = await Faq.deleteOne({ _id: id });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    modifyFaq: async (_, args) => {
      const { id, answer } = args;

      try {
        const result = await Faq.updateOne(
          { _id: id },
          {
            answer,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
