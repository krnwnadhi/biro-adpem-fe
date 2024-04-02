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

    return (
        <Group justify="center">
            <ActionIcon
                onClick={() =>
                    setColorScheme(
                        computedColorScheme === "light" ? "dark" : "light"
                    )
                }
                variant="default"
                size="xl"
                aria-label="Toggle color scheme"
            >
                <IconSun
                    className={cx(classes.icon, classes.light)}
                    stroke={1.5}
                />
                <IconMoon
                    className={cx(classes.icon, classes.dark)}
                    stroke={1.5}
                />
            </ActionIcon>
        </Group>
    );
}
