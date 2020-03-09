const fs = require('fs')
const package = require('../package.json')

exports.getProject = function () {
  return package.repository.name.toString().trim()
}

exports.getProjectTeam = function () {
  return package.repository.team.toString().trim()
}

exports.getProjectName = function () {
  return package.name.toString().trim()
}

exports.getCurrentTag = function () {
  return package.version.toString().trim()
}

exports.getGitHash = function () {
  const rev = fs.readFileSync('.git/HEAD').toString().trim();
  if (rev.indexOf(':') === -1) {
    return rev;
  } else {
    return fs.readFileSync('.git/' + rev.substring(5)).toString().trim();
  }
}

exports.getProjectDesc = function () {
  const desc = `更新日志为<a href="${package.repository.changelogurl}">${package.repository.changelogurl}</a>`
  return desc.toString().trim()
}
