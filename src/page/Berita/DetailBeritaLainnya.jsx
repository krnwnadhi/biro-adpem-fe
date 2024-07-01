/* eslint-disable react/prop-types */

import { Card, Group, Image, Text } from "@mantine/core";

import classes from "./DetailBeritaLainnya.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const DetailBeritaLainnya = ({
    imgSrc,
    title,
    createdAt,
    linkBerita,
}) => {
    dayjs.extend(relativeTime);

    const formatDate = (date) => {
        const today = dayjs().startOf("day");
        const targetDate = dayjs(date).startOf("day");

        if (targetDate.isSame(today, "day")) {
            return dayjs(date).locale("id").fromNow();
        } else {
            return dayjs(date).locale("id").format("DD MMMM YYYY");
        }
    };

    return (
        <Card
            // withBorder
            radius="md"
            p={0}
            className={classes.card}
            component="a"
            href={linkBerita}
        >
            <Group wrap="nowrap" gap={0}>
                <Image
                    src={imgSrc}
                    radius="md"
                    h={80}
                    w="auto"
                    fit="contain"
                    className={classes.image}
                    ml="xs"
                />
                <div className={classes.body}>
                    <Text
                        className={classes.title}
                        mt="xs"
                        mb="md"
                        c="blue"
                        lineClamp={2}
                    >
                        {title}
                    </Text>

                    <Group wrap="nowrap" gap="xs">
                        <Text size="10px" c="dimmed">
                            {formatDate(createdAt)}
                        </Text>
                    </Group>
                </div>
            </Group>
        </Card>
    );
};
