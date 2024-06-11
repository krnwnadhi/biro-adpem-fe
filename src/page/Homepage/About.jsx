import {
    Box,
    Card,
    Container,
    Divider,
    Image,
    Paper,
    SimpleGrid,
    Space,
    Text,
    rem,
} from "@mantine/core";

import { Fade } from "react-awesome-reveal";
import classes from "./About.module.css";

const About = () => {
    return (
        <>
            <Container size="xl" p="lg">
                <Divider
                    my="xl"
                    labelPosition="left"
                    label={
                        <Text c="blue" fs="italic" fz="h6" fw={700}>
                            TENTANG
                        </Text>
                    }
                    color="blue"
                />
                <SimpleGrid
                    cols={{ base: 1, md: 2 }}
                    spacing={{ base: 10, sm: "xl" }}
                    verticalSpacing={{ base: "xl", md: "md" }}
                >
                    <Paper
                        withBorder
                        shadow="md"
                        p="xl"
                        radius="md"
                        className={classes.box}
                    >
                        <Fade triggerOnce cascade>
                            <Box my="xs">
                                <Text
                                    c="blue"
                                    size={rem(28)}
                                    ta="right"
                                    fw={700}
                                >
                                    Biro Administrasi Pembangunan Setda Provinsi
                                    Jambi
                                </Text>
                            </Box>

                            <Space h="xl" />

                            <Text c="dimmed" ta="justify" size="sm">
                                Biro Administrasi Pembangunan merupakan salah
                                satu Biro pada Sekretariat Daerah Prov Jambi
                                yang bertugas membantu Asisten Perekonomian dan
                                Pembangunan dalam penyiapan pengoordinasian
                                perumusan kebijakan daerah, pengoordinasian
                                pelaksanaan tugas Perangkat Daerah, pemantauan
                                dan evaluasi pelaksanaan kebijakan daerah di
                                bidang pengendalian administrasi pelaksanaan
                                pembangunan daerah, pengendalian administrasi
                                pelaksanaan pembangunan wilayah, pelaksanaan
                                tugas Simpul Kerjasama Pemerintah dengan Badan
                                Usaha (KPBU) dalam penyediaan infrastruktur, dan
                                pelaporan pelaksanaan pembangunan.
                            </Text>
                        </Fade>
                    </Paper>
                    <Fade delay={500} triggerOnce>
                        <Image
                            className={classes.box}
                            height={370}
                            radius="md"
                            src="https://res.cloudinary.com/degzbxlnx/image/upload/v1690966461/Untitled_design_3_g4c2d0.png"
                            alt="With custom placeholder"
                            withPlaceholder
                            placeholder={
                                <Text size="sm">
                                    Gubernur & Wakil Gubernur Provinsi Jambi.png
                                </Text>
                            }
                        />
                    </Fade>
                </SimpleGrid>
            </Container>
        </>
    );
};

export default About;
