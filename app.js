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

        totalItems :{

            totals :{
                inc : 0,
                exp : 0
            },
    
            budget : 0,
            percentage : 0

        }

        
    }


    return {
        addItem : function(type,description,value){
            var id,element

            if(data.alldata[type].length <= 0){
                id = 0
            }

            else {
                id = parseInt(data.alldata[type][data.alldata[type].length - 1].id + 1)
            }

            if(type === 'inc'){
                element = new Income(id,type,description,value)
                data.alldata[type].push(element)
            }

            else if(type === 'exp'){
                element = new Expense(id,type,description,value)
                data.alldata[type].push(element)
            }

            // console.log(data)
            return element  
        },

        calculate_types:function(type){
            var sum,res;
            if(data.alldata[type].length > 0){
                sum = data.alldata[type].map(x => x.value)
                
                res = sum.reduce((current,pre) =>  {
                    return current + pre
                })

                data.totalItems.totals[type] = res
                
            }else{
                data.totalItems.totals[type] = 0
            }
        },

        calculate_budget:function(){
            this.calculate_types('inc')
            this.calculate_types('exp')
            var percentage = Math.round((data.totalItems.totals.exp / data.totalItems.totals.inc) * 100)
            data.totalItems.budget = data.totalItems.totals.inc - data.totalItems.totals.exp
            // console.log("BUDGET",data.totalItems)
            data.totalItems.percentage = percentage
            return data.totalItems
        },

        delete_item:function(Id,type){
            var element,index ;
            element = data.alldata[type].map(x => x.id)
            index = element.indexOf(Id)
            data.alldata[type].splice(index,1)
         
        },
        data:data

    }

}





function UIController(){

    var DomStrings = {
        btn_submit : '.add__btn',
        type: '.add__type',
        description : '.add__description',
        value : '.add__value',
        income_Container : '.income__list',
        expense_Container : '.expenses__list',
        Income : '.budget__income--value',
        Expense : '.budget__expenses--value',
        Budget : '.budget__value',
        percentage:'.budget__expenses--percentage',
        Container : '.container',
        date : '.budget__title--month'

    }




    return{
        Dom_Selectors : DomStrings,
        get_inputs : function(){
            var type,description,value

            type = document.querySelector(DomStrings.type).value
            description = document.querySelector(DomStrings.description).value
            value = parseFloat(document.querySelector(DomStrings.value).value)


            return {
                type:type,
                description:description,
                value:value
            }
        },

        additem:function(id,type,description,value){
            var html
            
            if(type === 'inc'){
                html = ` <div class="item clearfix" id="inc-${id}">
                <div class="item__description">${description}</div>
                <div class="right clearfix">
                    <div class="item__value">+ ${value} $</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`

            document.querySelector(DomStrings.income_Container).insertAdjacentHTML('beforeend',html)
            }

            else if(type === 'exp'){

                html = `<div class="item clearfix" id="exp-${id}">
                <div class="item__description">${description}</div>
                <div class="right clearfix">
                    <div class="item__value">- ${value} $</div>
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
        },

        update_budget:function(budget,income_budget,expense_budget,percentage){
            document.querySelector(DomStrings.Income).textContent = income_budget + "$" 
            document.querySelector(DomStrings.Expense).textContent = expense_budget + "$" 
            document.querySelector(DomStrings.Budget).textContent = budget + "$" 
            document.querySelector(DomStrings.percentage).textContent = percentage + "%"
        },

        deleteItem:function(selector){
            var element = document.getElementById(selector)
            document.getElementById(selector).parentNode.removeChild(element)
        },

        displayDate:function(){
            var months,year,month,date
            months = ['January','February','March','April','May','June','July','August','September','October',
                            'November','December']

            date = new Date()
            year = date.getFullYear()
            month = date.getMonth()

            document.querySelector(DomStrings.date).textContent = months[month] +" "+year
            
            
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

        document.querySelector(Dom.Container).addEventListener('click',delete_item)
    }


    function delete_item(event){
        var ID,arr,type,id
        ID = event.target.parentNode.parentNode.parentNode.parentNode.id

        arr = ID.split('-')
        type = arr[0]
        id = parseInt(arr[1])
        //delete item from datas
        budget_ctrl.delete_item(id,type)
        //delete item from UI
        ui_ctrl.deleteItem(ID)
        //Re-calculate budget
        var updates = budget_ctrl.calculate_budget()
        console.log(budget_ctrl.data.alldata)
        //update ui budget
        ui_ctrl.update_budget(updates.budget,updates.totals.inc,updates.totals.exp,updates.percentage)
    }


    function update_budget(){
        //update budget
        var updated_data = budget_ctrl.calculate_budget()
        console.log(updated_data,'updated')
        //update budget UI
        ui_ctrl.update_budget(updated_data.budget,updated_data.totals.inc,updated_data.totals.exp,updated_data.percentage)
    }



    var input = function(){
        // Get data from text boxs
        var get_inputs = ui_ctrl.get_inputs()
        // add data to Storage
        if (get_inputs.value !== NaN && get_inputs.value !== undefined && get_inputs.value !== 0 && get_inputs.description !== "" ) {

            var add_item = budget_ctrl.addItem(get_inputs.type,get_inputs.description,get_inputs.value)
            //add data to UI
            ui_ctrl.additem(add_item.id,add_item.type,add_item.description,add_item.value)

            update_budget()
        }
        // Clear Textboxs
        ui_ctrl.clear_Fields()
        console.log(budget_ctrl.data.alldata)
    }

    return {
        //Starting Point
        init:function(){
            setupEventListener()
            ui_ctrl.update_budget(0,0,0,0),
            ui_ctrl.displayDate()
            
            
        }
    }

})(BudgetController(),UIController())

Controller.init()
