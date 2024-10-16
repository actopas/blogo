'use client';

import React from 'react';

import { TagTypeEnum } from '@prisma/client';
import { type ColumnDef } from '@tanstack/react-table';
import { useSetState } from 'ahooks';
import { isUndefined } from 'lodash-es';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
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
  IconSolarBook,
  IconSolarCalendarMark,
  IconSolarCodeSquare,
  IconSolarMinimalisticMagnifer,
  IconSolarNotesBold,
  IconSolarRestart,
  IconSolarSortFromBottomToTopLinear,
  IconSolarSortFromTopToBottomLinear,
  IconSolarTextField,
} from '@/components/icons';
import { IllustrationNoContent } from '@/components/illustrations';

import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  PATHS,
  PLACEHODER_TEXT,
  TAG_TYPES,
  TAG_TYPE_MAP,
} from '@/constants';
import { type GetTagsDTO, type Tag, useGetTags } from '@/features/tag';
import { cn, toSlashDateString } from '@/lib/utils';

import {
  AdminContentLayout,
  CreateTagButton,
  DeleteTagButton,
  EditTagButton,
} from '../../components';

export const AdminTagListPage = () => {
  const [params, updateParams] = useSetState<GetTagsDTO>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
    order: 'desc',
    orderBy: 'createdAt',
  });

  const [inputParams, updateInputParams] = useSetState<
    Omit<GetTagsDTO, 'pageIndex' | 'pageSize'>
  >({
    name: undefined,
    type: undefined,
  });

  const getTagsQuery = useGetTags(params);
  const data = React.useMemo(
    () => getTagsQuery.data?.tags ?? [],
    [getTagsQuery],
  );

  const columns: ColumnDef<Tag>[] = [
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
      accessorKey: 'name',
      header: () => (
        <div className="flex space-x-1 items-center">
          <IconSolarTextField className="text-sm" />
          <span>Name</span>
        </div>
      ),
      cell: ({ row }) => {
        return (
          <Highlight
            sourceString={row.original.name}
            searchWords={params.name ? [params.name] : undefined}
          />
        );
      },
    },
    {
      accessorKey: 'type',
      header: () => (
        <div className="flex space-x-1 items-center">
          <IconSolarTextField className="text-sm" />
          <span>Type</span>
        </div>
      ),
      cell({ row }) {
        const originalType = row.original.type;
        const typeLabel = TAG_TYPE_MAP[originalType];
        if (!typeLabel) {
          return PLACEHODER_TEXT;
        }

        const iconMap = {
          [TagTypeEnum.ALL]: '',
          [TagTypeEnum.BLOG]: <IconSolarBook className="text-sm" />,
          [TagTypeEnum.NOTE]: <IconSolarNotesBold className="text-sm" />,
          [TagTypeEnum.PROJECT]: <IconSolarCodeSquare className="text-sm" />,
        };

        return (
          <Badge>
            {iconMap[originalType]}
            {typeLabel}
          </Badge>
        );
      },
    },
    {
      accessorKey: '_count.blogs',
      header: () => (
        <div className="flex space-x-1 items-center">
          <IconSolarBook className="text-sm" />
          <span>Blog</span>
        </div>
      ),
      cell({ row }) {
        return row.original._count.blogs || PLACEHODER_TEXT;
      },
    },
    {
      accessorKey: '_count.projects',
      header: () => (
        <div className="flex space-x-1 items-center">
          <IconSolarCodeSquare className="text-sm" />
          <span>Project</span>
        </div>
      ),
      cell({ row }) {
        return row.original._count.projects || PLACEHODER_TEXT;
      },
    },
    {
      accessorKey: '_count.notes',
      header: () => (
        <div className="flex space-x-1 items-center">
          <IconSolarNotesBold className="text-sm" />
          <span>Note</span>
        </div>
      ),
      cell({ row }) {
        return row.original._count.projects || PLACEHODER_TEXT;
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
        const record = row.original;
        return (
          <div className="flex gap-2 items-center">
            <EditTagButton
              id={record.id}
              refreshAsync={getTagsQuery.refreshAsync}
            />
            <DeleteTagButton
              id={record.id}
              refreshAsync={getTagsQuery.refreshAsync}
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
            { path: PATHS.ADMIN_TAG, label: 'Tag' },
          ]}
          action={<CreateTagButton refreshAsync={getTagsQuery.refreshAsync} />}
        />
      }
    >
      <div className="grid gap-4 grid-cols-4 px-2 py-4">
        <Input
          placeholder="Please enter name"
          value={inputParams.name}
          onChange={(v) =>
            updateInputParams({
              name: v.target.value,
            })
          }
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <Select
          onValueChange={(v: TagTypeEnum) =>
            updateInputParams({
              type: v,
            })
          }
          value={inputParams.type}
        >
          <SelectTrigger
            className={cn({
              'text-muted-foreground': isUndefined(inputParams.type),
            })}
          >
            <SelectValue placeholder="Please choose type" />
          </SelectTrigger>
          <SelectContent>
            {TAG_TYPES.map((el) => (
              <SelectItem key={el} value={el}>
                {TAG_TYPE_MAP[el]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
        total={getTagsQuery.data?.total}
        loading={getTagsQuery.loading}
        params={{ ...params }}
        updateParams={updateParams}
        noResult={
          <div className="grid place-content-center gap-4 py-16">
            <IllustrationNoContent />
            <p>Empty</p>
            <CreateTagButton refreshAsync={getTagsQuery.refreshAsync} />
          </div>
        }
      />
    </AdminContentLayout>
  );

  function handleSearch() {
    updateParams({
      name: inputParams.name,
      type: inputParams.type,
    });
  }

  function handleReset() {
    updateInputParams({
      name: '',
      type: undefined,
    });
    updateParams({
      name: '',
      type: undefined,
      pageIndex: DEFAULT_PAGE_INDEX,
      order: 'desc',
      orderBy: 'createdAt',
    });
  }

  function handleOrderChange(orderBy: GetTagsDTO['orderBy']) {
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
};
