# team30

## Frontend (Phase 1)
### Setting up on local
```
git clone https://github.com/csc309-winter-2022/team30.git
cd team30
git checkout dev
npm run setup
npm run startall
```
Note for Mac users:<br/>
Replace line 4 in package.json in root directory with:
```
"startall": "cd frontend && yarn build && cd .. && npx nodemon server.js",
```
The app should start locally on port 3001. Open http://localhost:3001 to view it.

### Features

- Sign in Page
  - A regular user and admin user can login from the login page. Before logging in the user/admin only has access to the all posts page and the signin/up page. They will gain more access to the web app once they have logged in.

- Users

  - Sign up Page
    - A regular user is able to create an account from the signup page by filling their data and then signing up.

  - My Profile Page
    - An user is able to change their account information such as their avatar, name, email, phone, password, addresses.

  - My Posts Page
    - The user is able to view their own items they have posted and edit the post. They view a  more detailed version of their post with the trade offers and take down their post. The user is also able to create a new post.

  - All Posts Page
    - A user can view trade posts posted by other users on the “All Posts” page. A user can click on any post on the page and view more details about a trade offer. The users can like/dislike any posts (other than ones posted by them), send a message to the trade owner, and make a trade offer for any post other than their own. They can also report inappropriate posts or trade offer to the admins.

  - My Bids Page
    - Users can view bids they have made on this page and withdraw the bid.

  - Messages Page
    - The message page should feel familiar for end users. There is a sidebar with tabs for each of the users that they have communicated with that they can click on to select which user to message. When clicking on the tab, they can see the messages that user has sent to them and the messages they sent to that user. They can also send new messages to that user.

- Admins

  - Reports page.
    - The admin can view reports from users. The admin can decide to ignore the report or to delete the post by clicking on the button. Each report includes a link to a post so the admin can view the post. 

  - Admin Dashboard
    - Admins can delete specific posts by providing a URL of a post and they can delete users by providing the username of that user. They can also create new admin accounts by providing all the information needed to create a normal account (full name, email, username, password).
    - Only one post can be "removed" currently, the URL "tradeverse.com/post/1"
    - Only "user" and "user2" can be "deleted"
    - If a username or email is "taken" then an admin user cannot be created with that username or email. The unavailable usernames are "user", "admin", "user2" and the unavailable emails are "user@gmail.com", "admin@gmail.com", "user2@gmail.com".


### Login Credentials
- ### Regular User
  - username: user | password: user <br/>
  - username: user2 | password: user2
- ### Admin
  - username: admin | password: admin 

## Third-Party Library
We are using [mui](https://mui.com/) and [Google Map React](https://www.npmjs.com/package/google-map-react)

