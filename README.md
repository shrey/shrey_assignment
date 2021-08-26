# shrey_assignment

2 API endpoints

https://still-falls-92652.herokuapp.com/capture  -  Used to capture data from google sheet link and store it on cloud mongoDB server

Body

{
	“ssLink”: “google_sheet_link”,
}


https://still-falls-92652.herokuapp.com/getQuestions - Used to get questions from cloud mongoDB storage

Body

{
	“pageNumber” : page_integer
}
