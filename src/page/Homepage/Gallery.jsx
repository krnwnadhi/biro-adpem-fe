import {
    Button,
    Container,
    Divider,
    Paper,
    Progress,
    Space,
    Text,
    Title,
    rem,
    useMantineTheme,
} from "@mantine/core";
import { useCallback, useEffect, useRef, useState } from "react";

import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import classes from "./Gallery.module.css";
import { useMediaQuery } from "@mantine/hooks";

const data = [
    {
        image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Best forests to visit in North America",
        category: "nature",
    },
    {
        image: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Hawaii beaches review: better than you think",
        category: "beach",
    },
    {
        image: "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Mountains at night: 12 best locations to enjoy the view",
        category: "nature",
    },
    {
        image: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Aurora in Norway: when to visit for best experience",
        category: "nature",
    },
    {
        image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Best places to visit this winter",
        category: "tourism",
    },
    {
        image: "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
        title: "Active volcanos reviews: travel at your own risk",
        category: "nature",
    },
];

/* eslint-disable react/prop-types */
function Card({ image, title, category }) {
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
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
            </div>
            <Button variant="white" color="dark">
                Read article
            </Button>
        </Paper>
    );
}

export function Gallery() {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    const slides = data.map((item) => (
        <Carousel.Slide key={item.title}>
            <Card {...item} />
        </Carousel.Slide>
    ));

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

            <Container size="xl">
                <Divider
                    my="xl"
                    labelPosition="left"
                    label={
                        <Text c="blue" fs="italic" fz="h6" fw={700}>
                            GALERI
                        </Text>
                    }
                    color="blue"
                />

                <Carousel
                    classNames={classes}
                    slideSize={{ base: "100%", sm: "30%" }}
                    slideGap={{ base: rem(2), sm: "xl" }}
                    align="start"
                    slidesToScroll={mobile ? 1 : 3}
                    loop
                    dragFree
                    getEmblaApi={setEmbla}
                    initialSlide={2}
                    // withControls
                    // withIndicators
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
