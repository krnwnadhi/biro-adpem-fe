import {
    Anchor,
    AspectRatio,
    Breadcrumbs,
    Card,
    Container,
    Image,
    SimpleGrid,
    Space,
    Text,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import classes from "./AllBerita.module.css";
import dayjs from "dayjs";
import { fetchAllPostAction } from "../../redux/slices/posts/postSlice";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect } from "react";

export const AllBerita = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPostAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const post = useSelector((state) => state?.post);

    // eslint-disable-next-line no-unused-vars
    const { appError, loading, postList = [], serverError } = post;

    const { result = [] } = postList;

    const breadcrumbsItem = [
        { title: "Home", href: "/" },
        { title: "Informasi", href: "#" },
        { title: "Berita & Kegiatan", href: "/berita" },
    ].map((item, index) => (
        <Anchor
            href={item.href}
            key={index}
            size="xs"
            underline={false}
            truncate="end"
        >
            {item.title}
        </Anchor>
    ));

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

    const cards = result.map((article) => (
        <Card
            key={article.title}
            p="md"
            radius="md"
            component="a"
            href={`/berita/${article?.id}`}
            shadow="lg"
            className={classes.card}
        >
            <AspectRatio ratio={1920 / 1080}>
                <Image src={article.image} />
            </AspectRatio>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
                {formatDate(article.createdAt)}
            </Text>
            <Text className={classes.title} mt={5}>
                {article.title}
            </Text>
        </Card>
    ));

    return (
        <Container size="lg" mt={100} mih="80vh">
            <Breadcrumbs>{breadcrumbsItem}</Breadcrumbs>

            <Space h="xl" />

            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing={{ base: 10, sm: "xl" }}
                verticalSpacing={{ base: 25, md: "md" }}
            >
                {cards}
            </SimpleGrid>
        </Container>
    );
};
