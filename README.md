# ICAN-UI 国脉我能

## 注意

凡是以这个模板开发的项目, 都需要从这个项目的 `master` 分支分发出去, 改动文件规则请看规则

如果安装 `yarn` or `npm i` 缓慢, 请先更换为中国镜像. 这里推荐用自带 `CMD` or `PowerShell` 否则有权限问题

```
npm set registry https://registry.npm.taobao.org
npm set disturl https://npm.taobao.org/dist
npm i -g mirror-config-china --registry=https://registry.npm.taobao.org
```

`Mac OS` 系统等 `Linux` 系统需要加 `sudo` 前缀以提高权限

## 上手开发

> 推荐使用 `git bash`

- 克隆项目代码
- 预装好 `node.js 12+` 安装包
- 如果使用 `vscode` 开发,可使用我们推荐的 `vscode` 配置 你也可以选择自定义配置(命令: `cp vscode.config/ .vscode/ -rf`)
- 安装项目的依赖 `npm i` 或使用 `yarn` (需要预装，命令：`npm i -g yarn`)
- 拷贝 `cp .env .env.local`
- 修改开发环境代理 ip 配置 文件在 `.env.local`
- 确认安装依赖无错，即可运行 `yarn serve` 或 `npm run serve`
- 提交使用 `yarn cz` 尽量使用命令提交, 冲突等等可不用

## 内网部署说明

- 确认 gitlab-ci 有正常运行
- 部署正式站，切换到 master 分支 运行 ./master 进行合并分支，不需要 git pull, 然后 git push -f
- 测试没问题后，切换到 deploy-master 运行 git reset --hard origin/master 以进行部署，git push -f 完成部署
- 测试站同理

## Git 管理必读

https://juejin.im/post/5aa7e8a6f265da239f070d82

## Git 提交必须

https://zhuanlan.zhihu.com/p/51894196

## 产品设计图获取

https://www.yuque.com
私有画板图

## 具体见 Wiki
