/* eslint-disable react/prop-types */

import {
    BackgroundImage,
    Box,
    Center,
    Grid,
    Paper,
    Space,
    Text,
    Title,
    UnstyledButton,
} from "@mantine/core";
import {
    IconBuildingArch,
    IconDeviceDesktopAnalytics,
    IconMap,
} from "@tabler/icons-react";

import classes from "./Layanan.module.css";

// Data untuk setiap layanan agar mudah dikelola
const servicesData = [
    {
        icon: IconBuildingArch,
        title: "SIMANTAP",
        description:
            "Sistem Informasi Manajemen Terpadu Administrasi Pembangunan",
        link: "https://simantap.jambiprov.go.id/tahun",
    },
    {
        icon: IconMap,
        title: "VIRTUAL TOUR",
        description:
            "Jelajahi lokasi secara virtual dengan pengalaman interaktif",
        isFeatured: true,
        link: "#",
    },
    {
        icon: IconDeviceDesktopAnalytics,
        title: "SIMDEV",
        description:
            "Sistem Informasi Manajemen Terpadu Administrasi Pembangunan",
        link: "#",
    },
];

// URL Gambar Latar Belakang yang mirip
const BACKGROUND_IMAGE_URL =
    "https://res.cloudinary.com/degzbxlnx/image/upload/v1758699617/taman_pinang_masak_ynzflu.jpg";

// Komponen untuk satu kartu layanan
function ServiceCard({
    icon: Icon,
    title,
    description,
    link,
    isFeatured = false,
}) {
    return (
        // UnstyledButton berfungsi sebagai tag <a> untuk membuat seluruh area bisa diklik
        <UnstyledButton
            component="a"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.card}
        >
            <Paper
                shadow="md"
                radius="lg"
                p="xl"
                withBorder
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
                py={isFeatured ? "2.5rem" : "xl"}
            >
                <Box className={classes.iconWrapper}>
                    <Icon size={60} color="#228be6" />
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
        </UnstyledButton>
    );
}

// Komponen utama yang menggabungkan semuanya
export function Layanan() {
    return (
        <>
            {/* <Space h="xl" /> */}
            <BackgroundImage
                src={BACKGROUND_IMAGE_URL}
                className={classes.wrapper}
            >
                <Box className={classes.overlay}>
                    <Center>
                        <Title order={1} className={classes.title}>
                            LAYANAN
                        </Title>
                    </Center>

                    <Center>
                        <Box className={classes.glassContainer}>
                            <Grid align="center" justify="center" gutter="xl">
                                {servicesData.map((service, index) => {
                                    // Gabungkan class secara kondisional
                                    const colClassName = `${classes.gridCol} ${
                                        service.isFeatured
                                            ? classes.featuredCol
                                            : ""
                                    }`;

                                    return (
                                        <Grid.Col
                                            key={index}
                                            span={{ base: 12, sm: 8, md: 4 }}
                                            className={colClassName}
                                        >
                                            <ServiceCard {...service} />
                                        </Grid.Col>
                                    );
                                })}
                            </Grid>
                        </Box>
                    </Center>
                </Box>
            </BackgroundImage>
        </>
    );
}

export default Layanan;
