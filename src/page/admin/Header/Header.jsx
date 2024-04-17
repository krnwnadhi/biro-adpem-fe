import {
    ActionIcon,
    Box,
    Burger,
    Button,
    Center,
    Collapse,
    Divider,
    Drawer,
    Group,
    HoverCard,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    Tooltip,
    UnstyledButton,
    rem,
    useMantineTheme,
} from "@mantine/core";
import {
    IconBinaryTree,
    IconBook,
    IconBuilding,
    IconBuildingArch,
    IconChevronDown,
    IconFileInfo,
    IconLayoutDashboard,
    IconPhotoCheck,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

import { DarkButton } from "../DarkButton/DarkButton";
import classes from "./Header.module.css";
import { useDisclosure } from "@mantine/hooks";

const dataProfil = [
    {
        icon: IconBuildingArch,
        title: "Selayang Pandang",
        description:
            "Gambaran Umum Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/profil/selayangpandang",
    },
    {
        icon: IconBuilding,
        title: "Visi & Misi",
        description:
            "Visi & Misi Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/profil/visimisi",
    },
    {
        icon: IconBinaryTree,
        title: "Struktur Organisasi",
        description:
            "Struktur Organisasi & Pejabat Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/profil/struktur",
    },
];

const dataInformasi = [
    {
        icon: IconBook,
        title: "Berita dan Kegiatan",
        description: "Berita Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/berita",
    },
    {
        icon: IconFileInfo,
        title: "Dokumen",
        description: "Dokumen Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/dokumen",
    },
    {
        icon: IconPhotoCheck,
        title: "Galeri",
        description: "Galeri Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "/gallery",
    },
];

const dataLayanan = [
    {
        icon: IconBuildingArch,
        title: "SIMANTAP",
        description: "SIMANTAP Biro Adminsistrasi Pembangunan Provinsi Jambi",
        link: "#",
    },
];

export default function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const [linksOpenedTwo, { toggle: toggleLinksTwo }] = useDisclosure(false);
    const [linksOpenedThree, { toggle: toggleLinksThree }] =
        useDisclosure(false);

    const theme = useMantineTheme();

    const withouSidebarRoutes = [
        "404",
        "/signin",
        "/register",
        "/dashboard",
        "/kategori",
        "/reset-password",
        "/about",
    ];

    const { pathname } = useLocation();
    if (withouSidebarRoutes.some((item) => pathname.includes(item)))
        return null;

    const linksProfil = dataProfil.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon
                        style={{ width: rem(22), height: rem(22) }}
                        color={theme.colors.blue[6]}
                    />
                </ThemeIcon>
                <UnstyledButton component={Link} to={item.link}>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </UnstyledButton>
            </Group>
        </UnstyledButton>
    ));

    const linksInformasi = dataInformasi.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon
                        style={{ width: rem(22), height: rem(22) }}
                        color={theme.colors.blue[6]}
                    />
                </ThemeIcon>
                <UnstyledButton component={Link} to={item.link}>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </UnstyledButton>
            </Group>
        </UnstyledButton>
    ));

    const linksLayanan = dataLayanan.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon
                        style={{ width: rem(22), height: rem(22) }}
                        color={theme.colors.blue[6]}
                    />
                </ThemeIcon>
                <UnstyledButton component={Link} to={item.link}>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                        {item.description}
                    </Text>
                </UnstyledButton>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box pb={30}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Group h="100%" gap={0} visibleFrom="sm">
                        <Link to="/" className={classes.link}>
                            Home
                        </Link>

                        {/*  */}
                        <HoverCard
                            width={600}
                            position="bottom"
                            radius="md"
                            shadow="md"
                            withinPortal
                        >
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Profil
                                        </Box>
                                        <IconChevronDown
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                            color={theme.colors.blue[6]}
                                        />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                                <SimpleGrid cols={2} spacing={0}>
                                    {linksProfil}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        {/*  */}

                        <HoverCard
                            width={600}
                            position="bottom"
                            radius="md"
                            shadow="md"
                            withinPortal
                        >
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Informasi
                                        </Box>
                                        <IconChevronDown
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                            color={theme.colors.blue[6]}
                                        />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                                <SimpleGrid cols={2} spacing={0}>
                                    {linksInformasi}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        {/*  */}

                        <HoverCard
                            width={600}
                            position="bottom"
                            radius="md"
                            shadow="md"
                            withinPortal
                        >
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Layanan
                                        </Box>
                                        <IconChevronDown
                                            style={{
                                                width: rem(16),
                                                height: rem(16),
                                            }}
                                            color={theme.colors.blue[6]}
                                        />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                                <SimpleGrid cols={2} spacing={0}>
                                    {linksLayanan}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <Link to="/about" className={classes.link}>
                            About
                        </Link>
                        {/* <Tooltip transition="slide-up" label="Dashboard">
                            <UnstyledButton
                                component={Link}
                                to="/dashboard"
                                className={classes.link}
                            >
                                <ActionIcon variant="transparent">
                                    <IconLayoutDashboard size={18} />
                                </ActionIcon>
                            </UnstyledButton>
                        </Tooltip> */}
                    </Group>

                    <Group visibleFrom="sm">
                        <DarkButton />
                        <Button variant="default" component={Link} to="/signin">
                            Log in
                        </Button>
                    </Group>

                    <Burger
                        opened={drawerOpened}
                        onClick={toggleDrawer}
                        hiddenFrom="sm"
                    />
                </Group>
            </header>

            {/* MOBILE */}

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="80%"
                padding="md"
                title="Biro Adpem"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                    <Divider my="sm" />

                    <a href="/" className={classes.link}>
                        Home
                    </a>

                    <UnstyledButton
                        className={classes.link}
                        onClick={toggleLinks}
                    >
                        <Center inline>
                            <Box component="span" mr={5}>
                                Profil
                            </Box>
                            <IconChevronDown
                                style={{ width: rem(16), height: rem(16) }}
                                color={theme.colors.blue[6]}
                            />
                        </Center>
                    </UnstyledButton>

                    <Collapse in={linksOpened}>{linksProfil}</Collapse>

                    <UnstyledButton
                        className={classes.link}
                        onClick={toggleLinksTwo}
                    >
                        <Center inline>
                            <Box component="span" mr={5}>
                                Informasi
                            </Box>
                            <IconChevronDown
                                style={{ width: rem(16), height: rem(16) }}
                                color={theme.colors.blue[6]}
                            />
                        </Center>
                    </UnstyledButton>

                    <Collapse in={linksOpenedTwo}>{linksInformasi}</Collapse>

                    <UnstyledButton
                        className={classes.link}
                        onClick={toggleLinksThree}
                    >
                        <Center inline>
                            <Box component="span" mr={5}>
                                Layanan
                            </Box>
                            <IconChevronDown
                                style={{ width: rem(16), height: rem(16) }}
                                color={theme.colors.blue[6]}
                            />
                        </Center>
                    </UnstyledButton>

                    <Collapse in={linksOpenedThree}>{linksLayanan}</Collapse>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <DarkButton />
                        <Button variant="default" component={Link} to="/login">
                            Log in
                        </Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}
