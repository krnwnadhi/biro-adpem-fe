import "photoswipe/dist/photoswipe.css";

import {
    Alert,
    BackgroundImage,
    Box,
    Center,
    Container,
    Flex,
    Grid,
    Loader,
    Pagination,
    Title,
} from "@mantine/core";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useEffect, useState } from "react";

import { baseGalleryURL } from "../../../utils/baseURL";
import classes from "./GaleriNew.module.css";

// Jangan lupa import CSS untuk PhotoSwipe

// Base URL untuk API

const GaleriNew = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activePage, setActivePage] = useState(1);

    const ITEMS_PER_PAGE = 4; // Menampilkan 4 foto per halaman

    // Fetch data dari API setiap kali halaman aktif berubah
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Menggunakan limit 4 untuk mengambil hanya 4 gambar per halaman
                const response = await fetch(
                    `${baseGalleryURL}/?page=${activePage}&limit=${ITEMS_PER_PAGE}`
                );
                if (!response.ok) {
                    throw new Error("Gagal mengambil data dari server");
                }
                const data = await response.json();

                // Cek jika 'result' adalah array sebelum di-set
                if (Array.isArray(data.result)) {
                    setGalleryItems(data.result);
                } else {
                    setGalleryItems([]);
                    console.warn(
                        "API tidak mengembalikan array 'result' yang valid"
                    );
                }

                setTotalPages(data.totalPage || 1);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activePage]);

    // Fungsi untuk merender grup layout sesuai gambar
    // Fungsi untuk merender grup layout (sekarang hanya ada satu grup per halaman)
    const renderLayoutGroup = () => {
        // Karena kita hanya mengambil 4 item, kita bisa langsung deconstruct
        const [item1, item2, item3, item4] = galleryItems;

        if (galleryItems.length === 0) {
            return (
                <Center>
                    <p>Tidak ada gambar untuk ditampilkan.</p>
                </Center>
            );
        }

        return (
            <Grid gutter="md" mb="md">
                {/* Kolom Kiri (Besar) */}
                {item1 && (
                    <Grid.Col span={{ base: 12, sm: 6, md: 5 }}>
                        <Item
                            original={item1.image}
                            thumbnail={item1.image}
                            width="1600"
                            height="900"
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
    };

    const options = {
        arrowPrev: true,
        arrowNext: true,
        zoom: true,
        close: true,
        counter: true,
        allowPanToNext: true,
        loop: true,
        wheelToZoom: true,
        padding: { top: 20, bottom: 40, left: 100, right: 100 },
    };

    return (
        <>
            <BackgroundImage
                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1758699617/gentala_qqibve.png"
                className={classes.wrapper}
            >
                <Box className={classes.overlay}>
                    <Container size="lg">
                        <Center>
                            <Title order={1} c="white" mb="xl">
                                GALERI
                            </Title>
                        </Center>

                        {loading && (
                            <Center>
                                <Loader color="blue" />
                            </Center>
                        )}

                        {error && (
                            <Alert
                                title="Terjadi Kesalahan"
                                color="red"
                                variant="light"
                            >
                                {error}
                            </Alert>
                        )}

                        {!loading && !error && (
                            <>
                                <Gallery withCaption options={options}>
                                    {renderLayoutGroup()}
                                </Gallery>

                                {/* {totalPages > 1 && (
                        <Center mt="xl">
                            <Pagination
                                total={totalPages}
                                value={activePage}
                                onChange={setActivePage}
                                withEdges // Opsional: untuk menampilkan tombol ke halaman pertama & terakhir
                            />
                        </Center>
                    )} */}

                                <Box className={classes.footer}>
                                    {totalPages > 0 && ( // Selalu tampilkan wrapper footer, tapi paginasi hanya jika ada halaman
                                        <Flex
                                            justify="center"
                                            align="center"
                                            mt="xl"
                                        >
                                            {totalPages > 1 && (
                                                <Pagination
                                                    total={totalPages}
                                                    value={activePage}
                                                    onChange={setActivePage}
                                                    // Buat paginasi lebih ringkas di mobile
                                                    // size={isMobile ? "sm" : "md"}
                                                    withEdges
                                                />
                                            )}
                                        </Flex>
                                    )}
                                </Box>
                            </>
                        )}
                    </Container>
                </Box>
            </BackgroundImage>
        </>
    );
};

export default GaleriNew;
