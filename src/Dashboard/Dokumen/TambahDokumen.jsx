/* eslint-disable react/prop-types */

import {
    AppShell,
    Burger,
    Button,
    Code,
    Container,
    Fieldset,
    FileInput,
    Group,
    Pill,
    ScrollArea,
    Stack,
    Text,
    TextInput,
    Title,
    rem,
} from "@mantine/core";
import { IconCheck, IconUpload, IconX } from "@tabler/icons-react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";

import { DarkButton } from "../../components/DarkButton/DarkButton";
import { NavbarDashboard } from "../NavbarDashboard";
import axios from "axios";
import { baseDocumentURL } from "../../utils/baseURL";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";

const TambahDokumenContent = () => {
    const history = useHistory();

    const icon = (
        <IconUpload style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
    );

    //get document data
    const document = useSelector((state) => state?.document);
    const { loading } = document;

    const ValueComponent = ({ value }) => {
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

        if (value === null) {
            return null;
        }

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

    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            files: null,
        },

        validate: {
            title: hasLength({ min: 5 }, "Terlalu pendek. Minimal 5 huruf."),
            description: hasLength(
                { min: 5 },
                "Terlalu pendek. Minimal 5 huruf."
            ),
            files: isNotEmpty("Silahkan upload dokumen"),
        },
    });

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("files", values.files);

        try {
            await axios.post(`${baseDocumentURL}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            const id = notifications.show({
                loading: true,
                title: "Loading...",
                message: "Mengunggah Dokumen",
                autoClose: false,
                withCloseButton: false,
            });

            setTimeout(() => {
                notifications.update({
                    id,
                    color: "teal",
                    title: "Berhasil",
                    message: "Dokumen berhasil diunggah",
                    icon: (
                        <IconCheck
                            style={{ width: rem(18), height: rem(18) }}
                        />
                    ),
                    loading: false,
                    autoClose: 2000,
                });
            }, 3000);

            setTimeout(() => {
                history.push("/dashboard/dokumen");
            }, 3000);
        } catch (error) {
            console.log(error.response.data.message);
            if (error.response.data) {
                const id = notifications.show({
                    loading: true,
                    title: "Loading...",
                    message: "Mengunggah Dokumen",
                    autoClose: false,
                    withCloseButton: false,
                });

                setTimeout(() => {
                    notifications.update({
                        id,
                        color: "red",
                        title: "Gagal",
                        message:
                            error.response.data.message === "File too large"
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
        }
    };

    return (
        <>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Fieldset disabled={loading}>
                    <Stack>
                        <TextInput
                            withAsterisk
                            label="Nama Dokumen"
                            aria-label="Nama Dokumen"
                            placeholder="Min. 5 Karakter"
                            {...form.getInputProps("title")}
                        />

                        <TextInput
                            withAsterisk
                            label="Deskripsi"
                            aria-label="Deskripsi"
                            placeholder="Min. 5 Karakter"
                            {...form.getInputProps("description")}
                        />

                        <FileInput
                            label="Files"
                            description="Input file berekstensi pdf/excel berukuran kurang dari 1MB!"
                            placeholder="Silahkan Pilih Files"
                            clearable
                            required
                            withAsterisk
                            accept=".pdf, .xls, .xlsx"
                            leftSection={icon}
                            valueComponent={ValueComponent}
                            {...form.getInputProps("files")}
                        />

                        <Group position="center" mt="xl">
                            <Button
                                disabled={!form.isValid()}
                                type="submit"
                                fullWidth
                            >
                                Tambah
                            </Button>
                        </Group>
                    </Stack>
                </Fieldset>
            </form>
        </>
    );
};

export const TambahDokumen = () => {
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
                            TAMBAH DOKUMEN
                        </Title>
                        {<TambahDokumenContent />}
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
