import ProtectRouter from "@/src/components/UI/container/ProtectRouter";
import FilteredEventList from "@/src/components/event/client/FilteredEventList";

export default async function Event({
  searchParams,
}: {
  searchParams: { slug: string };
}) {
  return (
    <main className="w-full max-w-[1200px] flex flex-col items-center">
      <ProtectRouter>
        <FilteredEventList query={searchParams} />
      </ProtectRouter>
    </main>
  );
}
