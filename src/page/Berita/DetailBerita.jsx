import {
    ActionIcon,
    Anchor,
    Breadcrumbs,
    Container,
    CopyButton,
    Divider,
    Grid,
    Group,
    Overlay,
    Space,
    Text,
    ThemeIcon,
    Title,
    Tooltip,
} from "@mantine/core";
import { Fragment, useEffect } from "react";
import {
    IconCalendar,
    IconCheck,
    IconCopy,
    IconEye,
} from "@tabler/icons-react";
import {
    fetchAllPostAction,
    fetchDetailPostAction,
} from "../../redux/slices/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";

import { DetailBeritaLainnya } from "./DetailBeritaLainnya";
import { ParallaxBanner } from "react-scroll-parallax";
import classes from "./DetailBerita.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useParams } from "react-router-dom/cjs/react-router-dom";

// import { useMediaQuery } from "@mantine/hooks";

export const DetailBerita = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

    dayjs.extend(relativeTime);

    // const theme = useMantineTheme();
    // const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

    useEffect(() => {
        dispatch(fetchAllPostAction());
        dispatch(fetchDetailPostAction(id));
        window.scrollTo(0, 0);
    }, [id, dispatch]);

    const post = useSelector((state) => state?.post);

    // eslint-disable-next-line no-unused-vars
    const {
        appError,
        loading,
        postDetail = [],
        postList = [],
        serverError,
    } = post;

    const { result = [] } = postList;
    console.log(result);

    const formatDate = (date) => {
        const today = dayjs().startOf("day");
        const targetDate = dayjs(date).startOf("day");

        if (targetDate.isSame(today, "day")) {
            return dayjs(date).locale("id").fromNow();
        } else {
            return dayjs(date).locale("id").format("DD MMMM YYYY");
        }
    };

    const breadcrumbsItem = [
        { title: "Beranda", href: "/" },
        { title: "Informasi", href: "#" },
        { title: "Berita & Kegiatan", href: "/berita" },
        { title: postDetail.title },
    ].map((item, index) => (
        <Anchor
            href={item.href}
            key={index}
            size="xs"
            underline="hover"
            truncate="end"
            c="white"
            my="xl"
        >
            {item.title}
        </Anchor>
    ));

    return (
        <Fragment>
            {/* HEROHEADER */}
            <div>
                <ParallaxBanner
                    layers={[
                        {
                            image: postDetail?.image,
                            amount: 0.5,
                            speed: -35,
                            scale: [1, 1.1, "easeInOutBack"],
                        },
                    ]}
                    className={classes.banner}
                >
                    <Overlay color="#000" opacity={1} blur={5} zIndex={1} />

                    <div className={classes.wrapper}>
                        <div className={classes.inner}>
                            <Container size="lg">
                                <Breadcrumbs>{breadcrumbsItem}</Breadcrumbs>

                                {/* KATEGORI */}
                                <Text size="xs" fs="italic" mt="xl" c="white">
                                    {postDetail?.category}
                                </Text>

                                {/* JUDUL */}
                                <Title className={classes.title}>
                                    {postDetail?.title}
                                </Title>

                                <Space h="md" />

                                {/* GRUP */}
                                <Text size="xs" className={classes.description}>
                                    <Group justify="space-between" gap="xs">
                                        {/* GRUP TANGGAL ADMIN */}
                                        <Group gap="xs">
                                            <ThemeIcon
                                                autoContrast
                                                variant="default"
                                                size="sm"
                                            >
                                                <IconCalendar size={12} />
                                            </ThemeIcon>
                                            <Text size="xs">
                                                {formatDate(
                                                    postDetail?.createdAt
                                                )}
                                            </Text>
                                        </Group>

                                        {/* GRUP DILIHAT COPYURL */}
                                        <Group>
                                            <Group gap="xs">
                                                <ThemeIcon
                                                    variant="default"
                                                    size="sm"
                                                >
                                                    <IconEye size={12} />
                                                </ThemeIcon>
                                                <Text fz="xs">
                                                    {postDetail?.numViews} Kali
                                                </Text>
                                            </Group>
                                            <CopyButton
                                                value={`https://adpem.jambiprov.go.id/berita/${postDetail?.id}`}
                                                timeout={2000}
                                            >
                                                {({ copied, copy }) => (
                                                    <Tooltip
                                                        label={
                                                            copied
                                                                ? "URL disalin"
                                                                : "Salin URL"
                                                        }
                                                        withArrow
                                                        position="right"
                                                    >
                                                        <ActionIcon
                                                            color={
                                                                copied
                                                                    ? "teal"
                                                                    : "gray"
                                                            }
                                                            onClick={copy}
                                                        >
                                                            {copied ? (
                                                                <IconCheck
                                                                    size={12}
                                                                />
                                                            ) : (
                                                                <IconCopy
                                                                    size={12}
                                                                />
                                                            )}
                                                        </ActionIcon>
                                                    </Tooltip>
                                                )}
                                            </CopyButton>
                                        </Group>
                                    </Group>
                                </Text>
                            </Container>
                        </div>
                    </div>
                </ParallaxBanner>
            </div>

            {/* ISI BERITA */}
            <Container size="lg" mt="xl">
                <Grid gutter={65}>
                    <Grid.Col span={{ base: 12, xs: 8 }}>
                        <Text
                            dangerouslySetInnerHTML={{
                                __html: postDetail?.description,
                            }}
                            size="sm"
                            ta="justify"
                        />
                    </Grid.Col>

                    {/* BERITA LAINNYA */}
                    <Grid.Col span={{ base: 12, xs: 4 }}>
                        <Text fs="italic">BERITA LAINNYA</Text>

                        <Divider my="xs" size="sm" />

                        {result
                            ?.map((item) => {
                                return (
                                    <Fragment key={item.id}>
                                        <Space h="md" />

                                        {id !== item?.id ? (
                                            <DetailBeritaLainnya
                                                imgSrc={item?.image}
                                                title={item?.title}
                                                createdAt={item?.createdAt}
                                                linkBerita={`/berita/${item?.id}`}
                                            />
                                        ) : null}
                                    </Fragment>
                                );
                            })
                            .slice(0, 5)}
                    </Grid.Col>

                    {/* ERROR */}
                    <Grid.Col md={4} lg={2} offset={1}>
                        <Text>{appError || serverError}</Text>
                    </Grid.Col>
                </Grid>
            </Container>
        </Fragment>
    );
};
