import{_ as g,u as x,a as I,b as y,r as p,o as C,d as D,h as b,f as e,t as c,g as o,w as a,J as L,q as T,K as k,p as R,n as S}from"./index-d1e5deb7.js";import{b as E,a as M}from"./intefaceApi-11765410.js";import{d as B}from"./index-71939a82.js";const d=i=>(R("data-v-f37d5b08"),i=i(),S(),i),N={class:"bgImg"},O={class:"detailTitle"},q={class:"viewLeft"},A=d(()=>e("div",{class:"viewTitle"},"Overview",-1)),H=["textContent"],P=["src"],V={class:"viewLeft"},$=d(()=>e("div",{class:"viewTitle"},"Details",-1)),J=["innerHTML"],K={class:"viewLeft"},U=d(()=>e("div",{class:"viewTitle"},"Data access and cite",-1)),W={class:"downloadList"},j={class:"downLoad"},z=d(()=>e("div",{class:"loadItem"},"Platform 1:",-1)),F=["textContent"],G={class:"viewDio"},Q={__name:"index",setup(i){const r=x(),u=I(),v=y();console.log(v.name,"route"),r.routeName=v.name;const t=p([]);let w=p(u.currentRoute.value.query.productId);C(()=>{f()});const h=s=>{r.userInfo.token?m():(T({showClose:!0,message:"Warning, pleace login",type:"warning",duration:1500}),setTimeout(()=>{u.push({path:"/login"})},1500))};async function f(){try{let s=await E({id:w.value});t.value=s.data,console.log(t.value.details)}catch(s){throw s}}async function m(){try{const s=`/api/product/download/${t.value.id}`;let l=await M({method:"get",url:s,responseType:"blob",headers:{token:r.userInfo.token}});B(l)}catch(s){throw s}}return(s,l)=>{const n=k,_=L;return D(),b("div",N,[e("div",O,"ODA-"+c(t.value.title),1),o(_,{gutter:24,class:"overview"},{default:a(()=>[o(n,{span:18},{default:a(()=>[e("div",q,[A,e("div",{class:"viewContent",textContent:c(t.value.overview),style:{"white-space":"pre-wrap"}},null,8,H)])]),_:1}),o(n,{span:6},{default:a(()=>[e("img",{class:"imgRight",src:t.value.overviewImg,alt:""},null,8,P)]),_:1})]),_:1}),o(_,{gutter:24,class:"overview"},{default:a(()=>[o(n,{span:18},{default:a(()=>[e("div",V,[$,e("div",{class:"viewContent",innerHTML:t.value.details,style:{"white-space":"pre-wrap"}},null,8,J)])]),_:1}),o(n,{span:2})]),_:1}),o(_,{gutter:24,class:"overview"},{default:a(()=>[o(n,{span:24},{default:a(()=>[e("div",K,[U,e("div",W,[e("div",j,[z,e("div",{class:"downItem",onClick:l[0]||(l[0]=X=>h()),textContent:c(t.value.title)},null,8,F)])])]),e("div",G,"DOI: "+c(t.value.doi),1)]),_:1})]),_:1})])}}},te=g(Q,[["__scopeId","data-v-f37d5b08"]]);export{te as default};