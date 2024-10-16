'use client';

import React from 'react';

// Source code from: https://github.com/shadcn-ui/ui/issues/927#issuecomment-1788084995
// Modified according to personal needs
import { cn } from '@/lib/utils';

import { Badge } from './badge';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea } from './scroll-area';

import {
  IconSolarAltArrowDownLinear,
  IconSolarCheckCircle,
  IconSolarCloseLinear,
} from '../icons';

export type ComboboxOption = {
  value: string;
  label: string;
};

type ComboboxPropsSingle = {
  options: ComboboxOption[];
  emptyText?: string;
  clearable?: boolean;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  multiple?: false;
  value?: string;
  onValueChange?: (value: string) => void;
};

type ComboboxPropsMultiple = {
  options: ComboboxOption[];
  emptyText?: string;
  clearable?: boolean;
  selectPlaceholder?: string;
  searchPlaceholder?: string;
  multiple: true;
  value?: string[];
  onValueChange?: (value: string[]) => void;
};

export type ComboboxProps = ComboboxPropsSingle | ComboboxPropsMultiple;

export const handleSingleSelect = (
  props: ComboboxPropsSingle,
  option: ComboboxOption,
) => {
  if (props.clearable) {
    props.onValueChange?.(option.value === props.value ? '' : option.value);
  } else {
    props.onValueChange?.(option.value);
  }
};

export const handleMultipleSelect = (
  props: ComboboxPropsMultiple,
  option: ComboboxOption,
) => {
  if (props.value?.includes(option.value)) {
    if (!props.clearable && props.value.length === 1) return false;
    props.onValueChange?.(
      props.value.filter((value) => value !== option.value),
    );
  } else {
    props.onValueChange?.([...(props.value ?? []), option.value]);
  }
};

export const Combobox = React.forwardRef(
  (props: ComboboxProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const tagMap = React.useMemo(() => {
      return new Map<string, string>(
        props?.options?.map((el) => [el.value, el.label]) ?? [],
      );
    }, [props?.options]);

    const filteredOptions = React.useMemo(() => {
      return props.options.filter((el) =>
        el.label
          .toLowerCase()
          .trim()
          .includes(search?.trim()?.toLowerCase()),
      );
    }, [props?.options, search]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            variant="outline"
            aria-expanded={open}
            className="w-full inline-flex justify-between hover:bg-secondary/20 active:scale-100 whitespace-normal h-full"
          >
            <div
              className={cn(
                'w-full text-left font-normal text-muted-foreground flex flex-row flex-wrap gap-x-2 gap-y-1',
                {
                  'line-clamp-1': !props.multiple,
                },
              )}
            >
              {/* Multiple selection */}
              {props.multiple &&
                props.value &&
                Boolean(props.value.length) &&
                props.value?.map((el) => (
                  <Badge key={el}>{tagMap.get(el)}</Badge>
                ))}

              {/* Single selection */}
              {!props.multiple &&
                props.value &&
                props.value !== '' &&
                props?.options?.find((option) => option.value === props.value)
                  ?.label}

              {/* Empty state */}
              {(!props.value || props.value.length === 0) &&
                (props.selectPlaceholder ?? 'Select an option')}
            </div>
            <div className="flex h-full items-center shrink-0">
              {/* When multiple selection, display the clear all button */}
              {props.multiple && (
                <IconSolarCloseLinear
                  className={cn(
                    'ml-2 text-base opacity-50 hover:opacity-80 transition-opacity',
                  )}
                  onClick={(e) => {
                    props.onValueChange?.([]);

                    // Prevent bubbling to prevent triggering the click event of the outer button
                    e.stopPropagation();
                  }}
                />
              )}
              <IconSolarAltArrowDownLinear
                className={cn(
                  'ml-2 text-base rotate-0 opacity-50 transition-transform',
                  open && 'rotate-180',
                )}
              />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <Command shouldFilter={false}>
            <CommandInput
              ref={ref}
              value={search}
              onValueChange={(e) => {
                setSearch(e);
              }}
              placeholder={props.searchPlaceholder ?? 'Please enter keywords'}
            />
            <CommandEmpty>{props.emptyText ?? 'No results found'}</CommandEmpty>
            <CommandGroup>
              <ScrollArea>
                <div className="max-h-60">
                  {filteredOptions?.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value.toLowerCase().trim()}
                      onSelect={(selectedValue) => {
                        const option = props?.options?.find(
                          (option) =>
                            option.value.toLowerCase().trim() === selectedValue,
                        );

                        if (!option) return null;

                        if (props.multiple) {
                          handleMultipleSelect(props, option);
                        } else {
                          handleSingleSelect(props, option);

                          setOpen(false);
                        }
                      }}
                    >
                      <IconSolarCheckCircle
                        className={cn(
                          'mr-2 text-base opacity-0',
                          !props.multiple &&
                            props.value === option.value &&
                            'opacity-100',
                          props.multiple &&
                            props.value?.includes(option.value) &&
                            'opacity-100',
                        )}
                      />
                      {option.label}
                    </CommandItem>
                  ))}
                </div>
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);

Combobox.displayName = 'Combobox';
