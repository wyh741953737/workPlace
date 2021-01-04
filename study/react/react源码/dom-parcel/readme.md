1)使用parcel构建项目
  全局安装 cnpm i parcel-bundler -g
2) 安装babel插件，
    cnpm i babel-core babel-preset-env babel-plugin-transform-react-jsx --save-dev
3) 创建.babelrc文件，配置
    ```
    {
        "presets": ["env"],
        "plugins": [
            ["transform-react-jsx", {
                "prama": "React.createElement"
            }]
        ]
    }
    ```
4) 增加script，启动命令
