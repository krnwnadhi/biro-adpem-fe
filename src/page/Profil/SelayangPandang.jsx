import {
    Center,
    Container,
    Image,
    Space,
    Text,
    Title,
    rem,
    useMantineTheme,
} from "@mantine/core";

import { Fade } from "react-awesome-reveal";
import classes from "./SelayangPandang.module.css";
import { useMediaQuery } from "@mantine/hooks";

const SelayangPandang = () => {
    const theme = useMantineTheme();
    const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

    return (
        <>
            <Container size="xl">
                <Fade cascade triggerOnce>
                    <Title my="sm" order={2} align="center">
                        Selayang Pandang Biro Administrasi Pembangunan Setda
                        Provinsi Jambi
                    </Title>

                    <Space h="xl" />

                    <Center p={10}>
                        <Image
                            className={classes.image}
                            src="https://res.cloudinary.com/degzbxlnx/image/upload/v1690966461/Untitled_design_3_g4c2d0.png"
                            width={mobile ? rem(100) : rem(100)}
                            radius="md"
                            fallbackSrc="https://placehold.co/600x400?text=KESALAHAN!\nFoto+Gubernur\ndan\nWagub\nProvinsi+Jambi"
                        />
                    </Center>

                    <Space h="xl" />

                    <Text ta="justify">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Porro aliquam quidem illo nobis nostrum veniam
                        earum cumque nam delectus, quia, eum doloribus, quam
                        corrupti ea adipisci vitae mollitia quis? Iste!
                        Dignissimos ea magnam quaerat at minus recusandae?
                        Maxime nemo neque atque labore illum rem, laboriosam
                        dolorum incidunt voluptates repellat ad mollitia
                        corporis commodi sequi blanditiis odio doloribus quia
                        voluptatum voluptatem! Possimus quod, voluptas quae
                        consequuntur sunt architecto dolores sequi ut vero
                        distinctio quaerat eligendi odit vitae id eos ea
                        voluptatum! Dolores consequatur totam maiores, ducimus
                        repellendus nihil tempora provident cupiditate. Ullam
                        voluptatum delectus aperiam optio, ipsa dicta
                        consequuntur modi totam assumenda debitis dolorum,
                        adipisci alias dolores corporis, id aliquid sit eum
                        reprehenderit error tempora reiciendis. Alias debitis
                        ipsum nulla magni. Suscipit, reprehenderit hic fugit
                        explicabo quis vitae aut nobis aliquid facere sint quam
                        inventore quibusdam enim, consequatur ab ipsa molestiae,
                        quidem ad natus accusamus et placeat! Reprehenderit
                        illum vel explicabo.
                    </Text>

                    <Space h="xl" />

                    <Text ta="justify">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Porro aliquam quidem illo nobis nostrum veniam
                        earum cumque nam delectus, quia, eum doloribus, quam
                        corrupti ea adipisci vitae mollitia quis? Iste!
                        Dignissimos ea magnam quaerat at minus recusandae?
                        Maxime nemo neque atque labore illum rem, laboriosam
                        dolorum incidunt voluptates repellat ad mollitia
                        corporis commodi sequi blanditiis odio doloribus quia
                        voluptatum voluptatem! Possimus quod, voluptas quae
                        consequuntur sunt architecto dolores sequi ut vero
                        distinctio quaerat eligendi odit vitae id eos ea
                        voluptatum! Dolores consequatur totam maiores, ducimus
                        repellendus nihil tempora provident cupiditate. Ullam
                        voluptatum delectus aperiam optio, ipsa dicta
                        consequuntur modi totam assumenda debitis dolorum,
                        adipisci alias dolores corporis, id aliquid sit eum
                        reprehenderit error tempora reiciendis. Alias debitis
                        ipsum nulla magni. Suscipit, reprehenderit hic fugit
                        explicabo quis vitae aut nobis aliquid facere sint quam
                        inventore quibusdam enim, consequatur ab ipsa molestiae,
                        quidem ad natus accusamus et placeat! Reprehenderit
                        illum vel explicabo.
                    </Text>
                </Fade>
            </Container>
        </>
    );
};

export default SelayangPandang;
