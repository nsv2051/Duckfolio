---
title: "Linux 远程自动备份"
date: "2026-07-04T06:39:00.000Z"
description: "水一篇"
tags:
  - "code"
---

# <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">Linux 远程自动备份</span></span></span></span>

​

基于 rclone 的交互式远程备份工具，支持 40+ 云存储平台，一键配置定时备份。

## <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">功能</span></span></span></span>

​

* <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">多远程异地备份（同时备份到多个云盘）</span></span></span></span>
* <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">通配符支持（`/root/*.sh` 每个文件独立备份）</span></span></span></span>
* <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">前置/后置钩子（如 `mysqldump`备份数据库）</span></span></span></span>
* <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">排除规则、网络重试、孤儿目录清理</span></span></span></span>
* <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">按数量/天数自动清理旧备份</span></span></span></span>
* <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">自动生成恢复脚本，交互式选择版本恢复</span></span></span></span>
* <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">配置持久化（重新运行自动读取旧配置）</span></span></span></span>
* <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">Webhook 通知（钉钉、飞书等）</span></span></span></span>
* <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">卸载功能</span></span></span></span>

## <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">使用</span></span></span></span>

​

```
# 一键运行
curl -fsSL https://raw.githubusercontent.com/nsv2051/scripts/main/setup-backup.sh -o /tmp/setup-backup.sh && bash /tmp/setup-backup.sh

# 国内代理
curl -fsSL https://gitproxy.eu.org/https://raw.githubusercontent.com/nsv2051/scripts/main/setup-backup.sh -o /tmp/setup-backup.sh && bash /tmp/setup-backup.sh

# 卸载
bash /opt/remote-backup/setup-backup.sh --uninstall
```

## <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">生成的文件</span></span></span></span>

​

```
/opt/remote-backup/
├── {项目名}.sh            # 备份脚本（顶部可编辑配置区直接改）
└── restore-{项目名}.sh    # 恢复脚本

/var/log/remote-backup/    # 按天滚动日志
/var/run/{项目名}.lock     # 锁文件
```

## <span style="background-color: rgb(255, 255, 255);"><span style="color: rgb(31, 35, 40);"><span style="font-family: &#x22;Mona Sans VF&#x22;, -apple-system, BlinkMacSystemFont, &#x22;Segoe UI&#x22;, &#x22;Noto Sans&#x22;, Helvetica, Arial, sans-serif, &#x22;Apple Color Emoji&#x22;, &#x22;Segoe UI Emoji&#x22;;"><span style="font-size: 16px;">常用命令</span></span></span></span>

​

```
# 手动备份
/opt/remote-backup/项目名.sh

# 恢复数据
/opt/remote-backup/restore-项目名.sh

# 查看日志
tail -f /var/log/remote-backup/项目名-$(date +%Y%m%d).log

# 重新配置（自动读取旧配置，回车保留）
bash /opt/remote-backup/setup-backup.sh
```

​
