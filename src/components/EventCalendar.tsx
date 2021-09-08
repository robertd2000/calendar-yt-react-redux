import { Calendar } from 'antd'
import { Moment } from 'moment'
import React, { FC } from 'react'
import { IEvent } from '../models/IEvent'
import { formatDate } from '../utils/date'

interface EventCalendarProps {
  events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = (props) => {
  function dateCellRender(value: Moment) {
    const formattedDate = formatDate(value.toDate())
    const currentDayEvents = props.events.filter(
      (e) => e.date === formattedDate
    )
    return (
      <div>
        {currentDayEvents.map((e, i) => {
          return <div key={i}>{e.description}</div>
        })}
      </div>
    )
  }
  return <Calendar dateCellRender={dateCellRender} />
}

export default EventCalendar
