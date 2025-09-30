import "photoswipe/dist/photoswipe.css";

import {
    Alert,
    AspectRatio,
    Box,
    Center,
    Container,
    Grid,
    Group,
    Loader,
    Pagination,
    Title,
} from "@mantine/core";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useEffect, useState } from "react";

import classes from "./GaleriNew.module.css";
import { usePagination } from "@mantine/hooks";

// Jangan lupa import CSS untuk PhotoSwipe

// Base URL untuk API
const BASE_URL = "https://adpem-admin.jambiprov.go.id/api/v1/gallery";

const GaleriNew = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activePage, setActivePage] = useState(1);

    // Fetch data dari API setiap kali halaman aktif berubah
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Menggunakan limit 12 agar jumlahnya pas untuk 3 baris layout (pola 4 gambar)
                const response = await fetch(
                    `${BASE_URL}?page=${activePage}&limit=12`
                );
                if (!response.ok) {
                    throw new Error("Gagal mengambil data dari server");
                }
                const data = await response.json();
                setGalleryItems(data.result || []);
                setTotalPages(data.totalPage || 1);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activePage]);

    // Hook pagination dari Mantine
    const pagination = usePagination({
        total: totalPages,
        page: activePage,
        onChange: setActivePage,
    });

    // Fungsi untuk merender grup layout sesuai gambar
    const renderLayoutGroups = () => {
        const groups = [];
        // Loop melalui item galeri dengan langkah 4 untuk membuat pola layout
        for (let i = 0; i < galleryItems.length; i += 4) {
            const itemsInGroup = galleryItems.slice(i, i + 4);
            const [item1, item2, item3, item4] = itemsInGroup;

            groups.push(
                <Grid key={i} gutter="md" mb="md">
                    {/* Kolom Kiri (Besar) */}
                    {item1 && (
                        <Grid.Col span={{ base: 12, sm: 6, md: 5 }}>
                            <Item
                                original={item1.image}
                                thumbnail={item1.image}
                                width="1600" // Nilai placeholder
                                height="900" // Nilai placeholder
                                alt={item1.title}
                            >
                                {({ ref, open }) => (
                                    <Box
                                        ref={ref}
                                        onClick={open}
                                        className={classes.galleryItem}
                                        style={{
                                            backgroundImage: `url(${item1.image})`,
                                            height: "404px",
                                        }}
                                        aria-label={item1.title}
                                    />
                                )}
                            </Item>
                        </Grid.Col>
                    )}

                    {/* Kolom Tengah (2 Gambar Kecil Bertumpuk) */}
                    {(item2 || item3) && (
                        <Grid.Col span={{ base: 12, sm: 6, md: 2 }}>
                            {item2 && (
                                <Item
                                    original={item2.image}
                                    thumbnail={item2.image}
                                    width="800"
                                    height="1000"
                                    alt={item2.title}
                                >
                                    {({ ref, open }) => (
                                        <Box
                                            ref={ref}
                                            onClick={open}
                                            className={classes.galleryItem}
                                            style={{
                                                backgroundImage: `url(${item2.image})`,
                                                height: "200px",
                                                marginBottom:
                                                    "var(--mantine-spacing-md)",
                                            }}
                                            aria-label={item2.title}
                                        />
                                    )}
                                </Item>
                            )}
                            {item3 && (
                                <Item
                                    original={item3.image}
                                    thumbnail={item3.image}
                                    width="800"
                                    height="1000"
                                    alt={item3.title}
                                >
                                    {({ ref, open }) => (
                                        <Box
                                            ref={ref}
                                            onClick={open}
                                            className={classes.galleryItem}
                                            style={{
                                                backgroundImage: `url(${item3.image})`,
                                                height: "200px",
                                            }}
                                            aria-label={item3.title}
                                        />
                                    )}
                                </Item>
                            )}
                        </Grid.Col>
                    )}

                    {/* Kolom Kanan (Besar) */}
                    {item4 && (
                        <Grid.Col span={{ base: 12, sm: 12, md: 5 }}>
                            <Item
                                original={item4.image}
                                thumbnail={item4.image}
                                width="1600"
                                height="900"
                                alt={item4.title}
                            >
                                {({ ref, open }) => (
                                    <Box
                                        ref={ref}
                                        onClick={open}
                                        className={classes.galleryItem}
                                        style={{
                                            backgroundImage: `url(${item4.image})`,
                                            height: "404px",
                                        }}
                                        aria-label={item4.title}
                                    />
                                )}
                            </Item>
                        </Grid.Col>
                    )}
                </Grid>
            );
        }
        return groups;
    };

    return (
        <Container size="lg" py="xl">
            <Title order={2} ta="center" mb="xl">
                GALERI
            </Title>

            {loading && (
                <Center>
                    <Loader color="blue" />
                </Center>
            )}

            {error && (
                <Alert title="Terjadi Kesalahan" color="red" variant="light">
                    {error}
                </Alert>
            )}

            {!loading && !error && (
                <>
                    <Gallery withCaption>{renderLayoutGroups()}</Gallery>

                    {totalPages > 1 && (
                        <Center mt="xl">
                            <Pagination.Root
                                total={totalPages}
                                value={activePage}
                                onChange={setActivePage}
                            >
                                <Group gap={5} justify="center">
                                    <Pagination.First />
                                    <Pagination.Previous />
                                    <Pagination.Items />
                                    <Pagination.Next />
                                    <Pagination.Last />
                                </Group>
                            </Pagination.Root>
                        </Center>
                    )}
                </>
            )}
        </Container>
    );
};

export default GaleriNew;
