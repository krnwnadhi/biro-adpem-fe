import {
    Center,
    Container,
    Image,
    Space,
    Title,
    rem,
    useMantineTheme,
} from "@mantine/core";

import { Fade } from "react-awesome-reveal";
import classes from "./StrukturOrganisasi.module.css";
import { useMediaQuery } from "@mantine/hooks";

const StrukturOrganisasi = () => {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    return (
        <>
            <Container size="xl">
                <Fade cascade triggerOnce>
                    <Title my="sm" order={2} align="center">
                        Struktur Organisasi Biro Administrasi Pembangunan Setda
                        Provinsi Jambi
                    </Title>

                    <Space h="xl" />

                    <Center p={10}>
                        <Image
                            className={classes.image}
                            src="https://res.cloudinary.com/degzbxlnx/image/upload/v1690966461/Untitled_design_3_g4c2d0.png"
                            width={mobile ? rem(50) : rem(100)}
                            radius="md"
                            fallbackSrc="https://placehold.co/600x400?text=KESALAHAN!\nFoto+Gubernur\ndan\nWagub\nProvinsi+Jambi"
                        />
                    </Center>
                </Fade>
            </Container>
        </>
    );
};

export default StrukturOrganisasi;
