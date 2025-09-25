import {
    Anchor,
    BackgroundImage,
    Box,
    Button,
    Center,
    Container,
    Divider,
    Image,
    Paper,
    Select,
    Stack,
    Text,
    TextInput,
    Textarea,
    Title,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";

import Layanan from "../Homepage/Layanan";
import { Link } from "react-router-dom/cjs/react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import classes from "./LayananPublik.module.css";
import emailjs from "@emailjs/browser";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";

const LayananPublik = () => {
    const [isLoading, setIsLoading] = useState(false);
    const captchaRef = useRef(null); // Buat ref untuk ReCAPTCHA

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
        // 1. Dapatkan token dari reCAPTCHA
        const token = captchaRef.current.getValue();

        // 2. Validasi token
        if (!token) {
            notifications.show({
                title: "Verifikasi Gagal",
                message: 'Harap centang kotak "I\'m not a robot".',
                color: "red",
                icon: <IconX size="1.1rem" />,
            });
            return; // Hentikan proses jika captcha belum diverifikasi
        }

        setIsLoading(true);

        const templateParams = {
            nama: values.nama,
            kontak: values.kontak || "random-username", // fallback jika kontak kosong
            jenis: values.jenis,
            pesan: values.pesan,
            "g-recaptcha-response": token, // EmailJS otomatis mendeteksi field ini
        };

        // Kirim email menggunakan EmailJS
        emailjs
            .send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID, // <-- GANTI DENGAN SERVICE ID ANDA
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // <-- GANTI DENGAN TEMPLATE ID ANDA
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY // <-- GANTI DENGAN PUBLIC KEY ANDA
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
                    captchaRef.current.reset(); // 3. Reset CAPTCHA setelah berhasil
                },
                (error) => {
                    console.log("FAILED...", error);
                    notifications.show({
                        title: "Gagal Mengirim",
                        message:
                            "Terjadi kesalahan atau verifikasi captcha gagal.",
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
            {/* LAYANAN */}

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
                                        KLIK DI SINI UNTUK MENUJU KE GOOGLE
                                        FORMS
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

            <Container size="lg">
                <Box className={classes.box}>
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

                    <form onSubmit={form.onSubmit(handleSubmit)}>
                        <Stack mt="md">
                            <TextInput
                                withAsterisk
                                label="Nama Lengkap"
                                placeholder="Masukkan nama lengkap Anda"
                                {...form.getInputProps("nama")}
                            />
                            <TextInput
                                label="Email/No. HP (Opsional)"
                                placeholder="contoh@email.com atau 62812xxx"
                                {...form.getInputProps("kontak")}
                            />
                            <Select
                                withAsterisk
                                label="Jenis Masukan"
                                placeholder="Pilih salah satu"
                                data={[
                                    "Kritik",
                                    "Saran",
                                    "Apresiasi",
                                    "Lainnya",
                                ]}
                                {...form.getInputProps("jenis")}
                            />
                            <Textarea
                                withAsterisk
                                label="Pesan Anda"
                                placeholder="Tuliskan pesan, kritik, atau saran Anda di sini..."
                                minRows={4}
                                {...form.getInputProps("pesan")}
                            />

                            {/* Tambahkan komponen ReCAPTCHA di sini */}
                            <ReCAPTCHA
                                ref={captchaRef}
                                sitekey={
                                    import.meta.env.VITE_RECAPTCHA_SITE_KEY
                                } // <-- GANTI DENGAN SITE KEY ANDA
                            />

                            <Button
                                type="submit"
                                fullWidth
                                mt="md"
                                loading={isLoading}
                            >
                                Kirim Masukan
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Container>
        </>
    );
};

export default LayananPublik;
