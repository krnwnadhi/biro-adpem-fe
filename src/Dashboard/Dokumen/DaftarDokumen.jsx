/* eslint-disable react/prop-types */

import {
    ActionIcon,
    AppShell,
    Burger,
    Code,
    Container,
    Flex,
    Group,
    ScrollArea,
    Stack,
    Text,
    Title,
    Tooltip,
    useMantineColorScheme,
} from "@mantine/core";
import { IconDownload, IconTrash } from "@tabler/icons-react";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import {
    deleteDocumentAction,
    fetchAllDocumentNoPaginationAction,
} from "../../redux/slices/document/documentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { DarkButton } from "../../components/DarkButton/DarkButton";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { NavbarDashboard } from "../NavbarDashboard";
import axios from "axios";
import { baseDocumentURL } from "../../utils/baseURL";
import download from "downloadjs";
import { modals } from "@mantine/modals";
import { nprogress } from "@mantine/nprogress";
import { useDisclosure } from "@mantine/hooks";

export const DaftarDokumen = () => {
    const { colorScheme } = useMantineColorScheme();

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const [errorMsg, setErrorMsg] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllDocumentNoPaginationAction());
    }, [dispatch]);

    const document = useSelector((state) => state?.document);

    const { loading, documentListNoPagination = [] } = document;

    const { result = [] } = documentListNoPagination;

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const openDeleteConfirmModal = (row) =>
        modals.openConfirmModal({
            title: "Hapus Dokumen?",
            centered: true,
            children: (
                <Text size="xs">
                    Yakin ingin menghapus Dokumen `{row.original.title}`?
                </Text>
            ),
            labels: { confirm: "Hapus", cancel: "Batal" },
            confirmProps: { color: "red" },
            onConfirm: async () => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                dispatch(deleteDocumentAction(row.original._id));
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            },
        });

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

    const data = result;

    const columns = useMemo(
        () => [
            {
                id: "id",
                header: "Aksi",
                enableColumnOrdering: false,
                enableColumnFilterModes: false,
                enableColumnFilter: false,
                enableColumnSortModes: false,
                enableGrouping: false,
                enableSorting: false,
                enableColumnActions: false,
                enableResizing: false,
                size: 50,
                Cell: ({ row }) => (
                    <Flex gap="md">
                        <Tooltip label="Download">
                            <ActionIcon
                                variant="subtle"
                                aria-label="Download"
                                radius="xl"
                                size="sm"
                                onClick={() =>
                                    downloadFile(
                                        row?.original?.id,
                                        row?.original?.file_path,
                                        row?.original?.file_mimetype
                                    )
                                }
                            >
                                <IconDownload />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Hapus">
                            <ActionIcon
                                color="red"
                                variant="subtle"
                                aria-label="Delete"
                                radius="xl"
                                size="sm"
                                onClick={() => openDeleteConfirmModal(row)}
                            >
                                <IconTrash />
                            </ActionIcon>
                        </Tooltip>
                    </Flex>
                ),
            },
            {
                header: "No",
                id: "no",
                Cell: ({ row }) => {
                    return <Text size="xs"> {row.index + 1} </Text>;
                },
                enableColumnOrdering: false,
                enableColumnFilterModes: false,
                enableColumnFilter: false,
                enableColumnSortModes: false,
                enableGrouping: false,
                enableSorting: false,
                enableColumnActions: false,
                enableResizing: false,
                size: 25,
            },
            {
                accessorKey: "title",
                header: "Judul Dokumen",
                Cell: ({ cell }) => <Text size="xs">{cell.getValue()}</Text>,
            },
            {
                accessorKey: "description",
                header: "Deskripsi",
                enableGlobalFilter: false,
                enableColumnOrdering: false,
                enableColumnFilterModes: false,
                enableColumnFilter: false,
                enableColumnSortModes: false,
                enableGrouping: false,
                enableSorting: false,
                enableColumnActions: false,
                enableResizing: false,
                Cell: ({ cell }) => (
                    <Text
                        lineClamp={2}
                        c="dimmed"
                        dangerouslySetInnerHTML={{
                            __html: cell.getValue(),
                        }}
                        size="xs"
                    />
                ),
            },
            {
                accessorFn: (row) => {
                    const sDay = new Date(row.createdAt);
                    sDay.setHours(0, 0, 0, 0);
                    return sDay;
                },
                minSize: 150,
                maxSize: 200,
                size: 175,
                enableGrouping: false,
                id: "createdAt",
                header: "Tanggal",
                filterVariant: "date-range",
                sortingFn: "datetime",
                enableColumnFilterModes: false,
                Cell: ({ cell }) =>
                    cell.getValue()?.toLocaleDateString("id-ID"),
            },
        ],
        [openDeleteConfirmModal]
    );

    const table = useMantineReactTable({
        columns,
        data,
        withBorder: colorScheme === "light",
        enableColumnFilterModes: false,
        enableColumnOrdering: false,
        enableGrouping: false,
        enableColumnPinning: false,
        enableFilterMatchHighlighting: true,
        mantineTableProps: {
            striped: "odd",
            withColumnBorders: true,
            withRowBorders: true,
            withTableBorder: true,
            style: {
                fontSize: "12px",
            },
        },
        mantinePaginationProps: {
            rowsPerPageOptions: ["5", "10", "15", "20"],
        },
        mantineSearchTextInputProps: {
            placeholder: "Cari Judul Dokumen",
        },
        state: {
            showProgressBars: loading,
            isLoading: loading,
        },
        mantineTableContainerProps: {
            style: {
                minHeight: "400px",
            },
        },
    });

    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger
                            opened={mobileOpened}
                            onClick={toggleMobile}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Burger
                            opened={desktopOpened}
                            onClick={toggleDesktop}
                            visibleFrom="sm"
                            size="sm"
                        />
                        <Text size="sm">Dashboard</Text>
                        <Code fw={700}>v1.0.0</Code>
                    </Group>
                    <Group>
                        <DarkButton />
                        {/* <DarkButton /> */}
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                {/* Navbar */}
                <AppShell.Section grow component={ScrollArea}>
                    <NavbarDashboard />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <Container size="lg">
                    <Stack>
                        <Title order={4} ta="center">
                            LIST DOKUMEN
                        </Title>
                        <MantineReactTable table={table} enableStickyHeader />
                    </Stack>
                </Container>
            </AppShell.Main>
            <AppShell.Footer p="sm">
                <Text size="sm" ta="center">
                    Copyright © 2023{" "}
                    <Text
                        size="sm"
                        fw={700}
                        component={Link}
                        to="/"
                        weight="bold"
                        c="blue"
                    >
                        Biro Adminitrasi Pembangunan Setda Provinsi Jambi
                    </Text>
                </Text>
            </AppShell.Footer>
        </AppShell>
    );
};
