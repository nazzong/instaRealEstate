import BlogLink from "../../../models/BlogLink";

export default {
  Query: {
    getBlogLink: async (_, args) => {
      try {
        const result = await BlogLink.find();

        return result[0];
      } catch (e) {
        console.log(e);
        return {};
      }
    },
  },

  Mutation: {
    modifyBlogLink: async (_, args) => {
      const { id, link } = args;

      try {
        const result = await BlogLink.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              link,
            },
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
