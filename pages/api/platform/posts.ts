import { NextApiRequest, NextApiResponse } from "next";
import {
  getPostsByPlatform,
  getPostsByPlatformAndFeatured,
  getPostsByPlatformAndTag,
} from "@/services/platform-graph";
import { Post } from "@artiva/shared";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") return res.status(405).end();
  const { tag, featured } = req.query;

  const address = process.env.NEXT_PUBLIC_PLATFORM_ADDRESS;
  if (!address) return res.send({ posts: [] });

  const rawPosts = await (featured
    ? getPostsByPlatformAndFeatured(address)
    : tag
    ? getPostsByPlatformAndTag(address, tag as string)
    : getPostsByPlatform(address));
  if (rawPosts.length === 0) return res.send({ posts: [] });

  const formattedPosts = rawPosts.map((x) => {
    return {
      id: x.id,
      content: JSON.parse(x.contentJSON),
      type: x.type,
      tags: x.tags.map((x) => x.name),
    } as Post;
  });

  res.send({ posts: formattedPosts });
};

export default handler;
