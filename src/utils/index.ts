export const numberFormat = ( number : number | string) => new Intl.NumberFormat("vi-VN").format(Number(number));

export const showSortAddress = (address?: string ) => {
    return `${(address?.substring(0,4))}...${address?.substring(
        address.length - 4,
        address.length - 1
    )}`
}