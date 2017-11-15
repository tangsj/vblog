### 一、CentOS 服务器时间同步

    $ cp /usr/share/zoneinfo/Asia/Chongqing /etc/localtime   

设置时区应该是在服务器安装的时候有选择的

    $ yum -y install ntp
    $ ntpdate  cn.pool.ntp.org
    $ service ntpd start
    $ chkconfig ntpd on

### 二、vsftp服务器安装

    1. 下载 vsftp-version.rpm
    2. rpm -ivh vsftp-version.rpm
    3. service vsftpd start
    4. chkconfig vsftpd on
    5. vsftp的用户登录是以系统用户登录的(/etc/passwd里面的用户)

ftp服务器连接失败,错误提示:

    $ 500 OOPS: cannot change directory:/home/*******
    $ 500 OOPS: child died

解决方法:
在终端输入命令：

    $ setsebool ftpd_disable_trans 1
    $ service vsftpd restart

    或者 setenforce = 0 (permissive)

    $ /usr/sbin/setenforce 0 立刻关闭 SELINUX
    $ /usr/sbin/setenforce 1 立刻启用 SELINUX

加到系统默认启动里面
    $ echo "/usr/sbin/setenforce 0" >> /etc/rc.d/rc.local

### 三、SSH配置

系统安装好后，默认sshd服务是打开了的，可以用service sshd status检查ssh服务的运行状态，如果服务没有被开启，则用service sshd start开启就行。chkconfig sshd on 将sshd服务加入开机启动！

用ssh-keygen -t rsa 来生成公钥和私钥

    [root@mysql1 software]# ssh-keygen -t rsa
    Generating public/private rsa key pair.
    Enter file in which to save the key (/root/.ssh/id_rsa):
    (这是输入你想要保存公钥和私钥的路径，这里我们用默认的)
    Enter passphrase (empty for no passphrase):
    (输入你的密码)
    Enter same passphrase again:
    (再输入一次)
    Your identification has been saved in /root/.ssh/id_rsa.
    (这是我们的私钥文件)
    Your public key has been saved in /root/.ssh/id_rsa.pub.
    (这是我们的公钥文件)
    The key fingerprint is:
    26:32:90:a0:a2:ae:c0:a5:6b:6e:d4:0a:b5:0f:4f:a2 root@mysql1

下一步我们要做的就是把刚刚生成的公钥文件拷贝到远程主机上面去
    
    $ cat id_rsa.pub >> ~/.ssh/authorized_keys

配置权限
    
    $ chmod 700 -R .ssh
    $ chmod 600 authorized_keys

这里很重要，这里必需保证.ssh目录和authorized_keys文件都只有用户自己才有写的权限，否则验证无效.

接下来开始配置主机间使用ssh登录，openssh使用密钥登录设置方法

假如我们有这样两个linux主机

A 系统: 192.168.0.1
B 系统: 192.168.0.2

使用基于主机的非对称密钥方式从B直接登录A.

1、修改A系统上的/etc/ssh/sshd_config,将

    RhostsRSAAuthentication
    HostbasedAuthentication
    PubkeyAuthentication

都设置为 yes

保存退出,重启ssh服务 /etc/init.d/sshd restart

2、以下均在B系统上操作

    #ssh-keygen -t rsa
    Generating public/private rsa key pair.
    Enter file in which to save the key (/root/.ssh/id_rsa):   
    (这是输入你想要保存公钥和私钥的路径，这里我们用默认的)
    Enter passphrase (empty for no passphrase):                
    (输入你的密码)
    Enter same passphrase again:                               
    (再输入一次)
    Your identification has been saved in /root/.ssh/id_rsa.   
    (这是我们的私钥文件)
    Your public key has been saved in /root/.ssh/id_rsa.pub.   
    (这是我们的公钥文件)
    The key fingerprint is:
    93:08:88:88:dc:8f:46:d8:a3:09:fc:35:25:50:d0:fe root@CentOS5.2
    
    #scp -P 16888 ~/.ssh/id_rsa.pub  root@192.168.0.1:/root/.ssh/authorized_keys

    root@192.168.0.1's password:
    输入正确密码,回车
    id_rsa.pub                                                       100%  396     0.4KB/s   00:00
 
~/.ssh/id_rsa.pub 公钥已经安全传输到192.168.0.1这台机器上的/root/.ssh/目录下并命名为authorized_keys(必须重命
名为此文件名)

    #ssh -p 16888 root@192.168.0.1
    Enter passphrase for key '/root/.ssh/id_rsa':  

如果你在生成密钥时设置了密码,此处输入密码.如果没有输入密码,直接登入系统

密码正确出现类似如下的登录信息:

    Last login: Sat Jul 26 11:16:57 2008 from 192.168.0.2
    [root@RHEL5 ~]#

登录192.168.0.1成功

