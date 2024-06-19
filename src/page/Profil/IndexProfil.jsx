import { Container, Tabs, rem } from "@mantine/core";
import {
    IconMessageCircle,
    IconPhoto,
    IconSettings,
} from "@tabler/icons-react";

export function IndexProfil() {
    const iconStyle = { width: rem(12), height: rem(12) };

    return (
        <Container size="xl" mt={100}>
            <Tabs
                defaultValue="gallery"
                variant="pills"
                radius="lg"
                // orientation="vertical"
            >
                <Tabs.List grow>
                    <Tabs.Tab
                        value="gallery"
                        leftSection={<IconPhoto style={iconStyle} />}
                    >
                        Gallery
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="messages"
                        leftSection={<IconMessageCircle style={iconStyle} />}
                    >
                        Messages
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="settings"
                        leftSection={<IconSettings style={iconStyle} />}
                    >
                        Settings
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel mt="xl" value="gallery">
                    Gallery tab content
                </Tabs.Panel>

                <Tabs.Panel mt="xl" value="messages">
                    Messages tab content
                </Tabs.Panel>

                <Tabs.Panel mt="xl" value="settings">
                    Settings tab content
                </Tabs.Panel>
            </Tabs>
        </Container>
    );
}
