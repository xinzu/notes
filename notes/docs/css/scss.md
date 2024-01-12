http://course.tpframe.com/mind/front_sass_index.html

## 语法嵌套规则

### 选择器嵌套

```scss
.container {
    width: 1200px;
    margin: 0 auto;
    .header {
        height: 90px;
        line-height: 90px;
        .log {
            width: 100px;
            height: 60px;
        }
    }
    .center {
        height: 600px;
        background-color: #F00;
    }
    .footer {
        font-size: 16px;
        text-align: center;
    }
}
```

### 父选择器 &

```scss
.container {
    width: 1200px;
    margin: 0 auto;
    a {
        color: #333;
        &:hover {
            text-decoration: underline;
            color: #F00;
        }
    }
    .top {
        border: 1px #f2f2f2 solid;
        &-left {
            float: left;
            width: 200px;
        }
    }
}
```

### 属性嵌套

```scss
.container {
    a {
        color: #333;
        font: {
            size: 14px;
            family: sans-serif;
            weight: bold;
        }
    }
}
```

## 变量

````scss
$font-size:14px;
.container {
    font-size: $font-size;
}
````

**定义规则**

1. 变量以美元符号($)开头，后面跟变量名

2. 变量名是不以数字开头的可包含字母、数字、下划线、中划线

3. 变量一定要先定义，后使用

4. 中划线和下划线定义的同名变量为同一变量

   ```scss
   $font-size:14px;
   $font_size:16px;
   ```

5. 局部变量和全局变量

   - 选择器外定义的为全局变量

   - 选择器内定义的为局部变量；如果加了 !global，则表示全局变量

## 导入 @import
