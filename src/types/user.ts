// TODO 나중에 types 폴더에 정의
export type FavoriteEvent = {
  id: number;
  period: string;
  thumbnail: string;
  title: string;
};

export type MyComment = {
  id: number;
  User: {
    id: number;
    email: string;
    nick: string;
  };
  Event: {
    title: string;
    eventPeriod: string;
    thumbnail: string;
  };
  eventId: number;
  commenter: number;
  content: string;
  createdAt: string;
  updatedAt: string;
};
