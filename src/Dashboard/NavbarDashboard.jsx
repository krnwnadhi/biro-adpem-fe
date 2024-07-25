import {
    IconCategory2,
    IconFile,
    IconGauge,
    IconNotes,
    IconPhotoSearch,
} from "@tabler/icons-react";

import { LinksGroup } from "../components/NavbarLinksGroup/NavbarLinksGroup";
import { ScrollArea } from "@mantine/core";
import classes from "./NavbarDashboard.module.css";

const mockdata = [
    {
        label: "Dashboard",
        initiallyOpened: true,
        icon: IconGauge,
        links: [
            { label: "Beranda", link: "/" },
            { label: "Dashboard", link: "/dashboard" },
        ],
    },
    {
        label: "Berita & Kegiatan",
        icon: IconNotes,
        links: [
            { label: "List Berita", link: "/dashboard/daftar-post" },
            { label: "Tambah Berita", link: "/dashboard/tambah-post" },
        ],
    },
    {
        label: "Kategori",
        icon: IconCategory2,
        links: [{ label: "Daftar Kategori", link: "/dashboard/kategori" }],
    },
    {
        label: "Dokumen",
        icon: IconFile,
        links: [
            { label: "Daftar Dokumen", link: "/dashboard/documents" },
            { label: "Tambah Dokumen", link: "/dashboard/tambah-document" },
        ],
    },
    {
        label: "Galeri",
        icon: IconPhotoSearch,
        links: [
            { label: "List Gallery", link: "/dashboard/gallery" },
            { label: "Tambah Galeri", link: "/dashboard/tambah-gallery" },
        ],
    },
];

export function NavbarDashboard() {
    const links = mockdata.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    return (
        <nav className={classes.navbar}>
            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>
        </nav>
    );
}
