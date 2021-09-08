import { Form, Input, Button, Checkbox } from 'antd'
import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/UseTypedSelector'
import { AuthActionCreators } from '../store/reducers/auth/actionCreators'
import { rules } from '../utils/rules'

const LoginForm: FC = () => {
  const dispatch = useDispatch()
  const { error, isLoading } = useTypedSelector((state) => state.auth)
  const [username, setuserName] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useActions()
  const submit = () => {
    login(username, password)
  }

  return (
    <Form onFinish={submit}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[rules.required('Пожалуйста введите имя пользователя')]}
      >
        <Input value={username} onChange={(e) => setuserName(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[rules.required('Пожалуйста введите пароль пользователя')]}
      >
        <Input
          type={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
