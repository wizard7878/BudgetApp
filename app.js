function BudgetController(){

    var Income = function(id,type,description,value){
        this.id = id
        this.type = type
        this.description = description
        this.value = value
    }


    var Expense = function(id,type,description,value){
        this.id = id
        this.type = type
        this.description = description
        this.value = value
    }


    var data = {
        alldata : {
            inc:[],
            exp:[]
        },

        totals :{
            inc : 0,
            exp : 0
        },

        budget : 0,
        percentage : 0
    }


    return {
        addItem : function(type,description,value){
            var id,element

            if(data.alldata[type].length <= 0){
                id = 0
            }

            else {
                id = data.alldata[type][data.alldata[type].length - 1].id + 1
            }

            if(type === 'inc'){
                element = new Income(id,type,description,value)
                data.alldata[type].push(element)
            }

            else if(type === 'exp'){
                element = new Expense(id,type,description,value)
                data.alldata[type].push(element)
            }

            console.log(data.alldata)
            return element  
        }
    }

}





function UIController(){

    var DomStrings = {
        btn_submit : '.add__btn',
        type: '.add__type',
        description : '.add__description',
        value : '.add__value',
        income_Container : '.income__list',
        expense_Container : '.expenses__list'
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
        },

        additem:function(id,type,description,value){
            var html

            if(type === 'inc'){
                html = ` <div class="item clearfix" id="income-${id}">
                <div class="item__description">${description}</div>
                <div class="right clearfix">
                    <div class="item__value">+ ${value}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`

            document.querySelector(DomStrings.income_Container).insertAdjacentHTML('beforeend',html)
            }

            else if(type === 'exp'){

                html = `<div class="item clearfix" id="expense-${id}">
                <div class="item__description">${description}</div>
                <div class="right clearfix">
                    <div class="item__value">- ${value}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`

            document.querySelector(DomStrings.expense_Container).insertAdjacentHTML('beforeend',html)
            }

            
        },
        clear_Fields : function(){
            document.querySelector(DomStrings.value).value = ""
            document.querySelector(DomStrings.description).value = ""
            document.querySelector(DomStrings.description).focus()
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
        // Get data from text boxs
        var get_inputs = ui_ctrl.get_inputs()
        // add data to Storage
        var add_item = budget_ctrl.addItem(get_inputs.type,get_inputs.description,get_inputs.value)
        //add data to UI
        ui_ctrl.additem(add_item.id,add_item.type,add_item.description,add_item.value)
        // Clear Textboxs
        ui_ctrl.clear_Fields()
    }

    return {
        init:function(){
            setupEventListener()
            
        }
    }

})(BudgetController(),UIController())

Controller.init()
