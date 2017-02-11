const inView = require('in-view'),
      shortid = require('shortid')
// check if is defined
const isDefine = (v) =>{return typeof v !== 'undefined'},
      isString = (v) =>{return typeof v === 'string'},
      isNumber = (v) =>{return typeof v === 'number'},
      isFunc   = (v) =>{return typeof v === 'function'},
      isArray  = (v) =>{return Array.isArray(v)},
      isObject = (v) =>{return !isArray(v) && typeof v === 'object'}

const objLength= (v) => {
  let result=0
  for(let key in v){
      v.hasOwnProperty(key) && result++
  }
  return result
}
// check if in object in array has same value
const hasObj_Array = (v,search,val) => {
  const defined = Object.create(null)
  defined.is = false
  defined.count = 0
  let length = v.length
  for(let i=0; i < length; i++){
    if(isDefine(v[i]) && isDefine(v[i][search])){
      if(isDefine(val) && v[i][search] === val){
        defined.is = true
        defined.count += 1
      }
    }
  }
  return defined
}
let countEntered = 0
let countExits = 0
// create element object
const createEl = Object.create(null)
createEl.$enter= []
createEl.$exits= []
createEl.enter = ''
createEl.exit = ''
// ######################################

// add element enter
const _element_enter = (el,classid) => {
  createEl.enter = el
  let cElm_exits =createEl.$exits.length
  // remove element if has exits
  for(let i=0;i < cElm_exits; i++){
    if(isDefine(createEl.$exits[i]) && isDefine(createEl.$exits[i]) && createEl.$exits[i].class === classid){
      createEl.$exits.splice(i,1)
    }
  }
  // push element enter
  if(!hasObj_Array(createEl.$enter,'class',classid).is) createEl.$enter.push({class:classid,el:el})
}
// add element exits
const element_exit = (el, classid) => {
  createEl.exit = el
  let cElm_enter =createEl.$enter.length
  // remove element if has enter
  for(let i=0;i < cElm_enter; i++){
    if(isDefine(createEl.$enter[i]) && isDefine(createEl.$enter[i].class) && createEl.$enter[i].class === classid){
      createEl.$enter.splice(i,1)
    }
  }
  // push element is exits
  if(!hasObj_Array(createEl.$exits,'class',classid).is) createEl.$exits.push({class:classid,el:el})

}

// define plugin
const vue_inview = () => {}
const _$eventview=(arg,classId,callback)=>{
  let view=inView('.'+classId)
  arg === 'on' ? view.on('enter',callback.enter).on('exit',callback.exit) :
  arg === 'once' ? view.once('enter',callback.enter).once('exit',callback.exit) :
  console.warn('[in-view] event handler not found')

}
const object_modifiers =($m)=>{
  let convert
  for(let key in $m){
    if($m.hasOwnProperty(key) && $m[key] === true){
      if(isDefine(convert)) convert +='.'+key
      else convert= key
    }
  }
  return convert
}

