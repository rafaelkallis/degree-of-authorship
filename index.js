/**
 * @file index
 * @author Rafael Kallis <rk@rafaelkallis.com>
 */

const path = require('path');
const gitRawCommits = require('git-raw-commits');

exports.degreeOfAuthorship = function (workDir, fileDir) {
  let timestampFA = Infinity;
  let authorFA = '';

  let totalCommits = 0;
  const commits = {};
  return new Promise((resolve, reject) => {
    gitRawCommits({path: fileDir, format: '%at,%an,%ae,'},{cwd: workDir})
      .on('data', data => {
        const [timestamp, author, email] = data.toString().split(',');
        if (!commits[author]) {
          commits[author] = 0;
        }
        totalCommits++;
        commits[author]++;

        if (timestamp < timestampFA) {
          timestampFA = timestamp;
          authorFA = author;
        }
      })
      .on('error', reject)
      .on('end', () => {
        const doa = {};
        for (const author of Object.keys(commits)) {
          const FA = author === authorFA ? 1 : 0;
          const DL = commits[author];
          const AC = totalCommits - commits[author];
          doa[author] = 3.293 + 1.098 * FA + 0.164 * DL - 0.321 * Math.log(1 + AC);
        }
        resolve(doa);
      });
  });    
}
