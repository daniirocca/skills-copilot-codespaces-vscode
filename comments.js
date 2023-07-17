// Create web server and handle requests

// Import modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var mime = require('mime');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('comments.db');

// Create server
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var query = url.parse(request.url).query;
    var queryObj = qs.parse(query);

    switch (request.method) {
        case 'GET':
            switch (pathname) {
                case '/':
                    displayForm(response);
                    break;
                case '/comments':
                    displayComments(response);
                    break;
                default:
                    display404(response);
                    break;
            }
            break;
        case 'POST':
            switch (pathname) {
                case '/comments':
                    addComment(request, response);
                    break;
                default:
                    display404(response);
                    break;
            }
            break;
        default:
            display404(response);
            break;
    }
});

// Listen on port 8080
server.listen(8080);

// Display HTML form
function displayForm(response) {
    var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Comments</title></head><body>';
    html += '<form action="/comments" method="post"><p>Name: <input type="text" name="name"></p>';
    html += '<p>Comment: <textarea name="comment" rows="5" cols="50"></textarea></p>';
    html += '<p><input type="submit" value="Submit"></p></form></body></html>';

    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(html);
}

// Add comment to database
function addComment(request, response) {
    var body = '';

    request.on('data', function (data) {
        body += data;
    });

    request.on('end', function () {
        var comment = qs.parse(body);
        var date = new Date();
        var timestamp = date.toUTCString();
        var sql = 'INSERT INTO comments (name, comment, timestamp) VALUES ("' + comment.name + '", "' + comment.comment + '", "' + timestamp + '")';

        db.run(sql, function