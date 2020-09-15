/**
 * * Implement basic excel sheet using JavaScript/HTML/CSS
1. Should have m X n cells in the sheet
2. Should have ability to add/remove rows or columns to/from the existing sheet
3. Clicking on each cell should make it as editable and clicking anywhere else should take the cell back to ready-only mode.
4. Should have ability to sort the data
 */
var menuVisible = false;

var excelsheet_selindx = {
    row: -1,
    col: -1
};


var SpreadSheet = {
    rowCnt: 50,
    colCnt: 28,
    myTable: null,
    rowMenu: null,
    colMenu: null,
    addRow : function(index){
        this.rowCnt++;
    },
    addCol: function(index){
        this.colCnt++;
    },
    removeRow: function(index){
        this.rowCnt--;
    },
    removeCol: function(index){
        this.colCnt--;
    },
    draw: function(tableDivId){
        var tablediv = document.getElementById(tableDivId);
        this.myTable = document.createElement("TABLE");
        this.myTable.setAttribute("id", "xtable");
        tablediv.appendChild(this.myTable);
        

        // Create an empty <thead> element and add it to the table:
        var header = this.myTable.createTHead();
        // Create an empty <tr> element and add it to the first position of <thead>:
        var headerRow = header.insertRow(0);  
        headerRow.setAttribute('id','th_head');

        var newHead = document.createElement('th');
        newHead.setAttribute('id','th_id_'+i);
        var textnode = document.createTextNode(String("SI"));

        headerRow.appendChild(newHead).appendChild(textnode);	
        for (var i = 0; i < SpreadSheet.colCnt; i++){
            // var cell = row.insertCell(0);
            newHead = createHead(i);
            headerRow.appendChild(newHead)
        }

        var newRow;
        for (var i = 0; i < this.rowCnt; i++){
            newRow = createRow(i);
            this.myTable.appendChild(newRow);
        }
        this.generateContextMenu();
    },
    generateContextMenu: function(){
        this.rowMenu = document.createElement('div');
        this.rowMenu.setAttribute('class', 'excelsheet_menu');
        this.rowMenu.setAttribute('id', 'excelsheet-row-menu');
        document.body.appendChild(this.rowMenu);

        var ul = document.createElement('ul');
        ul.setAttribute('class', 'excelsheet_menu-options');
        this.rowMenu.appendChild(ul);

        var li=document.createElement('li');
        li.setAttribute('class', 'excelsheet_menu-option');
        li.addEventListener('click', addRow.bind(null));
        var textNode = document.createTextNode("Add Row");
        li.appendChild(textNode);
        ul.appendChild(li);

        li=document.createElement('li');
        li.setAttribute('class', 'excelsheet_menu-option');
        li.addEventListener('click', deleteRow.bind(null));
        textNode = document.createTextNode("Delete Row");
        li.appendChild(textNode);
        ul.appendChild(li);


        this.colMenu = document.createElement('div');
        this.colMenu.setAttribute('class', 'excelsheet_menu');
        this.colMenu.setAttribute('id', 'excelsheet-col-menu');
        document.body.appendChild(this.colMenu);

        ul = document.createElement('ul');
        ul.setAttribute('class', 'excelsheet_menu-options');
        this.colMenu.appendChild(ul);

        li=document.createElement('li');
        li.setAttribute('class', 'excelsheet_menu-option');
        li.addEventListener('click', addColumn.bind(null));
        textNode = document.createTextNode("Add Column");
        li.appendChild(textNode);
        ul.appendChild(li);

        li=document.createElement('li');
        li.setAttribute('class', 'excelsheet_menu-option');
        li.addEventListener('click', deleteColumn.bind(null));
        textNode = document.createTextNode("Delete Column");
        li.appendChild(textNode);
        ul.appendChild(li);
        
        
    }
}


const createHead = function(indx){
    var newHead = document.createElement('th');
    var alpha = 65 + indx;
    newHead.setAttribute('id','th_id_'+indx);
    newHead.setAttribute('col-no', indx);
    newHead.addEventListener('click', sortData.bind(null, indx));
    if (newHead.addEventListener) {
        newHead.addEventListener('contextmenu', function(e, indx) {
            const origin = {
            left: e.pageX,
            top: e.pageY
            };
            excelsheet_selindx.col = e.currentTarget.getAttribute('col-no');
            setPosition(origin, SpreadSheet.colMenu);
            e.preventDefault();
        }, false);
    } else {
        newHead.attachEvent('oncontextmenu', function() {
            window.event.returnValue = false;
        });
    }

    var check = indx, cap = [];
    while(check>=0) {
        cap.unshift(String.fromCharCode(65 + (check%26)));
        check = (check/26) - 1;
    }
    
    var textnode = document.createTextNode(cap.join(''));
    newHead.appendChild(textnode);	

    return newHead;
}

