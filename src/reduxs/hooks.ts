import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppThunkDispatch } from "./store";

// typed dispatch (hỗ trợ thunk)
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

// typed selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;