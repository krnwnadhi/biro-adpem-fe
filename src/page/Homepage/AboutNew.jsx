import { Container, Image, Space } from "@mantine/core";

import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import classes from "./AboutNew.module.css";
import { useRef } from "react";

const AboutNew = () => {
    const images = [
        "https://res.cloudinary.com/degzbxlnx/image/upload/v1760933337/ul9rrnubtattotxkx3m3_nikags.webp",
        "https://res.cloudinary.com/degzbxlnx/image/upload/v1760933276/sahz29y7u1rf4blqvhix_hwyp66.webp",
        "https://res.cloudinary.com/degzbxlnx/image/upload/v1760933300/scpb34te7ofox4bh8x37_smhikd.webp",
        "https://res.cloudinary.com/degzbxlnx/image/upload/v1760933321/ypkzfchcvciy1vgxfqvc_tc0ytu.webp",
    ];

    const slides = images.map((url) => (
        <Carousel.Slide key={url}>
            <Image src={url} radius="md" />
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
