import { Button, Container, Group, Text, Title } from "@mantine/core";

import { Link } from "react-router-dom";
import classes from "./ErrorNetwork.module.css";

const ErrorNetwork = () => {
    return (
        <Container className={classes.root}>
            <Container className={classes.root}>
                <div className={classes.label}>500</div>
                <Title className={classes.title}>Oops! Kesalahan Sistem!</Title>
                <Text
                    c="dimmed"
                    size="lg"
                    ta="center"
                    className={classes.description}
                >
                    Sepertinya halaman yang dituju sedang tidak bisa diakses.
                    Harap kembali lagi nanti.
                </Text>
                <Group justify="center">
                    <Button
                        component={Link}
                        to="/"
                        variant="subtle"
                        size="md"
                        radius="md"
                        mt="lg"
                    >
                        Halaman Utama
                    </Button>
                </Group>
            </Container>
        </Container>
    );
};

export default ErrorNetwork;
