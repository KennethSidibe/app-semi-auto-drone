$(document).ready(function () {
   
    // To remove a member from team style the page
    $('.remove-member-btn').click(function() {
        if(!$(this).hasClass('removeMode')) {
            $(this).text('Remove Member');
            $(this).toggleClass('btn-danger');
            $(this).toggleClass('btn-primary');
            $(this).toggleClass('removeMode');
    
    
            var memberRow = $(this).closest('.team-member-row');
            memberRow.toggleClass('removed');
            let memberTitle = memberRow.find('.memberTitle').toggleClass('disable-member').attr("aria-disabled", false);
            let memberNameInput = memberRow.find('.memberName').prop('disabled', false);
            let memberNameLabel = memberRow.find('.memberNameLabel').toggleClass('disable-member').attr("aria-disabled", false);
            let memberRoleInput = memberRow.find('.memberRole').prop('disabled', false);
            let memberRoleLabel = memberRow.find('.memberRoleLabel').toggleClass('disable-member').attr("aria-disabled", false);
            let memberLeaderInput = memberRow.find('.memberLeader').prop('disabled', false);
            let memberLeaderLabel = memberRow.find('.memberLeaderLabel').toggleClass('disable-member').attr("aria-disabled", false);
    
        } else {

            $(this).text('Add Back Member');
            $(this).toggleClass('btn-danger');
            $(this).toggleClass('btn-primary');
            $(this).toggleClass('removeMode');


            var memberRow = $(this).closest('.team-member-row');
            memberRow.toggleClass('removed');
            let memberTitle = memberRow.find('.memberTitle').toggleClass('disable-member').attr("aria-disabled", true);
            let memberNameInput = memberRow.find('.memberName').prop('disabled', true);
            let memberNameLabel = memberRow.find('.memberNameLabel').toggleClass('disable-member').attr("aria-disabled", true);
            let memberRoleInput = memberRow.find('.memberRole').prop('disabled', true);
            let memberRoleLabel = memberRow.find('.memberRoleLabel').toggleClass('disable-member').attr("aria-disabled", true);
            let memberLeaderInput = memberRow.find('.memberLeader').prop('disabled', true);
            let memberLeaderLabel = memberRow.find('.memberLeaderLabel').toggleClass('disable-member').attr("aria-disabled", true);
        }
    });

    $(document).on('keyup', 'input.memberName', function() {
        let memberRow = $(this).closest('.team-member-row');
        let memberNameLabel = memberRow.find('.memberTitle');
        let currentValue = $(this).val();
        memberNameLabel.text(currentValue);
    });

    $(document).on('keyup', '#teamNameInput', function() {
        let teamNameTitle = $('#teamNameTitle');
        let currentValue = $(this).val();
        teamNameTitle.text(currentValue);
    });

    $(document).on('click', 'input.memberLeader', function() {
        let isThisChecked = $(this).is(':checked');
        let isThisInitialLeader = $(this).hasClass('leaderInitial');
        console.log(`checked flag: ${isThisChecked} `);
        let $thisMemberLabel = $(this).parent().find('.memberLeaderLabel');

        if(isThisChecked) {
            // Si on a check
            $('input.memberLeader').not($(this)).prop('checked', false);
            $('input.memberLeader').not($(this)).prop('disabled', true);
            $('.memberLeaderLabel').not($thisMemberLabel).toggleClass('disable-member').attr("aria-disabled", true);
            

            $(this).prop('checked', true);
            $(this).prop('disabled', false);
        } else {
            // Si on n'a uncheck
            $('input.memberLeader').not($(this)).prop('checked', false);
            $('input.memberLeader').not($(this)).prop('disabled', false);
            $('.memberLeaderLabel').removeClass('disable-member').attr("aria-disabled", false);
            $(this).prop('checked', false);
        }

    });


    $('#add-member-btn').click(function () {
       let newMemberIndex = parseInt($('#lastMemberIndex').text()) + 1;
       let newMemberRow = $(`          
       <div class="row my-3 gy-4 team-member-row">

       <h3 class="text-primary mb-0 memberTitle">Member ${newMemberIndex}</h3>
       <div class="col-6">
         <label for="memberNameInput${newMemberIndex}" class="form-label memberNameLabel">New member name</label>
         <input
           type="text"
           class="form-control memberName"
           name="memberName${newMemberIndex}"
           value=""
           placeholder="Steve"
         />
         <div class="memberNameError hide form-text text-danger fw-medium"></div>
       </div>
 
       <div class="col-6">
         <label for="memberRoleInput" class="form-label memberRoleLabel">New member Role</label>
         <input
           type="text"
           class="form-control memberRole"
           name="memberRole${newMemberIndex}"
           value=""
           placeholder="Assistant"
         />
         <div class="memberRoleError hide form-text text-danger fw-medium"></div>
       </div>
 
       <div class="col-6">
           <label class="form-check-label memberLeaderLabel">New Leader</label>
           <input
               type="checkbox"
               class="form-check-input memberLeader"
               name="memberLeader${newMemberIndex}"
           />
       </div>

       <input type="hidden" name="memberId${newMemberIndex}" value="">
       <input type="hidden" name="memberStartedAt${newMemberIndex}" value="0">
 
       <div class="col-6 text-right">
       <button type="button" class="btn btn-danger removeMode remove-member-btn">Remove Member</button>
       </div>

     </div>`);
     $('#lastMemberIndex').text(newMemberIndex);
     $('#add-member-row').before(newMemberRow);

    });

});