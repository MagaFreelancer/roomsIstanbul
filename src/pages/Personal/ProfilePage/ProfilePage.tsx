import React, { FC, useEffect } from 'react';
import { Avatar } from 'antd';
import { IPropsProfilePage } from '../../../common/types/personal';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from '@mui/material';
import { ProfileSchema } from '../../../utils/yup';
import { useAppDispatch } from '../../../utils/hook';
import { fetchPatchProfile, loginUser } from '../../../redux/thunk/auth';
import "./ProfilePage.scss";

const ProfilePage: FC<IPropsProfilePage> = (props: IPropsProfilePage): JSX.Element => {
    const { user, isLogged } = props;
    const username = isLogged ? user.username[0] : '';
    const dispatch = useAppDispatch()
    const { register, setValue, formState: { errors }, handleSubmit, watch } = useForm({
        defaultValues: {
            username: user.username,
            firstName: user.firstName,
            email: user.email,
        },
        resolver: yupResolver(ProfileSchema),
    });

    // Обновляем значения полей при изменении пользователя
    useEffect(() => {
        setValue('username', user.username);
        setValue('firstName', user.firstName);
        setValue('email', user.email);
    }, [user, setValue]);

    const handleSubmitForm = async (changedData: any) => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('name')
        const data = await dispatch(fetchPatchProfile({ id: user.id, changedData }))

        await dispatch(loginUser({
            email: data.payload.email,
            password: data.payload.password
        }))

        // window.location.reload()
    };

    // Слежение за значениями полей
    const watchedValues = watch();

    return (
        <div className='profilepage'>
            <div className="profilepage__heading">
                <div className="profilepage__ava">
                    <Avatar
                        src={user.imageUrl}
                        alt="Remy Sharp"
                        className='profilepage__image'
                    >
                        {user.imageUrl || username}
                    </Avatar>
                </div>
                <button className='button profilepage__updateimg'>Upload Photo</button>
            </div>
            <form onSubmit={handleSubmit(handleSubmitForm)} className="profilepage__fields">
                <TextField
                    className='profilepage__field'
                    label="Имя"
                    error={!!errors.firstName?.message}
                    helperText={errors.firstName ? `${errors.firstName.message}` : ''}
                    {...register('firstName')}
                    value={watchedValues.firstName || ''}
                />
                <TextField
                    className='profilepage__field'
                    label="Username"
                    variant="outlined"
                    error={!!errors.username?.message}
                    helperText={errors.username ? `${errors.username.message}` : ''}
                    {...register('username')}
                    value={watchedValues.username || ''}
                />
                <TextField
                    className='profilepage__field'
                    label="Почта"
                    variant="outlined"
                    error={!!errors.email?.message}
                    helperText={errors.email ? `${errors.email.message}` : ''}
                    {...register('email')}
                    value={watchedValues.email || ''}
                />
                <button className='button' type='submit'>Сохранить</button>
            </form>
        </div>
    );
};

export default ProfilePage;
