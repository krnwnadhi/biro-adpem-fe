import "dayjs/locale/id";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const DateFormat = ({ date }) => {
    dayjs.extend(relativeTime);

    const today = dayjs().startOf("day");
    const targetDate = dayjs(date).startOf("day");

    if (targetDate.isSame(today, "day")) {
        return dayjs(date).locale("id").fromNow();
    } else {
        return dayjs(date).locale("id").format("DD MMMM YYYY");
    }
};
