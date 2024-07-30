/* eslint-disable react/prop-types */

import {
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
    useMantineColorScheme,
} from "@mantine/core";
import { MantineReactTable, useMantineReactTable } from "mantine-react-table";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";

import { DarkButton } from "../../components/DarkButton/DarkButton";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { NavbarDashboard } from "../NavbarDashboard";
import { fetchAllGalleryAction } from "../../redux/slices/gallery/gallerySlice";
import { nprogress } from "@mantine/nprogress";
import { useDisclosure } from "@mantine/hooks";

export const DaftarGaleri = () => {
    const dispatch = useDispatch();

    const { colorScheme } = useMantineColorScheme();

    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    useEffect(() => {
        dispatch(fetchAllGalleryAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const gallery = useSelector((state) => state?.gallery);
    const { galleryList = [], appError, serverError, loading } = gallery;
    // console.log(galleryList);

    const { result = [] } = galleryList;
    console.log(result);

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const data = result;

    const columns = useMemo(
        () => [
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
                size: 500,
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
        ],
        []
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
        state: {
            showProgressBars: loading,
            isLoading: loading,
        },
        initialState: {
            columnPinning: {
                left: ["id"],
            },
        },
        mantineTableContainerProps: {
            style: {
                minHeight: "500px",
            },
        },
        enableRowNumbers: true,
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
