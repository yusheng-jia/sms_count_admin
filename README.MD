CentOS7 下:
1.安装NodeJs
https://blog.csdn.net/yongjiutongmi53151/article/details/53996575

2.安装PostgreSQL
yum install -y https://download.postgresql.org/pub/repos/yum/9.6/redhat/rhel-7-x86_64/pgdg-centos96-9.6-3.noarch.rpm
yum install -y postgresql96-server postgresql96-contrib
/usr/pgsql-9.6/bin/postgresql96-setup initdb
systemctl start postgresql-9.6
systemctl enable postgresql-9.6

3.配置PostgresQL
su - postgres
psql -U postgres
ALTER USER postgres with encrypted password 'postgres';
create database caesarui;
\c caesarui
\i resources/dbcreate.sql

安装pm2
npm install -g pm2 

4.进入项目安装项目依赖
npm install 

5.启动项目：
pm2 start pm2.json

Ubuntu 16.04：
1.安装NodeJs
sudo apt-get install nodejs
sudo apt install nodejs-legacy
sudo apt install npm

2.安装PostgresQL
sudo apt-get install postgresql-client
sudo apt-get install postgresql

启动
sudo service postgresql start

登录postresql
sudo -u postgres psql

设置postgres用户密码密码：
postgres=# ALTER USER postgres PASSWORD 'postgres';

创建数据库
create database caesarui;

切换数据库
\c caesarui

执行sql
\i resources/dbcreate.sql

退出
\q

3.安装pm2
npm install -g pm2 

4.进入项目caesar_ui 安装依赖
npm install 

5.启动项目
pm2 start pm2.json

