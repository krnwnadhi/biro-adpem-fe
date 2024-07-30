import "photoswipe/dist/photoswipe.css";

import { Alert, Card, Container, Image, SimpleGrid, Text } from "@mantine/core";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useDispatch, useSelector } from "react-redux";

import { IconX } from "@tabler/icons-react";
import { fetchAllGalleryAction } from "../../redux/slices/gallery/gallerySlice";
import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";

export const AllGallery = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllGalleryAction());
        window.scrollTo(0, 0);
    }, [dispatch]);

    const gallery = useSelector((state) => state?.gallery);
    const { galleryList = [], loading } = gallery;

    const { result } = galleryList;

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const options = {
        arrowPrev: true,
        arrowNext: true,
        zoom: true,
        close: true,
        counter: true,
        allowPanToNext: true,
        loop: true,
        wheelToZoom: true,
        padding: { top: 20, bottom: 40, left: 100, right: 100 },
    };

    const galleryContent =
        result?.length > 0 ? (
            result?.map((item) => {
                return (
                    <Item
                        key={item?.id}
                        id={item?.id}
                        original={item?.image}
                        thumbnail={item?.image}
                        width="1500"
                        height="1500"
                        caption={item?.title}
                    >
                        {({ ref, open }) => (
                            <Image
                                ref={ref}
                                onClick={open}
                                src={item?.image}
                                radius="md"
                                h={250}
                                w="auto"
                                fit="contain"
                                style={{ cursor: "pointer" }}
                            />
                        )}
                    </Item>
                );
            })
        ) : (
            <Card shadow="sm" padding="lg" radius="md" withBorder mt="lg">
                <Alert
                    variant="light"
                    color="red"
                    title="Tidak ada foto"
                    icon={<IconX />}
                >
                    <Text fs="italic" size="sm">
                        Belum ada foto/galeri yang diunggah.
                    </Text>
                </Alert>
            </Card>
        );

    return (
        <Container size="lg" mt={100}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 4 }}
                spacing={{ base: 10, sm: "xl" }}
                verticalSpacing={{ base: "md", sm: "xl" }}
            >
                <Gallery withCaption options={options}>
                    {galleryContent}
                </Gallery>
            </SimpleGrid>
        </Container>
    );
};
