import { Button, DatePicker, Form, Input, Row, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import moment, { Moment } from 'moment'
import React, { FC, useState } from 'react'
import { useTypedSelector } from '../hooks/UseTypedSelector'
import { IEvent } from '../models/IEvent'
import { IUser } from '../models/IUser'
import { formatDate } from '../utils/date'
import { rules } from '../utils/rules'

interface EventFormProps {
  guests: IUser[]
  submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    athor: '',
    date: '',
    description: '',
    guest: '',
  } as IEvent)

  const { user } = useTypedSelector((state) => state.auth)

  const selectDate = (date: Moment | null) => {
    if (date) {
      setEvent({
        ...event,
        date: formatDate(date.toDate()),
      })
    }
  }

  const submitForm = () => {
    props.submit({ ...event, athor: user.username })
  }
  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Название события"
        name="description"
        rules={[rules.required()]}
      >
        <Input
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          value={event.description}
        />
      </Form.Item>
      <Form.Item
        label="Дата события"
        name="date"
        rules={[
          rules.required(),
          rules.isDateAfter('Нельзя создать событие до текущей даты'),
        ]}
      >
        <DatePicker onChange={(date) => selectDate(date)} />
      </Form.Item>
      <Form.Item name="guest" label="Выберите гостя" rules={[rules.required()]}>
        <Select onChange={(guest: string) => setEvent({ ...event, guest })}>
          {props.guests.map((guest) => {
            return (
              <Option key={guest.username} value={guest.username}>
                {guest.username}{' '}
              </Option>
            )
          })}
        </Select>
      </Form.Item>
      <Row justify="end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default EventForm
