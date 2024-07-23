import {
    Avatar,
    Button,
    Center,
    Container,
    Group,
    Loader,
    Paper,
    RingProgress,
    SimpleGrid,
    Stack,
    Text,
    rem,
} from "@mantine/core";
import { IconBook, IconFileInfo, IconPhotoCheck } from "@tabler/icons-react";
import {
    fetchAllPostAction,
    fetchPaginationPostAction,
} from "../redux/slices/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllDocumentAction } from "../redux/slices/document/documentSlice";
import { fetchAllGalleryAction } from "../redux/slices/gallery/gallerySlice";
import { logoutUserAction } from "../redux/slices/users/usersSlices";
import { modals } from "@mantine/modals";
import { nprogress } from "@mantine/nprogress";
import { useEffect } from "react";

export const IndexDashboard = () => {
    const dispatch = useDispatch();

    const openDeleteModal = () =>
        modals.openConfirmModal({
            title: "Logout",
            centered: true,
            children: <Text size="sm">Kamu yakin ingin logout?</Text>,
            labels: { confirm: "Log Out", cancel: "Batal" },
            confirmProps: { color: "red" },
            onCancel: () => console.log("Cancel"),
            onConfirm: () => dispatch(logoutUserAction()),
        });

    useEffect(() => {
        dispatch(fetchAllPostAction());
        dispatch(fetchPaginationPostAction());
        dispatch(fetchAllDocumentAction());
        dispatch(fetchAllGalleryAction());
    }, [dispatch]);

    const user = useSelector((state) => state?.users?.userAuth);

    const post = useSelector((state) => state?.post);
    const { loading, postList, postPagination } = post;
    // console.log(postPagination);

    const document = useSelector((state) => state?.document);
    const { documentList } = document;

    const gallery = useSelector((state) => state?.gallery);
    const { galleryList } = gallery;

    useEffect(() => {
        loading ? nprogress.start() : nprogress.complete();

        return () => {
            nprogress.reset();
        };
    }, [loading]);

    const icons = {
        post: IconBook,
        document: IconFileInfo,
        gallery: IconPhotoCheck,
    };

    const data = [
        {
            label: "Berita",
            stats: postPagination?.result?.length,
            progress: postPagination?.result?.length,
            color: "teal",
            icon: "post",
        },
        {
            label: "Dokumen",
            stats: documentList?.result?.length,
            progress: documentList?.result?.length,
            color: "blue",
            icon: "document",
        },
        {
            label: "Galeri",
            stats: galleryList?.result?.length,
            progress: galleryList?.result?.length,
            color: "red",
            icon: "gallery",
        },
    ];

    const UserInfo = () => {
        return (
            <Paper
                radius="md"
                shadow="md"
                withBorder
                p="lg"
                bg="var(--mantine-color-body)"
            >
                <Avatar
                    size={80}
                    radius={120}
                    mx="auto"
                    key={user?.fullName}
                    name={user?.fullName}
                    color="initials"
                />

                <Text ta="center" fz="md" fw={700} mt="md">
                    {user?.fullName}
                </Text>
                <Text ta="center" c="dimmed" fz="xs">
                    {user?.email}
                </Text>

                <Button
                    variant="subtle"
                    color="red"
                    fullWidth
                    mt="md"
                    onClick={openDeleteModal}
                >
                    LOG OUT
                </Button>
            </Paper>
        );
    };

    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        return (
            <Paper withBorder shadow="md" radius="md" p="xs" key={stat.label}>
                <Group>
                    <RingProgress
                        size={80}
                        roundCaps
                        thickness={8}
                        sections={[{ value: stat.progress, color: stat.color }]}
                        label={
                            <Center>
                                <Icon
                                    style={{
                                        width: rem(20),
                                        height: rem(20),
                                    }}
                                    stroke={1.5}
                                />
                            </Center>
                        }
                    />

                    <div>
                        <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                            {stat.label}
                        </Text>
                        <Text fw={700} size="xl">
                            {loading ? (
                                <Loader mt="xs" size={18} />
                            ) : (
                                stat?.stats
                            )}
                        </Text>
                    </div>
                </Group>
            </Paper>
        );
    });

    return (
        <Container size="xl">
            <Stack gap="xl">
                <UserInfo />
                <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
            </Stack>
        </Container>
    );
};
