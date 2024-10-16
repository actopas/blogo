'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { TagTypeEnum } from '@prisma/client';
import { type ColumnDef } from '@tanstack/react-table';
import { useSetState } from 'ahooks';
import { isUndefined } from 'lodash-es';

import { type WithSession } from '@/types';

import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Combobox } from '@/components/ui/combobox';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { AdminPageHeader } from '@/components/admin-page-header';
import { Highlight } from '@/components/highlight';
import {
  IconSolarAddSquare,
  IconSolarCalendarMark,
  IconSolarEyeBold,
  IconSolarMinimalisticMagnifer,
  IconSolarPen,
  IconSolarRestart,
  IconSolarSortFromBottomToTopLinear,
  IconSolarSortFromTopToBottomLinear,
  IconSolarTag,
  IconSolarTextField,
} from '@/components/icons';
import { IllustrationNoContent } from '@/components/illustrations';

import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  PATHS,
  PLACEHODER_TEXT,
  PUBLISHED_ENUM,
  PUBLISHED_LABEL_MAP,
} from '@/constants';
import {
  type GetProjectsDTO,
  type Project,
  useGetProjects,
} from '@/features/project';
import { useGetAllTags } from '@/features/tag';
import { cn, isAdmin, toSlashDateString } from '@/lib/utils';

import {
  AdminContentLayout,
  DeleteProjectButton,
  ToggleProjectPublishSwitch,
} from '../../components';

