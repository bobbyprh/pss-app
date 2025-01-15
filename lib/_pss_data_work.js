// ----- SHIP PLAN 2 WEEKS COMPARISON -----
const input_file_before = dom_control.select('query_selector','#input-file-before').output;
const input_file_after = dom_control.select('query_selector','#input-file-after').output;

drop_zone_before.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    try {
        if (files.length > 0){
            input_file_before.files = files;
            // console.log(input_file_before.files[0]);
            text_before.innerHTML = 'I ♡ U';
        }}
    catch(err) {
        text_before.innerHTML = err;
    }
    drop_zone_before.style.boxShadow = 'none';
});

drop_zone_after.addEventListener('drop', (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    try {
        if (files.length > 0){
            input_file_after.files = files;
            // console.log(input_file_after.files[0]);
            text_after.innerHTML = 'I ♡ U';
        }}
    catch(err) {
        text_after.innerHTML = err;
    }
    drop_zone_after.style.boxShadow = 'none';
});

const we_before_list = [];
const we_after_list = [];

const obj_data_before = {};
const obj_data_after = {};

const obj_toy_identity = {};

calculate_button.addEventListener('click', async () => {
    insert_window.style.display = 'none';
    loading_window.style.display = 'block';

    // Reading CSV Before and After
    const data_before = await read_csv(input_file_before,1);
    const data_after = await read_csv(input_file_after,1);

    // Take file date based on file name
    const date_before = data_before[0].substring(0,8);
    const date_after = data_after[0].substring(0,8);

    we_before_list.push(dt_format.set_input(date_before).numtodate().seekdaydate('Sat').datetonum().output);
    we_after_list.push(dt_format.set_input(date_after).numtodate().seekdaydate('Sat').datetonum().output);

    // Define date list in array
    for (let i = 0; i < 25; i++){
        const dt1 = dt_format.set_input(we_before_list[i]).numtodate().add_day(7).datetonum().output;
        const dt2 = dt_format.set_input(we_after_list[i]).numtodate().add_day(7).datetonum().output;
        we_before_list.push(dt1);
        we_after_list.push(dt2);
    }

    // Transform file 'BEFORE' into custom JSON format
    for (let i = 1; i < data_before.length; i++){
        if (data_before[i]['Dash'] !== "'9DXX"){
            if (typeof obj_data_before[data_before[i]['Company']] === 'undefined') obj_data_before[data_before[i]['Company']] = {};
            
            if (typeof obj_data_before[data_before[i]['Company']][data_before[i]['Toy']] === 'undefined') obj_data_before[data_before[i]['Company']][data_before[i]['Toy']] = {};
            
            if (typeof obj_data_before[data_before[i]['Company']][data_before[i]['Toy']][data_before[i]['Market']] === 'undefined') obj_data_before[data_before[i]['Company']][data_before[i]['Toy']][data_before[i]['Market']] = {};

            if (typeof obj_data_before[data_before[i]['Company']][data_before[i]['Toy']][data_before[i]['Market']][data_before[i]['Dash']] === 'undefined') obj_data_before[data_before[i]['Company']][data_before[i]['Toy']][data_before[i]['Market']][data_before[i]['Dash']] = {};

            if (typeof obj_data_before[data_before[i]['Company']][data_before[i]['Toy']][data_before[i]['Market']][data_before[i]['Dash']]['NTP'] === 'undefined') obj_data_before[data_before[i]['Company']][data_before[i]['Toy']][data_before[i]['Market']][data_before[i]['Dash']]['NTP'] = {};

            if (typeof obj_data_before[data_before[i]['Company']][data_before[i]['Toy']][data_before[i]['Market']][data_before[i]['Dash']]['SHIP'] === 'undefined') obj_data_before[data_before[i]['Company']][data_before[i]['Toy']][data_before[i]['Market']][data_before[i]['Dash']]['SHIP'] = {};

            if (typeof obj_toy_identity[data_before[i]['Toy']] === 'undefined' ) obj_toy_identity[data_before[i]['Toy']] = {};
            
            obj_toy_identity[data_before[i]['Toy']]['GRS1'] = data_before[i]['GRS1 Desc'];
            obj_toy_identity[data_before[i]['Toy']]['Aprice'] = parseFloat(data_before[i]['A price']);
            obj_toy_identity[data_before[i]['Toy']]['Exf$'] = parseFloat(data_before[i]['Exf$']);
            
            for (let j = 0; j < we_before_list.length; j++){
                let temp_date1 = dt_format.set_input(we_before_list[j]).numtodate().mmdd().output;
                obj_data_before[data_before[i]['Company']][data_before[i]['Toy']][data_before[i]['Market']][data_before[i]['Dash']]['NTP'][we_before_list[j]] = parseInt(data_before[i]['NTW-'+temp_date1]);
                obj_data_before[data_before[i]['Company']][data_before[i]['Toy']][data_before[i]['Market']][data_before[i]['Dash']]['SHIP'][we_before_list[j]] = parseInt(data_before[i]['SHPW-'+temp_date1]);
            }
        }
    }

    // Transform file 'AFTER' into custom JSON format
    for (let i = 1; i < data_after.length; i++){
        if (data_after[i]['Dash'] !== "'9DXX"){
            if (typeof obj_data_after[data_after[i]['Company']] === 'undefined') obj_data_after[data_after[i]['Company']] = {};
            
            if (typeof obj_data_after[data_after[i]['Company']][data_after[i]['Toy']] === 'undefined') obj_data_after[data_after[i]['Company']][data_after[i]['Toy']] = {};
            
            if (typeof obj_data_after[data_after[i]['Company']][data_after[i]['Toy']][data_after[i]['Market']] === 'undefined') obj_data_after[data_after[i]['Company']][data_after[i]['Toy']][data_after[i]['Market']] = {};

            if (typeof obj_data_after[data_after[i]['Company']][data_after[i]['Toy']][data_after[i]['Market']][data_after[i]['Dash']] === 'undefined') obj_data_after[data_after[i]['Company']][data_after[i]['Toy']][data_after[i]['Market']][data_after[i]['Dash']] = {};

            if (typeof obj_data_after[data_after[i]['Company']][data_after[i]['Toy']][data_after[i]['Market']][data_after[i]['Dash']]['NTP'] === 'undefined') obj_data_after[data_after[i]['Company']][data_after[i]['Toy']][data_after[i]['Market']][data_after[i]['Dash']]['NTP'] = {};

            if (typeof obj_data_after[data_after[i]['Company']][data_after[i]['Toy']][data_after[i]['Market']][data_after[i]['Dash']]['SHIP'] === 'undefined') obj_data_after[data_after[i]['Company']][data_after[i]['Toy']][data_after[i]['Market']][data_after[i]['Dash']]['SHIP'] = {};

            if (typeof obj_toy_identity[data_after[i]['Toy']] === 'undefined' ) obj_toy_identity[data_after[i]['Toy']] = {};
            
            obj_toy_identity[data_after[i]['Toy']]['GRS1'] = data_after[i]['GRS1 Desc'];
            obj_toy_identity[data_after[i]['Toy']]['Aprice'] = parseFloat(data_after[i]['A price']);
            obj_toy_identity[data_after[i]['Toy']]['Exf$'] = parseFloat(data_after[i]['Exf$']);

            for (let j = 0; j < we_after_list.length; j++){
                let temp_date1 = dt_format.set_input(we_after_list[j]).numtodate().mmdd().output;
                obj_data_after[data_after[i]['Company']][data_after[i]['Toy']][data_after[i]['Market']][data_after[i]['Dash']]['NTP'][we_after_list[j]] = parseInt(data_after[i]['NTW-'+temp_date1]);
                obj_data_after[data_after[i]['Company']][data_after[i]['Toy']][data_after[i]['Market']][data_after[i]['Dash']]['SHIP'][we_after_list[j]] = parseInt(data_after[i]['SHPW-'+temp_date1]);
            }
        }
    }

    console.log(obj_data_before);
    console.log(obj_data_after);
    console.log(obj_toy_identity);

    text_before.innerHTML = "drop ship plan before here";
    text_after.innerHTML = "drop ship plan after here";
    loading_window.style.display = 'none';
});

