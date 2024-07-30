/* eslint-disable react/prop-types */

import {
    ActionIcon,
    AppShell,
    Burger,
    Code,
    Container,
    Flex,
    Group,
    Image,
    ScrollArea,
    Stack,
    Text,
    Title,
    Tooltip,
    useMantineColorScheme,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
    MRT_EditActionButtons,
    MantineReactTable,
    useMantineReactTable,
} from "mantine-react-table";
import {
    deleteGalleryAction,
    fetchAllGalleryAction,
    updateGalleryAction,
} from "../../redux/slices/gallery/gallerySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { DarkButton } from "../../components/DarkButton/DarkButton";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { NavbarDashboard } from "../NavbarDashboard";
import { modals } from "@mantine/modals";
import { nprogress } from "@mantine/nprogress";
import { useDisclosure } from "@mantine/hooks";

export const DaftarGaleri = () => {
    const dispatch = useDispatch();

    const [validationErrors, setValidationErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const { colorScheme } = useMantineColorScheme();

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    useEffect(() => {
        dispatch(fetchAllGalleryAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const gallery = useSelector((state) => state?.gallery);
    const { galleryList = [], loading } = gallery;

    const { result = [] } = galleryList;

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const validateRequired = (value) => value.length > 5;

    const validateTitleGallery = (gallery) => {
        return {
            title: !validateRequired(gallery.title)
                ? "Harap Isi Nama Foto Min. 5 Karakter"
                : "",
        };
    };

    const handleEditGallery = async ({ values, table }) => {
        console.log(values, table);
        const newValidationErrors = validateTitleGallery(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(updateGalleryAction(values));
        setIsSaving(false);
        table.setEditingRow(null); //exit editing mode
    };

    const openDeleteConfirmModal = (row) =>
        modals.openConfirmModal({
            title: "Hapus Foto?",
            centered: true,
            children: (
                <Stack gap="md">
                    <Text size="xs">
                        Yakin ingin menghapus Foto `{row.original.title}`?
                    </Text>
                    <Image
                        radius="md"
                        h={50}
                        w="auto"
                        fit="contain"
                        src={row.original.image}
                    />
                </Stack>
            ),
            labels: { confirm: "Hapus", cancel: "Batal" },
            confirmProps: { color: "red" },
            onConfirm: async () => {
                setIsSaving(true);
                await new Promise((resolve) => setTimeout(resolve, 2000));
                dispatch(deleteGalleryAction(row.original._id));
                setIsSaving(false);
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            },
        });

    const data = result;

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "ID",
                size: 10,
                enableEditing: false,
            },
            {
                accessorKey: "title",
                header: "Judul Galeri",
                size: 10,
                Cell: ({ cell }) => <Text size="xs">{cell.getValue()}</Text>,
            },
            {
                accessorKey: "image",
                header: "Foto",
                enableColumnOrdering: false,
                enableColumnFilterModes: false,
                enableColumnFilter: false,
                enableColumnSortModes: false,
                enableGrouping: false,
                enableSorting: false,
                enableColumnActions: false,
                enableResizing: false,
                size: 200,
                enableEditing: false,
                Cell: ({ cell }) => (
                    <Image
                        radius="md"
                        h={100}
                        w="auto"
                        fit="contain"
                        src={cell.getValue()}
                    />
                ),
            },
            {
                accessorFn: (row) => {
                    const sDay = new Date(row.createdAt);
                    sDay.setHours(0, 0, 0, 0);
                    return sDay;
                },
                enableEditing: false,
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
        [validationErrors]
    );

    const table = useMantineReactTable({
        columns,
        data,
        withBorder: colorScheme === "light",
        enableColumnFilterModes: false,
        enableColumnOrdering: true,
        enableGrouping: true,
        enableColumnPinning: true,
        enableFilterMatchHighlighting: true,
        mantineTableProps: {
            striped: "odd",
            withColumnBorders: true,
            withRowBorders: true,
            withTableBorder: true,
            style: {
                fontSize: "12px",
            },
            sx: {
                tableLayout: "fixed",
            },
        },
        mantinePaginationProps: {
            rowsPerPageOptions: ["5", "10", "15", "20"],
        },
        mantineSearchTextInputProps: {
            placeholder: "Cari Judul Berita",
        },
        initialState: {
            state: {
                showProgressBars: loading,
                isLoading: loading,
            },
        },
        state: {
            showProgressBars: loading,
            isLoading: loading,
            isSaving: loading,
            showAlertBanner: loading,
            columnVisibility: {
                id: false, //hide firstName column by default
                "mrt-row-expand": false, //hide row expand column by default
            },
        },

        mantineTableContainerProps: {
            style: {
                minHeight: "500px",
            },
        },
        enableRowNumbers: true,
        enableEditing: true,
        createDisplayMode: "modal",
        editDisplayMode: "modal",
        getRowId: (row) => row.id,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleEditGallery,
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit Foto</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons
                        variant="text"
                        table={table}
                        row={row}
                    />
                </Flex>
            </Stack>
        ),

        renderRowActions: ({ row, table }) => (
            <Flex gap="md">
                <Tooltip label="Edit">
                    <ActionIcon
                        variant="subtle"
                        aria-label="Edit"
                        radius="xl"
                        size="sm"
                        onClick={() => table.setEditingRow(row)}
                    >
                        <IconEdit />
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
                            LIST GALERI
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
