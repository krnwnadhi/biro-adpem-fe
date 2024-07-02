import { Container, Overlay, Text, Title } from "@mantine/core";

import { Fade } from "react-awesome-reveal";
import { ParallaxBanner } from "react-scroll-parallax";
import classes from "./HeroHeader.module.css";

const HeroHeader = () => {
    return (
        <ParallaxBanner
            layers={[
                {
                    image: "https://images.unsplash.com/photo-1690446142957-124a5800e656?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                    amount: 0.5,
                    speed: -35,
                    scale: [1, 1.1, "easeInOutBack"],
                    expanded: false,
                },
            ]}
            style={{ height: "100vh" }}
        >
            <Overlay color="#000" backgroundOpacity={0.65} zIndex={1} />
            <div className={classes.wrapper}>
                <div className={classes.inner}>
                    <Fade cascade triggerOnce duration={2000}>
                        <Title className={classes.title}>
                            Biro Administrasi Pembangunan
                            <Text inherit className={classes.highlight}>
                                Setda Provinsi Jambi
                            </Text>
                        </Title>

                        <Container size={640}>
                            <Text size="lg" className={classes.description}>
                                Selamat Datang di Website
                            </Text>
                            <Text size="lg" className={classes.description}>
                                Biro Administrasi Pembangunan Setda Provinsi
                                Jambi
                            </Text>
                        </Container>
                    </Fade>
                </div>
            </div>
        </ParallaxBanner>
    );
};

export default HeroHeader;
