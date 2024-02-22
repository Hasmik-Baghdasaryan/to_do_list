ko.validation.init({
    decorateInputElement: true,
    errorMessageClass: "koErrorMessage",
    errorElementClass: "koErrorField",

})

ko.validation.rules["checkField"] = {
    validator: function (val, otherVal) {
        var checkValue = new RegExp("^[A-Za-z]");
        if (checkValue.test(val)) {
            return true;
        }
    },
    message: "The title should be started with a letter"
};

ko.validation.registerExtenders();