import { createServerClient } from "@/utils/createServerClient";
import PastDreamComponent from "./PastDreamComponent";



export default async function PastDreams()
{
    const supabase = createServerClient();

    const { data: dreams, error } = await supabase
    .from('dreams')
    .select('*')
    .order('createdAt', { ascending: false });

    if (error && !dreams)
        return <div className="text-red-500 my-5">
            Error loading dreams.
        </div>

    return <div className="w-full flex flex-col gap-2">
        <span>
            Past Dreams
        </span>
        {
            dreams.length === 0 &&
            <span className="text-gray-500">
                No dreams yet.
            </span>
        }
        {
            dreams.map((dream, index) => <PastDreamComponent key={index} dream={dream} />)
        }
    </div>
}