// NAVIGATOR
dom_control.select('query_selector','.main-nav .front-layer').innerchange(
    '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>'
);

dom_control.select('query_selector','.main-nav').output.addEventListener('click', function(){
    const nav_sub = dom_control.select('class','sub').output;
    for (let i = 0; i < nav_sub.length; i++){
        if (window.getComputedStyle(nav_sub[i]).display === 'none') {
            nav_sub[i].classList.toggle('nav-in' + (i+1));
            nav_sub[i].classList.toggle('nav-out' + (i+1));
            dom_control.select('query_selector','.main-nav .front-layer').innerchange(
                '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/><svg>'
            );
            
        } else {
            nav_sub[i].classList.toggle('nav-in' + (i+1));
            nav_sub[i].classList.toggle('nav-out' + (i+1));
            dom_control.select('query_selector','.main-nav .front-layer').innerchange(
                '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/></svg>'
            );
        }
    }
});


// INPUT CONTAINER
dom_gen.create('input',false).add_attribute('type','file').add_attribute('id','input-file1').add_attribute('accept','.csv').add_on('.inner-input-container');
dom_gen.create('input',false).add_attribute('type','file').add_attribute('id','input-file2').add_attribute('accept','.csv').add_on('.inner-input-container');
dom_gen.create('button',true,'Execute').add_attribute('id','execute-file').add_on('.inner-input-container');

// CLOSE INPUT CONTAINER WHEN ESC BUTTON PUSHED
window.onkeydown = function(e){
    if (e.keyCode === 27){
        close_input_container();
    }
};

// Opening/Closing Input Container
function open_input_container(){
    dom_control.select('query_selector','.input-container').output.style.display = 'block';
}

function close_input_container(){
    dom_control.select('query_selector','.input-container').output.style.display = 'none';
}

// Opening/Closing Loading Screen
function open_loading_screen(){
    dom_control.select('query_selector','.loading-screen-back-layer').output.style.display = 'block';
}

function close_loading_screen(){
    dom_control.select('query_selector','.loading-screen-back-layer').output.style.display = 'none';
}