import { ActionIcon, Affix, Transition, rem } from "@mantine/core";

import { IconArrowUp } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";

const ScrollToTop = () => {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <div>
            <Affix position={{ bottom: 25, right: 25 }}>
                <Transition transition="slide-up" mounted={scroll.y > 250}>
                    {(transitionStyles) => (
                        <ActionIcon
                            style={transitionStyles}
                            variant="filled"
                            onClick={() => scrollTo({ y: 0 })}
                            size="lg"
                        >
                            <IconArrowUp
                                style={{
                                    width: rem(24),
                                    height: rem(24),
                                }}
                            />
                        </ActionIcon>
                    )}
                </Transition>
            </Affix>
        </div>
    );
};

export default ScrollToTop;
