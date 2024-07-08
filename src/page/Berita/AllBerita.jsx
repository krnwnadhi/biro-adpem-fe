/* eslint-disable no-unused-vars */

import {
    Anchor,
    Box,
    Breadcrumbs,
    Card,
    Center,
    Container,
    Divider,
    Group,
    Pagination,
    SimpleGrid,
    Skeleton,
    Space,
    Text,
    TextInput,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { IconEye, IconSearch } from "@tabler/icons-react";
import { Spotlight, spotlight } from "@mantine/spotlight";
import {
    fetchAllPostAction,
    fetchPaginationPostAction,
} from "../../redux/slices/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import ErrorNetwork from "../Error/ErrorNetwork";
import axios from "axios";
import { basePostURL } from "../../utils/baseURL";
import classes from "./AllBerita.module.css";
import dayjs from "dayjs";
import { nprogress } from "@mantine/nprogress";
import relativeTime from "dayjs/plugin/relativeTime";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

export const AllBerita = () => {
    const dispatch = useDispatch();

    const history = useHistory();

    const theme = useMantineTheme();

    useEffect(() => {
        dispatch(fetchAllPostAction());
        dispatch(fetchPaginationPostAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const post = useSelector((state) => state?.post);

    // eslint-disable-next-line no-unused-vars
    const {
        appError,
        loading,
        postList = [],
        postPagination: postWithoutPagination = [],
        serverError,
    } = post;

    const { result } = postWithoutPagination;
    console.log(result);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

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

        return () => {
            abortController.abort();
        };
    }, [page, keyword]);

    const getPost = async () => {
        const response = await axios.get(
            `${basePostURL}?search_query=${keyword}&page=${page}&limit=${limit}`
        );

        setPostItem(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalItem);
        setRows(response.data.totalPage);
    };

    const handlePageChange = (event) => {
        setPage(event);
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
        console.log(e.target);
        setQuery(e);
    };

    const breadcrumbsItem = [
        { title: "Beranda", href: "/" },
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
            <>
                <Skeleton visible={loading}>
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
                                <Text
                                    size="lg"
                                    className={classes.title}
                                    fw={500}
                                >
                                    {item.title}
                                </Text>

                                <Group justify="space-between" gap="xs">
                                    <Text size="xs" className={classes.author}>
                                        {formatDate(item.createdAt)}
                                    </Text>

                                    <Center>
                                        <IconEye
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                            stroke={1.5}
                                            color={theme.colors.dark[2]}
                                        />
                                        <Text
                                            size="sm"
                                            className={classes.bodyText}
                                        >
                                            {item.numViews}
                                        </Text>
                                    </Center>
                                </Group>
                            </div>
                        </div>
                    </Card>
                </Skeleton>
            </>
        ));

    const items =
        result &&
        result
            ?.filter((item) =>
                item?.title?.toLowerCase().includes(query.toLowerCase().trim())
            )
            .map((item) => (
                <Spotlight.Action
                    key={item?.title}
                    onClick={() => history.push(`/berita/${item?.id}`)}
                    highlightQuery
                    keywords={item?.title}
                >
                    <Group wrap="nowrap" w="100%">
                        {item?.image && (
                            <Center>
                                <img
                                    src={item?.image}
                                    alt={item?.title}
                                    width={50}
                                    height={50}
                                />
                            </Center>
                        )}

                        <div style={{ flex: 1 }}>
                            <Text size="sm" lineClamp={1}>
                                {item?.title}
                            </Text>
                        </div>
                    </Group>
                </Spotlight.Action>
            ));

    if (appError || serverError) {
        return <ErrorNetwork />;
    } else {
        null;
    }

    return (
        <>
            <Container size="lg" mt={100} mih="80vh">
                <Breadcrumbs>{breadcrumbsItem}</Breadcrumbs>

                <Space h="xl" />

                <TextInput
                    onClick={spotlight.open}
                    placeholder="Cari Berita..."
                />

                <Spotlight.Root
                    query={query}
                    onQueryChange={setQuery}
                    scrollable
                    maxHeight={350}
                >
                    <Spotlight.Search
                        placeholder="Judul Berita"
                        leftSection={<IconSearch stroke={1.5} />}
                    />
                    <Spotlight.ActionsList>
                        {items?.length > 0 ? (
                            items.slice(0, 5)
                        ) : (
                            <Spotlight.Empty>
                                Berita tidak ditemukan
                            </Spotlight.Empty>
                        )}
                    </Spotlight.ActionsList>
                </Spotlight.Root>

                <Space h="xl" />

                <SimpleGrid
                    cols={{ base: 1, sm: 2, md: 2 }}
                    spacing={{ base: "xl", sm: "xl" }}
                    verticalSpacing={{ base: "xl", md: "xl" }}
                >
                    {cards}
                </SimpleGrid>
                <Center>
                    <Box p={20}>
                        <Pagination
                            onChange={handlePageChange}
                            total={rows}
                            withControls
                            withEdges
                        />
                        <Center mt={10}>
                            <Text size="xs" mt={5}>
                                Halaman{" "}
                                <Text span fw={700}>
                                    {rows ? page : 0}
                                </Text>{" "}
                                dari{" "}
                                <Text span fw={700}>
                                    {rows}
                                </Text>{" "}
                                dari total :{" "}
                                <Text span fw={700}>
                                    {pages}
                                </Text>{" "}
                                berita
                            </Text>
                        </Center>
                    </Box>
                </Center>
            </Container>
        </>
    );
};
