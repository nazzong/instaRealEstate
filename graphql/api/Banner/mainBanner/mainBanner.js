import MainBanner from "../../../models/MainBanner";

export default {
  Query: {
    getMainBanner: async (_, args) => {
      try {
        const result = await MainBanner.find().sort({ sort: 1 });

        return result;
      } catch (e) {
        return [];
      }
    },
  },

  Mutation: {
    modifyMainBanner: async (_, args) => {
      const { id, title, content, link } = args;

      try {
        const newContent = content.replace(/\n/g, "<br />");

        const result = await MainBanner.update(
          { _id: id },
          { title, content: newContent, link }
        );

        return true;
      } catch (e) {
        return false;
      }
    },

    modifyMainBannerImagePath: async (_, args) => {
      const { id, imagePath } = args;

      try {
        const result = await MainBanner.update({ _id: id }, { imagePath });

        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
