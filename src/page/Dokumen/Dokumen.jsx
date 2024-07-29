import {
    ActionIcon,
    Anchor,
    Avatar,
    Box,
    Breadcrumbs,
    Card,
    Center,
    Container,
    Group,
    Pagination,
    Text,
    useMantineTheme,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { DateFormat } from "../../utils/DateFormat";
import { Fade } from "react-awesome-reveal";
import { IconDownload } from "@tabler/icons-react";
import axios from "axios";
import { baseDocumentURL } from "../../utils/baseURL";
import classes from "./Dokumen.module.css";
import download from "downloadjs";
import { fetchAllDocumentAction } from "../../redux/slices/document/documentSlice";
import iconExcel from "../../assets/iconExcel.svg";
import { nprogress } from "@mantine/nprogress";
import pdfIconSVG from "../../assets/pdf-file.svg";
import { useMediaQuery } from "@mantine/hooks";

export const Dokumen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllDocumentAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const document = useSelector((state) => state?.document);

    const { loading } = document;

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const [filesList, setFilesList] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");

    const theme = useMantineTheme();

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

    const handlePageChange = (event) => {
        setPage(event);
    };

    const downloadFile = async (id, file_path, mimetype) => {
        try {
            const result = await axios.get(`${baseDocumentURL}/${id}`, {
                responseType: "blob",
                "Access-Control-Allow-Origin": "*",
            });

            const split = file_path.split("/");
            const filename = split[split.length - 1];

            setErrorMsg("");

            return download(result.data, filename, mimetype);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrorMsg("Error ketika mendownload file! Coba lagi nanti!");
            } else if (error.response.status === 500) {
                setErrorMsg("File Tidak ditemukan!");
            }
        }
    };

    const documentContent =
        filesList?.length > 0 ? (
            filesList?.map((item) => (
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    mt="lg"
                    key={item?.id}
                    className={classes.card}
                >
                    <Group wrap="nowrap">
                        <Avatar
                            src={
                                item?.file_mimetype === "application/pdf"
                                    ? pdfIconSVG
                                    : iconExcel
                            }
                            size={80}
                        />
                        <div>
                            <Text fz="lg" fw={500} className={classes.name}>
                                {item?.title}
                            </Text>

                            <Text fz="xs" c="dimmed" lineClamp={2}>
                                {item?.description}
                            </Text>

                            <Group wrap="nowrap" gap={10} mt={5}>
                                <Text fz="xs" c="dimmed">
                                    <DateFormat date={item?.createdAt} />
                                </Text>

                                <ActionIcon
                                    variant="subtle"
                                    onClick={() =>
                                        downloadFile(
                                            item?.id,
                                            item?.file_path,
                                            item?.file_mimetype
                                        )
                                    }
                                >
                                    <IconDownload size="20" />
                                </ActionIcon>
                            </Group>
                        </div>
                    </Group>
                </Card>
            ))
        ) : (
            <Text fw={700} fs="italic" mt="xl">
                Belum ada file. Silahkan tambah file.
            </Text>
        );

    const breadcrumbsItem = [
        { title: "Beranda", href: "/" },
        { title: "Informasi", href: "#" },
        { title: "Dokumen", href: "#" },
    ].map((item, index) => (
        <Anchor
            href={item?.href}
            key={index}
            size="xs"
            underline={false}
            truncate="end"
        >
            {item?.title}
        </Anchor>
    ));

    return (
        <Container size="lg" mt={100} mih="80vh">
            <Breadcrumbs>{breadcrumbsItem}</Breadcrumbs>

            {errorMsg && (
                <Text c="red" fw={700} mt="md">
                    {errorMsg}
                </Text>
            )}

            <Fade triggerOnce>{documentContent}</Fade>

            {filesList?.length > 0 ? (
                <Center>
                    <Box p={20} mt="xl">
                        <Pagination
                            onChange={handlePageChange}
                            total={rows}
                            withControls
                            withEdges
                        />
                        <Center mt={10}>
                            <Text size="xs" mt={5}>
                                Halaman{" "}
                                <Text span fw={700}>
                                    {rows ? page : 0}
                                </Text>{" "}
                                dari{" "}
                                <Text span fw={700}>
                                    {rows}
                                </Text>{" "}
                                dari total :{" "}
                                <Text span fw={700}>
                                    {pages}
                                </Text>{" "}
                                dokumen
                            </Text>
                        </Center>
                    </Box>
                </Center>
            ) : null}
        </Container>
    );
};
