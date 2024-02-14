import { nav } from "./navigation.js";
import { fileOperations } from "./file-operations.js";
import { sysInfo } from "./system-info.js";
import { hash } from "./hash.js";
import { zip } from "./zip.js";

export const commands = new Map([
  [() => nav.up(), /^up$/],
  [(data) => nav.cd(data), /^cd .*/],
  [() => nav.ls(), /^ls$/],
  [(data) => fileOperations.cat(data), /^cat .*/],
  [(data) => fileOperations.add(data), /^add .*/],
  [(data) => fileOperations.rn(data), /^rn .*/],
  [(data) => fileOperations.cp(data), /^cp .*/],
  [(data) => fileOperations.mv(data), /^mv .*/],
  [(data) => fileOperations.rm(data), /^rm .*/],
  [(data) => sysInfo.os(data), /^os .*/],
  [(data) => hash(data), /^hash .*/],
  [(data) => zip.compress(data), /^compress .*/],
  [(data) => zip.decompress(data), /^decompress .*/],
])
