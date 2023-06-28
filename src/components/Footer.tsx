import { Facebook, Instagram, Linkedin, Twitter } from "./icon";

const socials = [
    {
        name: "twitter",
        url: Twitter,
    },
    {
        name: "linkedin",
        url: Linkedin,
    },
    {
        name: "instagram",
        url: Instagram,
    },
    {
        name: "facebook",
        url: Facebook,
    },
];
const Footer = () => {
    return (
        <div className="w-full max-w-[1024px] mx-auto pt-[60px] px-5 py-12 md:px-10">
            <div className={`mx-auto flex flex-col gap-8`}>
                <div className="flex flex-col">
                    <div className="mb-[50px] h-[2px] bg-white opacity-10" />

                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <h4 className="font-extrabold text-[24px] text-white">Englift</h4>
                        <p className="font-normal text-[14px] text-white opacity-50">
                            Copyright © 2021 - 2022 Tiếng Anh Tốt. All rights reserved.
                        </p>

                        <div className="flex gap-4">
                            {socials.map((social) => (
                                <img
                                    key={social.name}
                                    src={social.url.src}
                                    alt={social.name}
                                    className="w-[24px] h-[24px] object-contain cursor-pointer"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Footer;
