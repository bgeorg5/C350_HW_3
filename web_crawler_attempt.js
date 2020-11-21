const axios = require('axios');
const cheerio = require('cheerio');
var arr;

const getPostTitles = async () => {
	try {
		const { data } = await axios.get(
			'https://www.towson.edu/fcsm/departments/computerinfosci/facultystaff/'
        );
		const $ = cheerio.load(data);
		const postTitles = [];

		$('table > tbody > tr > td > p').each((_idx, el) => {
			const postTitle = $(el).text()
			postTitles.push(postTitle)
		});

		return postTitles;
	} catch (error) {
		throw error;
	}
};

getPostTitles()
.then((postTitles) => {printInfo(postTitles);});

function printInfo(pt){
    for(let i = 0; i < pt.length; i+=5){
        console.log(`Name: ${pt[i]} | Title: ${pt[i+1]} | email: ${pt[i+2]}, phone: ${pt[i+3]}, Room: ${pt[i+4]}\n`);
    }

}