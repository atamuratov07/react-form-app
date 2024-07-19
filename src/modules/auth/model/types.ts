import { FieldError, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

export const FormSchema = z
	.object({
		email: z.string().email({ message: 'Неверная почта' }),
		name: z
			.string()
			.min(2, { message: 'Имя должно содержать не менее 2 символов' })
			.max(20, { message: 'Имя должно содержать не более 20 символов' }),
		password: z
			.string()
			.min(8, { message: 'Пароль должен быть не менее 8 символов' }),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пороли должны совпадать',
		path: ['confirmPassword'],
	})

export type FormData = z.infer<typeof FormSchema>

export type FormFieldProps = {
	type: string
	label: string
	placeholder: string
	name: ValidFieldNames
	register: UseFormRegister<FormData>
	error: FieldError | undefined
	valueAsNumber?: boolean
}

export type ValidFieldNames = 'name' | 'email' | 'password' | 'confirmPassword'
