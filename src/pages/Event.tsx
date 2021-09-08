import { Button, Layout, Modal, Row } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import EventCalendar from '../components/EventCalendar'
import EventForm from '../components/EventForm'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/UseTypedSelector'
import { IEvent } from '../models/IEvent'

const Event: FC = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const { fetchGuests, fetchEvents } = useActions()
  const { guests, events } = useTypedSelector((state) => state.event)
  const { user } = useTypedSelector((state) => state.auth)

  useEffect(() => {
    fetchGuests()
    fetchEvents(user.username)
  }, [])
  const { createEvent } = useActions()

  const addNewEvent = (event: IEvent) => {
    setModalVisible(false)
    createEvent(event)
  }

  return (
    <Layout>
      <EventCalendar events={events} />
      <Row justify="center">
        <Button onClick={() => setModalVisible(true)}>Добавить событие</Button>
      </Row>
      <Modal
        title="Добавить событие"
        visible={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <EventForm guests={guests} submit={(event) => addNewEvent(event)} />
      </Modal>
    </Layout>
  )
}

export default Event
