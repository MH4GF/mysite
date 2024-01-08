import path from "path";

export const rootJoin = (...args: string[]) => path.join(process.env.PWD || "", ...args);
