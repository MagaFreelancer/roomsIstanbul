import { FC, useEffect, useRef } from 'react';
import { Avatar } from 'antd';
import { IPropsProfilePage } from '../../../common/types/personal';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from '@mui/material';
import { ProfileSchema } from '../../../utils/yup';
import { fetchPatchProfile, loginUser } from '../../../redux/thunk/auth';
import { message } from 'antd';
import instance from '../../../utils/axios';
import { IUserData } from '../../../common/types/auth';
import "./ProfilePage.scss";


const ProfilePage: FC<IPropsProfilePage> = (props: IPropsProfilePage): JSX.Element => {
    const { user, isLogged, dispatch } = props;
    const isLoadingAvatar = user.imageUrl ? true : false
    const username = isLogged ? user.username[0] : '';
    const inputFileRef = useRef<HTMLInputElement>(null)
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
        if (user.id === undefined) {
            console.error('User ID is undefined');
            return;
        }
        await reloadProfile(user.id, changedData)

        // window.location.reload()
    };
    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        try {
            if (isLoadingAvatar) {
                await instance.delete(`/uploads/${user.imgsId}`);
            }
            const { data } = await instance.post('/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: 'authorization-text',
                },
            });


            const changedData: IUserData = {
                ...user,
                imageUrl: data.url,
                imgsId: data.id
            }
            if (user.id === undefined) {
                console.error('User ID is undefined');
                return;
            }
            await reloadProfile(user.id, changedData)
            message.success(`${file.name} file uploaded successfully`);
        } catch (error) {
            message.error(`${file.name} file upload failed.`);
        }
    };

    const reloadProfile = async (id: number, changedData: IUserData) => {
        try {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('name')
            const userData = await dispatch(fetchPatchProfile({ id, changedData }))
            await dispatch(loginUser({
                email: userData.payload.email,
                password: userData.payload.password
            }))
        } catch (e) {
            console.log(e);
        }
    }
    const handleFileRemove = async () => {
        try {
            await instance.delete(`/uploads/${user.imgsId}`);
            const changedData: IUserData = {
                ...user,
                imageUrl: '',
                imgsId: 0
            };
            if (user.id === undefined) {
                console.error('User ID is undefined');
                return;
            }
            await reloadProfile(user.id, changedData);
            message.success('File removed successfully');

        } catch (error) {
            console.error('File removal failed:', error);
            message.error('File removal failed.');
        }
    }
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
                <div className="profilepage__info">
                    <div className="profilepage__name">{user.firstName}</div>
                    <div className="profilepage__username">{user.username}</div>

                </div>
                <div className="profilepage__btns">
                    <button onClick={() => inputFileRef.current?.click()} className='button profilepage__updateimg'>Upload Photo</button>
                    {isLoadingAvatar && <button onClick={handleFileRemove} className='button-white profilepage__removeimage'>Remove Photo</button>}
                    <input ref={inputFileRef} type="file" hidden onChange={handleFileUpload} />
                </div>
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
                <button className='button profilepage__btn' type='submit'>Сохранить</button>
            </form>
        </div>
    );
};

export default ProfilePage;