export const AdminProjectListPage = ({ session }: WithSession) => {
  const router = useRouter();
  const [params, updateParams] = useSetState<GetProjectsDTO>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    order: 'desc',
    orderBy: 'createdAt',
  });

  const [inputParams, updateInputParams] = useSetState<
    Omit<GetProjectsDTO, 'pageIndex' | 'pageSize'>
  >({
    titleEN: undefined,
    titleZH: undefined,
    published: undefined,
    tags: undefined,
  });

  const getProjectsQuery = useGetProjects(params);
  const data = React.useMemo(
    () => getProjectsQuery.data?.projects ?? [],
    [getProjectsQuery],
  );
  console.log('Projects data:', data);
  const getTagsQuery = useGetAllTags(TagTypeEnum.PROJECT);
  const tags = React.useMemo(() => {
    return getTagsQuery.data?.tags ?? [];
  }, [getTagsQuery]);

  const columns: ColumnDef<Project>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: () => (
        <div className="flex space-x-1 items-center">
          <IconSolarTextField className="text-sm" />
          <span>Title</span>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <Highlight
            sourceString={row.original.titleEN}
            searchWords={
              params.titleEN || params.titleZH
                ? [params.titleEN || params.titleZH].filter(
                    (word): word is string => word !== undefined,
                  )
                : undefined
            }
          />
        );
      },
    },
    {
      accessorKey: 'tags',
      header: () => (
        <div className="flex space-x-1 items-center">
          <IconSolarTag className="text-sm" />
          <span>Tag</span>
        </div>
      ),
      cell: ({ row }) => {
        const tags = row.original.tags;
        return (
          <div className="flex flex-wrap gap-2">
            {Array.isArray(tags) && tags.length > 0
              ? tags.map((tag) => (
                  <Badge key={typeof tag === 'string' ? tag : tag.id}>
                    {typeof tag === 'string' ? tag : tag.name}
                  </Badge>
                ))
              : PLACEHODER_TEXT}
          </div>
        );
      },
    },
    {
      accessorKey: 'published',
      header: () => (
        <div className="flex space-x-1 items-center">
          <IconSolarEyeBold className="text-sm" />
          <span>Publish Status</span>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <ToggleProjectPublishSwitch
            id={row.original.id}
            published={row.original.published}
            refreshAsync={getProjectsQuery.refreshAsync}
          />
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: () => (
        <Button
          variant="ghost"
          onClick={() => {
            handleOrderChange('createdAt');
          }}
        >
          <IconSolarCalendarMark className="text-sm" />
          <span className="mx-1">Create time</span>
          {params.order === 'asc' && params.orderBy == 'createdAt' && (
            <IconSolarSortFromBottomToTopLinear />
          )}
          {params.order === 'desc' && params.orderBy == 'createdAt' && (
            <IconSolarSortFromTopToBottomLinear />
          )}
        </Button>
      ),
      cell({ row }) {
        return toSlashDateString(row.original.createdAt, 'en');
      },
    },
    {
      accessorKey: 'updatedAt',
      header: () => (
        <Button
          variant="ghost"
          onClick={() => {
            handleOrderChange('updatedAt');
          }}
        >
          <IconSolarCalendarMark className="text-sm" />
          <span className="mx-1">Update time</span>
          {params.order === 'asc' && params.orderBy == 'updatedAt' && (
            <IconSolarSortFromBottomToTopLinear />
          )}
          {params.order === 'desc' && params.orderBy == 'updatedAt' && (
            <IconSolarSortFromTopToBottomLinear />
          )}
        </Button>
      ),
      cell({ row }) {
        return toSlashDateString(row.original.updatedAt, 'en');
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <Link
              className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
              href={`${PATHS.SITE_PROJECT}/${row.original.slug}`}
              target="_blank"
            >
              <IconSolarEyeBold className="text-base" />
            </Link>
            <Button
              size={'icon'}
              variant="ghost"
              onClick={() => handleGoToEdit(row.original.id)}
            >
              <IconSolarPen className="text-base" />
            </Button>
            <DeleteProjectButton
              id={row.original.id}
              refreshAsync={getProjectsQuery.refreshAsync}
            />
          </div>
        );
      },
    },
  ];

  return (
    <AdminContentLayout
      pageHeader={
        <AdminPageHeader
          breadcrumbList={[
            { path: PATHS.ADMIN_HOME, label: 'Home' },
            {
              path: PATHS.ADMIN_PROJECT,
              label: 'Project',
            },
          ]}
          action={
            <Button onClick={handleGoToCreate}>
              <IconSolarAddSquare className="mr-2 text-base" />
              Create project
            </Button>
          }
        />
      }
    >
      <div className="grid gap-4 grid-cols-4 px-2 py-4 items-end">
        <Input
          placeholder="Please enter title"
          value={inputParams.titleEN}
          onChange={(v) =>
            updateInputParams({
              ...{ titleEN: v.target.value },
            })
          }
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
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
          value={inputParams.tags}
          onValueChange={(v) => {
            updateInputParams({
              tags: v,
            });
          }}
        />
        {isAdmin(session?.user?.email ?? '', session?.user?.id ?? '') && (
          <Select
            onValueChange={(v: PUBLISHED_ENUM) =>
              updateInputParams({
                published: v,
              })
            }
            value={inputParams.published}
          >
            <SelectTrigger
              className={cn({
                'text-muted-foreground': isUndefined(inputParams.published),
              })}
            >
              <SelectValue placeholder="Please choose status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={PUBLISHED_ENUM.ALL}>
                {PUBLISHED_LABEL_MAP[PUBLISHED_ENUM.ALL]}
              </SelectItem>
              <SelectItem value={PUBLISHED_ENUM.PUBLISHED}>
                {PUBLISHED_LABEL_MAP[PUBLISHED_ENUM.PUBLISHED]}
              </SelectItem>
              <SelectItem value={PUBLISHED_ENUM.NO_PUBLISHED}>
                {PUBLISHED_LABEL_MAP[PUBLISHED_ENUM.NO_PUBLISHED]}
              </SelectItem>
            </SelectContent>
          </Select>
        )}
        <div className="flex items-center space-x-4">
          <Button onClick={handleSearch}>
            <IconSolarMinimalisticMagnifer className="mr-2" />
            Search
          </Button>
          <Button onClick={handleReset}>
            <IconSolarRestart className="mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        total={getProjectsQuery.data?.total}
        loading={getProjectsQuery.loading}
        params={{ ...params }}
        updateParams={updateParams}
        noResult={
          <div className="grid place-content-center gap-4 py-16">
            <IllustrationNoContent />
            <p>Empty</p>
            <Button onClick={handleGoToCreate}>Create</Button>
          </div>
        }
      />
    </AdminContentLayout>
  );

  function handleSearch() {
    updateParams({
      ...{ titleEN: inputParams.titleEN },
      published: inputParams.published,
      tags: inputParams.tags,
    });
  }

  function handleReset() {
    updateInputParams({
      titleEN: '',
      titleZH: '',
      tags: undefined,
      published: undefined,
    });
    updateParams({
      titleEN: '',
      titleZH: '',
      tags: undefined,
      published: undefined,
      pageIndex: DEFAULT_PAGE_INDEX,
      order: 'desc',
      orderBy: 'createdAt',
    });
  }

  function handleOrderChange(orderBy: GetProjectsDTO['orderBy']) {
    updateParams((prev) => {
      if (prev.orderBy !== orderBy) {
        return { orderBy: orderBy, order: 'asc' };
      } else {
        if (prev.order === 'desc') {
          return { orderBy: undefined, order: undefined };
        } else if (prev.order === 'asc') {
          return { order: 'desc' };
        } else {
          return { order: 'asc' };
        }
      }
    });
  }

  function handleGoToCreate() {
    router.push(PATHS.ADMIN_PROJECT_CREATE);
  }

  function handleGoToEdit(id: string) {
    router.push(`${PATHS.ADMIN_PROJECT_EDIT}/${id}`);
  }
};
