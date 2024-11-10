function GetSales(all_prospects){

  var potential_sales = 0;
  var completed_sales = 0;
  var scheduled_sales = 0;

  if(!all_prospects){
    return {
      potential_sales: potential_sales,
      completed_sales: completed_sales,
      scheduled_sales: scheduled_sales,
      total_sales: potential_sales + completed_sales + scheduled_sales
    }

  }

  for(var i =0; i < all_prospects.length; i++){

      if(all_prospects[i].status == 4){
        completed_sales += all_prospects[i].quote;
      }
      else if (all_prospects[i] == 3){
        scheduled_sales += all_prospects[i].quote;
      }
      else{
        potential_sales += isNaN(all_prospects[i].quote) ? 0 : all_prospects[i].quote ;
      }


  }

  return {
    potential_sales: potential_sales,
    completed_sales: completed_sales,
    scheduled_sales: scheduled_sales,
    total_sales: potential_sales + completed_sales + scheduled_sales
  }

}


module.exports.GetSales = GetSales;
