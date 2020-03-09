import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import { RoomData } from "../../interfaces/RoomData";


export class Rooms extends Service<RoomData> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }
};
