import {
    Anchor,
    BackgroundImage,
    Box,
    Button,
    Center,
    Container,
    Divider,
    Group,
    Image,
    Input,
    Overlay,
    Paper,
    Text,
    TextInput,
    Title,
} from "@mantine/core";

import Layanan from "../Homepage/Layanan";
import { Link } from "react-router-dom/cjs/react-router-dom";
import classes from "./LayananPublik.module.css";
import { randomId } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { useState } from "react";

const LayananPublik = () => {
    const [isLoading, setIsLoading] = useState(false);

    // Inisialisasi form dengan mantine hook
    const form = useForm({
        initialValues: {
            nama: "",
            kontak: "",
            jenis: "",
            pesan: "",
        },
        validate: {
            nama: (value) =>
                value.trim().length < 2 ? "Nama lengkap harus diisi" : null,
            jenis: (value) =>
                value === "" ? "Silakan pilih jenis masukan" : null,
            pesan: (value) =>
                value.trim().length < 10 ? "Pesan minimal 10 karakter" : null,
        },
    });

    // Fungsi yang dijalankan saat tombol submit diklik
    const handleSubmit = (values) => {
        setIsLoading(true);

        const templateParams = {
            nama: values.nama,
            kontak: values.kontak || "Tidak diisi", // fallback jika kontak kosong
            jenis: values.jenis,
            pesan: values.pesan,
        };

        // Kirim email menggunakan EmailJS
        emailjs
            .send(
                "YOUR_SERVICE_ID", // <-- GANTI DENGAN SERVICE ID ANDA
                "YOUR_TEMPLATE_ID", // <-- GANTI DENGAN TEMPLATE ID ANDA
                templateParams,
                "YOUR_PUBLIC_KEY" // <-- GANTI DENGAN PUBLIC KEY ANDA
            )
            .then(
                (response) => {
                    console.log("SUCCESS!", response.status, response.text);
                    notifications.show({
                        title: "Berhasil Terkirim",
                        message: "Terima kasih atas masukan Anda! 🙏",
                        color: "teal",
                        icon: <IconCheck size="1.1rem" />,
                    });
                    form.reset(); // Kosongkan form setelah berhasil
                },
                (error) => {
                    console.log("FAILED...", error);
                    notifications.show({
                        title: "Gagal Mengirim",
                        message: "Terjadi kesalahan. Silakan coba lagi nanti.",
                        color: "red",
                        icon: <IconX size="1.1rem" />,
                    });
                }
            )
            .finally(() => {
                setIsLoading(false);
            });
    };

    const BACKGROUND_IMAGE_URL =
        "https://res.cloudinary.com/degzbxlnx/image/upload/v1757909502/wisata_jambi_disbudpar_pemprov_jambi_r8o75i.jpg";

    return (
        <>
            <Layanan />

            {/* PERMOHONAN DAN KEBERATAN INFORMASI */}

            <BackgroundImage
                src={BACKGROUND_IMAGE_URL}
                className={classes.wrapper}
            >
                <Box className={classes.overlay}>
                    <Container size="sm">
                        <Center>
                            <Title
                                order={1}
                                className={classes.title}
                                c="white"
                                ta="center"
                            >
                                PERMOHONAN DAN KEBERATAN INFORMASI
                            </Title>
                        </Center>
                        <Center>
                            <Text c="white" ta="center">
                                &quot;Untuk mengajukan permohonan atau keberatan
                                informasi publik, silakan isi formulir melalui
                                link di bawah ini sesuai dengan data yang
                                diperlukan.&quot;
                            </Text>
                        </Center>
                        <Center>
                            <Paper
                                withBorder
                                shadow="xl"
                                radius="md"
                                p="xs"
                                my="md"
                            >
                                <Anchor
                                    component="a"
                                    type="button"
                                    href="https://forms.gle/vxhNfGsBDuzaA2QX8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    ta="center"
                                >
                                    <Text fw={700}>
                                        KLIK UNTUK MENUJU KE GOOGLE FORMS
                                    </Text>
                                </Anchor>
                            </Paper>
                            {/* </Text> */}
                        </Center>
                        <Center>
                            <Image
                                radius="md"
                                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1758600001/SS_Permohonan_Informasi_vvqeei.png"
                            />
                        </Center>
                    </Container>
                </Box>
            </BackgroundImage>

            {/* LAYANAN PENGADUAN */}

            <Container size="lg">
                <Divider
                    my="xl"
                    size="sm"
                    label={
                        <Title c="#E67E22" order={1}>
                            LAYANAN PENGADUAN
                        </Title>
                    }
                    labelPosition="left"
                    color="#E67E22"
                />

                <Image
                    radius="md"
                    src="https://res.cloudinary.com/degzbxlnx/image/upload/v1758599959/Layanan_pengaduan_vgl39q.png"
                />
            </Container>

            {/* KRITIK DAN SARAN */}

            <Container size="md" my="xl">
                <Center>
                    <Title order={2} ta="center">
                        KRITIK DAN SARAN
                    </Title>
                </Center>
                <Center my="lg">
                    <Text>
                        Sampaikan kritik, saran, atau masukan Anda untuk
                        meningkatkan kualitas layanan publik:
                    </Text>
                </Center>

                <TextInput
                    label="Name"
                    placeholder="Name"
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                />
                <TextInput
                    mt="md"
                    label="Email"
                    placeholder="Email"
                    key={form.key("email")}
                    {...form.getInputProps("email")}
                />

                <Group justify="center" mt="xl">
                    <Button
                        onClick={() =>
                            form.setValues({
                                name: randomId(),
                                email: `${randomId()}@test.com`,
                            })
                        }
                    >
                        Set random values
                    </Button>
                </Group>
            </Container>
        </>
    );
};

export default LayananPublik;
