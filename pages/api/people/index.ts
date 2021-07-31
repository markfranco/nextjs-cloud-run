import type { NextApiRequest, NextApiResponse } from 'next'
import { Data, people } from '../../../data'

export default function handler(req: NextApiRequest, res: NextApiResponse<Data[]>) {
  res.status(200).json(people)
}
