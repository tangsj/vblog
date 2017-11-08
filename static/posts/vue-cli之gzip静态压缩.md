在http里gzip压缩传输可以极大的优化资源下载速度（试验值：800k -> 200k);

以前的做法一般都是在http服务器上面打开动态的[gzip](http://www.tangsj.com/post/1), 这样服务器会消耗CPU的资源来进行gzip压缩。

在vue-cli生成的项目配置文件里面`config/index.js`

```js
  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  // Before setting to `true`, make sure to:
  // npm install --save-dev compression-webpack-plugin
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
```

按提示先在项目里执行`npm install --save-dev compression-webpack-plugin`, 然后将productionGzip的值改为true.

这样我们在执行 `npm run build` 的时候生成的dist/static/js目录里面会产生与js文件对应的`.gz`包, 将这些文件一起上传到服务器。接下来需要进行nginx的 gzip_static配置

首页先确保nginx 已安装 gzip_static 模块，具体安装自行google, 然后在nginx.conf里添加，并重启nginx

```nginx
  location ~* \.(js|css)$ {
    gzip_static on;
  }
```

到此配置结束，可以访问看效果了。
