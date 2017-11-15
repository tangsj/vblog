### 一、Nginx 安装

  Nginx是一个非常轻量级的HTTP服务器，Nginx， 是一个高性能的HTTP和反向代理服务器，
  同时也是一个IMAP/POP3/SMTP 代理服务器。
  
1.安装 Nginx

2.1. Unbutn 系统
    
    sudo apt-get install nginx
    
2.2. Cenots 系统

    yum install nginx

2.3. 源码安装 （推荐）

    创建临时文件 并且 进入到创建的目录
    mkdir /tmp/nginx && cd /tmp/nginx 
    下载 openssl
    wget -c http://www.openssl.org/source/openssl-1.0.1c.tar.gz
    下载 nginx
    wget -c http://nginx.org/download/nginx-1.7.0.tar.gz 其它版本下载地址：http://nginx.org/download/
    解压 openssl
    tar zxvf openssl-1.0.1c.tar.gz
    解压 nginx
    tar zxvf nginx-1.7.0.tar.gz
    进入 nginx 目录
    cd nginx-1.7.0
    编译 nginx
    ./configure –prefix=/usr/local/nginx –with-http_ssl_module –with-openssl=/tmp/nginx/openssl-1.0.1c
    注意后面的一个目录是openssl的源码库物理路径
    安装
    make && make install
   
2.4 nginx 开机启动

    下载脚本到 linux init 中
    wget -c https://raw.githubusercontent.com/svon/wiki/gh-pages/download/nginx -O /etc/init.d/nginx
    注意：
    文件中 nginxd 、nginx_config、nginx_pid 需要更换为 nginx 的安装目录
    设置文件的访问权限
    chmod a+x /etc/init.d/nginx
    最后将nginx添加到 rc.local 文件中
    vim /etc/rc.local
    在最后添加
    /etc/init.d/nginx start
    
2.5 nginx 全局环境

    ln -s /etc/init.d/nginx /usr/bin/nginx
    
2.6 nginx 快捷命令

    nginx start     启动
    nginx stop      停止
    nginx restart   重新启动
    nginx reload    重新加载
    nginx status    当前状态
    nginx help      帮助
    
    
