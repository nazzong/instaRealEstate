import MenuDepth_1 from "../../../models/MenuDepth_1";
import MenuDepth_2 from "../../../models/MenuDepth_2";

export default {
  Query: {
    getHeaderMenus: async (_, args) => {
      try {
        const result = await MenuDepth_1.find({ useYn: true }, {})
          .sort({ sort: 1 })
          .populate({
            path: `subMenu`,
            model: MenuDepth_2,
            match: {
              useYn: true,
            },
            options: { sort: { sort: 1 } },
          });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },
};
