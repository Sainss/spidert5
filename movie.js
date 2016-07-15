document.getElementById("movie").style.display = 'none';

var i=0,x;
var search_suggestions = 0;


document.getElementById('search').addEventListener('keyup',function(e){
	if(e.keyCode == 40){
		if(i >= 0 && i < search_suggestions) i++;
		document.getElementById("result"+i).style.background = "#EEE";
		document.getElementById("search").value = document.getElementById("result"+i).innerHTML
		document.getElementById("result"+(i-1)).style.background = "#FFF";
	}else if(e.keyCode == 38){
		if(i > 0 && i <= search_suggestions) i--;
		document.getElementById("result"+i).style.background = "#EEE";
		document.getElementById("search").value = document.getElementById("result"+i).innerHTML
		document.getElementById("result"+(i+1)).style.background = "#FFF";
	}else if(e.keyCode == 13){
		title = document.getElementById("search").value;
		document.getElementById("search").blur();
		result(title);
	}
});

document.getElementById('Input').onblur = function(){
	document.getElementById("search_results").style.display = 'none';
};



function find(){
	var xmlhttp = new XMLHttpRequest();
	var search_text = document.getElementById('search').value;
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			document.getElementById("search_results").style.display = '';
			document.getElementById("search_results").innerHTML = "";
			if(myArr.Response == "True"){
				output_search_results(myArr);
			}
		}
	};
	xmlhttp.open("GET", 'http://www.omdbapi.com/?s='+search_text, true);
	xmlhttp.send();
}

function output_search_results(arr) {
	i=0;
	search_suggestions = arr.Search.length;
	for(var j=1;j<=arr.Search.length;j++){
		document.getElementById("search_results").innerHTML += '<div class="result" id="result'+j+'" onclick="result(\''+arr.Search[j].Title+'\')">' + arr.Search[j].Title + '</div>';
	}
}

function result(title){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var myArr = JSON.parse(xmlhttp.responseText);
			if(myArr.Response == 'True'){
				final_output(myArr);
			}else{
				document.getElementById('title').innerHTML = myArr.Error;
				document.getElementById("poster").src = myArr.Poster;
				document.getElementById("plot").innerHTML = myArr.Plot;
				document.getElementById("actors").innerHTML = "<span>Cast: </span>"+myArr.Actors;
				document.getElementById('genre').innerHTML = "<span>Genre : </span>"+myArr.Genre;
				document.getElementById('duration').innerHTML = "<span>Duration : </span>"+myArr.Runtime;
				document.getElementById('year').innerHTML = "<span>Year of Release : </span>"+myArr.Year;
				document.getElementById('rating').innerHTML = "<span>IMDB Rating : </span>"+myArr.imdbRating;
				document.getElementById('imdb_id').innerHTML = "<span>IMDB Id : </span> "+myArr.imdbID;
			}
		}
		document.getElementById("movie").style.display = '';
		
		
		
		
	};
	xmlhttp.open("GET", 'http://www.omdbapi.com/?r=json&plot=short&t='+title, true);
	xmlhttp.send();
}

function final_output(myArr){
	document.getElementById("poster").src = myArr.Poster;
	document.getElementById('title').innerHTML = myArr.Title;
	document.getElementById("plot").innerHTML = myArr.Plot;
	document.getElementById("actors").innerHTML = "<span>Actors : </span>"+myArr.Actors;
	document.getElementById('genre').innerHTML = "<span>Genre : </span>"+myArr.Genre;
	document.getElementById('duration').innerHTML = "<span>Duration : </span>"+myArr.Runtime;
	document.getElementById('year').innerHTML = "<span>Year of Release : </span>"+myArr.Year;
	document.getElementById('rating').innerHTML = "<span>IMDB Rating : </span>"+myArr.imdbRating;
	document.getElementById('imdb_id').innerHTML = "<span>IMDB Id : </span> "+myArr.imdbID;
}


