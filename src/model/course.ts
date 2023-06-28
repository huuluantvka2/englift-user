import { IAudit } from "./common"

export interface CourseItem extends IAudit {
    id: string
    name: string
    description?: string,
    image?: string,
}