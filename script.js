//if user selects a pixel, select the pixel reference and put it in the corresponding input, with current colour?

$(document).ready(function(){
    var isMouseDown = false   
    // var recentdrag = false
    var listOfCoords = []

    // $('.pGrid').on('click', '.pixel', function() {
    //     if(!recentdrag){
    //         // var pixelClickedCoords = $(this).attr('id')
    //         // $('#coords').val(pixelClickedCoords)
    //         if($('#colourAuto').is(':checked')){
    //             var pixelClickedColour = $(this).css('background-color')
    //             pixelClickedColour = rbgToHex(pixelClickedColour)
    //             $('#newColour').val(pixelClickedColour)
    //         }
    //         console.log("Pixel '"+  pixelClickedCoords + "' clicked")
    //     }
    //     else{
    //         recentdrag = false
    //     }
    // })

    $('.pGrid').on('mousedown', '.pixel', function() {
        listOfCoords = [this.id]

        $('.pixel').on('mouseover', function(){
            if(!listOfCoords.includes(this.id) && isMouseDown){
                listOfCoords.push(this.id)
                // console.log(listOfCoords)
            }
        })

        console.log(listOfCoords)
    })

    $(document).on('mouseup', function() {
        isMouseDown = false
        // if(instantColour == true){
        //     var targetColour = $('#newColour').val()

            
        //     var targetedPixelCoords = []
        //     $('div.row div.pixel').each(function() {
        //         targetedPixelCoords.push(this.id)
        //     })
        //     // var targetedPixelCoords = $('div.row div.pixel').attr('id') 
            
        //     //select all
            
        //     console.log("dflgkjsh" + targetedPixelCoords)
        //     targetedPixelCoords.forEach(function(currentCoords){
        //         currentCoords = "#" + currentCoords 
        //         $(currentCoords).css("background-color", targetColour)
        //         $(currentCoords).removeClass("initialPixel")
        //         $(currentCoords + " p").remove()
        //     })

        //     console.log("Coloured on stroke end")
        //     if($('#recentColours').is(':checked')){
        //         updateRecentColours(targetColour)
        //     }
        // }
        // else{
            if(listOfCoords.length > 0){
                console.log("there is someting in listofcoords")
                var draggedCoordsInput = ""
                listOfCoords.forEach(coord => {
                    draggedCoordsInput += coord + ", "
                });
                draggedCoordsInput = draggedCoordsInput.slice(0,-2)
                $('#coords').val(draggedCoordsInput)
                listOfCoords = []
                console.log(draggedCoordsInput)
                // recentdrag = true
            }
        // }
    })

    $(document).on('mousedown', function() {
        isMouseDown = true
    })

    $('#settingsBtn').click(function(){
        console.log("settings btn clicked")
        closeSettings()
    })

    function closeSettings(){
        if($('#settingsBtn').html() ===  ("Close settings")){
            $('#settingsBtn').html("Settings")
        }else{
            $('#settingsBtn').html("Close settings")
        }
        $('.pGrid').toggleClass("hide")
        $('.settings').toggleClass("hide")
    }

    //error catch make sure right format!!!!!!!!!!!!!!!!!!!!
    $('#confirmGridSettings').click(function(){
        //and greater than 0??
        if(Number.isInteger(Number($('#newRowNumber').val())) && Number.isInteger(Number($('#newColumnNumber').val()))){
            createGrid($('#newRowNumber').val(), $('#newColumnNumber').val())
            console.log("grid settings confirm button clicked") 
        }
        
    })

    $('#colourSelection').change(function(){
        if(this.checked){
            $('#newColour').removeClass("hide")
        }else{
            $('#newColour').addClass("hide")
        }
        console.log("colour selection checkbox changed")
    })

    $('#gridCoords').change(function(){
        if(this.checked){
            $('#coords').removeClass("hide")
        }else{
            $('#coords').addClass("hide")
        }
        console.log("coords checkbox changed")
    })

    $('#recentColours').on('change', function() {
    // $('#recentColours').change(function(){
        console.log("changed recent colours")
        if(this.checked){
            $('.recentColours').removeClass("hide")
            console.log("unhidden recent colours")
        }else{
            $('.recentColours').addClass("hide")
            console.log("hidden recent colours")
        }
        console.log("recent clr checkbox changed")
    })

    $('#setAllOption').on('change', function() {
            if(this.checked){
                $('#setAll').removeClass("hide")
                $('#setAllLabel').removeClass("hide")
                console.log("unhidden set all")
                
            }else{
                $('#setAll').addClass("hide")
                $('#setAllLabel').addClass("hide")
                console.log("hidden set all")
                
            }
            console.log("set all checkbox setting changed")
    })

    // if($('#recentColours').checked){
    //     // change value of recent colour selection
    //     // array for colour selection, and indicator to tell which one it is on? recent colours that only appear when they are used, max of 5
    //     console.log("colour box checked confirmed")
    // }

    function createGrid(gridRows, gridColumns){
        $('.pGrid').empty()

        for(var i=0;i<gridRows;i++){
            const pixelRow = document.createElement("div")
            pixelRow.classList.add("row")
            pixelRow.id = ("row" + i)
            $('.pGrid').append(pixelRow)
            console.log("row created")

            for(var j=0;j<gridColumns;j++){
                const pixel = document.createElement("div")
                pixel.classList.add("pixel")
                pixel.id = ("r" + i + "c" + j)
                pixel.classList.add("initialPixel")
                $('#row' + i).append(pixel)
                console.log("column created j|i" + j + i)
                const pixelText = document.createElement("p")
                $("#" + pixel.id).append(pixelText)
                $("#" + pixel.id + " p").html(pixel.id)
                // comment out p and border for more leeway on quantity of pixels

                // maybe try only having the value on hover? or not when there is a certain amount
                // Calculate the width dynamically
                // const pixelWidth = (100 / gridColumns) + "%";
                // $('#' + pixel.id).css("width", pixelWidth);
            }
        }
        closeSettings()
    }

    function rbgToHex(rgb){
        var rbgNumbers = rgb.slice(4,-1).replace(/\s+/g, '').split(',')
        var hex = "#"
        rbgNumbers.forEach(element => {
            var x = Number(element).toString(16)
            hex += x.length === 1 ? '0' + x : x
        });
        return hex
    }

    $('#confirmBtn').click(function(){//check if coords are in correct format, remove try catch
        var targetColour = $('#newColour').val()

        //if check all? else
        if(!$('#setAll').prop('checked')){
            var targetedPixelCoords = $('#coords').val().replace(/\s+/g, '').split(',')
        }else{
            var targetedPixelCoords = []
            $('div.row div.pixel').each(function() {
                targetedPixelCoords.push(this.id)
            })
            // var targetedPixelCoords = $('div.row div.pixel').attr('id') 
        }
        //select all
        
        console.log("dflgkjsh" + targetedPixelCoords)
        targetedPixelCoords.forEach(function(currentCoords){
            currentCoords = "#" + currentCoords 
            $(currentCoords).css("background-color", targetColour)
            $(currentCoords).removeClass("initialPixel")
            $(currentCoords + " p").remove()
        })

        console.log("confirm btn clicked")
        if($('#recentColours').is(':checked')){
            updateRecentColours(targetColour)
        }
    })

    // $('.recentColours div').click(function(){
    $('.recentColours').on('click', 'div', function() {
        $('#newColour').val(rbgToHex($(this).css("background-color")))
        console.log(this.id + "recent colours clicked")
    })

    $('#setAll').on('change', function() {
        if(this.checked){
            $('#coords').addClass("opacity50")
        }else{
            $('#coords').removeClass("opacity50")
        }
        console.log("set all checkbox changed")
    })

    function updateRecentColours(colourUsed){
        var recentColours = []
        $('.recentColours > div').each(function(){
            recentColours.push(rbgToHex($(this).css('background-color')))
        })
        if(!recentColours.includes(colourUsed)){
            const recentColourCount = $(".recentColours").children().length
            if(recentColourCount < 5){//the 5 here is the maximum amount of recent colour boxes that will be allowed
                const recentColour = document.createElement("div")
                recentColour.id = ("recentColour" + (recentColourCount + 1))
                $(recentColour).css("background-color", colourUsed)
                $('.recentColours').append(recentColour)
            }else{
                for(var i = 1; i < recentColourCount; i++){
                    $('#recentColour' + i).css("background-color", $('#recentColour' + (i + 1)).css("background-color"))
                }
                $('#recentColour' + i).css("background-color", colourUsed)
            }
            console.log("changed recent colour") 
        }
        
    }
})