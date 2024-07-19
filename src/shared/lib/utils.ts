import { clsx, type ClassValue } from 'clsx'
import { SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

const IS_SERVER = typeof window === 'undefined'

type InitLocalStorageOptions<T> = {
	serializer?: (value: T) => string
	deserializer?: (value: string) => T
	initializeWithValue?: boolean
}

export function initLocalStorage<T>(
	key: string,
	initialValue: T | (() => T),
	options: InitLocalStorageOptions<T> = {}
): {
	readValue: () => T
	setValue: (value?: T) => void
	removeValue: () => void
} {
	const { initializeWithValue = true } = options
	const defaultValue =
		initialValue instanceof Function ? initialValue() : initialValue

	const serializer = (value: T) => {
		if (options.serializer) {
			return options.serializer(value)
		}

		return JSON.stringify(value)
	}

	const deserializer = (value: string): T => {
		if (options.deserializer) {
			return options.deserializer(value)
		}

		if (value === 'undefined') {
			return undefined as unknown as T
		}

		let parsed: unknown
		try {
			parsed = JSON.parse(value)
		} catch (error) {
			console.error('Error parsing JSON:', error)
			return defaultValue
		}

		return parsed as T
	}

	const readValue = () => {
		if (IS_SERVER) return defaultValue

		try {
			const raw = window.localStorage.getItem(key)
			return raw ? deserializer(raw) : defaultValue
		} catch (error) {
			console.warn(`Error reading localStorage key “${key}”:`, error)
			return defaultValue
		}
	}

	const setValue = (value?: SetStateAction<T>) => {
		if (IS_SERVER) {
			console.warn(
				`Tried setting localStorage key “${key}” even though environment is not a client`
			)
		}

		try {
			if (value === undefined) {
				window.localStorage.setItem(key, serializer(defaultValue))
				return
			}

			const newValue = value instanceof Function ? value(readValue()) : value

			window.localStorage.setItem(key, serializer(newValue))
		} catch (error) {
			console.warn(`Error setting localStorage key “${key}”:`, error)
		}
	}

	const removeValue = () => {
		if (IS_SERVER) {
			console.warn(
				`Tried removing localStorage key “${key}” even though environment is not a client`
			)
		}

		window.localStorage.removeItem(key)
	}

	if (initializeWithValue) {
		setValue(readValue())
	}

	return {
		readValue,
		setValue,
		removeValue,
	}
}
