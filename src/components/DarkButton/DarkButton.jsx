import {
    ActionIcon,
    Group,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

import classes from "./DarkButton.module.css";
import cx from "clsx";

export function DarkButton() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === "dark";

    return (
        <Group justify="center">
            <ActionIcon
                onClick={() =>
                    setColorScheme(
                        computedColorScheme === "light" ? "dark" : "light"
                    )
                }
                variant="subtle"
                size="md"
                aria-label="Toggle color scheme"
                title={dark ? "Mode Terang" : "Mode Gelap"}
            >
                <IconSun
                    className={cx(classes.icon, classes.light)}
                    stroke={1.5}
                    size={18}
                />
                <IconMoon
                    className={cx(classes.icon, classes.dark)}
                    stroke={1.5}
                    size={18}
                />
            </ActionIcon>
        </Group>
    );
}
