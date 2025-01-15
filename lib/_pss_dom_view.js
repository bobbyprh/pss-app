// Adding header <div>.
document.body.appendChild(dom_gen.create('div',false).add_attribute('class','header').output);
// Adding searchbox with always uppercase.
dom_gen.create('input',false).add_attribute('id','search-box').add_on('.header')
const search_box = dom_control.select('query_selector','#search-box').output;
search_box.addEventListener('input',function(){
    this.value = this.value.toUpperCase();
});

document.body.appendChild(dom_gen.create('div',false).add_attribute('class','content-space').output);

function f_body_style(x){
    let y = Object.keys(x);
    for (let i = 0; i < y.length; i++){
        document.body.style[y[i]] = x[y[i]];
    }
}

// Function for adjusting element style and attribute, x is object list.
function element_settings(x,selector_class){
    let y = Object.keys(x);
    for (let i = 0; i < y.length; i++){
        switch (y[i]){
            case 'style' :
                let yy = Object.keys(x['style']);
                for (let j = 0; j < yy.length; j++ ){
                    dom_control.select('query_selector',selector_class).output.style[yy[j]] = x['style'][yy[j]];
                }
                break;
            case 'attribute' :
                let zz = Object.keys(x['attribute']);
                for (let j = 0; j < zz.length; j++ ){
                    dom_control.select('query_selector',selector_class).output[zz[j]] = x['attribute'][zz[j]];
                }
                break;
        }
    
    }
}

const body_style = {
    'backgroundColor': 'rgb(231, 240, 220)',
    'fontFamily': 'Cambria, Cochin, Georgia, Times, "Times New Roman", serif',
    'margin': '0',
    'padding': '0',
    'fontSize': '12px'
};

const content_space_settings = {
    'style': {
        'display': 'block',
        'backgroundColor': 'rgb(231, 240, 220, 0)',
        'left': '5%',
        'height': '90%',
        'width': '95%',
        'position': 'absolute',
        'overflow': 'auto',
        'top': '50px',
        'zIndex': '0'
    }
};

const header_settings = {
    'style': {
        'backgroundColor': 'rgb(89, 116, 69)',
        'position': 'fixed',
        'width': '100%',
        'height': '40px',
        'zIndex': '2'
    }
};

const searchbox_settings = {
    'style' : {
        'borderColor': 'lightgray',
        'borderRadius': '15px',
        'outline': 'none',
        'width': '120px',
        'height': '20px',
        'textAlign': 'center',
        'backgroundColor': 'white',
        'fontSize': 'xx-small',
        'fontWeight': 'bold',
        'position': 'absolute',
        'top': '7.5px',
        'right': '25px'
    },
    'attribute' : {
        'type': 'text',
        'placeholder': 'Toy...',
        'autocomplete': 'off'
    }
}

f_body_style(body_style);
element_settings(header_settings,'.header');
element_settings(searchbox_settings,'#search-box');
element_settings(content_space_settings,'.content-space');


// ADDING INSERT BUTTON AND CUSTOMIZE IT
// Adding Insert Data Button.
document.body.appendChild(dom_gen.create('div',false).add_attribute('class','insert-data').output);
dom_control.select('query_selector','.insert-data').innerchange(
    '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="rgb(89, 116, 69)" class="bi bi-patch-plus-fill" viewBox="0 0 16 16"><path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0"/></svg>'
);

const insert_button_settings = {
    'style': {
        'position': 'fixed',
        'width': '35px',
        'bottom': '5px',
        'height': '35px',
        'left': '10px',
        'zIndex': '3',
        'cursor': 'pointer'
    }
};

element_settings(insert_button_settings,'.insert-data');
// Rotating Insert Element.
let angle = 0;
let is_rotating = true;
function insert_rotate(){
    if (is_rotating){
        angle += 1;
        dom_control.select('query_selector','.bi-patch-plus-fill').output.style.transform = `rotate(${angle}deg)`;
        requestAnimationFrame(insert_rotate);
    }
}
insert_rotate();

// Insert Button when mouseover and mouseout.
const button_insert = dom_control.select('query_selector','.insert-data').output;
button_insert.addEventListener('mouseover', function(){
    dom_control.select('query_selector','.bi-patch-plus-fill').add_attribute('fill','rgb(114, 151, 98)').output;
    is_rotating = false;
});
button_insert.addEventListener('mouseout', function(){
    dom_control.select('query_selector','.bi-patch-plus-fill').add_attribute('fill','rgb(89, 116, 69)').output;
    is_rotating = true;
    insert_rotate();
});

