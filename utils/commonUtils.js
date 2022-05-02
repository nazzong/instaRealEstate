const moment = require("moment");
require("moment-timezone");

export const CURRENT_TIME = async () => {
  moment.tz.setDefault("Asia/Seoul");
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  return date;
};
