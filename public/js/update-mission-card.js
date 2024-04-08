$(document).ready(() => {

    // ----------------- CARDS Animations -------------------

    // This variable prevents that when the card is first clicked
    // that the card add the class clicked and removes it in the 
    // next line
    let noFirstClickTeam = false;
    let noFirstClickDrone = false;
    let enabledDroneId = '';
    let enabledTeamId = '';
    let enabledDroneArrIndex = -1;
    let enabledTeamArrIndex = -1;

    function cardHoverEffect() {
        let $this = $(this);

        $(this).children('.icon-container').toggleClass('hide');

        // when the card has not been clicked 
        if(!$(this).hasClass('clicked')) {
            $(this).removeClass('not-clicked');
            $(this).addClass('clicked');
            disableOtherCards($this);
        }

        // when the card was in a clicked state
        // We remove the clicked state and enter a fades out state
        // the border is removed momentarily with the hover effect
        // And added after a 500 milliseconds delays
        if($this.hasClass('drone')) {
            if($(this).hasClass('clicked') && noFirstClickDrone) {
                $(this).removeClass('clicked');
                $(this).addClass('fades-out');
                enableOtherCards($this);
                
                setTimeout(function(){
                    $this.addClass('not-clicked');
                    $this.removeClass('fades-out');
                    // It's not the first click so we reset it's value
                    // Only God knows why it must be false now 
                    noFirstClickDrone = false;
                }, 500);
            }
        } else {
            if($(this).hasClass('clicked') && noFirstClickTeam) {
                $(this).removeClass('clicked');
                $(this).addClass('fades-out');
                enableOtherCards($this);
                
                setTimeout(function(){
                    $this.addClass('not-clicked');
                    $this.removeClass('fades-out');
                    // It's not the first click so we reset it's value
                    // Only God knows why it must be false now 
                    noFirstClickTeam = false;
                }, 500);
            }
        }

        // If the first click happened we inverts the value of the no first click
        // The inverts is IMPORTANT 
        // Only God knows why 
        if($this.hasClass('drone')) {
            noFirstClickDrone = !noFirstClickDrone;
        } else {
            noFirstClickTeam = !noFirstClickTeam;
        }
    }

    // Adds card hover effect to all cards
    $('.card').click(cardHoverEffect);

    function disableOtherCards(cardClicked) {
        if($(cardClicked).hasClass('drone')) {
            let droneIdString = $(cardClicked).find('.droneIdInput').val(); 
            let droneArrIndex = $(cardClicked).find('.droneArrIndexInput').val();
            enabledDroneId = droneIdString.trim();
            enabledDroneArrIndex = parseInt(droneArrIndex);
            
            $('#droneIdInputFinal').val(enabledDroneId);
            $('#droneArrIndexInputFinal').val(enabledDroneArrIndex);


        } else {
            let teamIdString = $(cardClicked).find('.teamIdInput').val(); 
            let teamArrIndex = $(cardClicked).find('.teamArrIndexInput').val();

            console.log(`arrayIndex: ${teamArrIndex}` );

            enabledTeamId = teamIdString.trim();
            enabledTeamArrIndex = parseInt(teamArrIndex);

            $('#teamIdInputFinal').val(enabledTeamId);
            $('#teamArrIndexInputFinal').val(enabledTeamArrIndex);
        }

        if($(cardClicked).hasClass('drone')) {
            $('.card-room').not('.team').not(cardClicked).each(function() {
                $(this).addClass('disabled');
                $(this).removeClass('not-clicked');
                $(this).off('click');
                $(this).find('.card-title').addClass('disabled');
                $(this).find('.price').addClass('disabled');
            });
        } else {
            $('.card-room').not('.drone').not(cardClicked).each(function() {
                $(this).addClass('disabled');
                $(this).removeClass('not-clicked');
                $(this).off('click');
                $(this).find('.card-title').addClass('disabled');
                $(this).find('.price').addClass('disabled');
            });
        }
    }

    function enableOtherCards(cardClicked) {
        //reset the price of the hidden input
        if($(cardClicked).hasClass('drone')){
            enabledDroneId = '';
            enabledDroneArrIndex = '';
            $('#droneIdInputFinal').val(enabledDroneId);
            $('#droneArrIndexInputFinal').val(enabledDroneArrIndex);
        } else {
            enabledTeamId = '';
            enabledTeamArrIndex = '';
            $('#teamIdInputFinal').val(enabledTeamId);
            $('#teamArrIndexInputFinal').val(enabledTeamArrIndex);

        }

        if($(cardClicked).hasClass('drone')){
        $('.card-room').not('.team').not(cardClicked).each(function() {
            $(this).removeClass('disabled');
           $(this).addClass('not-clicked');
           $(this).click(cardHoverEffect);
           $(this).find('.card-title').removeClass('disabled');
           $(this).find('.price').removeClass('disabled');
           noFirstClickDrone = false;
        });
        } else {
            $('.card-room').not('.drone').not(cardClicked).each(function() {
                $(this).removeClass('disabled');
               $(this).addClass('not-clicked');
               $(this).click(cardHoverEffect);
               $(this).find('.card-title').removeClass('disabled');
               $(this).find('.price').removeClass('disabled');
               noFirstClickTeam = false;
            });
        }

    }
    function disableAllCards() {
        $('.card-room').each(function() {
           $(this).addClass('disabled');
           $(this).removeClass('not-clicked');
           $(this).off('click');
           $(this).find('.card-title').addClass('disabled');
           $(this).find('.price').addClass('disabled');
        });
    }
    function enableAllCards() {
        $('.card-room').each(function() {
           $(this).removeClass('disabled');
           $(this).addClass('not-clicked');
           $(this).click(cardHoverEffect);
           $(this).find('.card-title').removeClass('disabled');
           $(this).find('.price').removeClass('disabled');
           noFirstClick = false;
        });
    }

    // ----------------- CARDS Animations -------------------
    
});