import {
    ActionIcon,
    Button,
    Flex,
    Stack,
    Text,
    Title,
    Tooltip,
} from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import {
    MRT_EditActionButtons,
    MantineReactTable,
    useMantineReactTable,
} from "mantine-react-table";
import { ModalsProvider, modals } from "@mantine/modals";
import { useEffect, useMemo, useState } from "react";

// import { fakeData, usStates } from './makeData';


const Example = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [fetchedUsers, setFetchedUsers] = useState([]);
    const [isLoadingUsers, setIsLoadingUsers] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingUsersError, setIsLoadingUsersError] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
                setFetchedUsers(fakeData);
                setIsLoadingUsers(false);
            } catch (error) {
                setIsLoadingUsersError(true);
                setIsLoadingUsers(false);
            }
        };

        fetchUsers();
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "Id",
                enableEditing: false,
                size: 80,
            },
            {
                accessorKey: "firstName",
                header: "First Name",
                mantineEditTextInputProps: {
                    type: "email",
                    required: true,
                    error: validationErrors?.firstName,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            firstName: undefined,
                        }),
                },
            },
            {
                accessorKey: "lastName",
                header: "Last Name",
                mantineEditTextInputProps: {
                    type: "email",
                    required: true,
                    error: validationErrors?.lastName,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            lastName: undefined,
                        }),
                },
            },
            {
                accessorKey: "email",
                header: "Email",
                mantineEditTextInputProps: {
                    type: "email",
                    required: true,
                    error: validationErrors?.email,
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            email: undefined,
                        }),
                },
            },
            {
                accessorKey: "state",
                header: "State",
                editVariant: "select",
                mantineEditSelectProps: {
                    data: usStates,
                    error: validationErrors?.state,
                },
            },
        ],
        [validationErrors]
    );

    const handleCreateUser = async ({ values, exitCreatingMode }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
        setFetchedUsers((prevUsers) => [
            ...prevUsers,
            {
                ...values,
                id: (Math.random() + 1).toString(36).substring(7),
            },
        ]);
        setIsSaving(false);
        exitCreatingMode();
    };

    const handleSaveUser = async ({ values, table }) => {
        const newValidationErrors = validateUser(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        setIsSaving(true);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
        setFetchedUsers((prevUsers) =>
            prevUsers.map((user) => (user.id === values.id ? values : user))
        );
        setIsSaving(false);
        table.setEditingRow(null); // exit editing mode
    };

    const openDeleteConfirmModal = (row) =>
        modals.openConfirmModal({
            title: "Are you sure you want to delete this user?",
            children: (
                <Text>
                    Are you sure you want to delete {row.original.firstName}{" "}
                    {row.original.lastName}? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: "Delete", cancel: "Cancel" },
            confirmProps: { color: "red" },
            onConfirm: async () => {
                setIsSaving(true);
                await new Promise((resolve) => setTimeout(resolve, 1000)); // fake API call
                setFetchedUsers((prevUsers) =>
                    prevUsers.filter((user) => user.id !== row.original.id)
                );
                setIsSaving(false);
            },
        });

    const table = useMantineReactTable({
        columns,
        data: fetchedUsers,
        createDisplayMode: "modal",
        editDisplayMode: "modal",
        enableEditing: true,
        getRowId: (row) => row.id,
        mantineToolbarAlertBannerProps: isLoadingUsersError
            ? {
                  color: "red",
                  children: "Error loading data",
              }
            : undefined,
        mantineTableContainerProps: {
            style: {
                minHeight: "500px",
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateUser,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveUser,
        renderCreateRowModalContent: ({
            table,
            row,
            internalEditComponents,
        }) => (
            <Stack>
                <Title order={3}>Create New User</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons
                        variant="text"
                        table={table}
                        row={row}
                    />
                </Flex>
            </Stack>
        ),
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit User</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons
                        variant="text"
                        table={table}
                        row={row}
                    />
                </Flex>
            </Stack>
        ),
        renderRowActions: ({ row, table }) => (
            <Flex gap="md">
                <Tooltip label="Edit">
                    <ActionIcon onClick={() => table.setEditingRow(row)}>
                        <IconEdit />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Delete">
                    <ActionIcon
                        color="red"
                        onClick={() => openDeleteConfirmModal(row)}
                    >
                        <IconTrash />
                    </ActionIcon>
                </Tooltip>
            </Flex>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                onClick={() => {
                    table.setCreatingRow(true);
                }}
            >
                Create New User
            </Button>
        ),
        state: {
            isLoading: isLoadingUsers,
            isSaving: isSaving,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isLoadingUsers,
        },
    });

    return <MantineReactTable table={table} />;
};

const ExampleWithProviders = () => (
    <ModalsProvider>
        <Example />
    </ModalsProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

function validateUser(user) {
    return {
        firstName: !validateRequired(user.firstName)
            ? "First Name is Required"
            : "",
        lastName: !validateRequired(user.lastName)
            ? "Last Name is Required"
            : "",
        email: !validateEmail(user.email) ? "Incorrect Email Format" : "",
    };
}
