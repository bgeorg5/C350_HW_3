const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const outputFile = './output-text.txt';

const fullTimeFacultyMAX = 47;
var nameAndTitle = [];
var expertise = [];
var contact = [];

const getFaculty = async () => {
	try {
		const { data } = await axios.get(
			'https://www.towson.edu/fcsm/departments/computerinfosci/facultystaff/'
        );
		const $ = cheerio.load(data);
		const facultyMembers = [];

		$('table > tbody > tr > td').each((_idx, el) => {
			const facultyMember = $(el).text()
			facultyMembers.push(facultyMember)
		});

		return facultyMembers;
	} catch (error) {
		throw error;
	}
};
getFaculty().then((facultyMembers) => {printInfo(facultyMembers);});

function printInfo(pt){

    let i = 0;
    for(let k = 0; k < fullTimeFacultyMAX; k++){
        nameAndTitle[k] = pt[i];
        expertise[k] = pt[i+1];
        contact[k] = pt[i+2].replace(' AT_TOWSON','@towson.edu');;
        i += 3;
    }

    fs.appendFileSync(outputFile, '-------------------------------Full Time Faculty-------------------------------', 'utf8');
    for(let i = 0; i < fullTimeFacultyMAX; i++){
		console.log(`\n| Name and Title:${nameAndTitle[i]} \n| expertise:\n \n                                    ${expertise[i]} \n| contact:${contact[i]} \n`);
		console.log('--------------------------------------------------------------');
		fs.appendFileSync(outputFile, `\n| Name and Title:${nameAndTitle[i]} \n| expertise:\n \n                                    ${expertise[i]} \n| contact:${contact[i]} \n--------------------------------------------------------------\n`, 'utf8')
    }

    
}