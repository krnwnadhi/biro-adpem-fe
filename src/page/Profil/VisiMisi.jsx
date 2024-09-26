import {
    Center,
    Container,
    Image,
    List,
    Paper,
    SimpleGrid,
    Space,
    Stack,
    Text,
    Title,
    useMantineTheme,
} from "@mantine/core";
import { Fade, Slide } from "react-awesome-reveal";

import classes from "./VisiMisi.module.css";
import { useMediaQuery } from "@mantine/hooks";

const VisiMisi = () => {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    return (
        <>
            <Container size="xl">
                <Stack gap="xl">
                    <Fade cascade triggerOnce>
                        <Title my="sm" order={2} align="center">
                            Visi Misi Biro Administrasi Pembangunan Setda
                            Provinsi Jambi
                        </Title>

                        <Space h="xl" />

                        <Center>
                            <Image
                                className={classes.image}
                                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1690966461/Untitled_design_3_g4c2d0.png"
                                height={mobile ? 300 : 500}
                                fallbackSrc="https://placehold.co/600x400?text=KESALAHAN!\nFoto+Gubernur\ndan\nWagub\nProvinsi+Jambi"
                                radius="md"
                            />
                        </Center>
                    </Fade>

                    <SimpleGrid
                        cols={{ base: 1, sm: 2 }}
                        spacing={{ base: 10, sm: "xl" }}
                        verticalSpacing={{ base: "xl", md: "md" }}
                    >
                        <Slide triggerOnce>
                            <Paper
                                withBorder
                                radius="md"
                                className={classes.card}
                            >
                                <Text size="xl" weight={500} mt="md">
                                    Visi
                                </Text>
                                <Text
                                    c="dimmed"
                                    size="sm"
                                    mt="sm"
                                    pr="xl"
                                    ta="justify"
                                >
                                    Terwujudnya Jambi Maju, Aman, Nyaman,
                                    Tertib, Amanah, dan Profesional Dibawah
                                    Ridho Allah SWT
                                </Text>
                            </Paper>
                        </Slide>

                        <Slide triggerOnce direction="right">
                            <Paper
                                withBorder
                                radius="md"
                                className={classes.card}
                            >
                                <Text size="xl" weight={500} mt="md">
                                    Misi
                                </Text>
                                <List
                                    type="ordered"
                                    size="sm"
                                    mt="sm"
                                    color="dimmed"
                                    c="dimmed"
                                >
                                    <List.Item pr="xl">
                                        Memantapkan Tata Kelola Pemerintahan
                                    </List.Item>
                                    <List.Item pr="xl">
                                        Memantapkan Perekonomian Masyarakat dan
                                        Daerah
                                    </List.Item>
                                    <List.Item pr="xl">
                                        Memantapkan Kualitas Sumber Daya Manusia
                                    </List.Item>
                                </List>
                            </Paper>
                        </Slide>
                    </SimpleGrid>
                </Stack>
            </Container>
        </>
    );
};

export default VisiMisi;
