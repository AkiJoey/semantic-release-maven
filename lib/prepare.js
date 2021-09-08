const { exec, findMaven } = require('./util')

module.exports = async function publish(pluginConfig, context) {
  const { env, cwd, logger, nextRelease } = context
  logger.log(`Updating pom.xml to version ${nextRelease.version}`)

  const mvn = await findMaven()
  await exec(
    mvn,
    [
      'versions:set',
      '-B',
      '-DgenerateBackupPoms=false',
      `-DnewVersion=${nextRelease.version}`
    ],
    { cwd, env }
  )
}