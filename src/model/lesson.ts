export interface LessonItem {
    id: string,
    name: string,
    author?: string,
    description?: string,
    viewed: number,
    image?: string,
    courseId: string,
    nextTime?: string,
    lastTimeStudy?: string,
    levelLesson?: number
}