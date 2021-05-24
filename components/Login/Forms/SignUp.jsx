import { FormStyled } from './styles'
import { Button } from '../../globals-components/Button'
import { Anchor } from '../../globals-components/Anchor'
import { useContext, useState } from 'react'
import { registerUserController } from '../../../controllers/registerUserController'
import { userContext } from '../../../context/userContext'

export const SignUp = ({ formToken, setFormToken }) => {
	const { user } = useContext(userContext)

	let initialInputsCheck = {
		name: false,
		email: false,
		password: false,
	}
	const [inputsCheck, setInputsCheck] = useState(initialInputsCheck)

	const saveUserData = (event) => {
		event.preventDefault()
		if (inputsCheck.name && inputsCheck.email && inputsCheck.password) {
			// this is a controller
			registerUserController(event, formToken, setFormToken, user)
		} else {
			alert('datos incorrectos')
		}
	}

	const checkInputData = (e) => {
		const input = e.target
		user.setUserData({ ...user.userData, [input.name]: input.value })

		switch (input.name) {
			case 'name':
				;/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(input.value)
					? setInputsCheck({ ...inputsCheck, name: true })
					: setInputsCheck({ ...inputsCheck, name: false })
				break
			case 'email':
				;/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.value)
					? setInputsCheck({ ...inputsCheck, email: true })
					: setInputsCheck({ ...inputsCheck, email: false })
				break
			case 'password':
				;/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/.test(
					input.value
				)
					? setInputsCheck({ ...inputsCheck, password: true })
					: setInputsCheck({ ...inputsCheck, password: false })
				break
		}
	}

	return (
		<FormStyled>
			<label>
				<img src='/icons/Login/user.svg' alt='user icon' />
				<input
					name='name'
					onChange={(event) => checkInputData(event)}
					type='text'
					placeholder='Nombre'
					required
				/>
			</label>
			<label>
				<img src='/icons/Login/email.svg' alt='email icon' />
				<input
					name='email'
					onChange={(event) => checkInputData(event)}
					type='email'
					placeholder='email@example.com'
					required
				/>
			</label>
			<label>
				<img src='/icons/Login/password.svg' alt='password' />
				<input
					name='password'
					onChange={(event) => checkInputData(event)}
					type='password'
					placeholder='Contraseña'
					required
					maxLength='12'
				/>
			</label>
			<Anchor token={formToken} handler={setFormToken} />
			<Button token={formToken} handler={saveUserData} />
		</FormStyled>
	)
}