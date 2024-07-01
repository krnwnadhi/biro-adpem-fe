import { Anchor, Breadcrumbs, Container } from "@mantine/core";

export const AllBerita = () => {
    const breadcrumbsItem = [
        { title: "Home", href: "/" },
        { title: "Informasi", href: "#" },
        { title: "Berita & Kegiatan", href: "/berita" },
    ].map((item, index) => (
        <Anchor
            href={item.href}
            key={index}
            size="xs"
            underline={false}
            truncate="end"
        >
            {item.title}
        </Anchor>
    ));

    return (
        <Container size="lg" mt={100}>
            <Breadcrumbs>{breadcrumbsItem}</Breadcrumbs>
            AllBerita
        </Container>
    );
};
