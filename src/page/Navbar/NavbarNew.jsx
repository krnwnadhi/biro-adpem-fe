import {
    ActionIcon,
    Box,
    Burger,
    Divider,
    Drawer,
    Group,
    Image,
    Portal,
    ScrollArea,
    Text,
    Tooltip,
    UnstyledButton,
    rem,
    useComputedColorScheme,
} from "@mantine/core";
import {
    IconArticleFilled,
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandYoutube,
    IconClipboardDataFilled,
    IconHomeFilled,
    IconLayoutDashboard,
    IconUserFilled,
} from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom";
import { useDisclosure, useHeadroom } from "@mantine/hooks";

import { DarkButton } from "../../components/DarkButton/DarkButton";
import classes from "./NavbarNew.module.css";
import { useSelector } from "react-redux";

const links = [
    { link: "/", label: "BERANDA", icon: IconHomeFilled },
    { link: "/profil", label: "PROFIL", icon: IconUserFilled },
    { link: "/berita", label: "PUBLIKASI", icon: IconArticleFilled },
    {
        link: "/layananpublik",
        label: "LAYANAN PUBLIK",
        icon: IconClipboardDataFilled,
    },
];

export function NavbarNew() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);

    const { pathname } = useLocation();

    const pinned = useHeadroom({ fixedAt: 120 });

    const computedColorScheme = useComputedColorScheme("dark", {
        getInitialValueInEffect: true,
    });

    //get user from store
    const state = useSelector((state) => state.users);

    const { userAuth } = state;

    const isAdmin = userAuth?.isAdmin;

    const items = links.map((item) => {
        // Ambil komponen Ikon dari item
        const Icon = item.icon;
        const isActive = pathname === item.link;

        return (
            <Link
                key={item.label}
                to={item.link}
                className={classes.link}
                data-active={isActive || undefined}
            >
                <Group gap="xs">
                    {isActive ? <Icon stroke={1.5} /> : item.label}
                </Group>
            </Link>
        );
    });

    return (
        <>
            <Portal>
                <Box
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: rem(80),
                        zIndex: 999,
                        transform: `translate3d(0, ${
                            pinned ? 0 : rem(-110)
                        }, 0)`,
                        transition: "transform 400ms ease",
                        backgroundColor: "var(--mantine-color-body)",
                    }}
                >
                    <header className={classes.header}>
                        <div className={classes.inner}>
                            <Group justify="center" gap="xs">
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
                                <Image
                                    className={classes.image}
                                    height={80}
                                    src={
                                        computedColorScheme === "dark"
                                            ? "https://res.cloudinary.com/degzbxlnx/image/upload/v1757907964/jm_4_rhrxaa.png"
                                            : "https://res.cloudinary.com/degzbxlnx/image/upload/v1757907964/jm_4_rhrxaa.png"
                                    }
                                    visibleFrom="sm"
                                />
                            </Group>

                            <Group gap={15} visibleFrom="sm">
                                <div className={classes.navbarContainer}>
                                    <Group gap={15} visibleFrom="xs">
                                        {items}

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
                                                        <IconLayoutDashboard
                                                            size={18}
                                                        />
                                                    </ActionIcon>
                                                </UnstyledButton>
                                            </Tooltip>
                                        )}
                                    </Group>
                                </div>
                            </Group>

                            <Group visibleFrom="md">
                                <DarkButton />

                                <Divider orientation="vertical" />
                                <ActionIcon
                                    size="lg"
                                    variant="subtle"
                                    component="a"
                                    href="https://www.instagram.com/biro.adpem?igsh=MTZtNmw1ODJ1ODBjbw%3D%3D"
                                    aria-label="Instagram Biro Adpem  Pemprov Jambi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
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

                                <ActionIcon
                                    size="lg"
                                    variant="subtle"
                                    component="a"
                                    href="https://www.facebook.com/profile.php?id=61579983357718&mibextid=wwXIfr&rdid=8kDJQN0K4YQ9Gg4Z&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16mfpBSFQU%2F%3Fmibextid%3DwwXIfr#"
                                    aria-label="Facebook Biro Adpem Pemprov Jambi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
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
                                        <IconBrandFacebook
                                            size={16}
                                            stroke={1.5}
                                        />
                                    </Tooltip>
                                </ActionIcon>

                                <ActionIcon
                                    size="lg"
                                    variant="subtle"
                                    component="a"
                                    href="https://www.youtube.com/@biroadministrasipembangunanset"
                                    aria-label="Youtube Biro Adpem  Pemprov Jambi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Tooltip
                                        transition="slide-up"
                                        label="Youtube"
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
                                        <IconBrandYoutube
                                            size={16}
                                            stroke={1.5}
                                        />
                                    </Tooltip>
                                </ActionIcon>
                            </Group>

                            {/* <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="sm"
                    size="sm"
                    /> */}

                            <Burger
                                opened={drawerOpened}
                                onClick={toggleDrawer}
                                hiddenFrom="sm"
                                size="sm"
                            />
                        </div>
                    </header>

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

                            <a href="/" className={classes.linkMobile}>
                                BERANDA
                            </a>
                            <a href="/profil" className={classes.linkMobile}>
                                PROFIL
                            </a>
                            <a href="/berita" className={classes.linkMobile}>
                                PUBLIKASI
                            </a>
                            <a
                                href="/layananpublik"
                                className={classes.linkMobile}
                            >
                                LAYANAN PUBLIK
                            </a>

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
                                        className={classes.linkMobile}
                                    >
                                        <Text size="sm">DASHBOARD</Text>
                                    </UnstyledButton>
                                </Tooltip>
                            )}

                            <Divider my="sm" />

                            <Group justify="center" pb="xl" px="md">
                                <DarkButton />

                                <Divider orientation="vertical" />

                                <ActionIcon
                                    size="lg"
                                    variant="subtle"
                                    component="a"
                                    href="https://www.instagram.com/biro.adpem?igsh=MTZtNmw1ODJ1ODBjbw%3D%3D"
                                    aria-label="Instagram Biro Adpem  Pemprov Jambi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
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

                                <ActionIcon
                                    size="lg"
                                    variant="subtle"
                                    component="a"
                                    href="https://www.facebook.com/profile.php?id=61579983357718&mibextid=wwXIfr&rdid=8kDJQN0K4YQ9Gg4Z&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16mfpBSFQU%2F%3Fmibextid%3DwwXIfr#"
                                    aria-label="Facebook Biro Adpem Pemprov Jambi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Tooltip
                                        transition="slide-up"
                                        label="Facebook"
                                    >
                                        <IconBrandFacebook
                                            size={16}
                                            stroke={1.5}
                                        />
                                    </Tooltip>
                                </ActionIcon>

                                <ActionIcon
                                    size="lg"
                                    variant="subtle"
                                    component="a"
                                    href="https://www.youtube.com/@biroadministrasipembangunanset"
                                    aria-label="Youtube Biro Adpem  Pemprov Jambi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Tooltip
                                        transition="slide-up"
                                        label="Youtube"
                                    >
                                        <IconBrandYoutube
                                            size={16}
                                            stroke={1.5}
                                        />
                                    </Tooltip>
                                </ActionIcon>
                            </Group>
                        </ScrollArea>
                    </Drawer>
                </Box>
            </Portal>
        </>
    );
}
