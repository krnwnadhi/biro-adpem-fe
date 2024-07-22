/* eslint-disable react/prop-types */

import {
    ActionIcon,
    Anchor,
    AppShell,
    Burger,
    Code,
    Container,
    Group,
    Image,
    ScrollArea,
    Stack,
    Text,
    Title,
    Tooltip,
    useMantineColorScheme,
} from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

import { DarkButton } from "../../components/DarkButton/DarkButton";
import { IconPencil } from "@tabler/icons-react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { NavbarDashboard } from "../NavbarDashboard";
import { fetchPaginationPostAction } from "../../redux/slices/posts/postSlice";
import { nprogress } from "@mantine/nprogress";
import { useDisclosure } from "@mantine/hooks";

export const DaftarBerita = () => {
    const { colorScheme } = useMantineColorScheme();

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPaginationPostAction());
    }, [dispatch]);

    const post = useSelector((state) => state?.post);
    const { loading, postPagination = [] } = post;

    const { result = [] } = postPagination;

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const categoriesList = [
        "BIDANG PENGENDALIAN PEMBANGUNAN WILAYAH",
        "BIDANG PENGENDALIAN PEMBANGUNAN APBN DAN APBD",
        "BIDANG PELAPORAN",
    ];

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
                    <Tooltip label="Edit">
                        <ActionIcon
                            component={Anchor}
                            href={`/berita/${row.original?.id}`}
                            color="red"
                            variant="subtle"
                        >
                            <IconPencil size={14} stroke={1.5} />
                        </ActionIcon>
                    </Tooltip>
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
                header: "Judul Berita",
                Cell: ({ cell }) => <Text size="xs">{cell.getValue()}</Text>,
            },
            {
                accessorKey: "description",
                header: "Deskripsi",
                enableGlobalFilter: false,
                Cell: ({ cell }) => (
                    <Text
                        lineClamp={3}
                        c="dimmed"
                        dangerouslySetInnerHTML={{
                            __html: cell.getValue(),
                        }}
                        size="xs"
                    />
                ),
            },
            {
                accessorKey: "category",
                header: "Kategori",
                Cell: ({ cell }) => <Text size="xs">{cell.getValue()}</Text>,
                filterVariant: "select",
                mantineFilterSelectProps: {
                    data: categoriesList,
                },
                size: 400,
                enableGlobalFilter: false,
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
                size: 25,
                Cell: ({ cell }) => (
                    <Image
                        radius="md"
                        h={50}
                        w="auto"
                        fit="contain"
                        src={cell.getValue()}
                    />
                ),
            },
            {
                accessorKey: "numViews",
                header: "Dilihat",
                enableColumnOrdering: false,
                enableColumnFilterModes: false,
                enableColumnFilter: false,
                enableColumnSortModes: false,
                enableGrouping: false,
                enableSorting: false,
                enableColumnActions: false,
                enableResizing: false,
                size: 25,
                Cell: ({ cell }) => <Text size="xs">{cell.getValue()}</Text>,
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
        // eslint-disable-next-line
        []
    );

    const data = result;

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
        },
        mantinePaginationProps: {
            rowsPerPageOptions: ["5", "10", "15", "20"],
        },
        mantineSearchTextInputProps: {
            placeholder: "Cari Judul Berita",
        },
        state: {
            showProgressBars: loading,
            isLoading: loading,
        },
        initialState: {
            columnPinning: {
                left: ["id"],
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
                            LIST BERITA
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
