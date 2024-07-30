/* eslint-disable react/prop-types */

import {
    ActionIcon,
    AppShell,
    Burger,
    Button,
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
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
    MRT_EditActionButtons,
    MantineReactTable,
    useMantineReactTable,
} from "mantine-react-table";
import {
    createCategoryAction,
    deleteCategoryAction,
    fetchAllCategoryAction,
    updateCategoryAction,
} from "../../redux/slices/category/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { DarkButton } from "../../components/DarkButton/DarkButton";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { NavbarDashboard } from "../NavbarDashboard";
import { modals } from "@mantine/modals";
import { nprogress } from "@mantine/nprogress";
import { useDisclosure } from "@mantine/hooks";

export const DaftarKategori = () => {
    const { colorScheme } = useMantineColorScheme();

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const [validationErrors, setValidationErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategoryAction());
    }, [dispatch]);

    const category = useSelector((state) => state?.category);

    const { categoryList = [], loading } = category;

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const validateRequired = (value) => value.length > 5;

    const validateTitleCategory = (category) => {
        return {
            title: !validateRequired(category.title)
                ? "Harap Isi Nama Kategori Min. 5 Karakter"
                : "",
        };
    };

    const handleEditCategory = async ({ values, table }) => {
        const newValidationErrors = validateTitleCategory(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(updateCategoryAction(values));
        setIsSaving(false);
        table.setEditingRow(null);
    };

    const handleCreateCategory = async ({ values, exitCreatingMode }) => {
        const newValidationErrors = validateTitleCategory(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(createCategoryAction(values));
        setIsSaving(false);
        exitCreatingMode();
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    };

    const openDeleteConfirmModal = (row) =>
        modals.openConfirmModal({
            title: "Hapus kategori?",
            centered: true,
            children: (
                <Text size="xs">
                    Yakin ingin menghapus Kategori `{row.original.title}`?
                </Text>
            ),
            labels: { confirm: "Hapus", cancel: "Batal" },
            confirmProps: { color: "red" },
            onConfirm: async () => {
                setIsSaving(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                dispatch(deleteCategoryAction(row.original._id));
                setIsSaving(false);
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            },
        });

    const data = categoryList;

    const columns = useMemo(
        () => [
            {
                accessorKey: "_id",
                header: "ID",
                size: 10,
                enableEditing: false,
            },
            {
                accessorKey: "title",
                header: "Nama Kategori",
                enableColumnOrdering: false,
                mantineEditTextInputProps: {
                    type: "email",
                    required: true,
                    error: validationErrors?.title,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            title: undefined,
                        }),
                },
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
                header: "Tanggal Dibuat",
                filterVariant: "date-range",
                sortingFn: "datetime",
                enableColumnFilterModes: false,
                enableColumnOrdering: false,
                enableColumnFilter: false,
                enableColumnSortModes: false,
                enableSorting: false,
                enableColumnActions: false,
                enableResizing: false,
                enableEditing: false,
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
            placeholder: "Cari Kategori",
        },
        displayColumnDefOptions: {
            "mrt-row-actions": {
                header: "Aksi",
                size: 50,
            },
        },
        state: {
            showProgressBars: loading,
            isLoading: loading,
            isSaving: isSaving,
            showAlertBanner: loading,
            columnVisibility: {
                _id: false,
                "mrt-row-expand": false,
            },
        },
        createDisplayMode: "modal",
        editDisplayMode: "modal",
        enableEditing: true,
        mantineTableContainerProps: {
            style: {
                minHeight: "400px",
            },
        },
        getRowId: (row) => row.id,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleEditCategory,
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateCategory,
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit Kategori</Title>
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
        renderCreateRowModalContent: ({
            table,
            row,
            internalEditComponents,
        }) => (
            <Stack>
                <Title order={3}>Tambah Kategori</Title>
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
        renderRowActions: ({ row }) => (
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
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                onClick={() => {
                    table.setCreatingRow(true);
                }}
                variant="subtle"
                size="xs"
            >
                Tambah Kategori
            </Button>
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
                            LIST KATEGORI
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
