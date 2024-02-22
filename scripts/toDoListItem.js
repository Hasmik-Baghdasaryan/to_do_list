function ToDoListItem() {
    var self = this;
    self.title = ko.observable().extend(
        {
            required: true,
            checkField: self.title,
            minLength: 3,
            maxLength: 25,
        });
    self.title('');
    self.description = ko.observable().extend(
        {
            required: true,
            minLength: 5,
            maxLength: 120,
        });
    self.description('');

    self.priorityList = [1, 2, 3, 4, 5];
    self.priority = ko.observable().extend({ required: true });
    self.priority('');

    self.errors = ko.validation.group(self,
        {
            deep: true,
            live: true,
            observabale: true
        });

    self.addItem = function () {
        if (!self.errors().length) {
            toDoList.toDoList.push({
                name: self.title(),
                description: self.description(),
                priority: self.priority(),
                complete: ko.observable(false),
            })
            toDoList.sortedByName() ? toDoList.toggleSortingType("name") : toDoList.toggleSortingType("priority");
        }
        self.title('');
        self.description('');
        self.priority('');
    };
}

var toDoListItem = new ToDoListItem();
var toDoListItemElement = document.querySelector('[data-bind-id="toDoListItem"]');
if (toDoListItemElement) {
    ko.applyBindings(toDoListItem, toDoListItemElement)
};