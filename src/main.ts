// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateEventColor(): void {
  const timeMinDate = new Date()
  timeMinDate.setHours(timeMinDate.getHours() - 2)
  const optionalArgs = {
    timeMin: timeMinDate.toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 10,
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

  if (!summary || /無駄|通勤/.test(summary)) {
    return CalendarApp.EventColor.RED.toString()
  }

  if (/睡眠/.test(summary)) {
    return CalendarApp.EventColor.PALE_BLUE.toString()
  }

  if (/仕事/.test(summary)) {
    return CalendarApp.EventColor.MAUVE.toString()
  }

  if (/家族/.test(summary)) {
    return CalendarApp.EventColor.PALE_RED.toString()
  }

  if (/創作|作曲/.test(summary)) {
    return CalendarApp.EventColor.YELLOW.toString()
  }

  if (/英|Anki|ELSA|読書|開発|勉強|プログラミング/.test(summary)) {
    return CalendarApp.EventColor.ORANGE.toString()
  }

  if (/運動|筋トレ|ジョギング|散歩|瞑想|ストレッチ/.test(summary)) {
    return CalendarApp.EventColor.CYAN.toString()
  }

  if (
    /(育児|家事|おむつ|ミルク|あやし|寝かしつけ|ごみ|ゴミ|沐浴|炊事|洗濯|洗い物|荷解き|片付け|買い物)/.test(
      summary
    )
  ) {
    return CalendarApp.EventColor.GRAY.toString()
  }

  if (/娯楽|映画|漫画|ゲーム|テレビ|アニメ/.test(summary)) {
    return CalendarApp.EventColor.PALE_GREEN.toString()
  }

  // if (/word/.test(summary)) {
  //   return CalendarApp.EventColor.BLUE.toString();
  // }

  if (/ふりかえり|振り返り/.test(summary)) {
    return CalendarApp.EventColor.GREEN.toString()
  }
}
