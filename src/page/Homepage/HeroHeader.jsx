import { Container, Overlay, Text, Title } from "@mantine/core";

import classes from "./HeroHeader.module.css";

0;
0;
const HeroHeader = () => {
    return (
        <div className={classes.wrapper}>
            <Overlay color="#000" backgroundOpacity={0.65} zIndex={1} />

            <div className={classes.inner}>
                <Title className={classes.title}>
                    Biro Administrasi Pembangunan{" "}
                    <Text inherit className={classes.highlight}>
                        Setda Provinsi Jambi
                    </Text>
                </Title>

                <Container size={640}>
                    <Text size="lg" className={classes.description}>
                        Selamat Datang di Website
                    </Text>
                    <Text size="lg" className={classes.description}>
                        Biro Administrasi Pembangunan Setda Provinsi Jambi{" "}
                    </Text>
                </Container>
            </div>
        </div>
    );
};

export default HeroHeader;
