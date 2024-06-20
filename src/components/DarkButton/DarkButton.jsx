import {
    ActionIcon,
    Group,
    Tooltip,
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
        <Tooltip
            transition="slide-up"
            label={dark ? "Mode Terang" : "Mode Gelap"}
            offset={35}
            withArrow
            arrowOffset={10}
            arrowSize={5}
            transitionProps={{
                transition: "slide-down",
                duration: 300,
            }}
        >
            <ActionIcon
                onClick={() =>
                    setColorScheme(
                        computedColorScheme === "light" ? "dark" : "light"
                    )
                }
                variant="subtle"
                size="md"
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
        </Tooltip>
    );
}
