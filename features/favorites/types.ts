export type FavoriteItem = {
  type: "song";
  title: string;
  artistName: string;
  link: string;
  timestamp: number;
};

export type FavoriteItemInput = Omit<FavoriteItem, "timestamp"> & {
  timestamp?: number;
};
