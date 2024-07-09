import {
    ActionIcon,
    Anchor,
    Breadcrumbs,
    Container,
    CopyButton,
    Divider,
    Grid,
    Group,
    LoadingOverlay,
    Overlay,
    Space,
    Stack,
    Text,
    ThemeIcon,
    Title,
    Tooltip,
    rem,
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

import { DateFormat } from "../../utils/DateFormat";
import { DetailBeritaLainnya } from "./DetailBeritaLainnya";
import ErrorNetwork from "../Error/ErrorNetwork";
import { ParallaxBanner } from "react-scroll-parallax";
import classes from "./DetailBerita.module.css";
import { nprogress } from "@mantine/nprogress";
import { useParams } from "react-router-dom/cjs/react-router-dom";

// import { useMediaQuery } from "@mantine/hooks";

export const DetailBerita = () => {
    const { id } = useParams();

    const dispatch = useDispatch();

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

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const breadcrumbsItem = [
        { title: "Beranda", href: "/" },
        { title: "Informasi", href: "#" },
        { title: "Berita & Kegiatan", href: "/berita" },
        { title: postDetail?.title },
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

    if (appError || serverError) {
        return <ErrorNetwork />;
    } else {
        null;
    }

    return (
        <Fragment>
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 10 }}
            />

            {/* HEROHEADER */}
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
                            <Text size="xs" fs="italic" mt="xs" c="white">
                                {postDetail?.category}
                            </Text>

                            {/* JUDUL */}
                            <Title className={classes.title}>
                                {postDetail?.title}
                            </Title>

                            {/* GRUP */}
                            <Text size="xs" className={classes.description}>
                                {/* GRUP TANGGAL ADMIN */}
                                <Stack>
                                    <Group gap="xs">
                                        <Tooltip
                                            transition="slide-up"
                                            label="Tanggal Upload"
                                            withArrow
                                            arrowOffset={10}
                                            arrowSize={5}
                                            transitionProps={{
                                                transition: "slide-down",
                                                duration: 300,
                                            }}
                                            events={{
                                                hover: true,
                                                touch: true,
                                            }}
                                        >
                                            <ThemeIcon
                                                autoContrast
                                                variant="default"
                                                size="sm"
                                            >
                                                <IconCalendar size={12} />
                                            </ThemeIcon>
                                        </Tooltip>
                                        <Text size="xs">
                                            <DateFormat
                                                date={postDetail?.createdAt}
                                            />
                                        </Text>
                                    </Group>

                                    {/* GRUP DILIHAT COPYURL */}
                                    <Group>
                                        <Group gap="xs">
                                            <Tooltip
                                                ontouch
                                                transition="slide-up"
                                                label="Dilihat"
                                                withArrow
                                                arrowOffset={10}
                                                arrowSize={5}
                                                transitionProps={{
                                                    transition: "slide-down",
                                                    duration: 300,
                                                }}
                                                events={{
                                                    hover: true,
                                                    touch: true,
                                                }}
                                            >
                                                <ThemeIcon
                                                    variant="default"
                                                    size="sm"
                                                >
                                                    <IconEye size={12} />
                                                </ThemeIcon>
                                            </Tooltip>
                                            <Text fz="xs">
                                                {postDetail?.numViews} Kali
                                            </Text>
                                        </Group>

                                        {/* COPY */}
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
                                                    transition="slide-up"
                                                    transitionProps={{
                                                        transition:
                                                            "slide-down",
                                                        duration: 300,
                                                    }}
                                                    events={{
                                                        hover: true,
                                                        touch: true,
                                                    }}
                                                >
                                                    <ActionIcon
                                                        color={
                                                            copied
                                                                ? "teal"
                                                                : "gray"
                                                        }
                                                        onClick={copy}
                                                        size={24}
                                                    >
                                                        {copied ? (
                                                            <IconCheck
                                                                style={{
                                                                    width: rem(
                                                                        12
                                                                    ),
                                                                }}
                                                            />
                                                        ) : (
                                                            <IconCopy
                                                                style={{
                                                                    width: rem(
                                                                        12
                                                                    ),
                                                                }}
                                                            />
                                                        )}
                                                    </ActionIcon>
                                                </Tooltip>
                                            )}
                                        </CopyButton>
                                    </Group>
                                </Stack>
                            </Text>
                        </Container>
                    </div>
                </div>
            </ParallaxBanner>

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
                </Grid>
            </Container>
        </Fragment>
    );
};
