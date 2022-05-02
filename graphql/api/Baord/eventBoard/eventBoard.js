import EventBoard from "../../../models/EventBoard";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
  Query: {
    getEventBoard: async (_, args) => {
      const { limit, currentPage } = args;
      try {
        const result = await EventBoard.find()
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(currentPage * limit);

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getEventBoardClient: async (_, args) => {
      const { limit, currentPage } = args;
      try {
        const result = await EventBoard.find({
          isDelete: false,
        })
          .sort({ createdAt: -1 })
          .limit(limit)
          .skip(currentPage * limit);

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },

    getEventBoardTotalPage: async (_, args) => {
      const { limit } = args;

      try {
        const result = await EventBoard.find({}).sort({
          createdAt: -1,
        });

        const cnt = result.length;

        const realTotalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

        return parseInt(realTotalPage);
      } catch (e) {
        console.log(e);
        return 0;
      }
    },

    getEventBoardTotalPageClient: async (_, args) => {
      const { limit } = args;

      try {
        const result = await EventBoard.find({
          isDelete: false,
        }).sort({
          createdAt: -1,
        });

        const cnt = result.length;

        const realTotalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

        return parseInt(realTotalPage);
      } catch (e) {
        console.log(e);
        return 0;
      }
    },

    getEventBoardDetail: async (_, args) => {
      const { id } = args;
      try {
        const result = await EventBoard.findOne({ _id: id });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
    getEventBoardNextId: async (_, args) => {
      const { id } = args;
      try {
        const result = await EventBoard.findOne({
          _id: { $gt: id },
          isDelete: false,
        }).sort({
          createdAt: 1,
        });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
    getEventBoardBeforeId: async (_, args) => {
      const { id } = args;
      try {
        const result = await EventBoard.findOne({
          _id: { $lt: id },
          isDelete: false,
        })
          .sort({
            createdAt: -1,
          })
          .limit(1);

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },

    getEventBoardList: async (_, args) => {
      try {
        const result = await EventBoard.find({ isDelete: false }).sort({
          createdAt: 1,
        });

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },

  Mutation: {
    createEventBoard: async (_, args) => {
      const { thumbnail, title, description, eventTerm } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await EventBoard.create({
          thumbnail,
          title,
          eventTerm,
          description,
          isDelete: false,
          createdAt: current,
        });

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    modifyEventBoard: async (_, args) => {
      const { id, description } = args;

      try {
        const result = await EventBoard.updateOne(
          {
            _id: id,
          },
          {
            $set: {
              description,
            },
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    modifyEventBoardBasic: async (_, args) => {
      const { id, title, eventTerm, thumbnail } = args;

      try {
        const result = await EventBoard.updateOne(
          { _id: id },
          {
            $set: {
              title,
              eventTerm,
              thumbnail,
            },
          }
        );

        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    deleteEvent: async (_, args) => {
      const { id } = args;

      try {
        const current = await CURRENT_TIME();

        const result = await EventBoard.updateOne(
          { _id: id },
          {
            $set: {
              isDelete: true,
              deletedAt: current,
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
