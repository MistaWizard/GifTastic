$(document).ready(function() {

var topics = ["Wolverine", "Rogue", "Cyclops", "Jean Grey", "Storm", "Morph", "Professor X", "Colossus", "Beast", "Jubilee", "Emma Frost"];

function displayGIF() {
    var xmen = $(this).attr("data-name");
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + xmen + "&limit=" + limit + "&api_key=eyPvcJ6ZA9DL8Kb0vkiCdTGGMSGGYBBf";   

    $.ajax({
        url: queryURL, 
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        console.log(results);
        $("#gifPlace").empty();
        for (var j =0; j < limit; j++) {
            var displayDiv = $("<div>");
            displayDiv.addClass("holder");

            var image = $("<img>");
            image.attr("src", results[j].images.original_still.url);
            image.attr("data-still", results[j].images.original_still.url);
            image.attr("data-animate", results[j].images.original.url);
            image.attr("data-state", "still");
            image.addClass("gif");
            displayDiv.append(image);

            var rating = results[j].rating;
            var upRating = rating.toUpperCase();
            console.log(upRating);
            var pRating = $("<h2>").text("Rating: " + upRating);
            displayDiv.append(pRating)

            $("#gifPlace").append(displayDiv);
        }

    });
}

function renderButtons() {

    $("#button-view").empty();
  
    for (var i = 0; i < topics.length; i++) {
      var a = $("<button>");
      a.addClass("btn btn-default m-1");
      a.attr("id", "xperson");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#button-view").append(a);
      console.log('topics array =' + topics + '-');
    }
}

$("#add-xperson").on("click", function(event) {
    event.preventDefault();
    var xpersons = $("#xperson-input").val().trim();
    form.reset();
    topics.push(xpersons);
    console.log(topics);
    renderButtons();
})

function makeItMove() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}
  
renderButtons();

  
$(document).on("click", "#xperson", displayGIF);
$(document).on("click", ".gif", makeItMove);

});