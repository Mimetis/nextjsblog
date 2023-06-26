
export const ShimmerCard = () => (
    <div className="border bg-gray-800 shadow 
    rounded-md
    max-w-sm w-full
    mx-auto
    h-[280px] lg:h-[260px] xl:h-[240px] 2xl:h-[280px]
    flex
    ">
        <div className="animate-pulse flex-1 flex flex-col content-between">
            <div className="bg-gray-400 flex-1 "></div>
            <div className="bg-slate-600 h-[40px]"></div>
        </div>
    </div>
)


export default async function loading() {
    return (<div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
            <ShimmerCard />
        </div>
    </div>
    )
}