import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";
import { persistor, RESET_STORE } from "../redux/store";

export default function ReduxAuthListener() {
  const { isSignedIn, isLoaded } = useAuth();
  const dispatch = useDispatch();
  const wasSignedIn = useRef(false);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;

    const justSignedOut = wasSignedIn.current && !isSignedIn;
    const signedOutOnLoad = !hasInitialized.current && !isSignedIn;

    if (justSignedOut || signedOutOnLoad) {
      persistor.purge();
      dispatch({ type: RESET_STORE });
    }

    hasInitialized.current = true;
    wasSignedIn.current = isSignedIn;
  }, [isSignedIn, isLoaded, dispatch]);

  return null;
}
