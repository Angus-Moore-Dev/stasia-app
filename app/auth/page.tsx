"use client";

export const dynamic = 'force-dynamic';
import { useState } from 'react';
import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'

type CustomElement = { type: 'paragraph'; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
};

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
];

export default async function AuthPage()
{
    const [editor] = useState(() => withReact(createEditor()))

    return <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center gap-10 py-24">
        <Slate editor={editor} initialValue={[{ type: 'paragraph', children: [{ text: 'Write down your thoughts' }]}]}>
            <Editable />
        </Slate>
    </div>
}