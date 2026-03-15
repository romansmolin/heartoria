export interface MatchReaderPort {
    listMatches(sessionId: string): Promise<{ items: { id: number }[] }>
}

export const GIFT_PORT_TOKENS = {
    MatchReaderPort: Symbol.for('gift.match-reader.port'),
} as const
