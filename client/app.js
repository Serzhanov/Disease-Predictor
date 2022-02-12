var url = "http://127.0.0.1:5000/get_all_symptoms";

/* this tells the page to wait until jQuery has loaded, so you can use the Ajax call */
all_disease=new Array(131).fill(0);

var last_li =0;
var index_to_del=0;
var text_disease_index="";


$(document).ready(function(){
  $.ajax({
    url: url,
    dataType: 'json',
      error: function(){
        console.log('JSON FAILED for data');
      },
    success:function(results){
  /* the results is your json, you can reference the elements directly by using it here, without creating any additional variables */
  
      var all_dis = document.getElementById("allDis");
      console.log(results);
      var i=0;
      results.symptoms.forEach(function(element) {
        all_dis.insertAdjacentHTML( 'beforeend','<li onClick="controllingAddDelDisease(this.id)"><a href="#" onClick="return false;">' +element +"</a></li>");
        last_li = $( "li" ).get( -1 )
        jQuery(last_li).prev("li").attr("id",i);
        i++;
      }); // end of forEach
    }  // end of success fn
   }) // end of Ajax call
 }) // end of $(document).ready() function




 function controllingAddDelDisease(id) {
    all_disease[id]=1;
    console.log("added ok");
    index_to_del=id;
    $.ajax({
    url: url,
    dataType: 'json',
    error: function(){
        console.log('JSON FAILED for data');
        },
    success:function(results){
        text_disease_index=input_textShaping(true,results.symptoms[id-1]);
        document.getElementById("disInput").value=text_disease_index;
        }
    })
    return false;
}

function deleteLast(){
    all_disease[index_to_del]=0;
    console.log("deleted ok");
    delete_the_last_dis_inText();
}

function delete_the_last_dis_inText(){
    text_disease_index=input_textShaping(false);
    console.log(text_disease_index);
    document.getElementById("disInput").value=text_disease_index;
}

function input_textShaping(addOrDel,toAdd=""){
    text_disease_index=text_disease_index.split(" ");
    if((!addOrDel) && (text_disease_index.length!=0)){
        text_disease_index.pop();
    }
    else{
        let i=0;
        let checker=false;
        while (i<text_disease_index.length && !checker && i<17){
            if(text_disease_index[i].localeCompare(toAdd)==0){
                console.log(toAdd);
                console.log(text_disease_index[i]);
                console.log("You already have this element");
                checker=true;
            }
            i++;
        }
        if (!checker){
            text_disease_index.push(toAdd);
        }
    }
    text_disease_index = text_disease_index.join(" ");
    return text_disease_index;
}

function pass_symp(){
    $.getJSON('http://127.0.0.1:5000' + '/passing_the_symptoms', {
            symptoms: JSON.stringify(all_disease)
        }, function(data){
            console.log("Here we go");
            console.log(data);
            $( "#result" ).text(data.predicted_disease);
            get_precaution();
        });

}
function get_description(){
    document.getElementById('H_description').textContent = 'Description:';
    $.ajax({
    url: 'http://127.0.0.1:5000/get_description',
    dataType: 'json',
    type:"GET",
    error: function(){
        console.log('JSON FAILED for data2');
      },
    success:function(data){
        console.log(data);
        $( "#description" ).text(data.description_disease);
        }
    });
}
function get_precaution(){
    document.getElementById('H_precautions').textContent = 'Precautions:';
    $.getJSON("http://127.0.0.1:5000/get_precaution", function (data) {
    $( "#precautions" ).text(data.precautions_of_disease);
    });
}
