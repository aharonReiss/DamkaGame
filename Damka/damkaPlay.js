var kingMovedWithoutKill = new iterationKinkWithoutKill();
function playGame()
{
	createBoard();
	createTools();
	setOnClikDestination("green");
}
function createBoard(){
    var id = 1;
	var tbl = document.getElementById("tbl");
	for(var r = 0;r < 8;r++)
	{
		var row = document.createElement("tr");
		for(var c = 0; c < 8;c++)
		{
			var cell = document.createElement("td");
			cell.width = "80px";
			cell.height = "80px";
            cell.id = id++;
			if(r % 2 == 0)
			{
				if(c % 2 != 0)
				{
                    cell.style.backgroundColor = "brown";
                }
                
			}
			else
			{
				if(c % 2 == 0)
				{
					cell.style.backgroundColor = "brown";
				}
            }
			row.appendChild(cell);
        }
		tbl.appendChild(row);
        }
    }
function setOnClikDestination(color)
{
	let isHaveAdestination;
	let isHaveAwalk;
	var table = document.getElementById("tbl");
	for(let rowNum = 0; rowNum < table.rows.length;rowNum++)
		{
			for(let columnNum = 0;columnNum < table.rows[rowNum].cells.length;columnNum++)
			{
				let b = table.rows[rowNum].cells[columnNum].childNodes.length;
				if(b !== 0)
				{
					let r = document.getElementById(table.rows[rowNum].cells[columnNum].childNodes[0].id);
					if(r.style.backgroundColor === "green" && r.style.backgroundColor == color)
					{
						if(r.style.border.length !== 0)
						{
							isHaveAdestination = checkHaveDedtinationKing(table,rowNum,columnNum);
							if(isHaveAdestination)
							{
								isHaveAwalk = setDestToKing(rowNum,columnNum,table,color);
							}
						}
						else
						{
							isHaveAdestination = setDestinationToPeyonGreen(rowNum,columnNum,table,color);
							if(isHaveAdestination)
							{
								isHaveAwalk = isHaveAdestination;
							}
						}
					}
					else if(r.style.backgroundColor === "blue" && r.style.backgroundColor == color)
					{	
						if(r.style.border.length !== 0)
						{
							isHaveAdestination = checkHaveDedtinationKing(table,rowNum,columnNum);
							if(isHaveAdestination)
							{
								isHaveAwalk = setDestToKing(rowNum,columnNum,table,color);
							}
						}
						else
						{
							isHaveAdestination = setDestinationToPeyonBlue(rowNum,columnNum,table,color);
							if(isHaveAdestination)
							{
								isHaveAwalk = isHaveAdestination;
							}
						}
					}
					if(isHaveAdestination)
					{
						isHaveAwalk = isHaveAdestination;
					}
				}
			}
		}
		if(!isHaveAwalk)
		{
				setTimeout(() => {
					if(color == "green")
					{
						alert("the blue is the winner");
					}
					else
						alert("the green is the winner");
					
			}, 100);
		}
}
function createTools()
	{
		let table = document.getElementById("tbl");
		for(let rowNum = 0; rowNum < table.rows.length;rowNum++)
		{
			for(let columnNum = 0;columnNum < table.rows[rowNum].cells.length;columnNum++)
			{
				if(table.rows[rowNum].cells[columnNum].style.backgroundColor == "brown")
				{
					if(rowNum < 3)
					{	
						createPeyon(rowNum,columnNum,"green",false,3);
					}
					else if(rowNum > 4)
					{
						createPeyon(rowNum,columnNum,"blue",false,3);
					}
				}
			}
		}
}
function setOnClikDes(rowF,cellF,rowNum,columnNum,tableF,color){
		if(tableF.rows[rowNum].cells[columnNum].style.backgroundColor == "brown"
	|| tableF.rows[rowNum].cells[columnNum].style.backgroundColor == "black")
	{	
		tableF.rows[rowF].cells[cellF].style.backgroundColor = "yellow";
		tableF.rows[rowNum].cells[columnNum].style.backgroundColor = "black";
			tableF.rows[rowF].cells[cellF].addEventListener("click",function(){
				movePeyonToDestination(rowF,cellF,rowNum,columnNum,color,false);
			})
			
	}
	let id = tableF.rows[rowF].cells[cellF].id;
	let cell = document.getElementById(id);
	removeClickAble();
}
function createPeyon(rowNum,columnNum,color,isKing,roy)
{
	let table = document.getElementById("tbl");
	let di = document.createElement("div");
	di.width = "60px";
	di.height = "60px";
	di.style.backgroundColor = color;
	di.style.borderRadius = "50px";
	di.style.margin = "auto";
	di.classList.add("dotBlue");
	di.id = table.rows[rowNum].cells[columnNum].id * 100;
	table.rows[rowNum].cells[columnNum].appendChild(di);
	if(isKing)
	{
		table.rows[rowNum].cells[columnNum].childNodes[0].style.border = "thick solid yellow";
	}
	let notDoKing = false;
	if(!isKing && color == "green" && columnNum <= 5 && table.rows[6].cells[columnNum + 1].childNodes.length != 0 &&
	table.rows[6].cells[columnNum + 1].childNodes[0].style.backgroundColor != color
	 && table.rows[5].cells[columnNum + 2].childNodes.length == 0)	
	{
		notDoKing = true;
	}
	if(!isKing && color == "green" && columnNum >= 2 && table.rows[6].cells[columnNum - 1].childNodes.length != 0 &&
	table.rows[6].cells[columnNum - 1].childNodes[0].style.backgroundColor != color
	 && table.rows[5].cells[columnNum - 2].childNodes.length == 0)	
	{
		notDoKing = true;
	}
	if(!isKing && color == "blue" && columnNum <= 5 && table.rows[1].cells[columnNum + 1].childNodes.length != 0 &&
	table.rows[1].cells[columnNum + 1].childNodes[0].style.backgroundColor != color
	 && table.rows[2].cells[columnNum + 2].childNodes.length == 0)	
	{	
		notDoKing = true;
	}
	if(!isKing && color == "blue" && columnNum >= 2 && table.rows[1].cells[columnNum - 1].childNodes.length != 0 &&
	table.rows[1].cells[columnNum - 1].childNodes[0].style.backgroundColor != color
	 && table.rows[2].cells[columnNum - 2].childNodes.length == 0)	
	{
		notDoKing = true;
	}
	if(rowNum == 7 && color == "green" && (!notDoKing || roy === 6))
	{
		table.rows[rowNum].cells[columnNum].childNodes[0].style.border = "thick solid yellow";
	}
	else if(rowNum == 0 && color == "blue" && (!notDoKing || roy === 1))
	{
		table.rows[rowNum].cells[columnNum].childNodes[0].style.border = "thick solid yellow";
	}
}
function removeClickAble()
{
	let rowid;
	let table = document.getElementById("tbl");
	for(let rowNum = 0; rowNum < table.rows.length;rowNum++)
	{	
		for(let columnNum = 0;columnNum < table.rows[rowNum].cells.length;columnNum++)
		{
				rowid = table.rows[rowNum].cells[columnNum].id;
				let row = document.getElementById(rowid);
				if(row.childNodes.length === 1)
				{
					let color = row.childNodes[0].style.backgroundColor;
					let isKing = false;
					if(row.childNodes[0].style.border.length != 0)
					{
						isKing = true;
					}
					row.removeChild(row.childNodes[0]);
					createPeyon(rowNum,columnNum,color,isKing,3);
				}
		}
	}
}
function movePeyonToDestination(rowDes,cellDes,RowNum,columnNum,color)
{
	let table = document.getElementById("tbl");
	let rowid = table.rows[RowNum].cells[columnNum].id;
	let row = document.getElementById(rowid);
	if(table.rows[rowDes].cells[cellDes].style.backgroundColor === "yellow" 
	&& table.rows[RowNum].cells[columnNum].childNodes.length != 0
	&& table.rows[RowNum].cells[columnNum].childNodes[0].style.backgroundColor === color
	&& table.rows[RowNum].cells[columnNum].style.backgroundColor === "black")
	{
		var isKillPeyonWtithSkip = false;
		let cell2 = columnNum + 2;
		let row2 = RowNum + 2;
		if(rowDes === row2 && cell2 === cellDes && table.rows[RowNum + 1].cells[columnNum + 1].childNodes.length != 0)
			{
				var idMiddle = table.rows[RowNum + 1].cells[columnNum + 1].id;
				var rowMiddle = document.getElementById(idMiddle);
				rowMiddle.removeChild(rowMiddle.childNodes[0]);
				isKillPeyonWtithSkip = true;
			}
			cell2 = columnNum - 2;
			if(rowDes === row2 && cell2 === cellDes && table.rows[RowNum + 1].cells[columnNum - 1].childNodes.length != 0)
			{
				var idMiddle = table.rows[RowNum + 1].cells[columnNum - 1].id;
				var rowMiddle = document.getElementById(idMiddle);
				rowMiddle.removeChild(rowMiddle.childNodes[0]);
				isKillPeyonWtithSkip = true;
			}
			row2 = RowNum - 2;
			cell2 = columnNum + 2;
			if(rowDes === row2 && cell2 === cellDes && table.rows[RowNum - 1].cells[columnNum + 1].childNodes.length != 0)
			{
				var idMiddle = table.rows[RowNum - 1].cells[columnNum + 1].id;
				var rowMiddle = document.getElementById(idMiddle);
				rowMiddle.removeChild(rowMiddle.childNodes[0]);
				isKillPeyonWtithSkip = true;
			}
			cell2 = columnNum - 2;
			if(rowDes === row2 && cell2 === cellDes && table.rows[RowNum - 1].cells[columnNum - 1].childNodes.length != 0)
			{
				var idMiddle = table.rows[RowNum - 1].cells[columnNum - 1].id;
				var rowMiddle = document.getElementById(idMiddle);
				rowMiddle.removeChild(rowMiddle.childNodes[0]);
				isKillPeyonWtithSkip = true;
			}
			let isKing = false;
			let isKinkWasKill = false;
			if(row.childNodes[0].style.border.length != 0)
			{
				isKing = true;
			}
			let Teko = false;
			isKing  ? kingMovedWithoutKill.count++ : kingMovedWithoutKill.count = 0;
			if(kingMovedWithoutKill.count == 15)
			{
				Teko = true;
				setTimeout(() => {
					alert("stalemate");
				}, 10);
			}
			row.removeChild(row.childNodes[0]);
			createPeyon(rowDes,cellDes,color,isKing,RowNum);
			if(isKing == false && table.rows[rowDes].cells[cellDes].childNodes[0].style.border.length != 0)
			{
				isKillPeyonWtithSkip = false;
			}
			setAllCellsToBrown();
			removeClickAble();
			let isWasAnAc;
			isKillPeyonWtithSkip ? isWasAnAc = mustDoAskipWithThePeyon(rowDes,cellDes,table,color,false) : false;
			console.log(isWasAnAc);
			isWasAnAc ? false : isWasAnAc = isMustRivalKill(table,color);
			isWasAnAc = isWasAction();
			if(!isWasAnAc && !Teko)
			{
				color === "green" ? color = "blue" : color = "green";
				setOnClikDestination(color);
			}
	}
}
function setAllCellsToBrown()
{
	var table = document.getElementById("tbl");
	for(let rowNum = 0; rowNum < table.rows.length;rowNum++)
	{	
		for(let columnNum = 0;columnNum < table.rows[rowNum].cells.length;columnNum++)
		{
			if(rowNum % 2 == 0)
			{
				if(columnNum % 2 != 0)
				{
					table.rows[rowNum].cells[columnNum].style.backgroundColor = "brown";
                }
			}
			else
			{
				if(columnNum % 2 == 0)
				{
					table.rows[rowNum].cells[columnNum].style.backgroundColor = "brown";
				}
            }
		}
	}
}
function setDestToKing(rowNum,columnNum,table,color)
{
	let isHaveAdestination = false;
	let haveDes = false;
	haveDes = goDownLeft(rowNum,columnNum,table,color);
	isHaveAdestination = haveDes;
	isHaveAdestination = goDownWrite(rowNum,columnNum,table,color);
	if(!isHaveAdestination)
	{
		isHaveAdestination = haveDes;
	}
	haveDes = goUpLeft(rowNum,columnNum,table,color);
	if(!isHaveAdestination)
	{
		isHaveAdestination = haveDes;
	}
	isHaveAdestination = goUpWrite(rowNum,columnNum,table,color);
	if(!isHaveAdestination)
	{
		isHaveAdestination = haveDes;
	}
	return isHaveAdestination;
}
function setDestinationToPeyonGreen(rowNum,columnNum,table,color)
{
	let isHaveAdestination = false;
	let haveDes = false;
	haveDes = goDownLeft(rowNum,columnNum,table,color);
	isHaveAdestination = haveDes;
	haveDes = goDownWrite(rowNum,columnNum,table,color);
	if(haveDes)
	{
		isHaveAdestination = haveDes;	
	}
	return isHaveAdestination;
}
function setDestinationToPeyonBlue(rowNum,columnNum,table,color)
{
	let isHaveAdestination = false;
	let haveDes = false;
	haveDes = goUpLeft(rowNum,columnNum,table,color);
	isHaveAdestination = haveDes;
	haveDes = goUpWrite(rowNum,columnNum,table,color);
	if(haveDes)
	{
		isHaveAdestination = haveDes;
	}
	return isHaveAdestination;
}
function mustDoAskipWithThePeyon(rowNum,columnNum,table,color,isRivaKill)
{
	if(isRivaKill)
	{
		console.log("YERIV func mustDoAskipWithThePeyon rowNum: " + rowNum + " columnNum: " + columnNum);
	}
	else
	{
		console.log("SAME COLOR func mustDoAskipWithThePeyon rowNum: " + rowNum + " columnNum: " + columnNum);
	}
	mustMoveWithTheTool = false;
	let mustMove;
	mustMove = leftAskipDown(rowNum,columnNum,table,isRivaKill,color,true);
	if(mustMove)
	{
		mustMoveWithTheTool = mustMove;
	}
	mustMove = writeAskipDown(rowNum,columnNum,table,isRivaKill,color,true)
	if(mustMove)
	{
		mustMoveWithTheTool = mustMove;
	}
	mustMove = leftAskipUp(rowNum,columnNum,table,isRivaKill,color,true);
	if(mustMove)
	{
		mustMoveWithTheTool = mustMove;
	}
	mustMove = writeAskipUp(rowNum,columnNum,table,isRivaKill,color,true);
	if(mustMove)
	{
		mustMoveWithTheTool = mustMove;
	}
	console.log("must move: " + mustMoveWithTheTool);
	return mustMoveWithTheTool;
}
function isMustRivalKill(table,color)
{
	removeClickAble();
	let colorInFunc = color == "green" ? "blue" : "green";
	let isMustMove = false;
	for(let rowNum = 0; rowNum < table.rows.length;rowNum++)
	{	
		for(let columnNum = 0;columnNum < table.rows[rowNum].cells.length;columnNum++)
		{
			if(table.rows[rowNum].cells[columnNum].childNodes.length != 0 
				&& table.rows[rowNum].cells[columnNum].childNodes[0].style.backgroundColor == colorInFunc)
				{
						console.log("bibi");
						isMustMove = mustDoAskipWithThePeyon(rowNum,columnNum,table,colorInFunc,true);
				}
		}
	}
	return isMustMove;
}
function setDestinationMoveKing(rowNum,colmnNum,rowDes,cellDes,table,color)
{	
	table.rows[rowDes].cells[cellDes].addEventListener("click",function(){
			movePeyonToDestination(rowDes,cellDes,rowNum,colmnNum,color,true);
		})
}
function iterationKinkWithoutKill() {
	this.count = 0;
}
function isWasAction()
{
	let table = document.getElementById("tbl");
	for(let rowNum = 0; rowNum < table.rows.length;rowNum++)
		{
			for(let columnNum = 0;columnNum < table.rows[rowNum].cells.length;columnNum++)
			{
				if(table.rows[rowNum].cells[columnNum].style.backgroundColor == "red")
				{
					return true;
				}
			}
		}
	return false;
}
function setRedToBrown()
{
	let table = document.getElementById("tbl");
	for(let rowNum = 0; rowNum < table.rows.length;rowNum++)
		{
			for(let columnNum = 0;columnNum < table.rows[rowNum].cells.length;columnNum++)
			{
				if(table.rows[rowNum].cells[columnNum].style.backgroundColor == "red"
				|| table.rows[rowNum].cells[columnNum].style.backgroundColor == "yellow")
				{
					table.rows[rowNum].cells[columnNum].style.backgroundColor = "brown";
				}
			}
		}
}
function writeAskipUp(rowNum,columnNum,table,isRivaKill,color,doAc)
{
	if(table.rows[rowNum].cells[columnNum].childNodes[0].style.border.length !== 0)
	{
		console.log("king in write askip up");
	}
	else
	{
		console.log("peyon in write askip up");
	}
	let mustMoveWithTheTool = false;
	if(rowNum > 1  && columnNum < 6)
	{
		let peyonInLeftCell = table.rows[rowNum - 1].cells[columnNum + 1].childNodes.length;	
			if(peyonInLeftCell !== 0 && table.rows[rowNum - 1].cells[columnNum + 1].childNodes[0].style.backgroundColor !== color
				&& table.rows[rowNum - 2].cells[columnNum + 2].childNodes.length === 0 && (
					table.rows[rowNum].cells[columnNum].childNodes[0].style.border.length !== 0 || (isRivaKill && color == "blue") || !isRivaKill))
			{
				mustMoveWithTheTool = true;
				if(doAc)
				{
				let rowToFunc = rowNum;
				let cellToFunc = columnNum;
				let rowUp = rowNum - 2;
				let leftCell = columnNum + 2;
				mustMoveWithTheTool = true;
				table.rows[rowNum - 2].cells[columnNum + 2].style.backgroundColor = "yellow";
				table.rows[rowNum].cells[columnNum].style.backgroundColor = "red";
				table.rows[rowNum].cells[columnNum].addEventListener("click",function(){
					if(table.rows[rowNum - 2].cells[columnNum + 2].style.backgroundColor == "yellow"
					&& table.rows[rowNum].cells[columnNum].style.backgroundColor == "red")
					{
						table.rows[rowNum].cells[columnNum].style.backgroundColor = "black";
						setRedToBrown();
						setToYellow(table,rowNum,columnNum,isRivaKill,color);
					}
				})
			
				removeClickAble();
			}
		}	
	}
	return mustMoveWithTheTool;
}
function leftAskipUp(rowNum,columnNum,table,isRivaKill,color,doAc)
{
	if(table.rows[rowNum].cells[columnNum].childNodes[0].style.border.length !== 0)
	{
		console.log("king in left askip up");
	}
	else
	{
		console.log("peyon in left askip up");
	}
	let mustMoveWithTheTool = false;
	if(rowNum > 1  && columnNum > 1)
	{
		let peyonInLeftCell = table.rows[rowNum - 1].cells[columnNum - 1].childNodes.length;	
		if(peyonInLeftCell !== 0 && table.rows[rowNum - 1].cells[columnNum - 1].childNodes[0].style.backgroundColor !== color
			&& table.rows[rowNum - 2].cells[columnNum - 2].childNodes.length === 0 && (
				table.rows[rowNum].cells[columnNum].childNodes[0].style.border.length !== 0 || (isRivaKill && color == "blue") || !isRivaKill))
		{
			mustMoveWithTheTool = true;
			if(doAc)
			{
			let rowToFunc = rowNum;
			let cellToFunc = columnNum;
			let rowUp = rowNum - 2;
			let leftCell = columnNum - 2;
			mustMoveWithTheTool = true;
				table.rows[rowNum - 2].cells[columnNum - 2].style.backgroundColor = "yellow";
				table.rows[rowNum].cells[columnNum].style.backgroundColor = "red";
				table.rows[rowNum].cells[columnNum].addEventListener("click",function(){
				if(table.rows[rowNum - 2].cells[columnNum - 2].style.backgroundColor == "yellow"
				&& table.rows[rowNum].cells[columnNum].style.backgroundColor == "red")
				{
					table.rows[rowNum].cells[columnNum].style.backgroundColor = "black";
					setRedToBrown();
					setToYellow(table,rowNum,columnNum,isRivaKill,color);
				}
			})
				removeClickAble();
			}
		}	
	}
	return mustMoveWithTheTool;
}
function leftAskipDown(rowNum,columnNum,table,isRivaKill,color,doAc)
{
	if(table.rows[rowNum].cells[columnNum].childNodes[0].style.border.length !== 0)
	{
		console.log("king in write askip down");
	}
	else
	{
		console.log("peyon in left askip down");
	}

	let mustMoveWithTheTool = false;
	if(columnNum > 1 && rowNum < 6)
		{
			let peyonInLeftCell = table.rows[rowNum + 1].cells[columnNum - 1].childNodes.length;	
			if(peyonInLeftCell !== 0 && table.rows[rowNum + 1].cells[columnNum - 1].childNodes[0].style.backgroundColor !== color
				&& table.rows[rowNum + 2].cells[columnNum - 2].childNodes.length === 0 && (
					table.rows[rowNum].cells[columnNum].childNodes[0].style.border.length !== 0 || (isRivaKill && color == "green") || !isRivaKill))
			{
				mustMoveWithTheTool = true;
				if(doAc)
				{	
					let rowToFunc = rowNum;
					let cellToFunc = columnNum;
					let rowUp = rowNum + 2;
					let leftCell = columnNum - 2;
					mustMoveWithTheTool = true;
					table.rows[rowNum + 2].cells[columnNum - 2].style.backgroundColor = "yellow";
					table.rows[rowNum].cells[columnNum].style.backgroundColor = "red";
					table.rows[rowNum].cells[columnNum].addEventListener("click",function(){
						if(table.rows[rowUp].cells[leftCell].style.backgroundColor == "yellow"
							&& table.rows[rowNum].cells[columnNum].style.backgroundColor == "red")
						{
							table.rows[rowNum].cells[columnNum].style.backgroundColor = "black";
							setRedToBrown();
							setToYellow(table,rowNum,columnNum,isRivaKill,color);
							table.rows[rowUp].cells[leftCell].style.backgroundColor = "yellow";
						}
						
					})
				
					removeClickAble();	
				}
				
			}	
		}
		return mustMoveWithTheTool;
}
function writeAskipDown(rowNum,columnNum,table,isRivaKill,color,doAc)
{
	if(table.rows[rowNum].cells[columnNum].childNodes[0].style.border.length !== 0)
	{
		console.log("king in write askip down");
	}
	else
	{
		console.log("peyon in write askip down");
	}
	let mustMoveWithTheTool = false;
	if(columnNum < 6 && rowNum < 6)
		{
			let peyonInWriteCell = table.rows[rowNum + 1].cells[columnNum + 1].childNodes.length;	
			if(peyonInWriteCell !== 0 && table.rows[rowNum + 1].cells[columnNum + 1].childNodes[0].style.backgroundColor !== color
				&& table.rows[rowNum + 2].cells[columnNum + 2].childNodes.length === 0 && (
					table.rows[rowNum].cells[columnNum].childNodes[0].style.border.length !== 0 || (isRivaKill && color == "green") || !isRivaKill))
			{
				mustMoveWithTheTool = true;
				if(doAc)
				{
				let rowToFunc = rowNum;
				let cellToFunc = columnNum;
				let rowUp = rowNum + 2;
				let writeCell = columnNum + 2;
				mustMoveWithTheTool = true;
					table.rows[rowNum + 2].cells[columnNum + 2].style.backgroundColor = "yellow";
					table.rows[rowNum].cells[columnNum].style.backgroundColor = "red";
					table.rows[rowNum].cells[columnNum].addEventListener("click",function(){
						if(table.rows[rowNum + 2].cells[columnNum + 2].style.backgroundColor == "yellow"
						&& table.rows[rowNum].cells[columnNum].style.backgroundColor == "red")
						{
							table.rows[rowNum].cells[columnNum].style.backgroundColor = "black";
							setRedToBrown();
							setToYellow(table,rowNum,columnNum,isRivaKill,color);
						}
					})
			
				removeClickAble();
			}
		}	
	}
	return mustMoveWithTheTool;
}
function checkHaveDedtinationKing(table,rowNum,cellNum)
{
	if(rowNum < 7 && cellNum < 7)
	{
		if(table.rows[rowNum + 1].cells[cellNum + 1].childNodes.length == 0)
		{
			return true;
		}
	}
	if(rowNum < 7 && cellNum > 0)
	{
		if(table.rows[rowNum + 1].cells[cellNum - 1].childNodes.length == 0)
		{
			return true;
		}
	}
	if(rowNum > 0 && cellNum < 7)
	{
		if(table.rows[rowNum - 1].cells[cellNum + 1].childNodes.length == 0)
		{
			return true;
		}
	}
	if(rowNum > 0 && cellNum > 0)
	{
		if(table.rows[rowNum - 1].cells[cellNum - 1].childNodes.length == 0)
		{
			return true;
		}
	}
	return false;
}
function goDownWrite(rowNum,columnNum,table,color)
{
	let isHaveAdestination = false;
	let row1 = rowNum + 1;
	let writeCell = columnNum + 1;
		if(columnNum < 7 && rowNum < 7)
		{
			let peyonInWriteCell = table.rows[rowNum + 1].cells[columnNum + 1].childNodes.length;
			if(peyonInWriteCell === 0)
			{
				let rowToFunc = rowNum;
				let cellToFunc = columnNum;
				isHaveAdestination = true;
				table.rows[rowNum].cells[columnNum].childNodes[0].addEventListener("click",function(){
				setOnClikDes(row1,writeCell,rowToFunc,cellToFunc,table,color);
					});
			}
		}
		return isHaveAdestination;
}
function goDownLeft(rowNum,columnNum,table,color)
{
	let isHaveAdestination = false;
	let row1 = rowNum + 1;
	let writeCell = columnNum + 1;
	let leftCell = columnNum - 1;

	if(columnNum >= 1 && rowNum < 7)
		{
			let peyonInLeftCell = table.rows[rowNum + 1].cells[columnNum - 1].childNodes.length;	
			if(peyonInLeftCell === 0)
			{
				let rowToFunc = rowNum;
				let cellToFunc = columnNum;
				isHaveAdestination = true;
				table.rows[rowNum].cells[columnNum].childNodes[0].addEventListener("click",function(){
						setOnClikDes(row1,leftCell,rowToFunc,cellToFunc,table,color);
					})
			}
		}
	return isHaveAdestination;
}
function goUpLeft(rowNum,columnNum,table,color)
{
	let row1 = rowNum - 1;
	let writeCell = columnNum + 1;
	let isHaveAdestination = false;
	let leftCell = columnNum - 1;
	if(columnNum < 7 && rowNum > 0)
	{
		let peyonInWriteCell = table.rows[rowNum - 1].cells[columnNum + 1].childNodes.length;
		if(peyonInWriteCell === 0)
		{	
			isHaveAdestination = true;
			table.rows[rowNum].cells[columnNum].childNodes[0].addEventListener("click",function(){
					setOnClikDes(row1,writeCell,rowNum,columnNum,table,color);
					});
		}
	}
	return isHaveAdestination;
}
function goUpWrite(rowNum,columnNum,table,color)
{
	let row1 = rowNum - 1;
	let writeCell = columnNum + 1;
	let isHaveAdestination = false;
	let leftCell = columnNum - 1;
	if(columnNum >= 1 && rowNum > 0)
	{
		let peyonInLeftCell = table.rows[rowNum - 1].cells[columnNum - 1].childNodes.length;
		if(peyonInLeftCell === 0)
		{
			let rowToFunc = rowNum;
			let cellToFunc = columnNum;
			isHaveAdestination = true;
			table.rows[rowNum].cells[columnNum].childNodes[0].addEventListener("click",function(){
				setOnClikDes(row1,leftCell,rowToFunc,cellToFunc,table,color);
			})
		}
	}
	return isHaveAdestination;
}
function setToYellow(table,rowNum,columnNum,isRivaKill,color)
{
	color = table.rows[rowNum].cells[columnNum].childNodes[0].style.backgroundColor;
	if(rowNum < 6 && columnNum > 1)
	{
	let peyonInLeftCell = table.rows[rowNum + 1].cells[columnNum - 1].childNodes.length;
	console.log(peyonInLeftCell + "left down");	
	if(peyonInLeftCell !== 0 && table.rows[rowNum + 1].cells[columnNum - 1].childNodes[0].style.backgroundColor !== color
		&& table.rows[rowNum + 2].cells[columnNum - 2].childNodes.length === 0 && (
		table.rows[rowNum].cells[columnNum].childNodes[0].style.border.length !== 0 || (isRivaKill && color == "green") || !isRivaKill))
		{
			console.log(peyonInLeftCell + "left down");	
			table.rows[rowNum + 2].cells[columnNum - 2].style.backgroundColor = "yellow";
			table.rows[rowNum + 2].cells[columnNum - 2].addEventListener("click",function(){
				movePeyonToDestination(rowNum + 2,columnNum - 2,rowNum,columnNum,color);
			})
		}
	}
	if(rowNum < 6 && columnNum < 6)
	{
		let peyonInLeftCell = table.rows[rowNum + 1].cells[columnNum + 1].childNodes.length;	
		console.log(peyonInLeftCell + "write down");
		if(peyonInLeftCell !== 0 && table.rows[rowNum + 1].cells[columnNum + 1].childNodes[0].style.backgroundColor !== color
		&& table.rows[rowNum + 2].cells[columnNum + 2].childNodes.length === 0 && (
		table.rows[rowNum].cells[columnNum].childNodes[0].style.border.length !== 0 || (isRivaKill && color == "green") || !isRivaKill))
		{
			console.log(peyonInLeftCell + "write down");	
			table.rows[rowNum + 2].cells[columnNum + 2].style.backgroundColor = "yellow";
			table.rows[rowNum + 2].cells[columnNum + 2].addEventListener("click",function(){
				movePeyonToDestination(rowNum + 2,columnNum + 2,rowNum,columnNum,color);
			})
		}
	}
	if(rowNum > 1 && columnNum > 1)
	{
	let peyonInLeftCell = table.rows[rowNum - 1].cells[columnNum - 1].childNodes.length;	
	console.log(peyonInLeftCell + "write up");
	if(peyonInLeftCell !== 0 && table.rows[rowNum - 1].cells[columnNum - 1].childNodes[0].style.backgroundColor !== color
		&& table.rows[rowNum - 2].cells[columnNum - 2].childNodes.length === 0 && (
		table.rows[rowNum].cells[columnNum].childNodes[0].style.border.length !== 0 || (isRivaKill && color == "blue") || !isRivaKill))
		{
			console.log(peyonInLeftCell + "write up");	
			table.rows[rowNum - 2].cells[columnNum - 2].style.backgroundColor = "yellow";
			table.rows[rowNum - 2].cells[columnNum - 2].addEventListener("click",function(){
				movePeyonToDestination(rowNum - 2,columnNum - 2,rowNum,columnNum,color,false);
			})
		}
	}
	if(rowNum > 1  && columnNum < 6)
	{
		let peyonInLeftCell = table.rows[rowNum - 1].cells[columnNum + 1].childNodes.length;
		console.log(peyonInLeftCell + "left up");			
		if(peyonInLeftCell !== 0 && table.rows[rowNum - 1].cells[columnNum + 1].childNodes[0].style.backgroundColor !== color
			&& table.rows[rowNum - 2].cells[columnNum + 2].childNodes.length === 0 && (
				table.rows[rowNum].cells[columnNum].childNodes[0].style.border.length !== 0 || (isRivaKill && color == "blue") || !isRivaKill))
		{
			console.log(peyonInLeftCell + "left up");	
			table.rows[rowNum - 2].cells[columnNum + 2].style.backgroundColor = "yellow";
			table.rows[rowNum - 2].cells[columnNum + 2].addEventListener("click",function(){
				movePeyonToDestination(rowNum - 2,columnNum + 2,rowNum,columnNum,color,false);
			})
		}
	}
		
}