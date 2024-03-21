export interface EmojiContextProps {
  handleInputComment: (
    commentId: number,
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  handleSaveEmoji: (commentId: number, emoji: any, event?: MouseEvent) => void
  handleCloseEmoji: () => void
  handleOpenEmoji: () => void
  saveTextAndEmoji: ''
  openEmoji: boolean
  setSaveTextAndEmoji: React.Dispatch<
    React.SetStateAction<{ [key: number]: string } | string>
  >
  resetSaveTextAndEmoji: () => void
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  handleSaveEmojiNoId: (emoji: any, event?: MouseEvent) => void
  handleInputCommentNoId: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  resetSaveTextAndEmojiNoId: () => void
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
}
