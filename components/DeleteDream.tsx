'use client';
import { createBrowserClient } from "@/utils/createBrowserClient";
import { Dream } from "@/utils/global.types";
import { Button, Modal, TypographyStylesProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function DeleteDream({ dream, onDelete }: { dream: Dream, onDelete: () => void })
{
    const router = useRouter();
    const supabase = createBrowserClient();
    const [opened, { open, close }] = useDisclosure(false);
    const [isLoading, setIsLoading] = useState(false);

    const deleteDream = async () =>
    {
        if (isLoading) return;

        setIsLoading(true);

        const { error } = await supabase
        .from('dreams')
        .delete()
        .eq('id', dream.id);

        if (error)
        {
            console.error(error);
            notifications.show({
                title: 'Error Deleting...',
                message: error.message
            });
            setIsLoading(false);
        }
        else
        {
            notifications.show({
                title: "It's Gone.",
                message: 'Dream deleted successfully.'
            });
            onDelete();
        }
    };

    return <>
    <Button color="red" onClick={open}>
        Delete Dream
    </Button>
    <Modal opened={opened} onClose={close} size="lg" centered title="Delete Dream?">
        <TypographyStylesProvider className="mr-8 md:mr-4 -ml-8">
            <blockquote className="text-zinc-400 font-light">
                <small>
                    I've seen things you people wouldn't believe. Attack ships on fire off the shoulder of Orion. I watched C-beams glitter in the dark near the Tannhäuser Gate. <b>All those moments will be lost in time, like tears in rain.</b>
                </small>
            </blockquote>
        </TypographyStylesProvider>
        <div className="w-full flex items-center justify-end gap-2">
            <Button onClick={close}>
                Save The Dream
            </Button>
            <Button color="red" loading={isLoading} onClick={deleteDream}>
                Blow It Away
            </Button>
        </div>
    </Modal>
    </>

}