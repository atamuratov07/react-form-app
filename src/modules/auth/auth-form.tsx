import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '../../shared/components/button'
import { cn } from '../../shared/lib/utils'
import { FormData, FormFieldProps, FormSchema } from './model/types'

function Form({ submitHandler }: { submitHandler: (data: FormData) => void }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm<FormData>({
		mode: 'onBlur',
		resolver: zodResolver(FormSchema),
	})

	const onSubmit: SubmitHandler<FormData> = data => {
		submitHandler(data)
		reset()
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='p-4 rounded-2xl shadow-[0_2px_20px_-5px_rgb(34_60_80/0.2)] h-fit max-w-[500px] w-full space-y-6'
		>
			<div className='space-y-4'>
				<h2 className='text-xl'>Регистрация</h2>
				<FormField
					type='text'
					label='Имя'
					placeholder='Введите свое имя'
					name='name'
					register={register}
					error={errors.name}
				/>
				<FormField
					type='text'
					label='Электронная почта'
					placeholder='Введите свою электронную почту'
					name='email'
					register={register}
					error={errors.email}
				/>
				<FormField
					type='password'
					label='Пароль'
					placeholder='Придумайте надежный пароль'
					name='password'
					register={register}
					error={errors.password}
				/>
				<FormField
					type='password'
					label='Подтвердите пароль'
					placeholder='Подтвердите пароль'
					name='confirmPassword'
					register={register}
					error={errors.confirmPassword}
				/>
			</div>
			<Button type='submit' size='lg' disabled={!isValid} className='w-full'>
				Зарегистрироваться
			</Button>
		</form>
	)
}

function FormField({
	type,
	placeholder,
	label,
	name,
	register,
	error,
	valueAsNumber,
}: FormFieldProps) {
	return (
		<div className='space-y-1'>
			<label className='space-y-2'>
				<span className='text-lg'>{label}</span>
				<input
					type={type}
					placeholder={placeholder}
					{...register(name, { valueAsNumber })}
					className={cn(
						'w-full bg-gray-light rounded-lg text-gray p-4 outline-none focus:ring-1 focus:ring-violet',
						{
							'ring-1 ring-red focus:ring-red': !!error,
						}
					)}
				/>
			</label>
			<div className=''>
				{error && <span className='text-red'>{error.message}</span>}
			</div>
		</div>
	)
}

export { Form as AuthForm }
