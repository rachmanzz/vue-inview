# vue-inview

## Tested

|chrome|firefox|
|------|-------|
|tested|tested|

## Releases version
- v1.0.1 [version 1.0.1]
  1. fix : undefined class
- v0.3.0 [version 0.3.0]
  1. fix : fix writen scripts
  2. add new comment style
## New Release
- v1.0.2 Beta
  1. animate.css combine
  2. toggle modifier
  3. improve writing script

## Install

    npm install --save vueinview
    or later version
    npm install --save rachmanzz/vue-inview


## Usage
### Vue Directive

    <element v-inview:on="methods"></element>
    <div v-inview:enter="methods"></div>
    <div v-inview:class="['className']"></div>
    <div v-inview:class="{'page':true}"></div>
    <div v-inview:style="{'background-color':'#eee'}"></div>

Directive argument & modifiers
- `on` → methods ~ on DOM element enter or leave
- `once` → methods ~ call one time only
 1. `once.leave` → methods
 2. `once.class` → array | object | string
 3. `once.class.leave` → array | object | string
 4. `once.style` → array | object
 5. `once.style.leave` → array | object
- `class` → array | object | string
 1. `class.leave` → array | object | string
- `style` → array | object
 1. `style.leave` → array | object
- `enter` → methods
- `leave` → methods

## Vue Instance

    const Inview = require('vueinview')
    /** or **/
    import Inview from 'vueinview'

    Vue.use(Inview)
    // v_inview.offset(/* offset */)
    // v_inview.threshold(/* threshold */)

    new Vue({
        el: '#app',
        methods:{
          methodName($v){
            /**
              * on and once argument only
                ~ el → dom element
            **/
            $v.enter = (el) => {
              /* logic code */
            }
            $v.exit = (el) => {
              /* logic code */
            }
          },
          methodName2(el){
            /**
              * enter or leave modifiers
                ~ el → dom element

                logic code here
            **/
          }
        }
      })

### class & style
  - class
    1. object : `{'classname': true}` add class if true, remove class if false
    2. string : `'classname'` add single class
    3. array : `['classname', 'classname2']` add many class
  - style
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
            this._$inview('#viewMe', {
                enter: (el) => {
                  el.style.backgroundColor = "#D93600";
                  console.log("DOM element entered")
                },

                exit: (el) => {
                  el.style.backgroundColor = "#000";
                  console.log("DOM element leave")
                }
              })
          }
        }
      )


## animate.css

### Usage
- Include stylesheet


      <head>
        <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
      </head>


### Directive

    <element v-inview:animate="'fadeIn'"></element>
    <div v-inview:animate="'fadeInDown'"></div>
### animation scope

  - First, define parent scope

      
        <div v-inview:parent="'animate'"></div>

  - Animate on scope


        <h2 :animate="'fadeIn'"></h2>
        <div :animate-toggle="'fadeIn'"></div>
        <div :animate-toggle-inverse="'fadeInLeft'"></div>
        <div :animate-toggle="['fadeIn', 'fadeOut']"></div>


## star
If you like vue-inview, just give me star on this reposite https://github.com/rachmanzz/vue-inview

## Credit
- this vue-inview base on https://github.com/camwiegert/in-view
- shortid module https://github.com/dylang/shortid
- animate module https://github.com/daneden/animate.css
