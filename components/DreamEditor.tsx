"use client";

import { Dream, DreamRating } from "@/utils/global.types";
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import { Button, Input, Select } from "@mantine/core";
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import Placeholder from '@tiptap/extension-placeholder';
import { createBrowserClient } from "@/utils/createBrowserClient";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

interface DreamEditorProps
{
    existingDream?: Dream;
    user: User;
    onNewDream: (dream: Dream) => void;
}

export default function DreamEditor({ existingDream, user, onNewDream }: DreamEditorProps)
{
    const supabase = createBrowserClient();
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [dreamContent, setDreamContent] = useState(existingDream ? existingDream.content : '');
    const [dreamType, setDreamType] = useState<DreamRating>();
    
    const addNewDream = async () =>
    {
        if (!title || !dreamContent)
        {
            notifications.show({
                title: 'Error Adding New Dream',
                message: 'Please fill out all fields.',
                color: 'red',
            });
            return;
        }

        setIsLoading(true);
        const { data: dream, error } = await supabase
        .from('dreams')
        .insert({
            title,
            content: dreamContent,
            userId: user.id,
            dreamType: dreamType ?? 'Neutral',
        })
        .select('*')
        .single();

        if (error && !dream)
            notifications.show({
                title: 'Error Adding New Dream',
                message: error.message,
                color: 'red',
            });
        else
        {
            notifications.show({
                title: 'New Dream Added',
                message: 'Your dream has been added to your collection!',
                color: 'green',
            });
            setDreamContent('');
            setTitle('');
            setDreamType(undefined);
            onNewDream(dream);
        }
        setIsLoading(false);
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            Placeholder.configure({ placeholder: 'Write your dream here...' }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: dreamContent,
        onUpdate({ editor }) {
            setDreamContent(editor.getHTML());
        }
    });

    return <div className="w-full flex flex-col gap-2">
        <span>
            {existingDream ? 'Update Dream Entry' : 'New Dream Entry'}
        </span>
        <Input placeholder="Title" size='xl' value={title} onChange={e => setTitle(e.target.value)} />
        <RichTextEditor editor={editor} className='w-full'>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
            <RichTextEditor.Content />
        </RichTextEditor>
        <div className="flex flex-row items-center gap-2 justify-end">
            <Select
            value={dreamType}
            onChange={e => setDreamType(e as DreamRating)}
            placeholder="Pick Rating"
            data={[
                'Positive',
                'Neutral',
                'Negative',
                'Nightmare',
                'Sleep Paralysis',
                'Lucid Dream',
                'Other',
            ]} />
            <Button variant="filled" className="w-full md:w-fit" loading={isLoading} onClick={() => existingDream ? () => {} : addNewDream()}>
                {existingDream ? 'Update Dream' : 'Add New Dream'}
            </Button>
        </div>
    </div>
}