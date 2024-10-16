import React from 'react';

import { cn } from '@/lib/utils';

type HighlightProps = {
  className?: string;
  highlightMarkClassName?: string;
  sourceString: string;
  searchWords?: string[];
  // Whether to be case-sensitive
  caseSensitive?: boolean;
};

type HighlightMarkProps = {
  text: string;
  className?: string;
};

export const HighlightMark = ({ text, className }: HighlightMarkProps) => {
  return (
    <span
      className={cn('bg-green-300/20 dark:bg-green-100/30 mx-1', className)}
    >
      {text}
    </span>
  );
};

export const Highlight = ({
  sourceString,
  searchWords,
  className,
  highlightMarkClassName,
  caseSensitive,
}: HighlightProps) => {
  if (!searchWords?.length) {
    return sourceString;
  }

  if (!sourceString?.trim()) {
    return '';
  }

  // Change the regular expression to (${searchWords.join('|')}), so that searchWords can be used as a capture group, thus preserving the matched searchWords in the split array
  const regex = new RegExp(
    `(${searchWords.join('|')})`,
    // gi: global matching and case-insensitive
    caseSensitive ? 'gi' : 'g',
  );

  // Use the regular expression to split sourceString into an array according to searchWords
  const splitArray = sourceString.split(regex);

  return (
    <div className={cn('inline-flex items-center', className)}>
      {splitArray.map((el, idx) => {
        if (
          searchWords.find((curr) => curr.toLowerCase() === el.toLowerCase())
        ) {
          return (
            <HighlightMark
              key={el + idx}
              text={el}
              className={highlightMarkClassName}
            />
          );
        } else {
          return el;
        }
      })}
    </div>
  );
};
