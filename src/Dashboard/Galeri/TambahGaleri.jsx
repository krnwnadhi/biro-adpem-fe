/* eslint-disable react/prop-types */

import {
    AppShell,
    Box,
    Burger,
    Button,
    Code,
    Container,
    Fieldset,
    FileInput,
    Group,
    Image,
    Pill,
    ScrollArea,
    Stack,
    Text,
    TextInput,
    Title,
    rem,
} from "@mantine/core";
import { IconUpload, IconX } from "@tabler/icons-react";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { DarkButton } from "../../components/DarkButton/DarkButton";
import { NavbarDashboard } from "../NavbarDashboard";
import { createGalleryAction } from "../../redux/slices/gallery/gallerySlice";
import { notifications } from "@mantine/notifications";
import { nprogress } from "@mantine/nprogress";
import { useDisclosure } from "@mantine/hooks";

const TambahGaleriContent = () => {
    const dispatch = useDispatch();

    const [preview, setPreview] = useState(null);

    const icon = (
        <IconUpload style={{ width: rem(14), height: rem(14) }} stroke={1.5} />
    );

    const gallery = useSelector((state) => state.gallery);

    const { appError, loading, serverError, isCreated } = gallery;

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const form = useForm({
        initialValues: {
            title: "",
            image: null,
        },

        validate: {
            title: hasLength({ min: 5 }, "Terlalu pendek. Min. 5 huruf"),
            image: isNotEmpty("Tidak boleh kosong"),
        },
    });

    useEffect(() => {
        if (form.values.image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(form.values.image);
        } else {
            setPreview(null);
        }
    }, [form.values.image]);

    const ValueComponent = ({ value }) => {
        if (value === null) {
            return null;
        }

        const formatBytes = (bytes, decimals = 2) => {
            if (!+bytes) return "0 Bytes";

            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = [
                "Bytes",
                "KB",
                "MB",
                "GB",
                "TB",
                "PB",
                "EB",
                "ZB",
                "YB",
            ];

            const i = Math.floor(Math.log(bytes) / Math.log(k));

            return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${
                sizes[i]
            }`;
        };

        if (Array.isArray(value)) {
            return (
                <Pill.Group>
                    {value.map((file, index) => (
                        <Pill key={index}>{file.name}</Pill>
                    ))}
                </Pill.Group>
            );
        }

        return (
            <Pill>
                {value.name} - {formatBytes(value.size)}
            </Pill>
        );
    };

    const formOnSubmit = form.onSubmit((values) => {
        try {
            dispatch(createGalleryAction(values));
            if (appError || serverError) {
                const id = notifications.show({
                    loading: true,
                    title: "Loading...",
                    message: "Mengunggah Foto",
                    autoClose: false,
                    withCloseButton: false,
                });

                setTimeout(() => {
                    notifications.update({
                        id,
                        color: "red",
                        title: serverError,
                        message:
                            appError === "File too large"
                                ? "File terlalu besar! Harap unggah file dibawah 1MB (Halaman akan reload secara otomatis)"
                                : null,
                        icon: (
                            <IconX
                                style={{ width: rem(18), height: rem(18) }}
                            />
                        ),
                        loading: false,
                        autoClose: 3000,
                    });
                }, 3000);

                setTimeout(() => {
                    window.location.reload();
                }, 7000);
            }
        } catch (error) {
            console.log(error);
        }
    });

    if (isCreated) return <Redirect to="/dashboard/galeri" />;

    return (
        <>
            <form onSubmit={formOnSubmit}>
                <Fieldset disabled={loading}>
                    <Stack mih={350} m="xl">
                        <TextInput
                            mb={20}
                            withAsterisk
                            label="Judul Gambar"
                            aria-label="My input"
                            placeholder="Min. 5 Huruf"
                            {...form.getInputProps("title")}
                        />

                        <FileInput
                            label="Gambar"
                            description="Input gambar berekstensi jpg, jpeg, atau png & berukuran < 1Mb."
                            placeholder="Silahkan Pilih 1 Gambar"
                            clearable
                            required
                            withAsterisk
                            accept="image/png, image/jpeg, image/jpg"
                            leftSection={icon}
                            valueComponent={ValueComponent}
                            value={form.values.image}
                            onChange={(file) =>
                                form.setFieldValue("image", file)
                            }
                            {...form.getInputProps("image")}
                        />

                        {preview && (
                            <Box my="lg">
                                <Image
                                    src={preview}
                                    alt="Image Preview"
                                    radius="md"
                                    h={200}
                                    w="auto"
                                    fit="contain"
                                />
                            </Box>
                        )}

                        <Button
                            disabled={!form.isValid() || loading}
                            type="submit"
                            fullWidth
                            mt="xl"
                        >
                            Tambah
                        </Button>
                    </Stack>
                </Fieldset>
            </form>
        </>
    );
};

export const TambahGaleri = () => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

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
                            TAMBAH GALERI
                        </Title>
                        {<TambahGaleriContent />}
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
