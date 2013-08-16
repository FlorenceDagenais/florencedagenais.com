var global = {};

$(document).ready( function() {

    $("#contact").click(function() {
        $("#contact-info").slideToggle(1000);   
        return false;
    });

});

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}

global.tile = {};
global.tile.dim = [150, 200];
global.tile.title = "";
global.tile.img = "";
global.tile.float = "";

var renderMosaique = function(mosaique) {

    var marginBottom = 50;

    var spacer = Object.create(global.tile);
    spacer.dim = [800, marginBottom];
    mosaique[mosaique.length] = [spacer];

    var settings = {};
    settings.padding = 10;

    var curHeight = 0;
    var curWidth = 0;

    for (var i = 0; i < mosaique.length; i++) {
        var row = mosaique[i];
        var rowMaxHeight = -1;

        var html = "<div class='row'>";

        for (var j = 0; j < row.length; j++) {
            var tile = row[j];

            if (tile.dim[1] > rowMaxHeight) {
                // Adjust the max height.
                if (tile.legend)
                    rowMaxHeight = tile.dim[1] + 22;
                else
                    rowMaxHeight = tile.dim[1];
            }

            var x = tile.x || tile.x == 0 ? tile.x : curWidth;
            var y = tile.y || tile.y == 0 ? tile.y : curHeight;

            x = tile.dx ? x + tile.dx : x;
            y = tile.dy ? y + tile.dy : y;

            var background;
            if (tile.img)
                background = "background: url(\"" + tile.img + "\");";
            else if (tile.color)
                background = "background: " + tile.color + ";";
            else 
                background = "";
            

            html += " <div class='tile'" + 
                    " style='" + background +
                    " width: " + tile.dim[0] + "px;" +
                    " height: " + tile.dim[1] + "px;" +
                    " top: " + y + "px;" +
                    " left: " + x + "px;'>";

            if (tile.text) {
                html += tile.text;
            }

            if (tile.title) {
                html += " <div class='title'>" +
                        " <h1>" + tile.title + "</h1>" + 
                        " </div>";
            }

            if (tile.legend) {
                var legendX = "10px;";
                var legendY = 5 + tile.dim[1] + "px;";

                var legend = "<div class='legend' style='" +
                             " position: relative;" +
                             " top: " + legendY +
                             " left: " + legendX +
                             " '>" + tile.legend + "</div>";
                html += legend;
            }

            html += " </div>"; // End tile

            if (tile.href) {
                html = "<a href='" + tile.href + "'>" + html + "</a>";
            }

            curWidth += tile.dim[0] + settings.padding;
            if (j == row.length - 1) {
                // Dernier element: on fixe le x, y de la prochaine.
                curHeight += rowMaxHeight + settings.padding;
                curWidth = 0;
            }
            document.writeln(html);
            html = "";
        }
        document.writeln("</div>"); // End row.
    }

}


