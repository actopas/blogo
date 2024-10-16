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
  type Project,
  type UpdateProjectDTO,
  updateProjectSchema,
  useGetProject,
  useUpdateProject,
} from '@/features/project';
import { useGetAllTags } from '@/features/tag';
import { type Tag } from '@/features/tag';
import { uploadFile } from '@/features/upload';
import { toSlug } from '@/lib/utils';

export const EditProjectForm = () => {
  const getTagsQuery = useGetAllTags(TagTypeEnum.PROJECT);
  const tags = React.useMemo(() => {
    return getTagsQuery.data?.tags ?? [];
  }, [getTagsQuery.data]);

  const { id } = useParams<{ id: string }>();
  const getProjectQuery = useGetProject(id, Boolean(id));
  const project = React.useMemo(() => {
    return getProjectQuery.data?.project as
      | (Project & { tags: Tag[] })
      | undefined;
  }, [getProjectQuery]);

  const updateProjectQuery = useUpdateProject();
  const router = useRouter();
  const [cover, setCover] = React.useState(project?.cover);
  const form = useForm<UpdateProjectDTO>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      titleEN: project?.titleEN ?? '',
      titleZH: project?.titleZH ?? '',
      id: project?.id ?? '',
      slug: project?.slug ?? '',
      descriptionEN: project?.descriptionEN ?? '',
      descriptionZH: project?.descriptionZH ?? '',
      published: project?.published ?? false,
      cover: project?.cover ?? '',
      codeUrl: project?.codeUrl ?? '',
      previewUrl: project?.previewUrl ?? '',
      author: project?.author ?? '',
      tags: project?.tags?.map((tag) => tag.id) ?? [],
      bodyEN: project?.bodyEN ?? '',
      bodyZH: project?.bodyZH ?? '',
      pin: project?.pin ?? false,
    },
  });
  React.useEffect(() => {
    form.setValue('titleEN', project?.titleEN ?? '');
    form.setValue('titleZH', project?.titleZH ?? '');
    form.setValue('id', project?.id ?? '');
    form.setValue('slug', project?.slug ?? '');
    form.setValue('descriptionEN', project?.descriptionEN ?? '');
    form.setValue('descriptionZH', project?.descriptionZH ?? '');
    form.setValue('cover', project?.cover ?? '');
    form.setValue('codeUrl', project?.codeUrl ?? '');
    form.setValue('previewUrl', project?.previewUrl ?? '');
    form.setValue('author', project?.author ?? '');
    form.setValue('published', project?.published ?? false);
    form.setValue('tags', project?.tags?.map((tag) => tag.id) ?? []);
    form.setValue('bodyEN', project?.bodyEN ?? '');
    form.setValue('bodyZH', project?.bodyZH ?? '');
    form.setValue('pin', project?.pin ?? false);
  }, [project, form]);

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
            Save
          </Button>
        </div>

        <div className="grid gap-4 pb-24 px-1">
          <FormField
            control={form.control}
            name="titleEN"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Please enter title..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="titleZH"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title (Chinese)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Please enter title in Chinese..."
                  />
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
            name="descriptionEN"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (EN)</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Please enter description" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="descriptionZH"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description (ZH)</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Please enter description in Chinese"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="codeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source code address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Please enter source code address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="previewUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preview</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder="Please enter preview address"
                  />
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
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pin</FormLabel>
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
                        value={field.value ?? []}
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
            name="bodyEN"
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
          <FormField
            control={form.control}
            name="bodyZH"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (ZH)</FormLabel>
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

  async function handleSubmit(values: UpdateProjectDTO) {
    await updateProjectQuery.runAsync(values);
    router.push(PATHS.ADMIN_PROJECT);
  }

  function handleFormatSlug() {
    const tmp = form.getValues().slug;
    if (typeof tmp === 'string' && tmp.trim()) {
      const formatted = toSlug(tmp.trim());
      form.setValue('slug', formatted);
    }
  }
};
