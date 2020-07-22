function BudgetController(){

}





function UIController(){

    var DomStrings = {
        btn_submit : '.add__btn'
    }




    return{
        Dom_Selectors : DomStrings
    }
}





// Global app Controller
var Controller = (function (budget_ctrl,ui_ctrl){
    var Dom = ui_ctrl.Dom_Selectors
    function setupEventListener(){
        document.querySelector(Dom.btn_submit).addEventListener('click',()=>{
            console.log("Clicked")
        })
        document.addEventListener('keypress',(event) =>{
            if(event.which === 13 || event.keyCode === 13){
                console.log("Entered!")
            }
        })
    }

    return {
        init:function(){
            setupEventListener()
        }
    }

})(BudgetController(),UIController())

Controller.init()
