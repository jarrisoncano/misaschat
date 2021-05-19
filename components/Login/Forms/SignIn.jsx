import { FormStyled } from './styles'
import { Button } from '../../globals-components/Button'
import { Anchor } from '../../globals-components/Anchor'
import { signInController } from '../../../controllers/signInController'
import { useContext } from 'react'
import { userContext } from '../../../context/userContext'

export const SignIn = ({ formToken, setFormToken }) => {
	const { user } = useContext(userContext)

	const sendUserData = (event) => {
		event.preventDefault()
		signInController(user, event)
	}
	const saveData = (event) => {
		const input = event.target

		user.setUserData({ ...user.userData, [input.name]: input.value })
	}

	return (
		<FormStyled>
			<label>
				<img src='/icons/Login/email.svg' alt='' />
				<input
					name='email'
					type='email'
					onChange={(event) => saveData(event)}
					placeholder='email@example.com'
				/>
			</label>
			<label>
				<img src='/icons/Login/password.svg' alt='' />
				<input
					name='password'
					type='password'
					onChange={(event) => saveData(event)}
					placeholder='Contraseña'
				/>
			</label>
			<Anchor token={formToken} handler={setFormToken} />
			<Button token={formToken} handler={sendUserData} />
		</FormStyled>
	)
}
