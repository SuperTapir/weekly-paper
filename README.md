由于公司经常要轮流写项目进度的周报, 但是每个人写的格式都不是很一样, 而且经常会出现格式不整齐的情况, 对于我这种强迫症更是一个很麻烦的事情, 所以想要写一个工具, 作为一个模版, 把格式规整一下(这需求确实有够无聊的).

## Get Started
```bash
# 安装依赖
yarn

# 开发调试
yarn start

# build
yarn build
```

## 基本功能与使用
### 基础

![基本界面](https://tva1.sinaimg.cn/large/006y8mN6ly1g878sj8ez0j31270u0mzr.jpg)

界面大概是这样, 通过修改 Title, Topic 和 Topic 下的 item 来定制自己想要的内容.

- Title 可以点击一旁的修改按钮进行修改
- 通过点击下方的 Add Topic 增加新的 Topic
- 在 item 处敲击回车可以在该 Topic 下增加一条新的 item
- 通过单击 Topic 或 item 右侧的删除按钮可以直接删掉该行(Topic 被删除时, 其下的 item 也会消失)
- 通过点击清空按钮可以清空所有的 Topic 和 item

当确定内容时, 可以生成格式如下的文字并加入剪贴板

```
TITLE

	TOPIC:

		1. XXXX
		2. XXXX
		3. XXXX

	TOPIC2:

		1. XXXX
		2. XXXX
```

> 这里的 `:` 和 itme 前的标号都是自动生成的, 所以不需要自己在 Topic 或者 item 中添加

### 更多玩法

#### 时间串

可以在 Topic 和 item 内插入 `[day=<time stirng>]` 来得到一个基于当前时间的格式化文字, 如 `[day=YYYY年M月D日]` 会生成 `2019年10月22日` 这样的文字(写该文的日期是 2019.10.22)

对于后面这个串的更多详细使用方式可以参照 day.js 的文档 [day.js-格式化](https://github.com/iamkun/dayjs/blob/dev/docs/zh-cn/API-reference.md#%E6%A0%BC%E5%BC%8F%E5%8C%96)

#### 单行

有时只是想在内容中插入一个说明的文字, 这时就可以添加一条 Topic , 然后不修改它的 item, 让它的 item 保持为空, 这时最后生成内容时, 这里就会被被判断为单行, 不插入 `:`

---

通过上面两条高阶玩法我们可以输入如下的内容

![高阶玩法](https://tva1.sinaimg.cn/large/006y8mN6ly1g87a62y1y7j30u00xitco.jpg)

并且点击完成后, 得到的结果是这样的

```
TITLE

	TOPIC:

		1. XXXX
		2. XXXX
		3. XXXX

	TOPIC2:

		1. XXXX
		2. XXXX

	完成时间: 2019年10月22日


	接下来的任务:

		1. XXXXXXXX
		2. XXXXXXXX
```


## TODO
- [x] 基础功能
- [X] 缓存周报清单
- [ ] 支持拖拽移动项目
- [ ] 🐳Docker 部署
- [ ] 更多模版