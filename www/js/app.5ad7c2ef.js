(function(e){function t(t){for(var r,i,s=t[0],c=t[1],l=t[2],v=0,p=[];v<s.length;v++)i=s[v],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&p.push(a[i][0]),a[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(p.length)p.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,s=1;s<n.length;s++){var c=n[s];0!==a[c]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},a={app:0},o=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";n("85ec")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-main",[n("router-view",{attrs:{transition:"fade-transition"}})],1),n("v-bottom-navigation",{staticClass:"dark",attrs:{grow:"",height:"52",mandatory:"",color:"red"},model:{value:this.$router.currentRoute.name,callback:function(t){e.$set(this.$router.currentRoute,"name",t)},expression:"this.$router.currentRoute.name"}},[n("v-btn",{attrs:{"x-large":"",value:"Dashboard",href:"/"}},[n("span",[e._v("Dashboard")]),n("v-icon",[e._v("mdi-view-dashboard-variant")])],1),n("v-btn",{attrs:{"x-large":"",value:"Live",href:"/live"}},[n("span",[e._v("Live")]),n("v-icon",[e._v("mdi-chart-bell-curve")])],1),n("v-btn",{attrs:{"x-large":"",value:"History",href:"/history"}},[n("span",[e._v("History")]),n("v-icon",[e._v("mdi-clock")])],1),n("v-btn",{attrs:{"x-large":"",value:"Settings",href:"/settings"}},[n("span",[e._v("Settings")]),n("v-icon",[e._v("mdi-cog")])],1)],1)],1)},o=[],i={},s=i,c=(n("034f"),n("2877")),l=n("6544"),u=n.n(l),v=n("7496"),p=n("b81c"),f=n("8336"),d=n("132d"),h=n("f6c4"),m=Object(c["a"])(s,a,o,!1,null,null,null),b=m.exports;u()(m,{VApp:v["a"],VBottomNavigation:p["a"],VBtn:f["a"],VIcon:d["a"],VMain:h["a"]});var w=n("8c4f"),g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-row",[n("v-col",[n("h1",{staticClass:"text-center"},[e._v("'Sprofiler")])])],1)],1)},y=[],_={name:"dashboard",components:{}},x=_,V=n("62ad"),O=n("a523"),j=n("0fd9"),C=Object(c["a"])(x,g,y,!1,null,null,null),S=C.exports;u()(C,{VCol:V["a"],VContainer:O["a"],VRow:j["a"]});var $=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-row",[n("v-col",{staticClass:"text-center"},[n("h1",[e._v("Live Pressure Data")])])],1),n("v-row",[n("v-col")],1)],1)},P=[],k={name:"live",components:{},data:function(){return{}}},R=k,E=Object(c["a"])(R,$,P,!1,null,null,null),M=E.exports;u()(E,{VCol:V["a"],VContainer:O["a"],VRow:j["a"]});var D=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-row",[n("v-col",[n("h1",[e._v("hiwwstowwy!")])])],1)],1)},L=[],T={name:"history",components:{}},H=T,B=Object(c["a"])(H,D,L,!1,null,null,null),J=B.exports;u()(B,{VCol:V["a"],VContainer:O["a"],VRow:j["a"]});var A=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("v-row",[n("v-col",[n("h1",[e._v("Seddings uwu")])])],1)],1)},I=[],N={name:"settings",components:{}},q=N,z=Object(c["a"])(q,A,I,!1,null,null,null),F=z.exports;u()(z,{VCol:V["a"],VContainer:O["a"],VRow:j["a"]}),r["a"].use(w["a"]);var G=[{path:"/",name:"Dashboard",component:S},{path:"/live",name:"Live",component:M},{path:"/history",name:"History",component:J},{path:"/settings",name:"Settings",component:F},{path:"*",redirect:"/dash",meta:{transitionType:"fade"}}],K=new w["a"]({mode:"history",base:"/",routes:G}),Q=K,U=n("2f62");r["a"].use(U["a"]);var W=new U["a"].Store({state:{},mutations:{},actions:{},modules:{}}),X=n("f309");r["a"].use(X["a"]);var Y=new X["a"]({theme:{dark:!1}});r["a"].config.productionTip=!1,new r["a"]({router:Q,store:W,vuetify:Y,render:function(e){return e(b)}}).$mount("#app")},"85ec":function(e,t,n){}});
//# sourceMappingURL=app.5ad7c2ef.js.map