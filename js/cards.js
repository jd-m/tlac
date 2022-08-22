  <script>
    function makeArticleCard(file) {
        $.get(file, function (data) {
            $('#posts').append(

                    "<a href=\"" + file + "\">" +
                    "<div class=\"card center\">" + 
                    "<h4><span class=\"date\">"+$(data).find("#date").html()+"</span><span>"+$(data).find("#title").html()+"</span></h4>" +
                    "<p class=\"disappear\">" + $(data).find("p").text().substring(0,150) + "..." + "</p>" +
                    "</div>" + 
                  "</a>"
            );
        });      
    }

    var pageIndex = 0, pageIncrement = 3, numArticles = 4;

    $.getJSON('article-db.json',function(data) {

        numArticles = Math.ceil(data.posts.length/pageIncrement) * pageIncrement;
        
        //Initial Button State
        if ((pageIndex + pageIncrement) >= numArticles) {
            $('#nextButton').prop('disabled', true);
        }
        if ((pageIndex - pageIncrement) <= 0) {
            $('#prevButton').prop('disabled', true);
        }
        
    });
        
    function updatePosts() {
        
        
        $.getJSON('article-db.json',function(data) {
            var jd;
            jd = data.posts;
            jd.sort(function(a,b) {
                return a - b;
            });
            
            $('#posts').empty();
            for (let i = 0; i < pageIncrement; i++){
                let articleFile = jd[pageIndex + i].file;
                if (articleFile !== undefined) {
                    makeArticleCard('posts-html/' + articleFile);
                    
                }
            }
            $("#posts").scrollIntoView(false);
                       
        });
    }
    
    function incPageIndex(inc) {
        let newPageIndex = Math.min(Math.max(pageIndex + inc, 0), numArticles);
        pageIndex = newPageIndex;
    }
    
    function nextPage(){
        let prevPageIndex = pageIndex;
        incPageIndex(pageIncrement);
        if (prevPageIndex !== pageIndex) {
            updatePosts();
        }
        
        if ((pageIndex + pageIncrement) >= numArticles) {
            $('#nextButton').prop('disabled', true);
        }
            
        if ($('#prevButton').prop('disabled') == true) {
            $('#prevButton').prop('disabled', false)
        } 
    }

    function prevPage(){
        let prevPageIndex = pageIndex;
        incPageIndex(pageIncrement * -1);
        if (prevPageIndex !== pageIndex) {
            updatePosts();
        }

        if ((pageIndex - pageIncrement) <= 0) {
            $('#prevButton').prop('disabled', true);
        }
        
        if ($('#nextButton').prop('disabled') == true) {
            $('#nextButton').prop('disabled', false);
        }
    }

    $.getJSON('article-db.json',function(data) {
        $.each(data.taglist, function(key, value){
            $('#taglist').append("<a href=\"tags.html#"+value+ "\"><li>" + value + "</li></a>")
        })
        
    });
    
    updatePosts();
    </script>
