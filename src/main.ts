// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateEventColor(): void {
  const timeMinDate = new Date()
  timeMinDate.setHours(timeMinDate.getHours() - 2)
  const optionalArgs = {
    // timeMin: dayjs().subtract(15, 'minute').format(),
    timeMin: timeMinDate.toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 5,
    orderBy: 'startTime',
  }
  const calendarId = 'primary'

  const events = Calendar.Events?.list(calendarId, optionalArgs)
  events?.items?.forEach((event: GoogleAppsScript.Calendar.Schema.Event) => {
    if (!event.colorId && event.id) {
      event.colorId = colorBySummary(event.summary)
      Calendar.Events?.update(event, calendarId, event.id)
    }
  })
}

function colorBySummary(summary?: string): string | undefined {
  // https://developers.google.com/apps-script/reference/calendar/event-color

  if (!summary || /無駄/.test(summary)) {
    return CalendarApp.EventColor.RED.toString()
  }

  if (/睡眠/.test(summary)) {
    return CalendarApp.EventColor.PALE_BLUE.toString()
  }

  // if (/word/.test(summary)) {
  //   return CalendarApp.EventColor.PALE_GREEN.toString();
  // }

  // if (/word/.test(summary)) {
  //   return CalendarApp.EventColor.MAUVE.toString();
  // }

  // if (/word/.test(summary)) {
  //   return CalendarApp.EventColor.PALE_RED.toString();
  // }

  // if (/word/.test(summary)) {
  //   return CalendarApp.EventColor.YELLOW.toString();
  // }

  if (/英会話|英語|Anki|ELSA/.test(summary)) {
    return CalendarApp.EventColor.ORANGE.toString()
  }

  // if (/word/.test(summary)) {
  //   return CalendarApp.EventColor.CYAN.toString();
  // }

  if (
    /(おむつ|ミルク|あやし|寝かしつけ|ごみ|ゴミ|綿棒|沐浴|炊事|洗濯|洗い物)/.test(
      summary
    )
  ) {
    return CalendarApp.EventColor.GRAY.toString()
  }

  // if (/word/.test(summary)) {
  //   return CalendarApp.EventColor.BLUE.toString();
  // }

  // if (/word/.test(summary)) {
  //   return CalendarApp.EventColor.GREEN.toString();
  // }
}
