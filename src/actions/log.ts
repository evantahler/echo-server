import { Action, ParamsFrom } from "actionhero";
import { cacheAppend, loadCache } from "../utils/cache";

export class LogAppendAction extends Action {
  constructor() {
    super();
    this.name = "log:append";
    this.description = "I store information POSTed or PUt to me in redis";
    this.inputs = {
      payload: { required: true },
    };
  }

  async run({ params }: { params: ParamsFrom<LogAppendAction> }) {
    await cacheAppend(params.payload);
    return { success: true, payload: params.payload };
  }
}

export class LogsListAction extends Action {
  constructor() {
    super();
    this.name = "logs:list";
    this.description = "I display log information that's been sent";
    this.inputs = {
      start: {
        required: true,
        default: 0,
      },
      size: {
        required: true,
        default: -1,
      },
    };
  }

  async run({ params }: { params: ParamsFrom<LogAppendAction> }) {
    const payloads = await loadCache(
      parseInt(params.start),
      parseInt(params.size)
    );
    return { payloads };
  }
}
