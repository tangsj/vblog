### 一、Apache 安装

1.先安装openssl（后面会用到） 可以先rpm -qa | grep openssl 检查一下是否安装 

2.tar 解压 httpd-version.tar.gz

3.指定编译参数（参数视自己需要指定）, 并安装

    ./configure --prefix=/usr/local/apache \
    --enable-modules \
    --enable-mem-cache \
    --enable-cache \
    --enable-file-cache \
    --enable-expires \
    --enable-headers \
    --enable-http \
    --enable-cgi \
    --enable-so \
    --enable-ssl \
    --with-ssl=/usr/local/openssl \
    --with-mpm=prefork \
    --enable-rewrite \
    --enable-dav

    make && make install

4.到安装目录的bin文件夹下 

    $ cd /usr/local/apache/bin

5.启动apache

    $ ./apachectl start

这样 apache 已经启动，但是会出现下面的提示
    
    httpd: Could not reliably determine the server's fully qualified domain name, using 220.250.64.25 for ServerName

解决办法：

    a.vi /usr/local/apache/conf/httpd.conf
    b.find ServerName
    c.找到 #ServerName www.example.com:80 改为 ServerName www.example.com:80

6.现在将apache加入系统服务

apache加入服务需要在apachectl启动脚本中加入下面两句
   
    # chkconfig: 2345 65 38
    # description: Apache.
    (vi apachectl 添加后保存)

    $ cp ./apachectl /etc/init.d/httpd
    
    $ chkconfig --add httpd 加入系统服务
    
    $ chkconfig httpd on 设置开机启动

7.注：(php 安装后再配置)

编辑apache配置文件httpd.conf

要改的有如下几处:

找到LoadModule php5_module modules/libphp5.so前面的#号去掉(默认已去掉注释)

找到#AddType application/x-gzip .gz .tgz，在其下添加如下二行

    AddType application/x-httpd-php .php
    AddType application/x-httpd-php-source .phps

还有找到DirectoryIndex index.html改为DirectoryIndex index.php index.html

Apache2.2服务项目发布后 只能访问首页问题解决

    #
    # This should be changed to whatever you set DocumentRoot to.
    #
    <Directory "/usr/local/apache/htdocs">
        #
        # Possible values for the Options directive are "None", "All",
        # or any combination of:
        #   Indexes Includes FollowSymLinks SymLinksifOwnerMatch ExecCGI MultiViews
        #
        # Note that "MultiViews" must be named *explicitly* --- "Options All"
        # doesn't give it to you.
        #
        # The Options directive is both complicated and important.  Please see
        # http://httpd.apache.org/docs/2.2/mod/core.html#options
        # for more information.
        #
        Options Indexes FollowSymLinks
        #
        # AllowOverride controls what directives may be placed in .htaccess files.
        # It can be "All", "None", or any combination of the keywords:
        #   Options FileInfo AuthConfig Limit
        #
        AllowOverride None   （在这里， 改成 AllowOverride All）
        #
        # Controls who can get stuff from this server.
        #
        Order allow,deny
        Allow from all
    </Directory>

注：apache 最后还需要针对系统进行内存调优，详细问谷老师吧！


### 二、Mysql 安装

1.添加mysql用户组

    $ groupadd mysql

2.添加mysql用户

    $ useradd -r -g mysql mysql

3.将mysql包tar到/usr/local下并建立一个软连接

    $ cd /usr/local
    $ tar zxvf /path/to/mysql-VERSION-OS.tar.gz
    $ ln -s /usr/local/mysql-VERSION-OS mysql
    $ cd mysql

4.配置文件夹的用户及用户组

    $ chown -R mysql:mysql

5.复制需要的文件 

    $ cp support-files/mysql.server /etc/init.d/mysqld
    $ cp support-files/my-medium.cnf /etc/my.cnf  
    (这里我们用的是中型数据库)

6.mysql 安装

    $ scripts/mysql_install_db --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data/

7.mysql 启动

    $ bin/mysqld_safe --user=mysql &  
    (可以先不做这一步，等加入系统服务后用service    mysqld start 来启动) (设置/tmp 文件的权限mysql 要可写)

8.将mysqld加入到系统服务

    $ chkconfig --add mysqld

9.设置mysqld服务随着系统启动而启动

    $ chkconfig mysqld on

10.mysql 用户管理

GRANT select[ALL PRIVILEGES] on 数据库.* to 用户名@登录主机 identified by "密码" 

    $ GRANT ALL PRIVILEGES ON *.* TO root@"%" IDENTIFIED BY '123456' WITH GRANT OPTION;

(用户远程登录mysql 用户名：root, 123456, %位置为允许登录的IP，%表示任意位置) 

访问不到和防火墙有关系

    $ /usr/local/mysql/bin/mysqladmin -u root password 'new-password'

