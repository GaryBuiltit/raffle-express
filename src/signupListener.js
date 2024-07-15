import { useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";

const useSignUpListener = (callback) => {
  const { client } = useClerk();

  useEffect(() => {
    const unsubscribe = client.on("user.created", callback);

    // Cleanup the listener on unmount
    return () => {
      unsubscribe();
    };
  }, [client, callback]);
};

export default useSignUpListener;
