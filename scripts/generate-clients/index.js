// @ts-check
const yargs = require("yargs");
const path = require("path");
const { emptyDirSync, rmdirSync } = require("fs-extra");
const { generateClients, generateGenericClient, generateProtocolTests } = require("./code-gen");
const { copyToClients, copyServerTests } = require("./copy-to-clients");
const {
  CODE_GEN_SDK_OUTPUT_DIR,
  CODE_GEN_GENERIC_CLIENT_OUTPUT_DIR,
  CODE_GEN_PROTOCOL_TESTS_OUTPUT_DIR,
  TEMP_CODE_GEN_INPUT_DIR,
} = require("./code-gen-dir");
const { prettifyCode } = require("./code-prettify");
const { eslintFixCode } = require("./code-eslint-fix");

const SDK_CLIENTS_DIR = path.normalize(path.join(__dirname, "..", "..", "clients"));
const PRIVATE_CLIENTS_DIR = path.normalize(path.join(__dirname, "..", "..", "private"));

const {
  models,
  globs,
  output: clientsDir,
  noPrivateClients,
  s: serverOnly,
} = yargs
  .alias("m", "models")
  .string("m")
  .describe("m", "The path to directory with models.")
  .alias("g", "globs")
  .array("g")
  .describe("g", "A list of smithy model globs")
  .conflicts("models", "globs") //either models(path) or globs is accepted
  .alias("o", "output")
  .string("o")
  .describe("o", "The output directory for built clients")
  .default("o", SDK_CLIENTS_DIR)
  .alias("n", "noPrivateClients")
  .boolean("n")
  .describe("n", "Disable generating private clients")
  .alias("s", "server-artifacts")
  .boolean("s")
  .describe("s", "Generate server artifacts instead of client ones")
  .conflicts("s", ["m", "g", "n"])
  .help().argv;

(async () => {
  try {
    if (serverOnly === true) {
      await generateProtocolTests();
      await eslintFixCode();
      await prettifyCode(CODE_GEN_PROTOCOL_TESTS_OUTPUT_DIR);
      await copyServerTests(CODE_GEN_PROTOCOL_TESTS_OUTPUT_DIR, PRIVATE_CLIENTS_DIR);

      emptyDirSync(CODE_GEN_PROTOCOL_TESTS_OUTPUT_DIR);
      emptyDirSync(TEMP_CODE_GEN_INPUT_DIR);

      rmdirSync(TEMP_CODE_GEN_INPUT_DIR);
      return;
    }

    await generateClients(models || globs);
    if (!noPrivateClients) {
      await generateGenericClient();
      await generateProtocolTests();
    }

    await eslintFixCode();
    await prettifyCode(CODE_GEN_SDK_OUTPUT_DIR);
    if (!noPrivateClients) {
      await prettifyCode(CODE_GEN_GENERIC_CLIENT_OUTPUT_DIR);
      await prettifyCode(CODE_GEN_PROTOCOL_TESTS_OUTPUT_DIR);
    }

    await copyToClients(CODE_GEN_SDK_OUTPUT_DIR, clientsDir);
    if (!noPrivateClients) {
      await copyToClients(CODE_GEN_GENERIC_CLIENT_OUTPUT_DIR, PRIVATE_CLIENTS_DIR);
      await copyToClients(CODE_GEN_PROTOCOL_TESTS_OUTPUT_DIR, PRIVATE_CLIENTS_DIR);
    }

    emptyDirSync(CODE_GEN_SDK_OUTPUT_DIR);
    if (!noPrivateClients) {
      emptyDirSync(CODE_GEN_GENERIC_CLIENT_OUTPUT_DIR);
      emptyDirSync(CODE_GEN_PROTOCOL_TESTS_OUTPUT_DIR);
    }
    emptyDirSync(TEMP_CODE_GEN_INPUT_DIR);

    rmdirSync(TEMP_CODE_GEN_INPUT_DIR);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
