/* eslint-disable react/prop-types */

import {
    Alert,
    Button,
    Container,
    Fieldset,
    Group,
    LoadingOverlay,
    Stack,
    Text,
    TextInput,
} from "@mantine/core";
import {
    fetchDetailPostAction,
    updatePostAction,
} from "../../redux/slices/posts/postSlice";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";

import { IconAlertCircle } from "@tabler/icons-react";
import ReactQuill from "react-quill";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";

export const UpdateBerita = (props) => {
    const {
        computedMatch: {
            params: { id },
        },
    } = props;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDetailPostAction(id));
        window.scrollTo(0, 0);
    }, [id, dispatch]);

    //select post
    const postData = useSelector((state) => state?.post);
    const { postDetail = [] } = postData;
    console.log(postDetail);

    //select updated post
    const updatedPost = useSelector((state) => state?.post);
    const { appError, loading, serverError, isUpdated } = updatedPost;

    const form = useForm({
        initialValues: {
            title: postDetail?.title,
            description: postDetail?.description,
        },

        validate: {
            title: isNotEmpty("Judul tidak boleh kosong"),
            description: isNotEmpty("Deskripsi tidak boleh kosong"),
        },
    });

    const modules = {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
        ],
        clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        },
    };

    const formOnSubmit = form.onSubmit((values) => {
        const data = {
            title: values?.title,
            description: values?.description,
            id,
        };
        dispatch(updatePostAction(data));
    });

    //redirect
    if (isUpdated)
        return <Redirect to={`/berita/${postDetail?._id}`} replace={true} />;

    return (
        <Container size="lg" mt={100} mih="80svh">
            <form onSubmit={formOnSubmit}>
                <LoadingOverlay
                    visible={loading}
                    zIndex={1000}
                    overlayProps={{ radius: "sm", blur: 5 }}
                />
                <Fieldset disabled={loading}>
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

                        <Text>Deskripsi</Text>
                        <ReactQuill
                            theme="snow"
                            formats={[
                                "header",
                                "font",
                                "size",
                                "bold",
                                "italic",
                                "underline",
                                "strike",
                                "blockquote",
                                "list",
                                "bullet",
                                "indent",
                                "link",
                                "image",
                                "video",
                            ]}
                            placeholder="Tulis Berita..."
                            modules={modules}
                            {...form.getInputProps("description")}
                        />

                        <Group position="apart" mt="xl">
                            {loading ? (
                                <Button disabled loading fullWidth>
                                    Loading...
                                </Button>
                            ) : (
                                <Button
                                    // disabled={!form.isValid()}
                                    type="submit"
                                    fullWidth
                                >
                                    Update Berita
                                </Button>
                            )}
                        </Group>
                    </Stack>
                </Fieldset>
            </form>
        </Container>
    );
};
