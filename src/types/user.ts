export type User = {
  id: number;
  email: string;
  nick: string;
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

export type MyFavoriteEvent = {
  id: number;
  period: string;
  thumbnail: string;
  title: string;
};
