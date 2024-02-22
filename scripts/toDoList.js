function ToDoList () {
    var self = this;
    self.toDoList = ko.observableArray([]);
    self.completedToDoItems = ko.observable(0);
    self.sortedByPriority = ko.observable(true);
    self.sortedByName = ko.observable(false);

    self.totalToDoItems =ko.computed(function(){
        return self.toDoList().length;
    });

    self.completedItems = ko.pureComputed(function(){
        var completedItemsArray = self.toDoList().filter((item)=>item.complete()===true);
        return completedItemsArray.length;     
    });

    self.completeToDoItem = function(data){
        data.complete(true);
    };
      
    self.deleteToDoItem = function(data){
        self.toDoList.remove(data);
    };

    self.sortToDoList = function (type) {
        switch (type) {
            case 'priority':
                self.toDoList.sort(function(a, b){
                    if(a.priority > b.priority) {
                        return 1;
                    }
                    if(a.priority < b.priority) {
                        return -1;
                    }
                    return 0;
                })
                break;
            default: {
                self.toDoList.sort(function(a, b) {
                    var leftItem = a[type].toLowerCase();
                    var rightItem = b[type].toLowerCase();
                    if(leftItem > rightItem){
                        return 1
                    }
                    if (leftItem < rightItem) {
                        return -1
                    }
                    return 0;
                })
            }
        }
    };

    self.toggleSortingType = function(type){
        switch (type) {
            case 'name':
                self.sortedByName(true);
                self.sortedByPriority(false);
                break;
            default:
                self.sortedByPriority(true);
                self.sortedByName(false);
        }
        self.sortToDoList(type);
    };
}

var toDoList = new ToDoList();
var toDoListElement = document.querySelector('[data-bind-id="toDo"]');
var sortToDoListElement = document.querySelector('[data-bind-id="sortToDoList"]');

if(toDoListElement) {
    ko.applyBindings(toDoList, toDoListElement);
};

if(sortToDoListElement) {
    ko.applyBindings(toDoList, sortToDoListElement);
};