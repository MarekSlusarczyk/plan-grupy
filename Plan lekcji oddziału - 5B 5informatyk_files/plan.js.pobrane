function wyswietl(sel){
  var i=sel.selectedIndex
  if(sel.name=='oddzialy'){
  document.form.nauczyciele.selectedIndex=0
  document.form.sale.selectedIndex=0
  }
  if(sel.name=='nauczyciele'){
  document.form.oddzialy.selectedIndex=0
  document.form.sale.selectedIndex=0
  }
  if(sel.name=='sale'){
  document.form.oddzialy.selectedIndex=0
  document.form.nauczyciele.selectedIndex=0
  }
  if(i!=0) parent.plan.location.href='plany/'+sel.name.charAt(0)+sel.options[i].value+'.html'
}
function drukuj(){
    window.print()
}
