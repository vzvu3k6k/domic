# domic

Wraps a tree from DomHandler of [htmlparser2](https://www.npmjs.com/package/htmlparser2) and provides `getAttribute`, `textContent`, `querySelector` and `querySelectorAll`.

```js
import Document from '@vzvu3k6k/domic'
import htmlparser from 'htmlparser2'

let html = '<html><body><p class="foo">Hello, <i>domic</i>.</p></body></html>'
let plainAst = htmlparser.parseDOM(html)
let document = new Document(plainAst)

let body = document.querySelector('html > body')
let p = body.querySelectorAll('p')[0]
console.log(p.getAttribute('class')) // "foo"
console.log(p.textContent) // "Hello, domic."
```

`querySelector` and `querySelectorAll` are powered by [css-selector](https://www.npmjs.com/package/css-selector).

## See Also

- [jsdom](https://www.npmjs.com/package/jsdom): A JavaScript implementation of the DOM and HTML standards
- [cheerio](https://www.npmjs.com/package/cheerio): jQuery-like DOM manipulation and traversing
