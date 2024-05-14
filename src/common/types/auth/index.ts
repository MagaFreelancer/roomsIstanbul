export interface IPropsLogin {
    setPassword: (value: string) => void
    setEmail: (value: string) => void
    navigate: (to: string) => void
}
export interface IPropsRegister {
    setPassword: (value: string) => void
    setRepeatPassword: (value: string) => void
    setEmail: (value: string) => void
    setFirstName: (value: string) => void
    setUsername: (value: string) => void
    navigate: (to: string) => void
} 