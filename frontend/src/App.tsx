// import { login, logout } from './app/authuser/authSlice';
// import { useAppSelector, useAppDispatch } from './app/authuser/hooks'

import Register from "./pages/Register";
import SignIn from "./pages/SignIn";


// function App() {
//   const { isAuthenticated, user } = useAppSelector((state) => state.auth);
//   const dispatch = useAppDispatch();

//   const handleLogin = () => {
//     const userData = { email: 'oy mirzaya' };
//     dispatch(login(userData));
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <div className="App">
//       {isAuthenticated ? (
//         <div>
//           <p>Welcome, {user?user.email:"nouser"}!</p>
//           <button onClick={handleLogout}>Logout</button>
//         </div>
//       ) : (
//         <div>
//           <p>You are not logged in.</p>
//           <button onClick={handleLogin}>Login</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


export default function App() {
  return (
    <SignIn/>
    // <Register/>
  )
}
