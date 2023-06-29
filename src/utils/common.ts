import { BookHeart, Game1, Game2, Game3 } from "@/components/icon"

export interface INavTabsGame {
    name: string,
    icon: string,
    key: number,
    isActive: boolean
}
export const navTabsGame: INavTabsGame[] = [
    { name: 'Học từ', icon: BookHeart.src, key: 1, isActive: false },
    { name: 'Game viết từ', icon: Game1.src, key: 2, isActive: false },
    { name: 'Game trắc nghiệm', icon: Game2.src, key: 3, isActive: false },
    { name: 'Kiểm tra', icon: Game3.src, key: 4, isActive: false },
    // {name : 'Hướng dẫn', icon:BookHeart.src,key:1,isActive:true},
]