'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { IconMingcuteLoadingLine, IconSolarPen } from '@/components/icons';

import { TAG_TYPES, TAG_TYPE_MAP } from '@/constants';
import {
  type UpdateTagDTO,
  updateTagSchema,
  useGetTag,
  useUpdateTag,
} from '@/features/tag';
import { cn, toSlug } from '@/lib/utils';

type EditTagButtonProps = {
  id: string;
  refreshAsync: () => Promise<unknown>;
};

export const EditTagButton = ({ id, refreshAsync }: EditTagButtonProps) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<UpdateTagDTO>({
    resolver: zodResolver(updateTagSchema),
  });

  const { data, loading } = useGetTag(id, open);

  const updateTagQuery = useUpdateTag();

  React.useEffect(() => {
    if (open && data?.tag) {
      const { tag } = data;
      form.setValue('name', tag.name);
      form.setValue('slug', tag.slug);
      form.setValue('type', tag.type);
      form.setValue('id', tag.id);
      form.clearErrors();
    }
  }, [data, form, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size={'icon'} variant="ghost" onClick={() => setOpen(true)}>
              <IconSolarPen className="text-base" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit tag</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form autoComplete="off">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>id</FormLabel>
                    <FormControl>
                      {loading ? (
                        <Skeleton className="w-full rounded-lg h-10" />
                      ) : (
                        <Input {...field} disabled />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      {loading ? (
                        <Skeleton className="w-full rounded-lg h-10" />
                      ) : (
                        <Input
                          className="flex-1"
                          placeholder="Please enter name"
                          {...field}
                        />
                      )}
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
                      {loading ? (
                        <Skeleton className="w-full rounded-lg h-10" />
                      ) : (
                        <div className="flex items-center w-full gap-4">
                          <Input
                            placeholder="Please enter tag slug"
                            {...field}
                          />
                          <Button type="button" onClick={handleFormatSlug}>
                            Format
                          </Button>
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          className={cn({
                            'text-muted-foreground': !field.value,
                          })}
                        >
                          <SelectValue placeholder="Tag Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TAG_TYPES.map((el) => (
                          <SelectItem key={el} value={el}>
                            {TAG_TYPE_MAP[el]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={() => form.handleSubmit(handleSubmit)()}
                  disabled={updateTagQuery.loading}
                >
                  {updateTagQuery.loading && (
                    <IconMingcuteLoadingLine className="mr-2 text-base animate-spin" />
                  )}
                  Save
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );

  async function handleSubmit(values: UpdateTagDTO) {
    await updateTagQuery.runAsync(values);
    setOpen(false);
    await refreshAsync();
  }

  function handleFormatSlug() {
    const tmp = form.getValues().slug?.trim();
    if (tmp) {
      const formatted = toSlug(tmp);
      form.setValue('slug', formatted);
    }
  }
};
