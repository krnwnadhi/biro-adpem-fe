import {
    Anchor,
    Button,
    Center,
    Container,
    Fieldset,
    Group,
    Paper,
    PasswordInput,
    Space,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";

import { DarkButton } from "../../../components/DarkButton/DarkButton";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import { loginUserAction } from "../../../redux/slices/users/usersSlices";
import { useForm } from "@mantine/form";

export default function SignIn(props) {
    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
            password: (val) =>
                val.length <= 6 ? "Password minimal 6 karakter" : null,
        },
    });

    //dispatch
    const dispatch = useDispatch();

    //select state from store
    const storeDataLogin = useSelector((store) => store?.users);
    const { userAuth, loading } = storeDataLogin;
    console.log("storeDataLogin", JSON.stringify(storeDataLogin, null, 2));

    //redirect
    if (userAuth) {
        return <Redirect to="/" replace={true} />;
    }

    const formOnSubmit = form.onSubmit((values) => {
        // console.log(values);
        dispatch(loginUserAction(values));
        form.clearErrors();
    });

    return (
        <Container size={450} pt={150}>
            <Center>
                {/* <Title order={4}>BIRO ADMINISTRASI PEMBANGUNAN</Title> */}
                <Title order={4}>Lorem ipsum</Title>
            </Center>

            <Paper radius="md" mt={20} p="xl" withBorder shadow="md" {...props}>
                <form onSubmit={formOnSubmit}>
                    <Fieldset disabled={loading}>
                        <Stack>
                            <TextInput
                                required
                                label="Email"
                                placeholder="user@mail.com"
                                value={form.values.email}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "email",
                                        event.currentTarget.value
                                    )
                                }
                                error={form.errors.email && "Invalid email"}
                                radius="md"
                            />

                            <PasswordInput
                                required
                                label="Password"
                                placeholder="Your password"
                                value={form.values.password}
                                onChange={(event) =>
                                    form.setFieldValue(
                                        "password",
                                        event.currentTarget.value
                                    )
                                }
                                error={
                                    form.errors.password &&
                                    "Password should include at least 6 characters"
                                }
                                radius="md"
                            />
                        </Stack>

                        <Group justify="space-between" mt="xl">
                            <DarkButton />
                            <Button type="submit" radius="xl" loading={loading}>
                                LOG IN
                            </Button>
                        </Group>
                    </Fieldset>
                </form>
            </Paper>

            <Space h="md" />

            <Text size="sm" align="center">
                Copyright © 2023{" "}
                <Anchor
                    component={Link}
                    type="button"
                    to="https://diskominfo.jambiprov.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                    ta="center"
                >
                    Diskominfo Provinsi Jambi
                </Anchor>{" "}
            </Text>
        </Container>
    );
}
