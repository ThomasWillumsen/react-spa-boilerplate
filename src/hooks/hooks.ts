import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { appRoutes } from '../appRoutes';
import { selectIsLoggedIn } from '../redux/loginSlice';
import { AppDispatch, RootState } from '../redux/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


export const useRequireAuth = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn){
            navigate(appRoutes.login);
        }
    }, [isLoggedIn, navigate])
}