// Make Insert File Container.
document.body.appendChild(dom_gen.create('div',false).add_attribute('class','input-window').output);
const input_window_settings = {
    'style': {
        'display': 'none',
        'position': 'fixed',
        'backgroundColor': 'rgba(89, 116, 69, 0.5)',
        'height': '100%',
        'width': '100%',
        'zIndex': '4'
    }
};
element_settings(input_window_settings,'.input-window');
const insert_window = dom_control.select('query_selector','.input-window').output;
button_insert.addEventListener('click', function(){
    insert_window.style.display = 'block';
});
window.onkeydown = function(e){
    if (e.keyCode === 27){
        insert_window.style.display = 'none';
    }
};

// Make Drag and Drop Area
dom_gen.create('div',false).add_attribute('class','input-area-before').add_on('.input-window');
dom_gen.create('div',true,'drop ship plan before here').add_attribute('class','text-before').add_on('.input-area-before');
dom_gen.create('input',false).add_attribute('id','input-file-before').add_on('.input-area-before');

dom_gen.create('div',false).add_attribute('class','input-area-after').add_on('.input-window');
dom_gen.create('div',true,'drop ship plan after here').add_attribute('class','text-after').add_on('.input-area-after');
dom_gen.create('input',false).add_attribute('id','input-file-after').add_on('.input-area-after');

const input_file_settings = {
    'attribute': {
        'type': 'file',
        'accept': '.csv'
    },
    'style': {
        'display': 'none'
    }
};
const input_area_settings = {
    'style': {
        'position': 'relative',
        'backgroundColor': 'rgb(231, 240, 220)',
        'display': 'inline-flex',
        'height': '100px',
        'width': '120px',
        'left': 'calc(50vw - 130px)',
        'top': 'calc(50vh - 50px)',
        'margin': '10px',
        'borderTop': '5px solid rgb(89, 116, 69)',
        'borderBottom': '5px solid rgb(89, 116, 69)',
        'opacity': '90%',
        'alignItems': 'center'
    }
};

const text_input_settings = {
    'style': {
        'display': 'flex',
        'position': 'absolute',
        'textAlign': 'center',
        'justifyContent': 'center',
        'width': '100%'
    }
};

element_settings(input_area_settings,'.input-area-before');
element_settings(input_area_settings,'.input-area-after');
element_settings(text_input_settings,'.text-before')

element_settings(input_file_settings,'#input-file-before');
element_settings(input_file_settings,'#input-file-after');
element_settings(text_input_settings,'.text-after')

const drop_zone_before = dom_control.select('query_selector','.input-area-before').output;
const text_before = dom_control.select('query_selector','.text-before').output;

const drop_zone_after = dom_control.select('query_selector','.input-area-after').output;
const text_after = dom_control.select('query_selector','.text-after').output;

drop_zone_before.addEventListener('dragover', (e) => {
    e.preventDefault();
    drop_zone_before.style.boxShadow = '5px 5px 2.5px grey';
});

drop_zone_after.addEventListener('dragover', (e) => {
    e.preventDefault();
    drop_zone_after.style.boxShadow = '5px 5px 2.5px grey';
});

drop_zone_before.addEventListener('dragleave', () => {
    drop_zone_before.style.boxShadow = 'none';
});

drop_zone_after.addEventListener('dragleave', () => {
    drop_zone_after.style.boxShadow = 'none';
});


// Make Calculate Button
dom_gen.create('div',true,'Calculate').add_attribute('id','calculate-button').add_on('.input-window');
const calculate_button = dom_control.select('query_selector','#calculate-button').output;
const calculate_button_settings = {
    'style': {
        'position': 'relative',
        'display': 'flex',
        'width': '75px',
        'height': '25px',
        'backgroundColor': 'rgb(89, 116, 69)',
        'justifyContent': 'center',
        'alignItems': 'center',
        'fontWeight': 'bold',
        'color': 'rgb(231, 240, 220)',
        'borderRadius': '10px',
        'cursor': 'pointer',
        'top': 'calc(50vh - 77.5px)',
        'left': 'calc(50vw - 30px)'
    }
};
element_settings(calculate_button_settings,'#calculate-button');

// Create Loading Screen
document.body.appendChild(dom_gen.create('div',false).add_attribute('class','loading-window').output);
const loading_window = dom_control.select('query_selector','.loading-window').output;
dom_gen.create('div',false).add_attribute('class','loading-screen').add_on('.loading-window');

const loading_window_settings = {
    'style': {
        'position': 'fixed',
        'display': 'none',
        'zIndex': '3',
        'backgroundColor': 'rgba(89, 116, 69, 0.5)',
        'width': '100%',
        'height': '100%'
    }
};
element_settings(loading_window_settings,'.loading-window');

