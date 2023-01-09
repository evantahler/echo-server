process.env.CACHE_SIZE = `5`;

import { Process, specHelper } from "actionhero";
import { LogAppendAction, LogsListAction } from "../../src/actions/log";
import { cacheTrim } from "../../src/utils/cache";

describe("Action: log", () => {
  const actionhero = new Process();

  beforeAll(async () => await actionhero.start());
  afterAll(async () => await actionhero.stop());

  beforeEach(async () => {
    await cacheTrim(0);
  });

  test("stores log messages", async () => {
    const { success } = await specHelper.runAction<LogAppendAction>(
      "log:append",
      { payload: "foo" }
    );
    expect(success).toEqual(true);
  });

  test("lists log messages", async () => {
    await specHelper.runAction<LogAppendAction>("log:append", {
      payload: "foo",
    });

    const { payloads } = await specHelper.runAction<LogsListAction>(
      "logs:list"
    );
    expect(payloads.length).toEqual(1);
    expect(payloads[0].payload).toEqual("foo");
  });

  test("appending to the cache will be limited by size", async () => {
    // process.env.CACHE_SIZE = `5`;

    for (const number of [1, 2, 3, 4, 5, 6, 7]) {
      await specHelper.runAction<LogAppendAction>("log:append", {
        payload: `${number}`,
      });
    }

    const { payloads } = await specHelper.runAction<LogsListAction>(
      "logs:list"
    );

    expect(payloads.length).toEqual(5);
    expect(payloads.map((p) => p.payload)).toEqual(["7", "6", "5", "4", "3"]);
  });
});
