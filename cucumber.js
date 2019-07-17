// These are the profiles

const stparams = JSON.stringify({
    athenaEnv: 'st4',
    minervaEnv: 'branchst',
    suite: 'current'
});
const b02params = JSON.stringify({
    athenaEnv: 'b02',
    minervaEnv: 'branchft',
    suite: 'current'
});
const b07params = JSON.stringify({
    athenaEnv: 'b07',
    minervaEnv: 'branchft',
    suite: 'next'
});
const b09params = JSON.stringify({
    athenaEnv: 'b09',
    minervaEnv: 'branchft3',
    suite: 'next'
});

const localParams = JSON.stringify({
    url: 'http://localhost:8081/bb/abcd/b/abcdstatic/html/branch/index_sv.html',
    suite: 'next'
});
const requires = `--require world.js --require features/**/*.js`;

module.exports = {
    "st": `${requires} --world-parameters '${stparams}' --tags "@happy"`,
    "b02": `${requires} --world-parameters '${b02params}'`,
    "b07": `${requires} --world-parameters '${b07params}'`,
    "b09": `${requires} --world-parameters '${b09params}'`,
    "local": `${requires} --world-parameters '${localParams}'`
}
