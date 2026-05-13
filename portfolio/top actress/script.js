$(function(){
   var $mainMenuItems = $("#main_menu").children("ul").children("li"),
   $buttonMenuItems = $("#buttons_menu").children("ul").children("li"),
   totalMainMenuItems = $mainMenuItems.length,

    openedIndex = 2;


    var init = function(){
        bindEvents();
        if(validIndex(openedIndex))
            animateItem($mainMenuItems.eq(openedIndex),true,700);
            $buttonMenuItems.eq(openedIndex).addClass("checked");
    },
    bindEvents = function(){
        $mainMenuItems.children(".images").click(function()
        {
            var newIndex = $(this).parent().index(),
            $item = $mainMenuItems.eq(newIndex);
            if(openedIndex === newIndex)
            {
                animateItem($item, false, 250);
                $buttonMenuItems.eq(openedIndex).removeClass("checked");
                openedIndex = -1;
            }
            else
            {
                if(validIndex(newIndex)){
                    animateItem($mainMenuItems.eq(openedIndex), false, 250);
                    $buttonMenuItems.eq(openedIndex).removeClass("checked");

                }
                openedIndex = newIndex;
                animateItem($item, true, 250);
                $buttonMenuItems.eq(openedIndex).addClass("checked");
                
            }
        
        });
        $(".button").hover(function(){
            $(this).addClass("hovered");
        },
        function(){
            $(this).removeClass("hovered");
        });
        $(".button").click(function(){
            var newwIndex = $(this).index();
            $item = $mainMenuItems.eq(newwIndex);
            if(openedIndex === newwIndex)
            {
                animateItem($item, false, 300);
                $(this).removeClass("checked");
                openedIndex = -1;
            }
            else
            {
                if(validIndex(newwIndex)){
                    animateItem($mainMenuItems.eq(openedIndex), false, 300);
                    $buttonMenuItems.eq(openedIndex).removeClass("checked");

                }
                openedIndex = newwIndex;
                animateItem($item, true, 300);
                $(this).addClass("checked");
            }
        });

    },
    validIndex = function(indexToCheck){
        return (indexToCheck >= 0) && (indexToCheck < totalMainMenuItems);
    },
    animateItem = function($item, toOpen, speed){
        var $colorImage = $item.find(".color"),
        itemParam = toOpen ? {width: "420px"}:{width: "140px"},
        colorImageParam = toOpen ? {left:"0px"}:{left:"140px"};
        $colorImage.animate(colorImageParam, speed);
        $item.animate(itemParam, speed);

    };
    init();
    

});
