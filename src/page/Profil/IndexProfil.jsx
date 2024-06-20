import { Container, Tabs, rem, useMantineTheme } from "@mantine/core";
import {
    IconBinaryTree,
    IconBuildingArch,
    IconLicense,
    IconMessageCircle,
    IconPhoto,
    IconSettings,
} from "@tabler/icons-react";
import { useHistory, useParams } from "react-router-dom";

import SelayangPandang from "./SelayangPandang";
import StrukturOrganisasi from "./StrukturOrganisasi";
import VisiMisi from "./VisiMisi";
import { useMediaQuery } from "@mantine/hooks";

export function IndexProfil() {
    const iconStyle = { width: rem(12), height: rem(12) };

    const history = useHistory();
    const { tabValue } = useParams();

    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    return (
        <>
            <Container size="xl" mt={100}>
                <Tabs
                    variant="pills"
                    radius="lg"
                    value={tabValue}
                    onChange={(value) => history.push(`/profil/${value}`)}
                    orientation={mobile ? "horizontal" : "vertical"}
                    keepMounted={false}
                    loop
                >
                    <Tabs.List mr="xl" grow={mobile ? true : false}>
                        <Tabs.Tab
                            p="lg"
                            value="selayangpandang"
                            leftSection={<IconBuildingArch style={iconStyle} />}
                        >
                            Selayang Pandang
                        </Tabs.Tab>
                        <Tabs.Tab
                            p="lg"
                            color="green"
                            value="visimisi"
                            leftSection={<IconLicense style={iconStyle} />}
                        >
                            Visi & Misi
                        </Tabs.Tab>
                        <Tabs.Tab
                            p="lg"
                            color="red"
                            value="strukturorganisasi"
                            leftSection={<IconBinaryTree style={iconStyle} />}
                        >
                            Struktur Organisasi
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel
                        value="selayangpandang"
                        mt={mobile ? "xl" : null}
                    >
                        <SelayangPandang />
                    </Tabs.Panel>

                    <Tabs.Panel value="visimisi" mt={mobile ? "xl" : null}>
                        <VisiMisi />
                    </Tabs.Panel>

                    <Tabs.Panel
                        value="strukturorganisasi"
                        mt={mobile ? "xl" : null}
                    >
                        <StrukturOrganisasi />
                    </Tabs.Panel>
                </Tabs>
            </Container>
        </>
    );
}
