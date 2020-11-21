const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const outputFile = './output-text.txt';

const fullTimeFacultyMAX = 47;
const fullTimeStaffMAX = 8;
const facultyEmeritusMAX = 6;

const getPostTitles = async () => {
	try {
		const { data } = await axios.get(
			'https://www.towson.edu/fcsm/departments/computerinfosci/facultystaff/'
        );
		const $ = cheerio.load(data);
		const postTitles = [];

		//scrapes information from table section of website section
		$('div.wysiwyg > table > tbody > tr > td > b').each((_idx, el) => {
			const postTitle = $(el).text()
			postTitles.push(postTitle)
		});

		return postTitles;
	} catch (error) {
		throw error;
	}
};

getPostTitles()
.then((postTitles) => {printFTF(postTitles);});

function printFTF(pt){
    for(let i = 0; i < fullTimeStaffMAX; i++){
		console.log(`\n| entry: ${pt[i]}\n`);
		console.log('--------------------------------------------------------------');
		//fs.appendFileSync(outputFile, `\n| Name and Title:${pt[i]} \n| expertise:\n \n                                    ${pt[i+1]} \n| contact:${pt[i+2]} \n --------------------------------------------------------------\n`, 'utf8')
    }
}