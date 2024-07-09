import {
    Button,
    Container,
    Divider,
    Group,
    Paper,
    Progress,
    Space,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { IconExternalLink } from "@tabler/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import classes from "./Gallery.module.css";
import { fetchAllGalleryAction } from "../../redux/slices/gallery/gallerySlice";
import { useMediaQuery } from "@mantine/hooks";

/* eslint-disable react/prop-types */
function Card({ image, category }) {
    return (
        <Paper
            shadow="xl"
            p="xl"
            radius="md"
            style={{ backgroundImage: `url(${image})` }}
            className={classes.card}
        >
            <div>
                <Text className={classes.category} size="xs">
                    {category}
                </Text>
            </div>
        </Paper>
    );
}

export function Gallery() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllGalleryAction(""));
    }, [dispatch]);

    const gallery = useSelector((state) => state?.gallery);
    const { appError, serverError, galleryList = [], loading } = gallery;
    const { result = [] } = galleryList;
    console.log(result);

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const slides = result
        ?.map((item) => (
            <Carousel.Slide key={item?.id}>
                <Card {...item} />
            </Carousel.Slide>
        ))
        .slice(0, 5);

    const [scrollProgress, setScrollProgress] = useState(0);
    const [embla, setEmbla] = useState(null);

    const autoplay = useRef(Autoplay({ delay: 2000 }));

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

    return (
        <>
            <Space h="xl" />

            <Container size="lg">
                <Divider
                    mt="xl"
                    labelPosition="left"
                    label={
                        <Text c="blue" fs="italic" fz="h6" fw={700}>
                            GALERI
                        </Text>
                    }
                    color="blue"
                />

                <Group justify="flex-end">
                    <Button
                        size="xs"
                        radius="md"
                        component={Link}
                        to={"/galeri"}
                        variant="gradient"
                        my="xl"
                        rightSection={
                            <IconExternalLink size={18} variant="default" />
                        }
                    >
                        LIHAT SEMUA GALERI
                    </Button>
                </Group>

                <Carousel
                    classNames={classes}
                    slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
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
}
