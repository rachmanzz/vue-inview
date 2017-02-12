# vue-inview Beta

## Releases version

- v0.2.2 [Later version](https://github.com/rachmanzz/vue-inview)
  1. fix: bugs modifiers leave
- v0.2.1 
  1. eliminate some modifiers
  2. add style argument & modifiers
  3. on element updated in-view
- v0.1.5 [version 0.1.5](https://github.com/rachmanzz/vue-inview/tree/v0.1.5)
  1. bugs fix const & let global variable


## Install

    npm install --save vueinview
    or later version
    npm install --save rachmanzz/vue-inview


## Usage
### Vue Directive

    <element v-inview="methods"></element>
    <div v-inview:enter="methods"></div>
    <div v-inview:class="['className']"></div>
    <div v-inview:class="{'page':true}"></div>
    <div v-inview:style="{'background-color':'#eee'}"></div>

Directive argument & modifiers
- `on` : call on DOM element enter or exit -> value : methods
- `once` : call one time only -> value : methods
 1. `once.leave`
 2. `once.class`
 3. `once.class.leave`
 4. `once.style`
 5. `once.style.leave`
- `class` add and remove class -> value : object, array, single string
 1. `class.leave`
- `style`
 1. `style.leave` add and remove -> value : object [add], array [remove]
- `enter` on DOM element is enter -> value : methods
- `leave` on DOM element is leave -> value : methods

## Vue Instance

    const v_inview = require('vueinview')
    // or
    import v_inview from 'vueinview'

    Vue.use(v_inview)
    // v_inview.offset(/* offset */)
    // v_inview.threshold(/* threshold */)

    new Vue({
        el:'#app',
        methods:{
          methodName($v){
            // methods for on, once or without argument
            $vi.enter =(el)=>{ // el = element DOM
              /* logic code */
            }
            $vi.exit =(el)=>{
              /* logic code */
            }
          },
          methodName2(el){
            // for enter or leave argument
            /* logic code */
          }
        }
      })

### class & style
  - class
    1. object : `{'classname':true}` add class if true, remove class if false
    2. string : `'classname'` add single class
    3. array : `['classname','classname2']` add many class
  -style
    1. object : `{'background-color': '#eee', 'color':'#000'}` add style
    2. array : `['background-color']` remove style



# Other Way
### Magic properties    
### set Vue Directive

    <div id="viewMe" v-inview>text or other element</div>

## Vue Instance

    new Vue(
        {
          el : '#app',
          mounted(){
            // magic properties
            this._$inview('#viewMe',{
                enter:(el)=>{
                  el.style.backgroundColor = "#D93600";
                  console.log("is enter name")
                },


                exit:(el)=>{
                  el.style.backgroundColor = "#000";
                  console.log("is exit name")
                }
              })


          }
        }
      )

#credit
- this vue-inview base on https://github.com/camwiegert/in-view
- shortid module https://github.com/dylang/shortid
