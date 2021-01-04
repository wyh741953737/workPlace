### collection是html元素的集合
### NodeList是文档节点的集合

- NodeList和collection集合基本相同，两者都是类数组的对象集合
- 他们都有定义集合（列表）中项目数的length属性
- 都可以通过0，1，2...索引访问数组那样访问每个项目
- 访问html collection可以通过它们的索引号，名称，id
- 访问NodeList只能通过索引号，只有NodeList包含属性节点和文本节点

所有浏览器都会为childNode返回NodeList对象

### 增删节点
1：增加节点： document.createElement('p') | document.createTextNode('文本节点')
2:追加节点： 像元素后面追加： element.appendChild(newEle);  像元素前面追加： element.inertBefore(element, newEle)
3: 删除已有节点： element.removeChild(child) , 
- 能够不引用父元素删除是好的，但是dom需要同时了解你需要删除的元素及其父元素，常见方法：parentNode找到父元素

替换html元素：replaceChild（newChild， oldChild）

### getElementByTagName方法返回collection对象
html collection是类数组的元素的集合