/* eslint-disable react/prop-types */
// client/src/components/InformasiPengumuman.jsx

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import {
    ActionIcon,
    Alert,
    Box,
    Card,
    Center,
    Grid,
    Group,
    Loader,
    Modal,
    Pagination,
    Stack,
    Text,
    Title,
    useMantineTheme,
} from "@mantine/core";
import { Document, Page, pdfjs } from "react-pdf";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import axios from "axios";
import { baseDocumentURL } from "../../../utils/baseURL";
import { useDisclosure } from "@mantine/hooks";

// // Konfigurasi worker untuk react-pdf
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// Arahkan worker ke file lokal di folder /public
pdfjs.GlobalWorkerOptions.workerSrc = `/public/pdf.worker.min.mjs`;

const API_BASE_URL = "http://localhost:8888"; // Sesuaikan jika port backend berbeda

// Komponen kecil untuk menampilkan preview PDF
function PdfPreview({ filePath }) {
    const fileUrl = `${API_BASE_URL}/${filePath.replace(/\\/g, "/")}`;

    return (
        <Box
            w={150}
            h={200}
            style={{ overflow: "hidden", border: "1px solid #dee2e6" }}
        >
            <Document
                file={fileUrl}
                loading={
                    <Center h="100%">
                        <Loader size="sm" />
                    </Center>
                }
                error={
                    <Center h="100%">
                        <Text size="xs" c="red">
                            Gagal memuat preview
                        </Text>
                    </Center>
                }
            >
                <Page
                    pageNumber={1}
                    width={150}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                />
            </Document>
        </Box>
    );
}

function InformasiPengumuman() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activePage, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // State untuk modal
    const [modalOpened, { open: openModal, close: closeModal }] =
        useDisclosure(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const theme = useMantineTheme();

    useEffect(() => {
        const fetchDocuments = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${baseDocumentURL}/nopagination`,
                    {
                        params: {
                            page: activePage,
                            limit: 3, // Sama dengan limit di backend
                        },
                    }
                );
                setDocuments(response.data.result);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError(
                    "Gagal mengambil data dari server. Pastikan server backend berjalan."
                );
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, [activePage]);

    // Fungsi untuk membuka modal dan set dokumen yang dipilih
    const handleCardClick = (doc) => {
        setSelectedDoc(doc);
        setPageNumber(1); // Reset ke halaman pertama setiap kali modal dibuka
        openModal();
    };

    const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
        setNumPages(nextNumPages);
    };

    const handlePreviousPage = () => {
        setPageNumber((prev) => Math.max(prev - 1, 1));
    };

    const handleNextPage = () => {
        setPageNumber((prev) => Math.min(prev + 1, numPages));
    };

    return (
        <div>
            {/* Modal untuk Preview PDF Penuh */}
            <Modal
                opened={modalOpened}
                onClose={closeModal}
                title={selectedDoc?.title}
                size="xl"
                centered
                overlayProps={{
                    color:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[9]
                            : theme.colors.gray[2],
                    opacity: 0.55,
                    blur: 3,
                }}
            >
                {selectedDoc && (
                    <Stack align="center">
                        <Document
                            file={`${API_BASE_URL}/${selectedDoc.file_path.replace(
                                /\\/g,
                                "/"
                            )}`}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={
                                <Center my="xl">
                                    <Loader />
                                </Center>
                            }
                        >
                            <Page pageNumber={pageNumber} />
                        </Document>
                        {numPages && (
                            <Group>
                                <ActionIcon
                                    onClick={handlePreviousPage}
                                    disabled={pageNumber <= 1}
                                >
                                    <IconChevronLeft size={16} />
                                </ActionIcon>
                                <Text>
                                    Halaman {pageNumber} dari {numPages}
                                </Text>
                                <ActionIcon
                                    onClick={handleNextPage}
                                    disabled={pageNumber >= numPages}
                                >
                                    <IconChevronRight size={16} />
                                </ActionIcon>
                            </Group>
                        )}
                    </Stack>
                )}
            </Modal>

            <Title order={1} mb="md">
                Informasi dan Pengumuman
            </Title>

            {loading && (
                <Center>
                    <Loader />
                </Center>
            )}
            {error && (
                <Alert color="red" title="Error">
                    {error}
                </Alert>
            )}

            {!loading && !error && (
                <>
                    {documents.map((doc) => (
                        <Card
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            withBorder
                            mb="lg"
                            key={doc.id}
                            onClick={() => handleCardClick(doc)}
                            style={{ cursor: "pointer" }}
                        >
                            <Grid>
                                <Grid.Col span={{ base: 12, sm: "content" }}>
                                    <PdfPreview filePath={doc.file_path} />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, sm: "auto" }}>
                                    <Text c="red" size="sm" fw={700}>
                                        INFORMASI
                                    </Text>
                                    <Title order={3} mt={5}>
                                        {doc.title}
                                    </Title>
                                    <Text size="sm" c="dimmed" mt="xs">
                                        {doc.description}
                                    </Text>
                                    <Text size="xs" c="dimmed" mt="md">
                                        Published by admin on{" "}
                                        {/* {dayjs(doc.createdAt).format(
                                            "MMM DD, YYYY"
                                        )} */}
                                    </Text>
                                </Grid.Col>
                            </Grid>
                        </Card>
                    ))}

                    {documents.length > 0 && (
                        <Center mt="xl">
                            <Pagination
                                total={totalPages}
                                value={activePage}
                                onChange={setPage}
                            />
                        </Center>
                    )}

                    {documents.length === 0 && (
                        <Text>Belum ada dokumen yang dipublikasikan.</Text>
                    )}
                </>
            )}
        </div>
    );
}

export default InformasiPengumuman;
