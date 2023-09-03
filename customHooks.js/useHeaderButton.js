import { useLayoutEffect } from "react";
import IconButton from "./../components/IconButton";
import { useDispatch } from "react-redux";
import { showExpenseModal } from "../store/store";

function useHeaderButton(navigation) {
  const dispatch = useDispatch();

  function buttonAction() {
    dispatch(showExpenseModal());
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={"add-outline"}
            color={"black"}
            onPress={buttonAction}
          />
        );
      },
    });
  }, [navigation]);
}

export default useHeaderButton;
