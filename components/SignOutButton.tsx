'use client';

import { createBrowserClient } from "@/utils/createBrowserClient";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function SignOutButton({ user }: { user: User })
{
    const router = useRouter();
    const supabase = createBrowserClient();
    const [opened, { open, close }] = useDisclosure(false);
    const [isLoading, setIsLoading] = useState(false);

    const signOut = async () =>
    {
        setIsLoading(true);
        await supabase.auth.signOut();
        router.refresh();
        setIsLoading(false);
    }

    return <>
    <Modal opened={opened} onClose={close} centered size={'md'} title="Manage Account">
        <Button color="red" onClick={signOut} loading={isLoading}>
            Sign Out
        </Button>
    </Modal>
    <Button variant='default' onClick={open}>
        {user.email}
    </Button>
    </>
}