const object_class = (clss,el) =>{
  if(isString(clss)) el.classList.add(clss)
  if(isObject(clss)) {
    let classArr = el.className.split(' ')
    for(let key in clss){
      if(classArr.indexOf(key) && clss[key]===false) el.classList.remove(key)
      if(clss.hasOwnProperty(key) && clss[key]===true) el.classList.add(key)
    }
  }
  if(isArray(clss)){
    for(let i=0;i < clss.length; i++){
      el.classList.add(clss[i])
    }
  }
}
// define directive object
const _directObj = {
  inserted : (el,$bd) => {
    let classId = shortid.generate()
    el.classList.add(classId)
    //check arguments
    let ev = !isDefine($bd.arg) || $bd.arg !== 'once' ? isDefine($bd.arg) && $bd.arg !== 'on' ? 'undefined' : 'on' : 'once'
    let resview = Object.create(null)
    // check directive has value without argument or modifiers is null
    if(!isDefine($bd.arg) || objLength($bd.modifiers) === 0  && isDefine($bd.value)) isFunc($bd.value) && $bd.value(resview)

    _$eventview(ev,classId,{
      enter : (el)=>{
        // for magic properties
        countEntered += 1
        _element_enter(el,classId)
        // end magic properties
        if(objLength($bd.modifiers)>0 && isDefine($bd.value)){
          let $mdf = object_modifiers($bd.modifiers)
          if($mdf === 'enter') isFunc($bd.value) ? $bd.value(el) : console.warn('[in-view:${$bd.expression}] expression is not methods')
          $mdf === 'class' || $mdf === 'class.enter' && object_class($bd.value,el)
          //$mdf === 'style' || $mdf === 'style.enter' && object_style($bd.value,el)
        }
        // call function enter
        isDefine(resview.enter) && resview.enter(el)
      },
      exit : (el)=>{
        // for magic properties
        countExits += 1
        element_exit(el,classId)
        // end magic properties
        // check if has modifiers
        if(objLength($bd.modifiers)>0 && isDefine($bd.value)){
          let $mdf = object_modifiers($bd.modifiers)
          // leave modifiers
          if($mdf === 'leave') isFunc($bd.value) ? $bd.value(el) : console.warn('[in-view:${$bd.expression}] expression is not methods')
          // class leave modifiers
          $mdf === 'class.leave' && object_class($bd.value,el)
        }
        isDefine(resview.exit) && resview.exit(el)
      }
    })
  }
}
//has attribute
const hasAtt = (el,att)=>{
  let result = false
  if(/^\.[\w]+/.test(att)){
    let className = att.match(/^\.([\w]+)/)[1]
    let gClass=el.className.split(' ')
    if(gClass.indexOf(className)>-1){
      result = true
    }
  }
  if(/^\#[\w]+/.test(att)){
    let idName = att.match(/^\#([\w]+)/)[1]
    if(el.hasAttribute('id') && el.getAttribute('id')===idName) result = true
  }
  if(/^\[[\w]+=\"[\w]+\"\]$/.test(att)){
    let attr = att.match(/^\[([\w]+)=\"([\w]+)\"\]$/)
    let attName = attr[1]
    let attval = attr[2]
    if(el.hasAttribute(attName) && el.getAttribute(attName)===attval) result = true
  }
  if(/^\[[\w]+=\'[\w]+\'\]$/.test(att)){
    let attr = att.match(/^\[([\w]+)=\'([\w]+)\'\]$/)
    let attName = attr[1]
    let attval = attr[2]
    if(el.hasAttribute(attName) && el.getAttribute(attName)===attval) result = true
  }
  return result
}
//setTimeout
const updateLifeCycle=(update) =>{
  let sync=()=>{
    update()
    setTimeout(sync,0)
  }
  sync()
}
// define methods inview
const _$inview = ($arg,$opt) => {
  let lastEnter=0
  let lastExit=0
  updateLifeCycle(()=>{
    if(isDefine($opt) && isObject($opt) && isString($arg)){
      if(countEntered>lastEnter){
        isDefine($opt.enter) && hasAtt(createEl.enter,$arg)
         && $opt.enter(createEl.enter)
         lastEnter = countEntered
      }
      if(countExits>lastExit){
        isDefine($opt.exit) && hasAtt(createEl.exit,$arg)
         && $opt.exit(createEl.exit)
         lastExit = countExits
      }
    }
  })
}
// define directive
const _directive = ($vm) => {
  $vm.directive('inview',_directObj)
}
// define methods
const _$methods = ($vm) => {
  $vm.prototype._$inview = _$inview
}
const _install = (Vue, Option)=>{
  if(isDefine(Option) && isObject(Option)) inView.offset(Option);
  _directive(Vue)
  _$methods(Vue)
}
vue_inview.install = _install
vue_inview.threshold = (c) =>{
  inView.threshold(c)
}

module.exports = vue_inview
