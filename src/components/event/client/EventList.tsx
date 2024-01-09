import { Filter, FilterContext } from "@/src/context/FilterContext";
import useMapList from "@/src/hooks/useMapList";
import usePosterList from "@/src/hooks/usePosterList";
import { ChangeEvent, useContext, useState } from "react";
import Button from "../../UI/common/Button";
import GridContainer from "../../UI/container/GridContainer";
import ModalToggleCard from "../../UI/container/ModalToggleCard";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";
import Pagination from "./Pagination";
import Select from "./Select";
import StaticMap from "./StaticMap";

type Props = {
  children: React.ReactNode;
};

type ControlBoxProps = {
  name: string;
  filters: { type: string; options: { text: string; value: string }[] };
};

type TabProps = {
  tabs: {
    text: string;
    value: string;
  }[];
  children:
    | React.ReactNode
    | ((tab: { text: string; value: string }) => React.ReactNode);
};

type PosterListProps = {
  children: React.ReactNode | ((totalPage: number) => React.ReactNode);
};

const EventList = ({ children }: Props) => {
  return <div>{children}</div>;
};

const ControlBox = ({
  children,
}: {
  children:
    | React.ReactNode
    | (({
        filter,
        onFilterChange,
      }: {
        filter: Filter;
        onFilterChange: (
          e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
        ) => void;
      }) => React.ReactNode);
}) => {
  const { filter, onFilterChange } = useContext(FilterContext);

  const toRender =
    typeof children === "function"
      ? children({ filter, onFilterChange })
      : children;

  return (
    <div className="w-full h-full flex md:flex-row flex-col gap-5 my-5">
      <div className="flex gap-5 m-auto">{toRender}</div>
      {/* <div className="flex gap-5 m-auto">{children}</div> */}
    </div>
  );
};

const SelectItem = ({
  name,
  filters,
  curValue,
  onChange,
}: ControlBoxProps & {
  curValue: string;
  onChange: (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}) => {
  return (
    <Select onChange={onChange} name={name} value={curValue}>
      {filters.options.map((it) => (
        <Select.Option key={it.text} text={it.text} value={it.value} />
      ))}
    </Select>
  );
};

const Tab = ({ tabs, children }: TabProps) => {
  const [tab, setTab] = useState(tabs[0]);

  const toRender = typeof children === "function" ? children(tab) : children;

  return (
    <div>
      {tabs.map((it) => (
        <Button
          key={it.text}
          onClick={() => setTab(it)}
          size={`${it.value === tab.value ? "md" : "sm"}`}
          color={`${it.value === tab.value ? "dark" : "light"}`}
        >
          {it.text}
        </Button>
      ))}
      {toRender}
    </div>
  );
};

const PosterList = ({ children }: PosterListProps) => {
  const { data } = usePosterList();

  const toRender =
    typeof children === "function" ? children(data.totalPage) : children;

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <GridContainer>
          {data.events.map(({ eventPeriod, id, thumbnail, title, views }) => {
            return (
              <EventCard key={id} height="500px">
                <ModalToggleCard
                  key={id}
                  modalContent={<EventDetail id={id} />}
                >
                  <EventCard.Image
                    src={thumbnail}
                    alt={`${title} 포스터`}
                    height={500}
                    width={500}
                    style="object-contain h-[370px]"
                  />
                  <div className="px-5 pt-4 pb-5">
                    <EventCard.Title>{title}</EventCard.Title>
                    <EventCard.Period>{eventPeriod}</EventCard.Period>
                  </div>
                </ModalToggleCard>

                <div className="flex items-center justify-between px-5">
                  <EventCard.Views>{views}</EventCard.Views>
                  <EventCard.Likes eventId={id} />
                </div>
              </EventCard>
            );
          })}
        </GridContainer>
      </div>
      <Pagination totalPage={data.totalPage} />
    </>
  );
};

const MapList = () => {
  const { data, changeCurrentEvent } = useMapList();

  return (
    <div className="w-full flex flex-col gap-10 md:flex-row md:gap-0 px-5">
      <div className="flex flex-col gap-4 w-full h-[800px] md:w-2/5  overflow-scroll py-2 md:pr-5">
        {data.events.map((event) => (
          <EventCard key={event.id}>
            <div
              className="flex relative"
              onClick={() => changeCurrentEvent(event)}
            >
              <EventCard.Image
                src={event.thumbnail}
                alt={event.title}
                width={500}
                height={500}
                style="w-1/4 object-contain"
              />
              <div className="absolute top-3 right-5">
                <EventCard.Likes eventId={event.id} />
              </div>
              <div className="flex flex-col w-3/5 py-4 px-4 gap-2">
                <EventCard.Title>{event.title}</EventCard.Title>
                <EventCard.Period>{event.eventPeriod}</EventCard.Period>
                <EventCard.Views>{event.views}</EventCard.Views>
                <ModalToggleCard modalContent={<EventDetail id={event.id} />}>
                  <Button size="sm" color="dark">{`상세정보`}</Button>
                </ModalToggleCard>
              </div>
            </div>
          </EventCard>
        ))}
      </div>
      <div className="w-full md:w-3/5">
        <StaticMap
          latitude={data.curEvent?.longitude || ""}
          longitude={data.curEvent?.latitude || ""}
          heightStyle="h-[800px]"
        />
      </div>
    </div>
  );
};

export default EventList;
EventList.ControlBox = ControlBox;
EventList.SelectItem = SelectItem;
EventList.Tab = Tab;
EventList.PosterList = PosterList;
EventList.MapList = MapList;
