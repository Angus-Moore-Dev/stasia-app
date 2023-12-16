'use client';

import { User } from "@supabase/supabase-js";
import DreamEditor from "./DreamEditor";
import { useEffect, useState } from "react";
import { Dream } from "@/utils/global.types";
import { createBrowserClient } from "@/utils/createBrowserClient";
import { notifications } from "@mantine/notifications";
import PastDreamComponent from "./PastDreamComponent";
import { Loader } from "@mantine/core";


export default function DreamDashboard({ user }: { user: User })
{
    const supabase = createBrowserClient();
    const [dreams, setDreams] = useState<Dream[]>();

    useEffect(() => {
        const fetchDreams = async () =>
        {
            const { data: dreams, error } = await supabase
            .from('dreams')
            .select('*')
            .order('createdAt', { ascending: false });

            if (dreams && !error)
                setDreams(dreams);
            else
                notifications.show({
                    title: 'Error Fetching Dreams',
                    message: error.message
                });
        }
        fetchDreams();
    }, [supabase]);

    return <>
    <DreamEditor user={user} onNewDream={dream => setDreams(dreams => [dream, ...dreams ?? []])} />
    <div className="w-full flex flex-col gap-2">
        <span>
            Past Dreams
        </span>
        {
            !dreams &&
            <Loader size={24} className="mx-auto" color="green" />
        }
        {
            dreams &&
            <>
            {
                dreams.length === 0 &&
                <span className="text-gray-500">
                    No dreams yet.
                </span>
            }
            {
                dreams.map(dream => 
                <PastDreamComponent
                key={dream.id}
                dream={dream}
                onDelete={dream => setDreams(dreams.filter(d => d.id !== dream.id))}
                />
                )
            }
            </>
        }
    </div>
    </>
}