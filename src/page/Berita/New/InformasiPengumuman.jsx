/* eslint-disable react/prop-types */

import {
    BackgroundImage,
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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { DateFormat } from "../../../utils/DateFormat";
import { IconFileText } from "@tabler/icons-react";
import axios from "axios";
import { baseDocumentURL } from "../../../utils/baseURL";
import classes from "./InformasiPengumuman.module.css";
import { fetchAllDocumentAction } from "../../../redux/slices/document/documentSlice";
import { useDisclosure } from "@mantine/hooks";

// Komponen Kartu
function InfoCard({ document, onCardClick }) {
    return (
        <Card
            shadow="md"
            radius="md"
            withBorder
            className={classes.card}
            onClick={() => onCardClick(document?.file_path)}
        >
            <Stack align="center" justify="space-between" h="100%">
                <IconFileText
                    size={48}
                    stroke={1.5}
                    color="var(--mantine-color-blue-6)"
                />
                <Box>
                    <Text fw={600} size="sm" ta="center" lineClamp={3}>
                        {document.title}
                    </Text>
                    <Text c="dimmed" size="xs" ta="center" lineClamp={3}>
                        {document.title}
                    </Text>
                    <Text c="dimmed" size="xs" ta="center" mt="xs">
                        <DateFormat date={document.createdAt} />
                    </Text>
                </Box>
            </Stack>
        </Card>
    );
}

export default function InformasiPengumuman() {
    const dispatch = useDispatch();

    const [filesList, setFilesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");

    const [opened, { open, close }] = useDisclosure(false);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [numPages, setNumPages] = useState(null);

    // State ini akan menyimpan URL PDF langsung
    const [pdfUrl, setPdfUrl] = useState("");

    const document = useSelector((state) => state?.document);
    console.log(document);

    const { appError, loading } = document;

    useEffect(() => {
        dispatch(fetchAllDocumentAction());
        // window.scrollTo(0, 0);
    }, [dispatch]);

    useEffect(() => {
        const abortController = new AbortController();

        getFilesList();

        window.scrollTo(0, 0);

        return () => {
            abortController.abort();
        };
    }, [page, keyword]);

    const getFilesList = async () => {
        try {
            const response = await axios.get(
                `${baseDocumentURL}?search_query=${keyword}&page=${page}&limit=${limit}`
            );
            setErrorMsg("");
            setFilesList(response.data.result);
            setPage(response.data.page);
            setPages(response.data.totalItem);
            setRows(response.data.totalPage);
        } catch (error) {
            error.response && setErrorMsg(error.response.data);
        }
    };

    const handleCardClick = (filePath) => {
        // 1. Definisikan base URL untuk server Anda (tanpa /api/v1/...)
        // Sesuaikan port jika berbeda. Ini adalah alamat root dari backend Anda.
        const SERVER_ROOT_URL = "http://localhost:8888"; // Contoh port 8888

        // 2. Ganti backslash (jika ada) dengan forward slash untuk URL
        const correctedFilePath = filePath.replace(/\\/g, "/");

        // 3. Buat URL yang benar ke file statis
        const fullPdfUrl = `${SERVER_ROOT_URL}/${correctedFilePath}`;

        console.log("Requesting PDF from URL:", fullPdfUrl); // Tambahkan ini untuk debugging

        setPdfUrl(fullPdfUrl);
        open();
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    console.log(filesList);

    const documentContentAI = filesList?.map((document) => (
        <Grid key={document.id}>
            {console.log("DOKUMEN", document.file_path)}
            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <InfoCard document={document} onCardClick={handleCardClick} />
            </Grid.Col>
        </Grid>
    ));

    // const documentContent =
    //     filesList?.length > 0 ? (
    //         filesList?.map((item) => (
    //             <Card
    //                 shadow="sm"
    //                 padding="lg"
    //                 radius="md"
    //                 withBorder
    //                 mt="lg"
    //                 key={item?.id}
    //                 className={classes.card}
    //             >
    //                 <Group wrap="nowrap">
    //                     <Avatar
    //                         src={
    //                             item?.file_mimetype === "application/pdf"
    //                                 ? pdfIconSVG
    //                                 : iconExcel
    //                         }
    //                         size={80}
    //                     />
    //                     <div>
    //                         <Text fz="lg" fw={500} className={classes.name}>
    //                             {item?.title}
    //                         </Text>

    //                         <Text fz="xs" c="dimmed" lineClamp={2}>
    //                             {item?.description}
    //                         </Text>

    //                         {/* <Group wrap="nowrap" gap={10} mt={5}>
    //                             <Text fz="xs" c="dimmed">
    //                                 <DateFormat date={item?.createdAt} />
    //                             </Text>

    //                             <ActionIcon
    //                                 variant="subtle"
    //                                 onClick={() =>
    //                                     downloadFile(
    //                                         item?.id,
    //                                         item?.file_path,
    //                                         item?.file_mimetype
    //                                     )
    //                                 }
    //                             >
    //                                 <IconDownload size="20" />
    //                             </ActionIcon>
    //                         </Group> */}
    //                     </div>
    //                 </Group>
    //             </Card>
    //         ))
    //     ) : (
    //         <Card
    //             shadow="sm"
    //             padding="lg"
    //             radius="md"
    //             withBorder
    //             mt="lg"
    //             className={classes.card}
    //         >
    //             <Alert
    //                 variant="light"
    //                 color="red"
    //                 title="Tidak ada dokumen"
    //                 icon={<IconX />}
    //             >
    //                 <Text fs="italic" size="sm">
    //                     Belum ada dokumen yang diunggah.
    //                 </Text>
    //             </Alert>
    //         </Card>
    //     );

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                title="Pratinjau Dokumen"
                size="xl"
                centered
                overlayProps={{ backgroundOpacity: 0.7, blur: 4 }}
            >
                {/* MENGGUNAKAN TAG <embed> UNTUK PREVIEW BAWAAN BROWSER
                  Ini adalah alternatif yang paling stabil.
                */}
                <embed
                    src={pdfUrl}
                    type="application/pdf"
                    style={{ width: "100%", height: "75vh", border: "none" }}
                />
            </Modal>

            <BackgroundImage
                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1758699622/tugu_pers_xszluh.png"
                className={classes.wrapper}
            >
                <Box className={classes.overlay}>
                    <Container size="lg">
                        <Center>
                            <Title order={1} c="white" mb="xl">
                                INFORMASI DAN PENGUMUMAN
                            </Title>
                        </Center>
                        {/* <Grid>
                            <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                                <Fade triggerOnce>{documentContentAI}</Fade>
                            </Grid.Col>
                        </Grid> */}

                        {loading && (
                            <Center>
                                <Loader color="white" />
                            </Center>
                        )}
                        {appError && (
                            <Center>
                                <Text c="red">
                                    Terjadi kesalahan: {appError}
                                </Text>
                            </Center>
                        )}

                        {!loading && !appError && (
                            <Grid>
                                {
                                    filesList.length > 0 ? (
                                        filesList?.map((doc) => (
                                            <Grid.Col
                                                span={{
                                                    base: 12,
                                                    sm: 6,
                                                    md: 4,
                                                }}
                                                key={doc.id}
                                            >
                                                <InfoCard
                                                    document={doc}
                                                    onCardClick={
                                                        handleCardClick
                                                    }
                                                />
                                            </Grid.Col>
                                        ))
                                    ) : (
                                        <Center>
                                            <Text
                                                c="dimmed"
                                                ta="center"
                                                mt="xl"
                                            >
                                                Tidak ada Informasi dan
                                                Pengumuman yang ditemukan.
                                            </Text>
                                        </Center>
                                    )
                                    //
                                }
                            </Grid>
                        )}
                    </Container>
                </Box>
            </BackgroundImage>
        </>
    );
}

// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// import {
//     Badge,
//     Box,
//     Card,
//     Center,
//     Container,
//     Grid,
//     Loader,
//     Modal,
//     Stack,
//     Text,
//     Title,
// } from "@mantine/core";
// import { Document, Page, pdfjs } from "react-pdf";
// import { useEffect, useState } from "react";

// import { DateFormat } from "../../../utils/DateFormat";
// import classes from "./InformasiPengumuman.module.css";
// import { useDisclosure } from "@mantine/hooks";

// // --- START: Konfigurasi React-PDF ---
// // Diperlukan untuk menampilkan pratinjau PDF di dalam kartu.

// // Tentukan path ke worker script dari CDN untuk react-pdf.
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// // --- END: Konfigurasi React-PDF ---

// // --- KOMPONEN BARIS DOKUMEN ---
// function DocumentRow({ document, onCardClick }) {
//     // URL lengkap ke file PDF di server Anda
//     const SERVER_ROOT_URL = "http://localhost:8888";
//     const correctedFilePath = document.file_path.replace(/\\/g, "/");
//     const fullPdfUrl = `${SERVER_ROOT_URL}/${correctedFilePath}`;

//     const formatDate = (dateString) => {
//         const options = { year: "numeric", month: "long", day: "numeric" };
//         return new Date(dateString).toLocaleDateString("id-ID", options);
//     };

//     return (
//         <Card
//             withBorder
//             radius="md"
//             p="lg"
//             className={classes.documentRow}
//             onClick={() => onCardClick(document.file_path, document.title)}
//         >
//             <Grid align="center">
//                 {/* Kolom untuk Pratinjau PDF */}
//                 <Grid.Col span={{ base: 12, sm: 3 }}>
//                     <Box className={classes.previewWrapper}>
//                         <Document
//                             file={fullPdfUrl}
//                             loading={
//                                 <Center h="100%">
//                                     <Loader size="sm" />
//                                 </Center>
//                             }
//                             error={
//                                 <Center h="100%">
//                                     <Text size="xs" c="dimmed" ta="center">
//                                         Gagal memuat pratinjau
//                                     </Text>
//                                 </Center>
//                             }
//                         >
//                             <Page
//                                 pageNumber={1}
//                                 width={160} // Lebar pratinjau thumbnail
//                                 renderTextLayer={false}
//                                 renderAnnotationLayer={false}
//                             />
//                         </Document>
//                     </Box>
//                 </Grid.Col>

//                 {/* Kolom untuk Konten Teks */}
//                 <Grid.Col span={{ base: 12, sm: 9 }}>
//                     <Stack gap="xs">
//                         <Badge color="red" variant="light" w="fit-content">
//                             Informasi
//                         </Badge>
//                         <Title order={4} className={classes.documentTitle}>
//                             {document.title}
//                         </Title>
//                         <Text size="sm" c="dimmed" lineClamp={2}>
//                             {document.description || "..."}
//                         </Text>
//                         <Text size="xs" c="dimmed" mt="sm">
//                             <DateFormat date={document.createdAt} />
//                         </Text>
//                     </Stack>
//                 </Grid.Col>
//             </Grid>
//         </Card>
//     );
// }

// // --- KOMPONEN UTAMA ---
// export default function InformasiPengumuman() {
//     const [filesList, setFilesList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [appError, setAppError] = useState(null);
//     const [opened, { open, close }] = useDisclosure(false);
//     const [pdfUrl, setPdfUrl] = useState("");
//     const [modalTitle, setModalTitle] = useState("");

//     const baseDocumentURL =
//         "http://localhost:8888/api/v1/documents/nopagination";

//     useEffect(() => {
//         const getFilesList = async () => {
//             setLoading(true);
//             setAppError(null);
//             try {
//                 const response = await fetch(
//                     `${baseDocumentURL}?search_query=&page=1&limit=10`
//                 );
//                 if (!response.ok) {
//                     throw new Error("Gagal mengambil data dari server.");
//                 }
//                 const data = await response.json();
//                 setFilesList(data.result || []);
//             } catch (error) {
//                 setAppError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         getFilesList();
//     }, []);

//     const handleCardClick = (filePath, title) => {
//         const SERVER_ROOT_URL = "http://localhost:8888";
//         const correctedFilePath = filePath.replace(/\\/g, "/");
//         const fullPdfUrl = `${SERVER_ROOT_URL}/${correctedFilePath}`;
//         setPdfUrl(fullPdfUrl);
//         setModalTitle(title);
//         open();
//     };

//     return (
//         <>
//             <Modal
//                 opened={opened}
//                 onClose={close}
//                 title={modalTitle}
//                 size="xl"
//                 centered
//                 overlayProps={{ backgroundOpacity: 0.7, blur: 4 }}
//             >
//                 <embed
//                     src={pdfUrl}
//                     type="application/pdf"
//                     style={{ width: "100%", height: "75vh", border: "none" }}
//                 />
//             </Modal>

//             <Box bg="gray.0" py="xl">
//                 <Container size="lg">
//                     <Title order={1} ta="center" mb="xl">
//                         Informasi dan Pengumuman
//                     </Title>

//                     {loading && (
//                         <Center mt="xl" h={200}>
//                             <Loader />
//                         </Center>
//                     )}

//                     {appError && !loading && (
//                         <Center mt="xl" h={200}>
//                             <Text c="red">Terjadi kesalahan: {appError}</Text>
//                         </Center>
//                     )}

//                     {!loading && !appError && (
//                         <Stack>
//                             {filesList.length > 0 ? (
//                                 filesList.map((doc) => (
//                                     <DocumentRow
//                                         key={doc.id}
//                                         document={doc}
//                                         onCardClick={handleCardClick}
//                                     />
//                                 ))
//                             ) : (
//                                 <Text c="dimmed" ta="center" mt="xl">
//                                     Tidak ada dokumen yang ditemukan.
//                                 </Text>
//                             )}
//                         </Stack>
//                     )}
//                 </Container>
//             </Box>
//         </>
//     );
// }

// import { useEffect, useState } from "react";

// // --- KOMPONEN GAYA (CSS IN-JS) ---
// // Semua gaya yang diperlukan untuk komponen ini didefinisikan di sini
// // untuk menghindari masalah saat mengimpor file .css eksternal.
// const Styles = () => (
//     <style>{`
//         .pageWrapper {
//             background-color: #f8f9fa;
//             padding: 48px 16px;
//             min-height: 100vh;
//             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
//         }
//         .container {
//             max-width: 960px;
//             margin: 0 auto;
//         }
//         .pageTitle {
//             font-size: 2rem;
//             font-weight: 700;
//             text-align: center;
//             margin-bottom: 32px;
//         }
//         .stack {
//             display: flex;
//             flex-direction: column;
//             gap: 24px;
//         }
//         .documentRow {
//             background-color: #fff;
//             border: 1px solid #dee2e6;
//             border-radius: 8px;
//             padding: 24px;
//             cursor: pointer;
//             transition: box-shadow 0.2s ease, transform 0.2s ease;
//         }
//         .documentRow:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         }
//         .grid {
//             display: flex;
//             align-items: center;
//         }
//         .gridCol_3 {
//             flex-basis: 25%;
//             padding-right: 24px;
//         }
//         .gridCol_9 {
//             flex-basis: 75%;
//         }
//         .previewWrapper {
//             border: 1px solid #e9ecef;
//             border-radius: 4px;
//             height: 240px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             background-color: #f1f3f5;
//             flex-direction: column;
//             color: #868e96;
//             text-align: center;
//         }
//         .documentTitle {
//             font-size: 1.125rem;
//             font-weight: 600;
//             color: #000;
//             margin: 0 0 4px 0;
//         }
//         .badge {
//             display: inline-block;
//             padding: 4px 8px;
//             font-size: 0.75rem;
//             font-weight: 700;
//             border-radius: 4px;
//             color: #c92a2a;
//             background-color: #fff5f5;
//             margin-bottom: 8px;
//         }
//         .dimmedText {
//             color: #868e96;
//             font-size: 0.875rem;
//         }
//         .lineClamp {
//             overflow: hidden;
//             display: -webkit-box;
//             -webkit-box-orient: vertical;
//             -webkit-line-clamp: 2;
//         }
//         .center {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             height: 200px;
//         }
//         .loader {
//             border: 5px solid #f3f3f3;
//             border-radius: 50%;
//             border-top: 5px solid #3498db;
//             width: 50px;
//             height: 50px;
//             animation: spin 1.5s linear infinite;
//         }
//         @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//         }
//         .modalOverlay {
//             position: fixed;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: rgba(0, 0, 0, 0.7);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             z-index: 1000;
//         }
//         .modalContent {
//             background: white;
//             padding: 24px;
//             border-radius: 8px;
//             width: 90%;
//             max-width: 1100px;
//             height: 90vh;
//             display: flex;
//             flex-direction: column;
//         }
//         .modalHeader {
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             margin-bottom: 16px;
//         }
//         .modalTitle {
//             margin: 0;
//             font-size: 1.25rem;
//         }
//         .closeButton {
//             background: none;
//             border: none;
//             font-size: 2rem;
//             cursor: pointer;
//             color: #868e96;
//         }
//         @media (max-width: 768px) {
//             .grid { flex-direction: column; }
//             .gridCol_3 { padding-right: 0; margin-bottom: 16px; width: 100%; }
//             .previewWrapper { height: 200px; }
//             .gridCol_9 { width: 100%; }
//         }
//     `}</style>
// );

// // --- KOMPONEN MODAL KUSTOM ---
// function Modal({ opened, close, title, pdfUrl }) {
//     if (!opened) return null;
//     return (
//         <div className="modalOverlay" onClick={close}>
//             <div className="modalContent" onClick={(e) => e.stopPropagation()}>
//                 <div className="modalHeader">
//                     <h3 className="modalTitle">{title}</h3>
//                     <button className="closeButton" onClick={close}>
//                         &times;
//                     </button>
//                 </div>
//                 <embed
//                     src={pdfUrl}
//                     type="application/pdf"
//                     style={{ width: "100%", height: "100%", border: "none" }}
//                 />
//             </div>
//         </div>
//     );
// }

// // --- KOMPONEN BARIS DOKUMEN ---
// function DocumentRow({ document, onCardClick }) {
//     const formatDate = (dateString) => {
//         const options = { year: "numeric", month: "long", day: "numeric" };
//         return new Date(dateString).toLocaleDateString("id-ID", options);
//     };

//     return (
//         <div
//             className="documentRow"
//             onClick={() => onCardClick(document.file_path, document.title)}
//         >
//             <div className="grid">
//                 <div className="gridCol_3">
//                     <div className="previewWrapper">
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             width="48"
//                             height="48"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="1"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                         >
//                             <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                             <polyline points="14 2 14 8 20 8"></polyline>
//                         </svg>
//                         <p style={{ marginTop: "8px", fontSize: "0.875rem" }}>
//                             Pratinjau PDF
//                         </p>
//                     </div>
//                 </div>
//                 <div className="gridCol_9">
//                     <span className="badge">Informasi</span>
//                     <h4 className="documentTitle">{document.title}</h4>
//                     <p className="dimmedText lineClamp">
//                         {document.description || "..."}
//                     </p>
//                     <p
//                         className="dimmedText"
//                         style={{ marginTop: "16px", fontSize: "0.8rem" }}
//                     >
//                         Published by admin on {formatDate(document.createdAt)}
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // --- KOMPONEN UTAMA ---
// export default function InformasiPengumuman() {
//     const [filesList, setFilesList] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [appError, setAppError] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [pdfUrl, setPdfUrl] = useState("");
//     const [modalTitle, setModalTitle] = useState("");

//     const baseDocumentURL = "http://localhost:8888/api/v1/documents";

//     useEffect(() => {
//         const getFilesList = async () => {
//             setLoading(true);
//             setAppError(null);
//             try {
//                 const response = await fetch(
//                     `${baseDocumentURL}?search_query=&page=1&limit=10`
//                 );
//                 if (!response.ok)
//                     throw new Error("Gagal mengambil data dari server.");
//                 const data = await response.json();
//                 setFilesList(data.result || []);
//             } catch (error) {
//                 setAppError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         getFilesList();
//     }, []);

//     const handleCardClick = (filePath, title) => {
//         const SERVER_ROOT_URL = "http://localhost:8888";
//         const correctedFilePath = filePath.replace(/\\/g, "/");
//         const fullPdfUrl = `${SERVER_ROOT_URL}/${correctedFilePath}`;
//         setPdfUrl(fullPdfUrl);
//         setModalTitle(title);
//         setIsModalOpen(true);
//     };

//     const closeModal = () => setIsModalOpen(false);

//     return (
//         <>
//             <Styles />
//             <Modal
//                 opened={isModalOpen}
//                 close={closeModal}
//                 title={modalTitle}
//                 pdfUrl={pdfUrl}
//             />
//             <div className="pageWrapper">
//                 <div className="container">
//                     <h1 className="pageTitle">Informasi dan Pengumuman</h1>
//                     {loading && (
//                         <div className="center">
//                             <div className="loader"></div>
//                         </div>
//                     )}
//                     {appError && !loading && (
//                         <div className="center">
//                             <p style={{ color: "red" }}>
//                                 Terjadi kesalahan: {appError}
//                             </p>
//                         </div>
//                     )}
//                     {!loading && !appError && (
//                         <div className="stack">
//                             {filesList.length > 0 ? (
//                                 filesList.map((doc) => (
//                                     <DocumentRow
//                                         key={doc.id}
//                                         document={doc}
//                                         onCardClick={handleCardClick}
//                                     />
//                                 ))
//                             ) : (
//                                 <p
//                                     className="dimmedText"
//                                     style={{ textAlign: "center" }}
//                                 >
//                                     Tidak ada dokumen yang ditemukan.
//                                 </p>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// }
