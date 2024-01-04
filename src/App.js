import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./pages/Profile";
import SignupPage from "./pages/SignupPage";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import PrivateRoutes from "./components/Common/PrivateRoutes";
import CreateAPodcastPage from "./pages/CreateAPodcast";
import PodcastsPage from "./pages/Podcasts";
import PodcastDetailsPage from "./pages/PodcastDetails";
import CreateAnEpisodePage from "./pages/CreateAnEpisode";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnapshot = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                })
              );
            }
          },
          (error) => {
            console.log("Error fetching user data: ", error);
          }
        );
        return () => {
          unsubscribeSnapshot();
        };
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={1200}
        transition={Flip}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-a-podcast" element={<CreateAPodcastPage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
            <Route
              path="/podcast/:id/create-episode"
              element={<CreateAnEpisodePage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
