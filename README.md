# GPT-3.5-Dialogflow-bot-with-cloud-functions

# GC chat integrated Dialogflow bot with openAI API integration project 

# STEP 1 : Create a GCP Dialogflow project
1. In the Google Cloud Console go to Menu > IAM & Admin > Create a Project.
Create  project
2. For Project Name enter a descriptive name.
3. If prompted, select the Organization and Billing Account.
4. Click Create.
5. When the project creation is complete a notification appears in the upper-right of the page. 
6. Click the Create Project: <Project name> entry to open the project.
7. Click Menu > APIs & Services > Credentials.
8. Click OAuth consent screen.
9. For AppIn  name, enter Attendance Bot.
10. If prompted, enter the user support email and developer contact information.
11. Click Save and Continue.

Publish the app to Chat
1. To publish your Chat app to Google Chat, do the following:
2. In the Google Cloud console go to Menu > APIs & services > Library.
3. Go to Library
4. Search for Google Chat API. Select the API from the list of results.
5. On the Google Chat API page, click Enable.
6. After you enable the API, click Configuration. Ignore any messages asking you to create credentials.
4. On the Configuration page, do the following:
* For App name, enter Dialog_bot.
* For Avatar URL, enter https://goo.gl/kv2ENA.
* For Description, enter “This is test”.
* Under Functionality, select Receive one-to-one messages and join spaces and group conversations
* Under Connection settings, select Dialogflow
* Under Permissions, select Specific people and groups in your domain. In the text box under the drop-down menu, enter your email address associated with your Google Workspace organization.
* Click Save.

***

    
# STEP 2 : Creating Google cloud function as a webhook using Firebase
Note: If you have git repo and clone this repo from github

1. Create a project in firebase here : https://firebase.google.com/ , enter a project name if you already have a GCP project.
2. Open a terminal in VS code. 
3. In the terminal run ”firebase login” , click on consent screen 
4. In the terminal run ”npm install -g firebase-tools”
5. Create a directory using ”mkdir chat_bot” [input your directory name]
6. Cd into your directory using “cd chat_bot”
7. In the terminal run ”code .”, this will open a new VS code window.
8. Run ”firebase init functions” 
9. Use arrow keys to answer that you want to build this in an existing project.
10. For language use JavaScript
11. Say yes to use Eslint and to install npm dependencies. 
12. Write your code in index.js and add dependencies in functions/package.json. See below added dependencies like express, axios and others.
13. Use npm install to install all packages from package.json alternatively you can also run npm to install each package from CLI.
14. Use “npm run serve” to test locally (You may not always able to hit the route if you test cloud functions locally)
15. Use “npm run deploy” to deploy it and if there are no errors you can see your functions in cloud functions here :https://console.cloud.google.com/functions/list?
 


Video walkthrough [How to deploy node express app with firebase functions in 5 minutes
](https://www.youtube.com/watch?v=VStXlFxQgZg)
    
Click this repo and clone it using git clone and  use “npm run deploy” to deploy it and if there are no errors you can see your functions in cloud functions here :https://console.cloud.google.com/functions/list?

***    
    
# STEP 3 : Create Secret in GCP and reference it 

1. Go here:https://console.cloud.google.com/security/secret-manager?project=chat-bot-shweta
2 .Hit create secret and enter name(OPENAI_API_KEY) and secret value(“Your openAI API KEY”) and press create secret
3. Go into your already deployed functions, edit it and under Runtime, build, connections and security settings click SECURITY AND IMAGE REPO.
4. To grant access to this secret to access our function give this secret permission. Go to IAM and service accounts here: https://console.cloud.google.com/iam-admin/serviceaccounts?project=chat-bot-shweta
5. Create a service account and copy the email address of the service account.
6. Go into your secret and click it and navigate to the PERMISSIONS tab
7. Click GRANT ACCESS  add service account email address and give it a role of Secret Manager Secret Accessor
8. Go into your already deployed functions, edit it and under Runtime, build, connections and security settings click SECURITY AND IMAGE REPO and click REFERENCE A SECRET
9. Write Mounted as volume under Reference method
10. Add Mount path and then click done.

    
Video walkthrough: Google Cloud Functions Tutorial: [HTTP & API Gateway & Pub/Sub Triggers + Authentication & Serverless](https://www.youtube.com/watch?v=LAcErtGU-VU&t=521s)

Demo starts after 7:31

***
    
# STEP 4 : Create a Dialogflow bot, add a webhook and test it

1. Go to Dialogflow console here https://dialogflow.cloud.google.com   
2. Click create new agent, setup agent name, Google project, Timezone and Language.
3. Navigate to Fulfillment and enable webhook and in the URL paste function URL followed by route. For example: https://us-central1-chat-bot-shweta.cloudfunctions.net/app-1/dialogflow.
4. Notice “/dialogflow” is the route and before any of that is function URL.
5. Navigate to intent, click Default Fallback Intent scroll down to Fullfilments and Enable webhook call for this intent. Click Save.
6. On the upper right corner, there is a section to try the webhook. Type in your answer and see the results.
7. Ensure that the Action(input.unknown) name in Dialogflow should match Action provided in code. 

    
Video walkthrough: [Dialogflow & Landbot | Lesson #1 | Create your first agent and intent in Dialogflow](https://www.youtube.com/watch?v=jDdSfyTGUT0)

*** 
    
STEP 5 : Integrate Dialogflow into GC Chat
1. Go to Integrations in Dialogflow console https://dialogflow.cloud.google.com/#/agent/chat-bot-shweta/integrations
2. Choose settings and configure it (If you already set up GCP project and setup configuration skip configuration in this tep)    
3. Click https://mail.google.com/chat/u/0/ , click + sign and click Find apps
4. Search for your bot.


Video walkthrough:Dialogflow Tutorials: [How to create Hangouts Chatbot](https://www.youtube.com/watch?v=0cc2kjtMCMU&t=254s)

***

## Additional Resources 
Video walkthrough for setting bot locally : [OpenAI (GPT-3) and Dialogflow ES connection | Connect Dialogflow ES to OpenAI | NodeJS | with code](https://www.youtube.com/watch?v=OVvs32QTj4A&t=35s)

Blog : 
  *  https://medium.com/@inewtechs/ai-nlp-dialogflow-chatbot-fulfillment-webhook-with-gcp-serverless-cloud-function-node-js-e4a61d1b2d38
  *  https://medium.com/@antonyharfield/dialogflow-web-hooks-how-to-develop-locally-and-deploy-to-cloud-functions-48839919e998

Deep dive: [Build a Serverless API with Firebase cloud functions, TypeScript and Firestore](https://www.youtube.com/watch?v=T8SZv6h2WbY&t=937s)


## Understand API Structure
Use postman to understand the structure of the response. 

Go here : https://www.postman.com/

1. Click collection on the left
2. create a collection, name it
3. Under Auth select Bearer Token as Type 
4. Add openai API key in Token
5. Select entire token and set as variable OPENAI_API_KEY and press save
6. Create a new request using “+” on the right of your collection name.
7. Change it to POST and add the URL “https://api.openai.com/v1/chat/completions”
8. In Body tab click raw and then make it JSON
9. Add code in the body and hit send 
10. We can see the response.

Video walkthrough: [How to get started with the OpenAI API call to use ChatGPT with Postman](https://www.youtube.com/watch?v=PvH_Bcx7ZGY)
