# visual studio code 常用功能说明

## 常用快捷键

### 编辑器与窗口管理

1. 打开一个新窗口： Ctrl+Shift+N
2. 关闭窗口： Ctrl+Shift+W
3. 新建文件： Ctrl+N
4. 文件之间切换： Ctrl+Tab
5. 切出一个新的编辑器（最多 3 个）： Ctrl+\
6. 左中右 3 个编辑器的快捷键： Ctrl+1 Ctrl+2 Ctrl+3

### 代码编辑

#### 格式调整

1. 代码行缩进： Ctrl+[ 、 Ctrl+]
2. 复制或剪切当前行/当前选中内容 Ctrl+C 、 Ctrl+V
3. 代码格式化： Shift+Alt+F，或 Ctrl+Shift+P 后输入 format code
4. 上下移动一行： Alt+Up 或 Alt+Down
5. 向上向下复制一行： Shift+Alt+Up 或 Shift+Alt+Down
6. 在当前行下边插入一行 Ctrl+Enter
7. 在当前行上方插入一行 Ctrl+Shift+Enter

#### 光标相关

1. 移动到行首： Home
2. 移动到行尾： End
3. 移动到文件结尾： Ctrl+End
4. 移动到文件开头： Ctrl+Home
5. 移动到定义处： F12
6. 定义处缩略图：只看一眼而不跳转过去 Alt+F12
7. 移动到后半个括号： Ctrl+Shift+]
8. 选择从光标到行尾： Shift+End
9. 选择从行首到光标处： Shift+Home
10. 删除光标右侧的所有字： Ctrl+Delete
11. 扩展/缩小选取范围： Shift+Alt+Left 和 Shift+Alt+Right
12. 多行编辑(列编辑)：Alt+Shift+鼠标左键，Ctrl+Alt+Down/Up
13. 同时选中所有匹配： Ctrl+Shift+L

#### 重构代码

1. 找到所有的引用： Shift+F12
2. 同时修改本文件中所有匹配的： Ctrl+F12

#### 查找替换

1. 查找 Ctrl+F
2. 查找替换 Ctrl+H
3. 整个文件夹中查找 Ctrl+Shift+F

#### 显示相关

1. 全屏：F11
2. 侧边栏显/隐：Ctrl+B
3. 显示资源管理器 Ctrl+Shift+E
4. 显示搜索 Ctrl+Shift+F
5. 显示 Git Ctrl+Shift+G
6. 显示 Debug Ctrl+Shift+D
7. 显示 Output Ctrl+Shift+U

## 插件的安装卸载

### 安装

1. 点击 Extensions 图标或 Ctrl+Shift+X,在搜索栏中搜索要安装的插件
2. 点击"install",几秒之后该按钮变为"uninstall",即安装成功

### 卸载

1. 点击 Extensions 图标或 Ctrl+Shift+X,找到要卸载的插件
2. 选中插件，单击进入该插件的信息界面，点击"uninstall"按钮卸载;或选中插件，点击右侧的设置图标，点击卸载选项。

## 在 visual studio code 中使用 Git

1. 在 GitHub 创建一个仓库 "mfs-homework"
2. 打开 VSCode 终端，输入：
   echo "mfs-homework">>README.md
   git init
   git add README.md
   git commit -m "first commit"
   git remote add origin https://github.com/laihl-hub/mfs-homework.git
   git push -u origin master
3. 在 git 的工作区中点击"+"号提交到暂提交区
4. 按提示输入提交信息，按 Ctrl+enter 提交
5. 把所有暂存的代码 push 到云端
