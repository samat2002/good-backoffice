import { defineStore } from "pinia"
import { ChatFile, ChatMessage, ChatRoom, Member, } from "~/misc/types"

export const useChatStore = defineStore("chat", () => {
  const is_connected = ref<boolean>(true)
  const is_init = ref<boolean>(true)

  const chat_room_idx = ref<number>(0)
  const chat_rooms = ref<ChatRoom[]>([])
  const chat_files = ref<ChatFile[]>([])
  const chat_medias = ref<ChatFile[]>([])
  const chat_tab = ref<'member' | 'file' | 'media'>('member')
  const my_info = ref<Member>({
    _id: '',
    member_name: '',
    member_img: '',
    primary_id: '',
    primary_type: 'user',
  })

  const chatAble = computed(() => !is_init.value)
  const chatConnected = computed(() => is_connected.value)
  const chatFiles = computed(() => chat_files.value)
  const chatMedias = computed(() => chat_medias.value)
  const chatRooms = computed(() => chat_rooms.value)
  const chatRoomIdx = computed(() => chat_room_idx.value)
  const chatRoom = computed(() => chatRooms.value[chatRoomIdx.value])
  const myInfo = computed(() => my_info.value)

  async function initChat() {
    const chat = await useChat().getInitChat();

    if (!chat.myinfo) return

    my_info.value = chat.myinfo
    chat_rooms.value = chat.chat_rooms

    is_init.value = false
    is_connected.value = true
  }

  function disconnect() {
    is_connected.value = false
  }

  function mergeMoreMessage(chat_room_id: string, messages: ChatMessage[]) {
    const cr_idx = chatRooms.value.map(chat_room => chat_room._id).indexOf(chat_room_id)

    if (cr_idx == -1) return

    chatRooms.value[cr_idx].chat_messages?.unshift(...messages)
  }

  function onlineMember(data: { chat_room_id: string, member_ids: string[], }) {
    const cr_idx = chatRooms.value.map(chat_room => chat_room._id).indexOf(data.chat_room_id)

    if (cr_idx == -1) return

    chatRooms.value[cr_idx].chat_members?.forEach(chat_member => {
      let is_online = data.member_ids.includes(chat_member.member_id)

      if (chat_member.is_online && !is_online) chat_member.member.last_online = new Date()

      chat_member.is_online = is_online
    })
  }

  async function refreshMember(data: { chat_room_id: string }) {
    const cr_idx = chatRooms.value.map(chat_room => chat_room._id).indexOf(data.chat_room_id)

    if (cr_idx == -1) return

    const members = await useChatMember().getChatMemberBy({ chat_room_id: data.chat_room_id }).then(res => res.docs)

    chatRooms.value[cr_idx].chat_members = members
  }

  function sendMessage(chat_room_id: string, message: { text: string, files: File[] }, callback: Function) {
    const { $io } = useNuxtApp()

    $io.emit('chat', {
      chat_room_id,
      message_text: message.text,
      message_files: message.files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        file,
      })),
    }, (res: any, err: any) => {
      callback()
    })
  }

  function typingMember(data: { chat_room_id: string, member_id: string, }) {
    const cr_idx = chatRooms.value.map(chat_room => chat_room._id).indexOf(data.chat_room_id)

    if (cr_idx == -1) return

    const chat_member = chatRooms.value[cr_idx].chat_members?.find(val => val.member_id === data.member_id)

    if (!chat_member) return

    chat_member.is_typing = true
  }

  function receiveMessage(message: ChatMessage) {
    const cr_idx = chatRooms.value.map(chat_room => chat_room._id).indexOf(message.chat_room_id)

    if (cr_idx == -1) return

    message.is_me = message.member_id === myInfo.value._id

    if (chatRooms.value[cr_idx].chat_messages) {
      chatRooms.value[cr_idx].chat_messages?.push(message)
    } else {
      chatRooms.value[cr_idx].chat_messages = [message]
    }

    if (message.chat_room_id === chatRoom.value._id && message.chat_files?.length) refreshFile()
  }

  function deletedFile(chatFile: ChatFile) {
    const chat_room_idx = chatRooms.value.map(val => val._id).indexOf(chatFile.chat_room_id)

    if (chat_room_idx === -1) return

    const { chat_messages = [] } = chatRooms.value[chat_room_idx]

    const chat_message_idx = chat_messages.map(val => val._id).indexOf(chatFile.chat_message_id)

    if (chat_message_idx === -1) return

    const chat_file = chat_messages[chat_message_idx].chat_files?.find(val => val._id === chatFile._id)

    if (!chat_file) return

    chat_file.is_deleted = true
    chat_file.deleted_at = chatFile.deleted_at
    chat_file.deleted_by = chatFile.deleted_by
  }

  function deletedMessage(message: ChatMessage) {
    const chat_message = chatRooms.value[chatRooms.value.map(chat_room => chat_room._id).indexOf(message.chat_room_id)]?.chat_messages?.find(val => val._id === message._id)

    if (!chat_message) return

    chat_message.is_deleted = true
    chat_message.deleted_at = message.deleted_at
    chat_message.deleted_by = message.deleted_by
  }

  async function refreshFile(file_type?: 'file' | 'media') {
    try {
      chat_files.value = []
      chat_medias.value = []

      if (!file_type) {
        if (chat_tab.value === "member") return

        file_type = chat_tab.value
      }

      const { public: publicCtx } = useRuntimeConfig()

      const files = await useChatFile().getChatFileBy({ chat_room_id: chatRoom.value._id, file_type, }).then(res => res.docs)

      files.forEach(chat_file => {
        chat_file.chat_file_url = `${publicCtx.apiChatUrl}${chat_file.chat_file_path}`
        chat_file.chat_file_dowload_url = `${publicCtx.apiChatUrl}/download?f=${chat_file.chat_file_path}&n=${chat_file.chat_file_name}`
      })

      if (file_type === 'file') {
        chat_files.value = files
      } else {
        chat_medias.value = files
      }
    } catch (err) {
      console.log(err)
    }
  }

  function setCloseRoom(chat_room_id: string, closed: boolean) {
    const cr_idx = chatRooms.value.map(chat_room => chat_room._id).indexOf(chat_room_id)

    if (cr_idx == -1) return

    chatRooms.value[cr_idx].is_closed = closed
  }

  function setCurrentTab(tab: 'member' | 'file' | 'media') {
    chat_tab.value = tab

    refreshFile()
  }

  function setCurrentRoom(index: number) {
    if (chat_room_idx.value !== index) {
      chat_room_idx.value = index

      refreshFile()
    }
  }

  return {
    chatAble,
    chatConnected,
    chatRooms,
    chatRoomIdx,
    chatRoom,
    chatFiles,
    chatMedias,
    myInfo,
    initChat,
    deletedFile,
    deletedMessage,
    disconnect,
    mergeMoreMessage,
    onlineMember,
    receiveMessage,
    refreshFile,
    refreshMember,
    sendMessage,
    setCloseRoom,
    setCurrentRoom,
    setCurrentTab,
    typingMember,
  };
});