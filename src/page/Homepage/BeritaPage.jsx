import {
    ActionIcon,
    Badge,
    Button,
    Card,
    Container,
    Divider,
    Group,
    Image,
    SimpleGrid,
    Space,
    Text,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import { IconHeart } from "@tabler/icons-react";
import classes from "./BeritaPage.module.css";
import { fetchAllPostAction } from "../../redux/slices/posts/postSlice";
import { useEffect } from "react";

const BeritaPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllPostAction(""));
    }, [dispatch]);

    const post = useSelector((state) => state?.post);
    const { postList } = post;
    console.log(postList);

    // const { result = [] } = postList;
    // console.log(result);

    const mockdata = {
        image: "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
        title: "Verudela Beach",
        country: "Croatia",
        description:
            "Completely renovated for the season 2020, Arena Verudela Bech Apartments are fully equipped and modernly furnished 4-star self-service apartments located on the Adriatic coastline by one of the most beautiful beaches in Pula.",
        badges: [
            { emoji: "☀️", label: "Sunny weather" },
            { emoji: "🦓", label: "Onsite zoo" },
            { emoji: "🌊", label: "Sea" },
            { emoji: "🌲", label: "Nature" },
            { emoji: "🤽", label: "Water sports" },
        ],
    };

    const { image, title, description, country, badges } = mockdata;

    const features = badges.map((badge) => (
        <Badge variant="light" key={badge.label} leftSection={badge.emoji}>
            {badge.label}
        </Badge>
    ));

    return (
        <>
            <Space h="xl" />

            <Container size="xl">
                <Divider
                    my="xl"
                    labelPosition="left"
                    label={
                        <Text c="blue" fs="italic" fz="h6" fw={700}>
                            BERITA & KEGIATAN
                        </Text>
                    }
                    color="blue"
                />
                <SimpleGrid
                    cols={{ base: 1, sm: 3 }}
                    spacing={{ base: 10, sm: "xl" }}
                    verticalSpacing={{ base: "xl", md: "md" }}
                >
                    <Card
                        withBorder
                        radius="md"
                        p="md"
                        shadow="lg"
                        className={classes.card}
                    >
                        <Card.Section>
                            <Image src={image} alt={title} height={180} />
                        </Card.Section>

                        <Card.Section className={classes.section} mt="md">
                            <Group justify="apart">
                                <Text fz="lg" fw={500}>
                                    {title}
                                </Text>
                                <Badge size="sm" variant="light">
                                    {country}
                                </Badge>
                            </Group>
                            <Text fz="sm" mt="xs">
                                {description}
                            </Text>
                        </Card.Section>

                        <Card.Section className={classes.section}>
                            <Text mt="md" className={classes.label} c="dimmed">
                                Perfect for you, if you enjoy
                            </Text>
                            <Group gap={7} mt={5}>
                                {features}
                            </Group>
                        </Card.Section>

                        <Group mt="xs">
                            <Button radius="md" style={{ flex: 1 }}>
                                Show details
                            </Button>
                            <ActionIcon variant="default" radius="md" size={36}>
                                <IconHeart
                                    className={classes.like}
                                    stroke={1.5}
                                />
                            </ActionIcon>
                        </Group>
                    </Card>
                </SimpleGrid>
            </Container>
        </>
    );
};

export default BeritaPage;