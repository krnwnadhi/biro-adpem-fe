import { ActionIcon, Affix, Transition, rem } from "@mantine/core";

import HeroHeader from "./HeroHeader";
import { IconArrowUp } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";

const IndexPage = () => {
    const [scroll, scrollTo] = useWindowScroll();

    return (
        <div>
            <HeroHeader />
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
            {/* <HeroHeader /> */}
        </div>
    );
};

export default IndexPage;
