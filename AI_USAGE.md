Tools Used
1. Github co-pilot
2. Chat GPT

Used ChatGPT to plan the project and breakdown to smaller problems and components.

Used Co pilot to set up the project boilerplates. Docker configuration and deployment errors

Improvements made over AI suggestions
1. While implementing cronjob to update the products to the database the AI suggested updating the records by checking each records individually. I implemented bulk update feature in mongoose so the update takes minimum time when there are huge number of records to update in the database.
2. There was no uniform error handling in API routes so i implemented error handling
3. While implementing filter rules. The AI made a lot of assumptions and gave wrong implementation. So I brokedown the problem to multiple functions. Told the ai what each function takes as input and output and got accurate results.
4. Suggested using ZOD for schema validation which made the code simpler.


