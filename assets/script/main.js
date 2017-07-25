
var members = data.results[0].members;

var totalMembers = {
    "R": [],
    "I": [],
    "D": []
}
$.each(members, function(i, member) {
    totalMembers[member.party].push(member);
})
//Getting the Length to find out how many democrats, republicans and Independents there are in total//
$(".totalDemocrats").text(totalMembers.D.length);
$(".totalRepublicans").text(totalMembers.R.length);
$(".totalIndependents").text(totalMembers.I.length);

function getAverageVotesForParty(partyMembers) {
    var loyaltyPercentages = 0;
    $.each(partyMembers, function(i, partyMember) {
        loyaltyPercentages = loyaltyPercentages + parseFloat(partyMember.votes_with_party_pct)
    })
    return Math.floor(loyaltyPercentages / partyMembers.length * 100) / 100 + "%"
}
$(".totalDemocratsPercentage").text(getAverageVotesForParty(totalMembers.D))
$(".totalRepublicansPercentage").text(getAverageVotesForParty(totalMembers.R))
$(".totalIndependentsPercentage").text(getAverageVotesForParty(totalMembers.I))


// #4
// get the bottom 10% of loyalty
function getLeastLoyalPartyMembers(percentage, members) {
    members = members.sort(function(member1, member2) {
        return parseFloat(member1.votes_with_party_pct) - parseFloat(member2.votes_with_party_pct);
    })
    return getPercentageOfMembers(percentage, members);
}

function getMostLoyalPartyMembers(percentage, members) {
    members = members.sort(function(member1, member2) {
        return parseFloat(member2.votes_with_party_pct) - parseFloat(member1.votes_with_party_pct);
    })
    return getPercentageOfMembers(percentage, members);
}

function getPercentageOfMembers(percentage, partyMembers) {
    var partyMembersNeeded = Math.ceil(partyMembers.length * percentage)
    var selectedPartyMembers = []
    var i = 0;
    while (selectedPartyMembers.length < partyMembersNeeded) {
        selectedPartyMembers.push(partyMembers[i]);
        if (partyMembers[i].votes_with_party_pct == partyMembers[i + 1].votes_with_party_pct) {
            partyMembersNeeded++;
        }
        i++;
    }
    return selectedPartyMembers;
}

var mostLoyal = getMostLoyalPartyMembers(0.1, members);
var leastLoyal = getLeastLoyalPartyMembers(0.1, members);



$.each(leastLoyal,function(i, currentMember){
var fullName = currentMember.first_name + " " + (currentMember.middle_name || " ") + " " + currentMember.last_name;
	var tr = $('<tr>');
	$('<td>').text(fullName).appendTo(tr);
	$('<td>').text(currentMember.total_votes).appendTo(tr);
	$('<td>').text(currentMember.votes_with_party_pct +' %').appendTo(tr);

 $('#leastLoyal tbody').append(tr);


});

$.each(mostLoyal,function(i, currentMember){
var fullName = currentMember.first_name + " " + (currentMember.middle_name || " ") + " " + currentMember.last_name;
	var tr = $('<tr>');
	$('<td>').text(fullName).appendTo(tr);
	$('<td>').text(currentMember.total_votes).appendTo(tr);
	$('<td>').text(currentMember.votes_with_party_pct +' %').appendTo(tr);

 $('#mostLoyal tbody').append(tr);

});

members = members.sort(function(member1, member2) {
        return parseFloat(member2.missed_votes_pct) - parseFloat(member1.missed_votes_pct);
    })
var mostEngaged = getPercentageOfMembers(0.1, members);

members = members.reverse();

var leastEngaged = getPercentageOfMembers(0.1, members);

$.each(leastEngaged,function(i, currentMember){
var fullName = currentMember.first_name + " " + (currentMember.middle_name || " ") + " " + currentMember.last_name;
	var tr = $('<tr>');
	$('<td>').text(fullName).appendTo(tr);
	$('<td>').text(currentMember.missed_votes).appendTo(tr);
	$('<td>').text(currentMember.missed_votes_pct +' %').appendTo(tr);

 $('#leastEngaged tbody').append(tr);


});

$.each(mostEngaged,function(i, currentMember){
var fullName = currentMember.first_name + " " + (currentMember.middle_name || " ") + " " + currentMember.last_name;
	var tr = $('<tr>');
	$('<td>').text(fullName).appendTo(tr);
	$('<td>').text(currentMember.missed_votes).appendTo(tr);
	$('<td>').text(currentMember.missed_votes_pct +' %').appendTo(tr);

 $('#mostEngaged tbody').append(tr);

});













