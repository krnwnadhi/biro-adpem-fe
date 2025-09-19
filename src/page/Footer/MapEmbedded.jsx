import { AspectRatio } from "@mantine/core";

export function MapEmbedded() {
    return (
        <>
            <AspectRatio>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d473.86512400441285!2d103.58276741153698!3d-1.6031572797442286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2589004cbe95fd%3A0x440b2e19b156d57d!2sBiro%20Organisasi%20Provinsi%20Jambi!5e1!3m2!1sen!2sid!4v1758168585566!5m2!1sen!2sid"
                    title="Biro Administrasi Pembangunan Provinsi Jambi"
                    style={{ border: 0, marginTop: 20, marginBottom: 20 }}
                    width="600"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                />
            </AspectRatio>
        </>
    );
}
