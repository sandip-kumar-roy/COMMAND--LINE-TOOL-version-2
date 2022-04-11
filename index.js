#! /usr/bin/env node

// Requiring module
const fs = require('fs');

// Accessing arguments
const args = process.argv;
const colors = require('colors');
const { Console } = require('console');
// The "index.js" is 8 characters long
// so -8 removes last 8 characters
const currentWorkingDirectory = args[1].slice(0, -8);

if (fs.existsSync(currentWorkingDirectory + 'todo.txt') === false) {
	let createStream = fs.createWriteStream('todo.txt');
	createStream.end();
  }
  if (fs.existsSync(currentWorkingDirectory + 'done.txt') === false) {
	let createStream = fs.createWriteStream('done.txt');
	createStream.end();
  }
  console.log('');
  
  const InfoFunction = () => {
	console.log('');
	console.log('');
	console.log('   WeLcOmE To SANDIP ROYs CoMmAnD-LiNe-InTeRfAcE'.yellow.bold);
	console.log('');
	console.log('');
	console.log('		  WaYs To uSe :-'.white.bold);
	console.log('******************************************************'.rainbow.bold);
	console.log('BeFoRe UsInG AnY CoMmAnD UsE ==>>'.blue.bold + '  node index.js'.green.bold);
	console.log('');
	console.log('******************************************************'.white.bold);
	console.log(' 	WORKS'.rainbow.bold + '   		COMMAND'.green.bold);
	console.log('******************************************************'.white.bold);
	console.log(' |	1> '.white.bold +'ADD A NEW TASK"'.rainbow.bold + ' 	(add "task name")'.blue.bold + '   |'.white.bold );
	console.log(' |	2> '.white.bold  +'LIST ALL TASK'.rainbow.bold + '	(ls)'.blue.bold +'                |'.white.bold );
	console.log(' |	3> '.white.bold +'DELETE A TASK'.rainbow.bold +'      	(del <task no.>)'.blue.bold +'    |'.white.bold );
	console.log(' |	4> '.white.bold +'COMPLETED A TASK'.rainbow.bold +'   	(done <task no.>)'.blue.bold +'   |'.white.bold );
	console.log(' |	5> '.white.bold +'HELP '.rainbow.bold + '              	(help)             '.blue.bold +' |'.white.bold );
	console.log(' |	6> '.white.bold +'REPORT'.rainbow.bold + '             	(report)'.blue.bold + '            |'.white);
	console.log('******************************************************'.white.bold);
	console.log('');
	console.log('');
  };

  const listFunction = () => {
	  

  console.log('***********************************'.rainbow.bold);
	// Create a empty array
	let data = []; 
	  
	// Read from todo.txt and convert it
	// into a string
	const fileData = fs.readFileSync(
	  currentWorkingDirectory + 'todo.txt')
	.toString(); 
	  
	// Split the string and store into array
	data = fileData.split('\n'); 
	  
	// Filter the string for any empty lines in the file
	let filterData = data.filter(function (value) {
	  return value !== '';
	}); 
	  
	if (filterData.length === 0) {
		console.log('*****************************'.rainbow.bold);
	  console.log('|  There are no pending todos!  |'.white.bold);
	  console.log('*****************************'.rainbow.bold);
	}
	  
	for (let i = 0; i < filterData.length; i++) {
	  console.log((filterData.length - i) + '. ' 
	  + filterData[i]);
	}
	console.log('***********************************'.rainbow.bold);
	
  };


  const addFunction = () => {
	
	// New todo string argument is stored
	const newTask = args[3]; 
	  
	// If argument is passed
	if (newTask) { 
	  
	  // Create a empty array
	  let data = []; 
	
	  // Read the data from file todo.txt and 
	  // convert it in string
	  const fileData = fs
		.readFileSync(currentWorkingDirectory + 'todo.txt')
		.toString(); 
		  
	  // New task is added to previous data  
	  fs.writeFile(
		currentWorkingDirectory + 'todo.txt',
		newTask + '\n' + fileData, 
		  
		function (err) {
	
		  // Handle if there is any error
		  if (err) throw err; 
			
		  // Logs the new task added
		  console.log('*****************************'.rainbow.bold);
		  console.log('ADDED TASK: "'.blue.bold + newTask + '"'.bold); 
		  console.log('******************************'.rainbow.bold);
		},
	  );
	} else { 
	
	  // If argument was no passed
	  console.log('*****************************'.rainbow.bold);
	  console.log('ERROR: Missing todo string. Nothing added!'.red.bold);
	  console.log('*****************************'.rainbow.bold);
	}
	
  };

  const deleteFunction = () => {
	
  
	// Store which index is passed
	const deleteIndex = args[3]; 
	  
	// If index is passed
	if (deleteIndex) { 
	  
	  // Create a empty array
	  let data = []; 
		
	  // Read the data from file and convert
	  // it into string
	  const fileData = fs
		.readFileSync(currentWorkingDirectory + 'todo.txt')
		.toString(); 
		  
	  data = fileData.split('\n');
		
	  // Filter the data for any empty lines
	  let filterData = data.filter(function (value) {
		return value !== ''; 
	  });
		
	  // If delete index is greater than no. of task 
	  // or less than zero
	  if (deleteIndex > filterData.length || deleteIndex <= 0) {
		console.log('*****************************'.rainbow.bold);
		console.log(
		  'ERROR: todo #'.red.bold + deleteIndex 
			  + ' does not exist. Nothing deleted.'.red.bold,
		);   
		console.log('*****************************'.rainbow.bold);
	  } else {
	
		// Remove the task
		filterData.splice(filterData.length - deleteIndex, 1); 
		  
		// Join the array to form a string
		const newData = filterData.join('\n'); 
		  
		// Write the new data back in file
		fs.writeFile(
		  currentWorkingDirectory + 'todo.txt',
		  newData, 
		  function (err) {
			if (err) throw err;
	
			// Logs the deleted index
			console.log('*****************************'.rainbow.bold);
			console.log('DELETED todo #'.cyan.bold + deleteIndex); 
			console.log('*****************************'.rainbow.bold);
		  },
		);
	  }
	} else { 
	
	  // Index argument was no passed
	  console.log('*****************************'.rainbow.bold);
	  console.log(
  'ERROR: Missing NUMBER for deleting todo.'.cyan.bold);
  console.log('*****************************'.rainbow.bold);
	}
	
  };


  const doneFunction = () => {
	
	// Store the index passed as argument
	const doneIndex = args[3]; 
	  
	// If argument is passed
	if (doneIndex) { 
	  
	  // Empty array
	  let data = []; 
		
	  // Create a new date object
	  let dateobj = new Date(); 
		
	  // Convert it to string and slice only the
	  // date part, removing the time part
	  let dateString = dateobj.toISOString().substring(0, 10); 
		
	  // Read the data from todo.txt
	  const fileData = fs
		.readFileSync(currentWorkingDirectory + 'todo.txt')
		.toString(); 
		
	  // Read the data from done.txt
	  const doneData = fs
		.readFileSync(currentWorkingDirectory + 'done.txt')
		.toString(); 
		  
	  // Split the todo.txt data
	  data = fileData.split('\n'); 
		
	  // Filter for any empty lines
	  let filterData = data.filter(function (value) {
		return value !== '';
	  }); 
		
	  // If done index is greater than no. of task or <=0
	  if (doneIndex > filterData.length || doneIndex <= 0) {
		console.log('*****************************'.rainbow.bold);
		console.log('ERROR: todo #'.red.bold 
			+ doneIndex + ' does not exist.'.red.bold);
			console.log('*****************************'.rainbow.bold);
	  } else {
	
		// Delete the task from todo.txt
		// data and store it
		const deleted = filterData.splice(
			filterData.length - doneIndex, 1);
		  
		// Join the array to create a string
		const newData = filterData.join('\n'); 
		  
		// Write back the data in todo.txt
		fs.writeFile(
		  currentWorkingDirectory + 'todo.txt',
		  newData, 
		  function (err) {
			if (err) throw err;
		  },
		);
		  
		// Write the stored task in done.txt
		// along with date string
		console.log('*****************************'.rainbow.bold);

		fs.writeFile( 
		  currentWorkingDirectory + 'done.txt',
		  'x ' + dateString + ' ' + deleted 
		   + '\n' + doneData,
		  function (err) {
			if (err) throw err;
			console.log('MARKED TASK #'.bold 
			  + doneIndex + ' as done.'.bold);
			  console.log('*****************************'.rainbow.bold);

		  },
		);

	  }
	} else { 
	
	  // If argument was not passed
	  console.log('*****************************'.rainbow.bold);
	  console.log('ERROR: Missing NUMBER for'.red.bold
		  + ' marking todo as done.'.red.bold);
		  console.log('*****************************'.rainbow.bold);
	}
	console.log('*****************************'.rainbow.bold);

  };

  const reportFunction = () => {
	
    // Create empty array for data of todo.txt
    let todoData = [];
  
    // Create empty array for data of done.txt
    let doneData = [];
  
    // Create a new date object
    let dateobj = new Date();
  
    // Slice the date part
    let dateString = dateobj.toISOString().substring(0, 10);
  
    // Read data from both the files
    const todo = fs.readFileSync(currentWorkingDirectory
                + 'todo.txt').toString();
    const done = fs.readFileSync(currentWorkingDirectory
                + 'done.txt').toString();
  
    // Split the data from both files
    todoData = todo.split('\n');
  
    doneData = done.split('\n');
    let filterTodoData = todoData.filter(function(value) {
        return value !== '';
    });
  
    let filterDoneData = doneData.filter(function(value) {
  
        // Filter both the data for empty lines
        return value !== '';
    });
	console.log('*****************************'.rainbow.bold);

    console.log(
        dateString +
        ' ' +
        'Pending : '.blue.bold +
        filterTodoData.length +
        ' Completed : '.green.bold +
        filterDoneData.length,
        // Log the stats calculated
    );
	console.log('*****************************'.rainbow.bold);

};

	switch (args[2]) {
		case 'add': {
		  console.log('');
		  addFunction();
		  break;
		}
		
		case 'ls': {
			console.log('');
		  listFunction();
		  
		  break;
		}
		
		case 'del': {
			console.log('');
		  deleteFunction();
		  break;
		}
		  
		case 'done': {
		  doneFunction();
		  break;
		}
		  
		case 'help': {
		  InfoFunction();
		  break;
		}
		
		case 'report': {
		  reportFunction();
		  break;
		}
		  
		default: {
		  InfoFunction();
		  // We will display help when no 
		  // argument is passed or invalid
		  // argument  is passed
		}
	  }

