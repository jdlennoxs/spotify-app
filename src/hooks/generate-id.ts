import crypto from "crypto";
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from "@feathersjs/feathers";
import { RoomData } from "../interfaces/RoomData";

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    // Get `app`, `method`, `params` and `result` from the hook context
    const {data } = context;
    // Function that adds the user to a single message object
    const addCode = async (data: any): Promise<RoomData> => {
      let code = crypto.randomBytes(2).toString("hex");
      // let exists = true;
      // do {
      //   // Generate a random code
      //   code = crypto.randomBytes(2).toString("hex");
      //   try {
      //     await app.service("rooms").get(code, params);
      //   } catch (error) {
      //       exists = false;
      //   }
      // } while (exists);

      // Merge the message content to include the `user` object
      return {
        ...data,
        code
      };
    };

    context.data = await addCode(data);
    return context;
  };
};
