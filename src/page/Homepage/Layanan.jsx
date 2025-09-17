import {
    Box,
    Container,
    Grid,
    Paper,
    SimpleGrid,
    Text,
    Title,
    useMantineTheme,
} from "@mantine/core";
import {
    IconBuildingArch,
    IconDeviceDesktopAnalytics,
    IconMap,
    IconUserScan,
} from "@tabler/icons-react";

// Data untuk setiap layanan agar mudah dikelola
const servicesData = [
    {
        icon: IconBuildingArch,
        title: "SIMANTAP",
        description:
            "Sistem Informasi Manajemen Terpadu Administrasi Pembangunan",
    },
    {
        icon: IconMap,
        title: "VIRTUAL TOUR",
        description:
            "Jelajahi lokasi secara virtual dengan pengalaman interaktif",
        isFeatured: true, // Menandai kartu tengah
    },
    {
        icon: IconDeviceDesktopAnalytics,
        title: "SIMDEV",
        description:
            "Sistem Informasi Manajemen Terpadu Administrasi Pembangunan",
    },
];

// URL Gambar Latar Belakang yang mirip
const BACKGROUND_IMAGE_URL =
    "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909502/wisata_jambi_disbudpar_pemprov_jambi_r8o75i.jpg";

// Komponen untuk satu kartu layanan
function ServiceCard({ icon: Icon, title, description, isFeatured = false }) {
    const theme = useMantineTheme();

    return (
        <Paper
            shadow="md"
            radius="lg"
            p="xl"
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                height: "100%",
            }}
            // Beri padding vertikal lebih besar pada kartu tengah agar lebih tinggi
            py={isFeatured ? "2.5rem" : "xl"}
        >
            {/* Kotak biru di belakang ikon */}
            <Box
                mb="lg"
                p="md"
                style={{
                    backgroundColor: theme.colors.blue[6],
                    borderRadius: theme.radius.md,
                }}
            >
                <Icon size={40} color={theme.white} />
            </Box>
            <Text size="xl" fw={700} tt="uppercase">
                {title}
            </Text>
            {description && (
                <Text size="xs" c="dimmed" mt="sm">
                    {description}
                </Text>
            )}
        </Paper>
    );
}

// Komponen utama yang menggabungkan semuanya
export function Layanan() {
    const theme = useMantineTheme();

    return (
        <Box
            style={{
                minHeight: "100vh",
                width: "100%",
                backgroundImage: `url(${BACKGROUND_IMAGE_URL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: theme.spacing.lg,
            }}
        >
            <Title
                order={1}
                c="white"
                fz={{ base: "2.5rem", md: "3.5rem" }}
                mb="xl"
                style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)" }}
            >
                LAYANAN
            </Title>

            {/* Kontainer dengan efek Glassmorphism */}
            <Box
                style={{
                    background: "rgba(225, 225, 225, 0.2)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)", // For Safari
                    borderRadius: theme.radius.xl,
                    padding: theme.spacing.xl,
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15)",
                    width: "90%",
                    maxWidth: "1200px",
                }}
            >
                <Grid align="center" justify="center" gutter="xl">
                    {servicesData.map((service, index) => (
                        <Grid.Col
                            key={index}
                            span={{ base: 12, sm: 8, md: 4 }}
                            // Terapkan efek menonjol pada kartu tengah di layar desktop
                            style={{
                                transform: service.isFeatured
                                    ? "scale(1.05)"
                                    : "scale(1)",
                                transition: "transform 0.3s ease",
                                // Z-index agar kartu tengah berada di atas
                                zIndex: service.isFeatured ? 10 : 1,
                            }}
                        >
                            <ServiceCard {...service} />
                        </Grid.Col>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default Layanan;
