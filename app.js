function BudgetController(){

}





function UIController(){

    var DomStrings = {
        btn_submit : '.add__btn',
        type: '.add__type',
        description : '.add__description',
        value : '.add__value'
    }




    return{
        Dom_Selectors : DomStrings,
        get_inputs : function(){
            var type,description,value

            type = document.querySelector(DomStrings.type).value
            description = document.querySelector(DomStrings.description).value
            value = document.querySelector(DomStrings.value).value


            return {
                type:type,
                description:description,
                value:value
            }
        }
    }
}





// Global app Controller
var Controller = (function (budget_ctrl,ui_ctrl){
    var Dom = ui_ctrl.Dom_Selectors
    function setupEventListener(){
        document.querySelector(Dom.btn_submit).addEventListener('click',()=>{
            console.log("Clicked")
            input()
        })
        document.addEventListener('keypress',(event) =>{
            if(event.which === 13 || event.keyCode === 13){
                console.log("Entered!")
                input()
            }
        })
    }


    var input = function(){
        var get_inputs = ui_ctrl.get_inputs()
        console.log(get_inputs)
    }

    return {
        init:function(){
            setupEventListener()
            
        }
    }

})(BudgetController(),UIController())

Controller.init()
