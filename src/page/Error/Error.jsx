import { Button, Container, Group, Text, Title } from "@mantine/core";

import { Link } from "react-router-dom";
import classes from "./Error.module.css";

const Error = () => {
    return (
        <Container className={classes.root}>
            <Container className={classes.root}>
                <div className={classes.label}>404</div>
                <Title className={classes.title}>
                    Oops! Halaman tidak ditemukan.
                </Title>
                <Text
                    c="dimmed"
                    size="lg"
                    ta="center"
                    className={classes.description}
                >
                    Maaf, halaman yang anda cari tidak ditemukan. Mungkin anda
                    salah mengetik URL? Pastikan untuk memeriksa ejaan Anda.
                </Text>
                <Group justify="center">
                    <Button
                        component={Link}
                        to="/"
                        variant="subtle"
                        size="md"
                        radius="md"
                    >
                        Halaman Utama
                    </Button>
                </Group>
            </Container>
        </Container>
    );
};

export default Error;
