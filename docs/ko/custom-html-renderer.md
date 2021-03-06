# π¨ Custom HTML Renderer

TOAST UI Editor(μ΄ν 'μλν°'λΌκ³  λͺμ)λ λ§ν¬λ€μ΄ νμ€νΈλ₯Ό HTML λ¬Έμμ΄λ‘ λ³ννκΈ° μν΄ `ToastMark`λΌλ μμ²΄ λ§ν¬ λ€μ΄ νμλ₯Ό μ¬μ©νλ€. `ToastMark`λ λ λ¨κ³λ‘ λ§ν¬λ€μ΄ νμ€νΈλ₯Ό λ³ννλ€.

1. λ§ν¬λ€μ΄ νμ€νΈλ₯Ό AST(Abstract Syntax Tree)λ‘ λ³ννλ€.
2. λ³νλ ASTλ₯Ό μννλ©° HTML λ¬Έμμ΄μ μμ±νλ€.

μ²« λ²μ§Έ λ¨κ³μμ ASTλ₯Ό μμ±ν  λ μ»€μ€ν°λ§μ΄μ§ μ΅μμ΄λ APIλ₯Ό μ κ³΅νλ κ²μ νμ± κ³Όμ  μμ²΄λ₯Ό μ¬μ©μκ° μ΄ν΄ν΄μΌ νλ―λ‘ μ΄λ €μ΄ μΌμ΄ λ  κ²μ΄λ€. νμ§λ§ μμ±λ ASTλ₯Ό μ¬μ©νμ¬ HTML λ¬Έμμ΄λ‘ λ³νν  λμλ HTML ν ν°νμ λν΄μλ§ μ΄ν΄νλ©΄ λκΈ° λλ¬Έμ μ¬μ©μκ° μ»€μ€ν°λ§μ΄μ§νκΈ° μ΄λ ΅μ§ μλ€. 

κ·Έλ κΈ° λλ¬Έμ μλν°μμλ λ λ²μ§Έ λ¨κ³(ASTλ₯Ό μ¬μ©νμ¬ HTML λ¬Έμμ΄λ‘ λ³ν)μμ μ»€μ€ν°λ§μ΄μ§ν  μ μλ μ΅μμ μ¬μ©μμκ² μ κ³΅νλ€. μ΄ μ΅μμ λ§ν¬λ€μ΄ νλ¦¬λ·°λΏλ§ μλλΌ λ§ν¬λ€μ΄μμ μμ§μ μλν°λ‘ μ»¨λ²νν  λμλ μ μ©μ΄ λλ€. λ€λ§ μλμ²λΌ λ΄λΆμ μΈ μ»¨λ²ν λ‘μ§μ λ€λ₯΄κ² λμνλ€.

* λ§ν¬λ€μ΄ νλ¦¬λ·°: μ»€μ€ν°λ§μ΄μ§ μ΅μμ μ μν **HTML ν ν°μ λ§ν¬λ€μ΄ HTML λ¬Έμμ΄μ μμ±ν  λ μ¬μ©λλ€**.
* λ§ν¬λ€μ΄ β μμ§μ μ»¨λ²ν: μ»€μ€ν°λ§μ΄μ§ μ΅μμ μ μν **HTML ν ν°μ μμ§μμ λΈλλ‘ λ³νλ  λ μ¬μ©λλ€**. μ΄ λ μμ§μ λΈλλ DOM λΈλκ° μλ μλν° λ΄λΆμ μΌλ‘ κ΄λ¦¬νλ μΆμνλ λͺ¨λΈ κ°μ²΄μ΄λ€.

## κΈ°λ³Έ μ¬μ© λ°©λ²

μλν°μμλ `customHTMLRenderer` μ΅μμΌλ‘ HTML λ¬Έμμ΄ λ³ν κ³Όμ μ μ»€μ€ν°λ§μ΄μ§ν  μ μλ€. μ΄ μ΅μμ key-value ννμ κ°μ²΄μ΄λ©°, κ°μ²΄μ ν€λ ASTμ λΈλ νμ, κ°μ AST λΈλλ₯Ό HTML ν ν°μΌλ‘ λ³ννμ¬ λ°ννλ ν¨μμ΄λ€.

λ€μ μ½λλ `customHTMLRenderer` μ΅μμ μ¬μ©νλ κΈ°λ³Έ μμμ΄λ€.

