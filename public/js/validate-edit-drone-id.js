
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
        let element = $('#'+errorElementId);
        element.removeClass('hide');
        element.text(errorMessage);
    }
    function hideError(inputErrorId) {
        let element = $('#'+inputErrorId);
        element.addClass('hide');
        element.text('');
    }

    $('#modifyUserForm').submit(function(event) {
        
        event.preventDefault();

        let formPilotName = $('#'+ PILOT_NAME_INPUT_ID).val();
        let formDroneName = $('#'+ DRONE_NAME_INPUT_ID).val();
        let formPilotId = $('#'+ PILOT_ID_INPUT_ID).val();
        let formDroneSerialNumber = $('#'+ SERIAL_NUMBER_INPUT_ID).val();
    
        // validate the form
        let pilotNameValid = hasValue(formPilotName, PILOT_NAME_REQUIRED, PILOT_NAME_ERROR_ID, PILOT_NAME_INPUT_ID);
        let droneNameValid = hasValue(formDroneName, DRONE_NAME_REQUIRED, DRONE_NAME_ERROR_ID, DRONE_NAME_INPUT_ID);
        let pilotIdValid = hasValue(formPilotId, PILOT_ID_REQUIRED, PILOT_ID_ERROR_ID, PILOT_ID_INPUT_ID);
        let serialNumberValid = hasValue(formDroneSerialNumber, SERIAL_NUMBER_REQUIRED, SERIAL_NUMBER_ERROR_ID, SERIAL_NUMBER_INPUT_ID);

        // if valid, submit the form.
        if (pilotNameValid && droneNameValid && pilotIdValid && serialNumberValid) {
            this.submit();
        } else {
            event.preventDefault();
            $('#modifyUserForm')[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    const DRONE_NAME_REQUIRED = "Please, enter a drone name";
    const PILOT_NAME_REQUIRED = "Please, enter a pilot name";
    const PILOT_ID_REQUIRED = "Please, enter a pilot id";
    const SERIAL_NUMBER_REQUIRED = "Please, entre a serial number";
    
    const DRONE_NAME_ERROR_ID = 'droneNameError';
    const PILOT_NAME_ERROR_ID = 'pilotNameError';
    const PILOT_ID_ERROR_ID = 'pilotIdError';
    const SERIAL_NUMBER_ERROR_ID = 'serialNumberError';

    
    const DRONE_NAME_INPUT_ID = 'droneNameInput';
    const PILOT_NAME_INPUT_ID = 'pilotNameInput';
    const PILOT_ID_INPUT_ID = 'pilotIdInput';
    const SERIAL_NUMBER_INPUT_ID = 'serialNumberInput';

});
