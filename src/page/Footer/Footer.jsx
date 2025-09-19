import {
    Container,
    Divider,
    Image,
    Space,
    Text,
    useComputedColorScheme,
} from "@mantine/core";

import { MapEmbedded } from "./MapEmbedded";
import classes from "./Footer.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";

export function Footer() {
    const computedColorScheme = useComputedColorScheme("dark", {
        getInitialValueInEffect: true,
    });

    const withoutSidebarRoutes = ["404", "/signin", "/dashboard"];

    const { pathname } = useLocation();
    if (withoutSidebarRoutes.some((item) => pathname.includes(item)))
        return null;

    return (
        <footer className={classes.footer}>
            <MapEmbedded />

            <Container size="lg" className={classes.inner}>
                <div className={classes.logo}>
                    <Image
                        width={250}
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
                    <Space h="lg" />

                    <Text size="xs" c="dimmed" className={classes.description}>
                        ALAMAT
                    </Text>

                    <Divider />

                    <Text size="xs" c="dimmed" className={classes.description}>
                        Jl. Jend. Ahmad Yani No.1, Telanaipura, Kec.
                        Telanaipura, Kota Jambi, Jambi 36128
                    </Text>
                </div>
            </Container>
            <Container size="lg" className={classes.afterFooter}>
                <Text c="dimmed" size="sm">
                    Copyright © 2023 Biro Adminitrasi Pembangunan Setda Provinsi
                    Jambi
                </Text>
            </Container>
        </footer>
    );
}
