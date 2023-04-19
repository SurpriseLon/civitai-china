import { AspectRatio, LoadingOverlay, createStyles, Text } from '@mantine/core';
import Link from 'next/link';
import { useMemo } from 'react';
import { InView } from 'react-intersection-observer';
import { EdgeImage } from '~/components/EdgeImage/EdgeImage';
import { ImageGuard } from '~/components/ImageGuard/ImageGuard';
import { MediaHash } from '~/components/ImageHash/ImageHash';
import { MasonryCard } from '~/components/MasonryGrid/MasonryCard';
import { PostsInfiniteModel } from '~/server/services/post.service';
import { useState } from 'react';
import { Reactions, ReactionTotal } from '~/components/Reaction/Reactions';
import { RoutedContextLink } from '~/providers/RoutedContextProvider';

export function PostsCard({
  data: { image, id, stats },
  height,
}: {
  data: PostsInfiniteModel;
  height: number;
}) {
  const { classes } = useStyles();

  return (
    <InView rootMargin="600px">
      {({ inView, ref }) => (
        <MasonryCard withBorder shadow="sm" p={0} height={height} ref={ref}>
          {inView && (
            <>
              <ImageGuard
                images={[image]}
                connect={{ entityId: id, entityType: 'post' }}
                render={(image) => (
                  <ImageGuard.Content>
                    {({ safe }) => (
                      <>
                        <ImageGuard.Report />
                        <ImageGuard.ToggleConnect
                          sx={(theme) => ({
                            backgroundColor: theme.fn.rgba(theme.colors.red[9], 0.4),
                            color: 'white',
                            backdropFilter: 'blur(7px)',
                            boxShadow: '1px 2px 3px -1px rgba(37,38,43,0.2)',
                          })}
                        />
                        <RoutedContextLink modal="postDetailModal" postId={id}>
                          {!safe ? (
                            <AspectRatio ratio={(image?.width ?? 1) / (image?.height ?? 1)}>
                              <MediaHash {...image} />
                            </AspectRatio>
                          ) : (
                            <EdgeImage
                              src={image.url}
                              name={image.name ?? image.id.toString()}
                              alt={image.name ?? undefined}
                              width={450}
                              placeholder="empty"
                              style={{ width: '100%', position: 'relative' }}
                            />
                          )}
                        </RoutedContextLink>
                        <ReactionTotal
                          className={classes.reactions}
                          metrics={{
                            likeCount: stats?.likeCount,
                            dislikeCount: stats?.dislikeCount,
                            heartCount: stats?.heartCount,
                            laughCount: stats?.laughCount,
                            cryCount: stats?.cryCount,
                          }}
                        />
                      </>
                    )}
                  </ImageGuard.Content>
                )}
              />
            </>
          )}
        </MasonryCard>
      )}
    </InView>
  );
}

const useStyles = createStyles((theme) => ({
  title: {
    lineHeight: 1.1,
    fontSize: 14,
    color: 'white',
    fontWeight: 500,
  },
  reactions: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    borderRadius: theme.radius.sm,
    background: theme.fn.rgba(
      theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],
      0.8
    ),
    backdropFilter: 'blur(13px) saturate(160%)',
    boxShadow: '0 -2px 6px 1px rgba(0,0,0,0.16)',
    padding: 4,
  },
}));
