var base_url="https://codequotient.com/api/";
var lang_selector;
var compile_btn;
var output;
var editor_code;

// var for sending to the server
var id;
var written_code;
function btn_click()
{
    lang_selector=document.getElementById("selector");
    editor_code=ace.edit("editor");
    output=document.getElementById("output");
    compile_btn=document.getElementById("btn");
    
    setLanguageId();
    setCode();
    sendCode();
    

}
// function to get the id from select tag
function setLanguageId()
{
    // getting the value of id for the langauge
    id=lang_selector.value;
    switch(id)
    {
        case "Java":
        id=8;
        break;

        case "Python":
        id=0;
        break;

        case "C":
        id=7;
        break;

        case "C++":
        id=77;
        break;
 
        // we cant use default because when we dont select anything and what we will see will be the default
        case "Javascript":
        id=4;
        break;
    }
}
// function to get code from the editor
function setCode()
{
written_code=editor_code.getValue();
}

// function to send the code to the url
function sendCode()
{
var url="https://codequotient.com/api/executeCode";
var obj={code:written_code, langId:id};

// AJAX
var xhr=new XMLHttpRequest();
xhr.open("POST",url);  
xhr.setRequestHeader("Content-Type","application/json");
xhr.send(JSON.stringify(obj));
xhr.addEventListener("load",function()
{
    var text=JSON.parse(xhr.responseText);
    console.log(text);
    if("codeId" in text)
    {
    var codeId=text.codeId;
     checkResult(codeId);
    }
    else
    alert("Something went wrong");
})
}

function checkResult(codeId)
{
    var url=" https://codequotient.com/api/codeResult/"+codeId;
    var xhr=new XMLHttpRequest();
    xhr.open("GET",url);
    xhr.send();
    xhr.addEventListener("load",function()
    {
        var text=JSON.parse(xhr.responseText);
        var data=JSON.parse(text.data);
        if(data.status==="Pending")
        {
            checkResult(codeId);
        }
        else
        {
          if(data.errors!=="")
          output.innerHTML=data.errors;
          else{
              output.innerHTML=data.output;
          }
        }
    })
}