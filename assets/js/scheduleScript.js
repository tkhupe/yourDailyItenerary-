window.onload = $(function () {
    // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
    // the code isn't run until the browser has finished rendering all the elements
    // in the html.
    var timeBlock = [document.getElementById("hour-9"),
    document.getElementById("hour-10"),
    document.getElementById("hour-11"),
    document.getElementById("hour-12"),
    document.getElementById("hour-13"),
    document.getElementById("hour-14"),
    document.getElementById("hour-15"),
    document.getElementById("hour-16"),
    document.getElementById("hour-17"),
    ];
      
  
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  // $(timeBlock).click(function () { saveData() });
  $('.saveBtn').on('click',function () {
      let parentBlock = $(this).parent();
      let dataFromStorage = localStorage.getItem("data");
      if(dataFromStorage==null){
        dataFromStorage ="{}";
      }
  
      let data = JSON.parse(dataFromStorage);
  
      let textValue = parentBlock.children('textarea').val();
      // console.log(parentBlock.id);
  
      data[parentBlock.attr('id')] = textValue;
      localStorage.setItem("data", JSON.stringify(data));
  
  })
  
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
  
    function applyClass() {
      for (let i = 0; i < timeBlock.length; i++) {
        var blockId = timeBlock[i].id;
        var blockHour = parseInt(blockId.replace("hour-", ""));
        console.log(blockHour);
        console.log(dayjs().hour());   
  
        if (dayjs().hour() === blockHour)  {
          $(timeBlock[i]).addClass("present");
        } else if (dayjs().hour() > blockHour) {
          $(timeBlock[i]).addClass("past");
        } else {
          $(timeBlock[i]).addClass("future");
        }
      }
    }
   applyClass();
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    function getData() {
      let dataFromStorage = localStorage.getItem("data");
      if(dataFromStorage==null) {
        dataFromStorage ="{}";
      }
       let data = JSON.parse(dataFromStorage);
       let dataKeys = Object.keys(data);
       for (let i = 0; i < dataKeys.length; i++) {
        let key = dataKeys[i];
        var parentBlock = $("#"+ key);
        parentBlock.children('textarea').val(data[key]);
      }
    }
  
    getData();
    
    // TODO: Add code to display the current date in the header of the page.
    function presentDay() {
  
      let currentDay = dayjs().format('dddd, MMMM D');
      $("#currentDay").text(currentDay);
      var today = new Date();
    }
    presentDay();
  
  });
  
  