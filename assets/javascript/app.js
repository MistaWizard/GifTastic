$(document).ready(function() {

// Initial array holding our stock X-Men
var topics = ["Wolverine", "Rogue", "Cyclops", "Jean Grey", "Storm", "Morph", "Professor X", "Colossus", "Beast", "Jubilee", "Emma Frost"];

// Function we will use to call for our GIFs
function displayGIF() {
    var xmen = $(this).attr("data-name");
    var limit = 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + xmen + "&limit=" + limit + "&api_key=eyPvcJ6ZA9DL8Kb0vkiCdTGGMSGGYBBf";   

    // Calling Ajax
    $.ajax({
        url: queryURL, 
        method: "GET"
    }).done(function(response) {

        // Start dealing with the results
        var results = response.data;
        // console.log(results);
        $("#gifPlace").empty();
        for (var j =0; j < limit; j++) {

            // Create our div to hold our GIFs
            var displayDiv = $("<div>");
            displayDiv.addClass("holder");

            // Create the image tags and GIF class to hold our images
            var image = $("<img>");
            image.attr("src", results[j].images.original_still.url);
            image.attr("data-still", results[j].images.original_still.url);
            image.attr("data-animate", results[j].images.original.url);
            image.attr("data-state", "still");
            image.addClass("gif rounded");
            displayDiv.append(image);

            // Parse the rating for each GIF and append it to our image
            var rating = results[j].rating;
            var upRating = rating.toUpperCase();
            // console.log(upRating);
            var pRating = $("<h2>").text("Rating: " + upRating);
            displayDiv.append(pRating)

            // Append the GIFs to the gifPlace div on index.html
            $("#gifPlace").append(displayDiv);
        }

    });
}

// Function to populate our button-view div
function renderButtons() {

    // Start by emptying our button-view div
    $("#button-view").empty();

    // Iterate through our array, creat the buttons and append them to the button-view div
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-primary m-1");
        a.attr("id", "xperson");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#button-view").append(a);
        // console.log(topics);
    }
}

// .on("click") function to add more X-Men
$("#add-xperson").on("click", function(event) {
    event.preventDefault();
    var xpersons = $("#xperson-input").val().trim();
    form.reset();
    topics.push(xpersons);
    // console.log(topics);

    // Call our renderButtons function to repopulate our buttons with the new added buttons
    renderButtons();
})

// Animation function to start and stop the GIFs from playing
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
  
// Call our renderButtons function on page load to populate our button-view div
renderButtons();

// .on("click") function to display the GIFs when we click one of our buttons
$(document).on("click", "#xperson", displayGIF);

// .on("click") function to start and stop our GIFs by calling our makeItMove function for that GIF we clicked on
$(document).on("click", ".gif", makeItMove);

});