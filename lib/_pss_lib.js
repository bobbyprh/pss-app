// Date Format Modification
const dt_format = {
    output: null,
    set_input(dt){
        this.output = dt;
        return this;
    },
    numtodate(){
        this.output = new Date(this.output.substring(0,4),this.output.substring(4,6)-1,this.output.substring(6,8));
        return this;
    },
    seekdaydate(dayname){
        let day = {
            Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6,Sun:7
        };
        this.output = new Date(this.output.setDate(this.output.getDate()-this.output.getDay()+day[dayname]));
        return this;
    },
    mmdd(){
        let day = this.output.getDate() < 10 ? '0' + this.output.getDate() : String(this.output.getDate());
        let month = this.output.getMonth() + 1 < 10 ? '0' + (this.output.getMonth()+1) : String(this.output.getMonth()+1);
        this.output = month + '/' + day;
        return this;
    },
    mmddyyyy(){
        let day = this.output.getDate() < 10 ? '0' + this.output.getDate() : String(this.output.getDate());
        let month = this.output.getMonth()+1 < 10 ? '0' + (this.output.getMonth()+1) : String(this.output.getMonth()+1);
        this.output = month + '/' + day + '/' + this.output.getFullYear();
        return this;
    },
    add_day(val){
        this.output = new Date(this.output.setDate(this.output.getDate()+val));
        return this;
    },
    datetonum(){
        let day = this.output.getDate() < 10 ? '0' + this.output.getDate() : String(this.output.getDate());
        let month = this.output.getMonth()+1 < 10 ? '0' + (this.output.getMonth()+1) : String(this.output.getMonth()+1);
        let year = String(this.output.getFullYear());
        this.output = year + month + day;
        return this;
    }
};

// DOMs
// DOM Selection and Edit
const dom_control = {
    output : null,
    select(by, value){
        switch (by){
            case 'id' :
                this.output = document.getElementById(value); //Returning element/object
                return this;
            case 'class' :
                this.output = document.getElementsByClassName(value); //Returning HTML Collection/array
                return this;
            case 'tag' :
                this.output = document.getElementsByTagName(value); //Returning HTML Collection/array
                return this;
            case 'query_selector' :
                this.output = document.querySelector(value); //Returning element/object 
                return this;
        }
    },
    innerchange(value){
        this.output.innerHTML = value;
        return this;
    },
    setcolor(type,color_name){
        switch (type){
            case 'text' :
                this.output.style.color = color_name;
                return this;
            case 'background' :
                this.output.style.backgroundColor = color_name;
                return this;
        }
    },
    class_control(action,value1,value2){
        switch (action){
            case 'add' :
                this.output.classList.add(value1);
                return this;
            case 'remove' :
                this.output.classList.remove(value1);
                return this;
            case 'toggle' :
                this.output.classList.toggle(value1);
                return this;
            case 'replace' :
                this.output.classList.replace(value1,value2);
                return this;
        }
    },
    add_attribute(attribute_name,value){
        this.output.setAttribute(attribute_name,value);
        return this;
    }
};

// DOM creation
const dom_gen = {
    output : null,
    create(element,with_text,text){
        let newelement = document.createElement(element);  
        if (with_text) {
            let newtext = document.createTextNode(text);
            newelement.appendChild(newtext);
        }
        this.output = newelement;
        return this;
    },
    add_attribute(what_attribute,val){
        switch (what_attribute){
            case 'type' :
                this.output.type = val;
                return this;
            case 'class' :
                this.output.className = val;
                return this;
            case 'id' :
                this.output.id = val;
                return this;
            case 'accept' :
                this.output.accept = val;
                return this;
        }
    },
    add_on(loc) {
        dom_control.select('query_selector',loc).output.appendChild(this.output);
    },
    insert_before(loc_in, loc_before) {
        let in_loc = dom_control.select('query_selector',loc_in).output;
        let before_loc = in_loc.querySelector(loc_before);
        in_loc.insertBefore(this.output,before_loc);
    },
    remove(parent_loc, child_loc){
        let parent = dom_control.select('query_selector',parent_loc).output;
        let child = parent.querySelector(child_loc);
        parent.removeChild(child);
    },
    replace(parent_loc, child_loc){
        let parent = dom_control.select('query_selector',parent_loc).output;
        let child = parent.querySelector(child_loc);
        parent.replaceChild(this.output,child);
    }
};


// CSV Reader
function read_csv(input,header_row){
    return new Promise (resolve => {
        const file = input.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(){
            const rows = reader.result.split('\n');
            const headers = rows[header_row].split(',');
            const json_data = [];
            for (let i = header_row + 1; i < rows.length - 1; i++){
                const values = rows[i].split(',');
                const obj = {};
                for (let j = 0; j < headers.length - 1; j++){
                    obj[headers[j].trim()] = values[j].trim();
                }
                json_data.push(obj);
            }
            json_data.splice(0,0,file['name']);
            // resolve(JSON.stringify(json_data)); 
            resolve(json_data);
        };
        reader.onerror = function(){
            console.log('File read error : ' + reader.error);
        }
    });
}

function actmonth(we){
    let dt = new Date(we.getFullYear(),we.getMonth(),we.getDate()-3);
    return dt.getMonth()+1;
}

function actyear(we){
    let dt = new Date(we.getFullYear(),we.getMonth(),we.getDate()-3);
    return dt.getFullYear();
}

function monthfirstwe(monthnum,yearnum){
    let md = dt_format.set_input(new Date(yearnum,monthnum-1,0)).seekdaydate('Sat').output;
    return actmonth(md) === monthnum ? md : dt_format.set_input(md).add_day(7).output;
}

function monthlastwe(monthnum,yearnum){
    if (monthnum === 12){
        monthnum = 1;
        yearnum = yearnum + 1;
    } else {
        monthnum = monthnum + 1;
    }
    return dt_format.set_input(monthfirstwe(monthnum,yearnum)).add_day(-7).output;
}

function gen_table(x, class_name, loc_in_class){
    if (dom_control.select('query_selector',`.${class_name}`).output !== null) dom_control.select('query_selector',`.${class_name}`).output.remove();
    const table = dom_gen.create('table',false).add_attribute('class',class_name).output;
    for (let i = 0; i < x.length; i++) {
        const row = dom_gen.create('tr',false).output;
        for (let j = 0; j < x[i].length; j++) {
            const col = dom_gen.create('td',true,x[i][j]).output;
            row.appendChild(col);
        }
        table.appendChild(row);
    }
    dom_control.select('query_selector',loc_in_class).output.appendChild(table);
}

function merge_cells(table_element, start_row, end_row, start_col, end_col){
    const rows = table_element.rows;
  
    // Merge rows
    if (start_col === end_col){
      const cell = rows[start_row].cells[start_col];
      cell.rowSpan = end_row - start_row + 1;
  
      // Remove merged rows
      for (let i = start_row + 1; i <= end_row; i++){
        rows[i].removeChild(rows[i].cells[start_col]);
      }
    }
    // Merge columns
    else if (start_row === end_row){
      const cell = rows[start_row].cells[start_col];
      cell.colSpan = end_col - start_col + 1;
  
      // Remove merged columns
      for (let i = start_col + 1; i <= end_col; i++){
        rows[start_row].removeChild(rows[start_row].cells[i]);
      }
    }
}

//Fetching tanpa HTTP request
// fetch('https://openlibrary.org/search/authors.json?q=j%20k%20rowling')
//     .then(response => response.json())
//     .then(response => console.log(response));