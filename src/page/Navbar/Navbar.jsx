import {
    ActionIcon,
    Box,
    Burger,
    Center,
    Collapse,
    Divider,
    Drawer,
    Group,
    HoverCard,
    Image,
    Portal,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    Tooltip,
    UnstyledButton,
    rem,
    useComputedColorScheme,
    useMantineTheme,
} from "@mantine/core";
import {
    IconBinaryTree,
    IconBook,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBuilding,
    IconBuildingArch,
    IconChevronDown,
    IconFileInfo,
    IconLayoutDashboard,
    IconPhotoCheck,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom";
import { useDisclosure, useHeadroom } from "@mantine/hooks";

import { DarkButton } from "../../components/DarkButton/DarkButton";
import classes from "./Navbar.module.css";
import { useSelector } from "react-redux";

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
        link: "/profil/strukturorganisasi",
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
        link: "/galeri",
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

const Navbar = () => {
    //get user from store
    const state = useSelector((state) => state.users);

    const { userAuth } = state;

    const isAdmin = userAuth?.isAdmin;

    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const [linksOpenedTwo, { toggle: toggleLinksTwo }] = useDisclosure(false);
    const [linksOpenedThree, { toggle: toggleLinksThree }] =
        useDisclosure(false);

    const theme = useMantineTheme();

    const pinned = useHeadroom({ fixedAt: 120 });

    const computedColorScheme = useComputedColorScheme("dark", {
        getInitialValueInEffect: true,
    });

    const withoutSidebarRoutes = [
        "404",
        "/signin",
        "/register",
        "/dashboard",
        "/kategori",
        "/reset-password",
        "/about",
    ];

    const { pathname } = useLocation();
    if (withoutSidebarRoutes.some((item) => pathname.includes(item)))
        return null;

    const linksProfil = dataProfil.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="outline" radius="md">
                    <item.icon
                        style={{ width: rem(22), height: rem(22) }}
                        color={theme.colors.blue[6]}
                    />
                </ThemeIcon>
                <UnstyledButton component="a" href={item.link}>
                    <Text size="sm">{item.title}</Text>
                    <Text size="xs" c="dimmed">
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
                <UnstyledButton component="a" href={item.link}>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
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
                <UnstyledButton component="a" href={item.link}>
                    <Text size="sm" weight={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </UnstyledButton>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Portal>
            <Box
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: rem(80),
                    zIndex: 999,
                    transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
                    transition: "transform 400ms ease",
                    backgroundColor: "var(--mantine-color-body)",
                }}
            >
                <header className={classes.header}>
                    <Group justify="space-between" h="100%">
                        <Image
                            className={classes.image}
                            height={80}
                            src={
                                computedColorScheme === "dark"
                                    ? "https://res.cloudinary.com/degzbxlnx/image/upload/v1690361888/biro-administrasi-pembangunan-setda-provinsi-jambi_wnnxqw.png"
                                    : "https://res.cloudinary.com/degzbxlnx/image/upload/v1690361888/biro-administrasi-pembangunan-setda-provinsi-jambi_1_obbwwu.png"
                            }
                            fallbackSrc={
                                computedColorScheme === "dark"
                                    ? "https://placehold.co/250x65/242424/FFF?text=Biro+Administrasi+Pembangunan+Setda\nProvinsi+Jambi"
                                    : "https://placehold.co/250x65/FFF/000000?text=Biro+Administrasi+Pembangunan+Setda\nProvinsi+Jambi"
                            }
                        />
                        <Group h="100%" gap={0} visibleFrom="sm">
                            <Link to="/" className={classes.link}>
                                Beranda
                            </Link>

                            {/*  */}
                            <HoverCard
                                width={600}
                                position="bottom"
                                radius="md"
                                shadow="md"
                                withinPortal
                                withArrow
                                offset={20}
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

                                <HoverCard.Dropdown
                                    style={{ overflow: "hidden" }}
                                >
                                    <SimpleGrid cols={1}>
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
                                withArrow
                                offset={20}
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

                                <HoverCard.Dropdown
                                    style={{ overflow: "hidden" }}
                                >
                                    <SimpleGrid cols={1}>
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
                                withArrow
                                offset={20}
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

                                <HoverCard.Dropdown
                                    style={{ overflow: "hidden" }}
                                >
                                    <SimpleGrid cols={1}>
                                        {linksLayanan}
                                    </SimpleGrid>
                                </HoverCard.Dropdown>
                            </HoverCard>

                            {isAdmin && (
                                <Tooltip
                                    transition="slide-up"
                                    label="Dashboard"
                                    offset={25}
                                    withArrow
                                    arrowOffset={10}
                                    arrowSize={5}
                                    transitionProps={{
                                        transition: "slide-down",
                                        duration: 300,
                                    }}
                                    events={{
                                        hover: true,
                                        touch: true,
                                    }}
                                >
                                    <UnstyledButton
                                        component="a"
                                        href="/dashboard"
                                        className={classes.link}
                                    >
                                        <ActionIcon variant="transparent">
                                            <IconLayoutDashboard size={18} />
                                        </ActionIcon>
                                    </UnstyledButton>
                                </Tooltip>
                            )}
                        </Group>

                        <Group visibleFrom="md">
                            <DarkButton />

                            <Divider orientation="vertical" />

                            <ActionIcon size="lg" variant="subtle">
                                <Tooltip
                                    transition="slide-up"
                                    label="Facebook"
                                    offset={35}
                                    withArrow
                                    arrowOffset={10}
                                    arrowSize={5}
                                    transitionProps={{
                                        transition: "slide-down",
                                        duration: 300,
                                    }}
                                    events={{
                                        hover: true,
                                        touch: true,
                                    }}
                                >
                                    <IconBrandFacebook size={16} stroke={1.5} />
                                </Tooltip>
                            </ActionIcon>
                            <ActionIcon size="lg" variant="subtle">
                                <Tooltip
                                    transition="slide-up"
                                    label="Instagram"
                                    offset={35}
                                    withArrow
                                    arrowOffset={10}
                                    arrowSize={5}
                                    transitionProps={{
                                        transition: "slide-down",
                                        duration: 300,
                                    }}
                                    events={{
                                        hover: true,
                                        touch: true,
                                    }}
                                >
                                    <IconBrandInstagram
                                        size={16}
                                        stroke={1.5}
                                    />
                                </Tooltip>
                            </ActionIcon>
                        </Group>

                        <Burger
                            opened={drawerOpened}
                            onClick={toggleDrawer}
                            hiddenFrom="sm"
                        />
                    </Group>
                </header>

                {/* MOBILE START */}

                <Drawer
                    opened={drawerOpened}
                    onClose={closeDrawer}
                    size="75%"
                    padding="md"
                    title={
                        <Text size="xs" fw={700}>
                            Biro Administrasi Pembangunan
                        </Text>
                    }
                    hiddenFrom="sm"
                    zIndex={1000000}
                >
                    <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
                        <Divider my="sm" />

                        <a href="/" className={classes.link}>
                            Beranda
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

                        <Collapse
                            in={linksOpened}
                            transitionDuration={300}
                            transitionTimingFunction="linear"
                        >
                            {linksProfil}
                        </Collapse>

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

                        <Collapse
                            in={linksOpenedTwo}
                            transitionDuration={300}
                            transitionTimingFunction="linear"
                        >
                            {linksInformasi}
                        </Collapse>

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

                        <Collapse
                            in={linksOpenedThree}
                            transitionDuration={300}
                            transitionTimingFunction="linear"
                        >
                            {linksLayanan}
                        </Collapse>

                        {isAdmin && (
                            <Tooltip
                                transition="slide-up"
                                label="Dashboard"
                                offset={25}
                                withArrow
                                arrowOffset={10}
                                arrowSize={5}
                                transitionProps={{
                                    transition: "slide-down",
                                    duration: 300,
                                }}
                                events={{
                                    hover: true,
                                    touch: true,
                                }}
                            >
                                <UnstyledButton
                                    component="a"
                                    href="/dashboard"
                                    className={classes.link}
                                >
                                    {/* <ActionIcon variant="transparent">
                                        <IconLayoutDashboard size={18} />
                                    </ActionIcon> */}
                                    <Text size="sm">Dashboard</Text>
                                </UnstyledButton>
                            </Tooltip>
                        )}

                        <Divider my="sm" />

                        <Group justify="center" pb="xl" px="md">
                            <DarkButton />

                            <Divider orientation="vertical" />

                            <ActionIcon size="lg" variant="subtle">
                                <Tooltip transition="slide-up" label="Facebook">
                                    <IconBrandFacebook size={16} stroke={1.5} />
                                </Tooltip>
                            </ActionIcon>
                            <ActionIcon size="lg" variant="subtle">
                                <Tooltip
                                    transition="slide-up"
                                    label="Instagram"
                                >
                                    <IconBrandInstagram
                                        size={16}
                                        stroke={1.5}
                                    />
                                </Tooltip>
                            </ActionIcon>
                        </Group>
                    </ScrollArea>
                </Drawer>

                {/* MOBILE END */}
            </Box>
        </Portal>
    );
};

export default Navbar;
