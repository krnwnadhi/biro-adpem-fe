import {
    Center,
    Container,
    Image,
    List,
    Paper,
    SimpleGrid,
    Space,
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
                <Fade cascade triggerOnce>
                    <Title my="sm" order={2} align="center">
                        Visi Misi Biro Administrasi Pembangunan Setda Provinsi
                        Jambi
                    </Title>

                    <Space h="xl" />

                    <Center p={20}>
                        <Image
                            className={classes.image}
                            src="https://res.cloudinary.com/degzbxlnx/image/upload/v1690966461/Untitled_design_3_g4c2d0.png"
                            height={mobile ? 300 : 500}
                            fallbackSrc="https://placehold.co/600x400?text=KESALAHAN!\nFoto+Gubernur\ndan\nWagub\nProvinsi+Jambi"
                            radius="md"
                        />
                    </Center>
                </Fade>

                <Space h="xl" />

                <Space h="xl" />

                <SimpleGrid
                    cols={{ base: 1, sm: 2 }}
                    spacing={{ base: 10, sm: "xl" }}
                    verticalSpacing={{ base: "xl", md: "md" }}
                >
                    <Slide triggerOnce>
                        <Paper withBorder radius="md" className={classes.card}>
                            <Text size="xl" weight={500} mt="md">
                                Visi
                            </Text>
                            <Text
                                c="dimmed"
                                size="sm"
                                mt="sm"
                                ta="justify"
                                pr="xl"
                            >
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Maiores omnis quibusdam ipsam
                                ex dolorem iusto, non cum perferendis ducimus,
                                commodi laboriosam hic quos modi, delectus
                                nostrum. Dolore iure non labore. Nemo eaque
                                officiis esse dolor, unde numquam quisquam sint
                                provident nobis et voluptate. Iusto atque odit
                                assumenda. Asperiores nisi, veniam voluptas
                                voluptatum minus labore voluptatem fuga dolores
                                suscipit pariatur recusandae!
                            </Text>
                        </Paper>
                    </Slide>

                    <Slide triggerOnce direction="right">
                        <Paper withBorder radius="md" className={classes.card}>
                            <Text size="xl" weight={500} mt="md">
                                Misi
                            </Text>
                            <List
                                type="ordered"
                                size="sm"
                                mt="sm"
                                color="dimmed"
                                ta="justify"
                                c="dimmed"
                            >
                                <List.Item pr="xl">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Harum explicabo, quo
                                    quidem, sed odio voluptatem repudiandae
                                    error voluptatum facere totam sequi
                                    laboriosam possimus eaque facilis hic animi
                                    unde eum atque.
                                </List.Item>
                                <List.Item pr="xl">
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Dolore veritatis nisi
                                    expedita consequatur hic natus eius cumque
                                    officiis blanditiis quia aperiam at
                                    voluptate odit, in sint? Laboriosam sapiente
                                    error optio.
                                </List.Item>
                            </List>
                        </Paper>
                    </Slide>
                </SimpleGrid>
            </Container>
        </>
    );
};

export default VisiMisi;
