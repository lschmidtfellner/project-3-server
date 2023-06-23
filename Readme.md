
*** SEEDING ***
*** DATABASE ***
*** MODELS *** 
*** ROUTES *** 
*** STORY *** 


Our backend was seeded from a database with car data. A model was created to store this information as choices for a user to choose from when uploading their car listing. An additional model was added for listing that added user specific data (condition, description). We also created a user model for users to log in. 

Routes were created for both a buyer to search for cars and seller to create saleposts. 



*** AUTHORIZATION *** 

Our authorization exists within /controllers/auth.js & /middleware/verifyAuth.js & /routes/auth.js 
