$(function () {
    $("#searchBtn").on("click", function(e){
        e.preventDefault();
        var searchInput = $("#searchInput").val();       

        var newLi = $("<li>");
        newLi.addClass("list-group-item list");
        newLi.text(searchInput);
        $("#unorderedList").append(newLi);
    });

});