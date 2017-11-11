## php 官方文档
http://www.php.net/manual/zh/book.memcached.php

## memcache 与 memcached 的关系
首先看下时间，memcache最早是在2004年2月开发的，最后更新是在2013年4月，而memcached最早是在2009年1月开发的，最后更新是在2014年1月更新的。所以memcache的历史比memcached早。

在安装memcache扩展的时候并不要求安装其他东东，但是在安装memcached的时候会要求你安装libmemcached，问题来了，libmemcached是memcache的C客户端，它具有的优点是低内存，线程安全等特点。比如新浪微博之前就全面将php的memcache替换成php的memcached，在高并发下，稳定性果断提高。


# memcache安装 

参考: http://blog.csdn.net/cup_chenyubo/article/details/49682425

## 服务端安装 ：
```shell
brew install memcached
命令启动
memcached -m 32 -p 11211 -d 
```
错误解决
autoheader: error: AC_CONFIG_HEADERS not found in configure.in
采纳
vi `which phpize`
找到 SED="/usr/local/Library/ENV/4.3/sed" 改成 SED="/usr/bin/sed"

php扩展安装问题：

1. configure: error: memcached support requires libmemcached. Use --with-libmemcached-dir=<DIR> to specify the prefix where libmemcached headers and library are located

解决办法： apt-get install libmemcached-dev


## 本地Memcache 测试文件

```php
<?php
$connect = new Memcached;  //声明一个新的memcached链接
$connect->setOption(Memcached::OPT_COMPRESSION, false); //关闭压缩功能
$connect->setOption(Memcached::OPT_BINARY_PROTOCOL, true); //使用binary二进制协议
$connect->addServer('localhost', 11211); //添加OCS实例地址及端口号
//$connect->setSaslAuthData('44d73689ac2a4ee4', 'c17xIrNt16e8mcE');
$connect->set("hello", "world");
echo $connect->get("hello");

echo "<hr>";

$user = array(
    "name" => "ocs",
    "age" => 1,
    "sex" => "male"
); //声明一组数组  
$expire = 60; //设置过期时间
$connect->set('your_name',$user,$expire);

$result =$connect->get('your_name');

var_dump($result);

echo "<hr>";

echo $result['sex'];


$connect->quit();

?>
```
