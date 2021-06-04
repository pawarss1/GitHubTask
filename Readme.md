## Objectives
### 1. The user must be able to search for any GitHub repos handle. The search
### must trigger a call to GitHub's API. The repos associated with that handle
### must be displayed on the response. You must display the repo name, owner
### name, description, stars count and link to the repo URL.
### 2. The user must be able to search for any user with the exact name, if not found
### show proper error else insert the information in mongoDB, which will be used
### for subsequent APIs request. Application should only make one call to github
### and returns from mongoDB on subsequent requests for the same user.

## API endpoints are as follows-

### /userRepos?userName=pawarss1

#### Input- Github UserName, Output- List of User Repositories

### /userInfo?userName=pawarss1

#### Input- Github UserName, Output- Cached User Info

### /relatedRepos?repoName=githubAPI-project-Backend

#### Input- Github RepoName, Output- List of Repositories matching the input repository value
