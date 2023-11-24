import FilteredEventList from "@/src/components/event/FilteredEventList";

export default function Event() {
  return (
    <main className="w-full max-w-[1200px] flex flex-col items-center">
      <FilteredEventList />
    </main>
  );
}
