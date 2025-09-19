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
import classes from "./BagianBiroAdpem.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

// --- DATA UNTUK KARTU & MODAL ---
// Memisahkan data membuat kode lebih rapi dan mudah dikelola
const cardData = [
    {
        title: "Bagian Pengendalian Administrasi Pelaksanaan Pembangunan Daerah",
        image: "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909502/WhatsApp_Image_2025-09-04_at_15.18.49_oqaxoc.jpg",
        modalContent: {
            background:
                "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909502/WhatsApp_Image_2025-09-04_at_15.18.49_oqaxoc.jpg",
            description:
                "Bagian ini berperan dalam memastikan seluruh program dan kegiatan pembangunan daerah dapat berjalan sesuai dengan perencanaan dan ketentuan yang berlaku. Fokus utamanya adalah pada aspek administratif dalam pengendalian pelaksanaan pembangunan agar berjalan tertib, transparan, serta akuntabel.",
            scope: [
                "Menyiapkan bahan koordinasi perumusan kebijakan terkait administrasi pelaksanaan pembangunan daerah.",
                "Melakukan pengumpulan dan verifikasi data pelaksanaan pembangunan dari perangkat daerah.",
                "Menyusun laporan pengendalian pelaksanaan pembangunan daerah yang menjadi dasar evaluasi lebih lanjut.",
            ],
            output: "Tersedianya data, laporan, dan rekomendasi pengendalian pembangunan daerah yang akurat dan dapat dijadikan dasar pengambilan keputusan.",
        },
    },
    {
        title: "Bagian Pengendalian Administrasi Pelaksanaan Pembangunan Wilayah",
        image: "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909502/WhatsApp_Image_2025-09-04_at_15.18.22_1_g3jzkg.jpg",
        modalContent: {
            background:
                "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909502/WhatsApp_Image_2025-09-04_at_15.18.22_1_g3jzkg.jpg",
            description:
                "Bagian Pengendalian Administrasi Pelaksanaan Pembangunan Wilayah. Bagian ini berfokus pada pengendalian pelaksanaan pembangunan di tingkat kewilayahan (kabupaten/kota), sehingga pembangunan yang dilakukan oleh pemerintah daerah sejalan dengan arah pembangunan provinsi.",
            scope: [
                "Mengkoordinasikan perangkat daerah provinsi dengan kabupaten/kota dalam pelaksanaan pembangunan.",
                "Melakukan pemantauan terhadap capaian pembangunan kewilayahan.",
                "Menyiapkan evaluasi terkait kesesuaian pembangunan wilayah dengan kebijakan pembangunan provinsi.",
            ],
            output: " laporan pengendalian pembangunan wilayah yang berfungsi sebagai alat sinkronisasi pembangunan antara pemerintah provinsi dengan pemerintah kabupaten/kota.",
        },
    },
    {
        title: "Bagian Pelaporan Pelaksanaan Pembangunan",
        image: "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909503/WhatsApp_Image_2025-09-04_at_15.14.40_rrncl4.jpg",
        modalContent: {
            background:
                "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909503/WhatsApp_Image_2025-09-04_at_15.14.40_rrncl4.jpg",
            description:
                "Bagian ini bertugas menyusun laporan secara menyeluruh terkait pelaksanaan pembangunan daerah maupun kewilayahan. Laporan tersebut tidak hanya bersifat administratif, tetapi juga sebagai bahan analisis dalam menilai keberhasilan pembangunan dan pencapaian tujuan kebijakan.",
            scope: [
                "Menghimpun, mengolah, dan menyajikan data serta informasi pembangunan dari seluruh perangkat daerah.",
                "Menyusun laporan evaluasi pembangunan provinsi secara periodik (triwulan, semester, tahunan).",
                "Memberikan analisis terkait kendala, capaian, dan rekomendasi perbaikan pembangunan.",
            ],
            output: "Dokumen laporan pembangunan daerah yang terstruktur, valid, dan dapat dipertanggungjawabkan untuk keperluan perencanaan pembangunan berikutnya.",
        },
    },
];

export function BagianBiroAdpem() {
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
                                Ruang lingkup kerja:
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

                            <Text c="white" fw={500} mt="lg">
                                Output utama:
                            </Text>
                            <Text c="white" size="sm" ta="justify">
                                {selectedContent.output}
                            </Text>
                        </Box>
                    </Box>
                )}
            </Modal>
        </Container>
    );
}
