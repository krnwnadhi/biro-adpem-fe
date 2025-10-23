import {
    BackgroundImage,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Image,
    List,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Title,
    rem,
} from "@mantine/core";

import { BagianBiroAdpem } from "./BagianBiroAdpem";
import { Fade } from "react-awesome-reveal";
import { SubBagianBiroAdpem } from "./SubBagianBiroAdpem";
import classes from "./ProfilNew.module.css"; // Kita akan buat file CSS ini nanti
import { useMediaQuery } from "@mantine/hooks";

// Data untuk tombol dan target scroll
const menuItems = [
    { label: "Selayang Pandang", targetId: "selayang-pandang" },
    { label: "Kata Sambutan", targetId: "kata-sambutan" },
    { label: "Profil Biro ADPEM", targetId: "profil-adpem" },
    { label: "Visi dan Misi", targetId: "visi-misi" },
    { label: "Tugas dan Fungsi", targetId: "tugas-fungsi" },
    { label: "Struktur Organisasi", targetId: "struktur-organisasi" },
    { label: "Bagian Biro ADPEM", targetId: "bagian-biro" },
    { label: "Sub-Bagian Biro ADPEM", targetId: "sub-bagian-biro" },
];

// Data dinamis untuk setiap bagian konten
const sectionsData = [
    {
        id: "selayang-pandang",
        title: "Selayang Pandang",
        imageSrc:
            "https://res.cloudinary.com/degzbxlnx/image/upload/v1759205021/xbvwblhbwp1bj2eaesy4.jpg",
        imageAlt: "GUbernur dan Wakil Gubernur Provinsi Jambi",
        // 'imageFirst: false' berarti gambar akan ada di sebelah kanan pada layar besar
        imageFirstOnDesktop: false,
        content: (
            <>
                <Text size="sm">
                    Biro Administrasi Pembangunan Setda Provinsi Jambi memiliki
                    sejarah panjang yang berawal dari kebutuhan pemerintah
                    daerah dalam mengoordinasikan pelaksanaan pembangunan secara
                    lebih sistematis. Pada awalnya, fungsi pengendalian
                    pembangunan di Provinsi Jambi melekat pada bagian
                    perencanaan pembangunan yang berada di bawah koordinasi
                    Sekretariat Daerah.
                </Text>
                <Text mt="md" size="sm">
                    Seiring dengan meningkatnya kompleksitas pembangunan,
                    kebutuhan akan unit kerja khusus yang menangani pengendalian
                    administrasi pembangunan menjadi semakin mendesak. Oleh
                    karena itu, dibentuklah Biro Administrasi Pembangunan yang
                    secara struktural berada di bawah Sekretariat Daerah
                    Provinsi Jambi.
                </Text>
                <Text mt="md" size="sm">
                    Perkembangan regulasi mempertegas keberadaan biro ini,
                    terutama melalui Peraturan Gubernur Jambi Nomor 25 Tahun
                    2020 tentang Kedudukan Susunan Organisasi, Tugas, dan Fungsi
                    Sekretariat Daerah, yang kemudian diperkuat lagi dengan
                    Pergub Nomor 30 Tahun 2024. Sejak saat itu, peran Biro
                    Administrasi Pembangunan semakin sentral dalam mengawal
                    pelaksanaan pembangunan daerah.
                </Text>
                <Text mt="md" size="sm">
                    Biro ini menjadi garda terdepan dalam memastikan bahwa
                    setiap program pembangunan daerah terlaksana sesuai rencana,
                    terukur capaian kinerjanya, serta dapat
                    dipertanggungjawabkan melalui laporan pembangunan yang
                    transparan dan akuntabel.
                </Text>
            </>
        ),
    },
    {
        id: "kata-sambutan",
        title: "Kata Sambutan",
        imageSrc:
            "https://res.cloudinary.com/degzbxlnx/image/upload/v1760933478/qafsnokzrojnodihn5w9_d5hgdk.webp",
        imageAlt: "Kepala Biro Administrasi Pembangunan",
        // 'imageFirst: true' berarti gambar akan ada di sebelah kiri pada layar besar
        imageFirstOnDesktop: true,
        content: (
            <>
                <Text>
                    <b>
                        Kepala Biro Administrasi Pembangunan Sekretariat Daerah
                        Provinsi Jambi
                    </b>
                </Text>
                <Text mt="sm" size="sm">
                    Assalamu'alaikum warahmatullahi wabarakatuh. Salam sejahtera
                    bagi kita semua. Puji syukur kita panjatkan ke hadirat Allah
                    SWT, Tuhan Yang Maha Esa, atas segala rahmat dan
                    karunia-Nya, sehingga kita dapat terus diberikan kesehatan,
                    kekuatan, dan semangat dalam melaksanakan tugas pengabdian
                    kepada bangsa dan daerah tercinta, Provinsi Jambi.
                </Text>
                <Text mt="md" size="sm">
                    Biro Administrasi Pembangunan Sekretariat Daerah Provinsi
                    Jambi memiliki tugas penting dalam mendukung kelancaran
                    penyelenggaraan pembangunan daerah sebagai tugas utama biro
                    ini adalah membantu Gubernur dalam melaksanakan koordinasi,
                    pengendalian, serta evaluasi terhadap pelaksanaan program
                    pembangunan agar berjalan tepat sasaran, efektif, dan sesuai
                    dengan arah kebijakan pemerintah daerah.
                </Text>
                <Text mt="md" size="sm">
                    Melalui website resmi ini, kami berupaya menyediakan sarana
                    informasi yang transparan, akuntabel, dan mudah diakses oleh
                    masyarakat maupun pemangku kepentingan. Kehadiran website
                    ini diharapkan dapat menjadi media komunikasi dan publikasi
                    berbagai kegiatan serta capaian pembangunan yang
                    dikoordinasikan oleh Biro Administrasi Pembangunan.Sejalan
                    dengan visi “Jambi Mantap 2030”, kami terus berkomitmen
                    untuk memperkuat tata kelola pemerintahan yang baik dan
                    pembangunan daerah yang berkesinambungan.
                </Text>
                <Text mt="md" size="sm">
                    Semoga melalui kerja sama dan dukungan dari seluruh elemen,
                    pembangunan di Provinsi Jambi dapat memberikan manfaat nyata
                    bagi peningkatan kesejahteraan masyarakat.Akhir kata, kami
                    mengucapkan terima kasih atas dukungan semua pihak yang
                    telah bersinergi dengan Biro Administrasi Pembangunan. Mari
                    bersama-sama kita wujudkan Jambi yang semakin maju, adil,
                    dan sejahtera. Wassalamu’alaikum warahmatullahi wabarakatuh.
                </Text>
            </>
        ),
    },
    // Anda bisa menambahkan data untuk bagian lain di sini
    {
        id: "profil-adpem",
        title: "Profil Biro ADPEM",
        imageSrc:
            "https://res.cloudinary.com/degzbxlnx/image/upload/v1760933476/ai4cbqup3rh1ukcm0gsu_xxk5dn.webp",
        imageAlt: "Profil Biro Administrasi Pembangunan",
        // 'imageFirst: false' berarti gambar akan ada di sebelah kanan pada layar besar
        imageFirstOnDesktop: false,
        content: (
            <>
                <Text mt="sm" size="sm">
                    Biro Administrasi Pembangunan Sekretariat Daerah Provinsi
                    Jambi merupakan salah satu unsur pendukung pada Sekretariat
                    Daerah yang berada di bawah koordinasi Asisten Perekonomian
                    dan Pembangunan, yang memiliki peran strategis dalam
                    mengawal jalannya pembangunan daerah agar terlaksana secara
                    efektif, efisien, tertib administrasi, serta sesuai dengan
                    arah kebijakan pembangunan daerah yang telah ditetapkan.
                </Text>
                <Text mt="sm" size="sm">
                    Biro ini dibentuk dan disusun berdasarkan ketentuan
                    Peraturan Gubernur Jambi Nomor 30 Tahun 2024 tentang Susunan
                    Organisasi dan Tata Kerja Perangkat Daerah, dengan tugas
                    pokok membantu Asisten Perekonomian dan Pembangunan dalam
                    penyiapan, pengoordinasian, perumusan kebijakan daerah,
                    pengoordinasian pelaksanaan tugas perangkat daerah, serta
                    melaksanakan pemantauan dan evaluasi pelaksanaan kebijakan
                    daerah khususnya di bidang pengendalian administrasi
                    pelaksanaan pembangunan daerah, pengendalian administrasi
                    pelaksanaan pembangunan wilayah, serta pelaporan pelaksanaan
                    pembangunan sesuai dengan ketentuan peraturan
                    perundang-undangan yang berlaku.
                </Text>
                <Text mt="sm" size="sm">
                    Dalam menjalankan tugas tersebut, Biro Administrasi
                    Pembangunan juga berfungsi sebagai motor penggerak
                    administrasi pembangunan, yang meliputi penyiapan dan
                    pengoordinasian perumusan kebijakan di bidang pengendalian
                    administrasi pembangunan, penyiapan pengoordinasian
                    pelaksanaan tugas perangkat daerah, penyusunan laporan serta
                    evaluasi pembangunan, hingga pelaksanaan fungsi-fungsi lain
                    yang diberikan oleh Asisten Perekonomian dan Pembangunan.
                    Dengan fungsi tersebut, keberadaan Biro Administrasi
                    Pembangunan tidak hanya berperan sebagai fasilitator
                    koordinasi pembangunan antarperangkat daerah, melainkan juga
                    sebagai pusat pengendalian dan pelaporan pembangunan daerah
                    yang menyajikan data, informasi, serta analisis yang akurat
                    sebagai dasar pengambilan keputusan strategis oleh
                    Pemerintah Provinsi Jambi.
                </Text>
            </>
        ),
    },
    {
        id: "visi-misi",
        title: "Visi dan Misi",
        imageFirstOnDesktop: true,
        content: (
            <Image
                my="xl"
                radius="md"
                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1760935405/visi_misi_3_x_6_runqkc.webp"
            />
        ),
    },
    {
        id: "tugas-fungsi",
        title: "Tugas dan Fungsi",
        content: (
            <>
                <Text mt="sm" size="sm">
                    Tugas Pokok dan Fungsi Biro Administrasi Pembangunan
                    Berdasarkan Pergub Jambi No 30 / 2024 tentang Susunan
                    Organisasi dan Tata Kerja Perangkat Daerah
                </Text>
                <Title order={3} fw={500} my="sm">
                    Tugas:
                </Title>
                <Text mt="sm" size="sm">
                    Membantu Asisten Perekonomian dan Pembangunan dalam
                    penyiapan, pengoordinasian, perumusan kebijakan daerah,
                    pengoordinasian pelaksanaan tugas perangkat daerah,
                    pemantauan dan evaluasi pelaksanaan kebijakan daerah
                    dibidang pengendalian administrasi pelaksanaan pembangunan
                    daerah, pengendalian administrasi pelaksanaan pembangunan
                    wilayah dan pelaporan pelaksanaan pembangunan sesuai dengan
                    ketentuan peraturan perundang-undangan.
                </Text>
                <Title order={3} fw={500} my="sm">
                    Fungsi:
                </Title>

                <SimpleGrid
                    cols={{ base: 1, sm: 2 }} // 1 kolom di mobile, 2 kolom di desktop
                    spacing={{ base: "sm", sm: "xl" }}
                    verticalSpacing={{ base: "sm", sm: "xl" }}
                >
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">
                                Penyiapan pengoordinasian perumusan kebijakan
                                daerah di bidang penendalian administrasi
                                pelaksanaan pembangunan daerah, pengendalian
                                administrasi pelaksanaan pembangunan wilayah,
                                pelaporan pelaksanaan pembangunan
                            </Text>
                        </List.Item>
                        <List.Item>
                            <Text mt="sm" size="sm">
                                Penyiapan pengoordinasian pelaksanaan tugas
                                perangkat daerah dibidang pengendalian
                                administrasi pelaksanaan pembangunan daerah,
                                pengendalian administrasi pelaksanaan
                                pembangunan wilayah, pelaporan pelaksanaan
                                pembangunan
                            </Text>
                        </List.Item>
                    </List>
                    <List withPadding>
                        <List.Item>
                            <Text size="sm">
                                Penyiapan pengoordinasian perumusan kebijakan
                                daerah di bidang penendalian administrasi
                                pelaksanaan pembangunan daerah, pengendalian
                                administrasi pelaksanaan pembangunan wilayah,
                                pelaporan pelaksanaan pembangunan
                            </Text>
                        </List.Item>
                        <List.Item>
                            <Text mt="sm" size="sm">
                                Pelaksanaan fungsi lain yang diberikan oleh
                                asisten perekonomian dan pembangunan yang
                                berkaitan dengan tugasnya
                            </Text>
                        </List.Item>
                    </List>
                </SimpleGrid>
            </>
        ),
    },
    {
        id: "struktur-organisasi",
        title: "Struktur Organisasi",
        imageFirstOnDesktop: true,
        content: (
            <>
                <Image src="https://res.cloudinary.com/degzbxlnx/image/upload/v1760933892/cnforp0vvsjqqvjmwqfu_s5hq2q.webp" />
                <Image src="https://res.cloudinary.com/degzbxlnx/image/upload/v1760933894/ioaju2wkdkotzm7bdv6i_txwhnn.webp" />
                <Image src="https://res.cloudinary.com/degzbxlnx/image/upload/v1760933893/qgx21jla6fswq8restyk_qhu8f1.webp" />
                <Image src="https://res.cloudinary.com/degzbxlnx/image/upload/v1760933892/uzc1fkeis74e5fd9jq6e_mtq1ww.webp" />
            </>
        ),
    },
    {
        id: "bagian-biro",
        title: "Bagian Biro ADPEM",
        content: (
            <>
                <BagianBiroAdpem />
            </>
        ),
    },
    {
        id: "sub-bagian-biro",
        title: "Sub-Bagian Biro ADPEM",
        imageFirstOnDesktop: true,
        content: (
            <>
                <SubBagianBiroAdpem />
            </>
        ),
    },
];

