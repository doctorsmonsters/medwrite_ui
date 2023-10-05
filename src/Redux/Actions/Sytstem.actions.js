import { SystemTypes } from "../Types/System.types";

export const ActionCreators = {
  showToast: (data) => ({
    type: SystemTypes.TOAST,
    payload: { data },
  }),
};
