export interface RoomDTO {
  id: number;
  name: string;

  readonly players: number[];
  readonly log: number[];

  readonly createdAt: Date;
  readonly updatedAt: Date;
}
