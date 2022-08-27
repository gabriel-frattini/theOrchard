export interface imageProp {
  url: string;
}

export interface roomProps {
  id: number;
  roomName: string;
  roomSlug: string;
  roomPrice: number;
  roomDescription: string;
  roomImages: imageProp[];
}
