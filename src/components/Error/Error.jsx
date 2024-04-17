import { Button, Container, Title } from "@mantine/core";

import { Link } from "react-router-dom";

const Error = () => {
    return (
        <Container size="xl">
            <Title order={3}>ERROR PAGE</Title>
            <Button component={Link} to="/" radius="xl">
                HOME
            </Button>
        </Container>
    );
};

export default Error;
