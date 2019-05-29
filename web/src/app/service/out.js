app.factory('FaqCategory',function(){
  var category = {};
  category.name = "";
  category.url = "";
  category.id = -1;
  category.getCategory = function(){
    return category;
  }
  
  return category;
})