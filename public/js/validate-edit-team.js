$(document).ready(function () {
    
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

   function validateAllNames() {
    let isOneNameInvalid = false;
    let memberRows = $('.team-member-row');
    console.log(`rows: ${JSON.stringify(memberRows, null, 2)}`);
    let loopError = false;
    memberRows.each(function(index) {
        loopError = false;
        let memberName = $(this).find('input.memberName').val();
        let memberRole = $(this).find('input.memberRole').val();
        let memberLeader = $(this).find('input.memberLeader').is(':checked');

        if(memberName.length <= 0) {
            $(this).find('.memberNameError').text(MEMBER_NAME_REQUIRED);
            $(this).find('.memberNameError').toggleClass('hide');
            isOneNameInvalid = true;
            loopError = true;
        }
        if(memberRole.length <= 0) {
            $(this).find('.memberRoleError').text(MEMBER_ROLE_REQUIRED);
            $(this).find('.memberRoleError').toggleClass('hide');
            isOneNameInvalid = true;
            loopError = true;
        }
        if (!loopError) {
            $(this).find('.memberNameError').text('');
            $(this).find('.memberNameError').toggleClass('hide');
    
            $(this).find('.memberRoleError').text('');
            $(this).find('.memberRoleError').toggleClass('hide');
        }
    });
    if(isOneNameInvalid) {
        return false;
    } 
    return true;

   } 

   function validateRoles() {
    let hasOneRole = false;
    $('input.memberLeader').each(function() {
        if($(this).is(':checked')) {
            hasOneRole = true;
        }
    });
    if(!hasOneRole) {
        $('#memberRoleErrorContainer').toggleClass('hide').text(LEADER_REQUIRED);
    } else {
        $('#memberRoleErrorContainer').toggleClass('hide').text('');
    }
    return hasOneRole;
   }

   function validateTeamName() {
    
   }

   function showAllErrors() {
    
   }


   $('#modifyTeamForm').submit(function(event) {

    event.preventDefault();

    let teamName = $('#teamNameInput').val();
    
    let namesValid = validateAllNames();
    let roleValid = validateRoles();
    let teamNameValid = hasValue(teamName, TEAM_NAME_REQUIRED, TEAM_NAME_ERROR_ID, TEAM_NAME_INPUT_ID);
    console.log(`names valid: ${namesValid}`);
    console.log('role validate: ', validateRoles());
    console.log(`teamName valid: ${teamNameValid}`);


    if(namesValid && roleValid) {
        this.submit();
    } else {
        event.preventDefault();
        $('#modifyTeamForm')[0].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

   });

   const MEMBER_NAME_REQUIRED = 'Please enter a name';
   const TEAM_NAME_REQUIRED = 'Please enter a team name';
   const MEMBER_ROLE_REQUIRED = 'Please enter a role';
   const LEADER_REQUIRED = 'One member at least must to be the leader';

   const TEAM_NAME_INPUT_ID = 'teamNameInput';
   const TEAM_NAME_ERROR_ID = 'teamNameError';

});