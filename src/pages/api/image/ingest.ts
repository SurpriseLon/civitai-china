import { throwAuthorizationError } from '~/server/utils/errorHandling';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerAuthSession } from '~/server/utils/get-server-auth-session';

import { ingestImage } from '~/server/services/image.service';

export default async function ingestImageEndpoint(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  const user = session?.user;
  if (!user) throw throwAuthorizationError();
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  try {
    const data = await ingestImage({ image: req.body, user });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'image ingestion failed', error });
  }
}