export function ProfilNew() {
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Fungsi untuk menangani smooth scroll
    const handleScroll = (targetId) => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };

    const buttons = menuItems.map((item) => (
        <Grid.Col key={item.label} span={{ base: 6, sm: 3 }}>
            <Button
                onClick={() => handleScroll(item.targetId)}
                variant="filled"
                color="#E67E22" // Warna oranye yang mirip dengan gambar
                fullWidth
                radius="md"
                size={isMobile ? "xs" : "md"}
                className={classes.button}
            >
                {item.label}
            </Button>
        </Grid.Col>
    ));

    return (
        <>
            {/* Bagian Hero dengan Background Image */}
            <BackgroundImage
                src="https://res.cloudinary.com/degzbxlnx/image/upload/v1760935101/islamic_center_t1uizk.webp"
                radius="xs"
                className={classes.heroWrapper}
            >
                {/* Overlay gelap untuk membuat teks lebih mudah dibaca */}
                <Box className={classes.overlay} />

                <Container size="lg" className={classes.inner}>
                    <Stack align="center" gap="xs">
                        <Title className={classes.title}>
                            BIRO ADMINISTRASI PEMBANGUNAN
                        </Title>
                        <Text className={classes.subtitle}>
                            Sekretariat Daerah Provinsi Jambi
                        </Text>
                    </Stack>

                    <Grid mt={rem(40)}>{buttons}</Grid>
                </Container>
            </BackgroundImage>

            {sectionsData.map((section) => (
                <Paper key={section.id} id={section.id} p="xl">
                    <Fade triggerOnce>
                        <Container>
                            <Container size="md">
                                <Divider
                                    my="xl"
                                    size="sm"
                                    label={
                                        <Title
                                            c="#E67E22"
                                            order={isMobile ? 3 : 1}
                                        >
                                            {section.title}
                                        </Title>
                                    }
                                    labelPosition={
                                        section.imageFirstOnDesktop
                                            ? "right"
                                            : "left"
                                    }
                                    color="#E67E22"
                                />
                            </Container>

                            <Grid gutter="xl">
                                {/* Kolom Gambar (jika ada) */}
                                {section.imageSrc && (
                                    <Grid.Col
                                        span={{ base: 12, md: 4 }}
                                        order={{
                                            base: 1,
                                            md: section.imageFirstOnDesktop
                                                ? 1
                                                : 2,
                                        }}
                                    >
                                        <Image
                                            radius="md"
                                            src={section.imageSrc}
                                            alt={section.imageAlt}
                                        />
                                        {section.imageCaption}
                                    </Grid.Col>
                                )}

                                {/* Kolom Teks Konten */}
                                <Grid.Col
                                    span={{
                                        base: 12,
                                        md: section.imageSrc ? 8 : 12,
                                    }}
                                    order={{
                                        base: 2,
                                        md: section.imageFirstOnDesktop ? 2 : 1,
                                    }}
                                >
                                    <Box style={{ textAlign: "justify" }}>
                                        {section.content}
                                    </Box>
                                </Grid.Col>
                            </Grid>
                        </Container>
                    </Fade>
                </Paper>
            ))}
        </>
    );
}

export default ProfilNew;
