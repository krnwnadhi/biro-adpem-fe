import {
    BackgroundImage,
    Box,
    Card,
    Center,
    Container,
    List,
    Modal,
    SimpleGrid,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core";

import { IconPointFilled } from "@tabler/icons-react";
import classes from "./SubBagianBiroAdpem.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

// --- DATA UNTUK KARTU & MODAL ---
// Memisahkan data membuat kode lebih rapi dan mudah dikelola
const cardData = [
    {
        title: "SUB - Bagian Pengendalian Administrasi Pelaksanaan Pembangunan Daerah",
        image: "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909502/WhatsApp_Image_2025-09-04_at_15.18.49_oqaxoc.jpg",
        modalContent: {
            background:
                "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909502/WhatsApp_Image_2025-09-04_at_15.18.49_oqaxoc.jpg",
            description:
                "Bagian Pengendalian Administrasi Pelaksanaan Pembangunan Daerah.",
            scope: [
                "Sub Bagian Tata Usaha :\nMenangani administrasi umum, surat-menyurat, arsip, dan dokumentasi internal Bagian.",
                "Sub Bagian Pengendalian Administrasi Pelaksanaan Pembangunan Daerah APBD : \nBertugas melaksanakan pemantauan, pengendalian, dan evaluasi pembangunan daerah yang dibiayai melalui APBD.",
                "Sub Bagian Pengendalian Administrasi Pelaksanaan Pembangunan Daerah APBN : \nBertugas melaksanakan pemantauan, pengendalian, dan evaluasi pembangunan daerah yang bersumber dari APBN.",
            ],
        },
    },
    {
        title: "SUB - Bagian Pengendalian Administrasi Pelaksanaan Pembangunan Wilayah",
        image: "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909502/WhatsApp_Image_2025-09-04_at_15.18.22_1_g3jzkg.jpg",
        modalContent: {
            background:
                "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909502/WhatsApp_Image_2025-09-04_at_15.18.22_1_g3jzkg.jpg",
            description:
                "Bagian Pengendalian Administrasi Pelaksanaan Pembangunan Wilayah.",
            scope: [
                "Sub Bagian Pengendalian Administrasi Pelaksanaan Pembangunan Wilayah I : Fokus pada koordinasi, pemantauan, dan evaluasi pembangunan wilayah I (kabupaten/kota sesuai pembagian provinsi).",
                "Sub Bagian Pengendalian Administrasi Pelaksanaan Pembangunan Wilayah II : Fokus pada koordinasi, pemantauan, dan evaluasi pembangunan wilayah II.",
                "Sub Bagian Pengendalian Administrasi Pelaksanaan Pembangunan Wilayah III : Fokus pada koordinasi, pemantauan, dan evaluasi pembangunan wilayah III.",
            ],
        },
    },
    {
        title: "SUB - Bagian Pelaporan Pelaksanaan Pembangunan",
        image: "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909503/WhatsApp_Image_2025-09-04_at_15.14.40_rrncl4.jpg",
        modalContent: {
            background:
                "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909503/WhatsApp_Image_2025-09-04_at_15.14.40_rrncl4.jpg",
            description: "Bagian Pelaporan Pelaksanaan Pembangunan",
            scope: [
                "Sub Bagian Pelaporan Pelaksanaan Pembangunan Daerah : Bertugas menyusun laporan pelaksanaan pembangunan daerah secara periodik.",
                "Sub Bagian Capaian Kinerja Pelaksanaan Pembangunan Daerah : Bertugas mengolah, menilai, dan menyajikan data capaian kinerja pembangunan daerah.",
                "Sub Bagian FasilitasiRumusanKebijakan Pembangunan Daerah : Bertugas menyiapkan bahan analisis serta memfasilitasi penyusunan rumusan kebijakan pembangunan daerah",
            ],
        },
    },
];

export function SubBagianBiroAdpem() {
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedContent, setSelectedContent] = useState(null);

    const handleCardClick = (content) => {
        setSelectedContent(content);
        open();
    };

    const cards = cardData.map((item) => (
        <Card
            key={item.title}
            shadow="lg"
            className={classes.card}
            radius="md"
            onClick={() => handleCardClick(item.modalContent)}
            component="button" // Membuat card bisa difokuskan dan diklik
        >
            <BackgroundImage
                src={item.image}
                radius="md"
                className={classes.image}
            >
                <Center p="md" className={classes.overlay}>
                    <Title order={3} className={classes.title} ta="center">
                        {item.title}
                    </Title>
                </Center>
            </BackgroundImage>
        </Card>
    ));

    return (
        <Container py="xl">
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
                {cards}
            </SimpleGrid>

            {/* --- MODAL WINDOW --- */}
            <Modal
                opened={opened}
                onClose={close}
                size="xl"
                centered
                radius="md"
                withCloseButton={false}
                p={0}
                transitionProps={{ transition: "fade-up", duration: 600 }}
            >
                {selectedContent && (
                    <Box
                        className={classes.modalContentWrapper}
                        style={{
                            backgroundImage: `url(${selectedContent.background})`,
                        }}
                    >
                        <Box className={classes.modalOverlay}>
                            <Text c="white" ta="justify">
                                {selectedContent.description}
                            </Text>

                            <Text c="white" fw={500} mt="lg">
                                Memiliki 3 Sub Bagian :
                            </Text>
                            <List
                                spacing="xs"
                                ta="justify"
                                size="sm"
                                center
                                mt="sm"
                                c="white"
                                icon={
                                    <ThemeIcon
                                        color="blue"
                                        size={16}
                                        radius="xl"
                                    >
                                        <IconPointFilled size={12} />
                                    </ThemeIcon>
                                }
                            >
                                {selectedContent.scope.map((item, index) => (
                                    <List.Item key={index}>{item}</List.Item>
                                ))}
                            </List>
                        </Box>
                    </Box>
                )}
            </Modal>
        </Container>
    );
}