```js
const editor = new Editor({
  el: document.querySelector('#editor'),
  customHTMLRenderer: {
    heading(node, context) {
      return {
        type: context.entering ? 'openTag' : 'closeTag',
        tagName: 'div',
        classNames: [`heading-'${node.level}`]
      }
    },
    text(node, context) {
      const strongContent = node.parent.type === 'strong';
      return {
        type: 'text',
        content: strongContent ? node.literal.toUpperCase() : node.literal
      }
    },
    linebreak(node, context) {
      return {
        type: 'html',
        content: '\n<br />\n'
      }
    }
  }
});
```

λ§μ½ λ§ν¬λ€μ΄ νμ€νΈκ° μλμ κ°λ€λ©΄,

```markdown
## Heading
Hello
World
```

λ€μκ³Ό κ°μ΄ λ³νλλ€.

```html
<div class="heading2">HEADING</div>
<p>Hello<br><br>World</p>
```

## HTML ν ν°
 
μμ κΈ°λ³Έ μμμμ λ³Ό μ μλ―μ΄ κ° ν¨μλ HTML λ¬Έμμ΄μ μ§μ  λ°ννλ κ²μ΄ μλλΌ **ν ν° κ°μ²΄**λ₯Ό λ°ννλ€. ν ν° κ°μ²΄λ `ToastMark` λ΄λΆ λͺ¨λμ μν΄ HTML λ¬Έμμ΄λ‘ μλ λ³νλλ€. HTML νμ€νΈ λμ  ν ν°μ μ¬μ©νλ μ΄μ λ κ΅¬μ‘°μ μΈ μ λ³΄λ₯Ό λ΄μ κΈ°λ³Έ λμμ μ¬μ μνκ³  μ¬μ¬μ©ν  μ μκΈ° λλ¬Έμ΄λ€.

ν ν° κ°μ²΄μ μ¬μ©ν  μ μλ νμμ `openTag`, `closeTag`, `text`, `html` 4κ°μ§κ° μλ€.

### openTag

`openTag` ν ν°μ μ΄λ¦° νκ·Έ λ¬Έμμ΄μ λνλΈλ€. `openTag` ν ν°μ HTML λ¬Έμμ΄μ μμ±νκΈ° μν΄ `tagName`, `attributes`, `classNames` νλ‘νΌν°λ₯Ό κ°μ§κ³  μλ€. 

λ€μ μ½λμ²λΌ `openTag` κ°μ²΄ μ΅μμ μ§μ νλ€λ©΄,

```js
{
  type: 'openTag',
  tagName: 'a',
  classNames: ['my-class1', 'my-class2']
  attributes: {
    target: '_blank',
    href: 'http://ui.toast.com'
  }
}
```

μλμ κ°μ HTML λ¬Έμμ΄λ‘ λ³νλλ€.

```html
<a class="my-class1 my-class2" href="http://ui.toast.com" target="_blank">
```

λ§μ½ `<br />`κ³Ό `<hr />`μ²λΌ μμ²΄μ μΌλ‘ λ«κΈ° νκ·Έλ₯Ό μ§μ νκ³  μΆλ€λ©΄, `selfClose` μ΅μμ μ¬μ©νλ©΄ λλ€.

```js
{
  type: 'openTag',
  tagName: 'br',
  classNames: ['my-class'],
  selfClose: true
}
```

```html
<br class="my-class" />
```

### closeTag

`closeTag` ν ν°μ λ«λ νκ·Έ λ¬Έμμ΄μ λνλΈλ€. `closeTag` ν ν°μμλ `tagName` νλ‘νΌν°λ§ μ§μ νλ©΄ λλ€.

```js
{
  type: 'closeTag',
  tagName: 'a'
}
```

```html
</a>
```

### text

`text` ν ν°μ μΌλ° νμ€νΈ λ¬Έμμ΄μ λνλΈλ€. μ΄ ν ν°μλ `content` νλ‘νΌν°λ§ μ‘΄μ¬νλ©° μ΄ κ°μ μ΄μ€μΌμ΄ν μ²λ¦¬λμ΄ HTML νμ€νΈλ‘ μ¬μ©λλ€.

```js
{
  type: 'text',
  content: '<br />'
}
```

```html
&lt;br /&gt;
```

### html

`html` ν ν°μ HTML λ¬Έμμ΄μ μλ―Ένλ€. `text` ν ν°κ³Ό λ§μ°¬κ°μ§λ‘ `content` νλ‘νΌν°λ§ κ°μ§μ§λ§, μ΄μ€μΌμ΄ν μ²λ¦¬ μμ΄ κ·Έλλ‘ μ¬μ©λλ€. DOMμ `innerHTML` APIμ κ±°μ λμΌν μ­ν μ νλ€κ³  μ΄ν΄νλ©΄ λλ€.

```js
{
  type: 'html',
  content: '<br />'
}
```

```html
<br />
```

## Node

μ΅μμΌλ‘ μ§μ ν μ»¨λ²ν ν¨μμ μ²« λ²μ§Έ λ§€κ°λ³μλ `Node` κ°μ²΄μ΄λ€. μ΄ κ°μ²΄λ `ToastMark`μ μν΄ μμ±λ AST(Abstract Syntax Tree)μ μ£Όμ κ΅¬μ± μμμ΄λ€. λͺ¨λ  λΈλλ `parent`, `firstChild`, `lastChild`, `prev`, `next` λ± νΈλ¦¬λ₯Ό κ΅¬μ±νκΈ° μν κ³΅ν΅μ μμ±μ κ°μ§κ³  μλ€.

λν κ° λΈλλ νμμ λ°λ₯Έ κ³ μ ν νλ‘νΌν°κ° μλ€. μλ₯Ό λ€μ΄ `heading` λΈλλ ν€λ© μμμ λ λ²¨μ λνλ΄λ `level` νλ‘νΌν°κ° μκ³ , `link` λΈλμλ λ§ν¬ URLμ λνλ΄λ `destination` νλ‘νΌν°κ° μλ€.

μλ μμλ₯Ό λ³΄λ©΄ λ§ν¬λ€μ΄ νμ€νΈκ° ASTλ‘ λ³νλμμ λ μ΄λ ν κ΅¬μ‘°μΈμ§ νμν  μ μλ€.

```md
## TOAST UI
**Hello** World!
```

```js
{
  type: 'document',
  firstChild: {
    type: 'heading',
    level: 2,
    parent: //[document node],
    firstChild:
      type: 'text',
      parent: //[heading node],
      literal: 'TOAST UI'
    },
    next: {
      type: 'paragraph',
      parent: //[document node],
      firstChild: {
        type: 'strong',
        parent: //[paragraph node],
        firstChild: {
          type: 'text',
          parent: //[strong node],
          literal: 'Hello'
        },
        next: {
          type: 'text',
          parent: //[paragraph node],
          literal: 'World !'
        }
      }
    }
  }
}
```

ASTλ₯Ό κ΅¬μ±νλ κ° λΈλμ νμμ [μ΄ μ½λ](https://github.com/nhn/tui.editor/blob/master/libs/toastmark/src/commonmark/node.ts)μμ νμΈν  μ μλ€.

## Context

μλν°κ° ASTλ₯Ό μ¬μ©νμ¬ HTML λ¬Έμμ΄μ μμ±ν  λμλ μ μμν λ°©μμΌλ‘ λͺ¨λ  λΈλλ₯Ό νμνλ€. λΈλλ₯Ό λ°©λ¬Έν  λλ§λ€ λΈλμ νμκ³Ό λμΌν ν€ κ°μ κ°μ§ μ»¨λ²ν ν¨μκ° νΈμΆλλ©°, `context` κ°μ²΄λ μ»¨λ²ν ν¨μμ λ λ²μ§Έ λ§€κ°λ³μλ‘ μ£Όμ΄μ§λ€.

### entering

μλν°μμ [μ΄ ν¨μ](https://github.com/nhn/tui.editor/blob/master/libs/toastmark/src/commonmark/node.ts#L38)μ μ μλ λΈλ νμλ€μ ASTμ μν μ€ λ λ²μ© λ°©λ¬Ένλ€. μ²« λ²μ§Έλ ν΄λΉ λΈλλ‘ μνλ₯Ό μμν  λ λ°©λ¬Ένλ©°, λ λ²μ§Έλ λͺ¨λ  μμ λΈλλ€μ μνν ν λ°©λ¬Ένλ€. `context` κ°μ²΄μ `entering` νλ‘νΌν°λ₯Ό μ¬μ©νμ¬ μ»¨λ²ν ν¨μκ° νΈμΆλλ μμ μ μ μ μλ€.

λ€μ μ½λλ `entering` νλ‘νΌν°λ₯Ό μ¬μ©νλ μμμ΄λ€.

```js
const editor = new Editor({
  el: document.querySelector('#editor'),
  customHTMLRenderer: {
    heading({ level }, { entering }) {
      return {
        type: entering ? 'openTag' : 'closeTag',
        tagName: `h${level}`,
      }
    },
    text({ literal }) {
      return {
        type: 'text',
        content: node.literal
      }
    }
  }
});
```

`heading` λΈλμ μ»¨λ²ν ν¨μλ `context.entering` νλ‘νΌν°λ₯Ό μ¬μ©νμ¬ λ°νν  ν ν° κ°μ²΄μ νμμ κ²°μ νλ€. κ°μ΄ `true`μΌ λ `openTag`μ λ°ννμ¬, κ·Έλ μ§ μμΌλ©΄ `closeTag`λ₯Ό λ°ννλ€. `text` μ»¨λ²ν ν¨μλ λ¦¬ν λΈλμ΄κΈ° λλ¬Έμ ν λ²λ§ νΈμΆλλ―λ‘ `entering` μμ±μ μ¬μ©ν  νμκ° μλ€.

λ§μ½ λ€μ λ§ν¬λ€μ΄ νμ€νΈλ₯Ό μλν°μ μλ ₯νμ λ,

```markdown
# TOAST UI
```

`ToastMark`κ° μμ±ν ASTλ μλμ κ°λ€. (νΈμμ νμ νλ‘νΌν°λ§ κ°λ΅νκ² λνλ΄μλ€.)

```js
{
  type: 'document',
  firstChild: {
    type: 'heading',
    level: 1,
    firstChild: {
      type: 'text',
      literal: 'TOAST UI'
    }
  }
}
```

AST μνλ₯Ό λͺ¨λ λ§μΉλ©΄ μ§μ ν μ»¨λ²ν ν¨μμ κ²°κ³Όλ‘ λ°νλ ν ν°λ€μ΄ μλμ κ°μ λ°°μ΄ ννλ‘ μ μ₯λλ€.

```js
[
  { type: 'openTag', tagName: 'h1' },
  { type: 'text', content: 'TOAST UI' },
  { type: 'closeTag', tagName: 'h1' }
]
```

μ΅μ’μ μΌλ‘ μλν° λ΄λΆμμ ν ν° λ°°μ΄μ μ¬μ©νμ¬ HTML λ¬Έμμ΄λ‘ μμ±νλ€.

```html
<h1>TOAST UI</h1>
```

### origin()

λ§μ½ `customHTMLRenderer`λ‘ μ§μ ν ν¨μ μμμ μλ κΈ°μ‘΄μ μ»¨λ²ν ν¨μλ₯Ό μ¬μ©νκ³  μΆλ€λ©΄, `origin()` ν¨μλ₯Ό νΈμΆνμ¬ μ¬μ©ν  μ μλ€.

μλ₯Ό λ€μ΄ `link` λΈλμ λν΄ μλμ κ°μ HTML ν ν°μ λ°ννλ κΈ°μ‘΄μ μ»¨λ²ν ν¨μκ° μλ€κ³  κ°μ ν΄λ³΄μ.

#### `entering: true`μΈ κ²½μ°
```js
{
  type: 'openTag',
  tagName: 'a',
  attributes: {
    href: 'http://ui.toast.com',
    title: 'TOAST UI'
  }
}
```
#### `entering: false`μΈ κ²½μ°
```js
{
  type: 'closeTag',
  tagName: 'a'
}
```

μ΄ κ²½μ° μ§μ  μ μν μ»¨λ²ν ν¨μμμ `origin()` ν¨μλ₯Ό νΈμΆνμ¬ κΈ°μ‘΄μ μ μλ μ»¨λ²ν ν¨μλ₯Ό μ€νν  μ μλ€. μλ μ½λλ `origin()`(κΈ°μ‘΄ μ»¨λ²ν ν¨μ)μ νΈμΆνμ¬ λ°νλ HTML ν ν°μ `target="_blank"` μμ±μ μΆκ°μ μΌλ‘ μ€μ ν κ²μ΄λ€.


```js
const editor = new Editor({
  el: document.querySelector('#editor'),
  customHTMLRenderer: {
    link(node, context) {
      const { origin, entering } = context;
      const result = origin();
      if (entering) {
        result.attributes.target = '_blank';
      }
      return result;
    }
  },
}
```

#### `entering: true`μΈ κ²½μ°
```js
{
  type: 'openTag',
  tagName: 'a',
  attributes: {
    href: 'http://ui.toast.com',
    target: '_blank',
    title: 'TOAST UI'  
  }
}
```

## μ¬ν μ¬μ© λ°©λ²

### getChildrenText()

λλΆλΆμ κ²½μ° λΈλμ μ»¨λ²ν ν¨μμμ μμ λΈλμ νμ€νΈκ° νμνμ§ μμ κ²μ΄λ€. νμ§λ§ μ’μ’ μμ λΈλμ νμ€νΈλ₯Ό κ°μ Έμ μμ±μ μ€μ ν΄μΌ νλ κ²½μ°κ° μλ€. μ΄λ¬ν κ²½μ° `context` κ°μ²΄μ `getChildrenText()` ν¨μλ₯Ό μ¬μ©νλ©΄ μ μ©νλ€.

μλ₯Ό λ€μ΄ ν€λ© μμμ μμ μ½νμΈ λ₯Ό κΈ°μ€μΌλ‘ `id`λ₯Ό μ€μ νκ³  μΆλ€λ©΄ μλ μ½λμ²λΌ `getChildrenText()` ν¨μλ₯Ό μ¬μ©ν  μ μλ€.

```js
const editor = new Editor({
  el: document.querySelector('#editor'),
  customHTMLRenderer: {
    heading(node, { entering, getChildrenText }) {
      const tagName = `h${node.level}`;
      
      if (entering) {
        return {
          type: 'openTag',
          tagName,
          attributes: { 
            id: getChildrenText(node).trim().replace(/\s+/g, '-')
          }        
        }
      }
      return { type: 'closeTag', tagName };
    }
  }
});
```

λ€μκ³Ό κ°μ λ§ν¬λ€μ΄ νμ€νΈκ° μλ€λ©΄,

```markdown
# Hello *World*
```

`heading` μ»¨λ²ν ν¨μμμ `getChildrenText()` ν¨μμ λ°ν κ°μ `Hello World` λ¬Έμμ΄μ΄ λλ€. μ»¨λ²ν ν¨μμμλ κ³΅λ°± λ¬Έμλ₯Ό `-` λ¬Έμλ‘ μΉννκΈ° λλ¬Έμ μ΅μ’ HTML λ¬Έμμ΄μ μλμ κ°λ€.

```html
<h1 id="Hello-World">Hello <em>World</em></h1>
```

### skipChildren()

`skipChildren()` ν¨μλ₯Ό νΈμΆνλ©΄ μμ λΈλμ μνλ₯Ό κ±΄λλ΄λ€. μμ λΈλμ μ½νμΈ λ₯Ό λ³ννμ§ μκ³  νμ¬ λΈλμ μμ±λ§ μ¬μ©νμ¬ μ½νμΈ λ‘ μ¬μ©νκ³  μΆμ λ μ μ©νλ€.

μλ₯Ό λ€μ΄ `image` λΈλμλ μ΄λ―Έμ§μ μ€λͺμ λνλ΄λ μμ λΈλκ° μ‘΄μ¬νλ€. κ·Έλ¬λ `image` λΈλλ₯Ό HTMLλ‘ νννλ `img` μμλ μμ μμλ₯Ό κ°μ§ μ μλ€. κ·Έλ κΈ° λλ¬Έμ `image` λΈλμ μμ λΈλκ° λΆνμν HTML λ¬Έμμ΄λ‘ λ³νλμ§ μλλ‘ `skipChildren()` ν¨μλ₯Ό νΈμΆν΄μΌ νλ€. λ§μ½ μμ λΈλμ μ½νμΈ κ° νμνλ€λ©΄ μμ λ³΄μλ `getChildrenText()`λ₯Ό νΈμΆνμ¬ μ¬μ©ν  μ μλ€. μ΄λ¬ν μμ λΈλμ μ½νμΈ λ `img` μμμ `alt` μμ±μΌλ‘ μ€μ ν  μ μλ€.

λ€μ μ½λλ μλν°μ λ΄μ₯λ `image` λΈλ μ»¨λ²ν° ν¨μμ μμμ΄λ€.

```js
function image(node, context) {
  const { destination } = node;
  const { getChildrenText, skipChildren } = context;

  skipChildren();

  return {
    type: 'openTag',
    tagName: 'img',
    selfClose: true,
    attributes: {
      src: destination,
      alt: getChildrenText(),
    }
  }
}
```

### λ€μ€ νκ·Έ μ¬μ©

μ»¨λ²ν ν¨μμμλ λ°°μ΄ ννμ ν ν°μ λ°νν  μ μλ€. μ΄κ²μ λΈλλ₯Ό μ€μ²©λ HTML κ΅¬μ‘°λ‘ λ³ννλ €λ κ²½μ°μ μ μ©νλ€. λ€μ μ½λλ `codeBlock` λΈλλ₯Ό `<pre><code>...</code></pre>` νκ·Έ λ¬Έμμ΄λ‘ λ³ννλ μμμ΄λ€.

```js
function codeBlock(node) {
  return [
    { type: 'openTag', tagName: 'pre', classNames: ['code-block'] },
    { type: 'openTag', tagName: 'code' },
    { type: 'text', content: node.literal },
    { type: 'closeTag', tagName: 'code' },
    { type: 'closeTag', tagName: 'pre' }
  ];
}
```

### κ°ν μΆκ°

μΌλ°μ μΈ κ²½μ° μ΅μ’μ μΌλ‘ λ³νλ HTML λ¬Έμμ΄μ ν¬λ§·μ μ κ²½ μΈ νμκ° μλ€. κ·Έλ¬λ `ToastMark`λ [CommonMark Spec](https://spec.commonmark.org/0.29/)μ μ€μνκΈ° λλ¬Έμ κ°νμ μ μ΄νλ μ΅μμ μ§μν΄μΌλ§ νλ€.([κ³΅μ νμ€νΈ λ°μ΄ν°](https://spec.commonmark.org/0.29/spec.json))

μ»¨λ²ν ν¨μμ ν ν° κ°μ²΄μ `outerNewline`κ³Ό `innerNewline` νλ‘νΌν°λ₯Ό μΆκ°νμ¬ κ°νμ μ μ΄ν  μ μλ€.

#### ν ν° λ°°μ΄
```js
[
  {
    type: 'text',
    content: 'Hello'
  },
  { 
    type: 'openTag',
    tagName: 'p',
    outerNewLine: true,
    innerNewLine: true
  },
  {
    type: 'html',
    content: '<strong>My</strong>',
    outerNewLine: true,
  },
  {
    type: 'closeTag',
    tagName: 'p',
    innerNewLine: true
  },
  {
    type: 'text',
    content: 'World'
  }
]
```

#### λ³νλ HTML λ¬Έμμ΄
```html
Hello
<p>
<strong>My</strong>
</p>World
```

μμ μμμμ λ³Ό μ μλ―μ΄ `openTag`μ `outerNewLine` νλ‘νΌν°λ μ¬λ νκ·Έ λ¬Έμμ΄ μμ μ μ `\n` λ¬Έμλ₯Ό μΆκ°νλ€. λ§μ½ `closeTag`μ `outerNewLine` νλ‘νΌν°κ° μλ€λ©΄ λ«λ νκ·Έ λ¬Έμμ΄ μ΄νμ `\n` λ¬Έμλ₯Ό μΆκ°νλ€. μ΄μ λ°λλ‘, `openTag`μ `innerNewLine` νλ‘νΌν°λ μ¬λ νκ·Έ λ¬Έμμ΄ μ΄νμ `\n` λ¬Έμλ₯Ό μΆκ°νλ€. λ§μ½ `closeTag`μ `innerNewLine` νλ‘νΌν°κ° μλ€λ©΄ λ«λ νκ·Έ λ¬Έμμ΄ μμ μ μ `\n` λ¬Έμλ₯Ό μΆκ°νλ€.

μ°μλ κ°νμ΄ μλ κ²½μ° μ€λ³΅μ λ§κΈ° μν΄ νλμ κ°νμΌλ‘ λ³ν©λλ€.
