//budgetController
var budgetController = (function() {
    var Expense = function(id , description , value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id , description , value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals:{
            exp: 0,
            inc:0
        }

    };

    return{
        addItem: function(type , desc , value){
            var newItem , ID;
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id;

            }
            else{
                ID = 0;
            }

            if(type === 'exp'){
                newItem = new Expense(ID , desc , value);
            }
            else if(type === 'inc'){
                newItem = new Income(ID , desc , value);
            }

            data.allItems[type].push(newItem);
            return newItem;

        },


        testing: function(){
            console.log(data);
        }

    };




})();




//UI Controller
var UIController = (function() {
    
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
    };
     
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value);
            };
        },

        addListItem: function(obj , type){
            var html , newHtml , element;

            if(type === 'inc'){
                
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            } else if(type === 'exp'){
                element = DOMStrings.expensesContainer;

                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

           newHtml = html.replace('%id%' , obj.id);
           newHtml = newHtml.replace('%description%' , obj.description);
           newHtml = newHtml.replace('%value%' , obj.value);

           document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: function(){
            var fields , fieldsArr;
            fields = document.querySelectorAll(DOMStrings.inputDescription + ',' + DOMStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current , index , array){
                current.value = "";
            });

        },

        getDOMStrings: function(){
            return DOMStrings;
        }
    };

})();


var controller = (function(budgetCtrl , UICtrl){


    var setupEventListeners = function(){
        var DOM = UIController.getDOMStrings();
    
        document.querySelector(DOM.inputBtn).addEventListener('click' , ctrlAddItem);
        document.addEventListener('keypress' , function(event){
        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }
    });

    };

    var updateBudget = function(){

    }



    var ctrlAddItem = function(){
        
        var input = UIController.getInput();
        if(input !== "" && isNaN(input.value)){
    
        newItem = budgetController.addItem(input.type, input.description, input.value);
        UIController.addListItem(newItem , input.type);

        //console.log(input);
        UIController.clearFields();

        updateBudget();
    }

        
    };

    
    return {
        init: function(){
            console.log('Application initialization...');
            setupEventListeners();
        }
    }

    return 

})(budgetController , UIController);

controller.init();