# E-Kart
Full Fledged E commerce site made using MERN stack with React-redux for state management. Uses Material UI for design
[Link to the site hosted on heroku](https://arpan-ecommerce-client.herokuapp.com/)
##To recreate the project
1) Clone the project and run npm install on both backend and frontend folders.
2) Create a project in firebase for authentication. Make a folder inside the backend folder. Call it config and store the firebaseServiceAccountKey.json inside it. Add REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET, REACT_APP_FIREBASE_MESSAGING_SENDER_ID and REACT_APP_FIREBASE_APP_ID to the frontend .env file.
3) Create an account in Cloudinary service and from the dashboard get the credentials of CLOUDINARY_NAME,CLOUDINARY_API_KEY and CLOUDINARY_SECRET. (Write these in the .env file of the backend repo)
4) Create the enviroment variables :- inside backend repo create DATABASE_URL with local or mongodb atlas cloud url,PORT as 8000(or any other number apart from 3000 and 5000).
5) Create an account in Stripe for payment integration. Go to the dashboard page add STRIPE_SECRET_KEY (in the .env of the backend repo) and the publishable key as REACT_APP_STRIPE_PUBLISHABLE_KEY (in the .env file of the frontend repo).
6) Add REACT_APP_SIGNUP_REDIRECT and REACT_APP_FORGOT_PASSWORD_REDIRECT as the url's you would like the customer to be redirected to after signing up and after submitting a change password request after Password redirect.

##Features of this site:- 
1) Authentication using firebase. Allows us to use google sign in seamlessly.
2) Firebase allows us to use email verification while signing up and while using the forgot password option.
3) Add to wishlist with the user's wishlist saved in the database.
4) Coupons.
5) Search form for the admin in the category form, subcategory form and coupon form.
6) Saving the images not in our database but using cloudinary instead. We only save the image url.
7) Search bar in the navbar.
8) Filters based on price range, category, sub category, brand and color.
9) Payment using stripe.
10) Payment using Cash on delivery as well where we create our own payment intent
11) Users can track their order in the user history page.
12) Payment PDF Invoice for the customers.
13) Rating system so that the users can rate the products.
14) Admin can change status of orders from their dashboard.

![Landing page](screenshots/home_screen.png)
![Wishlist_side](screenshots/wishlist_side1.png)
![Cart_side](screenshots/cart_side.png)
![Log In](screenshots/sign_in_form_1.png)
![Search Bar for products](screenshots/search_filter1.png)
![Search Based on filters](screenshots/search_filter_menu.png)
![Google Sign In](screenshots/google_sign_in.png)
![Cart Page](screenshots/cart_screen_1.png)
![Coupon successfully applied](screenshots/coupon_applied1.png)
![Checkout page](screenshots/checkout_1.png)
![PDF Order Invoice](screenshots/order_invoice_pdf_screenshot.png)
![User Order history](screenshots/user_history.png)
![Rating system for users](screenshots/rating_1.png)
![Admin Dashboard](screenshots/admin_dashboard.png)
![Coupon create](screenshots/coupon_create.png)
![Drag and drop images while creating product](screenshots/drag_and_drop_images.png)
![Similar Forms for Category/SubCategory creation](screenshots/similar_forms_category.png)