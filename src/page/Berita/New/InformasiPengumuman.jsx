import {
    BackgroundImage,
    Box,
    Card,
    Center,
    Container,
    Grid,
    Group,
    Stack,
    Text,
    Title,
    rem,
    useMantineTheme,
} from "@mantine/core";

import { IconFileText } from "@tabler/icons-react";
import classes from "./InformasiPengumuman.module.css";

// --- DATA CONTOH ---
const mockInfoData = [
    {
        title: "Pelanggaran yang dilaporkan oleh masyarakat serta laporan penindakannya",
        date: "Published by admin on Aug 19, 2025",
    },
    {
        title: "Surat Menyurat Pimpinan",
        date: "Published by admin on Aug 12, 2025",
    },
    // Anda bisa mencoba menghapus item ini untuk melihat hanya 2 kartu
    {
        title: "Pengumuman Hasil Seleksi Administrasi Pegawai",
        date: "Published by admin on Aug 5, 2025",
    },
];

// --- KOMPONEN KARTU INFORMASI (didefinisikan di dalam file yang sama) ---
function InfoCard({ title, date }) {
    const theme = useMantineTheme();
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
                <Box
                    bg={theme.colors.blue[1]}
                    p="sm"
                    style={{ borderRadius: theme.radius.sm }}
                >
                    <IconFileText
                        style={{ width: rem(32), height: rem(32) }}
                        color={theme.colors.blue[6]}
                    />
                </Box>
                <Stack gap={0}>
                    <Text fw={600} size="md" lineClamp={3}>
                        {title}
                    </Text>
                    <Text size="xs" c="dimmed" mt={4}>
                        {date}
                    </Text>
                </Stack>
            </Group>
        </Card>
    );
}

export default function InformasiPengumuman() {
    return (
        <BackgroundImage
            src="https://res.cloudinary.com/degzbxlnx/image/upload/v1757909501/WhatsApp_Image_2025-09-04_at_15.06.51_xjjv2k.jpg"
            className={classes.wrapper}
        >
            <Box className={classes.overlay}>
                <Container size="lg">
                    <Center>
                        <Title order={1} c="white" mb="xl">
                            INFORMASI DAN PENGUMUMAN
                        </Title>
                    </Center>
                    <Grid>
                        {mockInfoData.map((item, index) => (
                            <Grid.Col
                                span={{ base: 12, sm: 6, md: 4 }}
                                key={index}
                            >
                                <Box className={classes.cardWrapper}>
                                    <InfoCard {...item} />
                                </Box>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </BackgroundImage>
    );
}
