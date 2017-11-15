### 一、修改环境变量

    $ vi /etc/profile

在里面加入:

    $ export PATH="$PATH:/usr/local/mysql/bin"

回到终端界面让新添加的条目生效

    $ source /etc/profile

### 二、让alias设置的别名永久生效
    $ alias
    alias cp='cp -i'
    alias l.='ls -d .* --color=tty'
    alias ll='ls -l --color=tty'
    alias ls='ls --color=tty'
    alias mv='mv -i'
    alias rm='rm -i'
修改用户家目录下的.bashrc  如：在文件中添加vi="vim"


### 三、NFS 文件系统挂载

1: 服务端的配置

  首先启动需要的服务

     portmap,nfslock,nfs 

  更改防火墙，打开NFS需要的端口

    1. portmap 端口 111 udp/tcp;  
    2. nfsd 端口 2049 udp/tcp;  
    3. mountd 端口 "xxx" udp/tcp 

系统 RPC服务在 nfs服务启动时默认会为 mountd动态选取一个随机端口（32768--65535）来进行通讯,我们可以通过编辑/etc/services 文件为 mountd指定一个固定端口:

    $ vi /etc/services 

在文件末尾添加

    mountd 1011/udp  
    mountd 1011/tcp 

nfs通讯的服务中还有 rpc.lockd,也要对其它固定一个端口, 在/etc/services还末尾添加
    
    lockd 35000/udp
    lockd 35000/tcp

到这里后我直接重启了电脑，，囧
  
下一步是配置防火墙规则
  
    $ vi /etc/sysconfig/iptables

在其中添加

    -A RH-Firewall-1-INPUT -p udp -m udp --dport 111 -j ACCEPT
    -A RH-Firewall-1-INPUT -p tcp -m tcp --dport 111 -j ACCEPT     --> portmap使用
    -A RH-Firewall-1-INPUT -p udp -m udp --dport 2049 -j ACCEPT
    -A RH-Firewall-1-INPUT -p tcp -m tcp --dport 2049 -j ACCEPT    --> nfsd使用
    -A RH-Firewall-1-INPUT -p udp -m udp --dport 1011 -j ACCEPT
    -A RH-Firewall-1-INPUT -p tcp -m tcp --dport 1011 -j ACCEPT    --> mountd使用
    -A RH-Firewall-1-INPUT -p udp -m udp --dport 35000 -j ACCEPT
    -A RH-Firewall-1-INPUT -p tcp -m tcp --dport 35000 -j ACCEPT   --> lockd使用
 
 重启iptables

    $ service iptables restart

 下一步  
    
    $ vi /etc/exports

 在下面添加需要共享的目录

 格式：  目录路径  可以mount的主机（参数1，参数2，...）,  示例： 

    /usr/local/xxx/ *(rw,sync,no_root_squash)

 然后启动相关的服务(portmap,nfslock,nfs)
 
 下一步可以用showmount -e 来检查共享的目录情况 
 
当修改了/etc/exports文件后，可以不用重新启动nfs服务，可以用下面的命令
    
    # exportfs [-aruv]
    
    $ exportfs -auv    # 卸载nfs
    $ exportfs -arv    # 重新导出共享目录 

2,客户端的配置 
 
 首先要确定客户端的portmap服务运行正常
 
 然后可以挂载目录了,  如：
 
 mount -t nfs mysql2:/usr/local/xxx/ /mnt/nfs/
