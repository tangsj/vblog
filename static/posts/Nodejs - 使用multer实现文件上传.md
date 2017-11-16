Multer 是一个由expressjs提供的nodejs处理`multipart/form-data`的中间件，用它来实现我们的文件上传功能很方便，直接上代码：

```js
const multer = require('multer');

/**
 * 自定义文件存储逻辑
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // type 是由请求方发送的文件类型名称，关联要上传到哪一个文件目录
    if (!req.body.type) {
      // 未指定上传文件类型  上传到 默认目录
      req.body.type = 'default';
    }

    // 文件上传完整路径
    const filepath = path.join(__dirname, 'uploads', req.body.type);
    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath);
    }
    cb(null, filepath);
  },
  filename(req, file, cb) {
    // util.getExt 是一个获取文件后缀名的方法
    // getExt: pathname => path.extname(pathname).substring(1),
    const ext = util.getExt(file.originalname);
    // 随机生成一个文件名
    cb(null, `${Date.now()}-${md5(file.originalname).substr(0, 5)}.${ext}`);
  },
});

/**
 * 文件上传参数
 * @type {[type]}
 */
const upload = multer({
  storage,
});

/**
 * 文件上传
 * 文件上传时表单名称：file
 */
const singleUpload = upload.single('file');

```

在路由请求处理函数中使用

```js
routeHandler(req, res) {
  singleUpload(req, res, (e, data) => {
    if (e) {
      throw e;
    }
    // 到这里文件上传成功了，可以获取 req.file 看看这个对象中都有些什么有用信息
  });
}
```
更多高级使用方法还请阅读文档 [https://github.com/expressjs/multer](https://github.com/expressjs/multer)
