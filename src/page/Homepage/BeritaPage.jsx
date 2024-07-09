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
    Progress,
    Space,
    Stack,
    Text,
    Title,
    TypographyStylesProvider,
    useMantineTheme,
} from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { DateFormat } from "../../utils/DateFormat";
import ErrorNetwork from "../Error/ErrorNetwork";
import { IconExternalLink } from "@tabler/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import classes from "./BeritaPage.module.css";
import { fetchAllPostAction } from "../../redux/slices/posts/postSlice";
import { useMediaQuery } from "@mantine/hooks";

const BeritaPage = () => {
    const dispatch = useDispatch();

    const [scrollProgress, setScrollProgress] = useState(0);
    const [embla, setEmbla] = useState(null);

    const autoplay = useRef(Autoplay({ delay: 3000 }));

    const handleScroll = useCallback(() => {
        if (!embla) return;
        const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
        setScrollProgress(progress * 100);
    }, [embla, setScrollProgress]);

    useEffect(() => {
        if (embla) {
            embla.on("scroll", handleScroll);
            handleScroll();
        }
        /* eslint-disable */
    }, [embla]);

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
    }, [dispatch]);

    const post = useSelector((state) => state?.post);
    const { appError, serverError, postList = [] } = post;

    const { result = [] } = postList;

    if (appError || serverError) {
        return <ErrorNetwork />;
    }

    const slides = result
        ?.map((item) => {
            return (
                <Carousel.Slide key={item.title}>
                    <Card
                        withBorder
                        radius="md"
                        p="md"
                        shadow="xl"
                        className={classes.card}
                    >
                        <Card.Section>
                            <AspectRatio ratio={16 / 9} pos="relative">
                                <Overlay
                                    color="#000"
                                    backgroundOpacity={0.35}
                                />
                                <Image src={item?.image} alt={item?.title} />
                            </AspectRatio>
                        </Card.Section>

                        <Stack mt="xl">
                            <Badge size="xs" variant="light" fullWidth>
                                {item?.category}
                            </Badge>

                            <Title textWrap="wrap" order={6} lineClamp={1}>
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

                        <Card.Section className={classes.section}>
                            <Group justify="space-between" mt="xl">
                                <Center>
                                    <Avatar
                                        src={item?.user?.profilePhoto}
                                        size={24}
                                        radius="xl"
                                        mr="xs"
                                    />
                                    <Text size="xs" c="dimmed">
                                        {item?.user?.fullName}
                                    </Text>
                                </Center>

                                <Text size="xs" c="dimmed">
                                    <DateFormat date={item?.createdAt} />
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
                                size="xs"
                            >
                                Baca Selengkapnya
                            </Button>
                        </Group>
                    </Card>
                </Carousel.Slide>
            );
        })
        .slice(0, 9);

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

                <Carousel
                    slideSize={{
                        base: "100%",
                        sm: "50%",
                        md: "33.333333%",
                    }}
                    slideGap="xl"
                    align="start"
                    slidesToScroll={mobile ? 1 : 3}
                    loop
                    dragFree
                    getEmblaApi={setEmbla}
                    initialSlide={2}
                    controlsOffset="xl"
                    plugins={[autoplay.current]}
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                >
                    {slides}
                </Carousel>
                <Progress
                    value={scrollProgress}
                    maw={320}
                    size="sm"
                    mt="xl"
                    mx="auto"
                />
            </Container>
        </>
    );
};

export default BeritaPage;
