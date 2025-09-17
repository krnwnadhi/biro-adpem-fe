import { Overlay, Text, Title } from "@mantine/core";

import { Fade } from "react-awesome-reveal";
import { ParallaxBanner } from "react-scroll-parallax";
import classes from "./HeroHeader.module.css";

const HeroHeader = () => {
    return (
        <ParallaxBanner
            layers={[
                {
                    image: "https://res.cloudinary.com/degzbxlnx/image/upload/v1757910236/WhatsApp_Image_2025-09-04_at_15.06.51_kxosoe.jpg",
                    amount: 0.5,
                    speed: -35,
                    scale: [1, 1.1, "easeInOutBack"],
                    expanded: false,
                },
            ]}
            style={{ height: "100vh" }}
        >
            <Overlay color="#000" backgroundOpacity={0.55} zIndex={1} />
            <div className={classes.wrapper}>
                <div className={classes.inner}>
                    <Fade cascade triggerOnce duration={2000}>
                        <Title className={classes.title}>
                            SELAMAT DATANG DI WEBSITE
                            <Text inherit className={classes.highlight}>
                                BIRO ADMINISTRASI PEMBANGUNAN
                            </Text>
                            <Text inherit className={classes.highlight}>
                                SETDA PROVINSI JAMBI
                            </Text>
                        </Title>
                    </Fade>
                </div>
            </div>
        </ParallaxBanner>
    );
};

export default HeroHeader;
