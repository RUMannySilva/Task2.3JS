//members list is accesed using the var name on the json file "data". there are 3 options, results hold all the members//
var membersList = data.results[0].members;

var table = '';

var states = [];

for (var i = 0; i < membersList.length; i++) {
  var member = membersList[i];
  var fullName = member.first_name + " " + (member.middle_name || " ") + " " + member.last_name;

  table = '<tr>';
  table += '<td>';
  table += '<a href="' + member.url + ' "target=_blank">' + fullName + '</a>';
  table += '</td>';
  table += '<td class="party">' + member.party + '</td>';
  table += '<td class="state">' + member.state + '</td>';
  table += '<td>' + member.seniority + '</td>';
  table += '<td>' + member.votes_with_party_pct + '%' + '</td></tr>';
  table += '</tr>';;
  document.getElementById("congress-data").innerHTML += table;
  //you are checking to see if each state is in the array of states if it is not then the state gets pushed through and recieves a -1 because it wasn't in the array until pushed through//

  if ($.inArray(member.state, states) == -1) {
    states.push(member.state)
  }
  //you use sort to have all states listed in alphabetical order and then show them on the console.//
}
states.sort();
console.log(states)
  //a for loop is made to append each state to the drop down meny which has a class of select-id//

for (var i = 0; i < states.length; i++) {
  $('.select-id').append("<option>" + states[i] + "</option>")

}
//everytime there is change in the select-id class this value is logged onto the console.//
$(".select-id").change(function() {

  var selectedState = this.value;
  //we go through every td with a state class and store it//
  $('td.state').each(function(){
    var currentState = $(this).text();
    //if the selected state equals the current state//
   if (selectedState ==currentState) {
    $(this).parent().show();
    //show this row//
   }else{
    $(this).parent().hide();
  //hide this row//
   }

  })
});
//select all rows with the class value =state //


//  the class party selector is being called and when clicked the function run, 
// a variable is given to selected inputs which is equal to all checkbox's (party selectors) 
// which are checked.Then for each selected checkbox the values are pushed into the empty array 
// and all 'tr' are searched for elements that have td.party
// if the array  

$(".partyselector").click(function() {

  var selectedInputs = $('input.partyselector:checked')

  var allparties = [];

  selectedInputs.each(function() {
    allparties.push($(this).val());
  });

  $('#congress-data tr').each(function(index, element) {
    var party = $(element).find("td.party").text();

    if ($.inArray(party, allparties) >= 0) {
      $(element).show()
    } else {
      $(element).hide()
    }

  });

})
