import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import {
    BackgroundImage,
    Badge,
    Box,
    Card,
    Center,
    Container,
    Grid,
    Loader,
    Modal,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";

import { DateFormat } from "../../../utils/DateFormat";
import classes from "./InformasiMagang.module.css";
import { useDisclosure } from "@mantine/hooks";

// --- START: Konfigurasi React-PDF ---
// Diperlukan untuk menampilkan pratinjau PDF di dalam kartu.

// Tentukan path ke worker script dari CDN untuk react-pdf.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// --- END: Konfigurasi React-PDF ---

// --- KOMPONEN BARIS DOKUMEN ---
function DocumentRow({ document, onCardClick }) {
    // URL lengkap ke file PDF di server Anda
    const SERVER_ROOT_URL = "http://localhost:8888";
    const correctedFilePath = document.file_path.replace(/\\/g, "/");
    const fullPdfUrl = `${SERVER_ROOT_URL}/${correctedFilePath}`;

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString("id-ID", options);
    };

    return (
        <Card
            withBorder
            radius="md"
            p="lg"
            className={classes.documentRow}
            onClick={() => onCardClick(document.file_path, document.title)}
        >
            <Grid align="center">
                {/* Kolom untuk Pratinjau PDF */}
                <Grid.Col span={{ base: 12, sm: 3 }}>
                    <Box className={classes.previewWrapper}>
                        <Document
                            file={fullPdfUrl}
                            loading={
                                <Center h="100%">
                                    <Loader size="sm" />
                                </Center>
                            }
                            error={
                                <Center h="100%">
                                    <Text size="xs" c="dimmed" ta="center">
                                        Gagal memuat pratinjau
                                    </Text>
                                </Center>
                            }
                        >
                            <Page
                                pageNumber={1}
                                width={160} // Lebar pratinjau thumbnail
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                            />
                        </Document>
                    </Box>
                </Grid.Col>

                {/* Kolom untuk Konten Teks */}
                <Grid.Col span={{ base: 12, sm: 9 }}>
                    <Stack gap="xs">
                        <Badge color="red" variant="light" w="fit-content">
                            Informasi
                        </Badge>
                        <Title order={4} className={classes.documentTitle}>
                            {document.title}
                        </Title>
                        <Text size="sm" c="dimmed" lineClamp={2}>
                            {document.description || "..."}
                        </Text>
                        <Text size="xs" c="dimmed" mt="sm">
                            <DateFormat date={document.createdAt} />
                        </Text>
                    </Stack>
                </Grid.Col>
            </Grid>
        </Card>
    );
}

// --- KOMPONEN UTAMA ---
export default function InformasiMagang() {
    const [filesList, setFilesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [appError, setAppError] = useState(null);
    const [opened, { open, close }] = useDisclosure(false);
    const [pdfUrl, setPdfUrl] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const baseDocumentURL =
        "http://localhost:8888/api/v1/documents/nopagination";

    useEffect(() => {
        const getFilesList = async () => {
            setLoading(true);
            setAppError(null);
            try {
                const response = await fetch(
                    `${baseDocumentURL}?search_query=&page=1&limit=10`
                );
                if (!response.ok) {
                    throw new Error("Gagal mengambil data dari server.");
                }
                const data = await response.json();
                setFilesList(data.result || []);
            } catch (error) {
                setAppError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getFilesList();
    }, []);

    const handleCardClick = (filePath, title) => {
        const SERVER_ROOT_URL = "http://localhost:8888";
        const correctedFilePath = filePath.replace(/\\/g, "/");
        const fullPdfUrl = `${SERVER_ROOT_URL}/${correctedFilePath}`;
        setPdfUrl(fullPdfUrl);
        setModalTitle(title);
        open();
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title={modalTitle}
                size="xl"
                centered
                overlayProps={{ backgroundOpacity: 0.7, blur: 4 }}
            >
                <embed
                    src={pdfUrl}
                    type="application/pdf"
                    style={{ width: "100%", height: "75vh", border: "none" }}
                />
            </Modal>
            <BackgroundImage
                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1758699618/tambahan_1_sisi_gambar_gelas_m3ztua.png"
                className={classes.wrapper}
            >
                <Box className={classes.overlay}>
                    <Container size="lg">
                        <Center>
                            <Title order={1} c="white" mb="xl">
                                INFORMASI MAGANG
                            </Title>
                        </Center>

                        {loading && (
                            <Center mt="xl" h={200}>
                                <Loader />
                            </Center>
                        )}

                        {appError && !loading && (
                            <Center mt="xl" h={200}>
                                <Text c="red">
                                    Terjadi kesalahan: {appError}
                                </Text>
                            </Center>
                        )}

                        {!loading && !appError && (
                            <Stack>
                                {filesList.length > 0 ? (
                                    filesList.map((doc) => (
                                        <DocumentRow
                                            key={doc.id}
                                            document={doc}
                                            onCardClick={handleCardClick}
                                        />
                                    ))
                                ) : (
                                    <Text c="dimmed" ta="center" mt="xl">
                                        Tidak ada dokumen yang ditemukan.
                                    </Text>
                                )}
                            </Stack>
                        )}
                    </Container>
                </Box>
            </BackgroundImage>
        </>
    );
}
