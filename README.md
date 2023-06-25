# FinTrack <a href="https://fintrack-nrj.netlify.app/">|Deployed link|</a> <a href="https://youtu.be/GW1fLwpzIvk">|Demo Video|</a>
A Web App built for splitting bill among friends while on a trip.

## PPT Link showing the IDEA and the SOLUTION - <a href="https://drive.google.com/file/d/1ToIpn5ARSm9cpdmct7M6TuMYlO6rvwg1/view?usp=sharing">View File</a>

## Details about the app

While on a long trip, Splitting bills has always been a headache, be it at a restaurant, auto fare, Hotel check-ins. It often leads to misunderstandings and 
sometimes even to the end of friendship. Fortunately, we live in a digital era where technology can solve this problem for us. With this we got the idea of 
an app/website for splitting bills among users that can make things easier for all of us.

## How the app works
The app allows you to split bills with your friends, family, or colleagues trip-wise.There is a list of trips in which you can also add new trip. 
All you have to do is add the bill details and the number of people involved with the tag of that trip. 
The app calculates the split amount automatically and even allows you to split it unevenly in case someone owes more or less amount. 

## Features of the app
The app comes with several features that genuinely make it stand out from other apps available in the market.
This website is designed to make it easier to divide up the bill among multiple persons by giving a simple interface for doing so. 
The website then determines how much each participant should pay after considering everyone's share. 
The website consists of following pages:=
  1. Home page:
  	A. Home page shows Three Cards:
		a) Total Expenditure
		b) I owe people
		c) People owe me
	B. It shows different cards for different groups. For each group, we can see:
      		a) All the transactions related to that group.
      		b) All the users are involved in that group.
      		c) Number of days of the trip.
    	C. We can add new Group.
    
  2. User Page: 
  	A. The user page shows the list of other users with which the user is involved in any transaction.
	B. The table shows a list of users with the following information: 
  		a) User: the user with which there ever happened any transactions in any group.
		b) Status: It shows whether I've lent the money(Green badge) (or) I have borrowed the money(red badge)
		c) Amount: The total amount that is sum total of all the transactions ever happened between me and that user. If borrowed, the amount will be shown negative, red. If lent, the amount will be shown positive, green.
		d) Details:By clicking on this button, You got to see all the transactions details where you have involved with that user.
         
  3. Transaction page:
  	A. The Transaction page shows All the transactions.
		a) User who had paid for others.
		b) Users who are involved in that transaction.
		c) Date and day 
		d) Status: Pending(Red),Settled(Green) 
		e) Actions:It shows two Actions:Delete & Settled
    	B. We can filter the transactions on the following basis:
    		a) Group-wise filter
		b) User-wise filter
		c) Group+User- wise filter
	C. We can add a new Transaction by clicking on the add button.
    
  4. Community Page: here we can have general communication. We can tag a group or a person  while adding post. We can also add a comment and we can delete a post if we want.


## Technical architecture
1. Web App: ReactJS, Firebase
2. API: Firebase (Authentication, Firestore)
3. Google Cloud Platform: AMD instance, Firebase
4. Database: Cloud Firestore
5. Deployment: AMD instance on Google Cloud

## Compatibility of the app
The app is compatible with any web browser. No need of downloading, simply visit the website sign up and start using it for all your bill-splitting needs.

## Security and Privacy 
We understand the need for security and therefore the app uses encryption powered by Google Firebase to secure all your sensitive data. Your details are never shared with third-party
applications, and you have to enter userID and password or sign in to access the app, Then only you got to see the details of all the transaction and trip.

## Conclusion
In conclusion, splitting bills with friends, family, or colleagues has been made easier with this app. The app comes loaded with features such as splitting 
bills, requesting money, tracking expenses, and monitoring spending patterns. It is secure, user-friendly and can be run on any web browser without downloading. So, next time you go out with friends or family, remember to split your bills with this app!
