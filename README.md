[![GitHub issues](https://img.shields.io/github/issues/rachmanzz/vue-inview.svg)](https://github.com/rachmanzz/vue-inview/issues)
[![GitHub forks](https://img.shields.io/github/forks/rachmanzz/vue-inview.svg)](https://github.com/rachmanzz/vue-inview/network)
[![GitHub stars](https://img.shields.io/github/stars/rachmanzz/vue-inview.svg)](https://github.com/rachmanzz/vue-inview/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/rachmanzz/vue-inview/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/rachmanzz/vue-inview.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)
[![HitCount](http://hits.dwyl.io/rachmanzz/rachmanzz/vue-inview.svg)](http://hits.dwyl.io/rachmanzz/rachmanzz/vue-inview)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/rachmanzz/vue-inview/issues)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/vue-inview/)
# vue-inview

## Tested

|chrome|firefox|edge|
|------|-------|------|
|tested|tested|tested|

## Releases version
- v1.0.5
  1. add : add class prefix
- v1.0.4 Beta
  1. fix : classList for old browser
- v1.0.3 Beta
  1. fix : _$mdf is not defined

## New Release
- v1.0.6-beta.1
  1. add : add inview component



## Install
  - latest

      `npm install --save vueinview`
  - beta

      `npm install --save vueinview@1.0.6-beta.1`

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
    // Inview.offset(/* offset */)
    // Inview.threshold(/* threshold */)

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

## Inview offset & threshold
  - offset
    value type : number or object
  - threshold
    value type : only number and range between 0 - 1

readmore in https://github.com/camwiegert/in-view#inviewoffsetoffset

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

  check sample here https://rachmanzz.github.io/vue-inview/

### Components [new]
  - Import component
      - `import inview from 'vueinview/components/Inview'`
  - Bind Attribute
      - enter → function → optional
      - leave → function → optional
  - slot
      - name: inview
      - slot-scope
          - action → text
              - ``
              - `enter`
              - `leave`
          - hasEnter → boolean
          - hasLeave → boolean
  - usage


        <inview>
          <template slot="inview" slot-scope="{ action, hasEnter, hasLeave }">
            <div>{{action === 'enter' ? 'element entered': ''}}</div>
          </template>
        </inview>

  


## star
If you like vue-inview, just give me star on this reposite https://github.com/rachmanzz/vue-inview

## Gitter Chat
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/vue-inview/)
Learn, Ask, and give a solution problem

## Credit
- this vue-inview base on https://github.com/camwiegert/in-view
- shortid module https://github.com/dylang/shortid
- animate module https://github.com/daneden/animate.css
