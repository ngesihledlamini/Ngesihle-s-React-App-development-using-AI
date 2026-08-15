# Ngesihle-s-React-App-development-using-AI
This is a project from my internship at FlyRank AI under the Front-End Engineering Track, Week 3

---

## Prompts used during development

This section collects the user prompts (requests/instructions) that were used to build this application. Each entry below is a verbatim copy of a prompt the project owner provided while developing the app.

### 1) Install Firebase and update the existing Firebase configuration.

Requirements:

* initialize Firebase Authentication using getAuth
* initialize Cloud Firestore using getFirestore
* export auth and db
* read Firebase configuration from Vite environment variables
* use the modern modular Firebase SDK
* do not add registration or login UI yet
* do not add anything new regarding favourites logic yet

Create or update:

src/services/firebaseService.ts

Also create an .env.example file containing placeholder Firebase environment variables.

---

### 2) Create:

src/services/authService.ts

Implement and export these functions:

* registerUser(email: string, password: string)
* loginUser(email: string, password: string)
* logoutUser()
* subscribeToAuthChanges(callback)

Requirements:

* use Firebase Authentication
* use createUserWithEmailAndPassword for registration
* use signInWithEmailAndPassword for login
* use signOut for logout
* use onAuthStateChanged inside subscribeToAuthChanges
* return typed Firebase User data where appropriate
* convert Firebase errors into readable messages
* do not use React hooks
* do not use useState or useEffect
* do not render JSX

---

### 3) Create the MVVM file structure for authentication.

Create:

src/pages/Auth/AuthModel.ts
src/pages/Auth/useAuthViewModel.ts
src/pages/Auth/AuthView.tsx

Requirements:

* add minimal typed placeholder exports
* ensure the application still compiles
* do not implement registration or login yet
* do not add routing yet

---

### 4) Implement src/pages/Auth/AuthModel.ts.

Import the authentication functions from authService.

Create and export:

* register(email: string, password: string)
* login(email: string, password: string)
* logout()

Responsibilities:

* trim and normalize the email address
* validate that the email and password are not empty
* validate that the password contains at least six characters
* call the corresponding authService function
* return the authenticated Firebase User

Do not use React hooks.
Do not call Firebase Authentication directly outside authService.
Do not manage UI state.

---

### 5) Implement src/pages/Auth/AuthView.tsx.

Requirements:

* use useAuthViewModel
* display either "Login" or "Create Account" based on the current mode
* add a controlled email input
* add a controlled password input
* add a submit button
* disable the submit button while loading
* display readable validation or Firebase errors
* add a button for switching between login and registration
* submit the form using onSubmit
* prevent the default browser form submission

Do not call Firebase directly.
Do not import AuthModel or authService.

---

### 6) Create a global authentication context.

Create:

src/context/AuthContext.tsx

Requirements:

* use onAuthStateChanged through authService
* store the current Firebase user
* store an authLoading state while Firebase restores the session
* expose:

  * user
  * authLoading
  * logout
* wrap the application with AuthProvider
* unsubscribe from the authentication listener when the provider unmounts
* show a loading state while authentication is being initialized
* do not add favourites logic

---

### 7) move types under /types. what about AuthProviderProps (AuthContext.tsx lines 14-17)

(Decision: move auth-related TypeScript types into `src/types/auth.ts` and create an explicit `AuthProviderProps` type for the provider.)

---

### 8) Update the application routing.

Requirements:

* add an /auth route that displays AuthView
* allow HomeView to remain publicly accessible
* protect the /favourites route
* when an unauthenticated user opens /favourites, redirect them to /auth
* when an authenticated user opens /auth, redirect them to /
* preserve the Header on every page
* use the user and authLoading values from AuthContext

---

### 9) Debug error (reported by the dev tool):

[plugin:vite:esbuild] Transform failed with 1 error:
C:/Users/ngesi/OneDrive/Desktop/Ngesihle's React App Development using AI/src/pages/Favourites/useFavouritesViewModel.ts:15:5: ERROR: Expected ";" but found "try"

(Investigated and fixed stray characters in useFavouritesViewModel.ts that caused a syntax error.)

---

### 10) If I am unauth and click favourite button from the home page, redirect me to the favourites page. 2. move this to viewModel

(Implemented: moved favourite-click logic into Home view-model. When unauthenticated, the handler navigates to /favourites; the protected route then redirects the user to /auth.)

---

### 11) Update the existing favourites service so favourites are stored under the signed-in user's profile.

Use this Real time DB structure:

users/{userId}/favourites/{imdbID}

Update the existing functions so they receive userId:

- addFavourite(userId: string, movie: Movie)
- removeFavourite(userId: string, imdbID: string)
- getFavourites(userId: string)

Requirements:

- use userId as the parent user document ID
- use imdbID as the favourite document ID
- preserve the existing function behaviour
- do not use React hooks
- do not access auth.currentUser inside the service
- throw a readable error when userId is missing

---

### 12) add logout button as well and connect it with logout function

(Implemented: Header shows a Logout button when the user is signed in; it calls the `logout` function from the global AuthContext.)

---

### 13) create me in read me all prompts that we used for this app

(This README contains the collected prompts.)

---

## Notes

- The entries above reflect the user instructions that guided development. They do not include system-level or assistant-internal messages.
- If you want these prompts reorganized (grouped by feature, by date, or collapsed into short summaries), tell me which format you prefer and I can update the README.
