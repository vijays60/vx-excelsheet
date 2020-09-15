## Problems:
Implement basic excel sheet using JavaScript/HTML/CSS
1. Should have m X n cells in the sheet
1. Should have ability to add/remove rows or columns to/from the existing sheet
1. Clicking on each cell should make it as editable and clicking anywhere else should take the cell back to ready-only mode.
1. Should have ability to sort the data
 
 
Some basic rules to keep in mind - 
1. Code should work in multiple browsers(minimum IE, FF and Chrome)
1. Use native javascript. No javascript libraries are allowed. 
1. Once done with the test, mail us back the files in zip format or put it in github and share.
1. Originality of code is very important
 
### To run: 

```
npm install && npm start
```

Open http://localhost:5000 in your browser

or 

include the js script in your html code

```
<div id="excel-sheet">

</div>
<script src="js/excelsheet.js"></script>
    <script>
        SpreadSheet.draw('excel-sheet');
    </script>
```

or 

simply define the div taq were you want the spreadsheet to display and include the js script
```
<script src="js/excelsheet.js"></script>
    <script>
        SpreadSheet.draw('div-id');
    </script>
```