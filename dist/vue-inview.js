var inView = require('in-view'),
      shortid = require('shortid')
// check if is defined
var isDefine = (v) =>{return typeof v !== 'undefined'},
      isString = (v) =>{return typeof v === 'string'},
      isNumber = (v) =>{return typeof v === 'number'},
      isFunc   = (v) =>{return typeof v === 'function'},
      isArray  = (v) =>{return Array.isArray(v)},
      isObject = (v) =>{return !isArray(v) && typeof v === 'object'}

var hasKey = (obj,src) =>{
  var result = false
  for(key in obj){
    if(obj.hasOwnProperty(key) && key === src) result=true
  }
  return result
}

var objLength= (v) => {
  var result=0
  for(let key in v){
      v.hasOwnProperty(key) && result++
  }
  return result
}

// check if in object in array has same value
var hasObj_Array = (v,search,val) => {
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
var countEntered = 0
var countExits = 0
// create element object
var createEl = Object.create(null)
createEl.$enter= []
createEl.$exits= []
createEl.enter = ''
createEl.exit = ''
createEl.register = []
createEl.values={}
// add element enter
var _element_enter = (el,classid) => {
  createEl.enter = el
  var cElm_exits =createEl.$exits.length
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
var element_exit = (el, classid) => {
  createEl.exit = el
  var cElm_enter =createEl.$enter.length
  // remove element if has enter
  for(let i=0;i < cElm_enter; i++){
    if(isDefine(createEl.$enter[i]) && isDefine(createEl.$enter[i].class) && createEl.$enter[i].class === classid){
      createEl.$enter.splice(i,1)
    }
  }
  // push element is exits
  if(!hasObj_Array(createEl.$exits,'class',classid).is) createEl.$exits.push({class:classid,el:el})

}

var cssjs=(css)=>{
  css=css.split('-')
  var result = css[0] === 'float' ? 'cssFloat' : css[0]
  var size = css.length
  if( size > 1 ) {
    for(let i=0; i < size; i++){
      if(i > 0) result += css[i].charAt(0).toUpperCase() + css[i].substr(1)
    }
  }
  return result
}

// define plugin
var vue_inview = () => {}

// inview handler
var _$eventview=(arg,classId,callback)=>{
  var view=inView('.'+classId)
  arg === 'on' ? view.on('enter',callback.enter).on('exit',callback.exit) :
  arg === 'once' ? view.once('enter',callback.enter).once('exit',callback.exit) :
  console.warn('[in-view] event handler not found')
}

// object modifiers
var object_modifiers =($m)=>{
  var convert
  for(let key in $m){
    if($m.hasOwnProperty(key) && $m[key] === true){
      if(isDefine(convert)) convert +='.'+key
      else convert= key
    }
  }
  return convert
}

// validate argument
var $arg=(arg)=>{
  var result
  switch (arg) {
    case 'on':
      result = arg
      break;
    case 'once':
      result = arg
      break;
    case 'class':
      result = arg
      break;
    case 'style':
      result = arg
      break;
    case 'enter':
      result = arg
      break;
    case 'leave':
      result = arg
      break;
    default:
      console.warn('[in-view] argument ${arg} undefined');
  }
  return result
}

//default action
var defaultAction = (bidd,callback) => {
  if(!isDefine(bidd.arg)) callback()
  if(bidd.arg === 'on' || bidd.arg === 'once' && objLength(bidd.modifiers) === 0) callback()
}

// add / remove class
var object_class = (clss,el) =>{
  if(isString(clss)) el.classList.add(clss)
  if(isObject(clss)) {
    var classArr = el.className.split(' ')
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

// add / remove style
var object_style = (css,el) =>{
  var style = el.style
  if(isObject(css)){
    for(let key in css){
      if(isDefine(style[cssjs(key)])) style[cssjs(key)] = css[key]
    }
  }
  if(isArray(css)){
    var size = css.length
    for(let i=0; i < size; i++){
      if(isDefine(style[cssjs(css[i])])) style[cssjs(css[i])] = ""
    }
  }
}

//element inview
var _$elinview = (el,$bd)=>{

  // generate class indetities
  var classId = shortid.generate()

  var elSize = el.classList.length

  // register class element
  el.classList.add(classId)
  // if directive value not registed
  if(!hasKey(createEl.values,classId) && isDefine($bd.value)) createEl.values[classId] = $bd.value

  // register handler
  var regHdlr = !isDefine($bd.arg) ? 'on' : isDefine($arg($bd.arg)) && $arg($bd.arg) === 'once' ? 'once' : isDefine($arg($bd.arg)) ?
                'on' : 'undefined'

  // object function on enter and exit
  var funcEvent = Object.create(null)

  // default event handler
  defaultAction($bd,()=>{
    if(isDefine(createEl.values[classId]) && isFunc(createEl.values[classId])) createEl.values[classId](funcEvent)
  })

  var _$arg = isDefine($arg($bd.arg)) && $arg($bd.arg) !== 'on' || $arg($bd.arg) === 'once' ? $arg($bd.arg) : 'undefined'
  _$eventview(regHdlr,classId,{
    enter : (el)=>{

      var elvalue
      // check the value of the directive has been registered
      if(hasKey(createEl.values,classId)) elvalue = createEl.values[classId]

      // for magic properties
      countEntered += 1
      _element_enter(el,classId)
      // end magic properties
      if(_$arg !== 'undefined' && objLength($bd.modifiers)===0 && isDefine(elvalue)){
          _$arg === 'class' && object_class(elvalue,el)
          _$arg === 'style' && object_style(elvalue,el)
          if(_$arg === 'enter') isFunc(elvalue) ? elvalue(el) : console.warn('[in-view:${$bd.expression}] invalid method')
      }

      if(_$arg === 'on' || _$arg === 'once' && objLength($bd.modifiers)>0 && isDefine(elvalue)){
        // register modifiers
        let $mdf = object_modifiers($bd.modifiers)
        // modifiers enter
        if($mdf === 'enter') isFunc(elvalue) ? elvalue(el) : console.warn('[in-view:${$bd.expression}] invalid method')
        // modifiers class
        $mdf === 'class' && object_class(elvalue,el)
        // modifiers style
        $mdf === 'style' && object_style(elvalue,el)
      }

      isDefine(funcEvent.enter) && funcEvent.enter(el)
    },
    exit : (el)=>{

      var elvalue
      // check the value of the directive has been registered
      if(hasKey(createEl.values,classId)) elvalue = createEl.values[classId]

      // for magic properties
      countExits += 1
      element_exit(el,classId)
      // end magic properties

      if(_$arg !== 'undefined' && isDefine(elvalue)){
        if(_$arg === 'leave' && objLength($bd.modifiers)===0) isFunc(elvalue) ? elvalue(el) : console.warn('[in-view:${$bd.expression}] invalid method')

        if(objLength($bd.modifiers) > 0 && object_modifiers($bd.modifiers) === 'leave'){
          _$arg === 'class' && object_class(elvalue,el)
          _$arg === 'style' && object_style(elvalue,el)
        }

      }
      // check if has modifiers
      if(_$arg === 'on' || _$arg === 'once' && objLength($bd.modifiers)>0 && isDefine(elvalue)){
        // register modifiers
        let $mdf = object_modifiers($bd.modifiers)
        // modifiers leave
        if($mdf === 'leave') isFunc(elvalue) ? elvalue(el) : console.warn('[in-view:${$bd.expression}] invalid method')
        // leave : class modifiers
        $mdf === 'class.leave' && object_class(elvalue,el)
        // leave : style modifiers
        $mdf === 'style.leave' && object_style(elvalue,el)
      }

      isDefine(funcEvent.exit) && funcEvent.exit(el)
    }
  })
}

// define directive object
var _directObj = {
  inserted : (el,$bd) => {
    _$elinview(el,$bd)
  },
  componentUpdated:(el,$bd)=>{
    var elSize = el.classList.length
    var getclass
    // check the class has been registered
    for(let i=0;i<elSize;i++){
      if(createEl.register.indexOf(el.classList[i]) > -1) getclass = el.classList[i]
    }
    if(isDefine(getclass) && isDefine($bd.value)) createEl.values[getclass] = $bd.value
  }
}

//has attribute
var hasAtt = (el,att)=>{
  var result = false
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
var updateLifeCycle=(update) =>{
  let sync=()=>{
    update()
    setTimeout(sync,0)
  }
  sync()
}
// define methods inview
var _$inview = ($arg,$opt) => {
  var lastEnter=0
  var lastExit=0
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
var _directive = ($vm) => {
  $vm.directive('inview',_directObj)
}
// define methods
var _$methods = ($vm) => {
  $vm.prototype._$inview = _$inview
}
var _install = (Vue, Option)=>{
  if(isDefine(Option) && isObject(Option)) inView.offset(Option);
  _directive(Vue)
  _$methods(Vue)
}

vue_inview.install = _install

vue_inview.threshold = (c) =>{
  inView.threshold(c)
}

vue_inview.offset = (c) => {
  inView.offset(c)
}

module.exports = vue_inview
