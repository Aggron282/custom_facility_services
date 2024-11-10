const Init_Chart = async () => {

  const prospect_chart = document.getElementById('prospectChart');
  const salesChart = document.getElementById('salesChart');
  var chart_container = document.querySelector(".chart_container");
  var sales_chart_container = document.querySelector(".sales_chart_container");

  var all_prospects = await axios.get("/admin/prospects/all");
  var weekly_prospects = await axios.get("/admin/prospects/weekly");

  all_prospects = all_prospects.data.prospects;
  weekly_prospects = weekly_prospects.data.prospects;

  var sales = await axios.post("/admin/sales",{prospects:all_prospects});
  var weekly_sales = await axios.post("/admin/sales",{prospects:weekly_prospects});

  weekly_sales = weekly_sales.data;
  sales = sales.data;

  var weekly_structure = StructureWeeklyProspects(weekly_prospects);


  if(weekly_prospects.length > 0){

        new Chart(prospect_chart, {
            type: 'doughnut',
            data: {
              labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday  ', 'Thursday', 'Friday',"Saturday"],
              datasets: [{
                label: '# Prospects',
                data: [
                  weekly_structure.sunday.length,
                  weekly_structure.monday.length,
                  weekly_structure.tuesday.length,
                  weekly_structure.wednesday.length,
                  weekly_structure.thursday.length,
                  weekly_structure.friday.length,
                  weekly_structure.saturday.length
                ],
                backgroundColor: [
                 'rgb(255, 99, 132)',
                 'rgb(54, 162, 235)',
                 'rgb(255, 205, 86)',
                 "crimson",
                 "cornflowerblue",
                 "limegreen",
                 "orangred",
                 "purple",
                 ],
                borderWidth: 1,
                borderColor:"#e6e6e6",
              }]

            }

          })

      }else{
        chart_container.innerHTML = "";
      }

      if(sales.potential_sales > 0){

        new Chart(salesChart, {
                type: 'doughnut',
                data: {
                  labels: ["Potential","Completed","Scheduled"],
                  datasets: [{
                    label: 'Sales',
                    data: [
                      sales.potential_sales,
                      sales.completed_sales,
                      sales.scheduled_sales
                    ],
                    backgroundColor: [
                     "crimson",
                     "cornflowerblue",
                     "limegreen"
                     ],
                    borderWidth: 1,
                    borderColor:"#e6e6e6",
                  }]

                }

              })
      }else{
        sales_chart_container.innerHTML = "";
      }

  }


const StructureWeeklyProspects = (weekly_prospects) => {

    var weekly_structure = {
      sunday:[],
      monday:[],
      tuesday:[],
      wednesday :[],
      thursday:[],
      friday:[],
      saturday:[]
    }

    for(var i =0; i < weekly_prospects.length; i++){

        var time_ = weekly_prospects[i].time_created;
        var date = new Date(time_);

        if(date.getDay() == 5){
          weekly_structure.friday.push(weekly_prospects[i])
        }
        if(date.getDay() == 1){
          weekly_structure.monday.push(weekly_prospects[i])
        }
        if(date.getDay() == 2){
          weekly_structure.tuesday.push(weekly_prospects[i])
        }
        if(date.getDay() == 3){
          weekly_structure.wednesday.push(weekly_prospects[i])
        }
        if(date.getDay() == 4){
          weekly_structure.thursday.push(weekly_prospects[i])
        }
        if(date.getDay() == 7){
          weekly_structure.sunday.push(weekly_prospects[i])
        }
        if(date.getDay() == 6){
          weekly_structure.saturday.push(weekly_prospects[i])
        }

    }

    return weekly_structure;

}

Init_Chart();
