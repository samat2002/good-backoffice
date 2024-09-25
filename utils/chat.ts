import { ChatMessage } from "~/misc/types";

export function genTimeAgo(date?: Date | string | null) {
  if (!date) return '-'
  if (typeof date === 'string') date = new Date(date)

  return getTimeAgo(date.getTime())
}

export function groupByDatetime(messages: ChatMessage[]): ChatMessage[][] {
  const groups: ChatMessage[][] = [];
  let currentGroup: ChatMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    const currentObj = messages[i];
    const previousObj = messages[i - 1];

    if (
      previousObj &&
      new Date(currentObj.created_at).getTime() - new Date(previousObj.created_at).getTime() <= 5 * 60 * 1000
    ) {
      currentGroup.push(currentObj);
    } else {
      if (currentGroup.length) groups.push(currentGroup);

      currentGroup = [currentObj];
    }
  }

  if (currentGroup.length) groups.push(currentGroup);

  groups.forEach(items => {
    for (let i = 0; i < items.length; i++) {
      const currentObj = items[i];
      const previousObj = items[i - 1];

      currentObj.show_img = true
      currentObj.show_name = true

      if (previousObj && currentObj.member_id === previousObj.member_id) {
        previousObj.show_img = false
        currentObj.show_name = false
      }
    }
  })

  return groups;
}

export function latestMessage(member_id: string, messages: ChatMessage[] = []) {
  const message = messages[messages.length - 1]

  if (!message) return `เริ่มการแชท`
  if (message.is_deleted) return `ข้อความถูกลบแล้ว`

  const content = message.chat_files?.length ? 'ส่งไฟล์แนบ' : message.chat_message_text

  if (!message.member) return `ผู้ใช้ที่ไม่รู้จัก: ${content}`
  if (message.member_id == member_id) return `คุณ: ${content}`
  if (message.member.primary_type === 'user') return `[Admin] ${message.member.member_name}: ${content}`

  return `${message.member.member_name}: ${content}`
}