import { createServerClient } from "@/utils/createServerClient";
import Image from "next/image";

export default async function AppNavbar()
{
    const server = createServerClient();
    const user = (await server.auth.getUser()).data.user;


    return <nav className="w-full flex flex-row items-center py-2.5 px-4 md:px-32 bg-[#1b1b1b]">
        <Image src='/logo.png' alt="Logo" width={185.6} height={32} />
    </nav>
}