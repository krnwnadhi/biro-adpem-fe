import { Container, Image, Space } from "@mantine/core";

import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import classes from "./AboutNew.module.css";
import { useRef } from "react";

const AboutNew = () => {
    const images = [
        "https://res.cloudinary.com/degzbxlnx/image/upload/v1758011418/7_itwrfr.png",
        "https://res.cloudinary.com/degzbxlnx/image/upload/v1758011481/8_q54gid.png",
        "https://res.cloudinary.com/degzbxlnx/image/upload/v1758011415/9_ufklzz.png",
        "https://res.cloudinary.com/degzbxlnx/image/upload/v1758011405/10_fcktfo.png",
    ];

    const slides = images.map((url) => (
        <Carousel.Slide key={url}>
            <Image src={url} />
        </Carousel.Slide>
    ));

    const autoplay = useRef(Autoplay({ delay: 2500 }));

    return (
        <>
            <Space h="xl" />

            <Container size="lg" p="lg">
                <Carousel
                    classNames={classes}
                    withIndicators
                    loop
                    plugins={[autoplay.current]}
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                >
                    {slides}
                </Carousel>
            </Container>
        </>
    );
};

export default AboutNew;
