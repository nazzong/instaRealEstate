import MenuDepth_1 from "../../../models/MenuDepth_1";
import MenuDepth_2 from "../../../models/MenuDepth_2";
import mongoose from "mongoose";

export default {
  Query: {
    getMenuById: async (_, args) => {
      const { id } = args;

      if (!id) return null;

      try {
        const result = await MenuDepth_1.findOne({ _id: id }).populate({
          path: `subMenu`,
          model: MenuDepth_2,
          options: { sort: { sort: 1 } },
        });

        return result;
      } catch (e) {
        console.log(e);
        return null;
      }
    },

    getMenuForAdmin: async (_, args) => {
      try {
        const result = await MenuDepth_1.find()
          .populate({
            path: `subMenu`,
            model: MenuDepth_2,
            options: { sort: { sort: 1 } },
          })
          .sort({
            sort: 1,
          });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },

    getSubMenuForProduct: async (_, args) => {
      try {
        const result = await MenuDepth_1.find({ isProduct: true })
          .sort({
            sort: 1,
          })
          .populate({
            path: `subMenu`,
            model: MenuDepth_2,
            options: { sort: { sort: 1 } },
          });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getSubMenuById: async (_, args) => {
      const { id } = args;

      if (!id) return null;

      try {
        const result = await MenuDepth_2.findOne({ _id: id }).populate({
          path: `parentMenu`,
          model: MenuDepth_1,
        });

        return result;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
  },

  Mutation: {
    modifyMenuUseYn: async (_, args) => {
      const { id, useYn } = args;

      try {
        const result = await MenuDepth_1.updateOne(
          {
            _id: id,
          },
          {
            useYn,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    modifySubMenuUseYn: async (_, args) => {
      const { id, useYn } = args;

      try {
        const result = await MenuDepth_2.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              useYn,
            },
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    modifyMenuSort: async (_, args) => {
      const { id, sort } = args;

      try {
        const result = await MenuDepth_1.updateOne(
          {
            _id: id,
          },
          {
            sort,
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    modifySubMenuSort: async (_, args) => {
      const { id, sort } = args;

      try {
        const result = await MenuDepth_2.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              sort,
            },
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteMenu: async (_, args) => {
      const { id } = args;

      try {
        const result = await MenuDepth_2.deleteMany({
          parentMenu: id,
        });

        const result2 = await MenuDepth_1.deleteOne({
          _id: id,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteSubMenu: async (_, args) => {
      const { id } = args;

      try {
        const currentSubMenu = await MenuDepth_2.findOne({ _id: id });

        const result = await MenuDepth_2.deleteOne({
          _id: id,
        });

        try {
          const currentMenu = await MenuDepth_1.findOne({
            _id: currentSubMenu.parentMenu,
          });

          currentMenu.subMenu.splice(currentMenu.subMenu.indexOf(id), 1);
          currentMenu.save();

          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    createMenu: async (_, args) => {
      const { name, sort, isCategory } = args;

      try {
        const result = await MenuDepth_1.create({
          name,
          sort,
          link: "",
          useYn: false,
          isProduct: isCategory,
        });

        const result2 = await MenuDepth_1.updateOne(
          {
            _id: result._id,
          },
          {
            $set: {
              link: isCategory ? `/product?pmenu=${result._id}` : ``,
            },
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    createSubMenu: async (_, args) => {
      const { parentMenu, name, sort } = args;

      const parentMenuId = mongoose.Types.ObjectId(parentMenu);

      const currentMenu = await MenuDepth_1.findOne({ _id: parentMenu });

      try {
        const result = await MenuDepth_2.create({
          parentMenu: parentMenuId,
          name,
          sort,
          link: "",
          useYn: false,
        });

        try {
          const result2 = await MenuDepth_2.updateOne(
            {
              _id: result._id,
            },
            {
              $set: {
                link: currentMenu.isProduct
                  ? `/product?cmenu=${result._id}`
                  : ``,
              },
            }
          );

          currentMenu.subMenu.push(result._id);
          currentMenu.save();

          return true;
        } catch (e) {
          console.log(e);
          return false;
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
