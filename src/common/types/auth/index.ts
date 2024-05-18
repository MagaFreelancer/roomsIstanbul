import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"
export interface IPropsLogin<TFieldValues extends FieldValues = FieldValues> {
    setEmail: (value: string) => void
    setPassword: (value: string) => void
    navigate: (to: string) => void
    register: UseFormRegister<TFieldValues>
    errors: FieldErrors<TFieldValues>
}
export interface IPropsRegister {
    setPassword: (value: string) => void
    setRepeatPassword: (value: string) => void
    setEmail: (value: string) => void
    setFirstName: (value: string) => void
    setUsername: (value: string) => void
    navigate: (to: string) => void
} 