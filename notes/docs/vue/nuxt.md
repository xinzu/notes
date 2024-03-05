## 版本

Nuxt3

node版本至少要18.0.0

## 安装

```shell
#npm
$ npx nuxi init <项目名>
```

### **安装报错**

![image-20240301192907776](/notes/imgs/nuxt/nuxt3安装报错.png)

**解决方案**

1. 前往https://www.ipaddress.com/ip-lookup查找到`raw.githubusercontent.com`的IP

2. 修改本机hosts文件（一般路径地址为：**C:\Windows\System32\drivers\etc\hosts）

   ```tex
   # 添加到最后
   185.199.110.133 raw.githubusercontent.com
   185.199.111.133 raw.githubusercontent.com
   185.199.109.133 raw.githubusercontent.com
   185.199.108.133 raw.githubusercontent.com
   2606:50c0:8001::154 raw.githubusercontent.com
   2606:50c0:8002::154 raw.githubusercontent.com
   2606:50c0:8003::154 raw.githubusercontent.com
   2606:50c0:8000::154 raw.githubusercontent.com
   ```

3. 添加完此映射关系之后，打开CMD，输入 ipconfig/flushdns 刷新下本地的DNS缓存。

## 配置项

### alias

