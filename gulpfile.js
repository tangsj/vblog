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

gulp.task('posts', () => {
  const basePath = path.join(__dirname, 'static', 'posts');
  const paths = fs.readdirSync(basePath);
  const fileData = {
    code: 0,
    message: '获取文件列表成功！',
    data: paths,
  };
  fs.writeFile(path.join(basePath, '..', 'posts.json'), JSON.stringify(fileData, null, 2), () => {
    console.log('posts.json create success.');
  });
});

gulp.task('test', (e) => {
  console.log(`server Root ${server.webRoot}`);
  return ssh.exec(['pwd'], { filePath: 'log.log' })
    .pipe(gulp.dest('logs'));
});

gulp.task('publish', ['clean'], () => gulp.src(path.join(__dirname, 'dist/**/*'))
  .pipe(ssh.dest(server.webRoot)));

gulp.task('pb-posts', () => gulp.src(path.join(__dirname, 'dist/static/posts/*'))
  .pipe(ssh.dest(path.join(server.webRoot, 'static', 'posts'))));
gulp.task('pp-json', ['pb-posts', 'posts'], () => gulp.src(path.join(__dirname, 'dist/static/posts.json'))
  .pipe(ssh.dest(path.join(server.webRoot, 'static'))));

gulp.task('clean', () => ssh.shell([
  `cd ${server.webRoot}/`,
  'sudo rm -rf ./static/js/*',
  'sudo rm -rf ./static/css/*',
  'sudo rm -rf ./static/img/*',
  'sudo rm -rf ./static/posts.json',
], { filePath: 'publish.log' })
  .pipe(gulp.dest('logs')));
