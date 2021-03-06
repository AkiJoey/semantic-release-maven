const { exec, findMaven } = require('./util')

module.exports = async function publish(pluginConfig, context) {
  const { logger, nextRelease } = context
  logger.log(`Updating pom.xml to version ${nextRelease.version}`)

  const mvn = await findMaven()
  await exec(mvn, [
    'versions:set',
    '-B',
    '-ntp',
    '-DgenerateBackupPoms=false',
    `-DnewVersion=${nextRelease.version}`
  ])
}
