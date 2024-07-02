import "dayjs/locale/id";

import {
    AspectRatio,
    Avatar,
    Badge,
    Button,
    Card,
    Center,
    Container,
    Divider,
    Group,
    Image,
    Overlay,
    SimpleGrid,
    Space,
    Stack,
    Text,
    Title,
    TypographyStylesProvider,
} from "@mantine/core";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconExternalLink } from "@tabler/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import classes from "./BeritaPage.module.css";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { fetchAllPostAction } from "../../redux/slices/posts/postSlice";
import relativeTime from "dayjs/plugin/relativeTime";

const BeritaPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
    }, [dispatch]);

    dayjs.extend(customParseFormat);
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

    const post = useSelector((state) => state?.post);
    const { postList = [] } = post;

    const { result = [] } = postList;
    console.log(result);

    return (
        <>
            <Space h="xl" />

            <Container size="lg">
                <Divider
                    mt="xl"
                    labelPosition="left"
                    label={
                        <Text c="blue" fs="italic" fz="h6" fw={700}>
                            BERITA & KEGIATAN
                        </Text>
                    }
                    color="blue"
                />

                <Group justify="flex-end">
                    <Button
                        size="xs"
                        radius="md"
                        component={Link}
                        to={"/berita"}
                        variant="gradient"
                        my="xl"
                        rightSection={
                            <IconExternalLink size={18} variant="default" />
                        }
                    >
                        LIHAT SEMUA BERITA
                    </Button>
                </Group>

                <SimpleGrid
                    cols={{ base: 1, sm: 3 }}
                    spacing={{ base: 10, sm: "xl" }}
                    verticalSpacing={{ base: "xl", md: "md" }}
                >
                    {result
                        ?.map((item) => {
                            return (
                                <Fragment key={item?.id}>
                                    <Card
                                        withBorder
                                        radius="md"
                                        p="md"
                                        shadow="xl"
                                        className={classes.card}
                                    >
                                        <Card.Section>
                                            <AspectRatio
                                                ratio={16 / 9}
                                                pos="relative"
                                            >
                                                <Overlay
                                                    color="#000"
                                                    backgroundOpacity={0.35}
                                                />
                                                <Image
                                                    src={item?.image}
                                                    alt={item?.title}
                                                    // height={180}
                                                />
                                            </AspectRatio>
                                        </Card.Section>

                                        <Stack mt="xl">
                                            <Badge
                                                size="xs"
                                                variant="light"
                                                fullWidth
                                            >
                                                {item?.category}
                                            </Badge>

                                            <Title
                                                textWrap="wrap"
                                                order={6}
                                                lineClamp={1}
                                            >
                                                {item?.title}
                                            </Title>

                                            <TypographyStylesProvider>
                                                <Text
                                                    lineClamp={2}
                                                    c="dimmed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item?.description,
                                                    }}
                                                    size="xs"
                                                    ta="justify"
                                                />
                                            </TypographyStylesProvider>
                                        </Stack>

                                        <Card.Section
                                            className={classes.section}
                                        >
                                            <Group
                                                justify="space-between"
                                                mt="xl"
                                            >
                                                <Center>
                                                    <Avatar
                                                        src={
                                                            item?.user
                                                                ?.profilePhoto
                                                        }
                                                        size={24}
                                                        radius="xl"
                                                        mr="xs"
                                                    />
                                                    <Text size="xs" c="dimmed">
                                                        {item?.user?.fullName}
                                                    </Text>
                                                </Center>

                                                <Text size="xs" c="dimmed">
                                                    {formatDate(
                                                        item?.createdAt
                                                    )}
                                                </Text>
                                            </Group>
                                        </Card.Section>

                                        <Group mt="xs">
                                            <Button
                                                radius="md"
                                                style={{ flex: 1 }}
                                                component={Link}
                                                to={`/berita/${item?.id}`}
                                                variant="subtle"
                                            >
                                                Baca Selengkapnya
                                            </Button>
                                        </Group>
                                    </Card>
                                </Fragment>
                            );
                        })
                        .slice(0, 3)}
                </SimpleGrid>
            </Container>
        </>
    );
};

export default BeritaPage;
