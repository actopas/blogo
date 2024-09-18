'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { useParams, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { TagTypeEnum } from '@prisma/client';
import { isNil } from 'lodash-es';

import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  hideToast,
  showErrorToast,
  showInfoToast,
  showLoadingToast,
  showSuccessToast,
} from '@/components/ui/toast';

import { BytemdEditor } from '@/components/bytemd';

import { PATHS } from '@/constants';
import { CreateTagButton } from '@/features/admin';
import {
  type UpdateBlogDTO,
  updateBlogSchema,
  useGetBlog,
  useUpdateBlog,
} from '@/features/blog';
import { useGetAllTags } from '@/features/tag';
import { uploadFile } from '@/features/upload';
import { toSlug } from '@/lib/utils';

export const EditBlogForm = () => {
  const getTagsQuery = useGetAllTags(TagTypeEnum.BLOG);
  const tags = React.useMemo(() => {
    return getTagsQuery.data?.tags ?? [];
  }, [getTagsQuery]);

  const { id } = useParams<{ id: string }>();
  const getBlogQuery = useGetBlog(id, Boolean(id));
  const blog = React.useMemo(() => {
    return getBlogQuery.data?.blog;
  }, [getBlogQuery]);

  const updateBlogQuery = useUpdateBlog();

  const router = useRouter();
  const [cover, setCover] = React.useState(blog?.cover);
  const form = useForm<UpdateBlogDTO>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      title: blog?.title ?? '',
      id: blog?.id ?? '',
      slug: blog?.slug ?? '',
      description: blog?.description ?? '',
      body: blog?.body ?? '',
      published: blog?.published ?? true,
      cover: blog?.cover ?? '',
      author: blog?.author ?? '',
      tags: blog?.tags?.map((el) => el.id) ?? [],
    },
  });

  React.useEffect(() => {
    form.setValue('title', blog?.title ?? '');
    form.setValue('id', blog?.id ?? '');
    form.setValue('slug', blog?.slug ?? '');
    form.setValue('description', blog?.description ?? '');
    form.setValue('body', blog?.body ?? '');
    form.setValue('published', blog?.published ?? true);
    form.setValue('cover', blog?.cover ?? '');
    form.setValue('tags', blog?.tags?.map((el) => el.id) ?? []);
  }, [blog, form]);

  return (
    <Form {...form}>
      <form autoComplete="off">
        <div className="fixed z-10 bottom-10 left-24 right-24 md:left-[20vw] md:right-[20vw]">
          <Button
            type="button"
            onClick={() => form.handleSubmit(handleSubmit)()}
            variant={'outline'}
            className="!w-full"
          >
            保存
          </Button>
        </div>

        <div className="grid gap-4 pb-24 px-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Please enter title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>slug</FormLabel>
                <FormControl>
                  <div className="flex items-center w-full gap-4">
                    <Input {...field} placeholder="Please enter slug" />
                    <Button type="button" onClick={handleFormatSlug}>
                      Format
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Please enter description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Please enter Author"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cover"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Please enter cover"
                  />
                </FormControl>
                <FormMessage />
                <Input
                  type="file"
                  onChange={async (e) => {
                    try {
                      const file = e.target.files?.[0];
                      if (file) {
                        const fd = new FormData();
                        fd.append('file', file);
                        const toastID = showLoadingToast('uploading');
                        const { url, error } = await uploadFile(fd);
                        hideToast(toastID);

                        if (error) {
                          showErrorToast(error);
                          return [];
                        }

                        if (url) {
                          showSuccessToast('Success');
                        }

                        setCover(url ?? '');
                        form.setValue('cover', url ?? '');
                      } else {
                        showInfoToast('Choose a file');
                      }
                    } catch (error) {
                      showErrorToast(error as string);
                    }
                  }}
                />
                {!isNil(cover) && (
                  <img
                    src={cover}
                    className="h-[300px] object-scale-down"
                    alt={''}
                  />
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publish</FormLabel>
                <FormControl>
                  <div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-10">
                      <Combobox
                        options={
                          tags?.map((el) => ({
                            label: el.name,
                            value: el.id,
                          })) ?? []
                        }
                        multiple
                        clearable
                        selectPlaceholder="Please choose Tags"
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </div>

                    <CreateTagButton refreshAsync={getTagsQuery.refreshAsync} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <div id="content-editor">
                    <BytemdEditor
                      body={field.value}
                      setContent={field.onChange}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );

  async function handleSubmit(values: UpdateBlogDTO) {
    await updateBlogQuery.runAsync(values);
    router.push(PATHS.ADMIN_BLOG);
  }

  function handleFormatSlug() {
    const tmp = form.getValues().slug?.trim();
    if (tmp) {
      const formatted = toSlug(tmp);
      form.setValue('slug', formatted);
    }
  }
};