常见问题： 
    
    mysql  2006错误

    --------------------------------------
    SET GLOBAL net_buffer_length=10000;
    SET GLOBAL max_allowed_packet=200000000;
    --------------------------------------

### 三、PHP 安装

先需要安装一些支持【这些视自己需求安装即可, 安装包可以自己到网上下载】

a. 安装GD2 (图像工具)

    $ tar zxvf gd-2.0.34.tar.gz
    $ cd gd-2.0.34
    $ ./configure --prefix=/usr/local/gd2 --with-jpeg --with-png
    $ make && make install

可能遇到的错误：

（需要：freetype,libpng,libjpeg，安装libpng进可能需要zlib，下载zlib安装就可以了，不过安装zlib时不要用--prefix指定路径安装）

在安装 libjpeg时如果出现以下的错误 

无法创建一般文件“/usr/local/jpeg-6b/man/man1/cjpeg.1”: 没有那个文件或目录

只需要手动创建对应的目录结构即可

GD库安装要出错解决办法

@note:make时如果出错的话 copy两个文件到gd当前目录下

    @Error:
    gd_png.c:16:53: error: png.h: No such file or directory
    png.h:395:21: error: pngconf.h: No such file or directory

    $ cp /usr/local/libpng/include/png.h ./
    $ cp /usr/local/libpng/include/pngconf.h ./

安装过程还要参考 ：[http://tieba.baidu.com/p/212351406](http://tieba.baidu.com/p/212351406)

b. 安装 zlib

    $ tar zxvf zlib-1.2.3.tar.gz
    $ cd zlib-1.2.3  // 进入zlib目录
    $ CFLAGS="-O3 -fPIC" ./configure   // 使用64位元的方法进行编译
    $ make
    $ make install
    $ make clean

c. 安装imap

    $ tar zxf imap.tar.Z
    $ cd imap-2007b

编辑 Makefile

    $ vi Makefile

查找 ： EXTRACFLAGS=

将其修改为如下所示:

    EXTRACFLAGS= -fPIC

后续工作

    $ make lr5 PASSWDTYPE=std SSLTYPE=unix.nopwd IP6=4
    ------------------------------------------------
    $ echo "set disable-plaintext nil" > /etc/c-client.cf
    $ mkdir /usr/local/imap-2007b 
    $ mkdir /usr/local/imap-2007b/include/ 
    $ mkdir /usr/local/imap-2007b/lib/
    $ chmod -R 077 /usr/local/imap-2007b
    $ rm -rf /usr/local/imap-2007b/include/*
    $ rm -rf /usr/local/imap-2007b/lib/*
    $ rm -rf /usr/sbin/imapd

    $ cp imapd/imapd /usr/sbin/
    $ cp c-client/*.h /usr/local/imap-2007b/include/
    $ cp c-client/*.c /usr/local/imap-2007b/lib/
    $ cp c-client/c-client.a /usr/local/imap-2007b/lib/libc-client.a

d. 安装mcrypt

    $ tar -vxzf libmcrypt-version.tar.gz
    $ cd libmcrypt-version
    $ ./configure --prefix=/usr/local/libmcrypt
    $ make && make install

e. 安装freetype

    $ tar -vxzf freetype-version.tar.gz
    $ cd freetype-version
    $ ./configure --prefix=/usr/local/freetype
    $ make && make install

####下面开始安装 PHP
  
1.解压安装包：

    tar -vxzf php-version.tar.gz

2.安装php

    $ cd php-version  

    $ ./configure --prefix=/usr/local/php5 \
    --with-apxs2=/usr/local/apache/bin/apxs \
    --with-config-file-path=/usr/local/php/etc \
    --with-mysql=/usr/local/mysql \
    --with-mysqli=/usr/local/mysql/bin/mysql_config \
    --with-pdo-mysql=/usr/local/mysql \
    --without-pdo-sqlite \
    --without-sqlite \
    --with-mysql-sock=/tmp/mysql.sock \
    --with-curl \
    --enable-mbstring \
    --with-mcrypt=/usr/local/libmcrypt \
    --with-openssl \
    --enable-gd-native-ttf \
    --with-jpeg-dir=/usr/local/jpeg-6b \
    --with-png-dir=/usr/local/libpng-1.2.44 \
    --with-gd=/usr/local/gd2 \
    --with-freetype-dir=/usr/local/freetype \
    --enable-sockets \
    --with-gettext \
    --enable-zip \
    --enable-soap \
    --disable-ipv6 \
    --with-imap=/usr/local/imap-2007b \
    --with-imap-ssl \
    --with-kerberos \
    --with-xmlrpc \
    --with-zlib \

    $ make 
    $ make install

php 编译的时候注意GD的安装   imagecache会用到

PHP 安装完成也要记得配置环境变量

    vi /etc/profile

加入php的bin路径

    source /etc/profile
