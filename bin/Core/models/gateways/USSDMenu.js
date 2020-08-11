const {MenuModel} = require('./MenuModel');
const {USSDActionProcessor} = require('../../../services/USSDActionProcessor');
class USSDMenu{
    static Get(){
        const array = [];
        array.push(
            new MenuModel({
                Content : 'Welcome to USSD Sublet\n please enter your option\n 1.) Register Card\n 2.) Get Virtual Card\n 3.) Press # to go back\n',
                PageNumber : 1,
                NextPageNumber : (SelectedPage === 1 ? 2 : 3),
                SelectedValue : null,
                Command : 'Continue'
            })
        );
        array.push(
            new MenuModel({
                Content : 'Please enter your Pan',
                PageNumber : 2,
                NextPageNumber : 4,
                SelectedValue : null,
                Action : USSDActionProcessor.EncryptPAN(),
                Command : 'Continue'
            })
        );
        array.push(
            new MenuModel({
                Content : 'Please enter your expire (mmyy)',
                PageNumber : 4,
                NextPageNumber : 5,
                SelectedValue : null,
                Action : USSDActionProcessor.EncryptExpiry(),
                Command : 'Continue'
            })
        );
        return array;
    }
}