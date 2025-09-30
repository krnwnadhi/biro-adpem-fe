/* eslint-disable react/prop-types */

import {
    BackgroundImage,
    Badge,
    Box,
    Card,
    Center,
    Container,
    Flex,
    Grid,
    Group,
    Image,
    Loader,
    Pagination,
    Stack,
    Text,
    Title,
    rem,
} from "@mantine/core";
import {
    fetchAllPostAction,
    fetchPaginationPostAction,
} from "../../../redux/slices/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { DateFormat } from "../../../utils/DateFormat";
import { Fade } from "react-awesome-reveal";
import { IconEye } from "@tabler/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import classes from "./AllBeritaNew.module.css";
import { useMediaQuery } from "@mantine/hooks";

// --- KOMPONEN KARTU BERITA (didefinisikan di dalam file yang sama) ---
function NewsCard({
    title,
    category,
    createdAt,
    image,
    description,
    isMobile,
    numViews,
}) {
    if (isMobile) {
        return (
            <Card
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                // bg="white"
                // c="black"
            >
                <Stack>
                    <Image
                        src={image}
                        height={125}
                        width={125}
                        radius="md"
                        alt={title}
                        fit="cover"
                    />
                    <Stack gap="xs" mt="xs">
                        <Badge
                            color="red"
                            size="sm"
                            variant="light"
                            w="fit-content"
                        >
                            {category}
                        </Badge>
                        <Text fw={700} size="sm" lineClamp={2}>
                            {title}
                        </Text>
                        <Text
                            size="xs"
                            c="dimmed"
                            lineClamp={3}
                            dangerouslySetInnerHTML={{
                                __html: description,
                            }}
                        />
                        <Group justify="space-between" gap="xs">
                            <Text size="xs" c="dimmed">
                                <DateFormat date={createdAt} />
                            </Text>
                            <Center inline>
                                <IconEye
                                    style={{
                                        width: rem(16),
                                        height: rem(16),
                                        marginRight: rem(4),
                                    }}
                                    stroke={1.5}
                                    color="var(--mantine-color-dark-2)"
                                />

                                <Text size="xs" c="dimmed">
                                    <Text size="sm">{numViews}</Text>
                                </Text>
                            </Center>
                        </Group>
                    </Stack>
                </Stack>
            </Card>
        );
    }

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            // bg="white"
            // c="black"
        >
            <Group wrap="nowrap" align="start">
                <Image
                    src={image}
                    height={150}
                    width={150}
                    radius="md"
                    alt={title}
                    fit="cover"
                />
                <Stack gap="xs" ml={5}>
                    <Badge color="red" variant="light">
                        {category}
                    </Badge>
                    <Text fw={700} size="sm" lineClamp={2}>
                        {title}
                    </Text>
                    <Text
                        size="xs"
                        c="dimmed"
                        lineClamp={2}
                        dangerouslySetInnerHTML={{
                            __html: description,
                        }}
                    />
                    <Group justify="space-between" gap="xs">
                        <Text size="xs" c="dimmed">
                            <DateFormat date={createdAt} />
                        </Text>
                        <Center inline>
                            <IconEye
                                style={{
                                    width: rem(16),
                                    height: rem(16),
                                    marginRight: rem(8),
                                }}
                                stroke={1.5}
                                color="var(--mantine-color-dark-2)"
                            />

                            {/* <Space w="xs" /> */}

                            <Text size="xs" c="dimmed">
                                <Text size="xs">{numViews}</Text>
                            </Text>
                        </Center>
                    </Group>
                </Stack>
            </Group>
        </Card>
    );
}

export default function AllBeritaNew() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPostAction());
        dispatch(fetchPaginationPostAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const posts = useSelector((state) => state?.post);
    // console.log(posts);

    const {
        appError,
        loading,
        postList = [],
        postPagination: postWithoutPagination = [],
        serverError,
    } = posts;

    const { result } = postWithoutPagination;
    // console.log(result);

    const ITEMS_PER_PAGE = 3;
    const [activePage, setPage] = useState(1);

    // Hitung total halaman yang dibutuhkan
    const totalPages = Math.ceil(result?.length / ITEMS_PER_PAGE);

    // Ambil data untuk halaman saat ini
    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = result?.slice(startIndex, endIndex);

    // console.log(paginatedData);

    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <BackgroundImage
            src="https://res.cloudinary.com/degzbxlnx/image/upload/v1757909502/WhatsApp_Image_2025-09-04_at_15.18.49_oqaxoc.jpg"
            className={classes.wrapper}
        >
            <Box className={classes.overlay}>
                {/* Ini akan menjadi flex container */}
                <Container className={classes.innerContainer} size="lg">
                    {/*  Wrapper untuk konten yang akan tumbuh */}
                    <Box className={classes.content}>
                        <Center>
                            {/* Gunakan font size responsif untuk Judul */}
                            <Title
                                order={1}
                                c="white"
                                mb="xl"
                                fz={{ base: "h2", sm: "h1" }}
                                ta="center"
                            >
                                BERITA DAN ARTIKEL KEGIATAN
                            </Title>
                        </Center>

                        <Grid>
                            {paginatedData &&
                                paginatedData?.map((item) => (
                                    <>
                                        <Grid.Col span={12} key={item?.id}>
                                            <Fade triggerOnce>
                                                <Link
                                                    to={`/berita/${item?.id}`}
                                                    className={classes.cardLink}
                                                >
                                                    <Box
                                                        className={
                                                            classes.cardWrapper
                                                        }
                                                    >
                                                        {/*  Kirim prop isMobile ke komponen NewsCard */}
                                                        {loading ? (
                                                            <Center
                                                                maw={400}
                                                                h={125}
                                                            >
                                                                <Loader />
                                                            </Center>
                                                        ) : (
                                                            <NewsCard
                                                                {...item}
                                                                isMobile={
                                                                    isMobile
                                                                }
                                                            />
                                                        )}
                                                    </Box>
                                                </Link>
                                            </Fade>
                                        </Grid.Col>
                                    </>
                                ))}
                        </Grid>
                    </Box>

                    {/* 2. Wrapper untuk paginasi */}
                    <Box className={classes.footer}>
                        {totalPages > 0 && ( // Selalu tampilkan wrapper footer, tapi paginasi hanya jika ada halaman
                            <Flex justify="center" align="center" mt="xl">
                                {totalPages > 1 && (
                                    <Pagination
                                        total={totalPages}
                                        value={activePage}
                                        onChange={setPage}
                                        // Buat paginasi lebih ringkas di mobile
                                        size={isMobile ? "sm" : "md"}
                                        withEdges
                                    />
                                )}
                            </Flex>
                        )}
                    </Box>
                </Container>
            </Box>
        </BackgroundImage>
    );
}
