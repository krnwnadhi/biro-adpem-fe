import {
    BackgroundImage,
    Badge,
    Box,
    Card,
    Center,
    Container,
    Flex,
    Grid,
    Group,
    Image,
    Pagination,
    Stack,
    Text,
    Title,
    useMantineTheme,
} from "@mantine/core";

import { Fade } from "react-awesome-reveal";
import { Link } from "react-router-dom/cjs/react-router-dom";
import classes from "./AllBeritaNew.module.css";
import { useMediaQuery } from "@mantine/hooks";
import { useState } from "react";

// --- DATA CONTOH ---
const mockNewsData = [
    {
        title: "Sosialisasi Anti Narkoba Biro PIWP2 Setda DIY dalam Apel Rutin",
        category: "BERITA",
        date: "Published by admin on Jul 8, 2024",
        image: "https://res.cloudinary.com/degzbxlnx/image/upload/v1703003802/y7ahqvtu2jjgjcyrsgkq.jpg",
        description:
            "Senin, 12/07/2024 – Pelaksanaan apel rutin pada lingkungan Biro Pengembangan Infrastruktur Wilayah dan Pembiayaan Pembangunan (PIWP2).",
        slug: "6581c69a1467a0eb187dd839",
    },
    {
        title: "Apel Tematik: Upaya Pencegahan Penggunaan Narkotika",
        category: "BERITA",
        date: "Published by admin on Nov 20, 2023",
        image: "https://res.cloudinary.com/degzbxlnx/image/upload/v1703003802/y7ahqvtu2jjgjcyrsgkq.jpg",
        description:
            "Senin (20/11) dilaksanakan apel pagi pada lingkungan Biro Pengembangan Infrastruktur Wilayah dengan pemimpin apel Ibu Rokhan...",
    },
    {
        title: "Apel Tematik: Upaya Pencegahan Penggunaan Narkotika",
        category: "ARTIKEL",
        date: "Published by admin on Nov 20, 2023",
        image: "https://res.cloudinary.com/degzbxlnx/image/upload/v1703003802/y7ahqvtu2jjgjcyrsgkq.jpg",
        description:
            "Senin (20/11) dilaksanakan apel pagi pada lingkungan Biro Pengembangan Infrastruktur Wilayah dengan pemimpin apel Ibu Rokhan...",
    },
    {
        title: "Apel Tematik: Upaya Pencegahan Penggunaan Narkotika",
        category: "ARTIKEL",
        date: "Published by admin on Nov 20, 2023",
        image: "https://res.cloudinary.com/degzbxlnx/image/upload/v1703003802/y7ahqvtu2jjgjcyrsgkq.jpg",
        description:
            "Senin (20/11) dilaksanakan apel pagi pada lingkungan Biro Pengembangan Infrastruktur Wilayah dengan pemimpin apel Ibu Rokhan...",
    },
    {
        title: "Apel Tematik: Upaya Pencegahan Penggunaan Narkotika",
        category: "ARTIKEL",
        date: "Published by admin on Nov 20, 2023",
        image: "https://res.cloudinary.com/degzbxlnx/image/upload/v1703003802/y7ahqvtu2jjgjcyrsgkq.jpg",
        description:
            "Senin (20/11) dilaksanakan apel pagi pada lingkungan Biro Pengembangan Infrastruktur Wilayah dengan pemimpin apel Ibu Rokhan...",
    },
    // Hapus atau tambahkan data di sini untuk melihat efeknya
];

// --- KOMPONEN KARTU BERITA (didefinisikan di dalam file yang sama) ---
function NewsCard({ title, category, date, image, description }) {
    const theme = useMantineTheme();

    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            // bg="white"
            // c="black"
        >
            <Group wrap="nowrap" align="start">
                <Image
                    src={image}
                    height={mobile ? 145 : 150}
                    width={mobile ? 145 : 150}
                    radius="md"
                    alt={title}
                    fit="cover"
                />
                <Stack gap="xs" ml={5}>
                    <Badge color="red" variant="light">
                        {category}
                    </Badge>
                    <Text fw={700} size={mobile ? "xs" : "sm"} lineClamp={2}>
                        {title}
                    </Text>
                    <Text size={mobile ? "xs" : "sm"} c="dimmed" lineClamp={2}>
                        {description}
                    </Text>
                    <Text size="xs" c="dimmed" mt="sm">
                        {date}
                    </Text>
                </Stack>
            </Group>
        </Card>
    );
}

export default function AllBeritaNew() {
    const ITEMS_PER_PAGE = 3;
    const [activePage, setPage] = useState(1);

    // Hitung total halaman yang dibutuhkan
    const totalPages = Math.ceil(mockNewsData.length / ITEMS_PER_PAGE);

    // Ambil data untuk halaman saat ini
    const startIndex = (activePage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = mockNewsData.slice(startIndex, endIndex);

    return (
        <BackgroundImage
            src="https://res.cloudinary.com/degzbxlnx/image/upload/v1757909502/WhatsApp_Image_2025-09-04_at_15.18.49_oqaxoc.jpg"
            className={classes.wrapper}
        >
            <Box className={classes.overlay}>
                <Container size="lg">
                    <Center>
                        <Title order={1} c="white" mb="xl">
                            BERITA DAN ARTIKEL KEGIATAN
                        </Title>
                    </Center>
                    <Grid>
                        {paginatedData.map((item, index) => (
                            <Grid.Col span={12} key={index}>
                                <Fade triggerOnce>
                                    <Link
                                        to={`/berita/${item.slug}`}
                                        className={classes.cardLink}
                                    >
                                        <Box className={classes.cardWrapper}>
                                            <NewsCard {...item} />
                                        </Box>
                                    </Link>
                                </Fade>
                            </Grid.Col>
                        ))}
                    </Grid>

                    {/* Tambahkan komponen Pagination jika total halaman > 1 */}
                    {totalPages > 1 && (
                        <Flex justify="flex-end" mt="xl">
                            <Pagination
                                total={totalPages}
                                value={activePage}
                                onChange={setPage}
                                size="sm"
                            />
                        </Flex>
                    )}
                </Container>
            </Box>
        </BackgroundImage>
    );
}
