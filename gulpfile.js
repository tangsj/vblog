const fs = require('fs');
const os = require('os');
const path = require('path');
const gulp = require('gulp');
const SSH = require('gulp-ssh');

const target = process.env.target || 'tangsj';

/**
 * 服务器地址列表
 * @type {Object}
 */
const server = ({
  tangsj: {
    webRoot: '/data/tsj/blog',
    host: '118.89.47.166',
    port: 22,
    username: 'root',
    privateKey: fs.readFileSync(path.join(os.homedir(), '.ssh', 'id_rsa')),
  },
})[target];

const ssh = new SSH({
  ignoreErrors: false,
  sshConfig: server,
});

gulp.task('test', (e) => {
  console.log(`server Root ${server.webRoot}`);
  return ssh.exec(['pwd'], { filePath: 'log.log' })
    .pipe(gulp.dest('logs'));
});

/* 代码发布 采用直接上传打包后代码的方式 */
gulp.task('publish', ['clean'], () => gulp.src(path.join(__dirname, 'dist/**/*'))
  .pipe(ssh.dest(server.webRoot)));

gulp.task('clean', () => ssh.shell([
  `cd ${server.webRoot}/`,
  'rm -rf *',
], { filePath: 'publish.log' })
  .pipe(gulp.dest('logs')));
