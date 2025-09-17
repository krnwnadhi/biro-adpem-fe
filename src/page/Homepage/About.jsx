import {
    Box,
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
            <Space h="xl" />

            <Container size="lg" p="lg">
                <Divider
                    my="xl"
                    labelPosition="left"
                    label={
                        <Text c="blue" fs="italic" fz="h6" fw={700}>
                            TENTANG KAMI
                        </Text>
                    }
                    color="blue"
                />
                <SimpleGrid
                    cols={{ base: 1, sm: 2 }}
                    spacing={{ base: 10, sm: "xl" }}
                    verticalSpacing={{ base: 50, md: "md" }}
                >
                    <Fade triggerOnce cascade>
                        <Paper
                            shadow="md"
                            p="xl"
                            radius="md"
                            className={classes.box}
                        >
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

                            <Text c="dimmed" ta="justify" size="xs">
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
                        </Paper>

                        <Image
                            className={classes.box}
                            height={350}
                            radius="md"
                            src="https://res.cloudinary.com/degzbxlnx/image/upload/v1690966461/Untitled_design_3_g4c2d0.png"
                            alt="Gubernur & Wakil Gubernur Provinsi Jambi"
                        />
                    </Fade>
                </SimpleGrid>
            </Container>
        </>
    );
};

export default About;