const createRow = function(index){
    var newRow = document.createElement('tr');
    newRow.setAttribute('id','tr_id_'+index);
    
    var newCell = document.createElement('td');
    newCell.setAttribute('id','td_id_'+index+'_0');
    newCell.setAttribute('row-no', index);

    newCell.setAttribute("class","rowNo");
    newCell.appendChild(document.createTextNode(String(index+1)));
    if (newCell.addEventListener) {
        newCell.addEventListener('contextmenu', function(e, index) {
            const origin = {
                left: e.pageX,
                top: e.pageY
            };
            
            excelsheet_selindx.row = e.currentTarget.getAttribute('row-no');
            setPosition(origin, SpreadSheet.rowMenu);
            e.preventDefault();
        }, false);
    } else {
        newCell.attachEvent('oncontextmenu', function() {
            alert("You've tried to open context menu");
            window.event.returnValue = false;
        });
    }
    newRow.appendChild(newCell);
    for (var j = 1; j <= SpreadSheet.colCnt; j++){
        newCell = createCell(index, j);
        newRow.appendChild(newCell);
    }

    return newRow;
}

const createCell = function(index, j){
    newCell = document.createElement('td');
    newCell.setAttribute('id','td_id_'+index+'_'+j);
    var newCellin = document.createElement('input');
    newCellin.setAttribute('type','text');
    newCell.appendChild(newCellin);
    return newCell;
}

const sortData = function (colIndex){
    console.log("Calling sort");
        var cellData = [];
        var lastIdentifiedROw = 0;
        for(var i = 0; i < SpreadSheet.rowCnt; i++) {
            var id = 'td_id_' + i + '_' + colIndex;
            if(document.getElementById(id)){
                var data = document.getElementById(id).getElementsByTagName('input')[0].value;
                if(data.trim() != ''){
                    cellData.push(data);
                    lastIdentifiedROw = i;
                } 
            }
			
        }
        cellData.sort();
        for(var i=0;i <= lastIdentifiedROw;i++) {
            var id = 'td_id_' + i + '_' + colIndex;
            if(document.getElementById(id)){
                document.getElementById(id).getElementsByTagName('input')[0].value = cellData[i] ? cellData[i] : '';
            }
		}
}

const addRow = function() {
    if (excelsheet_selindx.row >= 0){
        var len = SpreadSheet.rowCnt;
        var refElement = document.getElementById('tr_id_' + excelsheet_selindx.row);
        newRow = createRow(len);
        SpreadSheet.addRow();
        refElement.parentNode.insertBefore(newRow, refElement.nextSibling);
        excelsheet_selindx.row = -1;
    }
}

const addColumn = function() {
    if (excelsheet_selindx.col >= 0) {
        console.log("getting called");
        var len = SpreadSheet.colCnt;

        var refElement = document.getElementById('th_id_' + excelsheet_selindx.col);
        
        var newhead = createHead(len);
        refElement.parentNode.insertBefore(newhead, refElement.nextSibling);

        var newcell;
        for (var i = 0; i < SpreadSheet.rowCnt; i++){
            // row = document.getElementById('tr_id_' + i);
            refElement = document.getElementById('td_id_' + i + "_"+ excelsheet_selindx.col);
            if(refElement){
                newcell = createCell(i, len);
                refElement.parentNode.insertBefore(newcell, refElement.nextSibling);
            }
            
        }
        
        SpreadSheet.addCol();
        excelsheet_selindx.col = -1;
    }
}

const deleteRow = function(){
    if (excelsheet_selindx.row >= 0){
        console.log(excelsheet_selindx.row);
        document.getElementById('tr_id_'+excelsheet_selindx.row).remove();	
        SpreadSheet.removeRow();
        excelsheet_selindx.row = -1;
    }
}

const deleteColumn = function(){
    SpreadSheet.removeCol();
}





const toggleMenu = function(command, menu){
    menu.style.display = command === "show" ? "block" : "none";
    menuVisible = !menuVisible;
};
  
const setPosition = function (pos, menu){
    menu.style.left = "".concat(pos.left, "px"); 
    menu.style.top = "".concat(pos.top, "px"); 
    toggleMenu("show", menu);
};

window.addEventListener("click", e => {
    toggleMenu("hide", SpreadSheet.rowMenu);
    toggleMenu("hide", SpreadSheet.colMenu);
});

