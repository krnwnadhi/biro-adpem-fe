import "moment/locale/id";

import Moment from "react-moment";
import React from "react";

const dateFormatter = ({ date }) => {
    return (
        <Moment locale="id" format="DD MMMM YYYY">
            {date}
        </Moment>
    );
};

export default dateFormatter;
