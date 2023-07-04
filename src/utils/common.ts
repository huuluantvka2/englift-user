import { BookHeart, Game1, Game4, Game5, Game6 } from "@/components/icon"

export interface INavTabsGame {
    name: string,
    icon: string,
    key: number,
    isActive: boolean
}
export const navTabsGame: INavTabsGame[] = [
    { name: 'Học từ', icon: BookHeart.src, key: 1, isActive: false },
    { name: 'Game trắc nghiệm', icon: Game6.src, key: 2, isActive: false },
    { name: 'Game viết từ', icon: Game1.src, key: 3, isActive: false },
    { name: 'Game nghe viết', icon: Game5.src, key: 4, isActive: false },
    { name: 'Game điền khuyết', icon: Game4.src, key: 5, isActive: false },
]

export const timeNotification: Array<number | undefined> = [undefined, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]