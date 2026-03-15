import { injectable } from 'inversify'
import axios from 'axios'
import type { MatchReaderPort } from '@/entities/gift/model/ports/match-reader.port'

const DATING_API_URL = process.env.DATING_EXTERNAL_API_URL ?? ''
const DATING_API_KEY = process.env.DATING_EXTERNAL_API_KEY ?? ''

@injectable()
export class MatchService implements MatchReaderPort {
    async listMatches(sessionId: string): Promise<{ items: { id: number }[] }> {
        const response = await axios.post(
            `${DATING_API_URL}index_api/match`,
            undefined,
            {
                params: {
                    action: 'get_matches',
                    session_id: sessionId,
                    api_key: DATING_API_KEY,
                },
            },
        )

        const rawResult = response.data?.result ?? []
        const resultArray = Array.isArray(rawResult)
            ? rawResult
            : Object.values(rawResult)

        return {
            items: resultArray.map((m: any) => ({
                id: Number(m.id ?? 0),
            })),
        }
    }
}
