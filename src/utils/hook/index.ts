import { DataStatus } from "../../common/types/rooms";
import { AppDispatch, RootState } from "../../redux/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAuth = () => {
    return !!sessionStorage.getItem('token')
}
export const useStatus = (status: DataStatus.FAILED | DataStatus.SUCCESS | DataStatus.LOADING): boolean => {
    return status === DataStatus.LOADING ? true : false
}

