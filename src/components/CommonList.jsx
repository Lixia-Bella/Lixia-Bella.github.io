import { Fragment } from 'react';

const resolveItemKey = (item, index, itemKey) => {
    if (typeof itemKey === 'function') {
        return itemKey(item, index);
    }

    if (typeof itemKey === 'string' && item && typeof item === 'object' && item[itemKey] != null) {
        return item[itemKey];
    }

    if (item && typeof item === 'object') {
        if (item.id != null) return item.id;
        if (item.key != null) return item.key;
    }

    if (typeof item === 'string' || typeof item === 'number') {
        return `${item}-${index}`;
    }

    return index;
};

export default function CommonList({
    items = [],
    renderItem,
    emptyText = '暂无数据',
    emptyState,
    className = '',
    as: Wrapper = 'div',
    itemKey,
}) {
    if (typeof renderItem !== 'function') {
        throw new Error('CommonList 需要传入 renderItem 函数');
    }

    const isFragmentWrapper = Wrapper === Fragment;

    if (!Array.isArray(items) || items.length === 0) {
        const emptyContent = emptyState ?? emptyText;

        if (isFragmentWrapper) {
            return <>{emptyContent}</>;
        }

        return <Wrapper className={className}>{emptyContent}</Wrapper>;
    }

    const content = items.map((item, index) => (
        <Fragment key={resolveItemKey(item, index, itemKey)}>{renderItem(item, index)}</Fragment>
    ));

    if (isFragmentWrapper) {
        return <>{content}</>;
    }

    return <Wrapper className={className}>{content}</Wrapper>;
}
