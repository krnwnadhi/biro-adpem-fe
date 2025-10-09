import {
    Alert,
    AspectRatio,
    Card,
    Container,
    Divider,
    Loader,
    SimpleGrid,
    Text,
    Title,
} from "@mantine/core";
import { useEffect, useState } from "react";

import axios from "axios";
import { baseVideoURL } from "../../utils/baseURL";
import { useMediaQuery } from "@mantine/hooks";

const VideoKegiatan = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const isMobile = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                setLoading(true);
                // Panggilan API ke backend tetap sama
                const response = await axios.get(baseVideoURL);
                setVideos(response.data);
                setError(null);
            } catch (err) {
                console.error("Gagal mengambil data video:", err);
                setError(
                    "Tidak dapat memuat video. Pastikan server backend sudah berjalan."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    return (
        <>
            <Container size="lg" my="xl">
                <Divider
                    my="xl"
                    size="sm"
                    label={
                        <Title c="#E67E22" order={isMobile ? 3 : 2}>
                            Video Informasi dan Kegiatan
                        </Title>
                    }
                    labelPosition="center"
                    color="#E67E22"
                />

                {loading && (
                    <Loader
                        color="blue"
                        type="dots"
                        style={{ margin: "auto", display: "block" }}
                    />
                )}

                {error && (
                    <Alert color="red" title="Error">
                        {error}
                    </Alert>
                )}

                {!loading && !error && (
                    <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                        {videos.map((video) => (
                            <Card
                                key={video.id}
                                shadow="sm"
                                padding="md"
                                radius="md"
                                withBorder
                            >
                                <Card.Section>
                                    <AspectRatio ratio={16 / 9}>
                                        <iframe
                                            src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                            title={video.title}
                                            style={{ border: 0 }}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </AspectRatio>
                                </Card.Section>
                                <Text fw={500} mt="md" lineClamp={2}>
                                    {video.title}
                                </Text>
                            </Card>
                        ))}
                    </SimpleGrid>
                )}
            </Container>
        </>
    );
};

export default VideoKegiatan;
