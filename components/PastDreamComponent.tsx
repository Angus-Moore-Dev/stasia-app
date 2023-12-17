'use client';

import { Dream } from "@/utils/global.types";
import { Button, Modal, TypographyStylesProvider } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import DeleteDream from "./DeleteDream";
import { notifications } from "@mantine/notifications";

interface PastDreamComponentProps
{
    dream: Dream;
    onDelete: (dream: Dream) => void;
}

export default function PastDreamComponent({ dream, onDelete }: PastDreamComponentProps)
{
    const [opened, { open, close }] = useDisclosure(false);

    return <>
    <div className="w-full flex flex-col md:flex-row items-center gap-2 bg-[#0e0e0e] p-4 rounded transition hover:bg-[#111111] hover:cursor-pointer"
    onClick={open}>
        <span className="text-xl text-center md:text-left font-bold md:mr-auto max-w-[66%]">
            {dream.title}
        </span>
        <small>
            {new Date(dream.createdAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
        </small>
        <div className="rounded-full p-1 text-sm flex items-center justify-center w-32 bg-[#141414]">
            {dream.dreamType}
        </div>
    </div>
    <Modal opened={opened} onClose={close} centered size={'xl'} title={`${dream.title} | ${new Date(dream.createdAt).toLocaleDateString('en-AU', { dateStyle: 'full' })} | ${dream.dreamType}`}>
        <div className="w-full flex flex-col items-center max-w-2xl mx-auto mr-24 md:mr-12">
            <TypographyStylesProvider>
                <p dangerouslySetInnerHTML={{ __html: dream.content }} />
            </TypographyStylesProvider>
        </div>
        <div className="w-full flex justify-end items-center gap-2">
            <Button onClick={() => {
                notifications.show({
                    title: 'Not Implemented Yet',
                    message: 'Edit dream has not been implemented yet.',
                    color: 'red'
                });
            }}>
                Edit Dream
            </Button>
            <DeleteDream
            dream={dream}
            onDelete={() => {
                onDelete(dream);
                close();
            }}
            />
        </div>
    </Modal>
    </>
}