/* eslint-disable react/prop-types */

import { Card, Group, Image, Text } from "@mantine/core";

import { DateFormat } from "../../utils/DateFormat";
import classes from "./DetailBeritaLainnya.module.css";

export const DetailBeritaLainnya = ({
    imgSrc,
    title,
    createdAt,
    linkBerita,
}) => {
    return (
        <Card
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
                            <DateFormat date={createdAt} />
                        </Text>
                    </Group>
                </div>
            </Group>
        </Card>
    );
};
