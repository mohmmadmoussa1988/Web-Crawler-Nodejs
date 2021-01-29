# sixtTest-backend
Web Developer Test Assignment

Task - Web crawler
![alt text](https://tajcard.s3.ap-south-1.amazonaws.com/projectplan.png)


Project has been built with a backend (Nodejs) and front (Reactjs - Redux - Thunk)

Backend divided into 2 routes :

1) Search  /search
2) Analyze results  /search/analyze

I did my best to follow the requirments exactly as requests for testing purposes.

Google results has been fetched using googleapi customsearch since crawling google page may lead to a CORS blocking.
Note : I added my google API key for this project in the constants file for facilitating and speed up your testing and deployment process knowing that having creating .env file with all these parameters is the best and secure practice


Enhancements: 

If i had the chance to follow other ways in implementation, i prefered to :

1) Not to download results but analyze them directly and save results in a database
2) To make the process as an asychronous one instead of synchrouns and then by sending results by email or using web push notification witha  PWA for front end.
3) If i had more time, i was preparing a swagger document for API usage and documentation

TESTS:

Unit tests has been created for all functions and if i had more time i will do much more.
Some tests may create files, analyze them and delete them automatically


Notes : 
After every analyze system will delete created files automatically to save space
You will notice that not all files will be created after getting google search result and thats because some websites block us from having its source code
Github workflow yml file has been created for testing purposes after every push 


![alt text](https://tajcard.s3.ap-south-1.amazonaws.com/screencapture-github-mohmmadmoussa1988-sixtTest-backend-runs-1791193773-2021-01-29-14_11_09.png)


