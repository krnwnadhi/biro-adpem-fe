/* eslint-disable no-unused-vars */

import {
    ActionIcon,
    Anchor,
    AspectRatio,
    Box,
    Breadcrumbs,
    Card,
    Center,
    Container,
    Group,
    Image,
    Loader,
    Pagination,
    SimpleGrid,
    Space,
    Text,
    TextInput,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { IconEye, IconMessageCircle, IconSearch } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ErrorNetwork from "../Error/ErrorNetwork";
import axios from "axios";
import { basePostURL } from "../../utils/baseURL";
import classes from "./AllBerita.module.css";
import dayjs from "dayjs";
import { fetchAllPostAction } from "../../redux/slices/posts/postSlice";
import relativeTime from "dayjs/plugin/relativeTime";

export const AllBerita = () => {
    const dispatch = useDispatch();

    const theme = useMantineTheme();

    useEffect(() => {
        dispatch(fetchAllPostAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const post = useSelector((state) => state?.post);

    // eslint-disable-next-line no-unused-vars
    const { appError, loading, postList = [], serverError } = post;

    const [postItem, setPostItem] = useState([postList]);
    const [load, setLoad] = useState(false);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");

    // console.log(postItem);

    useEffect(() => {
        const abortController = new AbortController();

        getPost();
        // window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        setTimeout(() => setLoad(false), 2000);

        return () => {
            abortController.abort();
        };
    }, [page, keyword]);

    const getPost = async () => {
        const response = await axios.get(
            `${basePostURL}?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        // console.log(response);
        setPostItem(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalItem);
        setRows(response.data.totalPage);
    };

    const handlePageChange = (event) => {
        setPage(event);
        // console.log(event);
    };

    const searchData = (e) => {
        e.preventDefault();
        setLoad(true);
        setTimeout(() => {
            setPage(0);
            setKeyword(query);
            setLoad(false);
        }, 2500);
    };

    const handleTextInput = (e) => {
        setQuery(e.target.value);
    };

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

    const cards =
        postItem &&
        postItem?.map((item) => (
            <Card
                key={item.id}
                p="lg"
                shadow="lg"
                className={classes.card}
                radius="md"
                component="a"
                href={`/berita/${item?.id}`}
            >
                <div
                    className={classes.image}
                    style={{
                        backgroundImage: `url(${item.image})`,
                    }}
                />
                <div className={classes.overlay} />

                <div className={classes.content}>
                    <div>
                        <Text size="lg" className={classes.title} fw={500}>
                            {item.title}
                        </Text>

                        <Group justify="space-between" gap="xs">
                            <Text size="xs" className={classes.author}>
                                {formatDate(item.createdAt)}
                            </Text>

                            <Center>
                                <IconEye
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={1.5}
                                    color={theme.colors.dark[2]}
                                />
                                <Text size="sm" className={classes.bodyText}>
                                    {item.numViews}
                                </Text>
                            </Center>
                        </Group>
                    </div>
                </div>
            </Card>
        ));

    if (appError || serverError) {
        return <ErrorNetwork />;
    } else {
        null;
    }

    return (
        <Container size="lg" mt={100} mih="80vh">
            <Breadcrumbs>{breadcrumbsItem}</Breadcrumbs>

            <Space h="xl" />

            <TextInput
                placeholder="Cari..."
                value={query}
                onChange={handleTextInput}
                rightSection={
                    load ? (
                        <ActionIcon
                            loading={
                                load ? (
                                    <Loader size="sm" variant="dots" />
                                ) : null
                            }
                        />
                    ) : (
                        <ActionIcon
                            color="blue"
                            variant="transparent"
                            onClick={searchData}
                        >
                            <IconSearch size={18} stroke={1.5} />
                        </ActionIcon>
                    )
                }
            />

            <Space h="xl" />

            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 2 }}
                spacing={{ base: "xl", sm: "xl" }}
                verticalSpacing={{ base: "xl", md: "xl" }}
            >
                {cards}
            </SimpleGrid>

            <Center>
                <Box p={20} mt="xl">
                    <Pagination
                        onChange={handlePageChange}
                        total={rows}
                        withControls
                        withEdges
                    />
                </Box>
            </Center>
        </Container>
    );
};
