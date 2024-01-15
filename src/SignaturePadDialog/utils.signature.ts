// short util to avoid installing dependency
export const clsx = (...classNames: (string | undefined | false)[]) => classNames.filter(Boolean).join(" ");
