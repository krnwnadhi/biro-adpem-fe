import {
    Alert,
    AppShell,
    Box,
    Burger,
    Button,
    Code,
    Container,
    FileInput,
    Group,
    ScrollArea,
    Select,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom";
import { hasLength, isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { DarkButton } from "../../components/DarkButton/DarkButton";
import { IconAlertCircle } from "@tabler/icons-react";
import { NavbarDashboard } from "../NavbarDashboard";
import { createPostAction } from "../../redux/slices/posts/postSlice";
import { fetchAllCategoryAction } from "../../redux/slices/category/categorySlice";
import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

const ContentTambahBerita = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllCategoryAction());
    }, [dispatch]);

    //get category data from store
    const category = useSelector((state) => state?.category);

    const { categoryList = [], loading, appError, serverError } = category;
    console.log(categoryList);

    const allCategories = categoryList?.map((category) => {
        return {
            label: category?.title,
            value: category?.title,
        };
    });

    console.log(allCategories);

    //get post data
    const post = useSelector((state) => state?.post);
    const { appError: appErrorPost, loading: loadingPost, isCreated } = post;

    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            category: "",
            image: "",
        },

        validate: {
            title: hasLength({ min: 3 }, "Terlalu pendek. Min. 3 huruf"),
            description: isNotEmpty("Deskripsi tidak boleh kosong"),
            category: isNotEmpty("Kategori tidak boleh kosong"),
            image: isNotEmpty("Tidak boleh kosong"),
        },
    });

    const formOnSubmit = form.onSubmit((values) =>
        // dispatch(createPostAction(values))
        console.log(values)
    );

    // Redirect
    if (isCreated) return <Redirect to="/dashboard" />;

    return (
        <>
            <form onSubmit={formOnSubmit}>
                <Stack>
                    {appError || serverError ? (
                        <Alert
                            icon={<IconAlertCircle size={16} />}
                            title="Error!"
                            color="red"
                        >
                            Tidak ada Token! Silahkan login kembali.
                        </Alert>
                    ) : null}

                    <TextInput
                        withAsterisk
                        label="Judul"
                        aria-label="My input"
                        placeholder="Min. 3 Huruf"
                        {...form.getInputProps("title")}
                    />

                    <Text mt={10} mb={-20} size={14}>
                        Deskripsi
                    </Text>
                    {/* <Box mt={20}>
                    <EditorToolbar toolbarId={"t2"} />
                    <ReactQuill
                        theme="snow"
                        // value={userInfo.information}
                        // onChange={oninformation}
                        placeholder={"Tulis sesuatu..."}
                        modules={modules("t2")}
                        formats={formats}
                        {...form.getInputProps("description")}
                    />
                </Box> */}

                    <Select
                        mt={10}
                        // required
                        withAsterisk
                        label="Kategori"
                        placeholder="Pilih Kategori"
                        searchable
                        nothingFound="Kategori tidak ditemukan"
                        clearable
                        transition="pop-top-left"
                        transitionDuration={80}
                        transitionTimingFunction="ease"
                        allowDeselect
                        data={allCategories}
                        maxDropdownHeight={120}
                        {...form.getInputProps("category")}
                    />
                    {/* )} */}

                    <FileInput
                        label="Gambar Carousel"
                        description="Input gambar berekstensi jpg, jpeg, atau png & berukuran < 1Mb."
                        placeholder="Silahkan Pilih Gambar Untuk Carousel"
                        clearable
                        required
                        withAsterisk
                        accept="image/png, image/jpeg, image/jpg"
                        // value={value}
                        // onChange={handleFileChange}
                        {...form.getInputProps("image")}
                    />

                    <Text size="sm" color="red" ta="center">
                        {appErrorPost
                            ? "File terlalu besar. Upload size kurang dari 1mb."
                            : null}
                    </Text>

                    {/* <Space h="xl" /> */}

                    <Group position="apart" mt="xl">
                        {loadingPost ? (
                            <Button disabled loading fullWidth>
                                Loading...
                            </Button>
                        ) : (
                            <Button
                                disabled={!form.isValid()}
                                type="submit"
                                // compact
                                fullWidth
                            >
                                Tambah
                            </Button>
                        )}
                    </Group>
                </Stack>
            </form>
        </>
    );
};

export const TambahBerita = () => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    return (
        <AppShell
            header={{ height: 60 }}
            footer={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group>
                        <Burger
                            opened={mobileOpened}
                            onClick={toggleMobile}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Burger
                            opened={desktopOpened}
                            onClick={toggleDesktop}
                            visibleFrom="sm"
                            size="sm"
                        />
                        <Text size="sm">Dashboard</Text>
                        <Code fw={700}>v1.0.0</Code>
                    </Group>
                    <Group>
                        <DarkButton />
                        {/* <DarkButton /> */}
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar>
                {/* Navbar */}
                <AppShell.Section grow component={ScrollArea}>
                    <NavbarDashboard />
                </AppShell.Section>
            </AppShell.Navbar>
            <AppShell.Main>
                <Container size="lg">
                    <Stack>
                        <Title order={4} ta="center">
                            TAMBAH BERITA
                        </Title>
                        {<ContentTambahBerita />}
                    </Stack>
                </Container>
            </AppShell.Main>
            <AppShell.Footer p="sm">
                <Text size="sm" ta="center">
                    Copyright © 2023{" "}
                    <Text
                        size="sm"
                        fw={700}
                        component={Link}
                        to="/"
                        weight="bold"
                        c="blue"
                    >
                        Biro Adminitrasi Pembangunan Setda Provinsi Jambi
                    </Text>
                </Text>
            </AppShell.Footer>
        </AppShell>
    );
};
