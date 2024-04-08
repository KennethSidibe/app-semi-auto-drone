$(document).ready(function() {
    
    function hasValue(input, errorMessage, errorElementId, inputId) {
        if (input.trim() === "") {
            showError(errorElementId, errorMessage, inputId);
            return false;
        }
        hideError(errorElementId);
        return true;
    }

    function showError(errorElementId, errorMessage, inputId) {
        let element = $('#' + errorElementId);
        element.removeClass('hide');
        element.text(errorMessage);
    }

    function hideError(inputErrorId) {
        let element = $('#' + inputErrorId);
        element.addClass('hide');
        element.text('');
    }

    $('#modifyUserForm').submit(function(event) {
        
        event.preventDefault();

        let formItemName = $('#' + ITEM_NAME_INPUT_ID).val();
        let formItemWeight = $('#' + ITEM_WEIGHT_INPUT_ID).val();
        let formItemWidth = $('#' + ITEM_WIDTH_INPUT_ID).val();
        let formItemLength = $('#' + ITEM_LENGTH_INPUT_ID).val();
        let formItemHeight = $('#' + ITEM_HEIGHT_INPUT_ID).val();
    
        // Validate the form
        let itemNameValid = hasValue(formItemName, ITEM_NAME_REQUIRED, ITEM_NAME_ERROR_ID, ITEM_NAME_INPUT_ID);
        let itemWeightValid = hasValue(formItemWeight, ITEM_WEIGHT_REQUIRED, ITEM_WEIGHT_ERROR_ID, ITEM_WEIGHT_INPUT_ID) && !isNaN(parseFloat(formItemHeight));
        let itemWidthValid = hasValue(formItemWidth, ITEM_WIDTH_REQUIRED, ITEM_WIDTH_ERROR_ID, ITEM_WIDTH_INPUT_ID) && !isNaN(parseFloat(formItemWidth));
        let itemLengthValid = hasValue(formItemLength, ITEM_LENGTH_REQUIRED, ITEM_LENGTH_ERROR_ID, ITEM_LENGTH_INPUT_ID) && !isNaN(parseFloat(formItemLength));
        let itemHeightValid = hasValue(formItemHeight, ITEM_HEIGHT_REQUIRED, ITEM_HEIGHT_ERROR_ID, ITEM_HEIGHT_INPUT_ID) && !isNaN(parseFloat(formItemHeight));

        // If valid, submit the form.
        if (itemNameValid && itemWeightValid && itemWidthValid && itemLengthValid && itemHeightValid) {
            this.submit();
        } else {
            event.preventDefault();
            $('#modifyUserForm')[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    const ITEM_NAME_REQUIRED = "Please, enter an item name";
    const ITEM_WEIGHT_REQUIRED = "Please, enter an item weight";
    const ITEM_WIDTH_REQUIRED = "Please, enter item width";
    const ITEM_LENGTH_REQUIRED = "Please, enter item length";
    const ITEM_HEIGHT_REQUIRED = "Please, enter item height";
    
    const ITEM_NAME_ERROR_ID = 'itemNameError';
    const ITEM_WEIGHT_ERROR_ID = 'itemWeightError';
    const ITEM_WIDTH_ERROR_ID = 'itemWidthError';
    const ITEM_LENGTH_ERROR_ID = 'itemLengthError';
    const ITEM_HEIGHT_ERROR_ID = 'itemHeightError';

    
    const ITEM_NAME_INPUT_ID = 'itemNameInput';
    const ITEM_WEIGHT_INPUT_ID = 'itemWeightInput';
    const ITEM_WIDTH_INPUT_ID = 'itemWidthInput';
    const ITEM_LENGTH_INPUT_ID = 'itemLengthInput';
    const ITEM_HEIGHT_INPUT_ID = 'itemHeightInput';
});