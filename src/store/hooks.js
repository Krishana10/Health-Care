import { useSelector, useDispatch } from 'react-redux';

// Custom hooks for type safety and convenience
export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();