let obj_output = {};

search_box.addEventListener('keypress',(e) => {
    if (e.key === 'Enter'){
        let temp_output = {'before': {}, 'after': {}};
        let filter_value = search_box.value;
        let company = Object.keys(obj_data_before)[0];
        temp_output['before'] = obj_data_before[company][filter_value] || {};
        temp_output['after'] = obj_data_after[company][filter_value] || {};
        obj_output = temp_output;
        console.log(obj_output);

        let we_list = [...new Set([...we_before_list, ...we_after_list])].sort();
        let enter_space = ['',''];
        let view_array = [['Prod W/E','']];
        for (let i = 0; i < we_list.length; i++){
            view_array[0][i+2] = dt_format.set_input(we_list[i]).numtodate().mmdd().output; 
            enter_space.push('');
        }

        let market_list = [...new Set([...Object.keys(temp_output['before'] || {}), ...Object.keys(temp_output['after'] || {})])].sort();
        let k = 1;
        for (let i = 0; i < market_list.length; i++){
            view_array.push([market_list[i],'LT:']);
            view_array.push(['Est. Avail','']);
            for (let j = 0; j < we_list.length; j++){
                view_array[k][j+2] = '';
                view_array[k+1][j+2] = 'LT';
            }
            k = view_array.length;
            let dash_list = [...new Set([...Object.keys(temp_output['before'][market_list[i]] || {}), ...Object.keys(temp_output['after'][market_list[i]] || {})])].sort();
            for (let j = 0; j < dash_list.length; j++){
                view_array.push([dash_list[j],'']);
                view_array.push(['Before','NTP']);
                view_array.push(['','SHP']);
                view_array.push(['After','NTP']);
                view_array.push(['','SHP']);
                view_array.push(['Variance','NTP']);
                view_array.push(['','SHP']);
                for (let l = 0; l < we_list.length; l++){
                    view_array[k][l+2] = '';
                    view_array[k+1][l+2] = parseFloat((temp_output['before'][market_list[i]]?.[dash_list[j]]?.['NTP']?.[we_list[l]]/1000).toFixed(1)) || '';
                    view_array[k+2][l+2] = parseFloat((temp_output['before'][market_list[i]]?.[dash_list[j]]?.['SHIP']?.[we_list[l]]/1000).toFixed(1)) || '';
                    view_array[k+3][l+2] = parseFloat((temp_output['after'][market_list[i]]?.[dash_list[j]]?.['NTP']?.[we_list[l]]/1000).toFixed(1)) || '';
                    view_array[k+4][l+2] = parseFloat((temp_output['after'][market_list[i]]?.[dash_list[j]]?.['SHIP']?.[we_list[l]]/1000).toFixed(1)) || '';
                    view_array[k+5][l+2] = view_array[k+3][l+2] === '' ? '' : parseFloat((view_array[k+3][l+2] - view_array[k+1][l+2]).toFixed(1));
                    view_array[k+6][l+2] = view_array[k+4][l+2] === '' ? '' : parseFloat((view_array[k+4][l+2] - view_array[k+2][l+2]).toFixed(1));
                }
                k = view_array.length;
            }
            view_array.push(enter_space);
            k = view_array.length;
        }

        // Creating Output Table
        gen_table(view_array,'table-compare-before-after','.content-space');
        const table_compare_settings = {
            'style': {
                'position': 'relative',
                'tableLayout': 'fixed',
                'width': '100%',
                'fontSize': '11px',
                'borderSpacing': '0'
            }
        }
        element_settings(table_compare_settings,'.table-compare-before-after');
        

        const all_cells = document.querySelectorAll('td');
        all_cells.forEach( (e) => {
            e.style.width = '45px';
            e.style.textAlign = 'center';
            e.style.verticalAlign = 'middle';
        });
        const first_row = dom_control.select('query_selector','.table-compare-before-after tr').output;
        first_row.style.backgroundColor = 'rgb(89, 116, 69)';
        first_row.style.fontWeight = 'bold';
        first_row.style.position = 'sticky';
        first_row.style.top = '0';
        first_row.style.zIndex = '1';

        const first_column = document.querySelectorAll('.table-compare-before-after td:nth-child(1)');
        const second_column = document.querySelectorAll('.table-compare-before-after td:nth-child(2)');
        for (let i = 0; i < first_column.length; i++){
            first_column[i].style.position = 'sticky';
            first_column[i].style.left = '0';
            second_column[i].style.position = 'sticky';
            second_column[i].style.left = '57px';
        }
        
        const first_two_column = dom_control.select('query_selector','.table-compare-before-after').output;
        for (let i = 0; i < first_two_column.rows.length; i++){
            first_two_column.rows[i].cells[0].style.backgroundColor = 'rgb(89, 116, 69)';
            first_two_column.rows[i].cells[0].style.width = '55px';
            first_two_column.rows[i].cells[1].style.backgroundColor = 'rgb(89, 116, 69)';
            first_two_column.rows[i].cells[1].style.width = '55px';
        }
    
    }
});
