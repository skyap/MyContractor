require("@nomicfoundation/hardhat-toolbox");
/* ---------------------------------------------------------------------------------------------- */
const { TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS } = require("hardhat/builtin-tasks/task-names");

task(TASK_COMPILE_SOLIDITY_GET_SOURCE_PATHS, async (taskArgs, hre, runSuper) => {
  const sourcePaths = await runSuper(taskArgs); // Get the default source paths

  // Exclude files that match certain conditions
  const excludedPaths = sourcePaths.filter((path) => !path.includes('ignore'));
  return excludedPaths;
});
/* ---------------------------------------------------------------------------------------------- */

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
};
