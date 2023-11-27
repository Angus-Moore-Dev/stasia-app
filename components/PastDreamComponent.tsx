'use client';

import { Dream } from "@/utils/global.types";
import { Button, Card, Modal, TypographyStylesProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";



export default function PastDreamComponent({ dream }: { dream: Dream })
{
    const [dreamContent, setDreamContent] = useState('');
    const [opened, { open, close }] = useDisclosure(false);

    useEffect(() => {
        setDreamContent(dream.content);
    }, [dream]);

    return <>
    <div className="w-full flex flex-col md:flex-row items-center gap-2 justify-between bg-[#0e0e0e] p-4 rounded transition hover:bg-[#111111] hover:cursor-pointer"
    onClick={open}>
        <span className="text-xl font-bold">
            {dream.title}
        </span>
        <small>
            {new Date(dream.createdAt).toLocaleDateString('en-AU', { dateStyle: 'full' })}
        </small>
    </div>
    <Modal opened={opened} onClose={close} centered size={'xl'} title={dream.title}>
        <div className="w-full flex flex-col items-center max-w-2xl mx-auto mr-24 md:mr-12">
            <TypographyStylesProvider>
                <p dangerouslySetInnerHTML={{ __html: dreamContent }} />
            </TypographyStylesProvider>
        </div>
    </Modal>
    </>
}