 
 $(document).ready(function() {

    function hasValue(input, errorMessage, errorElementId, inputId) {
        if (input.trim() === "") {
            showError(errorElementId, errorMessage, inputId);
            return false;
        }
        hideError(errorElementId, inputId);
        return true;
    }

    function showError(errorElementId, errorMessage, inputId) {
        let element = $('#' + errorElementId);
        element.removeClass('hide');
        element.text(errorMessage);
        $('#' + inputId).addClass('is-invalid'); // Highlight the input field
    }
    function hideError(errorElementId, inputId) {
        let element = $('#' + errorElementId);
        element.addClass('hide');
        element.text('');
        

        $('#' + inputId).removeClass('is-invalid'); // Remove highlight from the input field
    }

    $('#submitFormBtn').click(function() {
        $('#modifyMission').submit();
    });

    // Validate form on submit
    $('#modifyMission').submit(function(event) {

        
        event.preventDefault(); // Prevent the default form submission

        // Get values from form inputs
        let missionType = $('#' + MISSION_TYPE_INPUT_ID).val();
        let missionUrgency = $('#' + MISSION_URGENCY_INPUT_ID).val();
        let missionActive = $('#' + MISSION_ACTIVE_INPUT_ID).val();
        let droneId = $('#' + DRONE_SELECTION_INPUT_ID_FINAL).val();
        let teamId = $('#' + TEAM_SELECTION_INPUT_ID_FINAL).val();

        
        // Validate the form fields
        let missionTypeValid = hasValue(missionType, MISSION_TYPE_REQUIRED, MISSION_TYPE_ERROR_ID, MISSION_TYPE_INPUT_ID);
        let missionUrgencyValid = hasValue(missionUrgency, MISSION_URGENCY_REQUIRED, MISSION_URGENCY_ERROR_ID, MISSION_URGENCY_INPUT_ID);
        let missionActiveValid = hasValue(missionActive, MISSION_ACTIVE_REQUIRED, MISSION_ACTIVE_ERROR_ID, MISSION_ACTIVE_INPUT_ID);
        let droneSelectionValid = hasValue(droneId, DRONE_SELECTION_REQUIRED, DRONE_SELECTION_ERROR_ID, DRONE_SELECTION_INPUT_ID_FINAL);
        let teamSelectionValid = hasValue(teamId, TEAM_SELECTION_REQUIRED, TEAM_SELECTION_ERROR_ID, TEAM_SELECTION_INPUT_ID_FINAL);

        console.log(`VALID: ${missionTypeValid}, droneSelect: ${droneSelectionValid}`);
        
        // If all validations pass, submit the form
        if (missionTypeValid && missionUrgencyValid && missionActiveValid && droneSelectionValid && teamSelectionValid) {
            this.submit(); // This refers to the form element, and calling submit() here submits the form.
        } else {
            // Scroll to top of the form to show errors if validation failed
            $(this).scrollTop(0);
        }
    });

     // Error Messages
    const MISSION_TYPE_REQUIRED = "Please, enter a mission type";
    const MISSION_URGENCY_REQUIRED = "Please, select the urgency level";
    const MISSION_ACTIVE_REQUIRED = "Please, specify if the mission is active";
    const DRONE_SELECTION_REQUIRED = "Please, select a drone";
    const TEAM_SELECTION_REQUIRED = "Please, select a team";

    // Error Element IDs
    const MISSION_TYPE_ERROR_ID = 'missionTypeError';
    const MISSION_URGENCY_ERROR_ID = 'missionUrgencyError';
    const MISSION_ACTIVE_ERROR_ID = 'missionActiveError';
    const DRONE_SELECTION_ERROR_ID = 'droneSelectionError';
    const TEAM_SELECTION_ERROR_ID = 'teamSelectionError';

    // Input IDs
    const MISSION_TYPE_INPUT_ID = 'missionTypeInput';
    const MISSION_URGENCY_INPUT_ID = 'missionUrgencyInput';
    const MISSION_ACTIVE_INPUT_ID = 'missionActiveInput';
    const DRONE_SELECTION_INPUT_ID_FINAL = 'droneIdInputFinal';
    const TEAM_SELECTION_INPUT_ID_FINAL = 'teamIdInputFinal';

});